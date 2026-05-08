"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  Github,
  Linkedin,
  Mail,
  Sparkles,
  Layers,
  Cpu,
  PenTool,
  Compass,
  GitBranch,
  Rocket,
  CheckCircle2,
} from "lucide-react";

import "./portfolio.css";

type Project = {
  id: string;
  index: string;
  year: string;
  title: string;
  client: string;
  description: string;
  technologies: string[];
  category: "Web" | "Brand" | "Producto" | "Lab";
  href?: string;
  github?: string;
  featured?: boolean;
};

const projects: Project[] = [
  {
    id: "p-01",
    index: "01",
    year: "2026",
    title: "Atlas — Plataforma de operaciones",
    client: "Atlas Studio",
    description:
      "Sistema de diseño y dashboard que reemplaza tres herramientas internas. Reducción de 41% en tiempo de cierre operativo.",
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "tRPC"],
    category: "Producto",
    href: "#",
    github: "#",
    featured: true,
  },
  {
    id: "p-02",
    index: "02",
    year: "2026",
    title: "Brisa — Identidad y sitio editorial",
    client: "Brisa Coffee",
    description:
      "Identidad visual completa, sistema de empaque y micrositio editorial con CMS headless. Lanzamiento sold-out en 72 horas.",
    technologies: ["Sanity", "Astro", "Figma"],
    category: "Brand",
    href: "#",
    featured: true,
  },
  {
    id: "p-03",
    index: "03",
    year: "2025",
    title: "Cosmos Dashboard",
    client: "Cosmos Labs",
    description:
      "Visualización en tiempo real para infraestructura distribuida. WebSockets, gráficos custom y modo focus para incidentes.",
    technologies: ["React", "D3", "Go", "Redis"],
    category: "Web",
    href: "#",
    github: "#",
  },
  {
    id: "p-04",
    index: "04",
    year: "2025",
    title: "Forma — App de práctica deliberada",
    client: "Forma Labs",
    description:
      "App nativa que ayuda a profesionales a practicar habilidades específicas con feedback medible.",
    technologies: ["React Native", "Supabase", "Expo"],
    category: "Producto",
    href: "#",
  },
  {
    id: "p-05",
    index: "05",
    year: "2025",
    title: "Notas de campo: tipografía variable",
    client: "Lab personal",
    description:
      "Ensayo interactivo sobre tipografía variable en la web. Demos, métricas de carga y guías de implementación.",
    technologies: ["MDX", "Variable Fonts", "Canvas"],
    category: "Lab",
    href: "#",
  },
  {
    id: "p-06",
    index: "06",
    year: "2024",
    title: "Iris — Sistema de diseño open-source",
    client: "Iris Project",
    description:
      "Librería de componentes accesibles publicada en npm con 12k descargas semanales y documentación interactiva.",
    technologies: ["Radix UI", "Storybook", "TypeScript"],
    category: "Web",
    href: "#",
    github: "#",
  },
];

const capabilities = [
  {
    icon: Compass,
    title: "Estrategia de producto",
    description:
      "Investigación, definición de oportunidades y roadmaps que conectan negocio con experiencia.",
    items: ["Discovery", "Roadmapping", "Métricas norte"],
  },
  {
    icon: PenTool,
    title: "Diseño de interfaz",
    description:
      "Sistemas de diseño, prototipos de alta fidelidad y direcciones visuales con identidad propia.",
    items: ["Design systems", "Prototyping", "Brand-led UI"],
  },
  {
    icon: Cpu,
    title: "Ingeniería full-stack",
    description:
      "Implementación end-to-end con un código limpio, testeado y listo para escalar con el equipo.",
    items: ["Next.js", "TypeScript", "PostgreSQL"],
  },
  {
    icon: Layers,
    title: "Plataformas y APIs",
    description:
      "Arquitecturas modulares, APIs tipadas y herramientas internas que aceleran al equipo.",
    items: ["tRPC", "GraphQL", "Edge runtime"],
  },
];

const processSteps = [
  {
    icon: Compass,
    label: "01 · Descubrir",
    title: "Entender antes de diseñar",
    description:
      "Conversaciones con stakeholders, auditoría de lo existente y mapeo de oportunidades. Salida: un brief afilado.",
  },
  {
    icon: PenTool,
    label: "02 · Definir",
    title: "Forma a la idea",
    description:
      "Wireframes, jerarquía narrativa y dirección visual basada en un DESIGN.md vivo. Salida: prototipos navegables.",
  },
  {
    icon: GitBranch,
    label: "03 · Construir",
    title: "Iteración medible",
    description:
      "Implementación en sprints cortos con demos semanales. Cada iteración cierra con métricas y aprendizajes.",
  },
  {
    icon: Rocket,
    label: "04 · Lanzar",
    title: "Acompañar el aterrizaje",
    description:
      "Despliegue, observabilidad y un plan de mejora continua. Salida: producto en producción y equipo autónomo.",
  },
];

const stats = [
  { value: "6+", label: "Años combinando código y diseño" },
  { value: "32", label: "Proyectos enviados a producción" },
  { value: "12k", label: "Descargas semanales en npm" },
  { value: "98%", label: "Clientes que vuelven a contratar" },
];

const filters = ["Todos", "Producto", "Web", "Brand", "Lab"] as const;
type Filter = (typeof filters)[number];

export default function HedinyerPortfolioPage() {
  const [filter, setFilter] = useState<Filter>("Todos");

  const visibleProjects =
    filter === "Todos"
      ? projects
      : projects.filter((p) => p.category === filter);

  return (
    <div className="hp-root min-h-screen">
      {/* Header */}
      <header
        className="sticky top-0 z-50 backdrop-blur-md"
        style={{
          backgroundColor: "color-mix(in srgb, var(--hp-primary) 80%, transparent)",
          borderBottom: "1px solid var(--hp-border)",
        }}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link
            href="/"
            className="hp-label-caps flex items-center gap-2"
            style={{ color: "var(--hp-on-primary)" }}
          >
            <span
              className="grid h-7 w-7 place-items-center rounded-[var(--hp-rounded-sm)]"
              style={{
                backgroundColor: "var(--hp-on-primary)",
                color: "var(--hp-primary)",
              }}
            >
              H
            </span>
            <span>Hedinyer</span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            <a href="#trabajo" className="hp-nav-link">
              Trabajo
            </a>
            <a href="#capacidades" className="hp-nav-link">
              Capacidades
            </a>
            <a href="#proceso" className="hp-nav-link">
              Proceso
            </a>
            <a href="#sobre" className="hp-nav-link">
              Sobre
            </a>
          </nav>

          <a href="#contacto" className="hp-button-primary">
            Trabajemos
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="hp-hero-glow" />
        <div className="relative mx-auto max-w-7xl px-6 pt-24 pb-32 md:pt-32 md:pb-40">
          <div className="grid gap-16 md:grid-cols-12">
            <div className="md:col-span-8">
              <div className="hp-badge-status mb-8">
                <span className="hp-pulse" />
                <span>Disponible para nuevos proyectos · Q3 2026</span>
              </div>

              <p
                className="hp-label-caps mb-6"
                style={{ color: "var(--hp-text-secondary)" }}
              >
                Portfolio · Edición 2026
              </p>

              <h1 className="hp-display mb-8 max-w-4xl">
                Diseño y código que se{" "}
                <span style={{ fontStyle: "italic", color: "var(--hp-tertiary)" }}>
                  siente
                </span>{" "}
                humano.
              </h1>

              <p
                className="hp-body-lg mb-10 max-w-2xl"
                style={{ color: "var(--hp-text-secondary)" }}
              >
                Soy Hedinyer — diseñador-ingeniero independiente. Construyo
                productos y experiencias digitales editoriales con un cuidado
                obsesivo por la tipografía, la jerarquía y el código que las
                sostiene. Cada proyecto empieza con un{" "}
                <span
                  className="hp-mono-sm"
                  style={{ color: "var(--hp-on-primary)" }}
                >
                  DESIGN.md
                </span>{" "}
                y termina en producción.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <a href="#trabajo" className="hp-button-primary">
                  Ver trabajo seleccionado
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
                <a href="#contacto" className="hp-button-ghost">
                  <Mail className="h-3.5 w-3.5" />
                  Iniciar un proyecto
                </a>
              </div>
            </div>

            <aside className="md:col-span-4">
              <div
                className="rounded-[var(--hp-rounded-lg)] p-6"
                style={{
                  backgroundColor: "var(--hp-surface)",
                  border: "1px solid var(--hp-border)",
                }}
              >
                <p
                  className="hp-label-caps mb-6"
                  style={{ color: "var(--hp-text-secondary)" }}
                >
                  Hoy · Bogotá, Colombia
                </p>
                <ul className="space-y-5">
                  <li className="flex items-start gap-3">
                    <Sparkles
                      className="mt-0.5 h-4 w-4 flex-shrink-0"
                      style={{ color: "var(--hp-tertiary)" }}
                    />
                    <div>
                      <p className="hp-body-md">
                        Construyendo Atlas v2 con un equipo de tres.
                      </p>
                      <p
                        className="hp-meta-caption"
                        style={{ color: "var(--hp-text-muted)" }}
                      >
                        Producto · TypeScript · Postgres
                      </p>
                    </div>
                  </li>
                  <div className="hp-divider" />
                  <li className="flex items-start gap-3">
                    <PenTool
                      className="mt-0.5 h-4 w-4 flex-shrink-0"
                      style={{ color: "var(--hp-tertiary)" }}
                    />
                    <div>
                      <p className="hp-body-md">
                        Escribiendo notas sobre tipografía variable.
                      </p>
                      <p
                        className="hp-meta-caption"
                        style={{ color: "var(--hp-text-muted)" }}
                      >
                        Lab · MDX · ensayo interactivo
                      </p>
                    </div>
                  </li>
                  <div className="hp-divider" />
                  <li className="flex items-start gap-3">
                    <Layers
                      className="mt-0.5 h-4 w-4 flex-shrink-0"
                      style={{ color: "var(--hp-tertiary)" }}
                    />
                    <div>
                      <p className="hp-body-md">
                        Manteniendo Iris, sistema de diseño open-source.
                      </p>
                      <p
                        className="hp-meta-caption"
                        style={{ color: "var(--hp-text-muted)" }}
                      >
                        Open source · 12k descargas / sem
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </aside>
          </div>

          {/* Stats */}
          <div
            className="mt-24 grid grid-cols-2 gap-px rounded-[var(--hp-rounded-lg)] md:grid-cols-4"
            style={{
              backgroundColor: "var(--hp-border)",
              border: "1px solid var(--hp-border)",
              overflow: "hidden",
            }}
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="p-8"
                style={{ backgroundColor: "var(--hp-primary)" }}
              >
                <p className="hp-h2 mb-2" style={{ color: "var(--hp-on-primary)" }}>
                  {stat.value}
                </p>
                <p
                  className="hp-body-sm"
                  style={{ color: "var(--hp-text-secondary)" }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Selected Work */}
      <section id="trabajo" className="relative py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 flex flex-wrap items-end justify-between gap-8">
            <div className="max-w-2xl">
              <p
                className="hp-label-caps mb-4"
                style={{ color: "var(--hp-text-secondary)" }}
              >
                § 01 — Trabajo seleccionado
              </p>
              <h2 className="hp-h1 mb-4">Una pequeña biblioteca de cuidado</h2>
              <p
                className="hp-body-lg"
                style={{ color: "var(--hp-text-secondary)" }}
              >
                Selección de proyectos donde el diseño y la ingeniería se piensan
                como una sola disciplina. Cada uno con un DESIGN.md vivo detrás.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className="hp-label-caps rounded-[var(--hp-rounded-full)] px-4 py-2 transition-colors"
                  style={{
                    backgroundColor:
                      filter === f
                        ? "var(--hp-on-primary)"
                        : "var(--hp-surface-muted)",
                    color:
                      filter === f
                        ? "var(--hp-primary)"
                        : "var(--hp-text-secondary)",
                    border: "1px solid var(--hp-border)",
                  }}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {visibleProjects.map((project) => (
              <article
                key={project.id}
                className="hp-card-project group relative flex flex-col"
              >
                <div className="mb-6 flex items-center justify-between">
                  <p
                    className="hp-mono-sm"
                    style={{ color: "var(--hp-text-muted)" }}
                  >
                    {project.index} / {String(projects.length).padStart(2, "0")}
                  </p>
                  <p
                    className="hp-mono-sm"
                    style={{ color: "var(--hp-text-muted)" }}
                  >
                    {project.year}
                  </p>
                </div>

                {/* Visual placeholder — uses surface ladder, no decorative chrome */}
                <div
                  className="relative mb-6 aspect-[4/3] w-full overflow-hidden rounded-[var(--hp-rounded-md)]"
                  style={{
                    backgroundColor: "var(--hp-surface-muted)",
                    border: "1px solid var(--hp-border)",
                  }}
                >
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `radial-gradient(140px 100px at 30% 20%, color-mix(in srgb, var(--hp-tertiary) 18%, transparent), transparent 60%),
                                   linear-gradient(135deg, var(--hp-surface-elevated), var(--hp-surface))`,
                    }}
                  />
                  <div
                    className="absolute left-4 right-4 top-4 flex items-center justify-between"
                    style={{ color: "var(--hp-text-secondary)" }}
                  >
                    <span className="hp-mono-sm">{project.client}</span>
                    {project.featured && (
                      <span
                        className="hp-label-caps rounded-[var(--hp-rounded-full)] px-2.5 py-1"
                        style={{
                          backgroundColor: "var(--hp-tertiary-soft)",
                          color: "var(--hp-tertiary)",
                        }}
                      >
                        Destacado
                      </span>
                    )}
                  </div>
                  <div
                    className="absolute bottom-4 left-4 right-4 flex items-end justify-between"
                    style={{ color: "var(--hp-on-primary)" }}
                  >
                    <span
                      className="hp-display"
                      style={{
                        fontSize: "3.25rem",
                        lineHeight: 1,
                        opacity: 0.18,
                      }}
                    >
                      {project.index}
                    </span>
                    <span
                      className="hp-label-caps"
                      style={{ color: "var(--hp-text-secondary)" }}
                    >
                      {project.category}
                    </span>
                  </div>
                </div>

                <h3 className="hp-h3 mb-3" style={{ color: "var(--hp-on-primary)" }}>
                  {project.title}
                </h3>
                <p
                  className="hp-body-md mb-6 flex-grow"
                  style={{ color: "var(--hp-text-secondary)" }}
                >
                  {project.description}
                </p>

                <div className="mb-6 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="hp-tag-tech">
                      {tech}
                    </span>
                  ))}
                </div>

                <div
                  className="hp-divider mb-5"
                  style={{ backgroundColor: "var(--hp-border)" }}
                />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {project.href && (
                      <a
                        href={project.href}
                        className="hp-label-caps inline-flex items-center gap-1.5 transition-colors"
                        style={{ color: "var(--hp-on-primary)" }}
                      >
                        Ver caso
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        className="hp-label-caps inline-flex items-center gap-1.5 transition-colors"
                        style={{ color: "var(--hp-text-secondary)" }}
                      >
                        <Github className="h-3.5 w-3.5" />
                        Código
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Capacidades */}
      <section id="capacidades" className="relative py-24 md:py-32">
        <div
          className="absolute inset-x-0 top-0 mx-auto max-w-7xl px-6"
          aria-hidden
        >
          <div className="hp-divider-strong" />
        </div>

        <div className="mx-auto max-w-7xl px-6 pt-16">
          <div className="mb-16 grid gap-8 md:grid-cols-12">
            <div className="md:col-span-5">
              <p
                className="hp-label-caps mb-4"
                style={{ color: "var(--hp-text-secondary)" }}
              >
                § 02 — Capacidades
              </p>
              <h2 className="hp-h1">
                Cuatro disciplinas, un solo cuaderno de notas.
              </h2>
            </div>
            <div className="md:col-span-6 md:col-start-7">
              <p
                className="hp-body-lg"
                style={{ color: "var(--hp-text-secondary)" }}
              >
                Trabajo end-to-end, desde el primer descubrimiento hasta el último
                deploy. Lo que se diseña se puede construir; lo que se construye se
                pudo diseñar primero. El DESIGN.md es el puente.
              </p>
            </div>
          </div>

          <div className="grid gap-px overflow-hidden rounded-[var(--hp-rounded-lg)] md:grid-cols-2 lg:grid-cols-4"
            style={{
              backgroundColor: "var(--hp-border)",
              border: "1px solid var(--hp-border)",
            }}
          >
            {capabilities.map((cap) => {
              const Icon = cap.icon;
              return (
                <div
                  key={cap.title}
                  className="flex flex-col gap-4 p-8"
                  style={{ backgroundColor: "var(--hp-surface)" }}
                >
                  <div
                    className="grid h-10 w-10 place-items-center rounded-[var(--hp-rounded-md)]"
                    style={{
                      backgroundColor: "var(--hp-tertiary-soft)",
                      color: "var(--hp-tertiary)",
                    }}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="hp-h3">{cap.title}</h3>
                  <p
                    className="hp-body-sm flex-grow"
                    style={{ color: "var(--hp-text-secondary)" }}
                  >
                    {cap.description}
                  </p>
                  <ul className="space-y-1.5">
                    {cap.items.map((item) => (
                      <li
                        key={item}
                        className="hp-mono-sm flex items-center gap-2"
                        style={{ color: "var(--hp-text-muted)" }}
                      >
                        <CheckCircle2
                          className="h-3 w-3"
                          style={{ color: "var(--hp-tertiary)" }}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Proceso */}
      <section id="proceso" className="relative py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 max-w-2xl">
            <p
              className="hp-label-caps mb-4"
              style={{ color: "var(--hp-text-secondary)" }}
            >
              § 03 — Proceso
            </p>
            <h2 className="hp-h1 mb-4">Cuatro movimientos, sin teatro.</h2>
            <p
              className="hp-body-lg"
              style={{ color: "var(--hp-text-secondary)" }}
            >
              No vendo "metodología propietaria". Vendo conversaciones honestas,
              entregables visibles y un calendario que respeta tu equipo.
            </p>
          </div>

          <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <li
                  key={step.title}
                  className="hp-card-project relative flex flex-col gap-4"
                >
                  <span
                    className="hp-mono-sm"
                    style={{ color: "var(--hp-tertiary)" }}
                  >
                    {step.label}
                  </span>
                  <div
                    className="grid h-10 w-10 place-items-center rounded-[var(--hp-rounded-md)]"
                    style={{
                      backgroundColor: "var(--hp-surface-muted)",
                      color: "var(--hp-on-primary)",
                    }}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="hp-h3">{step.title}</h3>
                  <p
                    className="hp-body-sm"
                    style={{ color: "var(--hp-text-secondary)" }}
                  >
                    {step.description}
                  </p>
                  {index < processSteps.length - 1 && (
                    <span
                      className="hp-mono-sm absolute right-6 top-6"
                      style={{ color: "var(--hp-text-muted)" }}
                      aria-hidden
                    >
                      →
                    </span>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* Sobre */}
      <section id="sobre" className="relative py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-4">
              <p
                className="hp-label-caps mb-4"
                style={{ color: "var(--hp-text-secondary)" }}
              >
                § 04 — Sobre
              </p>
              <h2 className="hp-h1 mb-8">
                Una persona, no una agencia.
              </h2>
              <div
                className="rounded-[var(--hp-rounded-lg)] p-6"
                style={{
                  backgroundColor: "var(--hp-surface)",
                  border: "1px solid var(--hp-border)",
                }}
              >
                <p
                  className="hp-label-caps mb-3"
                  style={{ color: "var(--hp-text-secondary)" }}
                >
                  Stack favorito
                </p>
                <ul className="space-y-2">
                  {[
                    "Next.js · TypeScript",
                    "Tailwind · Radix UI",
                    "PostgreSQL · Supabase",
                    "Figma · Framer",
                    "DESIGN.md · MDX",
                  ].map((line) => (
                    <li
                      key={line}
                      className="hp-mono-sm"
                      style={{ color: "var(--hp-text-secondary)" }}
                    >
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="md:col-span-7 md:col-start-6">
              <div
                className="hp-body-lg space-y-6"
                style={{ color: "var(--hp-text-secondary)" }}
              >
                <p>
                  Empecé escribiendo CSS para blogs personales en 2018. Hoy
                  diseño y construyo productos con startups y estudios
                  independientes en LATAM y Europa. La constante a lo largo de
                  esos años es la misma:{" "}
                  <span style={{ color: "var(--hp-on-primary)" }}>
                    cuidar la lectura, cuidar el código, cuidar a quien usará
                    lo que se entrega.
                  </span>
                </p>
                <p>
                  Trabajo solo o como parte de un equipo pequeño. Prefiero
                  contratos cortos con objetivos claros antes que retainers
                  eternos. Cuando el proyecto lo pide, traigo a colaboradores
                  con quienes ya tengo{" "}
                  <a href="#" className="hp-link">
                    años de confianza
                  </a>
                  .
                </p>
                <p>
                  Fuera de pantalla: corro 5 km tres veces por semana, leo más
                  ensayo que ficción, y tengo una colección demasiado grande de
                  libretas vacías esperando un proyecto que las merezca.
                </p>
              </div>

              <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-3">
                {[
                  { label: "Base", value: "Bogotá, CO" },
                  { label: "Idiomas", value: "ES · EN" },
                  { label: "Zona horaria", value: "GMT-5" },
                  { label: "Disponibilidad", value: "20 h / sem" },
                  { label: "Contratos", value: "USD / EUR" },
                  { label: "Iniciado", value: "2018" },
                ].map((item) => (
                  <div key={item.label}>
                    <p
                      className="hp-label-caps mb-1"
                      style={{ color: "var(--hp-text-muted)" }}
                    >
                      {item.label}
                    </p>
                    <p className="hp-body-md">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contacto */}
      <section id="contacto" className="relative py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div
            className="rounded-[var(--hp-rounded-xl)] p-10 md:p-16"
            style={{
              backgroundColor: "var(--hp-surface)",
              border: "1px solid var(--hp-border)",
            }}
          >
            <div className="grid gap-12 md:grid-cols-12">
              <div className="md:col-span-7">
                <p
                  className="hp-label-caps mb-4"
                  style={{ color: "var(--hp-tertiary)" }}
                >
                  § 05 — Trabajemos
                </p>
                <h2 className="hp-h1 mb-6">
                  ¿Tienes un producto en mente o una historia por contar?
                </h2>
                <p
                  className="hp-body-lg mb-10 max-w-xl"
                  style={{ color: "var(--hp-text-secondary)" }}
                >
                  Cuéntame el contexto, el equipo y la fecha objetivo. Respondo
                  todos los correos en menos de 48 horas hábiles con una primera
                  lectura honesta.
                </p>

                <div className="flex flex-wrap items-center gap-4">
                  <a
                    href="mailto:hola@hedinyer.com"
                    className="hp-button-primary"
                  >
                    <Mail className="h-3.5 w-3.5" />
                    hola@hedinyer.com
                  </a>
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hp-button-ghost"
                  >
                    <Github className="h-3.5 w-3.5" />
                    GitHub
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hp-button-ghost"
                  >
                    <Linkedin className="h-3.5 w-3.5" />
                    LinkedIn
                  </a>
                </div>
              </div>

              <div className="md:col-span-4 md:col-start-9">
                <form
                  className="flex flex-col gap-4"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <label className="flex flex-col gap-2">
                    <span
                      className="hp-label-caps"
                      style={{ color: "var(--hp-text-secondary)" }}
                    >
                      Nombre
                    </span>
                    <input
                      type="text"
                      placeholder="Tu nombre"
                      className="hp-input-field"
                    />
                  </label>
                  <label className="flex flex-col gap-2">
                    <span
                      className="hp-label-caps"
                      style={{ color: "var(--hp-text-secondary)" }}
                    >
                      Email
                    </span>
                    <input
                      type="email"
                      placeholder="tu@correo.com"
                      className="hp-input-field"
                    />
                  </label>
                  <label className="flex flex-col gap-2">
                    <span
                      className="hp-label-caps"
                      style={{ color: "var(--hp-text-secondary)" }}
                    >
                      Cuéntame
                    </span>
                    <textarea
                      rows={4}
                      placeholder="Dos líneas son suficientes."
                      className="hp-input-field resize-none"
                    />
                  </label>
                  <button type="submit" className="hp-button-primary mt-2">
                    Enviar
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="border-t"
        style={{ borderColor: "var(--hp-border)" }}
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-2">
            <span
              className="hp-label-caps"
              style={{ color: "var(--hp-text-secondary)" }}
            >
              Hedinyer · Portfolio · {new Date().getFullYear()}
            </span>
            <span
              className="hp-mono-sm"
              style={{ color: "var(--hp-text-muted)" }}
            >
              Diseñado y construido siguiendo{" "}
              <a
                href="https://github.com/google-labs-code/design.md"
                target="_blank"
                rel="noopener noreferrer"
                className="hp-link"
              >
                DESIGN.md
              </a>
              .
            </span>
          </div>
          <div className="flex items-center gap-6">
            <a
              href="mailto:hola@hedinyer.com"
              className="hp-nav-link"
              aria-label="Email"
            >
              Email
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hp-nav-link"
              aria-label="GitHub"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hp-nav-link"
              aria-label="LinkedIn"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
