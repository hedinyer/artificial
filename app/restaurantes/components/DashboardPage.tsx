"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import {
  UtensilsCrossed,
  Receipt,
  ArrowUp,
  ChefHat,
  Calendar,
  Clock,
  CheckCircle,
  TrendingUp,
  CirclePlus,
  Wallet,
  UserPlus,
  Package2,
  Package,
  AlertTriangle,
  UserCircle,
} from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="flex-1 overflow-hidden p-1.5 lg:p-2 bg-background">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 h-full">
        <section className="grid grid-cols-2 gap-1.5 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="relative overflow-hidden border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 px-2 pt-2">
              <CardTitle className="text-[10px] font-medium text-muted-foreground">Ventas del Día</CardTitle>
              <Badge className="bg-foreground/90 text-background hover:bg-foreground border-0 px-1.5 py-0 rounded-full text-[10px]">
                <ArrowUp className="h-2 w-2 mr-0.5" />
                +12%
              </Badge>
            </CardHeader>
            <CardContent className="px-2 pb-2 pt-0">
              <div className="text-lg font-bold text-foreground mb-0.5">$1,250.00</div>
              <div className="flex items-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3 text-green-600" />
                <p className="text-[10px] font-medium text-foreground">Trending up</p>
              </div>
              <p className="text-[10px] text-muted-foreground mt-0.5">vs ayer</p>
            </CardContent>
          </Card>
          <Card className="relative overflow-hidden border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 px-2 pt-2">
              <CardTitle className="text-[10px] font-medium text-muted-foreground">Pedidos Activos</CardTitle>
              <Badge className="bg-foreground/90 text-background hover:bg-foreground border-0 px-1.5 py-0 rounded-full text-[10px]">
                <ChefHat className="h-2 w-2 mr-0.5" />
                8
              </Badge>
            </CardHeader>
            <CardContent className="px-2 pb-2 pt-0">
              <div className="text-lg font-bold text-foreground mb-0.5">8</div>
              <div className="flex items-center gap-1 mt-1">
                <div className="flex items-center gap-1">
                  <span className="text-[10px] font-medium text-foreground">3 cocina</span>
                  <span className="text-[10px] text-muted-foreground">•</span>
                  <span className="text-[10px] text-muted-foreground">5 entregados</span>
                </div>
              </div>
              <p className="text-[10px] text-muted-foreground mt-0.5">Estado actual</p>
            </CardContent>
          </Card>
          <Card className="relative overflow-hidden border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 px-2 pt-2">
              <CardTitle className="text-[10px] font-medium text-muted-foreground">Reservas Hoy</CardTitle>
              <Badge className="bg-foreground/90 text-background hover:bg-foreground border-0 px-1.5 py-0 rounded-full text-[10px]">
                <Calendar className="h-2 w-2 mr-0.5" />
                24
              </Badge>
            </CardHeader>
            <CardContent className="px-2 pb-2 pt-0">
              <div className="text-lg font-bold text-foreground mb-0.5">24</div>
              <div className="flex items-center gap-1 mt-1">
                <Clock className="h-3 w-3 text-amber-600" />
                <p className="text-[10px] font-medium text-foreground">Próxima 15m</p>
              </div>
              <p className="text-[10px] text-muted-foreground mt-0.5">Mesa 4</p>
            </CardContent>
          </Card>
          <Card className="relative overflow-hidden border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 px-2 pt-2">
              <CardTitle className="text-[10px] font-medium text-muted-foreground">Personal Turno</CardTitle>
              <Badge className="bg-foreground/90 text-background hover:bg-foreground border-0 px-1.5 py-0 rounded-full text-[10px]">
                <ArrowUp className="h-2 w-2 mr-0.5" />
                +3
              </Badge>
            </CardHeader>
            <CardContent className="px-2 pb-2 pt-0">
              <div className="text-lg font-bold text-foreground mb-0.5">6</div>
              <div className="flex items-center gap-1 mt-1">
                <div className="flex -space-x-1">
                  <div className="inline-block h-4 w-4 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 border border-background"></div>
                  <div className="inline-block h-4 w-4 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border border-background"></div>
                  <div className="inline-block h-4 w-4 rounded-full bg-gradient-to-br from-green-400 to-green-600 border border-background"></div>
                </div>
                <p className="text-[10px] font-medium text-foreground ml-1">+3</p>
              </div>
              <p className="text-[10px] text-muted-foreground mt-0.5">Personal activo</p>
            </CardContent>
          </Card>
        </section>
        <div className="grid grid-cols-1 gap-2 lg:grid-cols-3 flex-1 min-h-0">
          <div className="flex flex-col gap-2 lg:col-span-2 min-h-0">
            <Card className="border-border/50 flex-1 flex flex-col min-h-0">
              <CardHeader className="pb-1.5 px-2 pt-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/10">
                      <UtensilsCrossed className="h-3 w-3 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-sm font-semibold">Mapa del Salón</CardTitle>
                      <CardDescription className="text-[10px]">Distribución de mesas</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <div className="h-2 w-2 rounded-full bg-muted border border-border"></div>
                      <span className="text-[10px] text-muted-foreground">Libre</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="h-2 w-2 rounded-full bg-primary border border-primary"></div>
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
                  <div className="absolute inset-0 opacity-5" style={{backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '10px 10px'}}></div>
                  <div className="relative grid h-full w-full grid-cols-4 grid-rows-3 gap-1.5">
                    {/* Barra */}
                    <div className="col-span-1 row-span-3 rounded-md border border-dashed border-primary/30 bg-primary/5 flex flex-col justify-center items-center gap-1.5 py-2 relative">
                      <div className="absolute top-0.5 left-0.5 text-[7px] font-bold uppercase tracking-widest text-primary/60 rotate-90 origin-left">Barra</div>
                      <div className="flex flex-col gap-1">
                        <div className="group relative h-6 w-6 rounded-full bg-primary shadow-sm flex items-center justify-center text-primary-foreground text-[9px] font-bold border border-background cursor-pointer hover:scale-110 transition-all">
                          <span>B1</span>
                          <div className="absolute -top-0.5 -right-0.5 h-1.5 w-1.5 rounded-full bg-green-500 border border-background"></div>
                        </div>
                        <div className="h-6 w-6 rounded-full bg-muted/50 flex items-center justify-center text-muted-foreground text-[9px] font-bold border border-background opacity-60">
                          B2
                        </div>
                        <div className="group relative h-6 w-6 rounded-full bg-primary shadow-sm flex items-center justify-center text-primary-foreground text-[9px] font-bold border border-background cursor-pointer hover:scale-110 transition-all">
                          <span>B3</span>
                          <div className="absolute -top-0.5 -right-0.5 h-1.5 w-1.5 rounded-full bg-green-500 border border-background"></div>
                        </div>
                        <div className="h-6 w-6 rounded-full bg-muted/50 flex items-center justify-center text-muted-foreground text-[9px] font-bold border border-background opacity-60">
                          B4
                        </div>
                      </div>
                    </div>
                    
                    {/* Mesa 01 - Libre */}
                    <div className="relative flex items-center justify-center">
                      <div className="group relative flex h-12 w-12 items-center justify-center cursor-pointer transition-all hover:scale-110">
                        <div className="absolute inset-0 rounded-lg border-2 border-gray-300 bg-gradient-to-br from-gray-50 to-gray-100 shadow-md group-hover:shadow-lg transition-all"></div>
                        <div className="relative z-10 flex flex-col items-center gap-0.5">
                          <span className="text-sm font-extrabold text-gray-700 leading-tight">01</span>
                          <span className="text-[8px] text-gray-600 font-semibold leading-tight uppercase tracking-wide">Libre</span>
                        </div>
                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 h-3 w-3 rounded-full bg-gray-300 border-2 border-white shadow-sm"></div>
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-3 w-3 rounded-full bg-gray-300 border-2 border-white shadow-sm"></div>
                        <div className="absolute -left-2 top-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-gray-300 border-2 border-white shadow-sm"></div>
                        <div className="absolute -right-2 top-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-gray-300 border-2 border-white shadow-sm"></div>
                      </div>
                    </div>
                    
                    {/* Mesa 02 - Ocupada */}
                    <div className="relative flex items-center justify-center">
                      <div className="group relative flex h-12 w-12 items-center justify-center cursor-pointer transition-all hover:scale-110">
                        <div className="absolute inset-0 rounded-lg border-2 border-blue-500 bg-gradient-to-br from-blue-50 to-blue-100 shadow-lg group-hover:shadow-xl transition-all"></div>
                        <div className="relative z-10 flex flex-col items-center gap-0.5">
                          <span className="text-sm font-extrabold text-blue-700 leading-tight">02</span>
                          <div className="flex items-center gap-0.5">
                            <Clock className="h-2.5 w-2.5 text-blue-600" />
                            <span className="text-[8px] text-blue-600 font-bold leading-tight">12:30</span>
                          </div>
                        </div>
                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 h-3.5 w-3.5 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 border-2 border-white shadow-md ring-1 ring-blue-300"></div>
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-3.5 w-3.5 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 border-2 border-white shadow-md ring-1 ring-purple-300"></div>
                        <div className="absolute -left-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 rounded-full bg-gradient-to-br from-green-500 to-green-600 border-2 border-white shadow-md ring-1 ring-green-300"></div>
                        <div className="absolute -right-2 top-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-blue-200 border-2 border-white"></div>
                        <div className="absolute top-1 right-1 h-2 w-2 rounded-full bg-green-500 border-2 border-white shadow-md animate-pulse"></div>
                      </div>
                    </div>
                    
                    {/* Mesa 03 - Libre */}
                    <div className="relative flex items-center justify-center">
                      <div className="group relative flex h-12 w-12 items-center justify-center cursor-pointer transition-all hover:scale-110">
                        <div className="absolute inset-0 rounded-lg border-2 border-gray-300 bg-gradient-to-br from-gray-50 to-gray-100 shadow-md group-hover:shadow-lg transition-all"></div>
                        <div className="relative z-10 flex flex-col items-center gap-0.5">
                          <span className="text-sm font-extrabold text-gray-700 leading-tight">03</span>
                          <span className="text-[8px] text-gray-600 font-semibold leading-tight uppercase tracking-wide">Libre</span>
                        </div>
                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 h-3 w-3 rounded-full bg-gray-300 border-2 border-white shadow-sm"></div>
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-3 w-3 rounded-full bg-gray-300 border-2 border-white shadow-sm"></div>
                        <div className="absolute -left-2 top-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-gray-300 border-2 border-white shadow-sm"></div>
                        <div className="absolute -right-2 top-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-gray-300 border-2 border-white shadow-sm"></div>
                      </div>
                    </div>
                    
                    {/* Mesa 04 - Reservada */}
                    <div className="relative flex items-center justify-center" style={{ paddingTop: '30px' }}>
                      <div className="group relative flex h-12 w-12 items-center justify-center cursor-pointer transition-all hover:scale-110">
                        <div className="absolute inset-0 rounded-lg border-2 border-amber-500 bg-gradient-to-br from-amber-50 to-amber-100 shadow-lg group-hover:shadow-xl transition-all"></div>
                        <div className="relative z-10 flex flex-col items-center gap-0.5">
                          <span className="text-sm font-extrabold text-amber-700 leading-tight">04</span>
                          <div className="flex items-center gap-0.5">
                            <Calendar className="h-2.5 w-2.5 text-amber-600" />
                            <span className="text-[8px] text-amber-600 font-bold leading-tight">14:00</span>
                          </div>
                        </div>
                        <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 border-2 border-white shadow-md ring-1 ring-amber-300"></div>
                        <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 border-2 border-white shadow-md ring-1 ring-amber-300"></div>
                        <div className="absolute -left-1.5 top-1/4 h-3 w-3 rounded-full bg-gradient-to-br from-amber-400 to-amber-500 border-2 border-white shadow-sm ring-0.5 ring-amber-300"></div>
                        <div className="absolute -right-1.5 top-1/4 h-3 w-3 rounded-full bg-gradient-to-br from-amber-400 to-amber-500 border-2 border-white shadow-sm ring-0.5 ring-amber-300"></div>
                        <div className="absolute -left-1.5 bottom-1/4 h-3 w-3 rounded-full bg-gradient-to-br from-amber-400 to-amber-500 border-2 border-white shadow-sm ring-0.5 ring-amber-300"></div>
                        <div className="absolute -right-1.5 bottom-1/4 h-3 w-3 rounded-full bg-gradient-to-br from-amber-400 to-amber-500 border-2 border-white shadow-sm ring-0.5 ring-amber-300"></div>
                      </div>
                    </div>
                    
                    {/* Mesa 05 - Ocupada */}
                    <div className="relative flex items-center justify-center" style={{ paddingTop: '30px' }}>
                      <div className="group relative flex h-12 w-12 items-center justify-center cursor-pointer transition-all hover:scale-110">
                        <div className="absolute inset-0 rounded-lg border-2 border-blue-500 bg-gradient-to-br from-blue-50 to-blue-100 shadow-lg group-hover:shadow-xl transition-all"></div>
                        <div className="relative z-10 flex flex-col items-center gap-0.5">
                          <span className="text-sm font-extrabold text-blue-700 leading-tight">05</span>
                          <div className="flex items-center gap-0.5">
                            <Clock className="h-2.5 w-2.5 text-blue-600" />
                            <span className="text-[8px] text-blue-600 font-bold leading-tight">13:15</span>
                          </div>
                        </div>
                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 h-3.5 w-3.5 rounded-full bg-gradient-to-br from-pink-500 to-pink-600 border-2 border-white shadow-md ring-1 ring-pink-300"></div>
                        <div className="absolute -left-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-600 border-2 border-white shadow-md ring-1 ring-indigo-300"></div>
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-3 w-3 rounded-full bg-blue-200 border-2 border-white"></div>
                        <div className="absolute -right-2 top-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-blue-200 border-2 border-white"></div>
                        <div className="absolute top-1 right-1 h-2 w-2 rounded-full bg-green-500 border-2 border-white shadow-md animate-pulse"></div>
                      </div>
                    </div>
                    
                    {/* Mesa 06 - Ocupada */}
                    <div className="relative flex items-center justify-center" style={{ paddingTop: '30px' }}>
                      <div className="group relative flex h-12 w-12 items-center justify-center cursor-pointer transition-all hover:scale-110">
                        <div className="absolute inset-0 rounded-lg border-2 border-blue-500 bg-gradient-to-br from-blue-50 to-blue-100 shadow-lg group-hover:shadow-xl transition-all"></div>
                        <div className="relative z-10 flex flex-col items-center gap-0.5">
                          <span className="text-sm font-extrabold text-blue-700 leading-tight">06</span>
                          <div className="flex items-center gap-0.5">
                            <Clock className="h-2.5 w-2.5 text-blue-600" />
                            <span className="text-[8px] text-blue-600 font-bold leading-tight">13:45</span>
                          </div>
                        </div>
                        <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 border-2 border-white shadow-md ring-1 ring-blue-300"></div>
                        <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 border-2 border-white shadow-md ring-1 ring-purple-300"></div>
                        <div className="absolute -left-1.5 top-1/4 h-3 w-3 rounded-full bg-gradient-to-br from-green-500 to-green-600 border-2 border-white shadow-sm ring-0.5 ring-green-300"></div>
                        <div className="absolute -right-1.5 top-1/4 h-3 w-3 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 border-2 border-white shadow-sm ring-0.5 ring-orange-300"></div>
                        <div className="absolute -left-1.5 bottom-1/4 h-3 w-3 rounded-full bg-gradient-to-br from-red-500 to-red-600 border-2 border-white shadow-sm ring-0.5 ring-red-300"></div>
                        <div className="absolute -right-1.5 bottom-1/4 h-3 w-3 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 border-2 border-white shadow-sm ring-0.5 ring-teal-300"></div>
                        <div className="absolute top-1 right-1 h-2 w-2 rounded-full bg-green-500 border-2 border-white shadow-md animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/50 flex-1 flex flex-col min-h-0">
              <CardHeader className="pb-1.5 px-2 pt-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="flex h-5 w-5 items-center justify-center rounded-md bg-primary/10">
                      <Receipt className="h-2.5 w-2.5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-xs font-semibold">Pedidos Recientes</CardTitle>
                      <CardDescription className="text-[9px]">Últimos pedidos</CardDescription>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-[9px] h-5 px-1.5">
                    Ver Todos
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0 flex-1 min-h-0 overflow-auto">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-border/50">
                        <TableHead className="h-7 text-[10px] font-semibold text-muted-foreground px-2">ID</TableHead>
                        <TableHead className="h-7 text-[10px] font-semibold text-muted-foreground px-2">Mesa</TableHead>
                        <TableHead className="h-7 text-[10px] font-semibold text-muted-foreground px-2">Estado</TableHead>
                        <TableHead className="h-7 text-[10px] font-semibold text-muted-foreground px-2">Total</TableHead>
                        <TableHead className="h-7 text-[10px] font-semibold text-muted-foreground px-2">Hora</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow className="border-border/50 hover:bg-muted/50 transition-colors">
                        <TableCell className="font-semibold text-xs px-2">#1024</TableCell>
                        <TableCell className="text-xs px-2">Mesa 02</TableCell>
                        <TableCell className="px-2">
                          <Badge className="bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 border-blue-500/20 text-[10px] px-1.5 py-0 h-4">
                            <ChefHat className="h-2.5 w-2.5 mr-0.5" />
                            Cocina
                          </Badge>
                        </TableCell>
                        <TableCell className="font-semibold text-xs px-2">$45.00</TableCell>
                        <TableCell className="text-[10px] text-muted-foreground px-2">12:30</TableCell>
                      </TableRow>
                      <TableRow className="border-border/50 hover:bg-muted/50 transition-colors">
                        <TableCell className="font-semibold text-xs px-2">#1025</TableCell>
                        <TableCell className="text-xs px-2">Mesa 06</TableCell>
                        <TableCell className="px-2">
                          <Badge className="bg-amber-500/10 text-amber-600 hover:bg-amber-500/20 border-amber-500/20 text-[10px] px-1.5 py-0 h-4">
                            <Clock className="h-2.5 w-2.5 mr-0.5" />
                            Pendiente
                          </Badge>
                        </TableCell>
                        <TableCell className="font-semibold text-xs px-2">$120.50</TableCell>
                        <TableCell className="text-[10px] text-muted-foreground px-2">12:35</TableCell>
                      </TableRow>
                      <TableRow className="border-border/50 hover:bg-muted/50 transition-colors">
                        <TableCell className="font-semibold text-xs px-2">#1023</TableCell>
                        <TableCell className="text-xs px-2">Mesa 05</TableCell>
                        <TableCell className="px-2">
                          <Badge className="bg-green-500/10 text-green-600 hover:bg-green-500/20 border-green-500/20 text-[10px] px-1.5 py-0 h-4">
                            <CheckCircle className="h-2.5 w-2.5 mr-0.5" />
                            Servido
                          </Badge>
                        </TableCell>
                        <TableCell className="font-semibold text-xs px-2">$82.00</TableCell>
                        <TableCell className="text-[10px] text-muted-foreground px-2">12:15</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="flex flex-col gap-2 min-h-0">
            <Card className="border-border/50">
              <CardHeader className="pb-1 px-2 pt-1.5">
                <CardTitle className="text-[11px] font-semibold">Acciones Rápidas</CardTitle>
                <CardDescription className="text-[8px]">Accesos directos</CardDescription>
              </CardHeader>
              <CardContent className="px-2 pb-1.5">
                <div className="grid grid-cols-2 gap-1">
                  <Button 
                    variant="outline" 
                    className="flex flex-col items-center justify-center gap-0.5 h-auto py-1.5 hover:bg-accent hover:border-primary/50 transition-all group"
                  >
                    <div className="flex h-5 w-5 items-center justify-center rounded-md bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <CirclePlus className="h-3 w-3 text-primary" />
                    </div>
                    <span className="text-[8px] font-medium">Pedido</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex flex-col items-center justify-center gap-1 h-auto py-2 hover:bg-accent hover:border-primary/50 transition-all group"
                  >
                    <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <Wallet className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <span className="text-[9px] font-medium">Cerrar Caja</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex flex-col items-center justify-center gap-1 h-auto py-2 hover:bg-accent hover:border-primary/50 transition-all group"
                  >
                    <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <UserPlus className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <span className="text-[9px] font-medium">Reserva</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex flex-col items-center justify-center gap-1 h-auto py-2 hover:bg-accent hover:border-primary/50 transition-all group"
                  >
                    <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <Package2 className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <span className="text-[9px] font-medium">Stock</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardHeader className="pb-1 px-2 pt-1.5">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-0.5 text-[9px] font-semibold">
                    <div className="flex h-3.5 w-3.5 items-center justify-center rounded-md bg-destructive/10">
                      <AlertTriangle className="h-2 w-2 text-destructive" />
                    </div>
                    Alertas Stock
                  </CardTitle>
                  <Badge variant="destructive" className="text-[7px] px-1 py-0 h-2.5">2</Badge>
                </div>
                <CardDescription className="text-[7px] mt-0.5">Stock bajo</CardDescription>
              </CardHeader>
              <CardContent className="px-2 pb-1.5 pt-0">
                <div className="flex flex-col gap-1">
                  <div className="group flex items-center gap-1 rounded-md border border-destructive/20 bg-destructive/5 p-1 hover:bg-destructive/10 hover:border-destructive/30 transition-all cursor-pointer">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-red-100 to-red-200 border border-red-200">
                      <Package className="h-2.5 w-2.5 text-red-600" />
                    </div>
                    <div className="flex flex-1 flex-col gap-0 min-w-0">
                      <span className="text-[9px] font-semibold text-foreground truncate">Vino Tinto</span>
                      <div className="flex items-center gap-0.5 flex-wrap">
                        <Badge variant="destructive" className="text-[8px] px-0.5 py-0 h-2.5">
                          Crítico
                        </Badge>
                        <span className="text-[8px] text-destructive font-medium">2 unidades</span>
                      </div>
                    </div>
                  </div>
                  <div className="group flex items-center gap-1 rounded-md border border-orange-200 bg-orange-50/50 p-1 hover:bg-orange-50 hover:border-orange-300 transition-all cursor-pointer">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-orange-100 to-orange-200 border border-orange-200">
                      <Package className="h-2.5 w-2.5 text-orange-600" />
                    </div>
                    <div className="flex flex-1 flex-col gap-0 min-w-0">
                      <span className="text-[9px] font-semibold text-foreground truncate">Lomo Fino</span>
                      <div className="flex items-center gap-0.5 flex-wrap">
                        <Badge className="bg-orange-500/10 text-orange-600 hover:bg-orange-500/20 border-orange-500/20 text-[8px] px-0.5 py-0 h-2.5">
                          Bajo
                        </Badge>
                        <span className="text-[8px] text-orange-600 font-medium">4 kg</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardHeader className="pb-1 px-2 pt-1.5">
                <CardTitle className="text-[11px] font-semibold">Personal Activo</CardTitle>
              </CardHeader>
              <CardContent className="px-2 pb-1.5">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div className="h-5 w-5 overflow-hidden rounded-full bg-muted flex items-center justify-center">
                        <UserCircle className="h-3.5 w-3.5 text-muted-foreground" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] font-medium text-foreground">Maria G.</span>
                        <span className="text-[9px] text-muted-foreground">Mesera</span>
                      </div>
                    </div>
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span>
                  </div>
                  <Separator className="my-0" />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div className="h-5 w-5 overflow-hidden rounded-full bg-muted flex items-center justify-center">
                        <UserCircle className="h-3.5 w-3.5 text-muted-foreground" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] font-medium text-foreground">Juan P.</span>
                        <span className="text-[9px] text-muted-foreground">Chef</span>
                      </div>
                    </div>
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span>
                  </div>
                  <Separator className="my-0" />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div className="h-5 w-5 overflow-hidden rounded-full bg-muted flex items-center justify-center">
                        <UserCircle className="h-3.5 w-3.5 text-muted-foreground" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] font-medium text-foreground">Luis R.</span>
                        <span className="text-[9px] text-muted-foreground">Bartender</span>
                      </div>
                    </div>
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-500" title="En descanso"></span>
                  </div>
                </div>
                <Button variant="outline" className="mt-1.5 w-full h-6 text-[10px]">
                  Ver Horarios
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

