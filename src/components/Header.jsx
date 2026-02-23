import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, ChevronRight, X, Menu } from "lucide-react";
import logo from "../assets/horizontal-logo.png";
import { Link } from "react-router-dom";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
        setServicesOpen(false);
        setMobileServicesOpen(false);
      }
    };

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
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
      setServicesOpen(false);
      setMobileServicesOpen(false);
    }
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
    { label: "Home", href: "/" },
    { 
      label: "Services", 
      href: "/services",
      hasDropdown: true 
    },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Blogs", href: "/blog" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" }
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
            <Link to="/" className="relative block">
              <img
                src={logo}
                alt="SADEVZ Logo"
                className="h-10 md:h-12 transition-all duration-300 hover:scale-[0.97]"
              />
            </Link>
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
              {item.hasDropdown ? (
                // For Services with dropdown
                <button
                  className="
                    relative px-4 py-2 
                    text-gray-700 font-medium text-sm
                    transition-all duration-300 
                    group
                    hover:text-bright
                    flex items-center
                  "
                  onClick={() => setServicesOpen(!servicesOpen)}
                >
                  {item.label}
                  <ChevronDown className={`
                    inline-block ml-1 w-4 h-4 transition-transform duration-300
                    ${servicesOpen ? 'rotate-180' : ''}
                  `} />
                  
                  {/* Hover underline effect */}
                  <span className="
                    absolute left-4 bottom-1 
                    h-0.5 w-0 
                    bg-gradient-to-r from-bright to-blue-500
                    transition-all duration-300
                    group-hover:w-[calc(100%-2rem)]
                  "></span>
                </button>
              ) : (
                // For regular navigation items
                <Link
                  to={item.href}
                  className="
                    relative px-4 py-2 
                    text-gray-700 font-medium text-sm
                    transition-all duration-300 
                    group
                    hover:text-bright
                    block
                  "
                >
                  {item.label}
                  {/* Hover underline effect */}
                  <span className="
                    absolute left-4 bottom-1 
                    h-0.5 w-0 
                    bg-gradient-to-r from-bright to-blue-500
                    transition-all duration-300
                    group-hover:w-[calc(100%-2rem)]
                  "></span>
                </Link>
              )}

              {/* Services Dropdown */}
              {item.hasDropdown && servicesOpen && (
                <div 
                  ref={dropdownRef}
                  className="
                    absolute left-1/2 -translate-x-1/2 top-full mt-2
                    w-[480px] max-w-[90vw]
                    rounded-2xl
                    overflow-hidden
                    animate-fadeIn
                    z-50
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

                      {/* Services Grid */}
                      <div className="grid grid-cols-2 gap-4">
                        {servicesItems.map((service, index) => (
                          <Link
                            key={index}
                            to="/services"
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
                              block
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
                          </Link>
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
          <Link 
            to="/start-project"
            className="
              px-5 py-2
              bg-gradient-to-r from-bright to-blue-500
              text-white font-medium rounded-full
              hover:shadow-lg hover:scale-105
              active:scale-95
              transition-all duration-300
              shadow-md
              group
              flex items-center gap-2 text-sm
            "
          >
            Start a Project
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
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

      {/* Mobile Navigation Menu */}
      <div className={`
        fixed inset-0 top-0 z-[999] font-sans
        transition-all duration-500 ease-in-out
        ${isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}
      `}>
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/95 via-gray-900/90 to-gray-900/95">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
              backgroundSize: '30px 30px'
            }}></div>
          </div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 h-full flex flex-col pt-28 pb-10 px-6 overflow-y-auto">
          {/* Close Button */}
          <button
            onClick={toggleMenu}
            className="
              absolute top-6 right-6
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

          {/* Mobile Navigation Links */}
          <div className="space-y-2 mb-8">
            {navItems.map((item) => (
              <div key={item.label} className="relative">
                {item.hasDropdown ? (
                  <>
                    <button
                      onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                      className="
                        w-full py-4 px-4
                        flex items-center justify-between
                        text-lg font-semibold text-white
                        hover:text-bright
                        transition-all duration-300
                        rounded-xl
                        hover:bg-white/5
                        text-left
                      "
                    >
                      <span>{item.label}</span>
                      <ChevronDown className={`
                        w-5 h-5 transition-transform duration-300
                        ${mobileServicesOpen ? 'rotate-180 text-bright' : 'text-gray-400'}
                      `} />
                    </button>
                    
                    {/* Mobile Services Dropdown */}
                    {mobileServicesOpen && (
                      <div className="pl-4 pr-2 py-4 border-l-2 border-bright/30 ml-4">
                        <div className="space-y-3">
                          {servicesItems.map((service, index) => (
                            <Link
                              key={index}
                              to="/services"
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
                                setMobileServicesOpen(false);
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
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    to={item.href}
                    className="
                      block py-4 px-4
                      text-lg font-semibold text-white
                      hover:text-bright
                      transition-all duration-300
                      rounded-xl
                      hover:bg-white/5
                    "
                    onClick={toggleMenu}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Mobile CTA Button */}
          <Link 
            to="/start-project"
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
              mt-4
            "
          >
            Start Project
            <ChevronRight className="w-5 h-5" />
          </Link>
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
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </>
  );
}

export default Header;