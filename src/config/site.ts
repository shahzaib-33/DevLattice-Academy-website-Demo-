/**
 * ─────────────────────────────────────────────────────────────
 *  DEVLATTICE ACADEMY · SITE CONFIGURATION
 *  Every official detail lives here. Values wrapped in [brackets]
 *  are placeholders and render with a visible "Placeholder" marker
 *  until the academy supplies verified information.
 * ─────────────────────────────────────────────────────────────
 */

export const site = {
  name: "DevLattice Academy",
  shortName: "DevLattice",
  parent: "DevLattice System",
  url: "https://devlattice-academy.vercel.app", // replace with the production domain
  tagline: "Where engineers are structured for the future.",
  description:
    "DevLattice Academy, part of DevLattice System, trains the next generation of software engineers, designers and AI builders through structured, project-first programs.",
  keywords: [
    "DevLattice Academy",
    "DevLattice System",
    "software engineering academy",
    "web development courses",
    "AI engineering training",
    "UI UX design course",
  ],

  contact: {
    email: "[academy@yourdomain.com]",
    phone: "[+00 000 0000000]",
    whatsapp: "[+00 000 0000000]", // digits only are used for the wa.me link
    address: "[Campus address to be confirmed]",
    hours: "[Mon to Sat · 09:00 to 18:00]",
  },

  /**
   * Optional form endpoint (Formspree, Getform, a serverless function...).
   * Leave empty and the inquiry form falls back to opening a prefilled email.
   */
  formEndpoint: "",

  social: {
    linkedin: "https://www.linkedin.com/",
    github: "https://github.com/",
    instagram: "https://www.instagram.com/",
    youtube: "https://www.youtube.com/",
    x: "https://x.com/",
  },

  /** Editable statistics. Never publish numbers that are not verified. */
  stats: [
    { value: "[00]", suffix: "+", label: "Learners trained", note: "Awaiting verified figure" },
    { value: "[00]", suffix: "", label: "Industry programs", note: "Awaiting verified figure" },
    { value: "[00]", suffix: "%", label: "Project completion rate", note: "Awaiting verified figure" },
    { value: "[00]", suffix: "+", label: "Hiring partners", note: "Awaiting verified figure" },
  ],
} as const;

export const nav = [
  { label: "Academy", href: "#about" },
  { label: "Programs", href: "#courses", dropdown: true },
  { label: "Team", href: "#team" },
  { label: "Work", href: "#projects" },
  { label: "Voices", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
] as const;

/** True when a value is still an unfilled [placeholder]. */
export const isPlaceholder = (v: string) => /^\[.*\]$/.test(v.trim());
export const stripBrackets = (v: string) => v.replace(/^\[|\]$/g, "");
