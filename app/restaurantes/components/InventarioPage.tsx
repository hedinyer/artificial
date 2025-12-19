"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Package, Plus, AlertTriangle, ShoppingCart } from "lucide-react";

export default function InventarioPage() {
  const productos = [
    { id: "PROD001", nombre: "Vino Tinto Malbec", categoria: "Bebidas", stock: 2, minimo: 10, estado: "Crítico" },
    { id: "PROD002", nombre: "Lomo Fino", categoria: "Carnes", stock: 4, minimo: 8, estado: "Bajo" },
    { id: "PROD003", nombre: "Salmón Fresco", categoria: "Pescados", stock: 12, minimo: 10, estado: "Normal" },
    { id: "PROD004", nombre: "Queso Brie", categoria: "Lácteos", stock: 5, minimo: 6, estado: "Bajo" },
    { id: "PROD005", nombre: "Aceite de Oliva", categoria: "Aceites", stock: 15, minimo: 5, estado: "Normal" },
    { id: "PROD006", nombre: "Tomates Cherry", categoria: "Verduras", stock: 8, minimo: 10, estado: "Bajo" },
  ];

  const getEstadoBadge = (estado: string) => {
    switch(estado) {
      case "Crítico":
        return <Badge variant="destructive" className="text-[9px] px-1 py-0 h-3">{estado}</Badge>;
      case "Bajo":
        return <Badge className="bg-orange-500/10 text-orange-600 hover:bg-orange-500/20 border-orange-500/20 text-[9px] px-1 py-0 h-3">{estado}</Badge>;
      default:
        return <Badge className="bg-green-500/10 text-green-600 hover:bg-green-500/20 border-green-500/20 text-[9px] px-1 py-0 h-3">{estado}</Badge>;
    }
  };

  return (
    <div className="flex-1 overflow-hidden p-1.5 lg:p-2 bg-background">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 h-full">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-foreground">Inventario</h2>
            <p className="text-[10px] text-muted-foreground">Gestiona el stock de productos</p>
          </div>
          <Button className="h-7 text-[10px] px-2">
            <Plus className="h-2.5 w-2.5 mr-1" />
            Agregar Producto
          </Button>
        </div>
        
        <Card className="border-border/50 flex-1 flex flex-col min-h-0">
          <CardHeader className="pb-1.5 px-2 pt-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-sm font-semibold">Productos</CardTitle>
                <CardDescription className="text-[10px]">Lista de productos en inventario</CardDescription>
              </div>
              <Badge variant="destructive" className="text-[9px] px-1.5 py-0 h-4">
                <AlertTriangle className="h-2.5 w-2.5 mr-0.5" />
                2 Alertas
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-0 flex-1 min-h-0 overflow-auto">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-border/50">
                    <TableHead className="h-7 text-[10px] font-semibold text-muted-foreground px-2">ID</TableHead>
                    <TableHead className="h-7 text-[10px] font-semibold text-muted-foreground px-2">Producto</TableHead>
                    <TableHead className="h-7 text-[10px] font-semibold text-muted-foreground px-2">Categoría</TableHead>
                    <TableHead className="h-7 text-[10px] font-semibold text-muted-foreground px-2">Stock</TableHead>
                    <TableHead className="h-7 text-[10px] font-semibold text-muted-foreground px-2">Mínimo</TableHead>
                    <TableHead className="h-7 text-[10px] font-semibold text-muted-foreground px-2">Estado</TableHead>
                    <TableHead className="h-7 text-[10px] font-semibold text-muted-foreground px-2">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {productos.map((producto) => (
                    <TableRow key={producto.id} className="border-border/50 hover:bg-muted/50 transition-colors">
                      <TableCell className="font-semibold text-xs px-2">{producto.id}</TableCell>
                      <TableCell className="text-xs px-2">{producto.nombre}</TableCell>
                      <TableCell className="text-xs px-2">{producto.categoria}</TableCell>
                      <TableCell className="text-xs px-2 font-semibold">{producto.stock}</TableCell>
                      <TableCell className="text-xs px-2 text-muted-foreground">{producto.minimo}</TableCell>
                      <TableCell className="px-2">{getEstadoBadge(producto.estado)}</TableCell>
                      <TableCell className="px-2">
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                          <ShoppingCart className="h-3 w-3" />
                        </Button>
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

