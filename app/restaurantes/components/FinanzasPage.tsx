"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CreditCard, TrendingUp, TrendingDown, DollarSign, ArrowUp, ArrowDown } from "lucide-react";

export default function FinanzasPage() {
  return (
    <div className="flex-1 overflow-hidden p-1.5 lg:p-2 bg-background">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 h-full">
        <div>
          <h2 className="text-base font-bold text-foreground">Finanzas</h2>
          <p className="text-[10px] text-muted-foreground">Análisis financiero y reportes</p>
        </div>
        
        <section className="grid grid-cols-2 gap-1.5 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="relative overflow-hidden border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 px-2 pt-2">
              <CardTitle className="text-[10px] font-medium text-muted-foreground">Ventas Hoy</CardTitle>
              <Badge className="bg-green-500/10 text-green-600 border-green-500/20 px-1.5 py-0 rounded-full text-[10px]">
                <ArrowUp className="h-2 w-2 mr-0.5" />
                +12%
              </Badge>
            </CardHeader>
            <CardContent className="px-2 pb-2 pt-0">
              <div className="text-lg font-bold text-foreground mb-0.5">$1,250.00</div>
              <p className="text-[10px] text-muted-foreground mt-0.5">vs ayer</p>
            </CardContent>
          </Card>
          
          <Card className="relative overflow-hidden border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 px-2 pt-2">
              <CardTitle className="text-[10px] font-medium text-muted-foreground">Ventas Semana</CardTitle>
              <Badge className="bg-green-500/10 text-green-600 border-green-500/20 px-1.5 py-0 rounded-full text-[10px]">
                <ArrowUp className="h-2 w-2 mr-0.5" />
                +8%
              </Badge>
            </CardHeader>
            <CardContent className="px-2 pb-2 pt-0">
              <div className="text-lg font-bold text-foreground mb-0.5">$8,450.00</div>
              <p className="text-[10px] text-muted-foreground mt-0.5">vs semana anterior</p>
            </CardContent>
          </Card>
          
          <Card className="relative overflow-hidden border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 px-2 pt-2">
              <CardTitle className="text-[10px] font-medium text-muted-foreground">Gastos Mes</CardTitle>
              <Badge className="bg-red-500/10 text-red-600 border-red-500/20 px-1.5 py-0 rounded-full text-[10px]">
                <ArrowDown className="h-2 w-2 mr-0.5" />
                -5%
              </Badge>
            </CardHeader>
            <CardContent className="px-2 pb-2 pt-0">
              <div className="text-lg font-bold text-foreground mb-0.5">$3,200.00</div>
              <p className="text-[10px] text-muted-foreground mt-0.5">vs mes anterior</p>
            </CardContent>
          </Card>
          
          <Card className="relative overflow-hidden border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 px-2 pt-2">
              <CardTitle className="text-[10px] font-medium text-muted-foreground">Utilidad Neta</CardTitle>
              <Badge className="bg-green-500/10 text-green-600 border-green-500/20 px-1.5 py-0 rounded-full text-[10px]">
                <TrendingUp className="h-2 w-2 mr-0.5" />
                +15%
              </Badge>
            </CardHeader>
            <CardContent className="px-2 pb-2 pt-0">
              <div className="text-lg font-bold text-foreground mb-0.5">$5,250.00</div>
              <p className="text-[10px] text-muted-foreground mt-0.5">Este mes</p>
            </CardContent>
          </Card>
        </section>
        
        <div className="grid grid-cols-1 gap-2 lg:grid-cols-2 flex-1 min-h-0">
          <Card className="border-border/50">
            <CardHeader className="pb-1.5 px-2 pt-2">
              <CardTitle className="text-sm font-semibold">Resumen Financiero</CardTitle>
              <CardDescription className="text-[10px]">Resumen del mes actual</CardDescription>
            </CardHeader>
            <CardContent className="px-3 pb-3">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">Ingresos Totales</span>
                  <span className="text-sm font-bold text-green-600">$12,500.00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">Gastos Totales</span>
                  <span className="text-sm font-bold text-red-600">$3,200.00</span>
                </div>
                <div className="border-t pt-2 flex justify-between items-center">
                  <span className="text-xs font-semibold">Utilidad Neta</span>
                  <span className="text-sm font-bold">$9,300.00</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-border/50">
            <CardHeader className="pb-2 px-3 pt-3">
              <CardTitle className="text-sm font-semibold">Métodos de Pago</CardTitle>
              <CardDescription className="text-[10px]">Distribución de pagos</CardDescription>
            </CardHeader>
            <CardContent className="px-3 pb-3">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">Efectivo</span>
                  <span className="text-xs font-semibold">45%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">Tarjeta</span>
                  <span className="text-xs font-semibold">50%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">Digital</span>
                  <span className="text-xs font-semibold">5%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

