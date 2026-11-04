/**
 * Team, projects, testimonials and achievements.
 * Everything in [brackets] is a placeholder awaiting official information.
 * No real people, testimonials or certificates are invented here.
 */

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  initials: string;
  hue: number;
  photo?: string; // path inside /public, e.g. "/team/jane.jpg"
  linkedin?: string;
  github?: string;
}

export const team: TeamMember[] = [
  {
    name: "Ayesha Abid",
    role: "Founder & CEO, DevLattice System",
    bio: "Full stack engineer and founder based in Lahore. She builds AI integrated software and leads DevLattice System, with the academy training the next generation of engineers.",
    initials: "AA",
    hue: 258,
    linkedin: "https://www.linkedin.com/",
  },
  {
    name: "[Lead Instructor Name]",
    role: "[Head of Engineering Programs]",
    bio: "[Short biography: industry experience, technologies taught and teaching approach.]",
    initials: "LI",
    hue: 222,
    linkedin: "https://www.linkedin.com/",
    github: "https://github.com/",
  },
  {
    name: "[Design Mentor Name]",
    role: "[Lead, Product Design]",
    bio: "[Short biography: design background, notable work and mentorship focus.]",
    initials: "DM",
    hue: 300,
    linkedin: "https://www.linkedin.com/",
  },
  {
    name: "[AI Mentor Name]",
    role: "[Lead, AI & Data]",
    bio: "[Short biography: research or industry work in AI and data engineering.]",
    initials: "AM",
    hue: 278,
    linkedin: "https://www.linkedin.com/",
    github: "https://github.com/",
  },
];

export type ProjectCategory = "Web" | "AI" | "Design" | "Mobile";

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  student: string;
  description: string;
  tech: string[];
  hue: number;
  mock: "dashboard" | "commerce" | "chat" | "mobile" | "landing" | "analytics";
  link?: string;
}

export const projectCategories: ProjectCategory[] = ["Web", "AI", "Design", "Mobile"];

export const projects: Project[] = [
  {
    id: "p1",
    title: "[Learning Analytics Dashboard]",
    category: "Web",
    student: "[Student Name]",
    description: "[Sample showcase slot: a real time dashboard tracking cohort progress, built as a capstone.]",
    tech: ["Next.js", "TypeScript", "PostgreSQL"],
    hue: 258,
    mock: "dashboard",
  },
  {
    id: "p2",
    title: "[AI Study Companion]",
    category: "AI",
    student: "[Student Name]",
    description: "[Sample showcase slot: a retrieval powered assistant that answers questions from course notes.]",
    tech: ["Python", "LLM API", "Vector DB"],
    hue: 278,
    mock: "chat",
  },
  {
    id: "p3",
    title: "[Artisan Marketplace]",
    category: "Web",
    student: "[Student Name]",
    description: "[Sample showcase slot: a commerce platform with checkout, inventory and admin tooling.]",
    tech: ["React", "Node.js", "Stripe"],
    hue: 222,
    mock: "commerce",
  },
  {
    id: "p4",
    title: "[Fitness Habit App]",
    category: "Mobile",
    student: "[Student Name]",
    description: "[Sample showcase slot: a cross platform app for habit tracking with offline sync.]",
    tech: ["React Native", "Expo", "SQLite"],
    hue: 190,
    mock: "mobile",
  },
  {
    id: "p5",
    title: "[Fintech Brand System]",
    category: "Design",
    student: "[Student Name]",
    description: "[Sample showcase slot: a complete brand and component system for a fintech startup.]",
    tech: ["Figma", "Design Tokens", "Prototyping"],
    hue: 300,
    mock: "landing",
  },
  {
    id: "p6",
    title: "[Retail Demand Forecast]",
    category: "AI",
    student: "[Student Name]",
    description: "[Sample showcase slot: a forecasting model with an interactive insights report.]",
    tech: ["Pandas", "scikit-learn", "Plotly"],
    hue: 205,
    mock: "analytics",
  },
];

export interface Testimonial {
  quote: string;
  name: string;
  course: string;
  initials: string;
  hue: number;
  photo?: string; // only with written consent
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "[Student testimonial goes here. Publish only verified feedback shared with written consent from the student.]",
    name: "[Student Name]",
    course: "[Course Name · Cohort]",
    initials: "S1",
    hue: 258,
  },
  {
    quote:
      "[A second verified testimonial. Keep it specific: what the student built, learned and achieved after the program.]",
    name: "[Student Name]",
    course: "[Course Name · Cohort]",
    initials: "S2",
    hue: 222,
  },
  {
    quote:
      "[A third verified testimonial. Short, honest quotes build more trust than long ones. Two to three sentences is ideal.]",
    name: "[Student Name]",
    course: "[Course Name · Cohort]",
    initials: "S3",
    hue: 300,
  },
];

export interface Achievement {
  type: "Certificate" | "Student Achievement" | "Milestone" | "Training";
  title: string;
  detail: string;
  date: string;
}

export const achievements: Achievement[] = [
  { type: "Milestone", title: "DevLattice System founded", detail: "Founded by Ayesha Abid as a senior led technology studio, with DevLattice Academy as its training arm.", date: "Mar 2025" },
  { type: "Certificate", title: "[Program certificate name]", detail: "[Issued on completion of a program. Add accreditation only if official.]", date: "[Year]" },
  { type: "Student Achievement", title: "Technical Excellence Portfolio · Multi-Domain Competition Winner", detail: "Founder award issued by Riphah International University.", date: "May 2025" },
  { type: "Certificate", title: "1st Position · Web Alchemy (Web Development)", detail: "Founder award from Riphah International University for landing page design and web development.", date: "Feb 2025" },
  { type: "Training", title: "[Corporate or community training]", detail: "[Partner organisation and scope of training delivered.]", date: "[Year]" },
  { type: "Milestone", title: "[First cohort graduation]", detail: "[Cohort size and highlight, once verified.]", date: "[Year]" },
  { type: "Student Achievement", title: "[Open source contribution]", detail: "[Project, contribution and contributor.]", date: "[Year]" },
];
