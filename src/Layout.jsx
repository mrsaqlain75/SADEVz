import React from 'react';
import ScrollProgressBar from "./components/ScrollProgressBar";
import Header from "./components/Header";
import Footer from "./components/Footer";

const Layout = ({ children }) => {
  return (
    <div className="relative min-h-screen bg-light text-accent">
      <ScrollProgressBar />
      <Header />
      <main className="pt-20"> {/* Increased to pt-20 for better spacing */}
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;