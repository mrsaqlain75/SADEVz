import React from "react";
import { motion } from "framer-motion";
import { Users, Target, Award, ChevronRight, Sparkles, Code } from "lucide-react";

const WhoWeAre = () => {
  const values = [
    {
      icon: <Target className="w-5 h-5" />,
      title: "Purpose Driven",
      description: "Every project has a clear goal"
    },
    {
      icon: <Code className="w-5 h-5" />,
      title: "Technical Excellence",
      description: "Clean, efficient solutions"
    },
    {
      icon: <Award className="w-5 h-5" />,
      title: "Quality Focused",
      description: "Uncompromising standards"
    }
  ];

  return (
    <section className="relative w-full py-12 md:py-16 px-6 md:px-16 font-sans">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-light/50 to-white"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        

        {/* Split layout - clean and balanced */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Minimal visual */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            {/* Abstract geometric shape */}
            <div className="relative">
              <div className="aspect-square max-w-md mx-auto rounded-2xl bg-gradient-to-br from-white to-gray-50 border border-gray-200/50 shadow-sm overflow-hidden">
                {/* Simple grid pattern overlay */}
                <div className="absolute inset-0 opacity-5">
                  <div 
                    className="absolute inset-0" 
                    style={{
                      backgroundImage: `linear-gradient(90deg, #00bcd4 1px, transparent 1px),
                                        linear-gradient(180deg, #00bcd4 1px, transparent 1px)`,
                      backgroundSize: '40px 40px'
                    }}
                  ></div>
                </div>
                
                {/* Centered focus element */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    initial={{ scale: 0.9 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative"
                  >
                    {/* Main circle */}
                    <div className="w-48 h-48 rounded-full bg-gradient-to-br from-bright/10 to-bluebg/10 border border-bright/20 flex items-center justify-center">
                      {/* Inner rings */}
                      <div className="w-32 h-32 rounded-full border-2 border-bright/30 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-bright flex items-center justify-center shadow-lg">
                          <Users className="w-8 h-8 text-white" />
                        </div>
                      </div>
                    </div>
                    
                    {/* Subtle orbiting elements */}
                    {[0, 120, 240].map((angle, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className="absolute w-12 h-12 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center"
                        style={{
                          top: `${48 + 36 * Math.sin(angle * Math.PI / 180)}%`,
                          left: `${48 + 36 * Math.cos(angle * Math.PI / 180)}%`,
                          transform: 'translate(-50%, -50%)'
                        }}
                      >
                        <div className="text-bright">
                          {values[index].icon}
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </div>
              
              {/* Subtle stat badge */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="absolute -bottom-4 -right-4 bg-white rounded-xl p-4 shadow-lg border border-gray-200"
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-bright">20+</div>
                  <div className="text-sm text-gray-600">Successful Projects</div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right - Clean content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="mb-8">
              <h3 className="text-3xl md:text-4xl font-bold text-bluebg mb-6">
                Who <span className="text-bright">We Are?</span>
              </h3>
              
              <div className="space-y-4 text-gray-700">
                <p className="text-lg">
                  <span className="font-semibold text-bluebg">SADEVZ</span> is a collective of creative technologists 
                  dedicated to transforming visionary ideas into tangible digital experiences.
                </p>
                
                <p className="text-lg">
                  We approach each project as digital architects—meticulously planning, designing, 
                  and building solutions that are not only functional but elevate user experience 
                  and drive meaningful impact.
                </p>
              </div>
            </div>

            {/* Minimal values list */}
            <div className="mb-10">
              <h4 className="font-semibold text-bluebg mb-4 text-lg">Our Approach</h4>
              <div className="space-y-4">
                {values.map((value, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="flex items-start gap-3 group cursor-default"
                  >
                    <div className="p-2 rounded-lg bg-bright/10 text-bright group-hover:scale-110 transition-transform">
                      {value.icon}
                    </div>
                    <div>
                      <h5 className="font-medium text-bluebg mb-1">{value.title}</h5>
                      <p className="text-sm text-gray-600">{value.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Clean CTA */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >

            </motion.div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default WhoWeAre;