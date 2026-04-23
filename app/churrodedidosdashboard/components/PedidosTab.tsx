"use client";

import { useState } from "react";
import { CheckCircle, Eye, Truck, Clock } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  type DashboardDatos,
  type DeudorDetalle,
  formatMoney,
  formatFechaCorta,
  ESTADO_PEDIDO,
  METODO_PAGO,
} from "../hooks/useDashboardData";

interface PedidosTabProps {
  datos: DashboardDatos;
  cambiarEstadoPedido: (tabla: "pedidos_fabrica" | "pedidos_clientes" | "pedidos_recurrentes", id: number, estado: string) => Promise<boolean>;
  marcarDeudorPagado: (id: number) => Promise<boolean>;
  fetchDeudorDetalles: (deudorId: number) => Promise<DeudorDetalle[]>;
  fetchPedidoDetalles: (tabla: string, pedidoId: number) => Promise<unknown[]>;
}

type PedidoTipo = "fabrica" | "clientes" | "recurrentes";
type DeudorFiltro = "pendiente" | "todos";

const ESTADO_COLOR: Record<string, string> = {
  pendiente: "bg-amber-100 text-amber-800 border-amber-300",
  en_preparacion: "bg-blue-100 text-blue-800 border-blue-300",
  enviado: "bg-purple-100 text-purple-800 border-purple-300",
  entregado: "bg-emerald-100 text-emerald-800 border-emerald-300",
  cancelado: "bg-zinc-100 text-zinc-600 border-zinc-300",
};

const ESTADO_OPTIONS = Object.entries(ESTADO_PEDIDO);

export function PedidosTab({
  datos,
  cambiarEstadoPedido,
  marcarDeudorPagado,
  fetchDeudorDetalles,
  fetchPedidoDetalles,
}: PedidosTabProps) {
  const [pedidoTipo, setPedidoTipo] = useState<PedidoTipo>("fabrica");
  const [deudorFiltro, setDeudorFiltro] = useState<DeudorFiltro>("pendiente");

  // Pedido detalles dialog
  const [detalleOpen, setDetalleOpen] = useState(false);
  const [detalleItems, setDetalleItems] = useState<unknown[]>([]);
  const [loadingDetalle, setLoadingDetalle] = useState(false);

  // Deudor detalles dialog
  const [deudorDetalleOpen, setDeudorDetalleOpen] = useState(false);
  const [deudorDetalles, setDeudorDetalles] = useState<DeudorDetalle[]>([]);
  const [loadingDeudorDetalle, setLoadingDeudorDetalle] = useState(false);

  const handleCambiarEstado = async (
    tabla: "pedidos_fabrica" | "pedidos_clientes" | "pedidos_recurrentes",
    id: number,
    estado: string
  ) => {
    const ok = await cambiarEstadoPedido(tabla, id, estado);
    if (ok) {
      toast.success("Estado actualizado");
    } else {
      toast.error("No se pudo cambiar el estado");
    }
  };

  const handleVerDetallePedido = async (tabla: string, pedidoId: number) => {
    setLoadingDetalle(true);
    setDetalleOpen(true);
    const items = await fetchPedidoDetalles(tabla, pedidoId);
    setDetalleItems(items);
    setLoadingDetalle(false);
  };

  const handleVerDeudorDetalle = async (deudorId: number) => {
    setLoadingDeudorDetalle(true);
    setDeudorDetalleOpen(true);
    const detalles = await fetchDeudorDetalles(deudorId);
    setDeudorDetalles(detalles);
    setLoadingDeudorDetalle(false);
  };

  const handleMarcarPagado = async (id: number) => {
    const ok = await marcarDeudorPagado(id);
    if (ok) {
      toast.success("¡Marcado como pagado!");
    } else {
      toast.error("No se pudo actualizar");
    }
  };

  // Filtrar deudores
  const deudoresFiltrados = deudorFiltro === "pendiente"
    ? datos.deudores.filter((d) => d.estado === "pendiente")
    : datos.deudores;

  return (
    <div className="space-y-8">
      {/* ===== PEDIDOS ===== */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Truck className="w-5 h-5 text-amber-700" />
          <h2 className="text-lg font-bold text-amber-900">Pedidos</h2>
        </div>

        {/* Sub-filtro de tipo de pedido */}
        <div className="flex gap-1.5 mb-4">
          {([
            { value: "fabrica" as const, label: "Fábrica" },
            { value: "clientes" as const, label: "Clientes" },
            { value: "recurrentes" as const, label: "Recurrentes" },
          ]).map((t) => (
            <button
              key={t.value}
              onClick={() => setPedidoTipo(t.value)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                pedidoTipo === t.value
                  ? "bg-amber-800 text-white"
                  : "bg-white text-amber-800 border border-amber-200 hover:bg-amber-50"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Tabla de pedidos fábrica */}
        {pedidoTipo === "fabrica" && (
          datos.pedidosFabrica.length === 0 ? (
            <EmptyState text="No hay pedidos de fábrica en este periodo." />
          ) : (
            <div className="overflow-x-auto rounded-xl border border-amber-200/60">
              <table className="w-full text-sm">
                <thead className="bg-amber-50">
                  <tr>
                    <th className="px-3 py-2.5 text-left text-xs font-semibold text-amber-800">Fecha</th>
                    <th className="px-3 py-2.5 text-left text-xs font-semibold text-amber-800">Punto de venta</th>
                    <th className="px-3 py-2.5 text-center text-xs font-semibold text-amber-800">Productos</th>
                    <th className="px-3 py-2.5 text-left text-xs font-semibold text-amber-800">Estado</th>
                    <th className="px-3 py-2.5 text-center text-xs font-semibold text-amber-800"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-amber-100">
                  {datos.pedidosFabrica.map((p) => (
                    <tr key={p.id} className="hover:bg-amber-50/50">
                      <td className="px-3 py-2.5 text-amber-900">{formatFechaCorta(p.fecha_pedido)}</td>
                      <td className="px-3 py-2.5 text-amber-900">{p.sucursales?.nombre ?? "—"}</td>
                      <td className="px-3 py-2.5 text-center text-amber-700">{p.total_items}</td>
                      <td className="px-3 py-2.5">
                        <Select
                          value={p.estado}
                          onValueChange={(v) => handleCambiarEstado("pedidos_fabrica", p.id, v)}
                        >
                          <SelectTrigger className={`h-7 w-fit text-xs rounded-full border ${ESTADO_COLOR[p.estado] || ""}`}>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {ESTADO_OPTIONS.map(([k, v]) => (
                              <SelectItem key={k} value={k}>{v}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </td>
                      <td className="px-3 py-2.5 text-center">
                        <Button variant="ghost" size="sm" onClick={() => handleVerDetallePedido("pedido_fabrica_detalles", p.id)} className="h-7 w-7 p-0">
                          <Eye className="w-3.5 h-3.5 text-amber-600" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        )}

        {/* Tabla de pedidos clientes */}
        {pedidoTipo === "clientes" && (
          datos.pedidosClientes.length === 0 ? (
            <EmptyState text="No hay pedidos de clientes en este periodo." />
          ) : (
            <div className="overflow-x-auto rounded-xl border border-amber-200/60">
              <table className="w-full text-sm">
                <thead className="bg-amber-50">
                  <tr>
                    <th className="px-3 py-2.5 text-left text-xs font-semibold text-amber-800">Fecha</th>
                    <th className="px-3 py-2.5 text-left text-xs font-semibold text-amber-800">Cliente</th>
                    <th className="px-3 py-2.5 text-left text-xs font-semibold text-amber-800">Dirección</th>
                    <th className="px-3 py-2.5 text-right text-xs font-semibold text-amber-800">Total</th>
                    <th className="px-3 py-2.5 text-left text-xs font-semibold text-amber-800">Pago</th>
                    <th className="px-3 py-2.5 text-left text-xs font-semibold text-amber-800">Estado</th>
                    <th className="px-3 py-2.5 text-center text-xs font-semibold text-amber-800"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-amber-100">
                  {datos.pedidosClientes.map((p) => (
                    <tr key={p.id} className="hover:bg-amber-50/50">
                      <td className="px-3 py-2.5 text-amber-900">{formatFechaCorta(p.fecha_pedido)}</td>
                      <td className="px-3 py-2.5 text-amber-900 font-medium">{p.cliente_nombre}</td>
                      <td className="px-3 py-2.5 text-amber-600 text-xs max-w-[150px] truncate">{p.direccion_entrega}</td>
                      <td className="px-3 py-2.5 text-right font-semibold text-amber-900">{formatMoney(Number(p.total))}</td>
                      <td className="px-3 py-2.5">
                        <Badge variant="outline" className="text-xs">{METODO_PAGO[p.metodo_pago ?? ""] || p.metodo_pago}</Badge>
                      </td>
                      <td className="px-3 py-2.5">
                        <Select
                          value={p.estado}
                          onValueChange={(v) => handleCambiarEstado("pedidos_clientes", p.id, v)}
                        >
                          <SelectTrigger className={`h-7 w-fit text-xs rounded-full border ${ESTADO_COLOR[p.estado] || ""}`}>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {ESTADO_OPTIONS.map(([k, v]) => (
                              <SelectItem key={k} value={k}>{v}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </td>
                      <td className="px-3 py-2.5 text-center">
                        <Button variant="ghost" size="sm" onClick={() => handleVerDetallePedido("pedido_cliente_detalles", p.id)} className="h-7 w-7 p-0">
                          <Eye className="w-3.5 h-3.5 text-amber-600" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        )}

        {/* Tabla de pedidos recurrentes */}
        {pedidoTipo === "recurrentes" && (
          datos.pedidosRecurrentes.length === 0 ? (
            <EmptyState text="No hay pedidos recurrentes en este periodo." />
          ) : (
            <div className="overflow-x-auto rounded-xl border border-amber-200/60">
              <table className="w-full text-sm">
                <thead className="bg-amber-50">
                  <tr>
                    <th className="px-3 py-2.5 text-left text-xs font-semibold text-amber-800">Fecha</th>
                    <th className="px-3 py-2.5 text-left text-xs font-semibold text-amber-800">Cliente</th>
                    <th className="px-3 py-2.5 text-left text-xs font-semibold text-amber-800">Dirección</th>
                    <th className="px-3 py-2.5 text-right text-xs font-semibold text-amber-800">Total</th>
                    <th className="px-3 py-2.5 text-left text-xs font-semibold text-amber-800">Estado</th>
                    <th className="px-3 py-2.5 text-center text-xs font-semibold text-amber-800"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-amber-100">
                  {datos.pedidosRecurrentes.map((p) => (
                    <tr key={p.id} className="hover:bg-amber-50/50">
                      <td className="px-3 py-2.5 text-amber-900">{formatFechaCorta(p.fecha_pedido)}</td>
                      <td className="px-3 py-2.5 text-amber-900 font-medium">{p.cliente_nombre}</td>
                      <td className="px-3 py-2.5 text-amber-600 text-xs max-w-[150px] truncate">{p.direccion_entrega}</td>
                      <td className="px-3 py-2.5 text-right font-semibold text-amber-900">{formatMoney(Number(p.total))}</td>
                      <td className="px-3 py-2.5">
                        <Select
                          value={p.estado}
                          onValueChange={(v) => handleCambiarEstado("pedidos_recurrentes", p.id, v)}
                        >
                          <SelectTrigger className={`h-7 w-fit text-xs rounded-full border ${ESTADO_COLOR[p.estado] || ""}`}>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {ESTADO_OPTIONS.map(([k, v]) => (
                              <SelectItem key={k} value={k}>{v}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </td>
                      <td className="px-3 py-2.5 text-center">
                        <Button variant="ghost" size="sm" onClick={() => handleVerDetallePedido("pedido_recurrente_detalles", p.id)} className="h-7 w-7 p-0">
                          <Eye className="w-3.5 h-3.5 text-amber-600" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        )}
      </section>

      {/* ===== NOS DEBEN ===== */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-amber-700" />
            <h2 className="text-lg font-bold text-amber-900">Nos deben</h2>
          </div>
          <div className="flex gap-1.5">
            <button
              onClick={() => setDeudorFiltro("pendiente")}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                deudorFiltro === "pendiente"
                  ? "bg-amber-800 text-white"
                  : "bg-white text-amber-800 border border-amber-200 hover:bg-amber-50"
              }`}
            >
              Pendientes ({datos.deudores.filter((d) => d.estado === "pendiente").length})
            </button>
            <button
              onClick={() => setDeudorFiltro("todos")}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                deudorFiltro === "todos"
                  ? "bg-amber-800 text-white"
                  : "bg-white text-amber-800 border border-amber-200 hover:bg-amber-50"
              }`}
            >
              Todos
            </button>
          </div>
        </div>

        {deudoresFiltrados.length === 0 ? (
          <EmptyState text={deudorFiltro === "pendiente" ? "¡Nadie te debe! Todo al día." : "No hay deudas registradas."} />
        ) : (
          <div className="overflow-x-auto rounded-xl border border-amber-200/60">
            <table className="w-full text-sm">
              <thead className="bg-amber-50">
                <tr>
                  <th className="px-3 py-2.5 text-left text-xs font-semibold text-amber-800">Quién</th>
                  <th className="px-3 py-2.5 text-left text-xs font-semibold text-amber-800">Punto de venta</th>
                  <th className="px-3 py-2.5 text-left text-xs font-semibold text-amber-800">Desde</th>
                  <th className="px-3 py-2.5 text-right text-xs font-semibold text-amber-800">Cuánto</th>
                  <th className="px-3 py-2.5 text-left text-xs font-semibold text-amber-800">Estado</th>
                  <th className="px-3 py-2.5 text-center text-xs font-semibold text-amber-800"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-amber-100">
                {deudoresFiltrados.map((d) => (
                  <tr key={d.id} className="hover:bg-amber-50/50">
                    <td className="px-3 py-2.5 text-amber-900 font-medium">{d.nombre_deudor}</td>
                    <td className="px-3 py-2.5 text-amber-700">{d.sucursales?.nombre ?? "—"}</td>
                    <td className="px-3 py-2.5 text-amber-600 text-xs">{formatFechaCorta(d.fecha_venta)}</td>
                    <td className="px-3 py-2.5 text-right font-bold text-amber-900">{formatMoney(Number(d.total))}</td>
                    <td className="px-3 py-2.5">
                      <Badge className={`text-xs ${d.estado === "pendiente" ? "bg-amber-100 text-amber-800" : d.estado === "pagado" ? "bg-emerald-100 text-emerald-800" : "bg-zinc-100 text-zinc-600"}`}>
                        {d.estado === "pendiente" ? "Pendiente" : d.estado === "pagado" ? "Pagado" : d.estado}
                      </Badge>
                    </td>
                    <td className="px-3 py-2.5">
                      <div className="flex items-center gap-1 justify-center">
                        {d.estado === "pendiente" && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleMarcarPagado(d.id)}
                            className="h-7 px-2 text-xs text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50 gap-1"
                          >
                            <CheckCircle className="w-3.5 h-3.5" /> Ya pagó
                          </Button>
                        )}
                        <Button variant="ghost" size="sm" onClick={() => handleVerDeudorDetalle(d.id)} className="h-7 w-7 p-0">
                          <Eye className="w-3.5 h-3.5 text-amber-600" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* ===== DIALOGS ===== */}

      {/* Detalle de pedido */}
      <Dialog open={detalleOpen} onOpenChange={setDetalleOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Productos del pedido</DialogTitle>
          </DialogHeader>
          {loadingDetalle ? (
            <p className="text-sm text-amber-600 py-4 text-center">Cargando...</p>
          ) : detalleItems.length === 0 ? (
            <p className="text-sm text-amber-600 py-4 text-center">Sin productos</p>
          ) : (
            <div className="space-y-2">
              {detalleItems.map((item: any, i: number) => (
                <div key={i} className="flex items-center justify-between rounded-lg bg-amber-50 px-3 py-2">
                  <div>
                    <p className="text-sm font-medium text-amber-900">
                      {item.productos?.nombre ?? `Producto #${item.producto_id}`}
                    </p>
                    <p className="text-xs text-amber-600">Cantidad: {item.cantidad}</p>
                  </div>
                  {item.precio_total != null && (
                    <p className="text-sm font-semibold text-amber-900">{formatMoney(Number(item.precio_total))}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Detalle de deudor */}
      <Dialog open={deudorDetalleOpen} onOpenChange={setDeudorDetalleOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Productos adeudados</DialogTitle>
          </DialogHeader>
          {loadingDeudorDetalle ? (
            <p className="text-sm text-amber-600 py-4 text-center">Cargando...</p>
          ) : deudorDetalles.length === 0 ? (
            <p className="text-sm text-amber-600 py-4 text-center">Sin detalles</p>
          ) : (
            <div className="space-y-2">
              {deudorDetalles.map((d) => (
                <div key={d.id} className="flex items-center justify-between rounded-lg bg-amber-50 px-3 py-2">
                  <div>
                    <p className="text-sm font-medium text-amber-900">
                      {d.productos?.nombre ?? `Producto #${d.producto_id}`}
                    </p>
                    <p className="text-xs text-amber-600">{d.cantidad} x {formatMoney(Number(d.precio_unitario))}</p>
                  </div>
                  <p className="text-sm font-semibold text-amber-900">{formatMoney(Number(d.precio_total))}</p>
                </div>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="rounded-xl bg-amber-50 border border-amber-200 p-6 text-center">
      <p className="text-sm text-amber-600">{text}</p>
    </div>
  );
}
