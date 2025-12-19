"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  UtensilsCrossed,
  Receipt,
  Package,
  CreditCard,
  Users,
  Search,
  Bell,
  Plus,
  UserCircle,
  Menu,
} from "lucide-react";
import DashboardPage from "./components/DashboardPage";
import MesasPage from "./components/MesasPage";
import PedidosPage from "./components/PedidosPage";
import InventarioPage from "./components/InventarioPage";
import FinanzasPage from "./components/FinanzasPage";
import PersonalPage from "./components/PersonalPage";

type Page = "dashboard" | "mesas" | "pedidos" | "inventario" | "finanzas" | "personal";

interface RestaurantDashboardProps {
  onCategoryChange?: (category: Page) => void;
}

const pages: Page[] = ["dashboard", "mesas", "pedidos", "inventario", "finanzas", "personal"];

export default function RestaurantDashboard({ onCategoryChange }: RestaurantDashboardProps = {}) {
  const [activePage, setActivePage] = useState<Page>("dashboard");
  const [isLoaded, setIsLoaded] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Auto-play carousel effect
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % pages.length;
        const nextPage = pages[nextIndex];
        
        setIsTransitioning(true);
        setTimeout(() => {
          setActivePage(nextPage);
          onCategoryChange?.(nextPage);
          setTimeout(() => setIsTransitioning(false), 300);
        }, 150);
        
        return nextIndex;
      });
    }, 5000); // Cambia cada 5 segundos

    return () => clearInterval(interval);
  }, [isAutoPlaying, onCategoryChange]);

  const handlePageChange = (page: Page) => {
    if (page === activePage) return;
    setIsAutoPlaying(false); // Pausa el auto-play cuando el usuario selecciona manualmente
    const newIndex = pages.indexOf(page);
    if (newIndex === -1) return;
    
    setIsTransitioning(true);
    setCurrentIndex(newIndex);
    setTimeout(() => {
      setActivePage(page);
      onCategoryChange?.(page);
      setTimeout(() => setIsTransitioning(false), 300);
    }, 150);
    
    // Reanuda el auto-play después de 8 segundos de inactividad
    setTimeout(() => {
      setIsAutoPlaying(true);
    }, 8000);
  };

  const pageTitles: Record<Page, string> = {
    dashboard: "Panel Principal",
    mesas: "Gestión de Mesas",
    pedidos: "Gestión de Pedidos",
    inventario: "Inventario",
    finanzas: "Finanzas",
    personal: "Personal",
  };

  const renderPage = () => {
    switch(activePage) {
      case "dashboard":
        return <DashboardPage />;
      case "mesas":
        return <MesasPage />;
      case "pedidos":
        return <PedidosPage />;
      case "inventario":
        return <InventarioPage />;
      case "finanzas":
        return <FinanzasPage />;
      case "personal":
        return <PersonalPage />;
      default:
        return <DashboardPage />;
    }
  };
  return (
    <div className={`flex h-full w-full overflow-hidden bg-white relative ${isLoaded ? 'animate-fadeIn' : 'opacity-0'}`}>
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-purple-50/50 animate-gradient-shift pointer-events-none" />
      
      <aside className="hidden w-48 flex-col border-r border-border bg-white/95 backdrop-blur-sm lg:flex relative z-10 shadow-lg">
        <div className="flex flex-col h-full p-2">
          <div className={`flex items-center gap-2 px-2 pb-3 pt-2 group ${isLoaded ? 'animate-slideInLeft' : ''}`}>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-300 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
              <UtensilsCrossed className="h-4 w-4 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-sm font-bold leading-none text-foreground group-hover:text-primary transition-colors duration-300">Sabor &amp; Frescura</h1>
              <span className="text-[10px] text-muted-foreground">Gestión Integral</span>
            </div>
          </div>
          <nav className="flex flex-1 flex-col gap-1 relative">
            <button 
              onClick={() => handlePageChange("dashboard")}
              className={`group relative flex items-center gap-2 rounded-lg px-2 py-1.5 transition-all duration-300 ease-out overflow-hidden ${
                activePage === "dashboard" 
                  ? "bg-gradient-to-r from-primary/10 to-primary/5 text-accent-foreground scale-[1.02] shadow-lg shadow-primary/20" 
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground hover:scale-[1.01] hover:shadow-md"
              }`}
            >
              {activePage === "dashboard" && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 animate-shimmer" />
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-primary/60 rounded-r-full shadow-lg shadow-primary/50" />
                </>
              )}
              <LayoutDashboard className={`h-3.5 w-3.5 transition-all duration-300 relative z-10 ${
                activePage === "dashboard" 
                  ? "scale-110 text-primary drop-shadow-sm" 
                  : "group-hover:scale-110 group-hover:rotate-12"
              }`} />
              <span className={`text-xs font-medium transition-all duration-300 relative z-10 ${
                activePage === "dashboard" ? "font-semibold" : ""
              }`}>Dashboard</span>
            </button>
            <button 
              onClick={() => handlePageChange("mesas")}
              className={`group relative flex items-center gap-2 rounded-lg px-2 py-1.5 transition-all duration-300 ease-out overflow-hidden ${
                activePage === "mesas" 
                  ? "bg-gradient-to-r from-primary/10 to-primary/5 text-accent-foreground scale-[1.02] shadow-lg shadow-primary/20" 
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground hover:scale-[1.01] hover:shadow-md"
              }`}
            >
              {activePage === "mesas" && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 animate-shimmer" />
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-primary/60 rounded-r-full shadow-lg shadow-primary/50" />
                </>
              )}
              <UtensilsCrossed className={`h-3.5 w-3.5 transition-all duration-300 relative z-10 ${
                activePage === "mesas" 
                  ? "scale-110 text-primary drop-shadow-sm" 
                  : "group-hover:scale-110 group-hover:rotate-12"
              }`} />
              <span className={`text-xs font-medium transition-all duration-300 relative z-10 ${
                activePage === "mesas" ? "font-semibold" : ""
              }`}>Mesas</span>
            </button>
            <button 
              onClick={() => handlePageChange("pedidos")}
              className={`group relative flex items-center gap-2 rounded-lg px-2 py-1.5 transition-all duration-300 ease-out overflow-hidden ${
                activePage === "pedidos" 
                  ? "bg-gradient-to-r from-primary/10 to-primary/5 text-accent-foreground scale-[1.02] shadow-lg shadow-primary/20" 
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground hover:scale-[1.01] hover:shadow-md"
              }`}
            >
              {activePage === "pedidos" && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 animate-shimmer" />
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-primary/60 rounded-r-full shadow-lg shadow-primary/50" />
                </>
              )}
              <Receipt className={`h-3.5 w-3.5 transition-all duration-300 relative z-10 ${
                activePage === "pedidos" 
                  ? "scale-110 text-primary drop-shadow-sm" 
                  : "group-hover:scale-110 group-hover:rotate-12"
              }`} />
              <span className={`text-xs font-medium transition-all duration-300 relative z-10 ${
                activePage === "pedidos" ? "font-semibold" : ""
              }`}>Pedidos</span>
              <Badge variant="default" className={`ml-auto text-[10px] px-1 py-0 h-4 transition-all duration-300 relative z-10 ${
                activePage === "pedidos" 
                  ? "scale-110 animate-pulse shadow-md" 
                  : "group-hover:scale-105"
              }`}>4</Badge>
            </button>
            <button 
              onClick={() => handlePageChange("inventario")}
              className={`group relative flex items-center gap-2 rounded-lg px-2 py-1.5 transition-all duration-300 ease-out overflow-hidden ${
                activePage === "inventario" 
                  ? "bg-gradient-to-r from-primary/10 to-primary/5 text-accent-foreground scale-[1.02] shadow-lg shadow-primary/20" 
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground hover:scale-[1.01] hover:shadow-md"
              }`}
            >
              {activePage === "inventario" && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 animate-shimmer" />
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-primary/60 rounded-r-full shadow-lg shadow-primary/50" />
                </>
              )}
              <Package className={`h-3.5 w-3.5 transition-all duration-300 relative z-10 ${
                activePage === "inventario" 
                  ? "scale-110 text-primary drop-shadow-sm" 
                  : "group-hover:scale-110 group-hover:rotate-12"
              }`} />
              <span className={`text-xs font-medium transition-all duration-300 relative z-10 ${
                activePage === "inventario" ? "font-semibold" : ""
              }`}>Inventario</span>
            </button>
            <button 
              onClick={() => handlePageChange("finanzas")}
              className={`group relative flex items-center gap-2 rounded-lg px-2 py-1.5 transition-all duration-300 ease-out overflow-hidden ${
                activePage === "finanzas" 
                  ? "bg-gradient-to-r from-primary/10 to-primary/5 text-accent-foreground scale-[1.02] shadow-lg shadow-primary/20" 
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground hover:scale-[1.01] hover:shadow-md"
              }`}
            >
              {activePage === "finanzas" && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 animate-shimmer" />
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-primary/60 rounded-r-full shadow-lg shadow-primary/50" />
                </>
              )}
              <CreditCard className={`h-3.5 w-3.5 transition-all duration-300 relative z-10 ${
                activePage === "finanzas" 
                  ? "scale-110 text-primary drop-shadow-sm" 
                  : "group-hover:scale-110 group-hover:rotate-12"
              }`} />
              <span className={`text-xs font-medium transition-all duration-300 relative z-10 ${
                activePage === "finanzas" ? "font-semibold" : ""
              }`}>Finanzas</span>
            </button>
            <button 
              onClick={() => handlePageChange("personal")}
              className={`group relative flex items-center gap-2 rounded-lg px-2 py-1.5 transition-all duration-300 ease-out overflow-hidden ${
                activePage === "personal" 
                  ? "bg-gradient-to-r from-primary/10 to-primary/5 text-accent-foreground scale-[1.02] shadow-lg shadow-primary/20" 
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground hover:scale-[1.01] hover:shadow-md"
              }`}
            >
              {activePage === "personal" && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 animate-shimmer" />
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-primary/60 rounded-r-full shadow-lg shadow-primary/50" />
                </>
              )}
              <Users className={`h-3.5 w-3.5 transition-all duration-300 relative z-10 ${
                activePage === "personal" 
                  ? "scale-110 text-primary drop-shadow-sm" 
                  : "group-hover:scale-110 group-hover:rotate-12"
              }`} />
              <span className={`text-xs font-medium transition-all duration-300 relative z-10 ${
                activePage === "personal" ? "font-semibold" : ""
              }`}>Personal</span>
            </button>
          </nav>
          <div className="mt-auto border-t border-border pt-2">
            <div className="flex items-center gap-2 rounded-lg p-1.5 hover:bg-accent cursor-pointer transition-all duration-300 group hover:scale-[1.02] hover:shadow-md">
              <div className="h-7 w-7 overflow-hidden rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center group-hover:from-primary/30 group-hover:to-primary/20 transition-all duration-300 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity" />
                <UserCircle className="h-4 w-4 text-primary relative z-10 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="flex flex-col overflow-hidden">
                <span className="truncate text-xs font-medium text-foreground group-hover:text-primary transition-colors duration-300">Carlos Rivera</span>
                <span className="truncate text-[10px] text-muted-foreground">Gerente General</span>
              </div>
            </div>
          </div>
        </div>
      </aside>
      <main className="flex flex-1 flex-col overflow-hidden bg-background relative z-10">
        <header className="flex h-12 items-center justify-between border-b border-border bg-white/95 backdrop-blur-sm px-3 lg:px-4 shadow-sm">
          <div className="flex items-center gap-2 lg:hidden">
            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-accent hover:scale-110 transition-all duration-300">
              <Menu className="h-4 w-4" />
            </Button>
          </div>
          <div className="hidden lg:flex flex-col relative">
            <div className="relative h-5 overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateY(-${currentIndex * 100}%)` }}
              >
                {pages.map((page) => (
                  <div key={page} className="min-h-full flex-shrink-0">
                    <h2 className={`text-sm font-bold text-foreground transition-all duration-300 ${
                      page === activePage && !isTransitioning 
                        ? 'opacity-100 scale-100' 
                        : 'opacity-0 scale-95'
                    }`}>
                      {pageTitles[page]}
                    </h2>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative hidden sm:block group">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground group-focus-within:text-primary transition-colors duration-300" />
              <input 
                className="h-8 w-48 rounded-md border border-input bg-background py-1 pl-8 pr-3 text-xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:border-primary/50 transition-all duration-300" 
                placeholder="Buscar..." 
                type="text"
              />
            </div>
            <Button variant="ghost" size="icon" className="relative h-8 w-8 hover:bg-accent hover:scale-110 transition-all duration-300 group">
              <Bell className="h-4 w-4 group-hover:animate-bounce transition-transform duration-300" />
              <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-destructive ring-1 ring-background animate-pulse"></span>
            </Button>
            <Button className="hidden sm:flex h-8 text-xs px-3 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">
              <Plus className="h-3 w-3 mr-1" />
              Nueva Reserva
            </Button>
          </div>
        </header>
        <div className="flex-1 overflow-hidden relative">
          <div className="relative h-full w-full">
            {pages.map((page, index) => (
              <div
                key={`${page}-${index}`}
                className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                  index === currentIndex
                    ? 'opacity-100 translate-x-0 scale-100 z-10'
                    : index < currentIndex
                    ? 'opacity-0 -translate-x-full scale-95 z-0'
                    : 'opacity-0 translate-x-full scale-95 z-0'
                }`}
              >
                {(() => {
                  switch(page) {
                    case "dashboard": return <DashboardPage />;
                    case "mesas": return <MesasPage />;
                    case "pedidos": return <PedidosPage />;
                    case "inventario": return <InventarioPage />;
                    case "finanzas": return <FinanzasPage />;
                    case "personal": return <PersonalPage />;
                    default: return <DashboardPage />;
                  }
                })()}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}