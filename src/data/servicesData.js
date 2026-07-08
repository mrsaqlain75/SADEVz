const servicesData = [
  // ============================================
  // PILLAR 1: BUILD (Core Development)
  // ============================================
  {
    id: 1,
    title: "Custom Website Development",
    slug: "custom-website-development",
    description: "High-performance, conversion-optimized websites engineered for speed, SEO, and user engagement.",
    detailedDescription: "We don't use drag-and-drop builders. We hand-code custom websites that load in under 2 seconds, rank higher on Google, and guide visitors seamlessly toward becoming paying customers. From simple brochure sites to complex multi-vendor marketplaces, we build digital experiences that drive real business growth.",
    icon: "",
    category: "build",
    features: [
      "Custom React & Next.js websites",
      "Headless CMS (WordPress, Contentful, Sanity)",
      "E-commerce with integrated payments (Stripe/PayPal)",
      "SEO-optimized architecture (100+ Google Lighthouse score)",
      "Interactive animations & micro-interactions",
      "Ongoing speed optimization & maintenance"
    ],
    technologies: ["React", "Next.js", "Node.js", "Tailwind CSS", "WordPress", "AWS"],
    pricing: "Custom Quote",
    timeline: "4-6 weeks",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: 2,
    title: "Web Application Development",
    slug: "web-application-development",
    description: "Scalable SaaS platforms, internal dashboards, and complex web systems built for enterprise-grade performance.",
    detailedDescription: "We transform messy manual workflows into robust, cloud-native web applications. Whether it's a multi-tenant SaaS product, an internal operations dashboard, or a client portal, we architect solutions that handle thousands of concurrent users, integrate with your legacy systems, and scale effortlessly as your business grows.",
    icon: "",
    category: "build",
    features: [
      "Full-stack SaaS application development",
      "Custom CRM & ERP solutions",
      "Real-time data dashboards & analytics",
      "Third-party API integrations (Stripe, QuickBooks, Salesforce)",
      "Role-based access control & multi-tenancy",
      "CI/CD pipeline & cloud deployment (AWS/GCP/Azure)"
    ],
    technologies: ["React", "Node.js", "Python", "PostgreSQL", "MongoDB", "Docker", "AWS"],
    pricing: "Custom Quote",
    timeline: "8-12 weeks",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: 3,
    title: "Mobile Application Development",
    slug: "mobile-application-development",
    description: "Native-feeling cross-platform mobile apps that deliver seamless experiences on iOS and Android.",
    detailedDescription: "Reach your customers wherever they are with high-performance mobile applications. We use React Native to build apps that feel native on both platforms while sharing up to 90% of the codebase. From social networking to on-demand delivery, we craft engaging mobile experiences that keep users coming back.",
    icon: "",
    category: "build",
    features: [
      "Cross-platform (iOS & Android) with React Native",
      "Native performance & animations",
      "Offline-first architecture",
      "Push notifications & real-time updates",
      "App Store & Google Play submission",
      "Mobile analytics & crash reporting"
    ],
    technologies: ["React Native", "TypeScript", "Firebase", "GraphQL", "Expo"],
    pricing: "Custom Quote",
    timeline: "10-14 weeks",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: 4,
    title: "UI/UX Design & Prototyping",
    slug: "ui-ux-design-prototyping",
    description: "Human-centered design that turns complex workflows into intuitive, delightful user experiences.",
    detailedDescription: "We design digital products that users actually enjoy using. Through user research, rapid prototyping, and usability testing, we create interfaces that reduce cognitive load, minimize friction, and maximize conversion. We deliver pixel-perfect Figma designs and clickable prototypes that feel like the real product—before we write a single line of code.",
    icon: "",
    category: "build",
    features: [
      "User research & persona mapping",
      "Information architecture & wireframing",
      "High-fidelity interactive prototypes",
      "Design systems & component libraries",
      "Usability testing & iteration",
      "Accessibility (WCAG 2.1) compliance"
    ],
    technologies: ["Figma", "Adobe XD", "Sketch", "InVision", "Miro"],
    pricing: "Starting at $800/project",
    timeline: "2-4 weeks",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&auto=format&fit=crop&q=80"
  },

  // ============================================
  // PILLAR 2: AUTOMATE (AI & Digitization)
  // ============================================
  {
    id: 5,
    title: "Business Process Digitization",
    slug: "business-process-digitization",
    description: "Eliminate manual data entry, spreadsheets, and paper-based workflows with custom digital systems.",
    detailedDescription: "We audit your current operations, identify bottlenecks, and build custom digital solutions that automate repetitive tasks. From invoice processing and inventory management to employee onboarding and client communication—we replace chaos with structured, auditable, real-time digital workflows that save your team 10–20 hours per week.",
    icon: "",
    category: "automate",
    features: [
      "Manual-to-digital workflow mapping",
      "Custom admin dashboards & reporting",
      "Legacy data migration (Excel/Access to cloud)",
      "Automated approval chains & notifications",
      "Document management systems",
      "Inventory & asset tracking"
    ],
    technologies: ["React", "Node.js", "PostgreSQL", "AWS", "Zapier", "Make.com"],
    pricing: "Custom Quote",
    timeline: "6-10 weeks",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: 6,
    title: "AI-Powered Integration & Automation",
    slug: "ai-integration-automation",
    description: "Infuse your applications with artificial intelligence to automate cognitive tasks and unlock insights from your data.",
    detailedDescription: "We integrate cutting-edge AI models (OpenAI, Claude, Gemini, and open-source LLMs) into your existing workflows. Whether it's auto-summarizing customer support tickets, extracting data from thousands of contracts, or building a 'private GPT' trained on your proprietary documents, we turn your data into your company's most valuable asset. Your team stops reading and starts deciding.",
    icon: "",
    category: "automate",
    features: [
      "AI-powered lead qualification chatbots",
      "Document OCR + intelligent data extraction",
      "Automated meeting transcription & summarization",
      "Custom 'Private GPT' trained on your internal docs",
      "Anomaly detection & predictive alerts",
      "Sentiment analysis on customer feedback"
    ],
    technologies: ["OpenAI GPT-4", "Claude 3", "LangChain", "Pinecone", "Hugging Face", "Python"],
    pricing: "Custom Quote (Setup + Monthly Retainer)",
    timeline: "4-8 weeks",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=80"
  },

  // ============================================
  // PILLAR 3: TRAIN (Education & Adoption)
  // ============================================
  {
    id: 7,
    title: "IT Adoption & Change Management",
    slug: "it-adoption-change-management",
    description: "We ensure your team actually uses the technology we build—through hands-on training and continuous support.",
    detailedDescription: "Software is useless if your employees refuse to use it. Unlike agencies that 'throw the keys' and disappear, we stay until your team is fully onboarded. We design customized training programs—from live workshops to bite-sized video tutorials—that teach your staff not just how to click buttons, but why the new system makes their daily jobs easier. We turn resistance into enthusiasm.",
    icon: "",
    category: "train",
    features: [
      "On-site & remote group training sessions",
      "Role-based video tutorials (Sales, Ops, Management)",
      "Interactive user guides & knowledge bases",
      "Post-launch 'Tech Office Hours' (weekly Q&A)",
      "User adoption metrics & feedback loops",
      "Advanced Prompt Engineering workshops"
    ],
    technologies: ["Loom", "Notion", "Zapier", "Custom LMS", "Slack", "Zoom"],
    pricing: "Starting at $1,500",
    timeline: "2-4 weeks (ongoing)",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: 8,
    title: "AI Literacy & Corporate Training",
    slug: "ai-literacy-corporate-training",
    description: "Empower your workforce with practical AI skills that boost productivity and innovation.",
    detailedDescription: "The AI revolution is here—but most employees don't know how to use it effectively. We deliver immersive, hands-on workshops that teach your team how to harness AI for their specific roles. From marketing teams writing better copy with ChatGPT to operations teams automating data analysis, we demystify AI and turn it into your competitive advantage.",
    icon: "",
    category: "train",
    features: [
      "Practical AI for business (non-technical)",
      "Prompt engineering mastery",
      "AI for marketing & content creation",
      "AI for data analysis & reporting",
      "AI ethics & responsible usage",
      "Custom AI tool implementation (Copilot, Claude, etc.)"
    ],
    technologies: ["ChatGPT", "Claude", "Midjourney", "Microsoft Copilot", "Google Gemini"],
    pricing: "Starting at $2,000/workshop",
    timeline: "1-2 days (half/full-day workshops)",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80"
  },

  // ============================================
  // BONUS: The "Sticky" Retainer Service
  // ============================================
  {
    id: 9,
    title: "Maintenance & Security Retainers",
    slug: "maintenance-security-retainers",
    description: "24/7 monitoring, security patching, and technical support—so you never worry about downtime or breaches.",
    detailedDescription: "Software rots if you neglect it. Our monthly retainer acts as your fractional CTO, ensuring your applications stay fast, secure, and bug-free. We handle server monitoring, automated backups, dependency updates, security patches, and performance optimization. You focus on running your business; we keep the digital lights on.",
    icon: "",
    category: "consulting",
    features: [
      "24/7 server uptime monitoring & alerting",
      "Automated daily backups (multi-region)",
      "Security vulnerability scanning & patching",
      "SSL certificate & domain management",
      "Content & database performance optimization",
      "Priority support & emergency bug fixes"
    ],
    technologies: ["AWS", "Cloudflare", "Sentry", "Datadog", "GitHub", "Dependabot"],
    pricing: "Starting at $500/month",
    timeline: "Ongoing (monthly contract)",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: 10,
    title: "Technology Strategy & Consulting",
    slug: "technology-strategy-consulting",
    description: "Fractional CTO guidance to align your technology decisions with your business goals.",
    detailedDescription: "Not sure which tools to adopt? Worried about technical debt? Need an unbiased opinion on vendor selection? We provide strategic IT consulting that cuts through the noise. We help you build a technology roadmap, optimize your cloud costs, assess your system architecture, and prepare for your next funding round—all without hiring a full-time CTO.",
    icon: "",
    category: "consulting",
    features: [
      "Technology stack assessment & recommendations",
      "Digital transformation strategy",
      "Cloud cost optimization",
      "System architecture & security reviews",
      "Vendor selection & procurement",
      "Pre-investment due diligence"
    ],
    technologies: ["AWS", "Azure", "GCP", "Kubernetes", "Microservices", "Security"],
    pricing: "$150/hour or $2,000/day",
    timeline: "Flexible (1-day audit to multi-month advisory)",
    image: "https://images.unsplash.com/photo-1552664688-cf412ec27db2?w=800&auto=format&fit=crop&q=80"
  }
];

export default servicesData;