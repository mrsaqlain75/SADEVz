const servicesData = [
  {
    id: 1,
    title: "Website Development",
    slug: "website-development",
    description: "Professional, responsive websites that convert visitors into customers. We build fast, SEO-optimized websites with modern technologies.",
    detailedDescription: "We create custom websites that not only look great but also perform exceptionally. From simple brochure sites to complex web applications, we ensure your website is mobile-friendly, fast-loading, and optimized for search engines.",
    icon: "🌐",
    category: "web",
    features: [
      "Custom WordPress/React websites",
      "E-commerce solutions",
      "Landing pages that convert",
      "Mobile-responsive design",
      "SEO optimization",
      "Website maintenance & support"
    ],
    technologies: ["HTML5", "CSS3", "JavaScript", "React", "WordPress", "Tailwind"],
    pricing: "Custom Rates",
    timeline: "4-8 weeks",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Web Application Development",
    slug: "web-application",
    description: "Scalable, secure web applications tailored to your business needs. We build robust solutions that grow with you.",
    detailedDescription: "Transform your business processes with custom web applications. We develop secure, scalable applications that streamline operations, improve efficiency, and provide competitive advantages.",
    icon: "💻",
    category: "web",
    features: [
      "Custom SaaS applications",
      "CRM & ERP solutions",
      "Real-time applications",
      "API integration",
      "User authentication systems",
      "Cloud deployment"
    ],
    technologies: ["Node.js", "React", "MongoDB", "Express", "Firebase", "AWS"],
    pricing: "Custom Rates",
    timeline: "4-8 weeks",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w-800&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Mobile Application Development",
    slug: "mobile-application",
    description: "Native and cross-platform mobile apps for iOS and Android. Engaging user experiences that drive growth.",
    detailedDescription: "Reach your customers on their preferred devices with high-performance mobile applications. We create intuitive, feature-rich apps that provide seamless experiences across all platforms.",
    icon: "📱",
    category: "mobile",
    features: [
      "iOS & Android native apps",
      "React Native cross-platform",
      "App store submission",
      "Push notifications",
      "Offline functionality",
      "App analytics integration"
    ],
    technologies: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase"],
    pricing: "Custom Rates",
    timeline: "6-10 weeks",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "Graphic Design",
    slug: "graphic-design",
    description: "Stunning visual designs that communicate your brand's story and values effectively.",
    detailedDescription: "From logos to complete brand identities, we create visually compelling designs that resonate with your audience and strengthen your brand presence across all touchpoints.",
    icon: "🎨",
    category: "design",
    features: [
      "Logo & brand identity",
      "Marketing materials",
      "Social media graphics",
      "UI/UX design",
      "Print design",
      "Infographics & presentations"
    ],
    technologies: ["Adobe Photoshop", "Illustrator", "Figma", "Canva", "InDesign"],
    pricing: "Starting at $20",
    timeline: "1-2 weeks",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&auto=format&fit=crop"
  },
  {
    id: 5,
    title: "IT Courses & Training",
    slug: "it-courses",
    description: "Comprehensive IT training programs to upskill your team or start your tech career.",
    detailedDescription: "We offer personalized training programs in modern technologies. Whether you're a beginner or looking to advance your skills, our courses are designed for practical, real-world application.",
    icon: "📚",
    category: "education",
    features: [
      "Web development bootcamps",
      "Programming fundamentals",
      "Frontend & backend training",
      "Corporate team training",
      "Project-based learning",
      "Career guidance & support"
    ],
    technologies: ["JavaScript", "Python", "React", "Node.js", "Database Design"],
    pricing: "Starting at $50",
    timeline: "Custom schedule",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop"
  },
  {
    id: 6,
    title: "IT Consultation",
    slug: "it-consultation",
    description: "Expert guidance to optimize your technology stack and digital strategy for maximum ROI.",
    detailedDescription: "Get strategic advice on technology adoption, digital transformation, and IT infrastructure. We help you make informed decisions that align technology with your business goals.",
    icon: "🤝",
    category: "consulting",
    features: [
      "Technology strategy",
      "Digital transformation",
      "System architecture review",
      "Vendor selection",
      "Cost optimization",
      "Security assessment"
    ],
    technologies: ["Cloud Solutions", "DevOps", "Security", "Architecture"],
    pricing: "$20/hour",
    timeline: "Flexible",
    image: "https://images.unsplash.com/photo-1552664688-cf412ec27db2?w=800&auto=format&fit=crop"
  }
];

export default servicesData;