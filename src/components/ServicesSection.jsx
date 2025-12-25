import React from "react";
import { motion } from "framer-motion";
import { Code2, Smartphone, Brush, GraduationCap } from "lucide-react";

const services = [
  {
    id: 1,
    title: "Web Development",
    icon: <Code2 size={32} className="text-bright md:size-10" />,
    desc: "Scalable, responsive, and fast web solutions crafted with precision and performance.",
  },
  {
    id: 2,
    title: "Mobile Applications",
    icon: <Smartphone size={32} className="text-bright md:size-10" />,
    desc: "Cross-platform mobile apps designed to deliver smooth and reliable user experiences.",
  },
  {
    id: 3,
    title: "Graphic Design",
    icon: <Brush size={32} className="text-bright md:size-10" />,
    desc: "Visually striking designs that define your brand identity and enhance communication.",
  },
  {
    id: 4,
    title: "IT Courses",
    icon: <GraduationCap size={32} className="text-bright md:size-10" />,
    desc: "Hands-on IT training that empowers learners to become future-ready professionals.",
  },
];

const ServicesSection = () => {
  return (
    <section className="relative bg-greybg text-light py-16 md:py-24 overflow-hidden font-sans">
      <div className="relative left-1/2 -translate-x-1/2 w-[92%] max-w-7xl">

        {/* Section header */}
        <div className="text-center mb-14 md:mb-20 relative z-10 px-2">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 text-light leading-tight">
            What We Do?
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-learncolor max-w-2xl mx-auto leading-relaxed px-2">
            At
            <span className="font-semibold text-bright"> SADEVZ</span>,
            we craft digital solutions that merge innovation, creativity, and technology.
          </p>
        </div>

        {/* Services grid */}
        <div className="relative max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8">

          {/* Connecting line (desktop only) */}
          <div className="hidden md:block absolute top-[22px] left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-bright/40 to-transparent z-0"></div>

          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: -40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative z-10 flex flex-col items-center md:items-start text-center md:text-left"
            >
              {/* Top dot */}
              <div className="relative mb-5 flex justify-center w-full">
                <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-bright shadow-[0_0_12px_#00bcd4]"></div>
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[2px] h-5 bg-bright/50"></div>
              </div>

              {/* service box */}
<div className="
  w-full flex flex-col 
  justify-center md:justify-between
  bg-[#292b2c] 
  rounded-2xl 
  p-6 sm:p-7 md:p-8
  min-h-[240px] sm:min-h-[260px] md:min-h-[300px]
  hover:-translate-y-2 
  transition-all duration-500 
  hover:shadow-[0_0_25px_#00bcd4]/40
">


                <div className="mb-4 flex justify-center md:justify-start">{service.icon}</div>

                <h3 className="text-lg sm:text-xl font-semibold mb-2 text-light leading-snug">
                  {service.title}
                </h3>

                <p className="text-[#d0d0d0] leading-relaxed text-sm sm:text-[15px]">
                  {service.desc}
                </p>

              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-14 md:mt-16 relative z-10">
          <motion.a
            href="/services"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-8 sm:px-10 py-3 bg-bright text-bluebg rounded-full font-medium 
                       shadow-md hover:shadow-[0_0_20px_#00bcd4]/60 transition-all duration-300"
          >
            Explore All Services
          </motion.a>
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;
