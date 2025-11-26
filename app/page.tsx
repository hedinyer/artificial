"use client";

import { Button } from "@/components/ui/button"
import { useEffect, useState, useMemo, memo, useCallback } from "react"
import dynamic from 'next/dynamic';
import Silk from './Silk';
import ShapeBlur from './ShapeBlur';
import { ChromaGrid } from "@/components/ui/chroma-grid/ChromaGrid";

const SplitText = dynamic(() => import('./components/SplitText'), {
  ssr: false,
  loading: () => null
});

import ScrollVelocity from "./components/ScrollVelocity";
import { Sparkles, Zap, DollarSign, TrendingUp, Palette, Bot, Shield } from "lucide-react";
import Beams from "./components/Beams";
import OptimizedFonts from "./components/OptimizedFonts";
import "@/components/ui/chroma-grid/ChromaGrid.css";
import "./components/AnimatedShadows.css";

const SplineBackground = dynamic(() => import('./components/SplineBackground'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-black/20" />
});

// Simple components without optimization
const MemoizedBeams = memo(Beams);

// Optimized static data with memoization
const chromaItems = [
  {
    image: "/gifs/branding.gif",
    title: "Branding Estratégico",
    subtitle: "Impulsa la percepción de tu marca",
    borderColor: "#3B82F6",
    gradient: "linear-gradient(145deg, #3B82F6, #000)",
    url: "#"
  },
  {
    image: "/gifs/uiux.gif",
    title: "UX/UI Diseño",
    subtitle: "Experiencias que enamoran usuarios",
    borderColor: "#10B981",
    gradient: "linear-gradient(180deg, #10B981, #000)",
    url: "#"
  },
  {
    image: "/gifs/software.gif",
    title: "Software a Medida",
    subtitle: "Automatiza tus procesos de negocio",
    borderColor: "#F59E0B",
    gradient: "linear-gradient(165deg, #F59E0B, #000)",
    url: "#"
  },
  {
    image: "/gifs/inteligencia.gif",
    title: "Inteligencia de Datos",
    subtitle: "Decisiones basadas en datos",
    borderColor: "#EF4444",
    gradient: "linear-gradient(195deg, #EF4444, #000)",
    url: "#"
  },
  {
    image: "/gifs/marketing.gif",
    title: "Growth Marketing",
    subtitle: "Escala tu negocio con estrategias",
    borderColor: "#8B5CF6",
    gradient: "linear-gradient(225deg, #8B5CF6, #000)",
    url: "#"
  },
  {
    image: "/gifs/consultaria.gif",
    title: "Consultoría Digital",
    subtitle: "Tu ruta a la transformación digital",
    borderColor: "#06B6D4",
    gradient: "linear-gradient(135deg, #06B6D4, #000)",
    url: "#"
  },
];

// Services data with stable reference
const services = [
  { text: "Fábricas pequeñas", className: "font-oswald" },
  { text: "Talleres de producción", className: "font-playfair" },
  { text: "Clínicas estéticas", className: "font-lato" },
  { text: "Consultorios odontológicos", className: "font-montserrat" },
  { text: "Spas", className: "font-roboto" },
  { text: "Centros de uñas", className: "font-oswald" },
  { text: "Centros de cejas", className: "font-playfair" },
  { text: "Estudios jurídicos", className: "font-lato" },
  { text: "Empresas de ingeniería", className: "font-montserrat" },
  { text: "Peluquerías", className: "font-roboto" },
  { text: "Barberías", className: "font-oswald" },
  { text: "Clínicas veterinarias", className: "font-playfair" },
  { text: "Tiendas de ropa", className: "font-lato" },
  { text: "Tiendas de zapatos", className: "font-montserrat" },
  { text: "Tiendas de muebles", className: "font-roboto" },
  { text: "Licoreras", className: "font-oswald" },
  { text: "Ópticas", className: "font-playfair" },
  { text: "Tiendas de accesorios", className: "font-lato" },
  { text: "Negocios e-commerce", className: "font-montserrat" },
];

// Navigation items with stable reference
const navItems = [
  { label: "Inicio", href: "#inicio" },
  { label: "Servicios", href: "#servicios" },
  { label: "Ventajas", href: "#ventajas" },
  { label: "Nosotros", href: "#historia" },
];

// Ventajas data with stable reference
const ventajas = [
  {
    icon: Zap,
    title: "Multiplica tu productividad hasta 3x",
    description: "Automatizamos procesos repetitivos para que tu equipo se enfoque en lo que realmente importa",
    benefit: "43% de aumento en velocidad operativa",
    source: "BusinessDasher 2024",
    metric: "Hasta 3 horas diarias de tareas automatizables por empleado",
    metricSource: "McKinsey 2025",
    gradient: "from-blue-500 to-cyan-500",
    borderColor: "#3B82F6"
  },
  {
    icon: DollarSign,
    title: "Ahorra hasta 32% en costos operativos",
    description: "Eliminamos gastos innecesarios y optimizamos recursos existentes",
    benefit: "ROI de hasta 200% en el primer año",
    source: "Estudios ServiceNow 2024",
    metric: "Reducción de 20%+ en costos contables",
    metricSource: "Vintti Research 2024",
    gradient: "from-green-500 to-emerald-500",
    borderColor: "#10B981"
  },
  {
    icon: TrendingUp,
    title: "Maximiza tus recursos",
    description: "Tecnología que te permite escalar sin contratar más personal",
    benefit: "Crecimiento sostenible y rentable",
    source: "",
    metric: "",
    metricSource: "",
    gradient: "from-purple-500 to-pink-500",
    borderColor: "#8B5CF6"
  },
  {
    icon: Palette,
    title: "Marca profesional desde día uno",
    description: "Desarrollamos tu identidad visual y estrategia de marca completa",
    benefit: "Presencia memorable en el mercado",
    source: "",
    metric: "",
    metricSource: "",
    gradient: "from-orange-500 to-red-500",
    borderColor: "#F59E0B"
  },
  {
    icon: Bot,
    title: "Agentes de IA que trabajan 24/7",
    description: "Delegamos tareas administrativas a inteligencia artificial avanzada",
    benefit: "90% de tareas repetitivas pueden automatizarse",
    source: "BusinessDasher 2024",
    metric: "60% de empresas ya implementan soluciones de automatización",
    metricSource: "Duke University 2024",
    gradient: "from-indigo-500 to-purple-500",
    borderColor: "#6366F1"
  },
  {
    icon: Shield,
    title: "Administra tu negocio sin estrés",
    description: "Sistemas intuitivos que hacen la gestión empresarial increíblemente fácil",
    benefit: "Más tiempo para estrategia y crecimiento",
    source: "",
    metric: "",
    metricSource: "",
    gradient: "from-teal-500 to-cyan-500",
    borderColor: "#06B6D4"
  },
];

// Credibility data
const credibilityData = [
  "Organizaciones con automatización avanzada reportan 32% de ahorro en costos promedio (Deloitte 2024)",
  "ROI entre 30% y 200% en el primer año por automatización (ServiceNow 2024)",
  "Potencial de automatizar hasta 3 horas diarias por empleado para 2030 (McKinsey 2025)",
  "45% de empresas usan automatización e IA para reducir costos (BusinessDasher 2024)",
  "60% de empresas ya implementaron soluciones de automatización (Duke University 2024)"
];

// Enhanced services data with conversion-focused content
const enhancedServices = [
  {
    ...chromaItems[2], // Software a Medida
    description: "Desarrollamos soluciones tecnológicas personalizadas que automatizan procesos y multiplican la productividad de tu equipo.",
    benefits: ["Automatización de procesos", "Ahorro de tiempo y costos", "Escalabilidad garantizada"],
    ctaText: "Solicitar consulta",
    featured: true
  },
  {
    ...chromaItems[1], // UX/UI Diseño
    description: "Diseñamos experiencias digitales intuitivas que convierten visitantes en clientes. Interfaces que tus usuarios amarán usar.",
    benefits: ["Mayor tasa de conversión", "Reducción de fricción", "Mejor retención"],
    ctaText: "Ver portfolio"
  },
  {
    ...chromaItems[0], // Branding Estratégico
    description: "Creamos identidades de marca que conectan emocionalmente con tu audiencia. Desde el naming hasta la estrategia visual completa.",
    benefits: ["Aumento de reconocimiento de marca", "Consistencia visual en todos los canales", "Posicionamiento competitivo"],
    ctaText: "Ver casos de éxito"
  },
  {
    ...chromaItems[3], // Inteligencia de Datos
    description: "Transformamos tus datos en decisiones estratégicas. Analytics avanzado y dashboards en tiempo real para crecer con confianza.",
    benefits: ["Decisiones basadas en datos", "Insights accionables", "ROI medible"],
    ctaText: "Ver demos"
  },
  {
    ...chromaItems[5], // Consultoría Digital
    description: "Te acompañamos en tu transformación digital con estrategias personalizadas y roadmap claro hacia el éxito. Optimizamos y maximizamos resultados.",
    benefits: ["Roadmap claro", "Implementación guiada", "Resultados garantizados"],
    ctaText: "Agendar llamada"
  }
];

// Create a memoized services section component
const ServicesSection = memo(({ services1, services2, services3, services4, isServiciosActive, showChroma }: any) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Simple Beams - no optimization
  const memoizedBeams = useMemo(() => (
    <MemoizedBeams />
  ), []);

  // Combine services for the marquee effect with stable references
  const firstHalf = useMemo(() => [...services1, ...services2], [services1, services2]);
  const secondHalf = useMemo(() => [...services3, ...services4], [services3, services4]);

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile(); // Check initial size
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Keep elements always visible - no fade reloading
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Featured service (first one)
  const featuredService = enhancedServices[0];
  // Other services
  const otherServices = enhancedServices.slice(1);

  return (
    <section
      id="servicios"
      className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-20"
    >
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
        <div>
          <p className="text-sm font-medium text-white/50 mb-2">Lo que ofrecemos</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tighter text-white">
            Tu negocio, potenciado por IA
          </h2>
          <p className="mt-3 text-base text-white/70 max-w-2xl">
            Del branding al software, convertimos problemas en ventajas. Hacemos que tu competencia se pregunte cómo lo lograste.
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid gap-3 md:grid-cols-3">
        {/* Featured Service - Large Card */}
        <div className="group relative overflow-hidden rounded-md border border-white/10 bg-white/5 md:col-span-2 hover:border-white/20 transition-all duration-300">
          <div className="relative">
            <img
              src={featuredService.image}
              alt={featuredService.title}
              className="aspect-[5/2] w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
          </div>
          <div className="p-2 sm:p-2.5">
            <div className="flex items-center gap-1 mb-0.5">
              <span className="inline-flex items-center gap-0.5 rounded-full border border-emerald-500/30 bg-emerald-500/15 px-1 py-0.5 text-[8px] font-medium text-emerald-300">
                MÁS POPULAR
              </span>
              <span className="text-[8px] text-white/60">Transformación completa</span>
            </div>
            <h3 className="mt-0.5 text-base sm:text-lg font-medium tracking-tight text-white">
              {featuredService.title}
            </h3>
            <p className="mt-0.5 text-[10px] sm:text-[11px] text-white/70 leading-snug line-clamp-2">
              {featuredService.description}
            </p>
            <div className="mt-1.5 flex flex-wrap items-center gap-1">
              <a
                href="#contacto"
                className="inline-flex items-center gap-0.5 rounded border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-medium text-white/90 backdrop-blur hover:bg-white/10 transition-all duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  className="h-2.5 w-2.5">
                  <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
                  <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
                  <path d="M10 9H8"></path>
                  <path d="M16 13H8"></path>
                  <path d="M16 17H8"></path>
                </svg>
                Solicitar cotización
              </a>
              <a
                href="#contacto"
                className="inline-flex items-center gap-0.5 text-[10px] font-medium text-black bg-emerald-500 rounded px-2 py-0.5 hover:bg-emerald-400 transition-all duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  className="h-2.5 w-2.5">
                  <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"></path>
                  <path d="m21.854 2.147-10.94 10.939"></path>
                </svg>
                Solicitar cotización
              </a>
            </div>
          </div>
        </div>

        {/* Other Services - Smaller Cards */}
        {otherServices.map((service, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-lg border border-white/10 bg-white/5 hover:border-white/20 transition-all duration-300 group"
          >
            <div className="p-3 sm:p-4">
              <div className="flex items-center justify-between mb-1.5">
                <h3 className="text-sm sm:text-base font-medium tracking-tight text-white flex items-center gap-1.5">
                  {service.title}
                </h3>
                <span className="inline-flex items-center rounded-full border border-emerald-500/30 bg-emerald-500/15 px-1 py-0.5 text-[9px] font-medium text-emerald-300">
                  IA
                </span>
              </div>
              <p className="mt-1 text-[11px] sm:text-xs text-white/70 leading-relaxed">
                {service.description}
              </p>
              <div className={`${index === otherServices.length - 1 ? 'mt-1.5' : 'mt-2.5'} rounded-md overflow-hidden border border-white/10 group-hover:border-white/20 transition-all duration-300`}>
                <img
                  src={service.image}
                  alt={service.title}
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
              <a
                href="#contacto"
                className="mt-2.5 inline-flex items-center justify-center gap-1 rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-medium text-white/90 backdrop-blur hover:bg-white/10 hover:text-white transition-all duration-200"
              >
                Solicitar cotización
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  className="h-3 w-3">
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Industries Marquee - Mobile Optimized */}
      <div className="w-full max-w-full text-center mt-16 sm:mt-20 px-4">
        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-4 sm:mb-6">
          Trabajamos con una amplia gama de industrias
        </h3>
        <div
          className="relative h-32 sm:h-40 md:h-48 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full flex flex-col gap-y-3 sm:gap-y-4 md:gap-y-6">
              <ScrollVelocity
                texts={firstHalf}
                velocity={-20}
                singleLine={true}
                className="text-base sm:text-xl md:text-2xl lg:text-3xl text-gray-400 font-light opacity-80"
              />
              <ScrollVelocity
                texts={secondHalf}
                velocity={20}
                singleLine={true}
                className="text-base sm:text-xl md:text-2xl lg:text-3xl text-gray-400 font-light opacity-80"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});
ServicesSection.displayName = 'ServicesSection';

// Create a simple hero section component
const HeroSection = memo(({ isInicioActive }: { isInicioActive: boolean }) => {
  return (
    <section id="inicio" className="relative z-10 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 pt-24 pb-8 md:px-6 md:pt-32">
        <div className="max-w-3xl text-center mr-auto ml-auto">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-300">
            <Sparkles className="h-4 w-4 text-sky-400" />
            150+ empresas transformadas
          </p>

          <h1 className="sm:text-5xl md:text-7xl text-4xl font-semibold tracking-tight text-white">
            Multiplica tu productividad con IA y automatización
          </h1>

          <p className="mt-5 text-base md:text-lg text-slate-300">
            Del branding al software, convertimos problemas en ventajas. Hacemos que tu competencia se pregunte cómo lo lograste.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row mt-8 items-center justify-center">
            <button
              type="button"
              className="hero-button"
              style={{
                background: 'radial-gradient(65.28% 65.28% at 50% 100%, rgba(34, 211, 238, 0.8) 0%, rgba(34, 211, 238, 0) 100%), linear-gradient(0deg, #2563eb, #2563eb)',
                padding: '12px 18px',
                minHeight: '48px',
                minWidth: '102px',
                cursor: 'pointer'
              }}
            >
              <div className="points_wrapper">
                {[...Array(10)].map((_, i) => (
                  <i
                    key={i}
                    className="point"
                    style={{
                      left: `${[10, 30, 25, 44, 50, 75, 88, 58, 98, 65][i]}%`,
                      opacity: [1, 0.7, 0.8, 0.6, 1, 0.5, 0.9, 0.8, 0.6, 1][i],
                      animation: `floating-points ${[2.35, 2.5, 2.2, 2.05, 1.9, 1.5, 2.2, 2.25, 2.6, 2.5][i]}s infinite ease-in-out`,
                      animationDelay: `${[0.2, 0.5, 0.1, 0, 0, 1.5, 0.2, 0.2, 0.1, 0.2][i]}s`
                    }}
                  />
                ))}
              </div>
              <span className="inner">
                Prueba gratis
                <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </span>
            </button>

            <button className="group relative inline-flex items-center justify-center min-w-[120px] cursor-pointer rounded-xl px-[17px] py-3 text-white/70 tracking-tight font-semibold transition-all duration-1000 ease-in-out hover:-translate-y-[3px] hover:scale-[1.1] hover:text-white" style={{ boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.1)', background: 'radial-gradient(ellipse at bottom, rgba(71,81,92,1) 0%, rgba(0,0,0,1) 100%)' }}>
              <span className="relative z-10 font-normal">Ver demo</span>
              <span aria-hidden="true" className="absolute bottom-0 left-1/2 h-[1px] w-[70%] -translate-x-1/2 opacity-20 transition-all duration-1000 ease-in-out group-hover:opacity-80" style={{ background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 50%, rgba(255,255,255,0) 100%)' }}></span>
            </button>
          </div>
        </div>
      </div>

      {/* Editor preview */}
      <div className="-mb-8 max-w-7xl md:px-6 mr-auto ml-auto pr-4 pl-4">
        <div className="relative w-full overflow-hidden shadow-black/50 bg-gradient-to-b from-white/[0.04] to-white/[0.02] border-white/10 border rounded-2xl mr-auto ml-auto shadow-2xl backdrop-blur-lg">
          {/* Topbar */}
          <div className="flex items-center justify-between border-b border-white/10 px-3 py-2">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-red-500/80"></span>
              <span className="h-3 w-3 rounded-full bg-yellow-400/80"></span>
              <span className="h-3 w-3 rounded-full bg-green-500/80"></span>
              <div className="ml-3 hidden items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-xs text-slate-300 sm:flex">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5 text-slate-200"><rect width="7" height="18" x="3" y="3" rx="1"></rect><rect width="7" height="7" x="14" y="3" rx="1"></rect><rect width="7" height="7" x="14" y="14" rx="1"></rect></svg>
                art_ificial Studio — Proyecto: Aurora
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="hidden rounded-md border border-white/10 bg-white/5 p-1.5 text-slate-200 hover:bg-white/10 sm:inline-flex">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"></line><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"></line></svg>
              </button>
              <button className="hidden rounded-md border border-white/10 bg-white/5 p-1.5 text-slate-200 hover:bg-white/10 sm:inline-flex">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><path d="M16 3.128a4 4 0 0 1 0 7.744"></path><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><circle cx="9" cy="7" r="4"></circle></svg>
              </button>
              <button className="rounded-md bg-sky-500/90 px-3 py-1.5 text-xs font-medium text-white hover:bg-sky-500">Publicar</button>
            </div>
          </div>

          {/* Editor body */}
          <div className="grid grid-cols-1 md:grid-cols-12">
            {/* Canvas */}
            <main className="relative md:col-span-6 bg-black/20">
              <div className="flex items-center gap-2 border-b border-white/10 px-3 py-2 text-xs text-slate-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-sky-400"><path d="M18 8V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h8"></path><path d="M10 19v-3.96 3.15"></path><path d="M7 19h5"></path><rect width="6" height="10" x="16" y="12" rx="2"></rect></svg>
                <span>Breakpoint</span>
                <span className="rounded-md bg-white/5 px-1.5 py-0.5">Desktop</span>
                <span className="text-slate-500">|</span>
                <span>1200</span>
              </div>

              <div className="sm:p-6 p-4">
                <div className="relative overflow-hidden rounded-xl border border-white/10 bg-white/5 ring-1 ring-white/10 h-[360px] sm:h-[460px]">
                  <div className="absolute inset-0 w-full h-full">
                    <SplineBackground
                      scene="/robot/scene.splinecode"
                      isVisible={true}
                      style={{
                        width: '100%',
                        height: '100%',
                      }}
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent z-10"></div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="max-w-xl rounded-xl border border-white/10 bg-black/40 p-4 backdrop-blur">
                      <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-white">Software a la Medida</h3>
                      <p className="mt-1 text-sm text-slate-300">Soluciones personalizadas que se adaptan a tu negocio.</p>
                    </div>
                  </div>
                </div>
              </div>
            </main>

            {/* Right panel */}
            <aside className="hidden md:block md:col-span-6 border-l border-white/10 bg-black/30 p-3">
              <div className="mb-3 flex items-center justify-between">
                <div className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-2 py-1 text-xs font-medium text-slate-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5"><line x1="21" x2="14" y1="4" y2="4"></line><line x1="10" x2="3" y1="4" y2="4"></line><line x1="21" x2="12" y1="12" y2="12"></line><line x1="8" x2="3" y1="12" y2="12"></line><line x1="21" x2="16" y1="20" y2="20"></line><line x1="12" x2="3" y1="20" y2="20"></line><line x1="14" x2="14" y1="2" y2="6"></line><line x1="8" x2="8" y1="10" y2="14"></line><line x1="16" x2="16" y1="18" y2="22"></line></svg>
                  Propiedades
                </div>
                <button className="rounded-md border border-white/10 bg-white/5 p-1 text-slate-300 hover:bg-white/10">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
                </button>
              </div>

              <div className="space-y-3">
                {/* Code Block */}
                <div className="bg-white/5 rounded-lg p-4 space-y-2 h-[600px] flex flex-col">
                  <div className="mb-2 flex items-center justify-between text-xs">
                    <span className="text-slate-300 font-medium">Code</span>
                    <button className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-slate-400 hover:bg-white/10">
                      Copy
                    </button>
                  </div>
                  <div className="bg-black/40 rounded-md overflow-hidden flex-1 relative">
                    <div className="absolute inset-0 overflow-hidden">
                      <pre className="p-4 text-[10px] text-slate-300 font-mono leading-relaxed code-scroll">
                        <code className="block">
                          {`<HeroSection isInicioActive={true}>
  <div className="hero-content">
    <h1 className="text-4xl font-bold">
      Multiplica tu productividad
    </h1>
    <p className="text-lg text-gray-300">
      Con IA y automatización
    </p>
    <button className="mt-4 px-6 py-2 
        bg-blue-500 rounded-lg">
      Prueba gratis
    </button>
  </div>
</HeroSection>

<ServicesSection>
  <div className="services-grid">
    <ServiceCard 
      title="Branding"
      description="Impulsa tu marca"
    />
    <ServiceCard 
      title="UX/UI"
      description="Experiencias únicas"
    />
    <ServiceCard 
      title="Software"
      description="Automatización"
    />
  </div>
</ServicesSection>

<VentajasSection>
  <div className="ventajas-list">
    <VentajaCard 
      icon={Zap}
      title="Multiplica productividad"
      benefit="Hasta 3x más rápido"
    />
    <VentajaCard 
      icon={DollarSign}
      title="Ahorra costos"
      benefit="Hasta 32% menos"
    />
  </div>
</VentajasSection>

<HistoriaSection>
  <div className="team-grid">
    <TeamMember 
      name="Mauricio"
      role="AI & Engineering"
    />
    <TeamMember 
      name="Andrea"
      role="Design & Branding"
    />
  </div>
</HistoriaSection>

<HeroSection isInicioActive={true}>
  <div className="hero-content">
    <h1 className="text-4xl font-bold">
      Multiplica tu productividad
    </h1>
    <p className="text-lg text-gray-300">
      Con IA y automatización
    </p>
    <button className="mt-4 px-6 py-2 
        bg-blue-500 rounded-lg">
      Prueba gratis
    </button>
  </div>
</HeroSection>

<ServicesSection>
  <div className="services-grid">
    <ServiceCard 
      title="Branding"
      description="Impulsa tu marca"
    />
    <ServiceCard 
      title="UX/UI"
      description="Experiencias únicas"
    />
    <ServiceCard 
      title="Software"
      description="Automatización"
    />
  </div>
</ServicesSection>

<VentajasSection>
  <div className="ventajas-list">
    <VentajaCard 
      icon={Zap}
      title="Multiplica productividad"
      benefit="Hasta 3x más rápido"
    />
    <VentajaCard 
      icon={DollarSign}
      title="Ahorra costos"
      benefit="Hasta 32% menos"
    />
  </div>
</VentajasSection>

<HistoriaSection>
  <div className="team-grid">
    <TeamMember 
      name="Mauricio"
      role="AI & Engineering"
    />
    <TeamMember 
      name="Andrea"
      role="Design & Branding"
    />
  </div>
</HistoriaSection>`}
                        </code>
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
});
HeroSection.displayName = 'HeroSection';

// Create a memoized ventajas section component
const VentajasSection = memo(() => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedCards, setAnimatedCards] = useState<number[]>([]);

  // Mouse tracking for ChromaGrid-style spotlight effect
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    card.style.setProperty('--mouse-x', `${x}%`);
    card.style.setProperty('--mouse-y', `${y}%`);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);

          // Animate cards sequentially
          ventajas.forEach((_, index) => {
            setTimeout(() => {
              setAnimatedCards(prev => [...prev, index]);
            }, index * 150);
          });

          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    const section = document.getElementById('ventajas');
    if (section) {
      observer.observe(section);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      id="ventajas"
      className="min-h-screen py-16 sm:py-24 md:py-32 px-4 sm:px-5 relative overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-black"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">

        {/* Header - Mobile Optimized */}
        <div className="text-center mb-12 sm:mb-16 px-4">
          <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white max-w-4xl mx-auto leading-relaxed">
            IA que multiplica tu productividad y reduce costos automáticamente
          </p>
        </div>

        {/* Ventajas Grid - Mobile Responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-20 max-w-7xl mx-auto px-4 sm:px-6">
          {ventajas.map((ventaja, index) => {
            const IconComponent = ventaja.icon;
            const isAnimated = animatedCards.includes(index);

            return (
              <div
                key={index}
                className={`chroma-ventaja-card group relative overflow-hidden rounded-[20px] transition-all duration-700 transform sm:h-[320px] ${isAnimated
                    ? 'opacity-100 translate-y-0 scale-100'
                    : 'opacity-0 translate-y-20 scale-95'
                  }`}
                onMouseMove={handleMouseMove}
                style={{
                  transitionDelay: `${index * 150}ms`,
                  '--card-border': ventaja.borderColor,
                  '--card-gradient': ventaja.gradient,
                  '--mouse-x': '50%',
                  '--mouse-y': '50%',
                  '--spotlight-color': 'rgba(255, 255, 255, 0.15)',
                  minHeight: '280px',
                  border: '1px solid rgba(75, 85, 99, 0.3)',
                  background: ventaja.gradient,
                  cursor: 'pointer'
                } as React.CSSProperties}
              >
                {/* ChromaGrid-style spotlight effect */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"
                  style={{
                    background: `radial-gradient(circle at var(--mouse-x) var(--mouse-y), var(--spotlight-color), transparent 70%)`
                  }}
                ></div>

                {/* Content Container - Mobile Optimized */}
                <div className="relative z-20 p-4 sm:p-6 h-full flex flex-col justify-between">

                  {/* Header Section with Title - Mobile Layout */}
                  <div className="flex items-start justify-between mb-3 sm:mb-4">
                    {/* GIF Icon with ChromaGrid style - Mobile Size */}
                    <div className="relative">
                      <div className={`gif-container inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-black/20 backdrop-blur-sm border border-white/10 overflow-hidden transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-3`}
                        style={{
                          boxShadow: `0 8px 32px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)`
                        }}>
                        {/* GIF with fallback */}
                        <div className="relative w-full h-full">
                          <img
                            src={`/card_benefits/${index + 1}.gif`}
                            alt={ventaja.title}
                            className="w-full h-full object-cover absolute inset-0 loaded"
                            style={{
                              minHeight: '48px',
                              minWidth: '48px'
                            }}
                            onLoad={(e) => {
                              console.log(`GIF ${index + 1} loaded successfully from:`, e.currentTarget.src);
                            }}
                            onError={(e) => {
                              console.error(`Failed to load GIF ${index + 1} from:`, e.currentTarget.src);
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                          {/* Icon overlay - visible on card hover */}
                          <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-xl">
                            <IconComponent className="w-6 h-6 sm:w-8 sm:h-8 text-white drop-shadow-lg" />
                          </div>
                        </div>
                      </div>

                      {/* ChromaGrid-style particles */}
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-white/30 rounded-full opacity-0 group-hover:opacity-100 animate-pulse transition-all duration-700"></div>
                      <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 animate-ping transition-all duration-700 delay-300"></div>
                    </div>

                    {/* Title - Mobile Optimized */}
                    <div className="flex-1 ml-3 sm:ml-4 text-center">
                      <h3 className="text-sm sm:text-base font-bold text-white leading-tight group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-200 group-hover:bg-clip-text transition-all duration-500">
                        {ventaja.title}
                      </h3>
                    </div>
                  </div>

                  {/* Main Content - Mobile Optimized */}
                  <div className="flex-grow">
                    {/* Description with ChromaGrid style - Mobile Text Size */}
                    <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 group-hover:text-gray-200 transition-colors duration-300">
                      {ventaja.description}
                    </p>
                  </div>

                  {/* Footer Section - Mobile Responsive */}
                  <div className="space-y-2 sm:space-y-3">
                    {/* Benefit with ChromaGrid card style - Mobile Optimized */}
                    {ventaja.benefit && (
                      <div className="p-2 sm:p-3 rounded-lg bg-black/20 backdrop-blur-sm border border-white/10 group-hover:border-white/20 transition-all duration-500">
                        <div className="flex items-center">
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full mr-2 sm:mr-3 animate-pulse"></div>
                          <p className="text-[10px] sm:text-xs font-semibold text-green-400 group-hover:text-green-300 transition-colors duration-300">
                            {ventaja.benefit}
                          </p>
                        </div>
                        {ventaja.source && (
                          <p className="text-[9px] sm:text-xs text-gray-400 ml-4 sm:ml-5 mt-1 group-hover:text-gray-300 transition-colors duration-300">
                            — {ventaja.source}
                          </p>
                        )}
                      </div>
                    )}

                    {/* Metric with ChromaGrid style - Mobile Optimized */}
                    {ventaja.metric && (
                      <div className="pt-2 sm:pt-3 border-t border-white/10 group-hover:border-white/20 transition-colors duration-500">
                        <div className="flex items-center">
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-400 rounded-full mr-2 sm:mr-3 animate-pulse delay-1000"></div>
                          <p className="text-[10px] sm:text-xs font-semibold text-blue-300 group-hover:text-blue-200 transition-colors duration-300">
                            {ventaja.metric}
                          </p>
                        </div>
                        {ventaja.metricSource && (
                          <p className="text-[9px] sm:text-xs text-gray-400 ml-4 sm:ml-5 mt-1 group-hover:text-gray-300 transition-colors duration-300">
                            — {ventaja.metricSource}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* ChromaGrid-style border effect */}
                <div className="absolute inset-0 rounded-[20px] border border-gray-600/30 group-hover:border-gray-500/50 transition-all duration-700"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
});
VentajasSection.displayName = 'VentajasSection';

// Create a memoized historia section component
const HistoriaSection = memo(() => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedElements, setAnimatedElements] = useState<number[]>([]);
  const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(null);
  const [isCardAreaHovered, setIsCardAreaHovered] = useState(false);

  // Mouse tracking for ChromaGrid-style spotlight effect
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    card.style.setProperty('--mouse-x', `${x}%`);
    card.style.setProperty('--mouse-y', `${y}%`);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);

          // Animate elements sequentially
          [0, 1].forEach((index) => {
            setTimeout(() => {
              setAnimatedElements(prev => [...prev, index]);
            }, index * 200);
          });

          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    const section = document.getElementById('historia');
    if (section) {
      observer.observe(section);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  // Card flipping logic
  const getFlipped = (index: number) => {
    if (!isCardAreaHovered) return false;
    return hoveredCardIndex === index;
  };

  return (
    <section
      id="historia"
      className="min-h-screen py-8 sm:py-24 md:py-32 px-4 sm:px-5 relative overflow-hidden flex flex-col justify-center items-center sm:block"
      style={{ willChange: 'auto' }}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-black"></div>
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Team Section */}
        <div className={`mb-12 sm:mb-20 transition-all duration-1000 delay-300 ${animatedElements.includes(0)
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-20'
          }`}>
          <div className="relative">
            {/* Desktop Fade-in text for Mauricio (left) */}
            <div
              className={`hidden lg:block absolute left-full top-1/2 -translate-y-1/2 ml-0 -translate-x-[14.5rem] text-left transition-opacity duration-500 ${getFlipped(1) ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
              style={{ minWidth: 'max-content' }}>
              <span className="font-bold text-white text-lg">Andrea Rodriguez Jerez</span><br />
              <span className="text-gray-300 text-sm">Industrial designer, UI/UX and branding.</span>
            </div>
            {/* Desktop Fade-in text for Andrea (right) */}
            <div
              className={`hidden lg:block absolute right-full top-1/2 -translate-y-1/2 mr-0 translate-x-[14.5rem] text-right transition-opacity duration-500 ${getFlipped(0) ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
              style={{ minWidth: 'max-content' }}>
              <span className="font-bold text-white text-lg">Mauricio Perucho Sequeda</span><br />
              <span className="text-gray-300 text-sm">Generative AI, data science and engineering.</span>
            </div>

            {/* Cards Container - Optimized for Small Mobile Screens */}
            <div
              className="grid grid-cols-2 lg:grid-cols-2 gap-3 sm:gap-6 lg:gap-8 max-w-[340px] sm:max-w-md lg:max-w-3xl mx-auto px-2 sm:px-4 lg:px-0"
              onMouseEnter={() => setIsCardAreaHovered(true)}
              onMouseLeave={() => { setIsCardAreaHovered(false); setHoveredCardIndex(null); }}
            >
              {/* Mauricio Card - Optimized for iPhone 13 mini dimensions */}
              <div
                className="group relative h-[240px] sm:h-[280px] lg:h-[600px] cursor-pointer"
                onMouseMove={handleMouseMove}
                style={{ perspective: '1000px' }}
                onMouseEnter={() => setHoveredCardIndex(0)}
                onMouseLeave={() => setHoveredCardIndex(null)}
              >
                <div
                  className="relative w-full h-full"
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: getFlipped(0) ? 'rotateY(180deg)' : 'rotateY(0deg)',
                    transition: 'transform 0.7s ease-in-out'
                  }}
                >
                  {/* Front Side */}
                  <div className="absolute inset-0"
                    style={{
                      willChange: 'transform, opacity',
                      '--mouse-x': '50%',
                      '--mouse-y': '50%',
                      '--spotlight-color': 'rgba(255, 255, 255, 0.15)',
                      border: '1px solid rgba(75, 85, 99, 0.3)',
                      background: 'white',
                      borderRadius: '0px',
                      backfaceVisibility: 'hidden'
                    } as React.CSSProperties}>
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"
                      style={{
                        background: `radial-gradient(circle at var(--mouse-x) var(--mouse-y), var(--spotlight-color), transparent 70%)`
                      }}
                    ></div>
                    <div className="relative z-20 w-full h-full flex items-center justify-center">
                      <div
                        className="w-full h-full"
                        style={{
                          background: `url('/m.png') center/cover, url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.15'/%3E%3C/svg%3E")`,
                          backgroundBlendMode: 'overlay'
                        }}
                      />
                    </div>
                  </div>
                  {/* Back Side */}
                  <div className="absolute inset-0 bg-white border border-gray-300 flex items-center justify-center"
                    style={{
                      borderRadius: '0px',
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)'
                    }}>
                    <div className="text-4xl sm:text-6xl lg:text-8xl font-bold text-gray-800">1</div>
                  </div>
                </div>
              </div>

              {/* Andrea Card - Optimized for iPhone 13 mini dimensions */}
              <div
                className="group relative h-[240px] sm:h-[280px] lg:h-[600px] cursor-pointer"
                onMouseMove={handleMouseMove}
                style={{ perspective: '1000px' }}
                onMouseEnter={() => setHoveredCardIndex(1)}
                onMouseLeave={() => setHoveredCardIndex(null)}
              >
                <div
                  className="relative w-full h-full"
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: getFlipped(1) ? 'rotateY(180deg)' : 'rotateY(0deg)',
                    transition: 'transform 0.7s ease-in-out'
                  }}
                >
                  {/* Front Side */}
                  <div className="absolute inset-0"
                    style={{
                      willChange: 'transform, opacity',
                      '--mouse-x': '50%',
                      '--mouse-y': '50%',
                      '--spotlight-color': 'rgba(255, 255, 255, 0.15)',
                      border: '1px solid rgba(75, 85, 99, 0.3)',
                      background: 'white',
                      borderRadius: '0px',
                      backfaceVisibility: 'hidden'
                    } as React.CSSProperties}>
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"
                      style={{
                        background: `radial-gradient(circle at var(--mouse-x) var(--mouse-y), var(--spotlight-color), transparent 70%)`
                      }}
                    ></div>
                    <div className="relative z-20 w-full h-full flex items-center justify-center">
                      <div
                        className="w-full h-full"
                        style={{
                          background: `url('/a.png') center/cover, url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.15'/%3E%3C/svg%3E")`,
                          backgroundBlendMode: 'overlay'
                        }}
                      />
                    </div>
                  </div>
                  {/* Back Side */}
                  <div className="absolute inset-0 bg-white border border-gray-300 flex items-center justify-center"
                    style={{
                      borderRadius: '0px',
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)'
                    }}>
                    <div className="text-4xl sm:text-6xl lg:text-8xl font-bold text-gray-800">2</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Text Labels - Compact Design for Small Screens */}
            <div className="lg:hidden mt-4 sm:mt-6 px-2 sm:px-4 text-center">
              <div className="grid grid-cols-2 gap-3 max-w-[340px] sm:max-w-md mx-auto">
                <div className="p-2 sm:p-3 bg-gray-900/30 rounded border border-gray-700/50">
                  <span className="font-bold text-white text-xs sm:text-sm block leading-tight">Mauricio Perucho</span>
                  <span className="text-gray-300 text-[10px] sm:text-xs leading-tight">AI & Engineering</span>
                </div>
                <div className="p-2 sm:p-3 bg-gray-900/30 rounded border border-gray-700/50">
                  <span className="font-bold text-white text-xs sm:text-sm block leading-tight">Andrea Rodriguez</span>
                  <span className="text-gray-300 text-[10px] sm:text-xs leading-tight">Design & Branding</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* CTA Section - Mobile Optimized */}
        <div className={`text-center px-4 transition-all duration-1000 delay-500 ${animatedElements.includes(1)
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-20'
          }`}>
          <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6 leading-tight">
            Somos el equipo que tu competencia teme que contrates.
          </h3>
        </div>
      </div>
    </section>
  );
});
HistoriaSection.displayName = 'HistoriaSection';

function LandingPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showChroma, setShowChroma] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile(); // Check initial size
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Memoize services chunks to prevent recalculation
  const servicesChunks = useMemo(() => {
    const chunkSize = Math.ceil(services.length / 4);
    return {
      services1: services.slice(0, chunkSize),
      services2: services.slice(chunkSize, chunkSize * 2),
      services3: services.slice(chunkSize * 2, chunkSize * 3),
      services4: services.slice(chunkSize * 3),
    };
  }, []);

  // Simple and effective scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.querySelector(item.href)).filter(Boolean) as Element[];
      const scrollPosition = window.scrollY + 200; // Offset for header

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const sectionTop = section.getBoundingClientRect().top + window.scrollY;

        if (scrollPosition >= sectionTop) {
          if (i !== activeIndex) {
            setActiveIndex(i);
          }
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeIndex]);

  // Spline model is always visible - scroll visibility control disabled

  // Intersection Observer for ChromaGrid (servicios)
  useEffect(() => {
    const serviciosSection = document.getElementById('servicios');
    if (!serviciosSection) return;
    const handler = (entries: IntersectionObserverEntry[]) => {
      setShowChroma(entries[0].isIntersecting || entries[0].intersectionRatio > 0 || entries[0].boundingClientRect.top < 300);
    };
    const observer = new window.IntersectionObserver(handler, {
      root: null,
      threshold: 0.01,
      rootMargin: '300px 0px 300px 0px',
    });
    observer.observe(serviciosSection);
    return () => observer.disconnect();
  }, []);

  // Memoized scroll to section function
  const scrollToSection = useCallback((href: string, index: number) => {
    const element = document.querySelector(href);
    if (element) {
      const headerHeight = document.querySelector('header')?.offsetHeight || 0;
      const isMobileDevice = window.innerWidth < 768;
      const extraMargin = isMobileDevice ? 60 : 120; // Much less margin on mobile
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight + extraMargin;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setActiveIndex(index);
    }
  }, []);

  return (
    <div className="bg-black text-white font-sans">
      <OptimizedFonts />
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-transparent py-3 md:py-6">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          {/* Desktop Navigation */}
          <div className="hidden md:flex justify-center">
            <nav className="flex items-center justify-center">
              {/* Apple-style Tab Bar - Center with Brand */}
              <div className="apple-tab-bar px-6 py-3 flex items-center space-x-52">
                {/* Brand Logo - Left Side of Tab Bar */}
                <div className="flex items-center group cursor-pointer">
                  <div className="text-center">
                    <h1 className="brand-logo text-xl font-bold tracking-tight">
                      art_ificial
                    </h1>
                  </div>
                </div>
                {/* Navigation Items */}
                <div className="flex items-center space-x-1">
                  {navItems.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => scrollToSection(item.href, index)}
                      className={`apple-tab-item px-4 py-2 text-sm font-medium transition-all duration-300 ${activeIndex === index
                          ? 'active text-white'
                          : 'text-gray-300 hover:text-white'
                        }`}
                    >
                      <span className="relative z-10">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </nav>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center justify-between">
            {/* Mobile Brand Logo */}
            <div className="flex items-center group cursor-pointer">
              <div className="text-left">
                <h1 className="brand-logo text-xl font-bold tracking-tight">
                  art_ificial
                </h1>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="relative w-8 h-8 flex flex-col items-center justify-center space-y-1.5 transition-all duration-300"
              aria-label="Toggle menu"
            >
              <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                }`}></span>
              <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''
                }`}></span>
              <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                }`}></span>
            </button>
          </div>

          {/* Mobile Menu Overlay */}
          <div className={`md:hidden fixed inset-0 z-40 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
            }`}>
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/90 backdrop-blur-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            ></div>

            {/* Menu Content */}
            <div className={`relative flex flex-col items-center justify-center h-full transition-all duration-500 ${isMobileMenuOpen ? 'translate-y-0' : '-translate-y-10'
              }`}>
              <nav className="flex flex-col items-center space-y-8">
                {navItems.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      scrollToSection(item.href, index);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`text-2xl font-semibold transition-all duration-300 hover:scale-110 ${activeIndex === index
                        ? 'text-white'
                        : 'text-gray-300 hover:text-white'
                      }`}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>

              {/* Mobile menu decoration */}
              <div className="absolute bottom-20 text-center">
                <p className="text-sm text-gray-400">
                  Toca en cualquier lugar para cerrar
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>
      <HeroSection key="hero-section-persistent" isInicioActive={activeIndex === 0} />
      <ServicesSection {...servicesChunks} isServiciosActive={activeIndex === 1} showChroma={showChroma} />
      <VentajasSection />
      <HistoriaSection />
    </div>
  )
}

export default LandingPage;
