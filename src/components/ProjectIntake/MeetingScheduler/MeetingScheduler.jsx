import React, { useState } from 'react';
import { Calendar, Clock, User, Mail, Phone, MessageSquare, ArrowLeft } from 'lucide-react';
import { meetingAPI } from '../../../services/api';

const MeetingScheduler = ({ onBack }) => {
  const [formData, setFormData] = useState({
    clientName: '',
    email: '',
    phone: '',
    meetingDate: '',
    meetingTime: '',
    agenda: '',
  });
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('http://localhost:5000/api/meetings/schedule', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(formData)
});

const data = await response.json();
if (data.success) {
  setSuccess(true);
} else {
  throw new Error(data.message || 'Failed to schedule meeting');
}
      setSuccess(true);
    } catch (err) {
      setError(err.message || 'Failed to schedule meeting');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-28 pb-16 px-4">
        <div className="max-w-md mx-auto text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Calendar className="w-12 h-12 text-green-600" />
          </div>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Meeting Scheduled!
          </h2>
          
          <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
            <p className="text-green-800 font-medium mb-2">
              You'll receive a confirmation email shortly
            </p>
            <p className="text-green-700">
              We're looking forward to discussing your project!
            </p>
          </div>
          
          <div className="space-y-4 text-left mb-8">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
              <span className="text-gray-700">Check your email for calendar invite</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
              <span className="text-gray-700">Meeting reminder will be sent 1 hour before</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
              <span className="text-gray-700">Prepare any questions you have</span>
            </div>
          </div>
          
          <button
            onClick={() => window.location.href = '/'}
            className="px-8 py-3 rounded-lg bg-gradient-to-r from-green-500 to-green-600 text-white font-medium hover:from-green-600 hover:to-green-700 transition-all"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-28 pb-16 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Options
          </button>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Schedule a Meeting
          </h1>
          <p className="text-gray-600">
            Choose a time that works for you for a free 30-minute consultation.
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              {/* Basic Info */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Your Information
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.clientName}
                      onChange={(e) => handleChange('clientName', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone (Optional)
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>
              </div>

              {/* Meeting Time */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Meeting Time
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.meetingDate}
                      onChange={(e) => handleChange('meetingDate', e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Time *
                    </label>
                    <select
                      required
                      value={formData.meetingTime}
                      onChange={(e) => handleChange('meetingTime', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select a time</option>
                      <option value="09:00">9:00 AM</option>
                      <option value="10:00">10:00 AM</option>
                      <option value="11:00">11:00 AM</option>
                      <option value="14:00">2:00 PM</option>
                      <option value="15:00">3:00 PM</option>
                      <option value="16:00">4:00 PM</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Agenda */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  What would you like to discuss?
                </h3>
                <textarea
                  value={formData.agenda}
                  onChange={(e) => handleChange('agenda', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Briefly describe what you'd like to discuss during the meeting..."
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <p className="text-red-600">{error}</p>
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold hover:from-blue-600 hover:to-blue-700 transition-all disabled:opacity-50 flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Scheduling...
                    </>
                  ) : (
                    <>
                      <Calendar className="w-5 h-5 mr-2" />
                      Schedule Free Meeting
                    </>
                  )}
                </button>
                <p className="text-center text-gray-500 text-sm mt-3">
                  You'll receive a confirmation email with meeting details.
                </p>
              </div>
            </div>
          </form>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>Meetings are scheduled for 30 minutes. We'll send a Google Meet/Zoom link via email.</p>
        </div>
      </div>
    </div>
  );
};

export default MeetingScheduler;