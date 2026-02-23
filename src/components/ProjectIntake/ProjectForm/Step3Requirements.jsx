import React, { useState } from 'react';
import { Globe, Target, TrendingUp, Link as LinkIcon, X } from 'lucide-react';
import { TECH_STACK_OPTIONS } from '../../../utils/constants';

const Step3Requirements = ({ data, onChange, onTechChange, onNext, onBack }) => {
  const [newLink, setNewLink] = useState('');

  const handleAddLink = () => {
    if (newLink.trim() && !data.referenceLinks.includes(newLink.trim())) {
      onChange('referenceLinks', [...data.referenceLinks, newLink.trim()]);
      setNewLink('');
    }
  };

  const handleRemoveLink = (linkToRemove) => {
    onChange('referenceLinks', data.referenceLinks.filter(l => l !== linkToRemove));
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          Technical Requirements
        </h2>
        <p className="text-gray-600">
          Help us understand your technical needs and preferences.
        </p>
      </div>

      <div className="space-y-8">
        {/* Target Audience */}
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <Target className="w-4 h-4 mr-2" />
            Target Audience (Optional)
          </label>
          <textarea
            value={data.targetAudience}
            onChange={(e) => onChange('targetAudience', e.target.value)}
            rows={3}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Who will use your product? (e.g., Small business owners, Students, Healthcare professionals)"
          />
        </div>

        {/* Competitors */}
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <TrendingUp className="w-4 h-4 mr-2" />
            Competitors or Similar Products (Optional)
          </label>
          <textarea
            value={data.competitors}
            onChange={(e) => onChange('competitors', e.target.value)}
            rows={3}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="List any competitors or similar products you admire"
          />
        </div>

        {/* Reference Links */}
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <LinkIcon className="w-4 h-4 mr-2" />
            Reference Links (Optional)
          </label>
          <div className="flex gap-2 mb-3">
            <input
              type="url"
              value={newLink}
              onChange={(e) => setNewLink(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddLink())}
              className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://example.com"
            />
            <button
              type="button"
              onClick={handleAddLink}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Add
            </button>
          </div>
          
          {data.referenceLinks.length > 0 && (
            <div className="space-y-2">
              {data.referenceLinks.map((link, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded">
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 truncate"
                  >
                    {link}
                  </a>
                  <button
                    type="button"
                    onClick={() => handleRemoveLink(link)}
                    className="text-gray-500 hover:text-red-500"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Preferred Technologies */}
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-4">
            <Globe className="w-4 h-4 mr-2" />
            Preferred Technologies (Optional)
          </label>
          
          {Object.entries(TECH_STACK_OPTIONS).map(([category, technologies]) => (
            <div key={category} className="mb-6">
              <h4 className="text-sm font-semibold text-gray-700 mb-3 capitalize">
                {category}
              </h4>
              <div className="flex flex-wrap gap-2">
                {technologies.map(tech => {
                  const isSelected = data.preferredTech[category]?.includes(tech);
                  return (
                    <button
                      key={tech}
                      type="button"
                      onClick={() => onTechChange(category, tech)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${isSelected ? 'bg-blue-100 text-blue-700 border border-blue-300' : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'}`}
                    >
                      {tech}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-10 pt-6 border-t border-gray-200">
        <button
          onClick={onBack}
          className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
        >
          Back
        </button>
        <button
          onClick={onNext}
          className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium hover:from-blue-600 hover:to-blue-700 transition-all"
        >
          Next: Budget & Timeline
        </button>
      </div>
    </div>
  );
};

export default Step3Requirements;