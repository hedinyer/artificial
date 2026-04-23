"use client";

import { useState } from "react";
import { Toaster } from "sonner";
import { Home, DollarSign, Package, ClipboardList, Store } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDashboardData, type Periodo } from "./hooks/useDashboardData";
import { ResumenTab } from "./components/ResumenTab";
import { DineroTab } from "./components/DineroTab";
import { InventarioTab } from "./components/InventarioTab";
import { PedidosTab } from "./components/PedidosTab";
import { MiNegocioTab } from "./components/MiNegocioTab";

const PERIODOS: { value: Periodo; label: string }[] = [
  { value: "today", label: "Hoy" },
  { value: "week", label: "Esta semana" },
  { value: "month", label: "Este mes" },
];

function getFechaHoy(): string {
  return new Date().toLocaleDateString("es-CO", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function ChurroDeDidosDashboardPage() {
  const [periodo, setPeriodo] = useState<Periodo>("today");
  const [sucursalId, setSucursalId] = useState<number | null>(null);

  const {
    datos,
    loading,
    error,
    refetch,
    agregarGastoPV,
    editarGastoPV,
    borrarGastoPV,
    agregarGastoVario,
    editarGastoVario,
    borrarGastoVario,
    actualizarInventario,
    actualizarInventarioFabrica,
    cambiarEstadoPedido,
    marcarDeudorPagado,
    actualizarSucursal,
    fetchVentaDetalles,
    fetchDeudorDetalles,
    fetchPedidoDetalles,
  } = useDashboardData(periodo, sucursalId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100">
      <Toaster position="top-center" richColors closeButton />

      <div className="max-w-6xl mx-auto px-4 py-6 md:py-8">
        {/* Header */}
        <header className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-amber-900">
            Hola! Así va Churro de Didos
          </h1>
          <p className="mt-1 text-sm text-amber-700 capitalize">{getFechaHoy()}</p>
        </header>

        {/* Filtros */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          {/* Periodo */}
          <div className="flex gap-1.5">
            {PERIODOS.map((p) => (
              <button
                key={p.value}
                onClick={() => setPeriodo(p.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  periodo === p.value
                    ? "bg-amber-800 text-white shadow-sm"
                    : "bg-white text-amber-800 border border-amber-200 hover:bg-amber-100"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Sucursales */}
          {datos && datos.sucursales.length > 0 && (
            <div className="flex gap-1.5 flex-wrap">
              <button
                onClick={() => setSucursalId(null)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  sucursalId === null
                    ? "bg-orange-700 text-white shadow-sm"
                    : "bg-white text-orange-800 border border-orange-200 hover:bg-orange-100"
                }`}
              >
                Todas
              </button>
              {datos.sucursales.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSucursalId(s.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    sucursalId === s.id
                      ? "bg-orange-700 text-white shadow-sm"
                      : "bg-white text-orange-800 border border-orange-200 hover:bg-orange-100"
                  }`}
                >
                  {s.nombre}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-2xl bg-red-50 border border-red-200 p-4 flex items-center justify-between">
            <p className="text-sm text-red-800">{error}</p>
            <button
              onClick={refetch}
              className="ml-4 px-4 py-1.5 rounded-full bg-red-600 text-white text-sm font-medium hover:bg-red-700"
            >
              Reintentar
            </button>
          </div>
        )}

        {/* Loading */}
        {loading && !datos && (
          <div className="flex items-center justify-center py-24">
            <div className="text-center">
              <div className="w-10 h-10 border-4 border-amber-300 border-t-amber-700 rounded-full animate-spin mx-auto" />
              <p className="mt-4 text-amber-800 text-sm">Cargando datos...</p>
            </div>
          </div>
        )}

        {/* Dashboard */}
        {datos && (
          <div className="rounded-2xl bg-white/80 backdrop-blur-sm border border-amber-200/60 shadow-lg p-4 md:p-6">
            <Tabs defaultValue="resumen">
              <TabsList className="w-full justify-start bg-amber-50 border border-amber-200/60 rounded-xl p-1 mb-6 flex-wrap h-auto gap-1">
                <TabsTrigger value="resumen" className="rounded-lg data-[state=active]:bg-amber-800 data-[state=active]:text-white text-sm gap-1.5">
                  <Home className="w-4 h-4" />
                  <span className="hidden sm:inline">Resumen</span>
                </TabsTrigger>
                <TabsTrigger value="dinero" className="rounded-lg data-[state=active]:bg-amber-800 data-[state=active]:text-white text-sm gap-1.5">
                  <DollarSign className="w-4 h-4" />
                  <span className="hidden sm:inline">Dinero</span>
                </TabsTrigger>
                <TabsTrigger value="inventario" className="rounded-lg data-[state=active]:bg-amber-800 data-[state=active]:text-white text-sm gap-1.5">
                  <Package className="w-4 h-4" />
                  <span className="hidden sm:inline">Inventario</span>
                </TabsTrigger>
                <TabsTrigger value="pedidos" className="rounded-lg data-[state=active]:bg-amber-800 data-[state=active]:text-white text-sm gap-1.5">
                  <ClipboardList className="w-4 h-4" />
                  <span className="hidden sm:inline">Pedidos</span>
                </TabsTrigger>
                <TabsTrigger value="negocio" className="rounded-lg data-[state=active]:bg-amber-800 data-[state=active]:text-white text-sm gap-1.5">
                  <Store className="w-4 h-4" />
                  <span className="hidden sm:inline">Mi Negocio</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="resumen">
                <ResumenTab datos={datos} periodo={periodo} />
              </TabsContent>

              <TabsContent value="dinero">
                <DineroTab
                  datos={datos}
                  agregarGastoPV={agregarGastoPV}
                  editarGastoPV={editarGastoPV}
                  borrarGastoPV={borrarGastoPV}
                  agregarGastoVario={agregarGastoVario}
                  editarGastoVario={editarGastoVario}
                  borrarGastoVario={borrarGastoVario}
                  fetchVentaDetalles={fetchVentaDetalles}
                />
              </TabsContent>

              <TabsContent value="inventario">
                <InventarioTab
                  datos={datos}
                  actualizarInventario={actualizarInventario}
                  actualizarInventarioFabrica={actualizarInventarioFabrica}
                />
              </TabsContent>

              <TabsContent value="pedidos">
                <PedidosTab
                  datos={datos}
                  cambiarEstadoPedido={cambiarEstadoPedido}
                  marcarDeudorPagado={marcarDeudorPagado}
                  fetchDeudorDetalles={fetchDeudorDetalles}
                  fetchPedidoDetalles={fetchPedidoDetalles}
                />
              </TabsContent>

              <TabsContent value="negocio">
                <MiNegocioTab
                  datos={datos}
                  actualizarSucursal={actualizarSucursal}
                  periodo={periodo}
                />
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </div>
  );
}
