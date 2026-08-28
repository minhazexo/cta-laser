import { Container, Card, Button } from "@gadget-wallet/ui";
import {
  Monitor,
  FileCode,
  Shield,
  MapPin,
  Code,
  Mail,
  Globe,
  Github,
  Linkedin,
  ExternalLink,
  ArrowRight,
} from "lucide-react";

/* ── Data ───────────────────────────────────────────────────────────────── */

const services = [
  {
    icon: Monitor,
    iconClass: "bg-blue-500/10 text-blue-400",
    title: "Frontend Engineering",
    desc: "Cinematic, accessible UIs with React & Next.js 14 — animations, glassmorphism, and perfect responsiveness across every device.",
  },
  {
    icon: FileCode,
    iconClass: "bg-violet-500/10 text-violet-400",
    title: "Full-Stack & APIs",
    desc: "Node.js, PostgreSQL + Drizzle ORM, JWT auth, and Resend email — secure, scalable backends that are a joy to maintain.",
  },
  {
    icon: Shield,
    iconClass: "bg-emerald-500/10 text-emerald-400",
    title: "Performance & Growth",
    desc: "WebP, lazy-loading, bundle analysis, and SEO baked in from day one. Your site stays fast as you scale — and ranks.",
  },
];

const stackGroups = [
  {
    label: "Frontend",
    tags: ["React 18", "Next.js 14", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    label: "Backend",
    tags: ["Node.js", "Drizzle ORM", "PostgreSQL", "JWT Auth", "Resend"],
  },
  {
    label: "Tooling",
    tags: ["Vercel", "Git & GitHub", "Playwright", "Vitest", "Bun"],
  },
  {
    label: "Principles",
    tags: ["SSR / SSG", "A11y", "SEO", "Responsive", "Clean Architecture"],
  },
];

const links = [
  {
    icon: Globe,
    iconStyle: "bg-gradient-to-br from-blue-500 to-indigo-500 text-white",
    title: "Portfolio",
    subtitle: "Live work & case studies",
    url: "minhazexo.vercel.app",
    href: "https://minhazexo.vercel.app/",
  },
  {
    icon: Github,
    iconStyle: "bg-[#24292f] text-white",
    title: "GitHub",
    subtitle: "30+ repositories",
    url: "github.com/minhazexo",
    href: "https://github.com/minhazexo/",
  },
  {
    icon: Linkedin,
    iconStyle: "bg-[#0A66C2] text-white",
    title: "LinkedIn",
    subtitle: "Professional network",
    url: "linkedin.com/in/minhazexo",
    href: "https://www.linkedin.com/in/minhazexo",
  },
  {
    icon: Mail,
    iconStyle: "bg-[#1877F2] text-white",
    title: "Email",
    subtitle: "Direct contact",
    url: "mehrabhossain7102@gmail.com",
    href: "mailto:mehrabhossain7102@gmail.com",
  },
];

/* ── Component ──────────────────────────────────────────────────────────── */

export default function About() {
  return (
    <section className="gw-section">
      <Container>
        {/* ── Hero ──────────────────────────────────────────────────────── */}
        <div className="max-w-4xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 text-xs tracking-widest uppercase font-bold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3 py-1.5 rounded-full mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Available for new projects
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[0.95] mb-6">
            I build fast, premium{" "}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent">
              web experiences
            </span>{" "}
            that convert.
          </h1>

          <p className="text-gw-gray-500 dark:text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto mb-8">
            I&apos;m <strong className="text-gw-black dark:text-gray-100">MD Mehrab Hossain</strong> — a Full-Stack Web
            Developer focused on React, Next.js, and Node.js. I craft cinematic, high-performance websites with clean
            code, thoughtful UX, and obsessive attention to detail.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-6">
            <a
              href="https://minhazexo.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="primary">
                View Portfolio <ArrowRight className="w-4 h-4" />
              </Button>
            </a>
            <a
              href="https://github.com/minhazexo/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline">
                <Github className="w-4 h-4" /> GitHub
              </Button>
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-2 text-xs text-gw-gray-500 dark:text-gray-400">
            <span className="inline-flex items-center gap-1.5 bg-gw-gray-50 dark:bg-white/5 border border-gw-border dark:border-white/10 px-3 py-1.5 rounded-full">
              React · Next.js · Node.js
            </span>
            <span className="inline-flex items-center gap-1.5 bg-gw-gray-50 dark:bg-white/5 border border-gw-border dark:border-white/10 px-3 py-1.5 rounded-full">
              Performance & SEO Focused
            </span>
            <span className="inline-flex items-center gap-1.5 bg-gw-gray-50 dark:bg-white/5 border border-gw-border dark:border-white/10 px-3 py-1.5 rounded-full">
              Clean, Maintainable Code
            </span>
          </div>
        </div>

        {/* ── Profile Card ──────────────────────────────────────────────── */}
        <Card className="p-6 max-w-md mx-auto mb-16 text-center">
          <div className="flex items-center gap-4 text-left mb-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-900 to-gray-900 border border-white/10 flex items-center justify-center text-white font-extrabold text-xl shrink-0">
              MH
            </div>
            <div>
              <div className="font-bold text-lg text-gw-black dark:text-gray-100">MD Mehrab Hossain</div>
              <div className="text-sm text-blue-400 font-semibold">Full-Stack Developer</div>
              <div className="text-xs text-gw-gray-500 dark:text-gray-400 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3 h-3" /> Bangladesh · Remote Worldwide
              </div>
            </div>
          </div>

          <p className="text-sm text-gw-gray-500 dark:text-gray-400 leading-relaxed bg-black/5 dark:bg-white/5 border border-gw-border dark:border-white/6 rounded-xl p-4 mb-4 text-left">
            I help founders and teams turn ideas into lightning-fast, beautiful web products. 30+ repositories,
            production-grade Next.js apps, and a design system that scales. If you need a site that{" "}
            <em className="not-italic font-semibold text-gw-black dark:text-gray-100">feels premium and loads instantly</em>{" "}
            — let&apos;s talk.
          </p>

          <div className="grid grid-cols-3 gap-3 mb-4">
            {[
              { value: "30+", label: "Repos" },
              { value: "100%", label: "Responsive" },
              { value: "⚡", label: "Fast & SEO" },
            ].map((s) => (
              <div
                key={s.label}
                className="bg-gw-gray-50 dark:bg-white/4 border border-gw-border dark:border-white/8 rounded-xl py-3 text-center"
              >
                <strong className="block text-lg tracking-tight">{s.value}</strong>
                <span className="text-[10px] tracking-widest uppercase text-gw-gray-500 dark:text-gray-400 font-semibold">
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <a href="mailto:mehrabhossain7102@gmail.com">
              <Button variant="primary" className="w-full">
                <Mail className="w-4 h-4" /> Email Me
              </Button>
            </a>
            <a href="https://minhazexo.vercel.app/" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="w-full">
                <Globe className="w-4 h-4" /> Portfolio
              </Button>
            </a>
          </div>
        </Card>

        {/* ── What I Do ─────────────────────────────────────────────────── */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-2">What I do</h2>
          <p className="text-sm text-gw-gray-500 dark:text-gray-400 mb-6">
            End-to-end web development — from concept to deployment and beyond.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {services.map((s) => (
              <div
                key={s.title}
                className="bg-gw-gray-50 dark:bg-white/[0.035] border border-gw-border dark:border-white/8 rounded-product p-6 hover:border-gw-border dark:hover:border-white/12 transition-all hover:-translate-y-0.5"
              >
                <div
                  className={`w-10 h-10 rounded-[10px] grid place-items-center mb-4 border border-gw-border dark:border-white/8 ${s.iconClass}`}
                >
                  <s.icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-gw-black dark:text-gray-100 tracking-tight">{s.title}</h3>
                <p className="text-sm text-gw-gray-500 dark:text-gray-400 leading-relaxed mt-1.5">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Tech Stack ────────────────────────────────────────────────── */}
        <div className="bg-gw-gray-50 dark:bg-white/[0.03] border border-gw-border dark:border-white/8 rounded-product p-6 mb-16">
          <div className="flex items-center justify-between flex-wrap gap-3 mb-5">
            <h2 className="text-lg font-bold tracking-tight">Tech Stack</h2>
            <span className="text-xs text-gw-gray-500 dark:text-gray-400 font-mono">
              built for speed · built to last
            </span>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {stackGroups.map((g) => (
              <div key={g.label}>
                <h4 className="text-[11px] tracking-widest uppercase text-gw-gray-300 dark:text-gray-500 font-bold mb-3">
                  {g.label}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {g.tags.map((t, i) => (
                    <span
                      key={t}
                      className={`text-xs font-medium px-2.5 py-1.5 rounded-full border transition-colors ${
                        i < 2
                          ? "bg-blue-500/10 border-blue-500/20 text-blue-300"
                          : "bg-gw-gray-50 dark:bg-white/6 border-gw-border dark:border-white/8 text-gw-black dark:text-gray-200 hover:bg-blue-500/10 hover:border-blue-500/30 hover:text-blue-300"
                      }`}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Connect ───────────────────────────────────────────────────── */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold tracking-tight mb-2">Connect with me</h2>
          <p className="text-sm text-gw-gray-500 dark:text-gray-400 mb-6">
            Follow my work, see the code, or just say hello — I&apos;d love to hear from you.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {links.map((l) => (
              <a
                key={l.title}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col gap-3 p-4 rounded-2xl bg-gw-gray-50 dark:bg-white/[0.035] border border-gw-border dark:border-white/8 transition-all hover:-translate-y-0.5 hover:border-gw-border dark:hover:border-white/14 hover:bg-gw-gray-50 dark:hover:bg-white/[0.06] text-left"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-[42px] h-[42px] rounded-xl grid place-items-center shrink-0 ${l.iconStyle}`}
                  >
                    <l.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="text-sm tracking-tight block text-gw-black dark:text-gray-100">{l.title}</strong>
                    <span className="text-xs text-gw-gray-500 dark:text-gray-400">{l.subtitle}</span>
                  </div>
                </div>
                <div className="text-xs text-gw-gray-500 dark:text-gray-400 font-mono bg-black/5 dark:bg-white/5 border border-gw-border dark:border-white/6 px-2.5 py-2 rounded-[10px] truncate">
                  {l.url}
                </div>
                <span className="text-xs font-semibold text-blue-400 inline-flex items-center gap-1.5">
                  Visit <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* ── Values + Quote ────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-16">
          <div className="bg-gw-gray-50 dark:bg-white/[0.035] border border-gw-border dark:border-white/8 rounded-product p-6">
            <div className="w-10 h-10 rounded-[10px] grid place-items-center mb-4 border border-gw-border dark:border-white/8 bg-cyan-500/10 text-cyan-400">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-gw-black dark:text-gray-100 tracking-tight">How I work</h3>
            <p className="text-sm text-gw-gray-500 dark:text-gray-400 leading-relaxed mt-1.5">
              Clear communication, fast iterations, and honest timelines. No surprises — just progress you can see.
            </p>
          </div>

          <div className="bg-gw-gray-50 dark:bg-white/[0.035] border border-gw-border dark:border-white/8 rounded-product p-6">
            <div className="w-10 h-10 rounded-[10px] grid place-items-center mb-4 border border-gw-border dark:border-white/8 bg-blue-500/10 text-blue-400">
              <Code className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-gw-black dark:text-gray-100 tracking-tight">Why clients choose me</h3>
            <p className="text-sm text-gw-gray-500 dark:text-gray-400 leading-relaxed mt-1.5">
              Production-ready code, SEO-first builds, and a design eye. I care about the polish that turns visitors into
              customers.
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-500/10 to-violet-500/10 border border-blue-500/20 rounded-product p-6 relative overflow-hidden lg:row-span-1">
            <p className="text-base leading-relaxed tracking-tight font-medium text-gw-black dark:text-gray-100 relative z-10">
              &ldquo;I don&apos;t just write code — I craft digital experiences that feel effortless to use and impossible
              to forget. If your project deserves to look as good as it performs, let&apos;s build it right.&rdquo;
            </p>
            <div className="flex items-center gap-3 mt-4 relative z-10">
              <div className="w-8 h-8 rounded-full bg-white/10 grid place-items-center text-xs font-bold">
                MH
              </div>
              <div>
                <strong className="text-sm text-gw-black dark:text-gray-100">MD Mehrab Hossain</strong>
                <br />
                <span className="text-xs text-gw-gray-500 dark:text-gray-400">Web Developer</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── CTA ───────────────────────────────────────────────────────── */}
        <div className="bg-gw-gray-50 dark:bg-white/[0.06] border border-gw-border dark:border-white/12 rounded-product p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 mb-12">
          <div>
            <h3 className="text-xl font-bold tracking-tight">Have an idea? Let&apos;s make it real.</h3>
            <p className="text-sm text-gw-gray-500 dark:text-gray-400 mt-1">
              Whether it&apos;s a portfolio, SaaS, or e-commerce — I&apos;ll help you ship something you&apos;re proud
              of.
            </p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <a href="mailto:mehrabhossain7102@gmail.com">
              <Button variant="primary">
                <Mail className="w-4 h-4" /> Email Me
              </Button>
            </a>
            <a href="https://minhazexo.vercel.app/" target="_blank" rel="noopener noreferrer">
              <Button variant="outline">
                <ExternalLink className="w-4 h-4" /> Portfolio
              </Button>
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
