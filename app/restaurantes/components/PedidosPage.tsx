"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Receipt, Plus, ChefHat, Clock, CheckCircle, X } from "lucide-react";

export default function PedidosPage() {
  const pedidos = [
    { id: "#1024", mesa: "Mesa 02", estado: "En Cocina", total: "$45.00", hora: "12:30", items: 3 },
    { id: "#1025", mesa: "Mesa 06", estado: "Pendiente", total: "$120.50", hora: "12:35", items: 5 },
    { id: "#1026", mesa: "Mesa 01", estado: "Servido", total: "$82.00", hora: "12:15", items: 4 },
    { id: "#1027", mesa: "Mesa 05", estado: "En Cocina", total: "$65.00", hora: "13:00", items: 2 },
    { id: "#1028", mesa: "Mesa 03", estado: "Pendiente", total: "$95.00", hora: "13:10", items: 4 },
  ];

  const getEstadoBadge = (estado: string) => {
    switch(estado) {
      case "En Cocina":
        return <Badge className="bg-blue-500/10 text-blue-600 hover:bg-blue-500/20 border-blue-500/20 text-[10px] px-1.5 py-0 h-4">
          <ChefHat className="h-2.5 w-2.5 mr-0.5" />
          {estado}
        </Badge>;
      case "Pendiente":
        return <Badge className="bg-amber-500/10 text-amber-600 hover:bg-amber-500/20 border-amber-500/20 text-[10px] px-1.5 py-0 h-4">
          <Clock className="h-2.5 w-2.5 mr-0.5" />
          {estado}
        </Badge>;
      case "Servido":
        return <Badge className="bg-green-500/10 text-green-600 hover:bg-green-500/20 border-green-500/20 text-[10px] px-1.5 py-0 h-4">
          <CheckCircle className="h-2.5 w-2.5 mr-0.5" />
          {estado}
        </Badge>;
      default:
        return <Badge>{estado}</Badge>;
    }
  };

  return (
    <div className="flex-1 overflow-hidden p-1.5 lg:p-2 bg-background">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 h-full">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-foreground">Gestión de Pedidos</h2>
            <p className="text-[10px] text-muted-foreground">Administra todos los pedidos del restaurante</p>
          </div>
          <Button className="h-7 text-[10px] px-2">
            <Plus className="h-2.5 w-2.5 mr-1" />
            Nuevo Pedido
          </Button>
        </div>
        
        <Card className="border-border/50 flex-1 flex flex-col min-h-0">
          <CardHeader className="pb-1.5 px-2 pt-2">
            <CardTitle className="text-sm font-semibold">Pedidos Activos</CardTitle>
            <CardDescription className="text-[10px]">Lista de todos los pedidos en curso</CardDescription>
          </CardHeader>
          <CardContent className="p-0 flex-1 min-h-0 overflow-auto">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-border/50">
                    <TableHead className="h-7 text-[10px] font-semibold text-muted-foreground px-2">ID Pedido</TableHead>
                    <TableHead className="h-7 text-[10px] font-semibold text-muted-foreground px-2">Mesa</TableHead>
                    <TableHead className="h-7 text-[10px] font-semibold text-muted-foreground px-2">Estado</TableHead>
                    <TableHead className="h-7 text-[10px] font-semibold text-muted-foreground px-2">Items</TableHead>
                    <TableHead className="h-7 text-[10px] font-semibold text-muted-foreground px-2">Total</TableHead>
                    <TableHead className="h-7 text-[10px] font-semibold text-muted-foreground px-2">Hora</TableHead>
                    <TableHead className="h-7 text-[10px] font-semibold text-muted-foreground px-2">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pedidos.map((pedido) => (
                    <TableRow key={pedido.id} className="border-border/50 hover:bg-muted/50 transition-colors">
                      <TableCell className="font-semibold text-xs px-2">{pedido.id}</TableCell>
                      <TableCell className="text-xs px-2">{pedido.mesa}</TableCell>
                      <TableCell className="px-2">{getEstadoBadge(pedido.estado)}</TableCell>
                      <TableCell className="text-xs px-2">{pedido.items}</TableCell>
                      <TableCell className="font-semibold text-xs px-2">{pedido.total}</TableCell>
                      <TableCell className="text-[10px] text-muted-foreground px-2">{pedido.hora}</TableCell>
                      <TableCell className="px-2">
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <Receipt className="h-3 w-3" />
                          </Button>
                          {pedido.estado !== "Servido" && (
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                              <CheckCircle className="h-3 w-3 text-green-600" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

