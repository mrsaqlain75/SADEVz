import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, ChevronRight, X, Menu } from "lucide-react";
import logo from "../assets/horizontal-logo.png";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownRef = useRef(null);
  const mobileDropdownRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
        setServicesOpen(false);
      }
    };

    const handleClickOutside = (event) => {
      // Desktop dropdown
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setServicesOpen(false);
        setActiveDropdown(null);
      }
      // Mobile dropdown
      if (mobileDropdownRef.current && !mobileDropdownRef.current.contains(event.target) && 
          !event.target.closest('[data-services-button]')) {
        setServicesOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    document.addEventListener("mousedown", handleClickOutside);
    
    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousedown", handleClickOutside);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleServicesHover = () => {
    if (window.innerWidth >= 768) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setServicesOpen(true);
    }
  };

  const handleServicesLeave = () => {
    if (window.innerWidth >= 768) {
      timeoutRef.current = setTimeout(() => {
        setServicesOpen(false);
      }, 300);
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setServicesOpen(false); // Reset services on menu open
    }
  };

  const handleMobileServicesClick = () => {
    setServicesOpen(!servicesOpen);
  };

  const servicesItems = [
    {
      category: "Web Development",
      description: "Custom websites & web applications",
      icon: "🌐"
    },
    {
      category: "Mobile App Development",
      description: "iOS & Android native applications",
      icon: "📱"
    },
    {
      category: "IT Education",
      description: "Personal & corporate training",
      icon: "🎓"
    },
    {
      category: "Digital Solutions",
      description: "Complete digital transformation",
      icon: "🚀"
    }
  ];

  const navItems = [
    { label: "Home", href: "#" },
    { 
      label: "Services", 
      href: "#",
      hasDropdown: true 
    },
    { label: "Portfolio", href: "#" },
    { label: "Blogs", href: "#" },
    { label: "Courses", href: "#" },
    { label: "About", href: "#" },
    { label: "Contact", href: "#" }
  ];

  return (
    <>
      {/* Background Pattern Container - Just for mobile overlay */}
      <div className={`
        fixed inset-0 z-[998]
        ${isOpen ? "block" : "hidden"}
      `}>
        <div className="absolute inset-0 bg-[#1a1a1a]"></div>
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
            backgroundSize: '30px 30px'
          }}></div>
        </div>
      </div>
    
      {/* Premium Glass Header */}
      <header className="
        fixed left-1/2 top-4 -translate-x-1/2 
        w-[95%] lg:w-[94%] xl:w-[92%] max-w-7xl
        rounded-2xl
        font-sans
        px-6 py-2 z-[1000]
        flex justify-between items-center
        transition-all duration-500

        /* Premium Glass Effect */
        bg-white/90 backdrop-blur-xl
        border border-white/30
        shadow-[0_20px_60px_rgba(0,0,0,0.15)]
        hover:shadow-[0_25px_70px_rgba(0,0,0,0.2)]
        
        /* Subtle glow effect */
        before:absolute before:inset-0 before:rounded-2xl 
        before:bg-gradient-to-r before:from-bright/5 before:via-transparent before:to-bright/5
        before:-z-10 before:opacity-0 before:hover:opacity-100
        before:transition-opacity before:duration-500
      ">
        
        {/* Logo */}
        <div className="flex items-center">
          <div className="relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-bright/20 to-blue-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <img
              src={logo}
              alt="SADEVZ Logo"
              className="relative h-10 md:h-12 transition-all duration-300 hover:scale-[0.97]"
            />
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <div 
              key={item.label} 
              className="relative"
              onMouseEnter={() => item.hasDropdown && handleServicesHover()}
              onMouseLeave={() => item.hasDropdown && handleServicesLeave()}
            >
              <a
                href={item.href}
                className="
                  relative px-4 py-2 
                  text-gray-700 font-medium text-sm
                  transition-all duration-300 
                  group
                  hover:text-bright
                "
                onClick={(e) => {
                  if (item.hasDropdown) {
                    e.preventDefault();
                    setServicesOpen(!servicesOpen);
                  }
                }}
              >
                {item.label}
                {item.hasDropdown && (
                  <ChevronDown className={`
                    inline-block ml-1 w-4 h-4 transition-transform duration-300
                    ${servicesOpen ? 'rotate-180' : ''}
                  `} />
                )}
                
                {/* Hover underline effect */}
                <span className="
                  absolute left-4 bottom-1 
                  h-0.5 w-0 
                  bg-gradient-to-r from-bright to-blue-500
                  transition-all duration-300
                  group-hover:w-[calc(100%-2rem)]
                "></span>
              </a>

              {/* Services Dropdown - Simplified */}
              {item.hasDropdown && servicesOpen && (
                <div 
                  ref={dropdownRef}
                  className="
                    absolute left-1/2 -translate-x-1/2 top-full mt-2
                    w-[480px] max-w-[90vw]
                    rounded-2xl
                    overflow-hidden
                    animate-fadeIn
                  "
                  onMouseEnter={handleServicesHover}
                  onMouseLeave={handleServicesLeave}
                >
                  {/* Add background pattern to dropdown */}
                  <div className="absolute inset-0 opacity-3">
                    <div className="absolute inset-0" style={{
                      backgroundImage: `radial-gradient(circle at 1px 1px, #000000 1px, transparent 0)`,
                      backgroundSize: '30px 30px'
                    }}></div>
                  </div>
                  
                  {/* Glass background with border */}
                  <div className="
                    relative z-10
                    bg-white/95 backdrop-blur-xl
                    border border-gray-200/80
                    rounded-2xl
                    shadow-2xl shadow-black/10
                    overflow-hidden
                  ">
                    {/* Gradient top border */}
                    <div className="h-1 bg-gradient-to-r from-bright via-blue-500 to-bright"></div>
                    
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-gray-900">
                          Our Services
                        </h3>
                        <span className="text-sm font-medium text-gray-500">
                          Premium Solutions
                        </span>
                      </div>

                      {/* Simplified Services Grid - No sub-points */}
                      <div className="grid grid-cols-2 gap-4">
                        {servicesItems.map((service, index) => (
                          <a
                            key={index}
                            href="#"
                            className="
                              group
                              p-4
                              rounded-xl
                              bg-gray-50/50
                              border border-gray-200
                              hover:border-bright/30
                              hover:bg-gradient-to-br hover:from-white hover:to-gray-50
                              hover:shadow-lg
                              transition-all duration-300
                            "
                            onClick={() => setServicesOpen(false)}
                          >
                            <div className="flex items-start gap-3">
                              <span className="text-2xl group-hover:scale-110 transition-transform">
                                {service.icon}
                              </span>
                              <div>
                                <h4 className="font-semibold text-gray-900 mb-1 group-hover:text-bright transition-colors">
                                  {service.category}
                                </h4>
                                <p className="text-sm text-gray-600">
                                  {service.description}
                                </p>
                              </div>
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:flex items-center gap-4">
          <button className="
            px-5 py-2
            bg-gradient-to-r from-bright to-blue-500
            text-white font-medium rounded-full
            hover:shadow-lg hover:scale-105
            active:scale-95
            transition-all duration-300
            shadow-md
            group
          ">
            <span className="flex items-center gap-2 text-sm">
              Start a Project
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="
            block md:hidden 
            p-2.5 
            rounded-xl 
            bg-white/50 backdrop-blur-sm
            border border-gray-200
            text-gray-700 
            hover:text-bright hover:border-bright/30
            focus:outline-none 
            transition-all duration-300
            hover:shadow-md
          "
          onClick={toggleMenu}
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </header>

      {/* Premium Mobile Navigation Overlay - Simplified with background pattern */}
      <div className={`
        fixed inset-0 top-0 z-[999] font-sans
        transition-all duration-500 ease-in-out
        ${isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}
      `}>
        {/* The background pattern container */}
        <div className="absolute inset-0 bg-[#1a1a1a]">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
              backgroundSize: '30px 30px'
            }}></div>
          </div>
        </div>
        
        {/* Gradient overlay for depth */}
        <div className="
          absolute inset-0
          bg-gradient-to-b from-gray-900/95 via-gray-900/90 to-gray-900/95
          backdrop-blur-xl
        "></div>
        
        {/* Content container */}
        <div className="
          relative z-10
          h-full 
          flex flex-col 
          pt-28 pb-10 px-6
          overflow-y-auto
        ">
          {/* Premium Header in Mobile Menu */}
          <div className="absolute top-8 left-6 right-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-bright/20 to-blue-500/20 rounded-xl blur opacity-50"></div>
                <img
                  src={logo}
                  alt="SADEVZ Logo"
                  className="relative h-10"
                />
              </div>
              <span className="text-sm font-medium text-gray-300">
                Premium Digital Studio
              </span>
            </div>
            
            {/* Close Button */}
            <button
              onClick={toggleMenu}
              className="
                p-3 
                rounded-xl 
                bg-white/10 backdrop-blur-sm
                border border-white/20
                text-white
                hover:bg-bright/20 hover:border-bright/30
                transition-all duration-300
              "
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile Nav Items - Premium Layout */}
          <div className="space-y-2 mb-8">
            {navItems.map((item, index) => (
              <div key={item.label} className="relative group">
                {item.hasDropdown ? (
                  <>
                    <button
                      data-services-button
                      onClick={handleMobileServicesClick}
                      className="
                        w-full py-4 px-4
                        flex items-center justify-between
                        text-lg font-semibold text-white
                        hover:text-bright
                        transition-all duration-300
                        rounded-xl
                        hover:bg-white/5
                        group
                      "
                    >
                      <span className="flex items-center gap-3">
                        {/* Dot indicator for hover - same as other items */}
                        <div className="
                          w-2 h-2 rounded-full 
                          bg-gradient-to-r from-bright to-blue-500
                          opacity-0 group-hover:opacity-100
                          transition-opacity duration-300
                        "></div>
                        {item.label}
                      </span>
                      <ChevronDown className={`
                        w-5 h-5 transition-transform duration-300
                        ${servicesOpen ? 'rotate-180 text-bright' : 'text-gray-400'}
                      `} />
                    </button>
                    
                    {/* Mobile Services Dropdown - Premium */}
                    {servicesOpen && (
                      <div 
                        ref={mobileDropdownRef}
                        className="
                          pl-4 pr-2 py-4
                          animate-slideDown
                          border-l-2 border-bright/30
                          ml-4
                        "
                      >
                        <div className="space-y-3">
                          {servicesItems.map((service, serviceIndex) => (
                            <a
                              key={serviceIndex}
                              href="#"
                              className="
                                block
                                p-4
                                rounded-xl
                                bg-white/5
                                border border-white/10
                                hover:bg-gradient-to-r hover:from-bright/10 hover:to-blue-500/10
                                hover:border-bright/30
                                hover:shadow-lg
                                transition-all duration-300
                                group
                              "
                              onClick={() => {
                                setServicesOpen(false);
                                setIsOpen(false);
                              }}
                            >
                              <div className="flex items-center gap-4">
                                <span className="text-2xl group-hover:scale-110 transition-transform">
                                  {service.icon}
                                </span>
                                <div>
                                  <h4 className="font-semibold text-white mb-1 group-hover:text-bright transition-colors">
                                    {service.category}
                                  </h4>
                                  <p className="text-sm text-gray-400">
                                    {service.description}
                                  </p>
                                </div>
                              </div>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <a
                    href={item.href}
                    className="
                      block py-4 px-4
                      text-lg font-semibold text-white
                      hover:text-bright
                      transition-all duration-300
                      rounded-xl
                      hover:bg-white/5
                      flex items-center gap-3
                      group
                    "
                    onClick={toggleMenu}
                  >
                    <div className="
                      w-2 h-2 rounded-full 
                      bg-gradient-to-r from-bright to-blue-500
                      opacity-0 group-hover:opacity-100
                      transition-opacity duration-300
                    "></div>
                    {item.label}
                  </a>
                )}
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent my-6"></div>

          {/* Premium Mobile CTA */}
          <div className="mt-auto">
            <div className="
              bg-gradient-to-br from-gray-800/50 to-gray-900/50
              backdrop-blur-xl
              rounded-2xl p-6 
              border border-white/10
              shadow-2xl shadow-black/20
            ">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-full bg-gradient-to-r from-bright/20 to-blue-500/20">
                  <div className="w-5 h-5 flex items-center justify-center text-bright font-bold">+</div>
                </div>
                <h4 className="font-bold text-white text-lg">
                  Transform Your Vision
                </h4>
              </div>
              <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                Partner with experts to build exceptional digital experiences that drive results and exceed expectations.
              </p>
              <button 
                onClick={toggleMenu}
                className="
                  w-full py-4
                  bg-gradient-to-r from-bright to-blue-500
                  text-white font-semibold rounded-xl
                  hover:shadow-xl hover:scale-[1.02]
                  active:scale-[0.98]
                  transition-all duration-300
                  shadow-lg
                  flex items-center justify-center gap-2
                "
              >
                <span>Start a Project</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Contact Info in Mobile Menu */}
          <div className="mt-8 text-center">
            <div className="text-sm text-gray-400 space-y-2">
              <p>Ready to discuss your project?</p>
              <p className="text-white font-medium">info@sadevz.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Add animations to CSS */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-8px);
            max-height: 0;
          }
          to {
            opacity: 1;
            transform: translateY(0);
            max-height: 500px;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </>
  );
}

export default Header;