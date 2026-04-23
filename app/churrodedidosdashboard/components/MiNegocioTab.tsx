"use client";

import { useState } from "react";
import { MapPin, Phone, Pencil, Save, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { type DashboardDatos, type Periodo, type Sucursal, formatMoney } from "../hooks/useDashboardData";

interface MiNegocioTabProps {
  datos: DashboardDatos;
  actualizarSucursal: (id: number, data: { nombre?: string; direccion?: string; telefono?: string; activa?: boolean }) => Promise<boolean>;
  periodo: Periodo;
}

const PERIODO_LABEL: Record<Periodo, string> = {
  today: "hoy",
  week: "esta semana",
  month: "este mes",
};

interface SucursalForm {
  nombre: string;
  direccion: string;
  telefono: string;
}

export function MiNegocioTab({ datos, actualizarSucursal, periodo }: MiNegocioTabProps) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<SucursalForm>({ nombre: "", direccion: "", telefono: "" });
  const [saving, setSaving] = useState(false);

  const periodoLabel = PERIODO_LABEL[periodo];

  const startEdit = (s: Sucursal) => {
    setEditingId(s.id);
    setForm({
      nombre: s.nombre,
      direccion: s.direccion ?? "",
      telefono: s.telefono ?? "",
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  const handleSave = async (id: number) => {
    if (!form.nombre.trim()) {
      toast.error("El nombre no puede estar vacío");
      return;
    }
    setSaving(true);
    const ok = await actualizarSucursal(id, {
      nombre: form.nombre.trim(),
      direccion: form.direccion.trim() || undefined,
      telefono: form.telefono.trim() || undefined,
    });
    setSaving(false);
    if (ok) {
      toast.success("¡Punto de venta actualizado!");
      setEditingId(null);
    } else {
      toast.error("No se pudo guardar, intenta de nuevo");
    }
  };

  const handleToggleActiva = async (id: number, activa: boolean) => {
    const ok = await actualizarSucursal(id, { activa });
    if (ok) {
      toast.success(activa ? "Punto de venta activado" : "Punto de venta desactivado");
    } else {
      toast.error("No se pudo cambiar el estado");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-2">
        <MapPin className="w-5 h-5 text-amber-700" />
        <h2 className="text-lg font-bold text-amber-900">Mis puntos de venta</h2>
      </div>

      {datos.sucursales.length === 0 ? (
        <div className="rounded-xl bg-amber-50 border border-amber-200 p-6 text-center">
          <p className="text-sm text-amber-600">No hay puntos de venta registrados.</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {datos.sucursales.map((s) => {
            const resumen = datos.sucursalResumen.find((r) => r.id === s.id);
            const isEditing = editingId === s.id;

            return (
              <div
                key={s.id}
                className={`rounded-2xl border p-5 transition-colors ${
                  s.activa
                    ? "bg-white border-amber-200"
                    : "bg-zinc-50 border-zinc-200 opacity-70"
                }`}
              >
                {isEditing ? (
                  /* Modo edición */
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs font-medium text-amber-800 block mb-1">Nombre</label>
                      <Input
                        value={form.nombre}
                        onChange={(e) => setForm((f) => ({ ...f, nombre: e.target.value }))}
                        className="text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-amber-800 block mb-1">Dirección</label>
                      <Input
                        value={form.direccion}
                        onChange={(e) => setForm((f) => ({ ...f, direccion: e.target.value }))}
                        className="text-sm"
                        placeholder="Dirección del punto de venta"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-amber-800 block mb-1">Teléfono</label>
                      <Input
                        value={form.telefono}
                        onChange={(e) => setForm((f) => ({ ...f, telefono: e.target.value }))}
                        className="text-sm"
                        placeholder="Teléfono"
                      />
                    </div>
                    <div className="flex gap-2 pt-1">
                      <Button
                        onClick={() => handleSave(s.id)}
                        disabled={saving}
                        className="bg-amber-700 hover:bg-amber-800 text-white gap-1.5 flex-1"
                        size="sm"
                      >
                        <Save className="w-3.5 h-3.5" />
                        {saving ? "Guardando..." : "Guardar"}
                      </Button>
                      <Button variant="outline" size="sm" onClick={cancelEdit} className="gap-1.5">
                        <X className="w-3.5 h-3.5" /> Cancelar
                      </Button>
                    </div>
                  </div>
                ) : (
                  /* Modo visualización */
                  <>
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-base font-bold text-amber-900">{s.nombre}</h3>
                        {s.direccion && (
                          <p className="text-xs text-amber-600 flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3 h-3" /> {s.direccion}
                          </p>
                        )}
                        {s.telefono && (
                          <p className="text-xs text-amber-600 flex items-center gap-1 mt-0.5">
                            <Phone className="w-3 h-3" /> {s.telefono}
                          </p>
                        )}
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => startEdit(s)} className="h-8 w-8 p-0">
                        <Pencil className="w-4 h-4 text-amber-600" />
                      </Button>
                    </div>

                    {/* Resumen */}
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <div className="rounded-lg bg-emerald-50 px-3 py-2">
                        <p className="text-[10px] font-medium text-emerald-700 uppercase">
                          Vendió {periodoLabel}
                        </p>
                        <p className="text-sm font-bold text-emerald-900">
                          {formatMoney(resumen?.totalVentas ?? 0)}
                        </p>
                      </div>
                      <div className="rounded-lg bg-amber-50 px-3 py-2">
                        <p className="text-[10px] font-medium text-amber-700 uppercase">Productos en stock</p>
                        <p className="text-sm font-bold text-amber-900">
                          {resumen?.totalInventario ?? 0}
                        </p>
                      </div>
                    </div>

                    {/* Toggle activa */}
                    <div className="flex items-center justify-between rounded-lg bg-zinc-50 px-3 py-2">
                      <span className="text-xs text-zinc-700">
                        {s.activa ? "Punto de venta activo" : "Punto de venta inactivo"}
                      </span>
                      <Switch
                        checked={s.activa ?? true}
                        onCheckedChange={(checked) => handleToggleActiva(s.id, checked)}
                      />
                    </div>

                    {/* Estado apertura */}
                    {resumen && (
                      <div className="mt-2 flex items-center gap-1.5">
                        <div className={`w-2 h-2 rounded-full ${resumen.abierta ? "bg-emerald-500" : "bg-zinc-300"}`} />
                        <span className="text-xs text-zinc-600">
                          {resumen.abierta ? "Abierta hoy" : "Cerrada hoy"}
                        </span>
                      </div>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
