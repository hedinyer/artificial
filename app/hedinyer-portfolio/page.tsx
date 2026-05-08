"use client";

import Image from "next/image";
import { useState } from "react";
import RestaurantDashboard from "../restaurantes/restaurant-dashboard";
import AIAutomationShowcase from "./components/AIAutomationShowcase";
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

const operationsBusinesses = [
  {
    name: "Churrydeditos",
    logo: "/companys/operaciones/churrideditos.jpg",
    sector: "Food service",
    challenge:
      "La operación diaria dependía de coordinación manual entre pedidos, atención, puntos de venta y reportes para dirección.",
    whatWasBuilt: [
      "App operativa con IA para toma y trazabilidad de pedidos.",
      "Flujos de atención al cliente con priorización automática y contexto por conversación.",
      "Panel de control para puntos de venta con consolidación en tiempo real.",
      "Reportes ejecutivos y proyecciones de demanda para planeación semanal.",
    ],
    impact: [
      "Menos tareas repetitivas en operación y backoffice.",
      "Visibilidad diaria para dirección en un solo tablero.",
      "Mejor coordinación entre atención, ventas y despacho.",
    ],
    stack: ["Agentes IA", "Dashboards", "Automatizaciones", "Reporting"],
  },
  {
    name: "Unisantander SAS",
    logo: "/companys/operaciones/unisantander.webp",
    sector: "Ecommerce retail",
    challenge:
      "La tienda necesitaba escalar despacho e inventario sin caer en sobrecompra ni quiebres de stock.",
    whatWasBuilt: [
      "Orquestación con agentes de IA para despacho y seguimiento de órdenes.",
      "Modelo de proyección de inventario por rotación y estacionalidad.",
      "Reglas automáticas de reposición para proteger margen y disponibilidad.",
      "Reportes de desempeño logístico y comercial para decisiones semanales.",
    ],
    impact: [
      "Mayor rotación sin estancamiento de mercancía.",
      "Menor riesgo de sobreinventario y compras innecesarias.",
      "Operación de despacho más estable en picos de demanda.",
    ],
    stack: ["Agentes IA", "Forecasting", "Inventario", "Ecommerce Ops"],
  },
  {
    name: "Vierco SAS",
    logo: "/companys/operaciones/vierco sas.avif",
    sector: "Manufactura de calzado",
    challenge:
      "La trazabilidad entre captación, ventas, producción y despacho estaba fragmentada en múltiples canales.",
    whatWasBuilt: [
      "Flujos agenticos para captación de clientes y preclasificación comercial.",
      "Integración de ecommerce con tablero operativo de ventas y producción.",
      "Seguimiento de órdenes desde toma de pedido hasta despacho final.",
      "Reportes de trazabilidad operativa por etapa y responsables.",
    ],
    impact: [
      "Mayor control de extremo a extremo del ciclo operativo.",
      "Mejor sincronía entre producción, ventas y logística.",
      "Menos fricción para priorizar pedidos y entregas.",
    ],
    stack: ["Ecommerce", "Servicios agenticos", "Trazabilidad", "KPIs"],
  },
  {
    name: "Servileon SAS",
    logo: "/companys/operaciones/servileon.webp",
    sector: "Seguridad privada",
    challenge:
      "Los vigilantes reportaban novedades en formatos dispersos, dificultando seguimiento e historial de incidentes.",
    whatWasBuilt: [
      "Herramientas agenticas para reportar incidentes en campo desde móvil.",
      "Registro estructurado de entradas, salidas y eventos por unidad residencial.",
      "Consolidación automática de novedades para coordinación operativa.",
      "Panel de reportes con trazabilidad diaria para supervisión y auditoría.",
    ],
    impact: [
      "Reportes más consistentes y auditables en menos tiempo.",
      "Mejor visibilidad para supervisores sobre eventos críticos.",
      "Operación en campo con información contextual y oportuna.",
    ],
    stack: ["Mobile ops", "Reportes IA", "Trazabilidad", "Supervisión"],
  },
];

const menuAnalyticsBusinesses = [
  {
    name: "La Troipicana Restaurant",
    logo: "/companys/analiticamenu/latropicana.webp",
    location: "Hamburgo, Alemania",
    challenge:
      "Necesitaban entender qué platos impulsaban margen real y cuáles frenaban la rotación de inventario.",
    solutions: [
      "Analítica de menú por contribución y frecuencia de venta.",
      "Clasificación de productos por desempeño y rentabilidad.",
      "Alertas de inventario para productos críticos y baja rotación.",
      "Proyecciones semanales por franja horaria y tipo de ticket.",
    ],
    results: [
      "Mejor priorización de platos de alta contribución.",
      "Compras más ajustadas a demanda real.",
      "Menos desperdicio en insumos de baja salida.",
    ],
    stack: ["BI operativo", "Forecasting", "Inventario", "Reporting"],
  },
  {
    name: "Korfu Grill Lüneburg",
    logo: "/companys/analiticamenu/korfu.avif",
    location: "Hamburgo, Alemania",
    challenge:
      "El equipo operaba con decisiones manuales de compra y producción sin visibilidad de patrones por horario.",
    solutions: [
      "Tablero de rendimiento de productos por día y turno.",
      "Modelo de demanda para preparación y compras preventivas.",
      "Control de stock con umbrales dinámicos por categoría.",
      "Reportes ejecutivos de ventas, costos y rotación.",
    ],
    results: [
      "Mayor estabilidad en disponibilidad de productos clave.",
      "Menos quiebres de stock en horas pico.",
      "Planeación operativa más precisa para cocina y caja.",
    ],
    stack: ["Dashboards", "Predicción", "Stock inteligente", "KPIs"],
  },
  {
    name: "Rossio Tapas e Vinho",
    logo: "/companys/analiticamenu/rossio.avif",
    location: "Hamburgo, Alemania",
    challenge:
      "El crecimiento del menú elevó la complejidad operativa y dificultó medir qué combinaciones eran más rentables.",
    solutions: [
      "Matriz de desempeño de menú por plato, combo y horario.",
      "Seguimiento de costo de insumos y variación por temporada.",
      "Optimización de inventario para proteger margen sin sobrecompra.",
      "Panel de proyección de ventas para planificación semanal.",
    ],
    results: [
      "Mejor control del margen por categoría de producto.",
      "Menor sobreinventario en referencias de rotación lenta.",
      "Decisiones comerciales con evidencia diaria.",
    ],
    stack: ["Analítica de menú", "Margen", "Inventario", "Proyección"],
  },
  {
    name: "Ollita Peruana",
    logo: "/companys/analiticamenu/ollitaperuana.avif",
    location: "Hamburgo, Alemania",
    challenge:
      "Requerían visibilidad continua sobre rotación de platos y consumo de insumos para escalar sin perder control.",
    solutions: [
      "Indicadores de venta por producto y comportamiento de demanda.",
      "Monitoreo de consumo para compras y reposición más precisas.",
      "Análisis de estacionalidad para ajustar producción.",
      "Reportes de operación para coordinación de cocina y administración.",
    ],
    results: [
      "Rotación más saludable en líneas estratégicas.",
      "Compras mejor sincronizadas con ventas reales.",
      "Menos fricción entre operación diaria y planeación.",
    ],
    stack: ["Demand analytics", "Reposición", "Estacionalidad", "BI"],
  },
  {
    name: "Ngan Tiah Vietnamisisches Restaurant",
    logo: "/companys/analiticamenu/ngan tiah.png",
    location: "Hamburgo, Alemania",
    challenge:
      "El negocio necesitaba estandarizar su lectura de datos para equilibrar stock, costos y ventas en un solo flujo.",
    solutions: [
      "Dashboard único de menú, inventario y desempeño comercial.",
      "Alertas sobre productos de alto riesgo de quiebre o sobrestock.",
      "Proyecciones por día de semana para compras tácticas.",
      "Consolidación de reportes para seguimiento de gerencia.",
    ],
    results: [
      "Mayor trazabilidad de punta a punta en operación gastronómica.",
      "Reducción de decisiones reactivas en compras.",
      "Mayor consistencia en resultados semanales.",
    ],
    stack: ["Data ops", "Alertas", "Forecast", "Control gerencial"],
  },
];

const restaurantServices = [
  {
    title: "Dashboards Inteligentes",
    description:
      "Paneles con métricas en tiempo real para ventas, inventario y operación diaria.",
    image: "/restaurantes/1.png",
    badge: "ANÁLISIS EN TIEMPO REAL",
  },
  {
    title: "Sistema de Pedidos",
    description:
      "Gestión integral de pedidos presenciales y online con seguimiento en cada etapa.",
    image: "/restaurantes/2.png",
    badge: "AUTOMATIZACIÓN",
  },
  {
    title: "Reservaciones Online",
    description:
      "Reservas con confirmaciones automáticas para mejorar ocupación y reducir no-shows.",
    image: "/restaurantes/3.png",
    badge: "GESTIÓN INTELIGENTE",
  },
  {
    title: "Comandas Digitales",
    description:
      "Órdenes directas a cocina para acelerar el servicio y reducir errores operativos.",
    image: "/restaurantes/4.png",
    badge: "EFICIENCIA",
  },
  {
    title: "CRM y Fidelización",
    description:
      "Campañas y promociones segmentadas para aumentar recurrencia y ticket promedio.",
    image: "/restaurantes/5.png",
    badge: "FIDELIZACIÓN",
  },
  {
    title: "Bot WhatsApp",
    description:
      "Atención automatizada 24/7 para pedidos, reservas y preguntas frecuentes.",
    image: "/restaurantes/6.png",
    badge: "AUTOMATIZACIÓN IA",
  },
];

const aiTools = [
  {
    name: "LangGraph",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons/icons/langgraph.svg",
  },
  {
    name: "LangChain",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons/icons/langchain.svg",
  },
  {
    name: "Pinecone",
    logo: "https://www.pinecone.io/favicon.ico",
  },
  {
    name: "OpenAI",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons/icons/openai.svg",
  },
  {
    name: "Anthropic",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons/icons/anthropic.svg",
  },
  {
    name: "n8n",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons/icons/n8n.svg",
  },
  {
    name: "Qdrant",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons/icons/qdrant.svg",
  },
  {
    name: "Weights & Biases",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons/icons/weightsandbiases.svg",
  },
  {
    name: "Power BI",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons/icons/powerbi.svg",
  },
  {
    name: "Tableau",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons/icons/tableau.svg",
  },
  {
    name: "Looker",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons/icons/looker.svg",
  },
  {
    name: "BigQuery",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons/icons/googlebigquery.svg",
  },
  {
    name: "Snowflake",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons/icons/snowflake.svg",
  },
  {
    name: "dbt",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons/icons/dbt.svg",
  },
  {
    name: "Apache Spark",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons/icons/apachespark.svg",
  },
  {
    name: "Apache Airflow",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons/icons/apacheairflow.svg",
  },
  {
    name: "Python",
    logo: "https://cdn.jsdelivr.net/npm/devicon@2.17.0/icons/python/python-original.svg",
  },
  {
    name: "Pandas",
    logo: "https://cdn.jsdelivr.net/npm/devicon@2.17.0/icons/pandas/pandas-original.svg",
  },
  {
    name: "NumPy",
    logo: "https://cdn.jsdelivr.net/npm/devicon@2.17.0/icons/numpy/numpy-original.svg",
  },
  {
    name: "R",
    logo: "https://cdn.jsdelivr.net/npm/devicon@2.17.0/icons/r/r-original.svg",
  },
  {
    name: "SQL",
    logo: "https://cdn.jsdelivr.net/npm/devicon@2.17.0/icons/mysql/mysql-original.svg",
  },
  {
    name: "PostgreSQL",
    logo: "https://cdn.jsdelivr.net/npm/devicon@2.17.0/icons/postgresql/postgresql-original.svg",
  },
  {
    name: "DuckDB",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons/icons/duckdb.svg",
  },
  {
    name: "Databricks",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons/icons/databricks.svg",
  },
];

type ToolLogoProps = {
  name: string;
  logo: string;
};

function getToolFallbackDataUri(name: string): string {
  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28">
  <rect width="28" height="28" rx="6" fill="#1f2937" />
  <text x="50%" y="55%" text-anchor="middle" dominant-baseline="middle" font-size="10" font-family="Arial, sans-serif" fill="#f9fafb">${initials}</text>
</svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

function ToolLogo({ name, logo }: ToolLogoProps) {
  const [src, setSrc] = useState(logo);

  return (
    <img
      src={src}
      alt={name}
      className="hp-tool-logo"
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
      onError={() => {
        if (!src.startsWith("data:image/svg+xml")) {
          setSrc(getToolFallbackDataUri(name));
        }
      }}
    />
  );
}

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
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="hp-hero-glow" />
        <div className="relative mx-auto max-w-7xl px-6 pt-24 pb-32 md:pt-32 md:pb-40">
          <div className="grid gap-16 md:grid-cols-12">
            <div className="md:col-span-8 md:col-start-3 text-center">
              <p
                className="hp-label-caps mb-6"
                style={{ color: "var(--hp-text-secondary)" }}
              >
                Portafolio de Hedinyer Perucho
              </p>

              <h1 className="hp-display mb-8 max-w-4xl mx-auto">
                Este es mi portafolio de{" "}
                <span style={{ fontStyle: "italic", color: "var(--hp-tertiary)" }}>
                  IA, datos
                </span>{" "}
                y automatización.
              </h1>

              <p
                className="hp-body-lg mb-10 max-w-2xl mx-auto"
                style={{ color: "var(--hp-text-secondary)" }}
              >
                Soy Hedinyer Perucho. Aquí comparto proyectos, implementaciones y
                resultados reales en ingeniería de datos, IA agéntica y
                automatización de procesos para negocio.
              </p>

              <div className="mb-10 flex justify-center">
                <div className="flex w-[220px] flex-col items-center">
                  <div className="h-[220px] w-[220px] overflow-hidden rounded-full border-2 border-dashed border-gray-300 bg-white">
                    <Image
                      src="/me/hedinyer2.jpeg"
                      alt="Foto de Hedinyer Perucho"
                      width={220}
                      height={220}
                      className="h-full w-full object-cover"
                      priority
                    />
                  </div>
                </div>
              </div>

              <div className="hp-tools-marquee" aria-label="Herramientas de IA agéntica">
                <div className="hp-tools-track">
                  {[...aiTools, ...aiTools].map((tool, index) => (
                    <div key={`${tool.name}-${index}`} className="hp-tool-pill">
                      <ToolLogo name={tool.name} logo={tool.logo} />
                      <span className="hp-mono-sm">{tool.name}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Automatización de operaciones y reporting */}
      <section id="operaciones-reporting" className="relative py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-14 max-w-3xl">
            <p
              className="hp-label-caps mb-4"
              style={{ color: "var(--hp-text-secondary)" }}
            >
              § 02 — Automatización y reporting
            </p>
            <h2 className="hp-h1 mb-4">Operaciones conectadas para crecer.</h2>
            <p
              className="hp-body-lg"
              style={{ color: "var(--hp-text-secondary)" }}
            >
              Implementación de flujos automáticos de operación, seguimiento y
              reportes ejecutivos para negocios que necesitan velocidad,
              visibilidad y control diario.
            </p>
          </div>

          <div className="mb-10">
            <AIAutomationShowcase />
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {operationsBusinesses.map((business) => (
              <article
                key={business.name}
                className="hp-card-project hp-operations-case flex min-h-[660px] flex-col"
              >
                <p className="hp-label-caps mb-3" style={{ color: "var(--hp-tertiary)" }}>
                  Negocio
                </p>
                <div className="hp-company-logo-wrap mb-4">
                  <Image
                    src={business.logo}
                    alt={`Logo de ${business.name}`}
                    width={220}
                    height={96}
                    className="hp-company-logo"
                  />
                </div>
                <h3 className="hp-h3 mb-3">{business.name}</h3>
                <p className="hp-mono-sm mb-4" style={{ color: "var(--hp-text-muted)" }}>
                  {business.sector}
                </p>
                <p className="hp-body-sm mb-5" style={{ color: "var(--hp-text-secondary)" }}>
                  {business.challenge}
                </p>

                <div className="mb-5">
                  <p className="hp-label-caps mb-2" style={{ color: "var(--hp-on-primary)" }}>
                    Qué se implementó
                  </p>
                  <ul className="space-y-2">
                    {business.whatWasBuilt.map((item) => (
                      <li
                        key={`${business.name}-build-${item}`}
                        className="hp-body-sm"
                        style={{ color: "var(--hp-text-secondary)" }}
                      >
                        - {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-5">
                  <p className="hp-label-caps mb-2" style={{ color: "var(--hp-on-primary)" }}>
                    Impacto operativo
                  </p>
                  <ul className="space-y-2">
                    {business.impact.map((item) => (
                      <li
                        key={`${business.name}-impact-${item}`}
                        className="hp-body-sm"
                        style={{ color: "var(--hp-text-secondary)" }}
                      >
                        - {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto flex flex-wrap gap-2">
                  {business.stack.map((item) => (
                    <span
                      key={`${business.name}-stack-${item}`}
                      className="hp-tag-tech"
                      style={{ borderRadius: "var(--hp-rounded-full)" }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Analítica de menú, productos, inventario y proyecciones */}
      <section id="analitica-gastronomica" className="relative py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="hp-restaurant-hero mb-16">
            <p className="hp-label-caps mb-4" style={{ color: "var(--hp-tertiary)" }}>
              Inicio
            </p>
            <h3 className="hp-h2 mb-4">Tecnología que vende por ti</h3>
            <p className="hp-body-lg mb-6" style={{ color: "var(--hp-text-secondary)" }}>
              Automatizamos pedidos, reservas y fidelización para tener más mesas
              llenas, menos errores y decisiones basadas en datos reales.
            </p>
            <div className="flex flex-wrap gap-3">
              {[
                "Pedidos automatizados",
                "Reservas inteligentes",
                "Fidelización de clientes",
                "Decisiones con data",
              ].map((item) => (
                <span key={item} className="hp-tag-tech">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="hp-program-hero mb-16">
            <p className="hp-label-caps mb-4" style={{ color: "var(--hp-text-secondary)" }}>
              Programa en vivo
            </p>
            <h3 className="hp-h2 mb-4">Dashboard operativo para restaurantes</h3>
            <p className="hp-body-md mb-6" style={{ color: "var(--hp-text-secondary)" }}>
              Vista integral de mesas, pedidos, inventario, finanzas y personal en un
              solo entorno.
            </p>
            <div className="hp-program-shell">
              <RestaurantDashboard />
            </div>
          </div>

          <div className="mb-14 max-w-3xl">
            <p
              className="hp-label-caps mb-4"
              style={{ color: "var(--hp-text-secondary)" }}
            >
              § 03 — Analítica gastronómica
            </p>
            <h2 className="hp-h1 mb-4">
              Menú, producto e inventario con visión predictiva.
            </h2>
            <p
              className="hp-body-lg"
              style={{ color: "var(--hp-text-secondary)" }}
            >
              Modelos de analítica para optimizar desempeño del menú, rotación de
              inventario y proyecciones de ventas por categoría, ticket y horarios.
            </p>
          </div>

          <div className="mb-16">
            <p className="hp-label-caps mb-6" style={{ color: "var(--hp-text-secondary)" }}>
              Servicios
            </p>
            <div className="grid gap-6 md:grid-cols-2">
              {restaurantServices.map((service) => (
                <article key={service.title} className="hp-service-card">
                  <div className="hp-service-media">
                    <Image
                      src={service.image}
                      alt={service.title}
                      width={640}
                      height={360}
                      className="hp-service-image"
                    />
                  </div>
                  <div>
                    <p className="hp-label-caps mb-2" style={{ color: "var(--hp-tertiary)" }}>
                      {service.badge}
                    </p>
                    <h3 className="hp-h3 mb-3">{service.title}</h3>
                    <p className="hp-body-sm" style={{ color: "var(--hp-text-secondary)" }}>
                      {service.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {menuAnalyticsBusinesses.map((business) => (
              <article
                key={business.name}
                className="hp-analytics-card hp-analytics-case flex min-h-[640px] flex-col"
              >
                <div className="hp-company-logo-wrap mb-4">
                  <Image
                    src={business.logo}
                    alt={`Logo de ${business.name}`}
                    width={220}
                    height={96}
                    className="hp-company-logo"
                  />
                </div>
                <h3 className="hp-h3 mb-2">{business.name}</h3>
                <p className="hp-mono-sm mb-4" style={{ color: "var(--hp-text-muted)" }}>
                  {business.location}
                </p>

                <p className="hp-body-sm mb-5" style={{ color: "var(--hp-text-secondary)" }}>
                  {business.challenge}
                </p>

                <div className="mb-5">
                  <p className="hp-label-caps mb-2" style={{ color: "var(--hp-on-primary)" }}>
                    Solución implementada
                  </p>
                  <ul className="space-y-2">
                    {business.solutions.map((item) => (
                      <li
                        key={`${business.name}-solution-${item}`}
                        className="hp-body-sm"
                        style={{ color: "var(--hp-text-secondary)" }}
                      >
                        - {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-5">
                  <p className="hp-label-caps mb-2" style={{ color: "var(--hp-on-primary)" }}>
                    Resultado
                  </p>
                  <ul className="space-y-2">
                    {business.results.map((item) => (
                      <li
                        key={`${business.name}-result-${item}`}
                        className="hp-body-sm"
                        style={{ color: "var(--hp-text-secondary)" }}
                      >
                        - {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto flex flex-wrap gap-2">
                  {business.stack.map((item) => (
                    <span
                      key={`${business.name}-stack-${item}`}
                      className="hp-tag-tech"
                      style={{ borderRadius: "var(--hp-rounded-full)" }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
