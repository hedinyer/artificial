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
import { Sparkles, Zap, DollarSign, TrendingUp, Palette, Bot, Shield, FileText, Users, Receipt, Factory, Workflow } from "lucide-react";
import Beams from "./components/Beams";
import OptimizedFonts from "./components/OptimizedFonts";
import "@/components/ui/chroma-grid/ChromaGrid.css";
import "./components/AnimatedShadows.css";
import "./components/OptimizedMedia.css";
import OptimizedGif from "./components/OptimizedGif";
import useGifPreloader, { getGifLoadingAttrs } from "./hooks/useGifPreloader";
import LightRays from "./components/LightRays";

// Simple components without optimization
const MemoizedBeams = memo(Beams);

// GIF paths for preloading optimization
const criticalGifs = [
  "/1.png",
  "/gifs/uiux.gif",
];

const secondaryGifs = [
  "/gifs/branding.gif",
  "/gifs/inteligencia.gif",
  "/gifs/marketing.gif",
  "/gifs/consultaria.gif",
];

const benefitGifs = [
  "/card_benefits/1.gif",
  "/card_benefits/2.gif",
  "/card_benefits/3.gif",
  "/card_benefits/4.gif",
  "/card_benefits/5.gif",
  "/card_benefits/6.gif",
];

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
    title: "Automatización de Procesos IA",
    subtitle: "Empleados virtuales que trabajan mejor",
    borderColor: "#10B981",
    gradient: "linear-gradient(180deg, #10B981, #000)",
    url: "#"
  },
  {
    image: "/1.png",
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

// Services data with stable reference - Premium professional industries
const services = [
  { text: "Manufactura Inteligente", className: "font-oswald" },
  { text: "Centros Médicos Especializados", className: "font-playfair" },
  { text: "Clínicas de Estética Avanzada", className: "font-lato" },
  { text: "Consultorios Odontológicos Premium", className: "font-montserrat" },
  { text: "Spas & Wellness Centers", className: "font-roboto" },
  { text: "Estudios Jurídicos", className: "font-oswald" },
  { text: "Empresas de Ingeniería", className: "font-playfair" },
  { text: "Clínicas Veterinarias", className: "font-lato" },
  { text: "Retail & Fashion", className: "font-montserrat" },
  { text: "E-commerce & Marketplaces", className: "font-roboto" },
  { text: "Salones de Belleza Premium", className: "font-oswald" },
  { text: "Centros de Salud Visual", className: "font-playfair" },
  { text: "Boutiques & Concept Stores", className: "font-lato" },
  { text: "Farmacias & Salud", className: "font-montserrat" },
  { text: "Restaurantes & Hospitality", className: "font-roboto" },
  { text: "Gimnasios & Fitness", className: "font-oswald" },
  { text: "Inmobiliarias", className: "font-playfair" },
  { text: "Educación & Capacitación", className: "font-lato" },
  { text: "Startups & Scale-ups", className: "font-montserrat" },
];

// Navigation items with stable reference
const navItems = [
  { label: "Inicio", href: "#inicio" },
  { label: "Servicios", href: "#servicios" },
  { label: "Ventajas", href: "#ventajas" },
  { label: "Hablemos", href: "#historia" },
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
    description: "Elimina el 80% del trabajo manual. Sistemas que trabajan 24/7 y multiplican tus márgenes sin aumentar nómina.",
    benefits: [
      "Ahorra 40 horas semanales",
      "Automatización sin descanso",
      "ROI desde el primer mes"
    ],
    ctaText: "Ver ahorro $50K/año",
    featured: true
  },
  {
    ...chromaItems[1], // Automatización de Procesos IA
    description: "Reemplaza empleados con IA que trabaja 24/7. Cuesta 90% menos y procesa 10x más rápido.",
    benefits: ["Reduce nómina 70%", "Trabajo 365 días", "99.9% precisión"],
    ctaText: "Calcular ahorro"
  },
  {
    ...chromaItems[0], // Branding Estratégico
    description: "Marca que vende sola. Identidad visual que convierte visitantes en clientes leales.",
    benefits: ["Reconocimiento 3x", "Confianza instantánea", "Diferénciate"],
    ctaText: "Ver casos"
  },
  {
    ...chromaItems[3], // Inteligencia de Datos
    description: "Tus datos revelan dónde está el dinero. Dashboards que muestran cómo duplicar ventas.",
    benefits: ["Oportunidades ocultas", "Predice tendencias", "ROI medible"],
    ctaText: "Descubrir"
  },
  {
    ...chromaItems[5], // Consultoría Digital
    description: "Transforma tu negocio en 90 días. Estrategia probada + implementación = resultados garantizados.",
    benefits: ["Plan paso a paso", "Implementación guiada", "Resultados garantizados"],
    ctaText: "Estrategia gratis"
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
      className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:mt-0 pt-4 pb-20"
    >
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
        <div>
          <p className="text-sm font-medium text-white/50 mb-2">Lo que ofrecemos</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tighter text-white">
            Más ganancias con menos equipo
          </h2>
          <p className="mt-3 text-base text-white/70 max-w-2xl">
            Diseñamos sistemas que automatizan el trabajo repetitivo, reducen la necesidad de más personal y te dejan libre para enfocarte en hacer crecer el negocio.
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid gap-3 md:grid-cols-3">
        {/* Featured Service - Large Card */}
        <div className="group relative overflow-hidden rounded-md border border-white/10 bg-white/5 md:col-span-2 hover:border-white/20 transition-all duration-300">
          <div className="relative">
            <OptimizedGif
              src={featuredService.image}
              alt={featuredService.title}
              className="aspect-[5/2] w-full"
              priority={true}
              objectFit="cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
          </div>
          <div className="p-2 sm:p-2.5">
            <div className="flex items-center gap-1 mb-0.5">
              <span className="inline-flex items-center gap-0.5 rounded-full border border-emerald-500/30 bg-emerald-500/15 px-1 py-0.5 text-[8px] font-medium text-emerald-300">
                MENOS CARGA OPERATIVA
              </span>
              <span className="text-[8px] text-white/60">Más ingresos sin contratar más</span>
            </div>
            <h3 className="mt-0.5 text-base sm:text-lg font-medium tracking-tight text-white">
              {featuredService.title}
            </h3>
            <p className="mt-0.5 text-[10px] sm:text-[11px] text-white/70 leading-snug line-clamp-2">
              {featuredService.description}
            </p>
            <div className="mt-1.5 flex flex-wrap items-center gap-1">
              <a
                href="https://wa.me/573171053785"
                className="inline-flex items-center gap-0.5 text-[10px] font-medium text-black bg-emerald-500 rounded px-2 py-0.5 hover:bg-emerald-400 transition-all duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  className="h-2.5 w-2.5">
                  <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"></path>
                  <path d="m21.854 2.147-10.94 10.939"></path>
                </svg>
                {featuredService.ctaText}
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
                <OptimizedGif
                  src={service.image}
                  alt={service.title}
                  className="aspect-[4/3] w-full"
                  priority={index < 2}
                  objectFit="cover"
                />
              </div>
              <a
                href="https://wa.me/573171053785"
                className="mt-2.5 inline-flex items-center justify-center gap-1 rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-medium text-white/90 backdrop-blur hover:bg-white/10 hover:text-white transition-all duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                {service.ctaText}
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

      {/* Industries Marquee - Premium Design */}
      <div className="w-full text-center mt-16 sm:mt-20">
        <div className="mb-6 sm:mb-8">
          <p className="text-xs sm:text-sm font-medium text-white/50 mb-2 tracking-wider uppercase">
            Confían en nosotros
          </p>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-white">
            Líderes de múltiples industrias
          </h3>
          <p className="mt-3 text-sm sm:text-base text-white/60 max-w-2xl mx-auto">
            Transformamos negocios de todos los sectores con tecnología de vanguardia
          </p>
        </div>
        <div
          className="relative h-36 sm:h-44 md:h-52 [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)]"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full flex flex-col gap-y-4 sm:gap-y-5 md:gap-y-7">
              <ScrollVelocity
                texts={firstHalf}
                velocity={-20}
                singleLine={true}
                className="text-lg sm:text-2xl md:text-3xl lg:text-4xl text-white/90 font-medium tracking-wide"
              />
              <ScrollVelocity
                texts={secondHalf}
                velocity={20}
                singleLine={true}
                className="text-lg sm:text-2xl md:text-3xl lg:text-4xl text-white/90 font-medium tracking-wide"
              />
            </div>
          </div>
          {/* Gradient overlays for premium effect */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black via-transparent to-transparent"></div>
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black via-transparent to-transparent"></div>
          </div>
        </div>
      </div>
    </section>
  );
});
ServicesSection.displayName = 'ServicesSection';

// AI Demo data for animated carousel
const aiDemos = [
  {
    id: 'automation',
    title: 'Automatización de Procesos',
    description: 'Flujos inteligentes que trabajan 24/7',
    icon: Workflow,
    color: '#3B82F6',
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'documents',
    title: 'Procesamiento de Documentos',
    description: 'Extracción y análisis automático con IA',
    icon: FileText,
    color: '#10B981',
    gradient: 'from-emerald-500 to-teal-500'
  },
  {
    id: 'customers',
    title: 'Gestión de Clientes',
    description: 'CRM potenciado con inteligencia artificial',
    icon: Users,
    color: '#8B5CF6',
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    id: 'invoices',
    title: 'Procesamiento de Facturas',
    description: 'Automatiza tu facturación completamente',
    icon: Receipt,
    color: '#F59E0B',
    gradient: 'from-amber-500 to-orange-500'
  },
  {
    id: 'production',
    title: 'Automatización de Producción',
    description: 'Control y optimización en tiempo real',
    icon: Factory,
    color: '#EF4444',
    gradient: 'from-red-500 to-rose-500'
  }
];

// Helper function to get demo metadata for editorial headers
const getDemoMetadata = (demoId: string) => {
  const metadata: Record<string, { label: string; shortTitle: string; colorClass: string }> = {
    automation: {
      label: 'Automatización · Flujo Continuo',
      shortTitle: 'Automatización de procesos',
      colorClass: 'blue'
    },
    documents: {
      label: 'Documento · Flujo Inteligente',
      shortTitle: 'Procesamiento de documentos',
      colorClass: 'emerald'
    },
    customers: {
      label: 'Cliente · CRM Inteligente',
      shortTitle: 'Gestión de clientes',
      colorClass: 'purple'
    },
    invoices: {
      label: 'Facturación · Proceso Automático',
      shortTitle: 'Procesamiento de facturas',
      colorClass: 'amber'
    },
    production: {
      label: 'Producción · Control en Tiempo Real',
      shortTitle: 'Automatización de producción',
      colorClass: 'red'
    }
  };
  return metadata[demoId] || metadata.automation;
};

// Helper to get color values for gradients and shadows
const getColorValues = (color: string) => {
  const colors: Record<string, { 
    accent: string; 
    light: string; 
    shadow: string; 
    border: string;
    textLabel: string;
  }> = {
    '#3B82F6': { // blue
      accent: 'rgba(59, 130, 246, 0.9)',
      light: 'rgba(96, 165, 250, 0.18)',
      shadow: 'rgba(59, 130, 246, 0.8)',
      border: 'rgba(96, 165, 250, 0.25)',
      textLabel: 'rgba(191, 219, 254, 0.8)' // blue-200/80
    },
    '#10B981': { // emerald
      accent: 'rgba(16, 185, 129, 0.9)',
      light: 'rgba(52, 211, 153, 0.18)',
      shadow: 'rgba(16, 185, 129, 0.8)',
      border: 'rgba(52, 211, 153, 0.25)',
      textLabel: 'rgba(167, 243, 208, 0.8)' // emerald-200/80
    },
    '#8B5CF6': { // purple
      accent: 'rgba(139, 92, 246, 0.9)',
      light: 'rgba(167, 139, 250, 0.18)',
      shadow: 'rgba(139, 92, 246, 0.8)',
      border: 'rgba(167, 139, 250, 0.25)',
      textLabel: 'rgba(221, 214, 254, 0.8)' // purple-200/80
    },
    '#F59E0B': { // amber
      accent: 'rgba(245, 158, 11, 0.9)',
      light: 'rgba(251, 191, 36, 0.18)',
      shadow: 'rgba(245, 158, 11, 0.8)',
      border: 'rgba(251, 191, 36, 0.25)',
      textLabel: 'rgba(253, 230, 138, 0.8)' // amber-200/80
    },
    '#EF4444': { // red
      accent: 'rgba(239, 68, 68, 0.9)',
      light: 'rgba(248, 113, 113, 0.18)',
      shadow: 'rgba(239, 68, 68, 0.8)',
      border: 'rgba(248, 113, 113, 0.25)',
      textLabel: 'rgba(254, 202, 202, 0.8)' // red-200/80
    }
  };
  return colors[color] || colors['#3B82F6'];
};

// AI Demo Carousel Component
const AIDemoCarousel = memo(() => {
  const [activeDemo, setActiveDemo] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Auto-rotate demos
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setActiveDemo((prev) => (prev + 1) % aiDemos.length);
        setIsAnimating(false);
      }, 300);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const currentDemo = aiDemos[activeDemo];
  const IconComponent = currentDemo.icon;
  const metadata = getDemoMetadata(currentDemo.id);
  const colorValues = getColorValues(currentDemo.color);

  return (
    <div className="h-[600px] flex flex-col">
      {/* Demo Header - Editorial style for all demos */}
      <div
        className="
          mb-3 flex items-center justify-between gap-4
          px-4 py-2.5
          relative
          overflow-hidden
        "
        style={{
          borderBottom: `1px solid ${colorValues.border}`,
          background: `radial-gradient(circle at top left, ${colorValues.light}, transparent 55%), radial-gradient(circle at bottom right, ${currentDemo.color}1A, transparent 60%)`
        }}
      >
        {/* Left accent bar + label */}
        <div className="flex items-center gap-3">
          <span 
            className="h-8 w-[3px] rounded-full"
            style={{ 
              backgroundColor: colorValues.accent,
              boxShadow: `0 0 20px ${colorValues.shadow}`
            }}
          />
          <div className="flex flex-col leading-tight">
            <span 
              className="text-[10px] tracking-[0.22em] uppercase"
              style={{ color: colorValues.textLabel }}
            >
              {metadata.label}
            </span>
            <span className="text-xs font-semibold tracking-wide text-white">
              {metadata.shortTitle}
            </span>
          </div>
        </div>

        {/* Right pill with subtle stats / descriptor */}
        <div
          className="
            hidden sm:flex items-center gap-3
            rounded-full border border-white/8 bg-black/30
            px-3 py-1.5
            text-[10px] tracking-wide text-white/90
            backdrop-blur-md
          "
        >
          <span 
            className="inline-flex h-1.5 w-1.5 rounded-full"
            style={{ 
              backgroundColor: colorValues.accent,
              boxShadow: `0 0 10px ${colorValues.shadow}`
            }}
          />
          <span>{currentDemo.description}</span>
        </div>

        {/* Soft corner highlight */}
        <div 
          className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l to-transparent"
          style={{
            background: `linear-gradient(to left, ${colorValues.accent.replace('0.9', '0.08')}, transparent)`
          }}
        />
      </div>

      {/* Demo Interface */}
      <div 
        className={`flex-1 bg-gradient-to-br from-white/[0.08] to-white/[0.02] rounded-xl border border-white/10 overflow-hidden relative transition-all duration-300 ${
          isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
        }`}
      >
        {/* Demo Title Bar */}
        <div 
          className="flex items-center justify-between px-4 py-3 border-b border-white/10"
          style={{ background: `linear-gradient(90deg, rgba(255, 255, 255, 0.08), transparent)` }}
        >
          <div className="flex items-center gap-2">
            <div 
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: 'rgba(255, 255, 255, 0.1)' }}
            >
              <IconComponent className="w-4 h-4" style={{ color: 'rgba(255, 255, 255, 0.7)' }} />
            </div>
            <div>
              <h4 className="text-sm font-medium text-white">{currentDemo.title}</h4>
              <p className="text-[10px] text-slate-400">{currentDemo.description}</p>
            </div>
          </div>
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-white/40"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-white/40"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-white/40"></span>
          </div>
        </div>

        {/* Demo Content - Different for each type */}
        <div className="p-4 h-full relative overflow-hidden">
          {/* Animated grid background */}
          <div 
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255, 255, 255, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255, 255, 255, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px',
              animation: 'gridMove 20s linear infinite'
            }}
          />
          
          {currentDemo.id === 'automation' && (
            <div className="space-y-2.5 relative z-10 animate-fadeIn">
              {/* Terminal-style header */}
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-white/5">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-white/40"></div>
                  <div className="w-2 h-2 rounded-full bg-white/40"></div>
                  <div className="w-2 h-2 rounded-full bg-white/40"></div>
                </div>
                <div className="flex-1 font-mono text-[9px] text-white/30 ml-2">
                  workflow://automation/main
                </div>
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md border backdrop-blur-sm" style={{ background: 'rgba(255, 255, 255, 0.08)', borderColor: 'rgba(255, 255, 255, 0.15)' }}>
                  <div className="w-1.5 h-1.5 rounded-full bg-white/60 animate-pulse"></div>
                  <span className="text-[9px] font-mono text-white/70">ACTIVE</span>
                </div>
              </div>

              {/* Stats bar */}
              <div className="grid grid-cols-2 gap-2 mb-3">
                <div className="px-2.5 py-1.5 rounded border border-white/5 bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-sm">
                  <div className="text-[8px] uppercase tracking-wider text-white/40 mb-0.5 font-mono">Tasks Today</div>
                  <div className="text-lg font-bold text-white/90 font-mono">12</div>
                </div>
                <div className="px-2.5 py-1.5 rounded border border-white/5 bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-sm">
                  <div className="text-[8px] uppercase tracking-wider text-white/40 mb-0.5 font-mono">Avg Time</div>
                  <div className="text-lg font-bold text-white/80 font-mono">1.8s</div>
                </div>
              </div>

              {/* Workflow steps with terminal aesthetic */}
              {[
                { name: 'Recibir email', status: 'completed', time: '2s', progress: 100 },
                { name: 'Extraer datos', status: 'completed', time: '1.5s', progress: 100 },
                { name: 'Validar información', status: 'running', time: '...', progress: 65 },
                { name: 'Actualizar CRM', status: 'pending', time: '-', progress: 0 },
                { name: 'Enviar notificación', status: 'pending', time: '-', progress: 0 }
              ].map((step, idx) => (
                <div 
                  key={idx} 
                  className="group relative overflow-hidden rounded-md border border-white/5 bg-gradient-to-br from-white/[0.06] to-white/[0.02] hover:border-white/10 transition-all duration-300"
                  style={{
                    boxShadow: step.status === 'running' 
                      ? '0 0 20px rgba(255, 255, 255, 0.08)' 
                      : 'none'
                  }}
                >
                  {/* Progress bar background */}
                  {step.status === 'running' && (
                    <div 
                      className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-transparent via-current to-transparent opacity-30"
                      style={{ 
                        width: `${step.progress}%`,
                        color: currentDemo.color,
                        animation: 'pulse 2s ease-in-out infinite'
                      }}
                    />
                  )}
                  
                  <div className="flex items-center gap-3 p-2.5 relative">
                    {/* Status indicator with custom design */}
                    <div className="relative flex-shrink-0">
                      {step.status === 'completed' ? (
                        <div className="w-5 h-5 rounded border flex items-center justify-center" style={{ borderColor: 'rgba(255, 255, 255, 0.2)', background: 'rgba(255, 255, 255, 0.08)' }}>
                          <svg className="w-2.5 h-2.5 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      ) : step.status === 'running' ? (
                        <div 
                          className="w-5 h-5 rounded border flex items-center justify-center relative"
                          style={{
                            borderColor: 'rgba(255, 255, 255, 0.2)',
                            backgroundColor: 'rgba(255, 255, 255, 0.08)'
                          }}
                        >
                          <div 
                            className="w-2 h-2 rounded-full"
                            style={{
                              backgroundColor: 'rgba(255, 255, 255, 0.6)',
                              boxShadow: '0 0 8px rgba(255, 255, 255, 0.4)',
                              animation: 'pulse 1.5s ease-in-out infinite'
                            }}
                          />
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded border border-white/20 bg-white/5 flex items-center justify-center">
                          <span className="text-[8px] font-mono text-white/30">{String(idx + 1).padStart(2, '0')}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-[11px] font-medium text-white/90 font-mono tracking-tight">
                          {step.name}
                        </span>
                      </div>
                      {step.status === 'running' && (
                        <div className="h-0.5 w-full bg-white/5 rounded-full overflow-hidden">
                          <div 
                            className="h-full rounded-full"
                            style={{
                              width: `${step.progress}%`,
                              background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.2))',
                              animation: 'shimmer 1.5s ease-in-out infinite'
                            }}
                          />
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-shrink-0">
                      <span 
                        className={`text-[9px] font-mono ${
                          step.status === 'completed' ? 'text-white/70' :
                          step.status === 'running' ? 'text-white/60' :
                          'text-white/20'
                        }`}
                      >
                        {step.time}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {currentDemo.id === 'documents' && (
            <div className="space-y-3 relative z-10 animate-fadeIn">
              {/* Terminal header */}
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-white/5">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-white/40"></div>
                  <div className="w-2 h-2 rounded-full bg-white/40"></div>
                  <div className="w-2 h-2 rounded-full bg-white/40"></div>
                </div>
                <div className="flex-1 font-mono text-[9px] text-white/30 ml-2">
                  extract://document/processing
                </div>
                <div className="px-2 py-0.5 rounded-md border backdrop-blur-sm" style={{ background: 'rgba(255, 255, 255, 0.08)', borderColor: 'rgba(255, 255, 255, 0.15)' }}>
                  <span className="text-[9px] font-mono text-white/70">98% ACC</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {/* Document preview with scan effect */}
                <div className="relative p-3 rounded-md border border-white/5 bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-sm overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent animate-scan" 
                       style={{ animation: 'scan 3s ease-in-out infinite' }} />
                  <div className="flex items-center gap-2 mb-3 relative z-10">
                    <div className="w-6 h-6 rounded border flex items-center justify-center" style={{ borderColor: 'rgba(255, 255, 255, 0.15)', background: 'rgba(255, 255, 255, 0.08)' }}>
                      <FileText className="w-3 h-3 text-white/70" />
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-white/90">contrato_2024.pdf</div>
                      <div className="text-[8px] text-white/40 font-mono">2.4 MB · PDF</div>
                    </div>
                  </div>
                  <div className="space-y-1.5 relative z-10">
                    {[1,2,3,4,5].map(i => (
                      <div 
                        key={i} 
                        className={`h-1.5 rounded bg-gradient-to-r from-white/10 to-white/5 ${
                          i === 3 ? 'w-3/4' : i === 5 ? 'w-1/2' : 'w-full'
                        }`}
                        style={{ animationDelay: `${i * 0.1}s` }}
                      />
                    ))}
                  </div>
                </div>
                
                {/* Extracted data with structured layout */}
                <div className="p-3 rounded-md border backdrop-blur-sm" style={{ borderColor: 'rgba(255, 255, 255, 0.15)', background: 'linear-gradient(to bottom right, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.04))' }}>
                  <div className="flex items-center gap-1.5 mb-3">
                    <div className="w-1 h-4 rounded-full bg-white/50"></div>
                    <span className="text-[9px] uppercase tracking-wider text-white/60 font-mono">Extracted Data</span>
                  </div>
                  <div className="space-y-2">
                    {[
                      { label: 'Cliente', value: 'Empresa ABC', icon: '👤' },
                      { label: 'Monto', value: '$45,000', icon: '💰' },
                      { label: 'Fecha', value: '15/12/2024', icon: '📅' },
                      { label: 'Tipo', value: 'Servicios', icon: '📋' }
                    ].map((item, idx) => (
                      <div 
                        key={idx} 
                        className="flex items-center justify-between p-1.5 rounded border bg-white/5 hover:bg-white/10 transition-colors"
                        style={{ 
                          animationDelay: `${idx * 0.1}s`,
                          borderColor: 'rgba(255, 255, 255, 0.08)'
                        }}
                      >
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px]">{item.icon}</span>
                          <span className="text-[9px] text-white/50 font-mono uppercase">{item.label}</span>
                        </div>
                        <span className="text-[10px] font-mono text-white/80 font-semibold">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 p-2 rounded-md border backdrop-blur-sm" style={{ borderColor: 'rgba(255, 255, 255, 0.15)', background: 'linear-gradient(to right, rgba(255, 255, 255, 0.08), transparent)' }}>
                <div className="w-1.5 h-1.5 rounded-full bg-white/60 animate-pulse"></div>
                <span className="text-[9px] font-mono text-white/70">98% precisión · OCR + NLP</span>
              </div>
            </div>
          )}

          {currentDemo.id === 'customers' && (
            <div className="space-y-2.5 relative z-10 animate-fadeIn">
              {/* Terminal header */}
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-white/5">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-white/40"></div>
                  <div className="w-2 h-2 rounded-full bg-white/40"></div>
                  <div className="w-2 h-2 rounded-full bg-white/40"></div>
                </div>
                <div className="flex-1 font-mono text-[9px] text-white/30 ml-2">
                  crm://portfolio/ai-prioritized
                </div>
                <div className="flex items-center gap-2">
                  <div className="px-2 py-0.5 rounded-md border backdrop-blur-sm" style={{ background: 'rgba(255, 255, 255, 0.08)', borderColor: 'rgba(255, 255, 255, 0.15)' }}>
                    <span className="text-[9px] font-mono text-white/70">47 ACTIVE</span>
                  </div>
                  <div className="px-2 py-0.5 rounded-md border backdrop-blur-sm" style={{ background: 'rgba(255, 255, 255, 0.08)', borderColor: 'rgba(255, 255, 255, 0.15)' }}>
                    <span className="text-[9px] font-mono text-white/70">12 FOCUS</span>
                  </div>
                </div>
              </div>

              {/* Client cards with enhanced design */}
              {[
                { name: 'María García', status: 'hot', score: 92, action: 'Llamar hoy', priority: 'HIGH' },
                { name: 'Carlos López', status: 'warm', score: 78, action: 'Enviar propuesta', priority: 'MED' },
                { name: 'Ana Martínez', status: 'cold', score: 45, action: 'Nurturing', priority: 'LOW' }
              ].map((client, idx) => {
                const statusColors = {
                  hot: { 
                    bgFrom: 'rgba(255, 255, 255, 0.12)', 
                    bgTo: 'rgba(255, 255, 255, 0.06)', 
                    border: 'rgba(255, 255, 255, 0.2)', 
                    text: 'rgba(255, 255, 255, 0.8)', 
                    bar: 'rgba(255, 255, 255, 0.5)',
                    shadow: 'rgba(255, 255, 255, 0.1)'
                  },
                  warm: { 
                    bgFrom: 'rgba(255, 255, 255, 0.1)', 
                    bgTo: 'rgba(255, 255, 255, 0.05)', 
                    border: 'rgba(255, 255, 255, 0.18)', 
                    text: 'rgba(255, 255, 255, 0.75)', 
                    bar: 'rgba(255, 255, 255, 0.45)',
                    shadow: 'rgba(255, 255, 255, 0.08)'
                  },
                  cold: { 
                    bgFrom: 'rgba(255, 255, 255, 0.08)', 
                    bgTo: 'rgba(255, 255, 255, 0.04)', 
                    border: 'rgba(255, 255, 255, 0.15)', 
                    text: 'rgba(255, 255, 255, 0.7)', 
                    bar: 'rgba(255, 255, 255, 0.4)',
                    shadow: 'rgba(255, 255, 255, 0.06)'
                  }
                };
                const colors = statusColors[client.status as keyof typeof statusColors];
                
                return (
                  <div 
                    key={idx} 
                    className="group relative overflow-hidden rounded-md border hover:border-opacity-50 transition-all duration-300"
                    style={{
                      borderColor: colors.border,
                      background: `linear-gradient(to bottom right, ${colors.bgFrom}, ${colors.bgTo})`,
                      boxShadow: `0 0 20px ${colors.shadow}`
                    }}
                  >
                    <div className="flex items-center gap-3 p-2.5 relative">
                      {/* Avatar with status indicator */}
                      <div className="relative flex-shrink-0">
                        <div className="w-9 h-9 rounded-md bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-[11px] font-bold text-white border border-white/20">
                          {client.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div 
                          className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-black" 
                          style={{ backgroundColor: colors.bar }}
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[11px] font-medium text-white/90 font-mono tracking-tight">
                            {client.name}
                          </span>
                          <span 
                            className="text-[7px] px-1 py-0.5 rounded border font-mono uppercase"
                            style={{ 
                              borderColor: colors.border,
                              color: colors.text
                            }}
                          >
                            {client.priority}
                          </span>
                        </div>
                        <div className="text-[9px] text-white/50 font-mono mb-1.5">{client.action}</div>
                        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                          <div 
                            className="h-full rounded-full"
                            style={{ 
                              width: `${client.score}%`,
                              backgroundColor: colors.bar,
                              boxShadow: `0 0 8px ${colors.bar}80`
                            }}
                          />
                        </div>
                      </div>
                      
                      <div className="text-right flex-shrink-0">
                        <div className="text-lg font-bold font-mono" style={{ color: colors.text }}>
                          {client.score}
                        </div>
                        <div className="text-[8px] text-white/40 font-mono uppercase">Score</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {currentDemo.id === 'invoices' && (
            <div className="space-y-2.5 relative z-10 animate-fadeIn">
              {/* Terminal header */}
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-white/5">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-white/40"></div>
                  <div className="w-2 h-2 rounded-full bg-white/40"></div>
                  <div className="w-2 h-2 rounded-full bg-white/40"></div>
                </div>
                <div className="flex-1 font-mono text-[9px] text-white/30 ml-2">
                  invoice://processing/queue
                </div>
                <div className="px-2 py-0.5 rounded-md border backdrop-blur-sm" style={{ background: 'rgba(255, 255, 255, 0.08)', borderColor: 'rgba(255, 255, 255, 0.15)' }}>
                  <span className="text-[9px] font-mono text-white/70">AUTO</span>
                </div>
              </div>

              {/* Stats grid with enhanced design */}
              <div className="grid grid-cols-3 gap-2 mb-3">
                {[
                  { label: 'Pendientes', value: '12', color: { border: 'rgba(255, 255, 255, 0.15)', bgFrom: 'rgba(255, 255, 255, 0.08)', bgTo: 'rgba(255, 255, 255, 0.04)', text: 'rgba(255, 255, 255, 0.8)' }, icon: '⏳' },
                  { label: 'Procesadas', value: '89', color: { border: 'rgba(255, 255, 255, 0.15)', bgFrom: 'rgba(255, 255, 255, 0.08)', bgTo: 'rgba(255, 255, 255, 0.04)', text: 'rgba(255, 255, 255, 0.8)' }, icon: '✓' },
                  { label: 'Errores', value: '2', color: { border: 'rgba(255, 255, 255, 0.15)', bgFrom: 'rgba(255, 255, 255, 0.08)', bgTo: 'rgba(255, 255, 255, 0.04)', text: 'rgba(255, 255, 255, 0.8)' }, icon: '⚠' }
                ].map((stat, idx) => (
                  <div 
                    key={idx} 
                    className="relative overflow-hidden rounded-md border p-2.5 text-center backdrop-blur-sm"
                    style={{
                      borderColor: stat.color.border,
                      background: `linear-gradient(to bottom right, ${stat.color.bgFrom}, ${stat.color.bgTo})`
                    }}
                  >
                    <div className="text-base mb-1">{stat.icon}</div>
                    <div className="text-xl font-bold font-mono mb-0.5" style={{ color: stat.color.text }}>{stat.value}</div>
                    <div className="text-[8px] uppercase tracking-wider text-white/50 font-mono">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Invoice list with terminal aesthetic */}
              {[
                { id: 'FAC-2024-089', client: 'Tech Solutions', amount: '$12,450', status: 'procesando', progress: 75 },
                { id: 'FAC-2024-088', client: 'Digital Corp', amount: '$8,200', status: 'completado', progress: 100 },
                { id: 'FAC-2024-087', client: 'Innovate S.A.', amount: '$15,800', status: 'completado', progress: 100 }
              ].map((invoice, idx) => (
                <div 
                  key={idx} 
                  className="group relative overflow-hidden rounded-md border hover:border-opacity-50 transition-all duration-300"
                  style={{
                    borderColor: 'rgba(255, 255, 255, 0.15)',
                    background: 'linear-gradient(to bottom right, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.04))'
                  }}
                >
                  {invoice.status === 'procesando' && (
                    <div 
                      className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-50"
                      style={{ 
                        width: `${invoice.progress}%`,
                        animation: 'pulse 2s ease-in-out infinite'
                      }}
                    />
                  )}
                  
                  <div className="flex items-center gap-3 p-2.5 relative">
                    <div className="w-8 h-8 rounded border flex items-center justify-center" style={{ borderColor: 'rgba(255, 255, 255, 0.2)', background: 'rgba(255, 255, 255, 0.08)' }}>
                      <Receipt className="w-4 h-4 text-white/70" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-[10px] font-mono text-white/90 tracking-tight">{invoice.id}</span>
                        {invoice.status === 'procesando' && (
                          <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></div>
                        )}
                      </div>
                      <div className="text-[9px] text-white/50 font-mono">{invoice.client}</div>
                      {invoice.status === 'procesando' && (
                        <div className="mt-1.5 h-0.5 w-full bg-white/5 rounded-full overflow-hidden">
                          <div 
                            className="h-full rounded-full bg-amber-500"
                            style={{ width: `${invoice.progress}%` }}
                          />
                        </div>
                      )}
                    </div>
                    
                    <div className="text-right flex-shrink-0">
                      <div className="text-sm font-bold text-white/90 font-mono">{invoice.amount}</div>
                      <span 
                        className="text-[8px] px-1.5 py-0.5 rounded border font-mono uppercase"
                        style={{
                          background: 'rgba(255, 255, 255, 0.08)',
                          borderColor: 'rgba(255, 255, 255, 0.15)',
                          color: 'rgba(255, 255, 255, 0.7)'
                        }}
                      >
                        {invoice.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {currentDemo.id === 'production' && (
            <div className="space-y-2.5 relative z-10 animate-fadeIn">
              {/* Terminal header */}
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-white/5">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-white/40"></div>
                  <div className="w-2 h-2 rounded-full bg-white/40"></div>
                  <div className="w-2 h-2 rounded-full bg-white/40"></div>
                </div>
                <div className="flex-1 font-mono text-[9px] text-white/30 ml-2">
                  production://plant-01/monitor
                </div>
                <div className="flex items-center gap-2">
                  <div className="px-2 py-0.5 rounded-md border backdrop-blur-sm" style={{ background: 'rgba(255, 255, 255, 0.08)', borderColor: 'rgba(255, 255, 255, 0.15)' }}>
                    <span className="text-[9px] font-mono text-white/70">PLANTA 01</span>
                  </div>
                  <div className="px-2 py-0.5 rounded-md border backdrop-blur-sm" style={{ background: 'rgba(255, 255, 255, 0.08)', borderColor: 'rgba(255, 255, 255, 0.15)' }}>
                    <div className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-white/60 animate-pulse"></div>
                      <span className="text-[9px] font-mono text-white/70">ONLINE</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Metrics grid with enhanced design */}
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: 'Eficiencia', value: '94%', icon: '⚡', color: { border: 'rgba(255, 255, 255, 0.15)', bgFrom: 'rgba(255, 255, 255, 0.08)', bgTo: 'rgba(255, 255, 255, 0.04)', text: 'rgba(255, 255, 255, 0.8)' }, trend: '+2.1%' },
                  { label: 'Unidades/h', value: '1,245', icon: '📦', color: { border: 'rgba(255, 255, 255, 0.15)', bgFrom: 'rgba(255, 255, 255, 0.08)', bgTo: 'rgba(255, 255, 255, 0.04)', text: 'rgba(255, 255, 255, 0.8)' }, trend: '+5.3%' },
                  { label: 'Calidad', value: '99.2%', icon: '✓', color: { border: 'rgba(255, 255, 255, 0.15)', bgFrom: 'rgba(255, 255, 255, 0.08)', bgTo: 'rgba(255, 255, 255, 0.04)', text: 'rgba(255, 255, 255, 0.8)' }, trend: '+0.8%' },
                  { label: 'Tiempo act.', value: '18h', icon: '⏱', color: { border: 'rgba(255, 255, 255, 0.15)', bgFrom: 'rgba(255, 255, 255, 0.08)', bgTo: 'rgba(255, 255, 255, 0.04)', text: 'rgba(255, 255, 255, 0.8)' }, trend: '24/7' }
                ].map((metric, idx) => (
                  <div 
                    key={idx} 
                    className="relative overflow-hidden rounded-md border p-2.5 backdrop-blur-sm"
                    style={{
                      borderColor: metric.color.border,
                      background: `linear-gradient(to bottom right, ${metric.color.bgFrom}, ${metric.color.bgTo})`
                    }}
                  >
                    <div className="flex items-start justify-between mb-1.5">
                      <div className="flex items-center gap-1.5">
                        <span className="text-base">{metric.icon}</span>
                        <span className="text-[9px] uppercase tracking-wider text-white/50 font-mono">{metric.label}</span>
                      </div>
                      <span className="text-[8px] font-mono" style={{ color: metric.color.text }}>{metric.trend}</span>
                    </div>
                    <div className="text-xl font-bold font-mono" style={{ color: metric.color.text }}>{metric.value}</div>
                  </div>
                ))}
              </div>

              {/* AI Alert with enhanced design */}
              <div className="relative overflow-hidden rounded-md border backdrop-blur-sm p-2.5" style={{ borderColor: 'rgba(255, 255, 255, 0.2)', background: 'linear-gradient(to right, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.08))' }}>
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 mt-0.5" style={{ borderColor: 'rgba(255, 255, 255, 0.2)', background: 'rgba(255, 255, 255, 0.08)' }}>
                    <span className="text-xs">🤖</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[9px] uppercase tracking-wider text-white/70 font-mono">IA Alert</span>
                      <div className="w-1.5 h-1.5 rounded-full bg-white/60 animate-pulse"></div>
                    </div>
                    <div className="text-[10px] text-white/80 font-mono leading-relaxed">
                      Optimización detectada en Línea 3
                    </div>
                    <div className="text-[9px] text-white/70 font-mono mt-1">
                      → Ahorro estimado: 12% · ROI: +$2.4K/mes
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});
AIDemoCarousel.displayName = 'AIDemoCarousel';

// Create a simple hero section component
const HeroSection = memo(({ isInicioActive }: { isInicioActive: boolean }) => {
  return (
    <section id="inicio" className="relative z-10 min-h-screen flex items-center justify-center">
      {/* Light Rays Background */}
      <div className="absolute inset-0 w-full h-full">
        <LightRays
          raysOrigin="top-center"
          raysColor="#00ffff"
          raysSpeed={1.5}
          lightSpread={0.8}
          rayLength={3.2}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0.1}
          distortion={0.05}
        />
      </div>
      <div className="mx-auto max-w-7xl w-full px-4 py-8 md:px-6 relative z-10 flex items-center justify-center">
        <div className="max-w-3xl w-full text-center mx-auto">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-sky-400/60 bg-white/5 px-3 py-1 text-xs font-medium text-slate-300 shadow-[0_0_40px_rgba(56,189,248,0.4)]">
            <Sparkles className="h-4 w-4 text-sky-400" />
            150+ empresas transformadas
          </p>

          <h1 className="sm:text-5xl md:text-7xl text-4xl font-semibold tracking-tight text-white">
            Multiplica tu productividad con IA y automatización
          </h1>

          <p className="mt-8 sm:mt-5 text-base md:text-lg text-slate-300">
            Del branding al software, convertimos problemas en ventajas. Hacemos que tu competencia se pregunte cómo lo lograste.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row mt-12 sm:mt-8 items-center justify-center">
            <a
              href="https://wa.me/573171053785"
              target="_blank"
              rel="noopener noreferrer"
            >
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
                  Cuentanos tu problema
                  <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </span>
              </button>
            </a>
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
  const [loadedBackgrounds, setLoadedBackgrounds] = useState<Set<number>>(new Set());


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
              <article
                key={index}
                className={`chroma-ventaja-card group relative overflow-hidden rounded-2xl lg:rounded-3xl shadow-xl backdrop-blur-lg transition-all duration-700 transform sm:h-[320px] ${isAnimated
                    ? 'opacity-100 translate-y-0 scale-100'
                    : 'opacity-0 translate-y-20 scale-95'
                  } ${!loadedBackgrounds.has(index) ? 'ventaja-skeleton' : ''}`}
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
                  backgroundColor: loadedBackgrounds.has(index) ? 'transparent' : 'rgb(20, 20, 20)',
                  cursor: 'pointer'
                } as React.CSSProperties}
              >
                {/* GIF Background - Using img element for continuous playback */}
                <img
                  src={`/card_benefits/${index + 1}.gif`}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover z-0"
                  style={{
                    imageRendering: 'auto',
                    pointerEvents: 'none',
                    opacity: loadedBackgrounds.has(index) ? 1 : 0.5
                  }}
                  loading="eager"
                  decoding="async"
                  onLoad={() => {
                    setLoadedBackgrounds(prev => new Set([...prev, index]));
                  }}
                  onError={(e) => {
                    console.error('Error loading GIF:', `/card_benefits/${index + 1}.gif`, e);
                  }}
                />
                {/* Gradient overlay - Less opaque to show GIF */}
                <div 
                  className="absolute inset-0 z-[1] pointer-events-none"
                  style={{
                    background: 'linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.6))'
                  }}
                />

                {/* ChromaGrid-style spotlight effect */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"
                  style={{
                    background: `radial-gradient(circle at var(--mouse-x) var(--mouse-y), var(--spotlight-color), transparent 70%)`,
                    zIndex: 11
                  }}
                ></div>

                {/* Content Container inspired by motion campaign card */}
                <div className="relative z-20 flex flex-col h-full p-4 sm:p-6 lg:p-8 justify-between">
                  {/* Top badges + icon button */}
                  <div className="flex items-start justify-between mb-3 sm:mb-5">
                    <div className="flex flex-wrap gap-1.5">
                      <span className="px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-medium uppercase tracking-wider text-white/90 ring-1 ring-white/30 bg-white/15 backdrop-blur-sm">
                        Automatización IA
                      </span>
                      {ventaja.benefit && (
                        <span className="px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-medium uppercase tracking-wider text-white/90 ring-1 ring-white/30 bg-white/15 backdrop-blur-sm">
                          {ventaja.benefit}
                        </span>
                      )}
                    </div>
                    <button className="p-2 rounded-full bg-black/20 hover:bg-black/30 transition-colors backdrop-blur-sm border border-white/10">
                      <IconComponent className="w-4 h-4 text-white" />
                    </button>
                  </div>

                  {/* Main copy */}
                  <div className="mt-auto">
                    <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-tight mb-1.5">
                      {ventaja.title}
                    </h3>
                    <p className="text-[11px] sm:text-xs leading-relaxed text-white/85 mb-2.5 sm:mb-3">
                      {ventaja.description}
                    </p>

                    {(ventaja.metric || ventaja.source) && (
                      <div className="mt-1.5 flex items-start gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-black/30 border border-white/10 flex items-center justify-center overflow-hidden">
                          <span className="text-[10px] text-white/80 font-medium">
                            {index + 1}
                          </span>
                        </div>
                        <div className="text-[9px] sm:text-[10px]">
                          {ventaja.metric && (
                            <div className="text-white/90 font-medium">
                              {ventaja.metric}
                            </div>
                          )}
                          {ventaja.metricSource && (
                            <div className="text-white/60 mt-0.5">
                              — {ventaja.metricSource}
                            </div>
                          )}
                          {ventaja.source && !ventaja.metricSource && (
                            <div className="text-white/60 mt-0.5">
                              — {ventaja.source}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* ChromaGrid-style border effect */}
                <div className="absolute inset-0 rounded-[20px] border border-gray-600/30 group-hover:border-gray-500/50 transition-all duration-700"></div>
              </article>
            );
          })}
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

                <div className="sm:p-6 p-4 space-y-4">
                  {/* Automation explanation card – placed below the robot */}
                  <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-r from-black/80 via-black/70 to-black/80 backdrop-blur-xl">
                    {/* Card glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-transparent to-cyan-500/10"></div>
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                    
                    <div className="relative p-4 sm:p-5">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                        {/* Text content */}
                        <div className="flex-1 min-w-0">
                          <div className="mb-2 flex items-center gap-3">
                            <span className="text-[10px] tracking-[0.25em] uppercase text-sky-300/80">
                              Automatización continua
                            </span>
                            <span className="hidden sm:inline h-px w-10 bg-sky-500/60" />
                            <span className="hidden sm:inline text-[10px] text-white/40">
                              Operaciones sin fricción
                            </span>
                          </div>
                          <h3 className="text-[1.1rem] sm:text-[1.3rem] leading-tight font-semibold text-white">
                            Software que <span className="font-normal text-sky-300">hace el turno nocturno</span> por tu equipo
                          </h3>
                          <p className="mt-2 text-[11px] sm:text-xs text-white/70 leading-relaxed max-w-xl">
                            Orquestamos bots y flujos de IA que se encargan del trabajo repetitivo 24/7, para que tu equipo humano solo intervenga cuando hay decisiones reales que tomar.
                          </p>
                        </div>

                        {/* Stats / Editorial metrics */}
                        <div className="flex sm:flex-col gap-4 sm:gap-3 shrink-0 border-t sm:border-t-0 sm:border-l border-white/10 pt-3 sm:pt-0 sm:pl-4">
                          <div>
                            <div className="text-[10px] text-white/40 uppercase tracking-[0.18em] mb-1">
                              Carga operativa
                            </div>
                            <div className="flex items-baseline gap-1">
                              <span className="text-xl sm:text-2xl font-mono text-emerald-400">-70%</span>
                              <span className="text-[10px] text-white/50">tareas manuales</span>
                            </div>
                            <div className="mt-2 h-1.5 w-24 rounded-full bg-white/10 overflow-hidden">
                              <div className="h-full w-[70%] rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500" />
                            </div>
                          </div>
                          <div>
                            <div className="text-[10px] text-white/40 uppercase tracking-[0.18em] mb-1">
                              Tiempo activo
                            </div>
                            <div className="text-sm font-mono text-sky-300">
                              24·7·365
                            </div>
                            <div className="mt-1 text-[10px] text-white/55 max-w-[120px]">
                              Supervisa, responde y reporta mientras tu equipo duerme.
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Intelligence explanation card */}
                  <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-r from-black/80 via-black/70 to-black/80 backdrop-blur-xl">
                    {/* Card glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-pink-500/10"></div>
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                    
                    <div className="relative p-4 sm:p-5">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                        {/* Text content */}
                        <div className="flex-1 min-w-0">
                          <div className="mb-2 flex items-center gap-3">
                            <span className="text-[10px] tracking-[0.25em] uppercase text-purple-300/80">
                              Inteligencia de datos
                            </span>
                            <span className="hidden sm:inline h-px w-10 bg-purple-500/60" />
                            <span className="hidden sm:inline text-[10px] text-white/40">
                              Oportunidades ocultas
                            </span>
                          </div>
                          <h3 className="text-[1.1rem] sm:text-[1.3rem] leading-tight font-semibold text-white">
                            Datos que <span className="font-normal text-purple-300">revelan el futuro</span> de tu negocio
                          </h3>
                          <p className="mt-2 text-[11px] sm:text-xs text-white/70 leading-relaxed max-w-xl">
                            Analizamos métricas y patrones para identificar oportunidades de crecimiento, optimizar procesos y tomar decisiones basadas en datos reales que impulsan resultados.
                          </p>
                        </div>

                        {/* Stats / Editorial metrics */}
                        <div className="flex sm:flex-col gap-4 sm:gap-3 shrink-0 border-t sm:border-t-0 sm:border-l border-white/10 pt-3 sm:pt-0 sm:pl-4">
                          <div>
                            <div className="text-[10px] text-white/40 uppercase tracking-[0.18em] mb-1">
                              Oportunidades
                            </div>
                            <div className="flex items-baseline gap-1">
                              <span className="text-xl sm:text-2xl font-mono text-purple-400">+85%</span>
                              <span className="text-[10px] text-white/50">identificadas</span>
                            </div>
                            <div className="mt-2 h-1.5 w-24 rounded-full bg-white/10 overflow-hidden">
                              <div className="h-full w-[85%] rounded-full bg-gradient-to-r from-purple-400 to-pink-500" />
                            </div>
                          </div>
                          <div>
                            <div className="text-[10px] text-white/40 uppercase tracking-[0.18em] mb-1">
                              Métricas clave
                            </div>
                            <div className="text-sm font-mono text-purple-300">
                              Real-time
                            </div>
                            <div className="mt-1 text-[10px] text-white/55 max-w-[120px]">
                              Dashboards interactivos con insights accionables.
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Consulting explanation card */}
                  <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-r from-black/80 via-black/70 to-black/80 backdrop-blur-xl">
                    {/* Card glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-transparent to-orange-500/10"></div>
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                    
                    <div className="relative p-4 sm:p-5">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                        {/* Text content */}
                        <div className="flex-1 min-w-0">
                          <div className="mb-2 flex items-center gap-3">
                            <span className="text-[10px] tracking-[0.25em] uppercase text-amber-300/80">
                              Consultoría digital
                            </span>
                            <span className="hidden sm:inline h-px w-10 bg-amber-500/60" />
                            <span className="hidden sm:inline text-[10px] text-white/40">
                              Crecimiento estratégico
                            </span>
                          </div>
                          <h3 className="text-[1.1rem] sm:text-[1.3rem] leading-tight font-semibold text-white">
                            Software que <span className="font-normal text-amber-300">transforma</span> tu empresa
                          </h3>
                          <p className="mt-2 text-[11px] sm:text-xs text-white/70 leading-relaxed max-w-xl">
                            Diseñamos e implementamos soluciones tecnológicas personalizadas que aceleran el crecimiento, mejoran la eficiencia y posicionan tu empresa en la vanguardia digital.
                          </p>
                        </div>

                        {/* Stats / Editorial metrics */}
                        <div className="flex sm:flex-col gap-4 sm:gap-3 shrink-0 border-t sm:border-t-0 sm:border-l border-white/10 pt-3 sm:pt-0 sm:pl-4">
                          <div>
                            <div className="text-[10px] text-white/40 uppercase tracking-[0.18em] mb-1">
                              Crecimiento
                            </div>
                            <div className="flex items-baseline gap-1">
                              <span className="text-xl sm:text-2xl font-mono text-amber-400">+250%</span>
                              <span className="text-[10px] text-white/50">ROI promedio</span>
                            </div>
                            <div className="mt-2 h-1.5 w-24 rounded-full bg-white/10 overflow-hidden">
                              <div className="h-full w-[90%] rounded-full bg-gradient-to-r from-amber-400 to-orange-500" />
                            </div>
                          </div>
                          <div>
                            <div className="text-[10px] text-white/40 uppercase tracking-[0.18em] mb-1">
                              Implementación
                            </div>
                            <div className="text-sm font-mono text-amber-300">
                              30-90 días
                            </div>
                            <div className="mt-1 text-[10px] text-white/55 max-w-[120px]">
                              Soluciones escalables desde el día uno.
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </main>

              {/* Right panel */}
              <aside className="block md:col-span-6 border-t md:border-t-0 md:border-l border-white/10 bg-black/30 p-3 mt-3 md:mt-0">
                <div className="mb-3 flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-2 py-1 text-xs font-medium text-slate-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5"><line x1="21" x2="14" y1="4" y2="4"></line><line x1="10" x2="3" y1="4" y2="4"></line><line x1="21" x2="12" y1="12" y2="12"></line><line x1="8" x2="3" y1="12" y2="12"></line><line x1="21" x2="16" y1="20" y2="20"></line><line x1="12" x2="3" y1="20" y2="20"></line><line x1="14" x2="14" y1="2" y2="6"></line><line x1="8" x2="8" y1="10" y2="14"></line><line x1="16" x2="16" y1="18" y2="22"></line></svg>
                    Propiedades
                  </div>
                  <button className="rounded-md border border-white/10 bg-white/5 p-1 text-slate-300 hover:bg-white/10">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
                  </button>
                </div>

                {/* AI Demo Interfaces - Animated Carousel */}
                <AIDemoCarousel />
              </aside>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});
VentajasSection.displayName = 'VentajasSection';

// Create a memoized historia section component
const HistoriaSection = memo(() => {
  return (
    <section
      id="historia"
      className="max-w-7xl sm:px-6 sm:mt-12 mt-8 mr-auto mb-16 ml-auto pt-10 pr-4 pl-4"
    >
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-neutral-950 text-white p-6 sm:p-8">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_20%_-20%,rgba(255,255,255,0.07),transparent_60%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_80%_120%,rgba(255,255,255,0.06),transparent_60%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff0d_1px,transparent_1px)] [background-size:20px_20px] opacity-[0.15]"></div>
        </div>

        <div className="relative">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl leading-[0.9] font-semibold tracking-tight">
            Construyamos juntos. <span className="text-white/70">:)</span>
          </h2>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 md:divide-x md:divide-white/10">
            <div>
              <p className="text-sm text-white/70">Email</p>
              <a
                href="mailto:contacto@artiificial.art"
                className="mt-2 inline-flex items-center gap-3 text-xl sm:text-2xl font-medium tracking-tight"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  data-lucide="mail"
                  className="lucide lucide-mail w-5 h-5"
                >
                  <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"></path>
                  <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                </svg>
                <span className="break-all">contacto@artiificial.art</span>
              </a>
            </div>

            <div className="md:pl-8">
              <p className="text-sm text-white/70">Schedule</p>
              <a
                href="https://calendly.com/artificial-company-local/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium tracking-tight text-gray-900 bg-white hover:bg-white/90 border border-white/10 mt-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  data-lucide="calendar"
                  className="lucide lucide-calendar w-4 h-4"
                >
                  <path d="M8 2v4"></path>
                  <path d="M16 2v4"></path>
                  <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                  <path d="M3 10h18"></path>
                </svg>
                <span>Book a call</span>
              </a>
            </div>

          </div>

          <p className="mt-6 text-center text-[11px] text-white/60">
            © <span id="year">2025</span> — Disponible para proyectos
          </p>
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

  // Preload critical GIFs for optimal loading experience
  const { isLoaded: isGifLoaded } = useGifPreloader(
    criticalGifs,
    [...secondaryGifs, ...benefitGifs],
    { delay: 100, concurrent: 2 }
  );

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
      const viewportMiddle = window.scrollY + window.innerHeight / 2;
      const pageHeight = document.documentElement.scrollHeight;
      const bottomOffset = window.innerHeight / 2;

      // If we're near the bottom of the page, always highlight the last section (Hablemos)
      if (window.scrollY + window.innerHeight + bottomOffset >= pageHeight) {
        if (activeIndex !== sections.length - 1) {
          setActiveIndex(sections.length - 1);
        }
        return;
      }

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const rect = section.getBoundingClientRect();
        const sectionTop = rect.top + window.scrollY;
        const sectionBottom = sectionTop + rect.height;

        if (viewportMiddle >= sectionTop && viewportMiddle < sectionBottom) {
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
    <div className="bg-black text-white font-sans overflow-x-hidden">
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



