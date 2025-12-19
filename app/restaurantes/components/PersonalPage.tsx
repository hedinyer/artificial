"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Users, UserPlus, UserCircle, Clock, CheckCircle } from "lucide-react";

export default function PersonalPage() {
  const personal = [
    { nombre: "Maria González", rol: "Mesera", zona: "Zona A", estado: "Activo", desde: "08:00" },
    { nombre: "Juan Pérez", rol: "Chef Principal", zona: "Cocina", estado: "Activo", desde: "07:00" },
    { nombre: "Luis Rodríguez", rol: "Bartender", zona: "Barra", estado: "Descanso", desde: "10:00" },
    { nombre: "Ana Martínez", rol: "Mesera", zona: "Zona B", estado: "Activo", desde: "09:00" },
    { nombre: "Carlos Sánchez", rol: "Sous Chef", zona: "Cocina", estado: "Activo", desde: "08:30" },
  ];

  return (
    <div className="flex-1 overflow-hidden p-1.5 lg:p-2 bg-background">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 h-full">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-foreground">Personal</h2>
            <p className="text-[10px] text-muted-foreground">Gestiona el personal del restaurante</p>
          </div>
          <Button className="h-7 text-[10px] px-2">
            <UserPlus className="h-2.5 w-2.5 mr-1" />
            Agregar Personal
          </Button>
        </div>
        
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 flex-1 min-h-0 overflow-auto">
          {personal.map((persona, index) => (
            <Card key={index} className="border-border/50">
              <CardHeader className="pb-1.5 px-2 pt-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 overflow-hidden rounded-full bg-muted flex items-center justify-center">
                      <UserCircle className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <CardTitle className="text-sm font-semibold">{persona.nombre}</CardTitle>
                      <CardDescription className="text-[10px]">{persona.rol}</CardDescription>
                    </div>
                  </div>
                  <span className={`h-2 w-2 rounded-full ${persona.estado === "Activo" ? "bg-green-500" : "bg-amber-500"}`}></span>
                </div>
              </CardHeader>
              <CardContent className="px-2 pb-2">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-muted-foreground">Zona:</span>
                    <span className="font-medium">{persona.zona}</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-muted-foreground">Estado:</span>
                    <Badge className={`text-[8px] px-1 py-0 h-3.5 ${
                      persona.estado === "Activo"
                        ? "bg-green-500/10 text-green-600 border-green-500/20"
                        : "bg-amber-500/10 text-amber-600 border-amber-500/20"
                    }`}>
                      {persona.estado}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-muted-foreground">Desde:</span>
                    <span className="font-medium">{persona.desde}</span>
                  </div>
                </div>
                <Separator className="my-1.5" />
                <div className="flex gap-1">
                  <Button variant="outline" size="sm" className="h-5 text-[9px] px-1.5 flex-1">
                    Ver Detalles
                  </Button>
                  <Button variant="outline" size="sm" className="h-5 text-[9px] px-1.5 flex-1">
                    Editar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

