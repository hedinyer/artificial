"use client";

import { useEffect, useState, memo } from "react";
import OptimizedFonts from "../components/OptimizedFonts";
import LightRays from "../components/LightRays";
import OptimizedGif from "../components/OptimizedGif";
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
  Sparkles
} from "lucide-react";

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

export default function RestaurantesPage() {
  const [isMobile, setIsMobile] = useState(false);
  const [isAnnual, setIsAnnual] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
    <div className="min-h-screen bg-black text-white">
      <OptimizedFonts />
      
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-transparent py-3 md:py-6">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between">
            <a href="/" className="text-xl font-bold tracking-tight hover:opacity-80 transition-opacity">
              art_ificial
            </a>
            <nav className="hidden md:flex items-center space-x-6">
              <a href="/" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                Inicio
              </a>
              <button 
                onClick={() => scrollToSection('servicios')}
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                Servicios
              </button>
              <button 
                onClick={() => scrollToSection('pricing')}
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                Pricing
              </button>
              <button 
                onClick={() => scrollToSection('contactanos')}
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                Contáctanos
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="relative z-10 min-h-screen flex items-center justify-center">
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
              Soluciones tecnológicas para restaurantes
            </p>

            <h1 className="sm:text-5xl md:text-7xl text-4xl font-semibold tracking-tight text-white">
              Transforma tu restaurante con tecnología inteligente
            </h1>

            <p className="mt-8 sm:mt-5 text-base md:text-lg text-slate-300">
              Desde pedidos y reservas hasta dashboards y automatización. Hacemos que tu restaurante opere como un negocio de clase mundial.
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
                    Cuéntanos tu restaurante
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

      {/* Servicios Section */}
      <section id="servicios" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:mt-0 pt-4 pb-20">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <p className="text-sm font-medium text-white/50 mb-2">Lo que ofrecemos</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tighter text-white">
              Servicios para restaurantes
            </h2>
            <p className="mt-3 text-base text-white/70 max-w-2xl">
              Herramientas completas para gestionar y optimizar todas las operaciones de tu restaurante con tecnología de vanguardia.
            </p>
          </div>
        </div>

        {/* Services Vertical Layout */}
        <div className="flex flex-col gap-4">
          {/* All Services - Vertical Cards */}
          {restaurantServices.map((service, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-lg border border-white/10 bg-white/5 hover:border-white/20 transition-all duration-300 h-[280px] md:h-[320px]"
            >
              <div className="flex flex-col md:flex-row h-full">
                {/* Image Section */}
                <div className="relative w-full md:w-1/3 h-full">
                  <OptimizedGif
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                    priority={index < 2}
                    objectFit="cover"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:bg-gradient-to-r md:from-black/60 md:via-transparent"></div>
                </div>
                
                {/* Content Section */}
                <div className="flex-1 p-4 sm:p-6 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="inline-flex items-center gap-0.5 rounded-full border border-emerald-500/30 bg-emerald-500/15 px-2 py-1 text-[9px] sm:text-[10px] font-medium text-emerald-300">
                        {service.badge}
                      </span>
                      <span className="inline-flex items-center rounded-full border border-emerald-500/30 bg-emerald-500/15 px-2 py-1 text-[9px] font-medium text-emerald-300">
                        IA
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-medium tracking-tight text-white mb-2">
                      {service.title}
                    </h3>
                    <p className="text-sm sm:text-base text-white/70 leading-relaxed mb-4">
                      {service.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href="https://wa.me/573171053785"
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-black bg-emerald-500 rounded-md px-4 py-2 hover:bg-emerald-400 transition-all duration-200"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        className="h-3.5 w-3.5">
                        <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"></path>
                        <path d="m21.854 2.147-10.94 10.939"></path>
                      </svg>
                      {service.ctaText}
                    </a>
                    <a
                      href="https://wa.me/573171053785"
                      className="inline-flex items-center justify-center gap-1 rounded-md border border-white/10 bg-white/5 px-4 py-2 text-xs sm:text-sm font-medium text-white/90 backdrop-blur hover:bg-white/10 hover:text-white transition-all duration-200"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Más información
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        className="h-3.5 w-3.5">
                        <path d="M5 12h14"></path>
                        <path d="m12 5 7 7-7 7"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="isolate overflow-hidden pt-24 pb-24 relative">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_80%_at_50%_0%,rgba(255,255,255,0.05),transparent_60%)]"></div>

        <div className="z-10 md:px-8 max-w-7xl mr-auto ml-auto pr-6 pl-6 relative">
          <div className="text-center">
            <h2 className="sm:text-5xl text-4xl font-medium text-white tracking-tight">
              Pricing Plans
            </h2>

            <div className="flex mt-6 gap-x-4 gap-y-4 items-center justify-center">
              <span className={`text-sm transition-colors ${!isAnnual ? 'text-white' : 'text-white/70'}`}>
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
              <span className={`text-sm transition-colors ${isAnnual ? 'text-white' : 'text-white/70'}`}>
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
            <div className="border-white/10 border rounded-3xl pt-6 pr-6 pb-6 pl-6 backdrop-blur-xl">
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
            <div className="border-white/10 border ring-amber-300/10 ring-1 rounded-3xl pt-2 pr-2 pb-2 pl-2 relative backdrop-blur-xl">
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
            <div className="border-white/10 border rounded-3xl pt-6 pr-6 pb-6 pl-6 backdrop-blur-xl">
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
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-neutral-950 text-white p-6 sm:p-8 md:p-12">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_20%_-20%,rgba(255,255,255,0.07),transparent_60%)]"></div>
              <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_80%_120%,rgba(255,255,255,0.06),transparent_60%)]"></div>
              <div className="absolute inset-0 bg-[radial-gradient(#ffffff0d_1px,transparent_1px)] [background-size:20px_20px] opacity-[0.15]"></div>
            </div>

            <div className="relative">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl leading-[0.9] font-semibold tracking-tight mb-8">
                Contáctanos <span className="text-white/70">:)</span>
              </h2>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 md:divide-x md:divide-white/10">
                <div>
                  <p className="text-sm text-white/70 mb-2">Email</p>
                  <a
                    href="mailto:contacto@artiificial.art"
                    className="mt-2 inline-flex items-center gap-3 text-xl sm:text-2xl font-medium tracking-tight hover:text-white/80 transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                    <span className="break-all">contacto@artiificial.art</span>
                  </a>
                </div>

                <div className="md:pl-8">
                  <p className="text-sm text-white/70 mb-2">Agenda una llamada</p>
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

              <p className="mt-6 text-center text-[11px] text-white/60">
                © <span id="year">2025</span> — Disponible para proyectos
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

