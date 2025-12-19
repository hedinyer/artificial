"use client";

import { useEffect, useState, memo, useCallback } from "react";
import OptimizedFonts from "../components/OptimizedFonts";
import LightRays from "../components/LightRays";
import OptimizedGif from "../components/OptimizedGif";
import RestaurantDashboard from "./restaurant-dashboard";

import "../components/AnimatedShadows.css";
import "../components/OptimizedMedia.css";
import { 
  UtensilsCrossed, 
  BarChart3, 
  ShoppingCart, 
  Calendar, 
  ClipboardList, 
  Gift, 
  Users, 
  MessageCircle,
  Check,
  Mail,
  Calendar as CalendarIcon,
  Sparkles,
  ChevronDown
} from "lucide-react";

// Navigation items for RestaurantesPage
const navItems = [
  { label: "Inicio", href: "#hero" },
  { label: "Servicios", href: "#servicios" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contáctanos", href: "#contactanos" },
];

// Services data for restaurants
const restaurantServices = [
  {
    title: "Dashboards Inteligentes",
    description: "Paneles de control con métricas en tiempo real, análisis de ventas, inventario y rendimiento operativo para tomar decisiones informadas.",
    image: "/restaurantes/1.png",
    badge: "ANÁLISIS EN TIEMPO REAL",
    ctaText: "Ver dashboards"
  },
  {
    title: "Sistema de Pedidos",
    description: "Gestión completa de pedidos online y presenciales con integración de pagos y seguimiento en tiempo real.",
    image: "/restaurantes/2.png",
    badge: "AUTOMATIZACIÓN",
    ctaText: "Explorar sistema"
  },
  {
    title: "Reservaciones Online",
    description: "Plataforma de reservas integrada que permite a tus clientes reservar mesas fácilmente con confirmaciones automáticas.",
    image: "/restaurantes/3.png",
    badge: "GESTIÓN INTELIGENTE",
    ctaText: "Ver plataforma"
  },
  {
    title: "Comandas Digitales",
    description: "Sistema digital de comandas que envía órdenes directamente a cocina, optimizando tiempos y reduciendo errores.",
    image: "/restaurantes/4.png",
    badge: "EFICIENCIA",
    ctaText: "Optimizar cocina"
  },
  {
    title: "CRM y Fidelización",
    description: "Programa de fidelidad, promociones personalizadas y CRM integrado para mantener y fidelizar a tus clientes.",
    image: "/restaurantes/5.png",
    badge: "FIDELIZACIÓN",
    ctaText: "Aumentar clientes"
  },
  {
    title: "Bot WhatsApp",
    description: "Chatbot inteligente de WhatsApp para recibir pedidos, responder consultas y automatizar la atención al cliente 24/7.",
    image: "/restaurantes/6.png",
    badge: "AUTOMATIZACIÓN IA",
    ctaText: "Automatizar atención"
  }
];

type Category = "dashboard" | "mesas" | "pedidos" | "inventario" | "finanzas" | "personal";

const categoryContent: Record<Category, { badge: string; title: string; description: string; ctaText: string }> = {
  dashboard: {
    badge: "ANÁLISIS EN TIEMPO REAL",
    title: "Dashboards Inteligentes",
    description: "Paneles de control con métricas en tiempo real, análisis de ventas, inventario y rendimiento operativo para tomar decisiones informadas.",
    ctaText: "Ver dashboards"
  },
  mesas: {
    badge: "GESTIÓN INTELIGENTE",
    title: "Sistema de Mesas",
    description: "Control completo del estado de mesas en tiempo real. Visualiza disponibilidad, reservas y optimiza la distribución del salón para maximizar la ocupación.",
    ctaText: "Gestionar mesas"
  },
  pedidos: {
    badge: "AUTOMATIZACIÓN",
    title: "Sistema de Pedidos",
    description: "Gestión completa de pedidos online y presenciales con integración de pagos y seguimiento en tiempo real desde la cocina hasta la mesa.",
    ctaText: "Explorar sistema"
  },
  inventario: {
    badge: "CONTROL TOTAL",
    title: "Gestión de Inventario",
    description: "Monitorea tu stock en tiempo real, recibe alertas automáticas de productos bajos y optimiza tus compras con análisis predictivo.",
    ctaText: "Ver inventario"
  },
  finanzas: {
    badge: "ANÁLISIS FINANCIERO",
    title: "Reportes y Finanzas",
    description: "Dashboards financieros completos con análisis de ventas, gastos, utilidades y métricas clave para tomar decisiones estratégicas informadas.",
    ctaText: "Ver reportes"
  },
  personal: {
    badge: "GESTIÓN DE EQUIPO",
    title: "Administración de Personal",
    description: "Gestiona horarios, turnos y rendimiento de tu equipo. Controla asistencia, asignaciones de zonas y optimiza la productividad del personal.",
    ctaText: "Gestionar personal"
  }
};

export default function RestaurantesPage() {
  const [isMobile, setIsMobile] = useState(false);
  const [isAnnual, setIsAnnual] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category>("dashboard");
  const [contentKey, setContentKey] = useState(0);

  const handleCategoryChange = (category: Category) => {
    setSelectedCategory(category);
    setContentKey(prev => prev + 1);
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Scroll detection for active navigation item
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.querySelector(item.href)).filter(Boolean) as Element[];
      const viewportMiddle = window.scrollY + window.innerHeight / 2;
      const pageHeight = document.documentElement.scrollHeight;
      const bottomOffset = window.innerHeight / 2;

      // If we're near the bottom of the page, always highlight the last section
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

  // Memoized scroll to section function
  const scrollToSection = useCallback((href: string, index: number) => {
    const element = document.querySelector(href);
    if (element) {
      const headerHeight = document.querySelector('header')?.offsetHeight || 0;
      const isMobileDevice = window.innerWidth < 768;
      const extraMargin = isMobileDevice ? 60 : 120;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight + extraMargin;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setActiveIndex(index);
    }
  }, []);

  // Pricing data
  const pricingPlans = {
    esencial: {
      monthly: 20000,
      annual: 192000, // 20,000 * 12 * 0.8 (20% discount)
    },
    profesional: {
      monthly: 35000,
      annual: 336000, // 35,000 * 12 * 0.8 (20% discount)
    },
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <OptimizedFonts />
      
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-transparent py-3 md:py-6">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          {/* Desktop Navigation */}
          <div className="hidden md:flex justify-center">
            <nav className="flex items-center justify-center">
              {/* Apple-style Tab Bar - Center with Brand */}
              <div 
                className="apple-tab-bar px-6 py-2 flex items-center space-x-52 justify-start"
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.75)',
                  color: 'rgba(0, 0, 0, 0.32)',
                  fontFamily: '"Helvetica Neue"',
                  boxShadow: '0px 8px 32px 0px rgba(0, 0, 0, 0.4), 0px 0px 0px 1px rgba(255, 255, 255, 0.1), inset 0px 1px 0px 0px rgba(255, 255, 255, 0.2)'
                }}
              >
                {/* Brand Logo - Left Side of Tab Bar */}
                <div className="flex items-center group cursor-pointer">
                  <a href="/" className="text-center">
                    <h1 className="brand-logo text-xl font-bold tracking-tight">
                      art_ificial
                    </h1>
                  </a>
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
              <a href="/" className="text-left">
                <h1 className="brand-logo text-xl font-bold tracking-tight">
                  art_ificial
                </h1>
              </a>
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

      {/* Hero Section */}
      <section id="hero" className="relative z-10 min-h-[calc(150vh+150px)] md:min-h-screen flex items-center justify-center bg-black overflow-hidden">
        {/* Fondo negro */}
        <div className="absolute inset-0 bg-black" />

        {/* Imágenes en las esquinas */}
        <img 
          src="/restaurantes/image 303.png" 
          alt="" 
          className="absolute top-0 left-0 w-auto h-auto max-w-[200px] md:max-w-[300px] opacity-80 pointer-events-none z-0"
          style={{ transform: 'rotate(-25deg)' }}
        />
        <img 
          src="/restaurantes/image 303.png" 
          alt="" 
          className="absolute top-0 right-0 w-auto h-auto max-w-[200px] md:max-w-[300px] opacity-80 pointer-events-none z-0"
          style={{ transform: 'rotate(18deg)' }}
        />
        <img 
          src="/restaurantes/image 303.png" 
          alt="" 
          className="absolute bottom-0 left-0 w-auto h-auto max-w-[200px] md:max-w-[300px] opacity-80 pointer-events-none z-0"
          style={{ transform: 'rotate(22deg)' }}
        />
        <img 
          src="/restaurantes/image 303.png" 
          alt="" 
          className="absolute bottom-0 right-0 w-auto h-auto max-w-[200px] md:max-w-[300px] opacity-80 pointer-events-none z-0"
          style={{ transform: 'rotate(-28deg)' }}
        />

        <div className="mx-auto max-w-7xl w-full px-4 py-4 md:py-8 md:px-6 relative z-10 flex items-center justify-center">
          <div className="max-w-3xl w-full text-center mx-auto -mt-[150px] md:mt-[clamp(60px,12vh,180px)]">
            <p className="mb-3 md:mb-4 inline-flex items-center gap-1.5 md:gap-2 rounded-full border border-sky-400/60 bg-transparent px-2 md:px-3 py-0.5 md:py-1 text-[10px] md:text-xs font-black text-white shadow-[0_0_40px_rgba(56,189,248,0.2)]">
              <Sparkles className="h-3 w-3 md:h-4 md:w-4 text-sky-400" />
              Soluciones tecnológicas para restaurantes
            </p>

            <h1 className="sm:text-4xl md:text-6xl text-2xl font-semibold tracking-tight text-white">
              Tecnología que vende por ti
            </h1>

            <p className="mt-4 sm:mt-5 text-sm md:text-lg font-semibold text-gray-300">
              Automatizamos pedidos, reservas y fidelización para que tengas más mesas llenas, menos errores y decisiones basadas en datos reales.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row mt-6 sm:mt-8 items-center justify-center">
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
                    Automatiza tu restaurante
                    <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
                      <path d="M5 12h14"></path>
                      <path d="m12 5 7 7-7 7"></path>
                    </svg>
                  </span>
                </button>
              </a>
            </div>

            {/* Text and Arrow below button */}
            <div className="flex flex-col items-center justify-center gap-3 mt-1">
              <p className="text-lg md:text-xl text-gray-300 font-medium">
                Tu restaurante en un solo software
              </p>
              <ChevronDown className="w-6 h-6 text-gray-300 animate-bounce" />
            </div>

            {/* Dashboard Component */}
            <div className="mt-6 md:mt-12 w-full flex justify-center">
              <div className="relative w-[95vw] md:w-[85vw] max-w-[1313px] aspect-[16/8]">
                <div className="relative rounded-3xl border border-black/10 bg-white overflow-hidden w-full h-full aspect-[16/8] transition-all duration-500 animated-colorful-shadow" style={{ minHeight: 'clamp(800px, 80vh, 900px)' }}>
                  <RestaurantDashboard onCategoryChange={handleCategoryChange} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Servicios Section */}
      <section id="servicios" className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:mt-0 pt-4 pb-20 overflow-hidden">
        {/* Header Section */}
        <div className="relative z-10 flex flex-col items-center justify-center gap-4 mb-8 text-center">
          <div>
            <p className="text-sm font-medium text-black/60 mb-2">Lo que ofrecemos</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tighter text-black">
              Servicios para restaurantes
            </h2>
            <p className="mt-3 text-base text-black/70 max-w-2xl mx-auto">
              Herramientas completas para gestionar y optimizar todas las operaciones de tu restaurante con tecnología de vanguardia.
            </p>
          </div>
        </div>

        {/* Services Vertical Layout */}
        <div className="relative z-10 flex flex-col gap-4">
          {/* All Services - Cards */}
          {restaurantServices.map((service, index) => (
            <div
              key={index}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 sm:p-8 bg-white border-black/10 border rounded-[24px] pt-6 pr-6 pb-6 pl-6 items-center max-w-6xl mx-auto"
            >
              {/* Left: Copy adaptado al servicio */}
              <div className="max-w-[620px]">
                <p className="text-sm text-emerald-600 mb-3 font-geist tracking-tight transition-all duration-500 ease-out">
                  {service.badge}
                </p>
                <h2 className="text-[32px] sm:text-5xl md:text-6xl leading-[1.05] tracking-tight font-geist font-semibold text-black transition-all duration-500 ease-out">
                  {service.title}
                </h2>
                <p className="sm:text-base text-sm text-neutral-700 mt-3 font-geist tracking-tight transition-all duration-500 ease-out">
                  {service.description}
                </p>
              </div>

              {/* Right: Visual con imagen del servicio */}
              <div className="relative">
                <div className="absolute inset-4 -z-10 rounded-3xl overflow-hidden opacity-60">
                  {index === 2 ? (
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover"
                      loading="eager"
                    />
                  ) : (
                    <OptimizedGif
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover"
                      priority={index < 3}
                      objectFit="cover"
                    />
                  )}
                </div>
                <div className="relative rounded-3xl border border-black/10 bg-white overflow-hidden backdrop-blur-sm aspect-[4/3]">
                  {index === 2 ? (
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover"
                      loading="eager"
                    />
                  ) : (
                    <OptimizedGif
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover"
                      priority={index < 3}
                      objectFit="cover"
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="isolate overflow-hidden pt-24 pb-24 relative bg-black">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_80%_at_50%_0%,rgba(255,255,255,0.05),transparent_60%)]"></div>

        <div className="z-10 md:px-8 max-w-7xl mr-auto ml-auto pr-6 pl-6 relative">
          <div className="text-center">
            <h2 className="sm:text-5xl text-4xl font-medium text-white tracking-tight">
              Pricing Plans
            </h2>

            <div className="flex mt-6 gap-x-4 gap-y-4 items-center justify-center">
              <span className={`text-sm transition-colors ${!isAnnual ? 'text-white' : 'text-white/50'}`}>
                Mensual
              </span>
              <button
                onClick={() => setIsAnnual(!isAnnual)}
                className="relative inline-flex h-8 w-16 items-center rounded-full bg-white/10 p-1 ring-1 ring-white/15 transition cursor-pointer"
              >
                <span
                  className={`inline-flex h-6 w-6 rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.25)] transition will-change-transform ${
                    isAnnual ? 'translate-x-8' : 'translate-x-0'
                  }`}
                ></span>
              </button>
              <span className={`text-sm transition-colors ${isAnnual ? 'text-white' : 'text-white/50'}`}>
                Anual
                <span
                  className={`ml-2 inline-flex items-center rounded-full bg-amber-400/10 px-2 py-0.5 text-[10px] text-amber-300 ring-1 ring-amber-300/20 transition-opacity ${
                    isAnnual ? 'opacity-100' : 'opacity-50'
                  }`}
                >
                  Ahorra 20%
                </span>
              </span>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-3 mt-10 gap-x-6 gap-y-6">
            {/* Plan Esencial */}
            <div className="border-white/10 border rounded-3xl pt-6 pr-6 pb-6 pl-6 backdrop-blur-xl bg-white/5">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm uppercase tracking-[0.18em] text-white/60">Esencial</div>
                  <div className="mt-2 flex items-end gap-2">
                    <div className="text-4xl font-medium tracking-tight text-white">
                      {isAnnual
                        ? `$${pricingPlans.esencial.annual.toLocaleString('es-CO')}`
                        : `$${pricingPlans.esencial.monthly.toLocaleString('es-CO')}`
                      }
                    </div>
                    <div className="text-sm text-white/50">{isAnnual ? '/año' : '/mes'}</div>
                  </div>
                </div>
              </div>

              <a
                href="https://wa.me/573171053785"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-medium tracking-tight text-black hover:bg-white/90"
              >
                Comenzar ahora
              </a>

              <ul className="mt-6 space-y-3 text-sm text-white/75">
                <li className="flex items-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-emerald-400">
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                  Dashboards en tiempo real
                </li>
                <li className="flex items-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-emerald-400">
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                  Sistema de pedidos completo
                </li>
                <li className="flex items-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-emerald-400">
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                  Comandas digitales
                </li>
                <li className="flex items-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-emerald-400">
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                  Soporte técnico incluido
                </li>
                <li className="flex items-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-emerald-400">
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                  Análisis básico de ventas
                </li>
              </ul>
            </div>

            {/* Plan Profesional - Featured */}
            <div className="border-white/10 border ring-amber-300/10 ring-1 rounded-3xl pt-2 pr-2 pb-2 pl-2 relative backdrop-blur-xl bg-white/5">
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-white/[0.06] to-transparent">
                <div className="absolute inset-0">
                  <div className="h-48 w-full rounded-t-2xl bg-gradient-to-br from-amber-500/20 to-emerald-500/20 opacity-60"></div>
                  <div className="absolute inset-0 bg-[radial-gradient(60%_80%_at_80%_0%,rgba(251,191,36,0.25),transparent_60%)]"></div>
                </div>

                <div className="relative p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-sm uppercase tracking-[0.18em] text-white/70">Profesional</div>
                      <div className="mt-2 flex items-end gap-2">
                        <div className="text-4xl font-medium tracking-tight text-white">
                          {isAnnual
                            ? `$${pricingPlans.profesional.annual.toLocaleString('es-CO')}`
                            : `$${pricingPlans.profesional.monthly.toLocaleString('es-CO')}`
                          }
                        </div>
                        <div className="text-sm text-white/60">{isAnnual ? '/año' : '/mes'}</div>
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-400/15 px-2 py-1 text-[10px] text-amber-300 ring-1 ring-amber-300/25">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
                        <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path>
                      </svg>
                      Más Popular
                    </span>
                  </div>

                  <a
                    href="https://wa.me/573171053785"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-amber-300 to-amber-400 px-4 py-3 text-sm font-medium tracking-tight text-black shadow-[0_10px_30px_rgba(251,191,36,0.25)] hover:from-amber-200 hover:to-amber-300"
                  >
                    Elegir este plan
                  </a>

                  <ul className="mt-6 space-y-3 text-sm text-white/85">
                    <li className="flex items-start gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-emerald-400">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="m9 12 2 2 4-4"></path>
                      </svg>
                      Todo del plan Esencial
                    </li>
                    <li className="flex items-start gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-emerald-400">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="m9 12 2 2 4-4"></path>
                      </svg>
                      Sistema de reservaciones
                    </li>
                    <li className="flex items-start gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-emerald-400">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="m9 12 2 2 4-4"></path>
                      </svg>
                      CRM y programa de fidelización
                    </li>
                    <li className="flex items-start gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-emerald-400">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="m9 12 2 2 4-4"></path>
                      </svg>
                      Bot WhatsApp inteligente
                    </li>
                    <li className="flex items-start gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-emerald-400">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="m9 12 2 2 4-4"></path>
                      </svg>
                      Soporte prioritario 24/7
                    </li>
                    <li className="flex items-start gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-emerald-400">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="m9 12 2 2 4-4"></path>
                      </svg>
                      Análisis avanzado y reportes
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Plan Enterprise */}
            <div className="border-white/10 border rounded-3xl pt-6 pr-6 pb-6 pl-6 backdrop-blur-xl bg-white/5">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm uppercase tracking-[0.18em] text-white/60">Enterprise</div>
                  <div className="mt-2 flex items-end gap-2">
                    <div className="text-4xl font-medium tracking-tight text-white">Personalizado</div>
                    <div className="text-sm text-white/50">{isAnnual ? '/año' : '/mes'}</div>
                  </div>
                </div>
              </div>

              <a
                href="https://wa.me/573171053785"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-medium tracking-tight text-white/90 hover:bg-white/10"
              >
                Contactar ventas
              </a>

              <ul className="mt-6 space-y-3 text-sm text-white/75">
                <li className="flex items-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-emerald-400">
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                  Todo del plan Profesional
                </li>
                <li className="flex items-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-emerald-400">
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                  Múltiples ubicaciones
                </li>
                <li className="flex items-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-emerald-400">
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                  Bot WhatsApp avanzado con IA
                </li>
                <li className="flex items-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-emerald-400">
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                  Integraciones personalizadas
                </li>
                <li className="flex items-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-emerald-400">
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                  Gerente de cuenta dedicado
                </li>
                <li className="flex items-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-emerald-400">
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                  Capacitación y onboarding
                </li>
              </ul>
            </div>
          </div>

          <p className="text-xs text-white/50 text-center mt-6">
            Todos los planes incluyen prueba gratuita de 14 días. Sin costos de configuración.
          </p>
        </div>
      </section>

      {/* Contáctanos Section */}
      <section id="contactanos" className="py-20 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl border border-black/10 bg-white text-black p-6 sm:p-8 md:p-12">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_20%_-20%,rgba(255,255,255,0.07),transparent_60%)]"></div>
              <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_80%_120%,rgba(255,255,255,0.06),transparent_60%)]"></div>
              <div className="absolute inset-0 bg-[radial-gradient(#ffffff0d_1px,transparent_1px)] [background-size:20px_20px] opacity-[0.15]"></div>
            </div>

            <div className="relative">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl leading-[0.9] font-semibold tracking-tight mb-8">
                Contáctanos <span className="text-black/60">:)</span>
              </h2>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 md:divide-x md:divide-white/10">
                <div>
                  <p className="text-sm text-black/60 mb-2">Email</p>
                  <a
                    href="mailto:contacto@artiificial.art"
                    className="mt-2 inline-flex items-center gap-3 text-xl sm:text-2xl font-medium tracking-tight hover:text-black/80 transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                    <span className="break-all">contacto@artiificial.art</span>
                  </a>
                </div>

                <div className="md:pl-8">
                  <p className="text-sm text-black/60 mb-2">Agenda una llamada</p>
                  <a
                    href="https://calendly.com/artificial-company-local/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium tracking-tight text-gray-900 bg-white hover:bg-white/90 border border-white/10 mt-2 transition-colors"
                  >
                    <CalendarIcon className="w-4 h-4" />
                    <span>Book a call</span>
                  </a>
                </div>
              </div>

              <p className="mt-6 text-center text-[11px] text-black/60">
                © <span id="year">2025</span> — Disponible para proyectos
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

