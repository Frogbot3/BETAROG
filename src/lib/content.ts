export type Service = {
  id: string;
  title: string;
  description: string;
  detail: string;
  offerings: string[];
  icon: "cpu" | "code" | "layers" | "pen" | "shield" | "cloud";
};
export const services: Service[] = [
  {
    id: "ai",
    title: "AI & Machine Learning",
    description:
      "Intelligent features. Practical automation. New possibilities.",
    detail:
      "Bring intelligence into the workflow where it makes a meaningful difference. We explore AI integrations, ML-powered features, and practical automation with clear objectives and room to learn.",
    offerings: [
      "AI integrations",
      "Intelligent workflows",
      "ML-powered prototypes",
    ],
    icon: "cpu",
  },
  {
    id: "web",
    title: "Web Development",
    description: "Fast, thoughtful web experiences, built to go further.",
    detail:
      "From a focused website to a connected product, we develop responsive interfaces and the systems behind them. Performance, accessibility, and maintainable code guide the work.",
    offerings: ["Websites & SaaS platforms", "E-commerce", "Custom dashboards"],
    icon: "code",
  },
  {
    id: "software",
    title: "Software Engineering",
    description: "Purpose-built systems for real-world complexity.",
    detail:
      "Turn complicated processes into software that is clear to use and easier to evolve. Our interests span custom business systems, API development, database architecture, and offline desktop tools.",
    offerings: [
      "Business applications",
      "Backend systems & APIs",
      "Offline desktop software",
    ],
    icon: "layers",
  },
  {
    id: "design",
    title: "UI/UX & Digital Experiences",
    description: "Clear interfaces. Considered interactions. Human outcomes.",
    detail:
      "Connect the idea to the person using it. We shape product journeys, responsive interfaces, and consistent design systems, with motion that helps explain how things work.",
    offerings: ["Product design", "Design systems", "Interactive experiences"],
    icon: "pen",
  },
  {
    id: "security",
    title: "Cybersecurity Solutions",
    description: "Security-minded engineering and monitoring experiments.",
    detail:
      "Explore security through software: monitoring dashboards, visualization, and defensive engineering practices. This is development and experimentation, not a formal security audit or certification service.",
    offerings: [
      "Monitoring interfaces",
      "Security visualization",
      "Security-focused prototypes",
    ],
    icon: "shield",
  },
  {
    id: "cloud",
    title: "Cloud & Deployment",
    description: "From the first commit to a considered production launch.",
    detail:
      "Connect the application to the infrastructure it needs. We work with deployment pipelines, managed integrations, and cloud-connected architectures, with practical launch support.",
    offerings: [
      "Deployment pipelines",
      "Managed integrations",
      "Launch support",
    ],
    icon: "cloud",
  },
];

export type Project = {
  slug: string;
  name: string;
  category: string;
  filter: "Web" | "Software" | "Research";
  status: string;
  summary: string;
  description: string;
  stack: string[];
  visual: "commerce" | "mosque" | "security" | "research";
  url?: string;
  image?: string;
  imageAlt?: string;
  story: { title: string; text: string }[];
};
export const projects: Project[] = [
  {
    slug: "tech-ai",
    name: "TECH AI",
    category: "E-commerce / Full-Stack Development",
    filter: "Web",
    status: "Deployed project",
    visual: "commerce",
    url: "https://techai-theta.vercel.app",
    image: "/images/tech-ai.webp",
    imageAlt:
      "Verified TECH AI storefront showing its electronics shopping interface",
    summary:
      "A full-stack commerce platform, from storefront to administration.",
    description:
      "A full-stack e-commerce platform with a customer storefront, product management, cart and checkout, order handling, authentication, and administrative management features.",
    stack: [
      "Next.js",
      "React",
      "MongoDB",
      "Firebase Authentication",
      "Razorpay",
      "Vercel",
    ],
    story: [
      {
        title: "The problem",
        text: "Bring the customer shopping journey and the operational side of an online store into one full-stack platform.",
      },
      {
        title: "The approach",
        text: "Connect a Next.js and React storefront to product and order data, authentication, payments, and administrative workflows.",
      },
      {
        title: "Implementation",
        text: "The supplied project scope includes product management, cart and checkout, order handling, authentication, and administration. The linked storefront is available for visitors to explore.",
      },
      {
        title: "Engineering considerations",
        text: "Commerce spans interface state, authentication, data integrity, and payment handling. Detailed implementation decisions and verified testing results can be added here after review of the project repository.",
      },
      {
        title: "Current outcome",
        text: "A deployed storefront is available at the link above. No traffic, revenue, conversion, or production reliability results are asserted in this case study.",
      },
    ],
  },
  {
    slug: "mosque-suite",
    name: "Mosque Suite",
    category: "Offline Management Software",
    filter: "Software",
    status: "In Development",
    visual: "mosque",
    summary: "Offline-first administration. Built around community.",
    description:
      "A desktop-focused mosque management application concept for ward, family, and member registration, payment records, and administrative workflows. The project remains in development.",
    stack: ["React", "Electron", "SQLite"],
    story: [
      {
        title: "The problem",
        text: "Community administration involves connected records for wards, families, members, and payments. The concept explores a focused way to organize these tasks on a desktop.",
      },
      {
        title: "The approach",
        text: "An offline-focused application using React for the interface, Electron for the desktop shell, and SQLite for local storage.",
      },
      {
        title: "Planned implementation",
        text: "The intended scope includes registration, payment records, and administrative workflows. These are development goals, not a claim of completed or released features.",
      },
      {
        title: "Engineering considerations",
        text: "Data validation, relationships between records, backup and recovery, and desktop distribution will need careful implementation and testing.",
      },
      {
        title: "Current outcome",
        text: "In development. A release, real interface screenshots, and verified implementation details have not yet been supplied.",
      },
    ],
  },
  {
    slug: "cybersecurity-dashboard",
    name: "Cybersecurity Dashboard",
    category: "Cybersecurity / Monitoring",
    filter: "Research",
    status: "Experimental",
    visual: "security",
    summary: "Exploring how security signals become a clearer picture.",
    description:
      "An experimental monitoring dashboard exploring network traffic analysis, attack-pattern detection, and dashboard-based security visualization.",
    stack: ["Python", "Flask", "Monitoring libraries"],
    story: [
      {
        title: "The question",
        text: "How can a dashboard help make network activity and potential attack patterns easier to explore?",
      },
      {
        title: "The approach",
        text: "Experiment with Python, Flask, and security monitoring libraries to connect traffic analysis with visual exploration.",
      },
      {
        title: "Experimental scope",
        text: "Network traffic analysis, attack-pattern detection, and security visualization are areas of investigation. No production security capability or detection accuracy is claimed.",
      },
      {
        title: "Engineering considerations",
        text: "False positives, data provenance, privacy, and responsible testing are important questions for continued development.",
      },
      {
        title: "Current outcome",
        text: "Experimental prototype. Validated results and real product screenshots remain to be documented.",
      },
    ],
  },
  {
    slug: "ai-ml-experiments",
    name: "AI & ML Experiments",
    category: "Research & Development",
    filter: "Research",
    status: "Areas of exploration",
    visual: "research",
    summary: "Learning by asking better questions, then building to find out.",
    description:
      "A space for machine-learning experiments, intelligent features, prototypes, and research-oriented engineering work. Individual experiments will be added when real details and assets are available.",
    stack: ["Python", "Machine-learning fundamentals", "Experimentation"],
    story: [
      {
        title: "The direction",
        text: "Explore artificial intelligence through practical questions, small prototypes, and careful evaluation.",
      },
      {
        title: "The approach",
        text: "Start with a clear question, establish a baseline, and document what the experiment actually shows.",
      },
      {
        title: "Implementation",
        text: "This collection is reserved for documented work. No individual completed experiment is being presented yet.",
      },
      {
        title: "Engineering considerations",
        text: "Useful evaluation, reproducibility, data quality, and the limits of a model matter as much as its interface.",
      },
      {
        title: "Current outcome",
        text: "An evolving area of exploration. Verified experiments and their findings will be published when available.",
      },
    ],
  },
];

export const processSteps = [
  { name: "Discover", text: "Understand the idea and objectives." },
  { name: "Design", text: "Define the architecture and user experience." },
  { name: "Develop", text: "Engineer a reliable, maintainable solution." },
  { name: "Refine", text: "Test, optimize, and improve." },
  { name: "Launch", text: "Deploy, monitor, and evolve." },
];
export const technologies = [
  {
    category: "Frontend",
    items: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS"],
  },
  { category: "Backend", items: ["Node.js", "Python", "API development"] },
  { category: "Databases", items: ["MongoDB", "MySQL", "SQLite"] },
  { category: "Cloud & Tools", items: ["Vercel", "Firebase", "GitHub"] },
  {
    category: "AI & Engineering",
    items: ["Python", "ML fundamentals", "Experimentation"],
  },
];
