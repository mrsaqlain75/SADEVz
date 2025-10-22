import React, { useState, useEffect } from "react";
import logo from "../assets/logo.png";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="
    fixed left-1/2 top-5 -translate-x-1/2 w-[90%]
    rounded-2xl
    px-6 py-3 z-[999]
    flex justify-between items-center
    transition-all duration-300

    /* Solid background + strong separation */
    bg-light
    border border-gray-300
    shadow-[0_10px_40px_rgba(0,0,0,0.25)]
  ">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img
          src={logo}
          alt="SADEVZ Logo"
          className="h-12 transition-transform duration-300 hover:scale-95"
        />
      </div>

      {/* Desktop Navbar */}
      <nav className="hidden md:flex gap-6 font-medium text-sm lg:text-base">
        {["Home", "Services", "Clients", "Events", "Courses", "About", "Contact"].map(
          (item) => (
            <a
              key={item}
              href="#"
              className="relative px-2 text-bluebg transition-all duration-300 font-bold
                after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-bright
                hover:after:w-full after:transition-all after:duration-300 "
            >
              {item}
            </a>
          )
        )}
      </nav>

      {/* Hamburger Button */}
      <button
        className="block md:hidden text-3xl text-darkbg focus:outline-none transition-transform duration-300"
        onClick={toggleMenu}
      >
        {isOpen ? "✖" : "☰"}
      </button>

      {/* Mobile Navbar */}
      <div
        className={`absolute left-0 top-16 w-full bg-light rounded-b-2xl shadow-md flex flex-col items-center gap-4 py-6 font-semibold text-darkbg transition-all duration-500 ease-in-out ${
          isOpen ? "opacity-100 scale-y-100 visible" : "opacity-0 scale-y-0 invisible"
        }`}
        style={{ transformOrigin: "top" }}
      >
        {["Home", "Services", "Clients", "Events", "Courses", "About", "Contact"].map(
          (item) => (
            <a
              key={item}
              href="#"
              className="relative px-2 transition-all duration-300 border-b w-full text-center py-2
                after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-bright
                hover:after:w-full after:transition-all after:duration-300"
            >
              {item}
            </a>
          )
        )}
      </div>
    </header>
  );
}

export default Header;
