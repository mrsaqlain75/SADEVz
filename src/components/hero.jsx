import React, { useState, useEffect } from "react";
import code from "../assets/code.svg";
import gear from "../assets/gear.svg";
import bulb from "../assets/bulb.svg";
import design from "../assets/design.svg";
import rocket from "../assets/rocket.svg";
import globe from "../assets/globe.svg";

function Hero() {
  const phrases = [
    "We build Websites and Apps that inspire.",
    "We design captivating Graphics and Interfaces.",
    "We teach cutting-edge Online Courses."
  ];

  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % phrases.length);
        setFade(true);
      }, 400);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[90vh] bg-gradient-to-b from-darkbg via-[#121212] to-[#1b1a18] flex flex-col justify-center items-center overflow-hidden text-center px-6 rounded-b-[50px]">

      {/* Floating SVGs */}
      <img src={code} alt="" className="absolute top-20 left-16 w-16 opacity-70 animate-float" />
      <img src={gear} alt="" className="absolute bottom-12 right-16 w-20 opacity-60 animate-float-slow" />
      <img src={bulb} alt="" className="absolute top-24 right-1/4 w-20 opacity-35 animate-float" />
      <img src={design} alt="" className="absolute bottom-10 left-1/4 w-16 opacity-40 animate-float-slower" />
      <img src={rocket} alt="" className="absolute top-1/2 right-10 w-14 opacity-30 animate-float" />
      <img src={globe} alt="" className="absolute bottom-10 left-10 w-12 opacity-25 animate-float-slow" />

      {/* Hero Content */}
      <div className="z-10 text-accent flex flex-col items-center">
        <h1
          className={`text-4xl sm:text-5xl lg:text-5xl font-bold tracking-wide drop-shadow-[0_0_8px_rgba(255,255,255,0.2)] transition-all duration-700 ease-in-out ${
            fade ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          {phrases[index]}
        </h1>

        <p className="mt-4 text-base sm:text-lg text-bright max-w-xl leading-relaxed">
          SADEVZ builds smart, scalable, and secure solutions for the modern web.
        </p>

        <div className="mt-6 flex gap-4">
          <button className="bg-accent text-darkbg font-semibold px-6 py-2 rounded-lg shadow-md hover:scale-105 transition-transform">
            Get Started
          </button>
          <button className="border border-accent text-accent font-semibold px-6 py-2 rounded-lg hover:bg-bright hover:text-accent transition-all">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
