"use client";

import { useEffect, useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { AlertCircle, ArrowUpRight, Check, Clock, Copy, Loader2, Mail, MapPin, Phone, RotateCcw } from "lucide-react";
import { site, isPlaceholder } from "@/config/site";
import { courses } from "@/data/courses";
import { SectionHeading } from "@/components/ui/SplitReveal";
import { Editable } from "@/components/ui/Placeholder";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { GithubIcon, InstagramIcon, LinkedinIcon, WhatsappIcon, XIcon, YoutubeIcon } from "@/components/ui/BrandIcons";
import { useApp } from "@/components/layout/AppProvider";
import { cn } from "@/lib/cn";

type Fields = { name: string; email: string; phone: string; course: string; message: string; consent: boolean };
type Errors = Partial<Record<keyof Fields, string>>;
type Status = "idle" | "submitting" | "success" | "ready" | "error";

const empty: Fields = { name: "", email: "", phone: "", course: "", message: "", consent: false };

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (f.name.trim().length < 2) e.name = "Please enter your full name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) e.email = "Please enter a valid email address.";
  if (f.phone.trim() && !/^\+?[\d\s()-]{7,20}$/.test(f.phone.trim())) e.phone = "Please enter a valid phone number.";
  if (!f.course) e.course = "Please choose a program or general inquiry.";
  if (f.message.trim().length < 20) e.message = "Please share a little more detail (at least 20 characters).";
  if (!f.consent) e.consent = "Please confirm we may contact you about your inquiry.";
  return e;
}

export default function Contact() {
  const { inquiryCourse, setInquiryCourse } = useApp();
  const [f, setF] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof Fields, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [copied, setCopied] = useState(false);
  const uid = useId();

  useEffect(() => {
    if (inquiryCourse) {
      setF((p) => ({ ...p, course: inquiryCourse }));
      setInquiryCourse("");
    }
  }, [inquiryCourse, setInquiryCourse]);

  const set = <K extends keyof Fields>(k: K, v: Fields[K]) => {
    const next = { ...f, [k]: v };
    setF(next);
    if (touched[k]) setErrors(validate(next));
  };
  const blur = (k: keyof Fields) => {
    setTouched((t) => ({ ...t, [k]: true }));
    setErrors(validate(f));
  };

  const summary = `Name: ${f.name}\nEmail: ${f.email}\nPhone: ${f.phone || "Not provided"}\nProgram: ${f.course}\n\n${f.message}`;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(f);
    setErrors(errs);
    setTouched({ name: true, email: true, phone: true, course: true, message: true, consent: true });
    if (Object.keys(errs).length) {
      const first = Object.keys(errs)[0];
      document.getElementById(`${uid}-${first}`)?.focus();
      return;
    }
    setStatus("submitting");
    if (site.formEndpoint) {
      try {
        const res = await fetch(site.formEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(f),
        });
        if (!res.ok) throw new Error(String(res.status));
        setStatus("success");
      } catch {
        setStatus("error");
      }
    } else {
      await new Promise((r) => setTimeout(r, 900));
      setStatus("ready");
    }
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const restart = () => { setF(empty); setErrors({}); setTouched({}); setStatus("idle"); };

  const emailOk = !isPlaceholder(site.contact.email);
  const waDigits = site.contact.whatsapp.replace(/\D/g, "");
  const waOk = !isPlaceholder(site.contact.whatsapp) && waDigits.length > 6;

  const info = [
    { icon: Mail, label: "Email", value: site.contact.email, href: emailOk ? `mailto:${site.contact.email}` : undefined },
    { icon: Phone, label: "Phone", value: site.contact.phone, href: !isPlaceholder(site.contact.phone) ? `tel:${site.contact.phone.replace(/\s/g, "")}` : undefined },
    { icon: WhatsappIcon, label: "WhatsApp", value: site.contact.whatsapp, href: waOk ? `https://wa.me/${waDigits}` : undefined },
    { icon: MapPin, label: "Campus", value: site.contact.address },
    { icon: Clock, label: "Hours", value: site.contact.hours },
  ];

  const socials = [
    { icon: LinkedinIcon, label: "LinkedIn", href: site.social.linkedin },
    { icon: GithubIcon, label: "GitHub", href: site.social.github },
    { icon: InstagramIcon, label: "Instagram", href: site.social.instagram },
    { icon: YoutubeIcon, label: "YouTube", href: site.social.youtube },
    { icon: XIcon, label: "X", href: site.social.x },
  ];

  const field = (k: keyof Fields) =>
    cn(
      "peer w-full rounded-2xl border bg-white/[0.03] px-4 pb-2.5 pt-6 text-sm text-white placeholder-transparent transition-colors duration-300 focus:bg-white/[0.05] focus:outline-none",
      errors[k] && touched[k] ? "border-rose-400/70" : "border-white/10 focus:border-violet/70",
    );
  const floatLabel =
    "pointer-events-none absolute left-4 top-2 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-fog transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:font-sans peer-placeholder-shown:text-sm peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:top-2 peer-focus:font-mono peer-focus:text-[0.6rem] peer-focus:uppercase peer-focus:tracking-[0.16em] peer-focus:text-violet-bright";
  const err = (k: keyof Fields) => (
    <AnimatePresence>
      {errors[k] && touched[k] && (
        <motion.p id={`${uid}-${k}-err`} role="alert" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-1.5 flex items-center gap-1.5 text-xs text-rose-300">
          <AlertCircle className="h-3.5 w-3.5" /> {errors[k]}
        </motion.p>
      )}
    </AnimatePresence>
  );
  const aria = (k: keyof Fields) => ({
    id: `${uid}-${k}`,
    "aria-invalid": !!(errors[k] && touched[k]),
    "aria-describedby": errors[k] && touched[k] ? `${uid}-${k}-err` : undefined,
  });

  return (
    <section id="contact" className="relative overflow-hidden py-24 md:py-36">
      <div aria-hidden className="pointer-events-none absolute bottom-0 right-0 h-[50vmax] w-[50vmax] translate-x-1/3 translate-y-1/3 rounded-full bg-violet/15 blur-[150px]" />
      <div className="container-x grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div>
          <SectionHeading index="08" eyebrow="Contact & Inquiry" title="Let&apos;s talk about|your *next build.*" intro="Questions about programs, intakes or partnerships? Send an inquiry and the admissions team will get back to you." />

          <ul className="mt-10 space-y-2">
            {info.map((it) => {
              const inner = (
                <>
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/5 transition-colors group-hover:border-violet/50 group-hover:bg-violet/15">
                    <it.icon className="h-4 w-4" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-mono text-[0.6rem] uppercase tracking-[0.18em] text-fog">{it.label}</span>
                    <span className="mt-0.5 block text-sm"><Editable value={it.value} /></span>
                  </span>
                  {it.href && <ArrowUpRight className="ml-auto h-4 w-4 text-fog transition group-hover:rotate-45 group-hover:text-white" />}
                </>
              );
              return (
                <li key={it.label}>
                  {it.href ? (
                    <a href={it.href} target={it.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="group flex items-center gap-4 rounded-2xl border border-transparent p-2 transition hover:border-white/10 hover:bg-white/[0.03]">
                      {inner}
                    </a>
                  ) : (
                    <div className="group flex items-center gap-4 rounded-2xl p-2">{inner}</div>
                  )}
                </li>
              );
            })}
          </ul>
          <p className="mt-4 text-xs text-fog">Official contact details will replace these placeholders once verified by the academy.</p>

          <div className="mt-10">
            <p className="eyebrow mb-4">Follow the academy</p>
            <ul className="flex flex-wrap gap-2">
              {socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="grid h-12 w-12 place-items-center rounded-full border border-white/10 text-mist transition-all duration-300 hover:-translate-y-1 hover:border-violet hover:bg-violet/20 hover:text-white">
                    <s.icon className="h-4 w-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="relative">
          <div className="border-beam rounded-[2rem]">
            <div className="relative overflow-hidden rounded-[2rem] bg-[#0a0d1f]/95 p-6 sm:p-10">
              <AnimatePresence mode="wait">
                {status === "success" || status === "ready" ? (
                  <motion.div key="done" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} className="py-8 text-center" role="status">
                    <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.1 }} className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-violet to-cyan shadow-[0_0_60px_rgba(139,92,246,.6)]">
                      <Check className="h-9 w-9" />
                    </motion.span>
                    {status === "success" ? (
                      <>
                        <h3 className="mt-8 font-display text-3xl font-semibold">Inquiry received.</h3>
                        <p className="mx-auto mt-3 max-w-sm text-mist">Thank you, {f.name.split(" ")[0]}. The admissions team will reply to {f.email} soon.</p>
                      </>
                    ) : (
                      <>
                        <h3 className="mt-8 font-display text-3xl font-semibold">Your inquiry is ready.</h3>
                        <p className="mx-auto mt-3 max-w-md text-mist">
                          Thank you, {f.name.split(" ")[0]}. Direct submission switches on once the academy connects its inbox. For now you can send it by email or copy it.
                        </p>
                        <div className="mt-6 flex flex-wrap justify-center gap-2">
                          {emailOk && (
                            <a href={`mailto:${site.contact.email}?subject=${encodeURIComponent(`Inquiry: ${f.course}`)}&body=${encodeURIComponent(summary)}`} className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-ink">
                              <Mail className="h-4 w-4" /> Open in email app
                            </a>
                          )}
                          <button onClick={copy} className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm hover:bg-white/5">
                            {copied ? <Check className="h-4 w-4 text-cyan" /> : <Copy className="h-4 w-4" />} {copied ? "Copied" : "Copy inquiry"}
                          </button>
                        </div>
                      </>
                    )}
                    <button onClick={restart} className="mt-8 inline-flex items-center gap-2 text-sm text-mist hover:text-white">
                      <RotateCcw className="h-4 w-4" /> Send another inquiry
                    </button>
                  </motion.div>
                ) : (
                  <motion.form key="form" onSubmit={submit} noValidate initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -10 }} className="space-y-4" aria-label="Inquiry form">
                    <div className="mb-2 flex items-center justify-between">
                      <h3 className="font-display text-2xl font-semibold tracking-tight">Send an inquiry</h3>
                      <span className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-fog">* Required</span>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <div className="relative">
                          <input {...aria("name")} className={field("name")} placeholder="Full name" autoComplete="name" value={f.name} onChange={(e) => set("name", e.target.value)} onBlur={() => blur("name")} />
                          <label htmlFor={`${uid}-name`} className={floatLabel}>Full name *</label>
                        </div>
                        {err("name")}
                      </div>
                      <div>
                        <div className="relative">
                          <input {...aria("email")} type="email" className={field("email")} placeholder="Email" autoComplete="email" value={f.email} onChange={(e) => set("email", e.target.value)} onBlur={() => blur("email")} />
                          <label htmlFor={`${uid}-email`} className={floatLabel}>Email address *</label>
                        </div>
                        {err("email")}
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <div className="relative">
                          <input {...aria("phone")} type="tel" className={field("phone")} placeholder="Phone" autoComplete="tel" value={f.phone} onChange={(e) => set("phone", e.target.value)} onBlur={() => blur("phone")} />
                          <label htmlFor={`${uid}-phone`} className={floatLabel}>Phone / WhatsApp</label>
                        </div>
                        {err("phone")}
                      </div>
                      <div>
                        <div className="relative">
                          <select {...aria("course")} className={cn(field("course"), "appearance-none pr-10", !f.course && "text-fog")} value={f.course} onChange={(e) => set("course", e.target.value)} onBlur={() => blur("course")}>
                            <option value="" disabled className="bg-navy">Choose a program</option>
                            {courses.map((c) => <option key={c.id} value={c.title} className="bg-navy text-white">{c.title}</option>)}
                            <option value="General inquiry" className="bg-navy text-white">General inquiry</option>
                            <option value="Partnership" className="bg-navy text-white">Partnership or hiring</option>
                          </select>
                          <label htmlFor={`${uid}-course`} className="pointer-events-none absolute left-4 top-2 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-fog">Program *</label>
                          <ArrowUpRight className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 rotate-90 text-fog" />
                        </div>
                        {err("course")}
                      </div>
                    </div>

                    <div>
                      <div className="relative">
                        <textarea {...aria("message")} rows={5} className={cn(field("message"), "resize-none")} placeholder="Message" maxLength={1000} value={f.message} onChange={(e) => set("message", e.target.value)} onBlur={() => blur("message")} />
                        <label htmlFor={`${uid}-message`} className={floatLabel}>Tell us about your goals *</label>
                        <span className="pointer-events-none absolute bottom-3 right-4 font-mono text-[0.6rem] text-fog">{f.message.length}/1000</span>
                      </div>
                      {err("message")}
                    </div>

                    <div>
                      <label className="flex cursor-pointer items-start gap-3 text-sm text-mist">
                        <span className="relative mt-0.5 grid h-5 w-5 shrink-0 place-items-center">
                          <input
                            {...aria("consent")}
                            type="checkbox"
                            checked={f.consent}
                            onChange={(e) => { set("consent", e.target.checked); setTouched((t) => ({ ...t, consent: true })); }}
                            className="peer absolute inset-0 h-5 w-5 cursor-pointer appearance-none rounded-md border border-white/20 bg-white/5 transition checked:border-violet checked:bg-violet"
                          />
                          <Check className="pointer-events-none relative h-3.5 w-3.5 opacity-0 transition peer-checked:opacity-100" />
                        </span>
                        I agree that DevLattice Academy may contact me about this inquiry.
                      </label>
                      {err("consent")}
                    </div>

                    <AnimatePresence>
                      {status === "error" && (
                        <motion.div role="alert" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="flex items-start gap-3 rounded-2xl border border-rose-400/40 bg-rose-500/10 p-4 text-sm text-rose-200">
                          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                          Something went wrong while sending your inquiry. Please check your connection and try again.
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                      <p className="text-xs text-fog">We respect your privacy. No spam, ever.</p>
                      <MagneticButton as="button" type="submit" disabled={status === "submitting"} icon={status === "submitting" ? undefined : <ArrowUpRight className="h-4 w-4" />}>
                        {status === "submitting" ? (<><Loader2 className="h-4 w-4 animate-spin" /> Sending</>) : status === "error" ? "Try again" : "Send inquiry"}
                      </MagneticButton>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
