import React from "react";
import { motion } from "framer-motion";
import team from "../assets/team.png";

const WhoWeAre = () => {
  return (
    <section className="w-full bg-light py-20 px-6 md:px-16 flex flex-col md:flex-row items-center justify-between gap-14 overflow-hidden">
      
      {/* Left Image */}
      <motion.div
        className="md:w-1/2 flex justify-center"
        initial={{ opacity: 0, x: -60 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <img
          src={team} // replace with your own image
          alt="SADDEV Team"
          className="rounded-3xl shadow-xl max-w-xs sm:max-w-sm md:max-w-md lg:max-w-md"
        />
      </motion.div>

      {/* Right Text Content */}
      <motion.div
        className="md:w-1/2 text-bluebg"
        initial={{ opacity: 0, x: 60 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight relative text-bluebg">
          Who We Are?
          <span className="absolute left-0 bottom-[-8px] w-20 h-1 bg-bright rounded-full"></span>
        </h2>

        <p className="text-lg leading-relaxed text-bluebg mb-8">
          <span className="font-semibold">SADEVZ</span> is a creative tech startup
          committed to transforming ideas into digital reality. We design and
          develop stunning websites, mobile applications, and visual brands — 
          while empowering learners through hands-on IT training. 
        </p>

        <motion.a
          href="/about"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block px-7 py-3 font-medium text-white rounded-full shadow-md transition-all duration-300"
          style={{ backgroundColor: "#00bcd4" }}
        >
          Learn More About Us
        </motion.a>
      </motion.div>
    </section>
  );
};

export default WhoWeAre;
