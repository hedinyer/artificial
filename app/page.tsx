"use client";

import { Button } from "@/components/ui/button"
import { useEffect, useState, useMemo, memo, useCallback } from "react"
import Image from "next/image";
import dynamic from 'next/dynamic';
import Silk from './Silk';
import ShapeBlur from './ShapeBlur';
import { ChromaGrid } from "@/components/ui/chroma-grid/ChromaGrid";

const SplitText = dynamic(() => import('./components/SplitText'), {
  ssr: false,
  loading: () => null
});

import ScrollVelocity from "./components/ScrollVelocity";
import { Sparkles, Zap, DollarSign, TrendingUp, Palette, Bot, Shield, FileText, Users, Receipt, Factory, Workflow, ChevronDown } from "lucide-react";
import Beams from "./components/Beams";
import OptimizedFonts from "./components/OptimizedFonts";
import "@/components/ui/chroma-grid/ChromaGrid.css";
import "./components/AnimatedShadows.css";
import "./components/OptimizedMedia.css";
import OptimizedGif from "./components/OptimizedGif";
import useGifPreloader, { getGifLoadingAttrs } from "./hooks/useGifPreloader";

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
  "/ventajas/1.jpg",
  "/ventajas/2.jpg",
  "/ventajas/3.jpg",
  "/ventajas/4.jpg",
  "/ventajas/5.jpg",
  "/ventajas/6.jpg",
];

const WHATSAPP_URL =
  "https://wa.me/573171053785?text=Hola%20art_ificial%2C%20quiero%20agendar%20un%20diagnostico%20gratuito%20de%2020%20minutos.";

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
  { label: "Nosotros", href: "#inicio" },
  { label: "Servicios", href: "#servicios" },
  { label: "Portafolio", href: "#portafolio" },
  { label: "Ventajas", href: "#ventajas" },
  { label: "Hablemos", href: "#historia" },
];

// Ventajas data with stable reference
const ventajas = [
  {
    icon: Zap,
    title: "Multiplica tu productividad hasta 3x",
    description: "Automatizamos procesos repetitivos para que tu equipo se enfoque en lo que realmente importa",
    benefit: "Implementación orientada a cuellos de botella reales",
    source: "",
    metric: "",
    metricSource: "",
    gradient: "from-blue-500 to-cyan-500",
    borderColor: "#3B82F6"
  },
  {
    icon: DollarSign,
    title: "Ahorra hasta 32% en costos operativos",
    description: "Eliminamos gastos innecesarios y optimizamos recursos existentes",
    benefit: "Ahorro medible por proceso automatizado",
    source: "",
    metric: "",
    metricSource: "",
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
    benefit: "Automatización gradual con foco en retorno",
    source: "",
    metric: "",
    metricSource: "",
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
      id="servicios-detalle"
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
                href={WHATSAPP_URL}
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
                href={WHATSAPP_URL}
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
          <div className="flex items-center gap-2 p-0 mx-[182px]">
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
    <section
      id="inicio"
      className="relative z-10 flex min-h-screen min-h-[100dvh] flex-col bg-white overflow-x-clip"
    >
      <div
        className="relative z-20 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-4 pb-6 pt-[max(5.75rem,env(safe-area-inset-top,0px))] sm:px-5 sm:pb-8 md:px-6 md:py-8"
      >
        <div className="mx-auto w-full max-w-3xl text-center">
          <p className="mb-3 sm:mb-4 inline-flex max-w-[95%] items-center justify-center gap-1.5 rounded-full border border-sky-400/60 bg-white/5 px-2.5 py-1 text-[11px] font-medium leading-tight text-black sm:gap-2 sm:px-3 sm:text-xs">
            <Sparkles className="h-3.5 w-3.5 shrink-0 text-sky-400 sm:h-4 sm:w-4" />
            <span className="text-balance">Empresa colombiana en Bucaramanga · respuesta en menos de 2 horas</span>
          </p>

          <h1
            className="text-balance text-[clamp(1.85rem,5.5vw+0.85rem,2.35rem)] font-normal leading-[1.1] tracking-tight text-black sm:text-5xl sm:leading-[1.12] md:text-6xl md:leading-[1.08] lg:text-7xl"
            style={{ fontFamily: '"Helvetica Neue"' }}
          >
            <span className="font-[400]">Una agencia,</span>
            <br />
            <span className="font-[400]">Todo </span>
            <span className="font-[800]">resuelto.</span>
          </h1>

          <p
            className="mt-5 text-balance text-sm leading-relaxed text-black sm:mt-5 sm:text-base md:mt-6 md:text-lg"
            style={{ fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif', fontWeight: 300 }}
          >
            De la identidad de marca al software inteligente: construimos tu logo, web, app y automatizaciones con IA en una sola agencia que entiende tu negocio de principio a fin.
          </p>

          <div className="mt-9 flex w-full max-w-sm flex-col items-stretch justify-center gap-3 sm:mx-auto sm:mt-8 sm:max-w-none sm:w-auto sm:flex-row sm:items-center sm:px-0">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button
                type="button"
                className="hero-button w-full sm:w-auto"
                style={{
                  background: 'radial-gradient(65.28% 65.28% at 50% 100%, rgba(34, 211, 238, 0.8) 0%, rgba(34, 211, 238, 0) 100%), linear-gradient(0deg, #2563eb, #2563eb)',
                  padding: '12px 18px',
                  minHeight: '48px',
                  minWidth: 'min(100%, 220px)',
                  borderRadius: '9999px',
                  boxShadow: '0 10px 24px rgba(37, 99, 235, 0.28)',
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
                  Hablar por WhatsApp
                  <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </span>
              </button>
            </a>
            <a
              href="#portafolio"
              className="w-full sm:w-auto"
            >
              <button
                type="button"
                className="w-full min-h-12 min-w-0 rounded-full border border-gray-200 bg-white px-8 py-3 text-slate-900 font-medium shadow-md shadow-black/20 transition-colors hover:bg-white/95 sm:min-w-[220px]"
              >
                Ver portafolio
              </button>
            </a>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute right-0 top-1/2 z-[1] hidden -translate-y-1/2 md:block max-lg:max-w-[min(50vw,420px)] max-lg:opacity-90">
        <Image
          src="/header/left_hero.png"
          alt="Ilustración del hero"
          width={560}
          height={560}
          className="h-auto w-full max-w-[min(56vw,560px)] object-contain lg:max-w-[560px]"
          sizes="(min-width: 768px) min(50vw, 560px), 0px"
          priority
        />
      </div>

      <div className="pointer-events-none absolute left-0 top-1/2 z-[1] hidden -translate-y-1/2 md:block max-lg:max-w-[min(50vw,420px)] max-lg:opacity-90">
        <Image
          src="/header/left_hero2.png"
          alt="Ilustración izquierda del hero"
          width={560}
          height={560}
          className="h-auto w-full max-w-[min(56vw,560px)] object-contain lg:max-w-[560px]"
          sizes="(min-width: 768px) min(50vw, 560px), 0px"
          priority
        />
      </div>
    </section>
  );
});
HeroSection.displayName = 'HeroSection';

const serviciosIntroCards = [
  {
    title: "Diseño",
    image: "/services/diseno.png",
    audience: "Empresas que necesitan una identidad sólida para vender mejor.",
    timeline: "2 a 4 semanas",
    pricing: "Desde COP $3.000.000",
    bullets: [
      { headline: "Marca que no se confunde con la competencia", body: "Sistema visual + voz: mismo nivel en web, redes y piezas comerciales." },
      { headline: "Interfaces que la gente sí termina", body: "Menos fricción en formularios y flujos; más conversiones y menos soporte repetitivo." },
      { headline: "Primera impresión de agencia, no de plantilla", body: "Pitch, landing y redes alineados: confianza desde el primer scroll." },
      { headline: "Coherencia en cada touchpoint", body: "PDF, WhatsApp, firma: todo refuerza la misma historia; cero identidad partida." },
      { headline: "Diseño que vende la propuesta", body: "Jerarquía clara y storytelling visual: priorizamos claridad, no relleno decorativo." },
    ],
  },
  {
    title: "Productividad",
    image: "/services/productividad.png",
    audience: "Equipos que pierden tiempo en tareas repetitivas y seguimiento manual.",
    timeline: "3 a 6 semanas",
    pricing: "Desde COP $4.500.000",
    bullets: [
      { headline: "Quitamos el trabajo zombie del día a día", body: "Datos, reportes y tareas repetitivas: automatizados para que el equipo respire." },
      { headline: "IA que atiende mientras tú cierras", body: "Agentes para respuestas, seguimiento y admin: 24/7 sin sumar cabezas a nómina." },
      { headline: "Software hecho para tu flujo real", body: "Nada de forzar un CRM genérico: herramientas que encajan con cómo ya operas." },
      { headline: "Velocidad operativa sin heroísmos", body: "Menos copiar/pegar entre áreas; menos espera entre “ya te lo mando”." },
      { headline: "Un solo sitio para procesos y datos", body: "Menos “¿dónde quedó eso?”: trazabilidad y menos errores caros." },
    ],
  },
  {
    title: "Ganancias",
    image: "/services/ganancias.png",
    audience: "Negocios que quieren escalar operaciones sin crecer nómina.",
    timeline: "4 a 8 semanas",
    pricing: "Desde COP $6.000.000",
    bullets: [
      { headline: "Misma capacidad, menos gasto fijo", body: "Automatización y sistemas que sustituyen horas-hombre, no ambición." },
      { headline: "Sabrás qué línea de negocio te paga de verdad", body: "Inteligencia de datos y dashboards: decisiones con números, no solo instinto." },
      { headline: "El equipo vuelve a vender y a estrategia", body: "Menos apagar incendios administrativos; más foco en ingresos." },
      { headline: "Menos fugas de dinero por error humano", body: "Controles y flujos que reducen reprocesos, multas y retrabajo." },
      { headline: "Escalar volumen sin inflar la planilla", body: "Tecnología que absorbe picos: creces sin prometer lo imposible al talento." },
    ],
  },
] as const;

const portfolioItems = [
  {
    title: "Unisantander",
    type: "Branding + Web institucional",
    image: "/portfolio/unisantander.png",
    gallery: [
      "/portfolio/unisantander2.png",
      "/portfolio/unisantander3.png",
      "/portfolio/unisantander4.png",
    ],
    problem:
      "Tenían presencia digital fragmentada y su comunicación no reflejaba el nivel institucional que necesitaban proyectar.",
    solution:
      "Diseñamos branding completo y construimos su página web institucional con una narrativa clara para audiencias académicas y corporativas.",
    result: "En 5 semanas pasaron de imagen dispersa a una marca coherente y un sitio listo para generar confianza desde la primera visita.",
  },
  {
    title: "Vierco SAS",
    type: "Web + Infraestructura agéntica",
    image: "/portfolio/vierco.png",
    gallery: [
      "/portfolio/vierco2.png",
      "/portfolio/vierco3.png",
      "/portfolio/vierco4.png",
    ],
    problem:
      "La operación dependía de seguimiento manual, mensajes cruzados y tareas repetitivas que frenaban el crecimiento.",
    solution:
      "Construimos su página web y una infraestructura agéntica que coordina pedidos, estados y decisiones operativas en flujo continuo.",
    result: "En 8 semanas lograron coordinación operativa con 0 intervención humana en procesos clave y más tiempo del equipo para ventas.",
  },
  {
    title: "Próximo caso publicado",
    type: "Implementación en curso",
    image: "",
    gallery: [],
    problem:
      "Muchas pymes saben que deben digitalizarse, pero no tienen una ruta clara de qué atacar primero para ver retorno.",
    solution:
      "Abrimos un cupo para implementar branding, web y automatización con foco en quick wins durante los primeros 30 días.",
    result: "Publicaremos el caso completo con problema, solución, tiempos y resultados medibles para que compares contra tu negocio.",
  },
] as const;

type ServiciosIntroAccordionPanelProps = {
  cardIndex: number;
  panelId: string;
  openRow: number | null;
  onRowClick: (row: number) => void;
  className?: string;
};

const ServiciosIntroAccordionPanel = memo(function ServiciosIntroAccordionPanel({
  cardIndex,
  panelId,
  openRow,
  onRowClick,
  className = "",
}: ServiciosIntroAccordionPanelProps) {
  const card = serviciosIntroCards[cardIndex];
  return (
    <div
      id={panelId}
      role="region"
      aria-labelledby={`servicios-card-${cardIndex}`}
      className={`rounded-2xl border border-black/10 bg-black/[0.02] px-3 py-4 sm:px-6 sm:py-5 ${className}`}
    >
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-black/50">{card.title}</p>
      <p className="mt-1 text-sm font-medium text-black/80 sm:text-base">
        Cinco formas concretas en las que te impactamos
      </p>
      <div className="mt-3 grid gap-2 rounded-xl border border-black/10 bg-white/70 p-3 text-xs text-black/70 sm:grid-cols-3">
        <p><span className="font-semibold text-black">Para quién:</span> {card.audience}</p>
        <p><span className="font-semibold text-black">Tiempo estimado:</span> {card.timeline}</p>
        <p><span className="font-semibold text-black">Rango base:</span> {card.pricing}</p>
      </div>
      <div className="mt-4 flex flex-col divide-y divide-black/10 border-t border-black/10">
        {card.bullets.map((row, i) => {
          const expanded = openRow === i;
          return (
            <div key={row.headline}>
              <button
                type="button"
                onClick={() => onRowClick(i)}
                aria-expanded={expanded}
                className="flex w-full items-start gap-3 py-3.5 text-left outline-none transition-colors hover:bg-black/[0.03] focus-visible:bg-black/[0.04] sm:py-4"
              >
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-black text-[11px] font-semibold text-white">
                  {i + 1}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[15px] font-semibold leading-snug tracking-tight text-black sm:text-base">
                    {row.headline}
                  </span>
                </span>
                <ChevronDown
                  className={`mt-0.5 h-5 w-5 shrink-0 text-black/40 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
                  aria-hidden
                />
              </button>
              <div
                className={`grid transition-[grid-template-rows] duration-200 ease-out motion-reduce:transition-none ${expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
              >
                <div className="min-h-0 overflow-hidden">
                  <p className="pb-4 pl-9 text-sm leading-relaxed text-black/65 sm:pl-10 sm:text-[15px]">{row.body}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});
ServiciosIntroAccordionPanel.displayName = "ServiciosIntroAccordionPanel";

const ServiciosIntroSection = memo(() => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [openRow, setOpenRow] = useState<number | null>(0);

  const toggleCard = useCallback((index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  }, []);

  useEffect(() => {
    if (activeIndex !== null) setOpenRow(0);
  }, [activeIndex]);

  const handleRowClick = useCallback((index: number) => {
    setOpenRow((prev) => (prev === index ? null : index));
  }, []);

  return (
    <section id="servicios" className="relative z-10 bg-white pb-12 pt-2 sm:pb-16 sm:pt-4">
      <div className="mx-auto max-w-7xl px-4 sm:px-5 md:px-6">
        <div className="mb-6 text-center sm:mb-8">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-black/60 sm:text-sm">Servicios</p>
          <h2 className="mt-2 text-balance text-[1.35rem] font-light leading-snug tracking-tight text-black sm:text-[25px] [font-family:'Helvetica Neue']">
            Lo que hacemos para tu crecimiento
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-3">
          {serviciosIntroCards.map((card, index) => {
            const isActive = activeIndex === index;
            return (
              <div key={`${card.title}-${index}`} className="min-w-0">
                <article
                  className={`bg-transparent transition-transform duration-300 sm:hover:-translate-y-1 ${isActive ? "sm:-translate-y-1" : ""}`}
                >
                  <button
                    type="button"
                    onClick={() => toggleCard(index)}
                    aria-expanded={isActive}
                    id={`servicios-card-${index}`}
                    className={`group relative w-full border-0 bg-transparent p-0 text-left shadow-none outline-none transition-[box-shadow,transform] focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:ring-offset-white ${isActive ? "rounded-2xl ring-2 ring-black ring-offset-2 ring-offset-white" : "rounded-2xl"}`}
                  >
                    <span className="sr-only">{card.title}. Toca para ver qué hacemos en esta línea.</span>
                    <Image
                      src={card.image}
                      alt=""
                      width={1200}
                      height={1200}
                      className="h-auto w-full rounded-2xl object-contain"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      aria-hidden
                    />
                  </button>
                </article>

                {isActive && (
                  <div className="mt-4 md:hidden">
                    <ServiciosIntroAccordionPanel
                      cardIndex={index}
                      panelId={`servicios-acordeon-m-${index}`}
                      openRow={openRow}
                      onRowClick={handleRowClick}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {activeIndex !== null && (
          <div className="mt-6 hidden sm:mt-8 md:block">
            <ServiciosIntroAccordionPanel
              cardIndex={activeIndex}
              panelId="servicios-acordeon-d"
              openRow={openRow}
              onRowClick={handleRowClick}
            />
          </div>
        )}
      </div>
    </section>
  );
});
ServiciosIntroSection.displayName = 'ServiciosIntroSection';

const PortfolioSection = memo(() => {
  const [activeSlides, setActiveSlides] = useState<Record<string, number>>({});

  const getSlides = useCallback((item: (typeof portfolioItems)[number]) => {
    return item.image ? [item.image, ...item.gallery] : [];
  }, []);

  const goToSlide = useCallback((title: string, nextIndex: number, total: number) => {
    const safeIndex = ((nextIndex % total) + total) % total;
    setActiveSlides((prev) => ({ ...prev, [title]: safeIndex }));
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveSlides((prev) => {
        const next = { ...prev };
        portfolioItems.forEach((item) => {
          const slides = getSlides(item);
          if (slides.length > 1) {
            const current = prev[item.title] ?? 0;
            next[item.title] = (current + 1) % slides.length;
          }
        });
        return next;
      });
    }, 3000);

    return () => window.clearInterval(interval);
  }, [getSlides]);

  return (
    <section id="portafolio" className="relative z-10 bg-white px-4 pb-14 pt-4 sm:px-6 sm:pb-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-7 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-black/60 sm:text-sm">Portafolio</p>
          <h2 className="mt-2 text-balance text-[1.35rem] font-light leading-snug tracking-tight text-black sm:text-[25px] [font-family:'Helvetica Neue']">
            Trabajo real con resultados concretos
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {portfolioItems.map((item) => {
            const slides = getSlides(item);
            const current = activeSlides[item.title] ?? 0;

            return (
              <article
                key={item.title}
                className="overflow-hidden rounded-2xl bg-black text-white shadow-sm"
              >
                <div className="grid grid-cols-1 md:grid-cols-[1.1fr_1fr]">
                  <div className="relative min-h-[280px] overflow-hidden md:min-h-[360px]">
                    {slides.length > 0 ? (
                      <>
                        <div
                          className="flex h-full w-full transition-transform duration-500 ease-out"
                          style={{ transform: `translateX(-${current * 100}%)` }}
                        >
                          {slides.map((img, idx) => (
                            <div key={`${item.title}-${idx}`} className="relative h-full min-w-full">
                              <Image
                                src={img}
                                alt={`${item.title} - imagen ${idx + 1}`}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 55vw"
                                loading="lazy"
                              />
                            </div>
                          ))}
                        </div>
                        {slides.length > 1 && (
                          <>
                            <button
                              type="button"
                              aria-label={`Imagen anterior de ${item.title}`}
                              onClick={() => goToSlide(item.title, current - 1, slides.length)}
                              className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/30 bg-black/45 px-3 py-2 text-sm text-white backdrop-blur-sm"
                            >
                              ←
                            </button>
                            <button
                              type="button"
                              aria-label={`Imagen siguiente de ${item.title}`}
                              onClick={() => goToSlide(item.title, current + 1, slides.length)}
                              className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/30 bg-black/45 px-3 py-2 text-sm text-white backdrop-blur-sm"
                            >
                              →
                            </button>
                            <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
                              {slides.map((_, idx) => (
                                <button
                                  key={`${item.title}-dot-${idx}`}
                                  type="button"
                                  aria-label={`Ir a imagen ${idx + 1} de ${item.title}`}
                                  onClick={() => goToSlide(item.title, idx, slides.length)}
                                  className={`h-2.5 w-2.5 rounded-full border border-white/40 ${
                                    idx === current ? "bg-white" : "bg-white/35"
                                  }`}
                                />
                              ))}
                            </div>
                          </>
                        )}
                      </>
                    ) : (
                      <div className="flex h-full items-center justify-center bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_60%),linear-gradient(160deg,#131313,#27272a)] px-4 text-center text-xs text-white/80">
                        Imagen del próximo caso en preparación
                      </div>
                    )}
                  </div>

                  <div className="p-4 sm:p-5">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white/65">{item.type}</p>
                    <h3 className="mt-1 text-xl font-semibold tracking-tight">{item.title}</h3>
                    <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/60">Problema inicial</p>
                    <p className="mt-1 text-sm leading-relaxed text-white/85">{item.problem}</p>
                    <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/60">Solución implementada</p>
                    <p className="mt-1 text-sm leading-relaxed text-white/85">{item.solution}</p>
                    <p className="mt-3 rounded-lg bg-white/12 px-3 py-2 text-xs font-medium text-white backdrop-blur-sm">{item.result}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
});
PortfolioSection.displayName = "PortfolioSection";

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
      className="relative min-h-screen overflow-x-clip py-12 px-3 sm:px-5 sm:py-24 md:py-32"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-white"></div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl">

        {/* Header - Mobile Optimized */}
        <div className="mb-10 px-1 text-center sm:mb-16 sm:px-4">
          <p className="mx-auto max-w-4xl text-balance text-lg font-bold leading-snug text-black sm:text-2xl md:text-3xl md:leading-tight lg:text-4xl">
            IA que multiplica tu productividad y reduce costos automáticamente
          </p>
        </div>

        {/* Ventajas Grid - Mobile Responsive */}
        <div className="mx-auto grid max-w-7xl grid-cols-1 justify-items-stretch gap-4 sm:grid-cols-2 sm:justify-items-center sm:gap-6 lg:grid-cols-3">
          {ventajas.map((ventaja, index) => {
            const IconComponent = ventaja.icon;
            const isAnimated = animatedCards.includes(index);

            return (
              <article
                key={index}
                className={`chroma-ventaja-card group relative aspect-[9/16] w-full max-w-[min(100%,22rem)] transform overflow-hidden rounded-2xl shadow-xl backdrop-blur-sm transition-all duration-700 sm:max-w-[320px] sm:rounded-[28px] sm:backdrop-blur-lg ${isAnimated
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
                  border: '1px solid rgba(75, 85, 99, 0.3)',
                  backgroundColor: loadedBackgrounds.has(index) ? 'transparent' : 'rgb(20, 20, 20)',
                  cursor: 'pointer'
                } as React.CSSProperties}
              >
                {/* Fondo: imágenes en /public/ventajas (1.jpg … 6.jpg) */}
                <img
                  src={`/ventajas/${index + 1}.jpg`}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover z-0"
                  style={{
                    imageRendering: 'auto',
                    pointerEvents: 'none',
                    opacity: loadedBackgrounds.has(index) ? 1 : 0.5
                  }}
                  loading={index === 0 ? "eager" : "lazy"}
                  decoding="async"
                  onLoad={() => {
                    setLoadedBackgrounds(prev => new Set([...prev, index]));
                  }}
                  onError={(e) => {
                    console.error('Error loading imagen de ventaja:', `/ventajas/${index + 1}.jpg`, e);
                  }}
                />
                {/* Gradient overlay */}
                <div 
                  className="absolute inset-0 z-[1] pointer-events-none"
                  style={{
                    background: 'linear-gradient(to bottom, rgba(8,12,18,0.05) 10%, rgba(8,12,18,0.45) 55%, rgba(8,12,18,0.88) 100%)'
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

                {/* Content Container */}
                <div className="relative z-20 flex h-full flex-col p-4 sm:p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2.5 py-1 rounded-full text-[9px] font-semibold uppercase tracking-[0.14em] text-white/90 ring-1 ring-white/30 bg-white/15 backdrop-blur-sm">
                        Automatización IA
                      </span>
                      {ventaja.benefit && (
                        <span className="px-2.5 py-1 rounded-full text-[9px] font-semibold uppercase tracking-[0.12em] text-white/90 ring-1 ring-white/25 bg-black/25 backdrop-blur-sm">
                          {ventaja.benefit}
                        </span>
                      )}
                    </div>
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/25 backdrop-blur-sm">
                      <IconComponent className="w-4 h-4 text-white" />
                    </span>
                  </div>

                  <div className="mt-auto flex h-[132px] w-full flex-col rounded-2xl border border-white/20 bg-white/10 p-2.5 sm:p-3 backdrop-blur-md">
                    <h3 className="shrink-0 text-[17px] font-semibold leading-[1.12] text-white tracking-tight line-clamp-2 min-h-[2.35rem]">
                      {ventaja.title}
                    </h3>
                    <p className="mt-1.5 h-[3.35rem] shrink-0 text-[11px] leading-snug text-white/85 line-clamp-3">
                      {ventaja.description}
                    </p>
                  </div>
                </div>

                {/* ChromaGrid-style border effect */}
                <div className="absolute inset-0 rounded-2xl border border-gray-500/35 transition-all duration-700 group-hover:border-gray-400/60 sm:rounded-[28px]"></div>
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
});
VentajasSection.displayName = 'VentajasSection';

const HISTORIA_SOCIAL = [
  {
    name: "WhatsApp",
    href: WHATSAPP_URL,
    aria: "Escribir por WhatsApp",
    className: "text-[#25D366] hover:border-transparent hover:bg-[#25D366] hover:text-white",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
        <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.78 3.1 1.19 4.75 1.2h.08c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.15-2.9-7.01a9.82 9.82 0 0 0-7-2.9zm.04 17.9h-.01c-1.49 0-2.95-.4-4.22-1.15l-.3-.18-3.12.82.83-3.04-.2-.32a7.6 7.6 0 0 1-1.16-3.99c0-4.2 3.42-7.63 7.64-7.63 2.04 0 3.95.8 5.4 2.25a7.6 7.6 0 0 1 2.24 5.4c0 4.2-3.42 7.63-7.64 7.64zm4.2-5.4c-.23-.12-1.35-.66-1.55-.74-.2-.08-.35-.12-.5.12-.15.24-.55.74-.68.9-.12.15-.25.16-.48.05-.22-.12-1.35-.5-2.57-1.6-.95-.85-1.6-1.9-1.78-2.22-.2-.3-.02-.47.15-.63.16-.16.35-.4.5-.6.12-.2.12-.32.18-.5.05-.2 0-.35-.1-.5-.1-.12-.5-1.2-.68-1.65-.18-.45-.4-.4-.5-.4h-.42c-.2 0-.5.05-.75.4-.25.3-.95.92-.95 2.25 0 1.32.97 2.6 1.1 2.8.12.2 1.9 2.9 4.6 4.04.64.28 1.15.45 1.55.6.64.2 1.22.17 1.68.1.5-.05 1.5-.6 1.7-1.2.2-.6.2-1.12.15-1.2-.1-.1-.2-.12-.4-.2z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/artiificial.art",
    aria: "Instagram",
    className: "text-pink-600 hover:border-transparent hover:bg-gradient-to-br hover:from-[#F58529] hover:via-[#DD2A7B] hover:to-[#515BD4] hover:text-white",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-[22px] w-[22px]" fill="currentColor" aria-hidden>
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/artificial",
    aria: "LinkedIn",
    className: "text-[#0A66C2] hover:border-transparent hover:bg-[#0A66C2] hover:text-white",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
] as const;

// Create a memoized historia section component
const HistoriaSection = memo(() => {
  return (
    <section
      id="historia"
      className="w-full bg-white px-2 pb-24 text-slate-900 pt-[4.5rem] sm:px-0 sm:pb-32 sm:pt-[5.5rem]"
    >
      <div className="mx-auto max-w-7xl px-3 sm:px-6">
      <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-50/80 p-5 shadow-sm sm:rounded-3xl sm:p-8">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_20%_-20%,rgba(15,23,42,0.04),transparent_60%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_80%_120%,rgba(15,23,42,0.03),transparent_60%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(#0f172a0a_1px,transparent_1px)] [background-size:20px_20px] opacity-[0.4]"></div>
        </div>

        <div className="relative">
          <h2 className="text-balance text-3xl font-semibold leading-[1.05] tracking-tight text-slate-900 sm:text-5xl sm:leading-[1.02] lg:text-6xl">
            <span className="block">Empecemos por una conversación clara.</span>
            <span className="mt-3 block max-w-[42rem] text-base font-medium leading-relaxed tracking-tight text-slate-500 sm:mt-2 sm:text-2xl sm:leading-snug lg:text-[1.7rem]">
              Escuchamos con intención, alineamos lo que buscas y comunicamos con precisión desde el primer mensaje.
            </span>
          </h2>

          <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-0 lg:divide-x lg:divide-slate-200/90">
            <div className="lg:pr-8">
              <p className="text-sm text-slate-500">Email</p>
              <a
                href="mailto:contacto@artiificial.art"
                className="mt-2 inline-flex items-center gap-3 text-xl sm:text-2xl font-medium tracking-tight text-slate-900"
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
                  className="lucide lucide-mail w-5 h-5 shrink-0"
                >
                  <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"></path>
                  <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                </svg>
                <span className="break-all">contacto@artiificial.art</span>
              </a>
            </div>

            <div className="sm:pl-0 lg:px-8">
              <p className="text-sm text-slate-500">Diagnóstico gratuito</p>
              <a
                href="https://calendly.com/artificial-company-local/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium tracking-tight text-slate-900 bg-white hover:bg-slate-50 border border-slate-200/90 mt-2 shadow-sm"
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
                <span>Agendar diagnóstico gratis (20 min)</span>
              </a>
              <p className="mt-3 max-w-sm text-xs leading-relaxed text-slate-500">
                Después de agendar revisamos tu caso, definimos prioridades y te entregamos un plan de acción inicial sin compromiso.
              </p>
            </div>

            <div className="sm:col-span-2 sm:border-t sm:border-slate-200/90 sm:pt-8 lg:col-span-1 lg:border-t-0 lg:pt-0 lg:pl-8 sm:mt-0">
              <p className="text-sm text-slate-500">Redes</p>
              <div className="mt-3 flex flex-wrap items-center gap-2.5">
                {HISTORIA_SOCIAL.map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.aria}
                    title={s.name}
                    className={`inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200/90 bg-white text-slate-600 shadow-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400 ${s.className}`}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <p className="mt-6 text-center text-[11px] text-slate-500">
            © <span id="year">{new Date().getFullYear()}</span> — Disponible para proyectos
          </p>
        </div>
      </div>
      </div>
    </section>
  );
});
HistoriaSection.displayName = 'HistoriaSection';

type SplashPhase = "splash" | "fade" | "none";

/** Tiempo logo a pantalla completa antes del crossfade (ms) */
const SPLASH_HOLD_MS = 3000;
/** Duración del crossfade overlay ↔ página (ms); alinear con `duration-[${…}ms]` en splashFadeClass */
const SPLASH_FADE_MS = 2400;

function LandingPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showChroma, setShowChroma] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [splashPhase, setSplashPhase] = useState<SplashPhase>("splash");

  // Splash: fondo blanco + logo centrado 3s, luego crossfade a la página; scroll bloqueado hasta quitar overlay
  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const showMs = reduce ? 250 : SPLASH_HOLD_MS;
    const fadeMs = reduce ? 1 : SPLASH_FADE_MS;
    const tFade = window.setTimeout(() => setSplashPhase("fade"), showMs);
    const tDone = window.setTimeout(() => setSplashPhase("none"), showMs + fadeMs + 150);
    return () => {
      window.clearTimeout(tFade);
      window.clearTimeout(tDone);
    };
  }, []);

  useEffect(() => {
    if (splashPhase === "none") {
      document.documentElement.style.removeProperty("overflow");
      document.body.style.removeProperty("overflow");
      return;
    }
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    return () => {
      document.documentElement.style.removeProperty("overflow");
      document.body.style.removeProperty("overflow");
    };
  }, [splashPhase]);

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

  const splashFadeClass =
    "transition-opacity duration-[2400ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none";
  const trackEvent = useCallback((eventName: string, payload: Record<string, string>) => {
    if (typeof window === "undefined") return;
    const win = window as Window & { dataLayer?: Array<Record<string, unknown>> };
    win.dataLayer = win.dataLayer || [];
    win.dataLayer.push({ event: eventName, ...payload });
  }, []);
  useEffect(() => {
    const clickHandler = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href") || "";
      if (href.includes("wa.me")) {
        trackEvent("cta_click", { channel: "whatsapp", href });
      } else if (href.includes("calendly.com")) {
        trackEvent("cta_click", { channel: "calendly", href });
      } else if (href === "#portafolio") {
        trackEvent("cta_click", { channel: "portfolio", href });
      }
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  }, [trackEvent]);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "art_ificial",
    url: "https://artiificial.art",
    image: "https://artiificial.art/placeholder-logo.png",
    areaServed: "Colombia",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bucaramanga",
      addressCountry: "CO",
    },
    sameAs: [
      "https://www.instagram.com/artiificial.art",
      "https://www.linkedin.com/company/artificial",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: "+57 317 105 3785",
      availableLanguage: "es",
    },
    makesOffer: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Diseño de marca" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Desarrollo web y apps" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Automatización con IA" } },
    ],
  };

  return (
    <div className="bg-black text-white font-sans overflow-x-clip">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {splashPhase !== "none" && (
        <div
          className={`fixed inset-0 z-[200] flex items-center justify-center bg-white ${splashFadeClass} ${
            splashPhase === "fade" ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
          aria-hidden
        >
          <div className="relative h-44 w-44 sm:h-52 sm:w-52 md:h-60 md:w-60">
            <Image
              src="/splash/splash.png"
              alt=""
              fill
              className="object-contain"
              sizes="(max-width: 768px) 176px, 240px"
              priority
            />
          </div>
        </div>
      )}
      <div
        className={`${splashFadeClass} ${
          splashPhase === "splash"
            ? "pointer-events-none opacity-0"
            : "opacity-100"
        }`}
      >
      <OptimizedFonts />
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/95 backdrop-blur-sm py-3">
        <div className="mx-auto flex max-w-7xl items-center px-4 lg:px-8">
          {/* Desktop Navigation */}
          <div className="relative hidden w-full items-center md:flex">
            <div className="flex items-center gap-2 px-[10px] mx-[216px]">
              <h1 className="text-lg font-semibold tracking-tight text-white">
                art_ificial
              </h1>
              <Image
                src="/header/logo_header.png"
                alt="Logo Art_ificial"
                width={19}
                height={20}
                className="h-5 w-auto opacity-90"
                priority
              />
            </div>
            <nav className="absolute left-1/2 flex -translate-x-1/2 items-center gap-8">
              {navItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => scrollToSection(item.href, index)}
                  className={`text-xs font-medium tracking-wide transition-colors duration-200 ${activeIndex === index
                    ? 'text-white'
                    : 'text-white/75 hover:text-white'
                    }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Mobile Navigation */}
          <div className="flex w-full items-center justify-between md:hidden">
            {/* Mobile Brand Logo */}
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-semibold tracking-tight text-white">
                art_ificial
              </h1>
              <Image
                src="/header/logo_header.png"
                alt="Logo Art_ificial"
                width={19}
                height={20}
                className="h-5 w-auto opacity-90"
                priority
              />
            </div>

            {/* Mobile Menu Button — barras absolutas para que la X coincida al abrir */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-md outline-none transition-colors hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={isMobileMenuOpen}
            >
              <span
                className={`absolute h-[2px] w-[22px] origin-center rounded-full bg-white transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  isMobileMenuOpen ? "translate-y-0 rotate-45" : "-translate-y-[7px] rotate-0"
                }`}
              />
              <span
                className={`absolute h-[2px] w-[22px] origin-center rounded-full bg-white transition-opacity duration-200 ease-out ${
                  isMobileMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute h-[2px] w-[22px] origin-center rounded-full bg-white transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  isMobileMenuOpen ? "translate-y-0 -rotate-45" : "translate-y-[7px] rotate-0"
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Menú móvil fuera del header: backdrop-blur en el header hace que fixed dentro quede recortado a ~56px */}
      <div
        className={`fixed inset-0 z-40 bg-black md:hidden ${
          isMobileMenuOpen
            ? "visible opacity-100"
            : "invisible pointer-events-none opacity-0"
        } transition-opacity duration-300 ease-out`}
      >
        <div
          className="absolute inset-0 bg-black"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden
        />

        <div
          className={`relative z-10 mx-auto flex min-h-0 h-full max-h-[100dvh] w-full max-w-md flex-col justify-center px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[max(5.25rem,env(safe-area-inset-top))] transition-transform duration-300 ease-out motion-reduce:transition-none ${
            isMobileMenuOpen ? "translate-y-0" : "translate-y-3"
          }`}
        >
          <nav className="flex flex-col gap-1" role="navigation" aria-label="Principal móvil">
            {navItems.map((item, index) => {
              const active = activeIndex === index;
              return (
                <button
                  key={item.href}
                  type="button"
                  onClick={() => {
                    scrollToSection(item.href, index);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full py-4 text-center text-xl font-semibold tracking-tight transition-colors ${
                    active ? "text-white" : "text-white/70 active:text-white/90"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          <p className="mx-auto mt-auto max-w-sm pt-12 text-center text-xs leading-relaxed text-white/35">
            Toca fuera o el icono arriba para cerrar
          </p>
        </div>
      </div>
      <HeroSection key="hero-section-persistent" isInicioActive={activeIndex === 0} />
      <ServiciosIntroSection />
      <PortfolioSection />
      <VentajasSection />
      <HistoriaSection />
      </div>
    </div>
  )
}

export default LandingPage;



