/**
 * Content for Demo 2. Values in [brackets] are placeholders until the
 * academy confirms official details. Nothing here claims real results.
 */

export const programs = [
  {
    n: "01",
    title: "Full Stack Engineering",
    sub: "Web apps, end to end",
    line: "Go from first component to a deployed product that real users can sign in to.",
    bullets: ["React, Next.js and TypeScript", "Node.js APIs and PostgreSQL", "Testing, CI and cloud deployment"],
    badge: { value: "[24 wks]", label: "Program length" },
    deliverable: "A deployed, portfolio-grade product with a reviewed codebase.",
    graduates: ["Live capstone app", "GitHub portfolio", "Code review history", "Interview practice"],
    hue: 340,
    pattern: "lattice" as const,
  },
  {
    n: "02",
    title: "Applied AI Engineering",
    sub: "Ship AI features that work",
    line: "Build, evaluate and deploy language model features inside real products.",
    bullets: ["Python services and LLM APIs", "Retrieval and agent workflows", "Evaluation, safety and cost"],
    badge: { value: "[16 wks]", label: "Program length" },
    deliverable: "An evaluated AI feature with documented tradeoffs and metrics.",
    graduates: ["AI product demo", "Evaluation report", "Architecture write-up", "Mentor sign-off"],
    hue: 280,
    pattern: "orbit" as const,
  },
  {
    n: "03",
    title: "UI/UX & Product Design",
    sub: "Design people can use",
    line: "Research, design and prototype products with a developer friendly handoff.",
    bullets: ["User research and flows", "Design systems in Figma", "Prototyping and usability tests"],
    badge: { value: "[12 wks]", label: "Program length" },
    deliverable: "A validated product case study with tested prototypes.",
    graduates: ["Case study", "Design system file", "Clickable prototype", "Portfolio review"],
    hue: 15,
    pattern: "prism" as const,
  },
  {
    n: "04",
    title: "Cloud & DevOps",
    sub: "Run systems reliably",
    line: "Automate, containerise and operate production infrastructure on the cloud.",
    bullets: ["Linux, Docker and Kubernetes", "Terraform infrastructure as code", "Pipelines and observability"],
    badge: { value: "[16 wks]", label: "Program length" },
    deliverable: "A monitored, automated deployment pipeline you can demo live.",
    graduates: ["Running platform", "IaC repository", "Runbook", "Incident drill"],
    hue: 200,
    pattern: "grid" as const,
  },
];

export const steps = [
  { n: "01", t: "Discover", d: "A free consultation to understand your goals, current level and schedule." },
  { n: "02", t: "Match", d: "We recommend the right program and intake, with a clear learning plan." },
  { n: "03", t: "Build", d: "Live sessions, weekly projects and mentor reviews that mirror real teams." },
  { n: "04", t: "Launch", d: "Capstone demo day, portfolio polish and interview preparation." },
];

export const work = [
  { title: "[Learning Analytics Dashboard]", tag: "Full Stack", hue: 340, mock: "dashboard" as const },
  { title: "[AI Study Companion]", tag: "Applied AI", hue: 280, mock: "chat" as const },
  { title: "[Fintech Brand System]", tag: "Product Design", hue: 15, mock: "landing" as const },
  { title: "[Habit Tracker App]", tag: "Mobile", hue: 190, mock: "mobile" as const },
  { title: "[Artisan Marketplace]", tag: "Full Stack", hue: 330, mock: "commerce" as const },
  { title: "[Retail Forecast Report]", tag: "Data", hue: 210, mock: "analytics" as const },
];

export const voices = [
  { q: "[Verified student testimonial goes here. Publish only with written consent.]", name: "[Student Name]", role: "[Program · Cohort]" },
  { q: "[A second verified testimonial. Specific outcomes build the most trust.]", name: "[Student Name]", role: "[Program · Cohort]" },
  { q: "[A third verified testimonial. Two or three honest sentences are ideal.]", name: "[Student Name]", role: "[Program · Cohort]" },
];

export const faqs = [
  { q: "Do I need prior coding experience?", a: "Not for the foundation track. Advanced programs list their prerequisites, and the free consultation helps place you at the right level." },
  { q: "Are classes live or recorded?", a: "Most programs run as live cohorts with recorded sessions for review. Exact formats are confirmed per intake by the academy." },
  { q: "What do I graduate with?", a: "A deployed capstone, a reviewed portfolio and a DevLattice Academy certificate of completion. Accreditation details are shared only once official." },
  { q: "How are mentors selected?", a: "Mentors are practising engineers and designers connected to DevLattice System. Official mentor profiles will be published on this site." },
  { q: "Is there support after graduation?", a: "Graduates keep access to the community and portfolio reviews. Career support details will be confirmed by the academy." },
];
