// Layout.jsx - Alternative
import React from 'react';
import ScrollProgressBar from "./ScrollProgressBar";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children, hideSections }) => {
  return (
    <div className="relative min-h-screen bg-light text-accent">
      <ScrollProgressBar />
      <Header />
      <main className="pt-16">
        {children}
      </main>
      {/* Conditionally render footer */}
      {!hideSections && <Footer />}
    </div>
  );
};

export default Layout;