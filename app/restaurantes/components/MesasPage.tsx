"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  UtensilsCrossed, 
  Plus, 
  Clock, 
  Calendar, 
  Users, 
  Search,
  Filter,
  CheckCircle,
  AlertCircle,
  X,
  Edit,
  Eye,
} from "lucide-react";

type MesaEstado = "libre" | "ocupada" | "reservada";

interface Mesa {
  id: number;
  numero: string;
  capacidad: number;
  estado: MesaEstado;
  zona: string;
  desde?: string;
  reserva?: string;
  clientes?: number;
  pedidoId?: string;
}

export default function MesasPage() {
  const [selectedMesa, setSelectedMesa] = useState<Mesa | null>(null);
  const [filterEstado, setFilterEstado] = useState<MesaEstado | "todos">("todos");

  const mesas: Mesa[] = [
    { id: 1, numero: "01", capacidad: 4, estado: "libre", zona: "Zona A" },
    { id: 2, numero: "02", capacidad: 4, estado: "ocupada", zona: "Zona A", desde: "12:30", clientes: 3, pedidoId: "#1024" },
    { id: 3, numero: "03", capacidad: 2, estado: "libre", zona: "Zona A" },
    { id: 4, numero: "04", capacidad: 6, estado: "reservada", zona: "Zona B", reserva: "14:00" },
    { id: 5, numero: "05", capacidad: 4, estado: "ocupada", zona: "Zona B", desde: "13:15", clientes: 2, pedidoId: "#1025" },
    { id: 6, numero: "06", capacidad: 8, estado: "ocupada", zona: "Zona B", desde: "13:45", clientes: 6, pedidoId: "#1026" },
    { id: 7, numero: "07", capacidad: 2, estado: "libre", zona: "Zona C" },
    { id: 8, numero: "08", capacidad: 4, estado: "libre", zona: "Zona C" },
    { id: 9, numero: "09", capacidad: 6, estado: "reservada", zona: "Zona C", reserva: "15:30" },
    { id: 10, numero: "10", capacidad: 4, estado: "libre", zona: "Zona C" },
    { id: 11, numero: "11", capacidad: 2, estado: "ocupada", zona: "Zona A", desde: "12:00", clientes: 2, pedidoId: "#1027" },
    { id: 12, numero: "12", capacidad: 4, estado: "libre", zona: "Zona A" },
  ];

  const mesasFiltradas = filterEstado === "todos" 
    ? mesas 
    : mesas.filter(m => m.estado === filterEstado);

  const estadisticas = {
    total: mesas.length,
    libres: mesas.filter(m => m.estado === "libre").length,
    ocupadas: mesas.filter(m => m.estado === "ocupada").length,
    reservadas: mesas.filter(m => m.estado === "reservada").length,
  };

  const getEstadoBadge = (estado: MesaEstado) => {
    switch(estado) {
      case "libre":
        return <Badge className="bg-green-500/10 text-green-600 hover:bg-green-500/20 border-green-500/20">
          <CheckCircle className="h-3 w-3 mr-1" />
          Libre
        </Badge>;
      case "ocupada":
        return <Badge className="bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 border-blue-500/20">
          <Users className="h-3 w-3 mr-1" />
          Ocupada
        </Badge>;
      case "reservada":
        return <Badge className="bg-amber-500/10 text-amber-600 hover:bg-amber-500/20 border-amber-500/20">
          <Calendar className="h-3 w-3 mr-1" />
          Reservada
        </Badge>;
    }
  };

  return (
    <div className="flex-1 overflow-hidden p-1.5 lg:p-2 bg-background">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 h-full">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-foreground">Gestión de Mesas</h2>
            <p className="text-[10px] text-muted-foreground">Administra y visualiza el estado de todas las mesas</p>
          </div>
          <Button className="h-7 text-[10px] px-2">
            <Plus className="h-2.5 w-2.5 mr-1" />
            Nueva Mesa
          </Button>
        </div>

        {/* Estadísticas */}
        <section className="grid grid-cols-2 gap-1.5 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="relative overflow-hidden border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 px-2 pt-2">
              <CardTitle className="text-[10px] font-medium text-muted-foreground">Total Mesas</CardTitle>
              <Badge className="bg-foreground/90 text-background hover:bg-foreground border-0 px-1.5 py-0 rounded-full text-[10px]">
                <UtensilsCrossed className="h-2 w-2 mr-0.5" />
                {estadisticas.total}
              </Badge>
            </CardHeader>
            <CardContent className="px-2 pb-2 pt-0">
              <div className="text-lg font-bold text-foreground mb-0.5">{estadisticas.total}</div>
              <div className="flex items-center gap-1 mt-1">
                <UtensilsCrossed className="h-3 w-3 text-muted-foreground" />
                <p className="text-[10px] font-medium text-foreground">Mesas disponibles</p>
              </div>
              <p className="text-[10px] text-muted-foreground mt-0.5">En el restaurante</p>
            </CardContent>
          </Card>
          <Card className="relative overflow-hidden border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 px-2 pt-2">
              <CardTitle className="text-[10px] font-medium text-muted-foreground">Mesas Libres</CardTitle>
              <Badge className="bg-foreground/90 text-background hover:bg-foreground border-0 px-1.5 py-0 rounded-full text-[10px]">
                <CheckCircle className="h-2 w-2 mr-0.5" />
                {estadisticas.libres}
              </Badge>
            </CardHeader>
            <CardContent className="px-2 pb-2 pt-0">
              <div className="text-lg font-bold text-foreground mb-0.5">{estadisticas.libres}</div>
              <div className="flex items-center gap-1 mt-1">
                <CheckCircle className="h-3 w-3 text-green-600" />
                <p className="text-[10px] font-medium text-foreground">Disponibles</p>
              </div>
              <p className="text-[10px] text-muted-foreground mt-0.5">Listas para usar</p>
            </CardContent>
          </Card>
          <Card className="relative overflow-hidden border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 px-2 pt-2">
              <CardTitle className="text-[10px] font-medium text-muted-foreground">Mesas Ocupadas</CardTitle>
              <Badge className="bg-foreground/90 text-background hover:bg-foreground border-0 px-1.5 py-0 rounded-full text-[10px]">
                <Users className="h-2 w-2 mr-0.5" />
                {estadisticas.ocupadas}
              </Badge>
            </CardHeader>
            <CardContent className="px-2 pb-2 pt-0">
              <div className="text-lg font-bold text-foreground mb-0.5">{estadisticas.ocupadas}</div>
              <div className="flex items-center gap-1 mt-1">
                <Users className="h-3 w-3 text-blue-600" />
                <p className="text-[10px] font-medium text-foreground">Con clientes</p>
              </div>
              <p className="text-[10px] text-muted-foreground mt-0.5">En servicio</p>
            </CardContent>
          </Card>
          <Card className="relative overflow-hidden border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 px-2 pt-2">
              <CardTitle className="text-[10px] font-medium text-muted-foreground">Reservadas</CardTitle>
              <Badge className="bg-foreground/90 text-background hover:bg-foreground border-0 px-1.5 py-0 rounded-full text-[10px]">
                <Calendar className="h-2 w-2 mr-0.5" />
                {estadisticas.reservadas}
              </Badge>
            </CardHeader>
            <CardContent className="px-2 pb-2 pt-0">
              <div className="text-lg font-bold text-foreground mb-0.5">{estadisticas.reservadas}</div>
              <div className="flex items-center gap-1 mt-1">
                <Calendar className="h-3 w-3 text-amber-600" />
                <p className="text-[10px] font-medium text-foreground">Con reserva</p>
              </div>
              <p className="text-[10px] text-muted-foreground mt-0.5">Próximas horas</p>
            </CardContent>
          </Card>
        </section>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 flex-1 min-h-0">
          {/* Mapa del Salón */}
          <div className="lg:col-span-2 min-h-0">
            <Card className="border-border/50 flex-1 flex flex-col min-h-0 h-full">
              <CardHeader className="pb-1.5 px-2 pt-2">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-sm font-semibold">Mapa del Salón</CardTitle>
                    <CardDescription className="text-[10px]">Haz clic en una mesa para ver detalles</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      <span className="text-[10px] text-muted-foreground">Libre</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                      <span className="text-[10px] text-muted-foreground">Ocupada</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                      <span className="text-[10px] text-muted-foreground">Reservada</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1 min-h-0 p-1.5">
                <div className="relative w-full h-full overflow-hidden rounded-lg bg-gradient-to-br from-muted/30 to-muted/10 p-1.5 border border-border/50">
                  <div className="absolute inset-0 opacity-5" style={{backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '12px 12px'}}></div>
                  <div className="relative grid h-full w-full grid-cols-4 grid-rows-4 gap-1.5">
                    {/* Barra */}
                    <div className="col-span-1 row-span-4 rounded-lg border border-dashed border-primary/30 bg-primary/5 flex flex-col justify-center items-center gap-2 py-3 relative">
                      <div className="absolute top-1 left-1 text-[8px] font-bold uppercase tracking-widest text-primary/60 rotate-90 origin-left">Barra</div>
                      <div className="flex flex-col gap-1.5">
                        {["B1", "B2", "B3", "B4"].map((bar, idx) => (
                          <div 
                            key={bar}
                            className={`h-7 w-7 rounded-full flex items-center justify-center text-[10px] font-bold border-2 border-background cursor-pointer transition-all hover:scale-110 ${
                              idx % 2 === 0 
                                ? "bg-primary text-primary-foreground shadow-md" 
                                : "bg-muted/50 text-muted-foreground opacity-60"
                            }`}
                          >
                            {bar}
                            {idx % 2 === 0 && (
                              <div className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-green-500 border border-background"></div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Mesas */}
                    {mesasFiltradas.slice(0, 12).map((mesa) => {
                      const isSelected = selectedMesa?.id === mesa.id;
                      const getMesaStyles = () => {
                        switch(mesa.estado) {
                          case "libre":
                            return "border-2 border-gray-300 bg-gradient-to-br from-gray-50 to-gray-100";
                          case "ocupada":
                            return "border-2 border-blue-500 bg-gradient-to-br from-blue-50 to-blue-100";
                          case "reservada":
                            return "border-2 border-amber-500 bg-gradient-to-br from-amber-50 to-amber-100";
                        }
                      };
                      
                      return (
                        <div key={mesa.id} className="relative flex items-center justify-center">
                          <div 
                            onClick={() => setSelectedMesa(mesa)}
                            className={`group relative flex h-16 w-16 items-center justify-center cursor-pointer transition-all hover:scale-110 ${
                              isSelected ? "ring-2 ring-primary ring-offset-2" : ""
                            }`}
                          >
                            <div className={`absolute inset-0 rounded-lg shadow-md group-hover:shadow-lg transition-all ${getMesaStyles()}`}></div>
                            <div className="relative z-10 flex flex-col items-center gap-0.5">
                              <span className="text-sm font-extrabold leading-tight">{mesa.numero}</span>
                              {mesa.estado === "ocupada" && mesa.desde && (
                                <div className="flex items-center gap-0.5">
                                  <Clock className="h-2 w-2" />
                                  <span className="text-[7px] font-bold leading-tight">{mesa.desde}</span>
                                </div>
                              )}
                              {mesa.estado === "reservada" && mesa.reserva && (
                                <div className="flex items-center gap-0.5">
                                  <Calendar className="h-2 w-2" />
                                  <span className="text-[7px] font-bold leading-tight">{mesa.reserva}</span>
                                </div>
                              )}
                            </div>
                            {mesa.estado === "ocupada" && (
                              <div className="absolute top-1 right-1 h-2 w-2 rounded-full bg-green-500 border-2 border-white shadow-md animate-pulse"></div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Panel Lateral */}
          <div className="flex flex-col gap-2 min-h-0">
            {/* Filtros */}
            <Card className="border-border/50">
              <CardHeader className="pb-1.5 px-2 pt-2">
                <CardTitle className="text-xs font-semibold flex items-center gap-1.5">
                  <Filter className="h-3.5 w-3.5" />
                  Filtros
                </CardTitle>
              </CardHeader>
              <CardContent className="px-3 pb-3">
                <div className="flex flex-wrap gap-1.5">
                  <Button
                    variant={filterEstado === "todos" ? "default" : "outline"}
                    size="sm"
                    className="h-7 text-[10px] px-2"
                    onClick={() => setFilterEstado("todos")}
                  >
                    Todas
                  </Button>
                  <Button
                    variant={filterEstado === "libre" ? "default" : "outline"}
                    size="sm"
                    className="h-7 text-[10px] px-2"
                    onClick={() => setFilterEstado("libre")}
                  >
                    Libres
                  </Button>
                  <Button
                    variant={filterEstado === "ocupada" ? "default" : "outline"}
                    size="sm"
                    className="h-7 text-[10px] px-2"
                    onClick={() => setFilterEstado("ocupada")}
                  >
                    Ocupadas
                  </Button>
                  <Button
                    variant={filterEstado === "reservada" ? "default" : "outline"}
                    size="sm"
                    className="h-7 text-[10px] px-2"
                    onClick={() => setFilterEstado("reservada")}
                  >
                    Reservadas
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Detalles de Mesa */}
            {selectedMesa ? (
              <Card className="border-border/50 flex-1 flex flex-col min-h-0">
                <CardHeader className="pb-2 px-3 pt-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-sm font-semibold">Mesa {selectedMesa.numero}</CardTitle>
                      <CardDescription className="text-[10px]">{selectedMesa.zona}</CardDescription>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => setSelectedMesa(null)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="px-3 pb-3 flex-1 min-h-0 overflow-auto">
                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-muted-foreground">Estado</span>
                        {getEstadoBadge(selectedMesa.estado)}
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Capacidad</span>
                        <span className="text-xs font-semibold">{selectedMesa.capacidad} personas</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Zona</span>
                        <span className="text-xs font-semibold">{selectedMesa.zona}</span>
                      </div>
                    </div>

                    {selectedMesa.estado === "ocupada" && (
                      <>
                        <Separator />
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">Ocupada desde</span>
                            <span className="text-xs font-semibold flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {selectedMesa.desde}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">Clientes</span>
                            <span className="text-xs font-semibold flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              {selectedMesa.clientes}/{selectedMesa.capacidad}
                            </span>
                          </div>
                          {selectedMesa.pedidoId && (
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-muted-foreground">Pedido</span>
                              <Badge variant="outline" className="text-[10px]">
                                {selectedMesa.pedidoId}
                              </Badge>
                            </div>
                          )}
                        </div>
                      </>
                    )}

                    {selectedMesa.estado === "reservada" && selectedMesa.reserva && (
                      <>
                        <Separator />
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">Reservada para</span>
                            <span className="text-xs font-semibold flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {selectedMesa.reserva}
                            </span>
                          </div>
                        </div>
                      </>
                    )}

                    <Separator />

                    <div className="flex flex-col gap-1.5">
                      <Button variant="default" size="sm" className="h-7 text-xs w-full">
                        <Eye className="h-3 w-3 mr-1.5" />
                        Ver Detalles Completos
                      </Button>
                      {selectedMesa.estado === "libre" && (
                        <Button variant="outline" size="sm" className="h-7 text-xs w-full">
                          <Users className="h-3 w-3 mr-1.5" />
                          Asignar Clientes
                        </Button>
                      )}
                      {selectedMesa.estado === "ocupada" && (
                        <Button variant="outline" size="sm" className="h-7 text-xs w-full">
                          <X className="h-3 w-3 mr-1.5" />
                          Liberar Mesa
                        </Button>
                      )}
                      <Button variant="ghost" size="sm" className="h-7 text-xs w-full">
                        <Edit className="h-3 w-3 mr-1.5" />
                        Editar Mesa
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-border/50 flex-1 flex flex-col min-h-0">
                <CardContent className="flex-1 flex items-center justify-center p-6">
                  <div className="text-center">
                    <UtensilsCrossed className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-xs text-muted-foreground">Selecciona una mesa para ver sus detalles</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Lista Rápida */}
            <Card className="border-border/50">
              <CardHeader className="pb-2 px-3 pt-3">
                <CardTitle className="text-xs font-semibold">Lista de Mesas</CardTitle>
                <CardDescription className="text-[9px]">Todas las mesas ({mesasFiltradas.length})</CardDescription>
              </CardHeader>
              <CardContent className="px-3 pb-3">
                <div className="space-y-1.5 max-h-48 overflow-auto">
                  {mesasFiltradas.map((mesa) => (
                    <div
                      key={mesa.id}
                      onClick={() => setSelectedMesa(mesa)}
                      className={`flex items-center justify-between p-2 rounded-md cursor-pointer transition-colors ${
                        selectedMesa?.id === mesa.id
                          ? "bg-accent"
                          : "hover:bg-muted/50"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`h-2 w-2 rounded-full ${
                          mesa.estado === "libre" ? "bg-green-500" :
                          mesa.estado === "ocupada" ? "bg-blue-500" :
                          "bg-amber-500"
                        }`}></div>
                        <span className="text-xs font-medium">Mesa {mesa.numero}</span>
                      </div>
                      {getEstadoBadge(mesa.estado)}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

