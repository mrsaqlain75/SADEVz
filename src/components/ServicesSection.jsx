import React from "react";
import { motion } from "framer-motion";
import { Code2, Smartphone, Brush, GraduationCap } from "lucide-react";

const services = [
  {
    id: 1,
    title: "Web Development",
    icon: <Code2 size={36} className="text-[#00bcd4]" />,
    desc: "Scalable, responsive, and fast web solutions crafted with precision and performance.",
  },
  {
    id: 2,
    title: "Mobile Applications",
    icon: <Smartphone size={36} className="text-[#00bcd4]" />,
    desc: "Cross-platform mobile apps designed to deliver smooth and reliable user experiences.",
  },
  {
    id: 3,
    title: "Graphic Design",
    icon: <Brush size={36} className="text-[#00bcd4]" />,
    desc: "Visually striking designs that define your brand identity and enhance communication.",
  },
  {
    id: 4,
    title: "IT Courses",
    icon: <GraduationCap size={36} className="text-[#00bcd4]" />,
    desc: "Hands-on IT training that empowers learners to become future-ready professionals.",
  },
];

const ServicesSection = () => {
  return (
    <section className="relative bg-[#061018] text-[#efefef] py-20 md:py-28 overflow-hidden">
      {/* centered layout like header */}
      <div className="relative left-1/2 -translate-x-1/2 w-[90%]">

        {/* subtle gradient overlay */}
        <div className="absolute inset-0 pointer-events-none"></div>

        {/* section header */}
        <div className="text-center mb-16 md:mb-20 relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#efefef]">
            What We Do
          </h2>
          <p className="text-lg text-[#d3d3d3] max-w-2xl mx-auto leading-relaxed">
            At <span className="font-semibold text-[#00bcd4]">SADEVZ</span>, we craft digital solutions
            that merge innovation, creativity, and technology.
          </p>
        </div>

        {/* services grid */}
        <div className="relative max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
          {/* connecting line */}
          <div className="hidden md:block absolute top-[22px] left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#00bcd4]/40 to-transparent z-0"></div>

          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: -40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative z-10 flex flex-col items-center md:items-start text-center md:text-left"
            >
              {/* connector dot ABOVE box */}
              <div className="relative mb-6 flex justify-center w-full">
                <div className="w-5 h-5 rounded-full bg-[#00bcd4] shadow-[0_0_15px_#00bcd4]"></div>
                <div className="absolute top-5 left-1/2 -translate-x-1/2 w-[2px] h-6 bg-[#00bcd4]/50 blur-[0.5px]"></div>
              </div>

              {/* service box with new contrast color */}
              <div className="w-full flex flex-col justify-between bg-[#102a3a] border border-[#00bcd4]/20 rounded-2xl p-8 min-h-[300px]
                              hover:-translate-y-2 transition-all duration-500 hover:shadow-[0_0_25px_#00bcd4]/40">
                <div className="mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-[#efefef]">{service.title}</h3>
                <p className="text-[#d0d0d0] leading-relaxed text-[15px]">{service.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA button */}
        <div className="text-center mt-16 relative z-10">
          <motion.a
            href="/services"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-10 py-3 bg-[#00bcd4] text-[#061018] rounded-full font-medium shadow-md hover:shadow-[0_0_20px_#00bcd4]/60 transition-all duration-300"
          >
            Explore All Services
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
