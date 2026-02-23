import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ScrollProgressBar from "./components/ScrollProgressBar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import WhoWeAre from "./components/WhoWeAre";
import ServicesSection from "./components/ServicesSection";
import TechnologyCarousel from "./components/TechnologyCarousel";
import WorkflowSection from "./components/WorkflowSection";
import PortfolioSection from "./components/PortfolioSection";
import ClientLogos from "./components/ClientLogos";
import TeamSection from "./components/TeamSection";
import ServicesPage from "./pages/ServicesPage";
import PortfolioPage from "./pages/PortfolioPage";
import AboutPage from './pages/About';
import ContactPage from './pages/ContactPage';
import AdminBlogPage from './pages/AdminBlogPage';
import BlogPage from './pages/BlogPage';
import BlogViewPage from './pages/BlogViewPage';
// Import Admin Pages
import Login from "./components/Auth/Login";
import AdminLayout from "./components/Admin/AdminLayout";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import { HelmetProvider } from 'react-helmet-async';


// Import Project Intake
import StartProjectPage from "./pages/StartProjectPage";

// Layout Wrapper for main site
const AppLayout = ({ children }) => (
  <div className="relative min-h-screen font-sans">
    <ScrollProgressBar />
    <Header />
    <div> {/* Adjusted padding for better spacing */}
      {children}
    </div>
    <Footer />
  </div>
);

// Homepage Component
const HomePage = () => (
  <>
    <Hero />
    <WhoWeAre />
    <ServicesSection />
    <TechnologyCarousel />
    <WorkflowSection />
    <PortfolioSection />
    <ClientLogos />
    <TeamSection />
  </>
);

// Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('admin_token');
  
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }
  
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={
          <AppLayout>
            <HomePage />
          </AppLayout>
        } />

          <Route path="/services" element={
            <AppLayout>
              <ServicesPage />
            </AppLayout>
          } />

            <Route path="/portfolio" element={
            <AppLayout>
              <PortfolioPage />
            </AppLayout>
          } />

            <Route path="/about" element={
            <AppLayout>
              <AboutPage />
            </AppLayout>
          } />

          <Route path="/contact" element={
            <AppLayout>
              <ContactPage />
            </AppLayout>
          } />
        
        <Route path="/start-project" element={
          <AppLayout>
            <StartProjectPage />
          </AppLayout>
        } />

        <Route path="/blog" element={
          <AppLayout>
            <BlogPage />
          </AppLayout>
        } />

        <Route path="/blog/:slug" element={
          <AppLayout>
            <BlogViewPage />
          </AppLayout>
        } />
        
        {/* Admin Authentication */}
        <Route path="/admin/login" element={<Login />} />
        
        {/* Protected Admin Routes */}
        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route path="dashboard" element={<AdminDashboardPage />} />
          <Route path="blog" element={<AdminBlogPage />} /> {/* NEW */}
          <Route index element={<Navigate to="dashboard" replace />} />
        </Route>

        <Route path="blog" element={<AdminBlogPage />} />


        
        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;