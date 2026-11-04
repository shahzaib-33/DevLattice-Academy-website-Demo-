/**
 * Course catalogue. All entries are editable sample programs that show
 * the layout. Replace titles, durations and outlines with official data.
 */

export type Level = "Beginner" | "Intermediate" | "Advanced";
export type Category = "Web Engineering" | "AI & Data" | "Design" | "Cloud & DevOps" | "Mobile";

export interface Course {
  id: string;
  title: string;
  category: Category;
  description: string;
  skills: string[];
  duration: string;
  level: Level;
  format: string;
  hue: number; // drives the generated cover artwork
  pattern: "lattice" | "orbit" | "wave" | "grid" | "prism";
  outline: string[];
  outcome: string;
}

export const categories: Category[] = ["Web Engineering", "AI & Data", "Design", "Cloud & DevOps", "Mobile"];

export const courses: Course[] = [
  {
    id: "fullstack-engineering",
    title: "Full Stack Engineering",
    category: "Web Engineering",
    description:
      "Build and ship production web applications end to end with React, Next.js, Node and relational databases.",
    skills: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL"],
    duration: "[24 weeks]",
    level: "Intermediate",
    format: "[Hybrid · Live cohort]",
    hue: 258,
    pattern: "lattice",
    outline: [
      "Modern JavaScript and TypeScript foundations",
      "Component architecture with React",
      "Server rendering and routing with Next.js",
      "API design, authentication and data modelling",
      "Testing, CI and deployment to the cloud",
      "Capstone: a deployed, portfolio-grade product",
    ],
    outcome: "Graduate with a deployed full stack product and a reviewed codebase.",
  },
  {
    id: "frontend-craft",
    title: "Creative Frontend & Motion",
    category: "Web Engineering",
    description:
      "Learn the craft behind award-level interfaces: layout systems, typography, GSAP, WebGL and performance budgets.",
    skills: ["CSS Architecture", "GSAP", "Three.js", "Accessibility", "Performance"],
    duration: "[12 weeks]",
    level: "Advanced",
    format: "[Online · Live studio]",
    hue: 222,
    pattern: "wave",
    outline: [
      "Layout systems and fluid typography",
      "Motion principles and GSAP timelines",
      "Scroll storytelling with ScrollTrigger",
      "Introductory WebGL with Three.js",
      "Accessibility and reduced motion",
      "Shipping fast: Core Web Vitals in practice",
    ],
    outcome: "Ship an interactive showcase site with measurable performance scores.",
  },
  {
    id: "ai-engineering",
    title: "Applied AI Engineering",
    category: "AI & Data",
    description:
      "Design, evaluate and deploy AI powered features using modern language models, retrieval and agent patterns.",
    skills: ["Python", "LLM APIs", "RAG", "Evaluation", "Vector DBs"],
    duration: "[16 weeks]",
    level: "Advanced",
    format: "[Hybrid · Live cohort]",
    hue: 278,
    pattern: "orbit",
    outline: [
      "Python for production services",
      "Working with language model APIs",
      "Retrieval augmented generation",
      "Tool use and agent workflows",
      "Evaluation, safety and cost control",
      "Capstone: an AI feature in a real product",
    ],
    outcome: "Deliver an evaluated AI feature with documented tradeoffs.",
  },
  {
    id: "data-analytics",
    title: "Data Analytics & Visualisation",
    category: "AI & Data",
    description:
      "Turn raw data into decisions with SQL, Python, statistics and dashboards that people actually read.",
    skills: ["SQL", "Pandas", "Statistics", "Dashboards", "Storytelling"],
    duration: "[14 weeks]",
    level: "Beginner",
    format: "[Online · Self paced + mentor]",
    hue: 200,
    pattern: "grid",
    outline: [
      "SQL from first query to window functions",
      "Data wrangling with Python and Pandas",
      "Practical statistics",
      "Visual design for charts",
      "Dashboard tooling",
      "Capstone: an analytics case study",
    ],
    outcome: "Present a full analytics case study to a review panel.",
  },
  {
    id: "product-design",
    title: "UI/UX & Product Design",
    category: "Design",
    description:
      "Research, design and prototype digital products with a design system mindset and a developer friendly handoff.",
    skills: ["Figma", "UX Research", "Design Systems", "Prototyping", "Handoff"],
    duration: "[12 weeks]",
    level: "Beginner",
    format: "[Hybrid · Studio]",
    hue: 300,
    pattern: "prism",
    outline: [
      "Design thinking and user research",
      "Information architecture and flows",
      "Visual design and typography",
      "Building a component design system",
      "Interactive prototyping and testing",
      "Capstone: a validated product case study",
    ],
    outcome: "Publish a product case study with tested prototypes.",
  },
  {
    id: "cloud-devops",
    title: "Cloud & DevOps Engineering",
    category: "Cloud & DevOps",
    description:
      "Automate, containerise and operate reliable systems on the cloud with infrastructure as code and observability.",
    skills: ["Linux", "Docker", "Kubernetes", "Terraform", "CI/CD"],
    duration: "[16 weeks]",
    level: "Intermediate",
    format: "[Online · Live cohort]",
    hue: 190,
    pattern: "lattice",
    outline: [
      "Linux and networking essentials",
      "Containers with Docker",
      "Orchestration with Kubernetes",
      "Infrastructure as code with Terraform",
      "Pipelines, monitoring and incident response",
      "Capstone: a production grade platform",
    ],
    outcome: "Operate a monitored, automated deployment pipeline.",
  },
  {
    id: "mobile-apps",
    title: "Cross Platform Mobile Apps",
    category: "Mobile",
    description:
      "Design and ship polished iOS and Android apps from one codebase with React Native and native integrations.",
    skills: ["React Native", "Expo", "State", "Native APIs", "App Stores"],
    duration: "[14 weeks]",
    level: "Intermediate",
    format: "[Hybrid · Live cohort]",
    hue: 240,
    pattern: "orbit",
    outline: [
      "Mobile UX patterns",
      "React Native and Expo fundamentals",
      "Navigation and state management",
      "Device APIs and offline storage",
      "Testing and release pipelines",
      "Capstone: a store ready app",
    ],
    outcome: "Release a store ready app with a complete release checklist.",
  },
  {
    id: "foundations",
    title: "Programming Foundations",
    category: "Web Engineering",
    description:
      "A rigorous starting point: problem solving, programming fundamentals, Git and the habits of professional engineers.",
    skills: ["Problem Solving", "JavaScript", "Git", "HTML & CSS", "Algorithms"],
    duration: "[8 weeks]",
    level: "Beginner",
    format: "[On campus · Evening]",
    hue: 265,
    pattern: "grid",
    outline: [
      "Thinking in algorithms",
      "Programming fundamentals in JavaScript",
      "The web platform: HTML and CSS",
      "Version control with Git",
      "Debugging and reading documentation",
      "Mini projects and code review",
    ],
    outcome: "Complete five reviewed mini projects and a learning portfolio.",
  },
];
