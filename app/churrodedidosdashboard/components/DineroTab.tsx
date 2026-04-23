"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, Eye } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import {
  type DashboardDatos,
  type VentaDetalle,
  type GastoPV,
  type GastoVario,
  formatMoney,
  formatFechaCorta,
  TIPO_GASTO_PV,
  TIPO_GASTO_VARIO,
  METODO_PAGO,
} from "../hooks/useDashboardData";

interface DineroTabProps {
  datos: DashboardDatos;
  agregarGastoPV: (data: { sucursal_id: number; descripcion: string; monto: number; tipo: string }) => Promise<boolean>;
  editarGastoPV: (id: number, data: { descripcion?: string; monto?: number; tipo?: string }) => Promise<boolean>;
  borrarGastoPV: (id: number) => Promise<boolean>;
  agregarGastoVario: (data: { descripcion: string; monto: number; tipo: string }) => Promise<boolean>;
  editarGastoVario: (id: number, data: { descripcion?: string; monto?: number; tipo?: string }) => Promise<boolean>;
  borrarGastoVario: (id: number) => Promise<boolean>;
  fetchVentaDetalles: (ventaId: number) => Promise<VentaDetalle[]>;
}

// ===== Formulario de gasto PV =====
interface GastoFormPV {
  sucursal_id: string;
  descripcion: string;
  monto: string;
  tipo: string;
}

const emptyGastoFormPV: GastoFormPV = { sucursal_id: "", descripcion: "", monto: "", tipo: "otro" };

// ===== Formulario de gasto Vario =====
interface GastoFormVario {
  descripcion: string;
  monto: string;
  tipo: string;
}

const emptyGastoFormVario: GastoFormVario = { descripcion: "", monto: "", tipo: "otro" };

export function DineroTab({
  datos,
  agregarGastoPV,
  editarGastoPV,
  borrarGastoPV,
  agregarGastoVario,
  editarGastoVario,
  borrarGastoVario,
  fetchVentaDetalles,
}: DineroTabProps) {
  // Ventas detalle modal
  const [ventaDetalles, setVentaDetalles] = useState<VentaDetalle[]>([]);
  const [ventaDetalleOpen, setVentaDetalleOpen] = useState(false);
  const [loadingDetalle, setLoadingDetalle] = useState(false);

  // Gasto PV modal
  const [gastoPVOpen, setGastoPVOpen] = useState(false);
  const [gastoPVForm, setGastoPVForm] = useState<GastoFormPV>(emptyGastoFormPV);
  const [editingGastoPVId, setEditingGastoPVId] = useState<number | null>(null);
  const [savingGastoPV, setSavingGastoPV] = useState(false);

  // Gasto Vario modal
  const [gastoVarioOpen, setGastoVarioOpen] = useState(false);
  const [gastoVarioForm, setGastoVarioForm] = useState<GastoFormVario>(emptyGastoFormVario);
  const [editingGastoVarioId, setEditingGastoVarioId] = useState<number | null>(null);
  const [savingGastoVario, setSavingGastoVario] = useState(false);

  // Delete confirmation
  const [deleteTarget, setDeleteTarget] = useState<{ type: "pv" | "vario"; id: number } | null>(null);

  // Ver detalles de venta
  const handleVerVenta = async (ventaId: number) => {
    setLoadingDetalle(true);
    setVentaDetalleOpen(true);
    const detalles = await fetchVentaDetalles(ventaId);
    setVentaDetalles(detalles);
    setLoadingDetalle(false);
  };

  // Guardar gasto PV
  const handleSaveGastoPV = async () => {
    if (!gastoPVForm.descripcion || !gastoPVForm.monto) {
      toast.error("Llena la descripción y el monto");
      return;
    }
    setSavingGastoPV(true);
    let ok: boolean;
    if (editingGastoPVId) {
      ok = await editarGastoPV(editingGastoPVId, {
        descripcion: gastoPVForm.descripcion,
        monto: Number(gastoPVForm.monto),
        tipo: gastoPVForm.tipo,
      });
    } else {
      if (!gastoPVForm.sucursal_id) {
        toast.error("Selecciona un punto de venta");
        setSavingGastoPV(false);
        return;
      }
      ok = await agregarGastoPV({
        sucursal_id: Number(gastoPVForm.sucursal_id),
        descripcion: gastoPVForm.descripcion,
        monto: Number(gastoPVForm.monto),
        tipo: gastoPVForm.tipo,
      });
    }
    setSavingGastoPV(false);
    if (ok) {
      toast.success("¡Listo! Gasto guardado");
      setGastoPVOpen(false);
      setEditingGastoPVId(null);
      setGastoPVForm(emptyGastoFormPV);
    } else {
      toast.error("Hubo un problema, intenta de nuevo");
    }
  };

  // Guardar gasto Vario
  const handleSaveGastoVario = async () => {
    if (!gastoVarioForm.descripcion || !gastoVarioForm.monto) {
      toast.error("Llena la descripción y el monto");
      return;
    }
    setSavingGastoVario(true);
    let ok: boolean;
    if (editingGastoVarioId) {
      ok = await editarGastoVario(editingGastoVarioId, {
        descripcion: gastoVarioForm.descripcion,
        monto: Number(gastoVarioForm.monto),
        tipo: gastoVarioForm.tipo,
      });
    } else {
      ok = await agregarGastoVario({
        descripcion: gastoVarioForm.descripcion,
        monto: Number(gastoVarioForm.monto),
        tipo: gastoVarioForm.tipo,
      });
    }
    setSavingGastoVario(false);
    if (ok) {
      toast.success("¡Listo! Gasto guardado");
      setGastoVarioOpen(false);
      setEditingGastoVarioId(null);
      setGastoVarioForm(emptyGastoFormVario);
    } else {
      toast.error("Hubo un problema, intenta de nuevo");
    }
  };

  // Abrir edicion gasto PV
  const handleEditGastoPV = (g: GastoPV) => {
    setEditingGastoPVId(g.id);
    setGastoPVForm({
      sucursal_id: String(g.sucursal_id),
      descripcion: g.descripcion,
      monto: String(g.monto),
      tipo: g.tipo,
    });
    setGastoPVOpen(true);
  };

  // Abrir edicion gasto Vario
  const handleEditGastoVario = (g: GastoVario) => {
    setEditingGastoVarioId(g.id);
    setGastoVarioForm({
      descripcion: g.descripcion,
      monto: String(g.monto),
      tipo: g.tipo,
    });
    setGastoVarioOpen(true);
  };

  // Confirmar borrado
  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    let ok: boolean;
    if (deleteTarget.type === "pv") {
      ok = await borrarGastoPV(deleteTarget.id);
    } else {
      ok = await borrarGastoVario(deleteTarget.id);
    }
    if (ok) {
      toast.success("Gasto eliminado");
    } else {
      toast.error("No se pudo eliminar");
    }
    setDeleteTarget(null);
  };

  return (
    <div className="space-y-8">
      {/* ===== VENTAS ===== */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-amber-900">Ventas</h2>
          <p className="text-sm font-semibold text-emerald-700">
            Total: {formatMoney(datos.totalVentas)}
          </p>
        </div>

        {datos.ventas.length === 0 ? (
          <div className="rounded-xl bg-amber-50 border border-amber-200 p-6 text-center">
            <p className="text-sm text-amber-600">No hay ventas en este periodo.</p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-amber-200/60">
            <table className="w-full text-sm">
              <thead className="bg-amber-50">
                <tr>
                  <th className="px-3 py-2.5 text-left text-xs font-semibold text-amber-800">Fecha</th>
                  <th className="px-3 py-2.5 text-left text-xs font-semibold text-amber-800">Hora</th>
                  <th className="px-3 py-2.5 text-left text-xs font-semibold text-amber-800">Punto de venta</th>
                  <th className="px-3 py-2.5 text-right text-xs font-semibold text-amber-800">Total</th>
                  <th className="px-3 py-2.5 text-left text-xs font-semibold text-amber-800">Pago</th>
                  <th className="px-3 py-2.5 text-center text-xs font-semibold text-amber-800"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-amber-100">
                {datos.ventas.slice(0, 50).map((v) => (
                  <tr key={v.id} className="hover:bg-amber-50/50">
                    <td className="px-3 py-2.5 text-amber-900">{formatFechaCorta(v.fecha_venta)}</td>
                    <td className="px-3 py-2.5 text-amber-700">{v.hora_venta?.slice(0, 5)}</td>
                    <td className="px-3 py-2.5 text-amber-900">{v.sucursales?.nombre ?? "—"}</td>
                    <td className="px-3 py-2.5 text-right font-semibold text-amber-900">{formatMoney(Number(v.total))}</td>
                    <td className="px-3 py-2.5">
                      <Badge variant="outline" className="text-xs">
                        {METODO_PAGO[v.metodo_pago] || v.metodo_pago}
                      </Badge>
                    </td>
                    <td className="px-3 py-2.5 text-center">
                      <Button variant="ghost" size="sm" onClick={() => handleVerVenta(v.id)} className="h-7 w-7 p-0">
                        <Eye className="w-3.5 h-3.5 text-amber-600" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {datos.ventas.length > 50 && (
              <p className="text-xs text-amber-600 text-center py-2">Mostrando las primeras 50 ventas</p>
            )}
          </div>
        )}
      </section>

      {/* ===== GASTOS PUNTO DE VENTA ===== */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-lg font-bold text-amber-900">Gastos de puntos de venta</h2>
            <p className="text-xs text-amber-600">Total: {formatMoney(datos.totalGastosPV)}</p>
          </div>
          <Button
            onClick={() => {
              setEditingGastoPVId(null);
              setGastoPVForm(emptyGastoFormPV);
              setGastoPVOpen(true);
            }}
            className="bg-amber-700 hover:bg-amber-800 text-white rounded-full gap-1.5 text-sm"
            size="sm"
          >
            <Plus className="w-4 h-4" /> Agregar gasto
          </Button>
        </div>

        {datos.gastosPV.length === 0 ? (
          <div className="rounded-xl bg-amber-50 border border-amber-200 p-6 text-center">
            <p className="text-sm text-amber-600">No hay gastos de punto de venta en este periodo.</p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-amber-200/60">
            <table className="w-full text-sm">
              <thead className="bg-amber-50">
                <tr>
                  <th className="px-3 py-2.5 text-left text-xs font-semibold text-amber-800">Fecha</th>
                  <th className="px-3 py-2.5 text-left text-xs font-semibold text-amber-800">Punto de venta</th>
                  <th className="px-3 py-2.5 text-left text-xs font-semibold text-amber-800">Descripción</th>
                  <th className="px-3 py-2.5 text-left text-xs font-semibold text-amber-800">Tipo</th>
                  <th className="px-3 py-2.5 text-right text-xs font-semibold text-amber-800">Monto</th>
                  <th className="px-3 py-2.5 text-center text-xs font-semibold text-amber-800"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-amber-100">
                {datos.gastosPV.map((g) => (
                  <tr key={g.id} className="hover:bg-amber-50/50">
                    <td className="px-3 py-2.5 text-amber-900">{formatFechaCorta(g.fecha)}</td>
                    <td className="px-3 py-2.5 text-amber-900">{g.sucursales?.nombre ?? "—"}</td>
                    <td className="px-3 py-2.5 text-amber-700 max-w-[200px] truncate">{g.descripcion}</td>
                    <td className="px-3 py-2.5">
                      <Badge variant="outline" className="text-xs">{TIPO_GASTO_PV[g.tipo] || g.tipo}</Badge>
                    </td>
                    <td className="px-3 py-2.5 text-right font-semibold text-orange-800">{formatMoney(Number(g.monto))}</td>
                    <td className="px-3 py-2.5">
                      <div className="flex items-center gap-1 justify-center">
                        <Button variant="ghost" size="sm" onClick={() => handleEditGastoPV(g)} className="h-7 w-7 p-0">
                          <Pencil className="w-3.5 h-3.5 text-amber-600" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => setDeleteTarget({ type: "pv", id: g.id })} className="h-7 w-7 p-0">
                          <Trash2 className="w-3.5 h-3.5 text-red-500" />
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

      {/* ===== GASTOS VARIOS ===== */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-lg font-bold text-amber-900">Gastos varios</h2>
            <p className="text-xs text-amber-600">Total: {formatMoney(datos.totalGastosVarios)}</p>
          </div>
          <Button
            onClick={() => {
              setEditingGastoVarioId(null);
              setGastoVarioForm(emptyGastoFormVario);
              setGastoVarioOpen(true);
            }}
            className="bg-amber-700 hover:bg-amber-800 text-white rounded-full gap-1.5 text-sm"
            size="sm"
          >
            <Plus className="w-4 h-4" /> Agregar gasto
          </Button>
        </div>

        {datos.gastosVarios.length === 0 ? (
          <div className="rounded-xl bg-amber-50 border border-amber-200 p-6 text-center">
            <p className="text-sm text-amber-600">No hay gastos varios en este periodo.</p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-amber-200/60">
            <table className="w-full text-sm">
              <thead className="bg-amber-50">
                <tr>
                  <th className="px-3 py-2.5 text-left text-xs font-semibold text-amber-800">Fecha</th>
                  <th className="px-3 py-2.5 text-left text-xs font-semibold text-amber-800">Descripción</th>
                  <th className="px-3 py-2.5 text-left text-xs font-semibold text-amber-800">Tipo</th>
                  <th className="px-3 py-2.5 text-right text-xs font-semibold text-amber-800">Monto</th>
                  <th className="px-3 py-2.5 text-center text-xs font-semibold text-amber-800"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-amber-100">
                {datos.gastosVarios.map((g) => (
                  <tr key={g.id} className="hover:bg-amber-50/50">
                    <td className="px-3 py-2.5 text-amber-900">{formatFechaCorta(g.fecha)}</td>
                    <td className="px-3 py-2.5 text-amber-700 max-w-[200px] truncate">{g.descripcion}</td>
                    <td className="px-3 py-2.5">
                      <Badge variant="outline" className="text-xs">{TIPO_GASTO_VARIO[g.tipo] || g.tipo}</Badge>
                    </td>
                    <td className="px-3 py-2.5 text-right font-semibold text-orange-800">{formatMoney(Number(g.monto))}</td>
                    <td className="px-3 py-2.5">
                      <div className="flex items-center gap-1 justify-center">
                        <Button variant="ghost" size="sm" onClick={() => handleEditGastoVario(g)} className="h-7 w-7 p-0">
                          <Pencil className="w-3.5 h-3.5 text-amber-600" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => setDeleteTarget({ type: "vario", id: g.id })} className="h-7 w-7 p-0">
                          <Trash2 className="w-3.5 h-3.5 text-red-500" />
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

      {/* Dialog ver detalle de venta */}
      <Dialog open={ventaDetalleOpen} onOpenChange={setVentaDetalleOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Productos de esta venta</DialogTitle>
          </DialogHeader>
          {loadingDetalle ? (
            <p className="text-sm text-amber-600 py-4 text-center">Cargando...</p>
          ) : ventaDetalles.length === 0 ? (
            <p className="text-sm text-amber-600 py-4 text-center">Sin productos</p>
          ) : (
            <div className="space-y-2">
              {ventaDetalles.map((d) => (
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

      {/* Dialog agregar/editar gasto PV */}
      <Dialog open={gastoPVOpen} onOpenChange={(open) => { if (!open) { setGastoPVOpen(false); setEditingGastoPVId(null); } }}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>{editingGastoPVId ? "Editar gasto" : "Agregar gasto de punto de venta"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            {!editingGastoPVId && (
              <div>
                <label className="text-xs font-medium text-amber-800 block mb-1">Punto de venta</label>
                <Select value={gastoPVForm.sucursal_id} onValueChange={(v) => setGastoPVForm((f) => ({ ...f, sucursal_id: v }))}>
                  <SelectTrigger><SelectValue placeholder="Selecciona..." /></SelectTrigger>
                  <SelectContent>
                    {datos.sucursales.map((s) => (
                      <SelectItem key={s.id} value={String(s.id)}>{s.nombre}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            <div>
              <label className="text-xs font-medium text-amber-800 block mb-1">Descripción</label>
              <Input
                value={gastoPVForm.descripcion}
                onChange={(e) => setGastoPVForm((f) => ({ ...f, descripcion: e.target.value }))}
                placeholder="Ej: Compra de aceite"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-amber-800 block mb-1">Cuánto</label>
              <Input
                type="number"
                value={gastoPVForm.monto}
                onChange={(e) => setGastoPVForm((f) => ({ ...f, monto: e.target.value }))}
                placeholder="0"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-amber-800 block mb-1">Tipo</label>
              <Select value={gastoPVForm.tipo} onValueChange={(v) => setGastoPVForm((f) => ({ ...f, tipo: v }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {Object.entries(TIPO_GASTO_PV).map(([k, v]) => (
                    <SelectItem key={k} value={k}>{v}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleSaveGastoPV} disabled={savingGastoPV} className="bg-amber-700 hover:bg-amber-800 text-white w-full">
              {savingGastoPV ? "Guardando..." : "Guardar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog agregar/editar gasto Vario */}
      <Dialog open={gastoVarioOpen} onOpenChange={(open) => { if (!open) { setGastoVarioOpen(false); setEditingGastoVarioId(null); } }}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>{editingGastoVarioId ? "Editar gasto" : "Agregar gasto varios"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <label className="text-xs font-medium text-amber-800 block mb-1">Descripción</label>
              <Input
                value={gastoVarioForm.descripcion}
                onChange={(e) => setGastoVarioForm((f) => ({ ...f, descripcion: e.target.value }))}
                placeholder="Ej: Pago de nómina"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-amber-800 block mb-1">Cuánto</label>
              <Input
                type="number"
                value={gastoVarioForm.monto}
                onChange={(e) => setGastoVarioForm((f) => ({ ...f, monto: e.target.value }))}
                placeholder="0"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-amber-800 block mb-1">Tipo</label>
              <Select value={gastoVarioForm.tipo} onValueChange={(v) => setGastoVarioForm((f) => ({ ...f, tipo: v }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {Object.entries(TIPO_GASTO_VARIO).map(([k, v]) => (
                    <SelectItem key={k} value={k}>{v}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleSaveGastoVario} disabled={savingGastoVario} className="bg-amber-700 hover:bg-amber-800 text-white w-full">
              {savingGastoVario ? "Guardando..." : "Guardar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Alert dialog para confirmar borrado */}
      <AlertDialog open={!!deleteTarget} onOpenChange={(open) => { if (!open) setDeleteTarget(null); }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Este gasto se eliminará permanentemente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete} className="bg-red-600 hover:bg-red-700">
              Sí, eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
