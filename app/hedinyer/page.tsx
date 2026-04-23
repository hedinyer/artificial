"use client";

import { useState } from "react";
import { Github, ExternalLink, Mail, Linkedin, Code, Palette, Database, Zap, ArrowRight } from "lucide-react";
import Link from "next/link";

// Datos de proyectos - puedes personalizar estos
const projects = [
  {
    id: 1,
    title: "Proyecto Ejemplo 1",
    description: "Descripción breve del proyecto y las tecnologías utilizadas.",
    technologies: ["React", "TypeScript", "Next.js"],
    image: "/placeholder.jpg",
    github: "https://github.com",
    demo: "https://example.com",
    featured: true
  },
  {
    id: 2,
    title: "Proyecto Ejemplo 2",
    description: "Descripción breve del proyecto y las tecnologías utilizadas.",
    technologies: ["Node.js", "PostgreSQL", "Express"],
    image: "/placeholder.jpg",
    github: "https://github.com",
    demo: "https://example.com",
    featured: false
  },
  {
    id: 3,
    title: "Proyecto Ejemplo 3",
    description: "Descripción breve del proyecto y las tecnologías utilizadas.",
    technologies: ["Python", "Django", "Docker"],
    image: "/placeholder.jpg",
    github: "https://github.com",
    demo: "https://example.com",
    featured: false
  }
];

// Habilidades
const skills = [
  { name: "Frontend", icon: Code, items: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
  { name: "Design", icon: Palette, items: ["UI/UX", "Figma", "Adobe XD"] },
  { name: "Backend", icon: Database, items: ["Node.js", "Python", "PostgreSQL"] },
  { name: "Tools", icon: Zap, items: ["Git", "Docker", "AWS"] }
];

export default function HedinyerPortfolio() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredProjects = activeFilter === "all" 
    ? projects 
    : projects.filter(p => p.technologies.some(t => t.toLowerCase().includes(activeFilter)));

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="text-xl font-bold tracking-tight hover:text-white/80 transition-colors">
              ← Volver
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <a href="#proyectos" className="text-sm text-white/70 hover:text-white transition-colors">Proyectos</a>
              <a href="#habilidades" className="text-sm text-white/70 hover:text-white transition-colors">Habilidades</a>
              <a href="#sobre-mi" className="text-sm text-white/70 hover:text-white transition-colors">Sobre mí</a>
              <a href="#contacto" className="text-sm text-white/70 hover:text-white transition-colors">Contacto</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 mb-6">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Disponible para proyectos
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-6">
              Hola, soy{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Hedinyer
              </span>
            </h1>
            <p className="text-xl text-white/70 mb-8 leading-relaxed">
              Desarrollador y diseñador apasionado por crear experiencias digitales excepcionales.
              Especializado en desarrollo full-stack y diseño de interfaces modernas.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#proyectos"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white text-black font-medium hover:bg-white/90 transition-colors"
              >
                Ver proyectos
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#contacto"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-white/20 bg-white/5 hover:bg-white/10 transition-colors"
              >
                <Mail className="w-4 h-4" />
                Contactar
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Proyectos Section */}
      <section id="proyectos" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">Proyectos</h2>
            <p className="text-white/70 text-lg">Una selección de mis trabajos más recientes</p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-8">
            <button
              onClick={() => setActiveFilter("all")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeFilter === "all"
                  ? "bg-white text-black"
                  : "bg-white/5 text-white/70 hover:bg-white/10"
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setActiveFilter("react")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeFilter === "react"
                  ? "bg-white text-black"
                  : "bg-white/5 text-white/70 hover:bg-white/10"
              }`}
            >
              React
            </button>
            <button
              onClick={() => setActiveFilter("node")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeFilter === "node"
                  ? "bg-white text-black"
                  : "bg-white/5 text-white/70 hover:bg-white/10"
              }`}
            >
              Node.js
            </button>
            <button
              onClick={() => setActiveFilter("python")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeFilter === "python"
                  ? "bg-white text-black"
                  : "bg-white/5 text-white/70 hover:bg-white/10"
              }`}
            >
              Python
            </button>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 hover:border-white/20 transition-all duration-300"
              >
                <div className="aspect-video bg-gradient-to-br from-white/10 to-white/5 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Code className="w-16 h-16 text-white/20" />
                  </div>
                  {project.featured && (
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-medium">
                      Destacado
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-white/70 text-sm mb-4 line-clamp-2">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 rounded-md bg-white/5 text-xs text-white/70 border border-white/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-4">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      Código
                    </a>
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Demo
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Habilidades Section */}
      <section id="habilidades" className="py-20 px-4 sm:px-6 lg:px-8 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">Habilidades</h2>
            <p className="text-white/70 text-lg">Tecnologías y herramientas que domino</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skill, idx) => {
              const IconComponent = skill.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl border border-white/10 bg-white/5 hover:border-white/20 transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-white/10">
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold">{skill.name}</h3>
                  </div>
                  <ul className="space-y-2">
                    {skill.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="text-sm text-white/70">
                        • {item}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Sobre mí Section */}
      <section id="sobre-mi" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">Sobre mí</h2>
            <p className="text-white/70 text-lg">
              Apasionado por la tecnología y el diseño, siempre buscando crear soluciones innovadoras
            </p>
          </div>

          <div className="prose prose-invert max-w-none">
            <p className="text-white/80 leading-relaxed mb-6">
              Soy un desarrollador full-stack con experiencia en crear aplicaciones web modernas y escalables.
              Me especializo en React, Next.js y Node.js, pero siempre estoy aprendiendo nuevas tecnologías.
            </p>
            <p className="text-white/80 leading-relaxed mb-6">
              Mi enfoque combina código limpio, diseño atractivo y experiencia de usuario excepcional.
              Disfruto trabajando en proyectos desafiantes que me permiten crecer profesionalmente.
            </p>
            <p className="text-white/80 leading-relaxed">
              Cuando no estoy programando, me gusta explorar nuevas tendencias en diseño, contribuir a
              proyectos open source y compartir conocimiento con la comunidad.
            </p>
          </div>
        </div>
      </section>

      {/* Contacto Section */}
      <section id="contacto" className="py-20 px-4 sm:px-6 lg:px-8 bg-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">Trabajemos juntos</h2>
          <p className="text-white/70 text-lg mb-8">
            ¿Tienes un proyecto en mente? Me encantaría escucharlo.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <a
              href="mailto:tu-email@example.com"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-white/20 bg-white/5 hover:bg-white/10 transition-colors"
            >
              <Mail className="w-5 h-5" />
              Email
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-white/20 bg-white/5 hover:bg-white/10 transition-colors"
            >
              <Github className="w-5 h-5" />
              GitHub
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-white/20 bg-white/5 hover:bg-white/10 transition-colors"
            >
              <Linkedin className="w-5 h-5" />
              LinkedIn
            </a>
          </div>

          <div className="p-8 rounded-2xl border border-white/10 bg-white/5">
            <p className="text-white/70">
              Siempre estoy abierto a nuevas oportunidades y proyectos interesantes.
              No dudes en contactarme si crees que podemos trabajar juntos.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-white/50 text-sm">
            © {new Date().getFullYear()} Hedinyer. Hecho con ❤️
          </p>
        </div>
      </footer>
    </div>
  );
}

