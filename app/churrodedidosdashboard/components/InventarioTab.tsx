"use client";

import { useState } from "react";
import { Check, X, Package, Factory } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { type DashboardDatos, formatMoney } from "../hooks/useDashboardData";

interface InventarioTabProps {
  datos: DashboardDatos;
  actualizarInventario: (id: number, cantidad: number) => Promise<boolean>;
  actualizarInventarioFabrica: (id: number, cantidad: number) => Promise<boolean>;
}

function StockBadge({ cantidad }: { cantidad: number }) {
  if (cantidad === 0) {
    return <span className="inline-flex items-center rounded-full bg-red-100 text-red-700 text-xs font-medium px-2 py-0.5">Agotado</span>;
  }
  if (cantidad < 10) {
    return <span className="inline-flex items-center rounded-full bg-amber-100 text-amber-700 text-xs font-medium px-2 py-0.5">Queda poco</span>;
  }
  return null;
}

function EditableQuantity({
  id,
  cantidad,
  onSave,
}: {
  id: number;
  cantidad: number;
  onSave: (id: number, cantidad: number) => Promise<boolean>;
}) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(String(cantidad));
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    const num = parseInt(value, 10);
    if (isNaN(num) || num < 0) {
      toast.error("La cantidad debe ser un número positivo");
      return;
    }
    setSaving(true);
    const ok = await onSave(id, num);
    setSaving(false);
    if (ok) {
      toast.success("Cantidad actualizada");
      setEditing(false);
    } else {
      toast.error("No se pudo actualizar");
    }
  };

  const handleCancel = () => {
    setValue(String(cantidad));
    setEditing(false);
  };

  if (!editing) {
    return (
      <button
        onClick={() => setEditing(true)}
        className="text-sm font-semibold text-amber-900 hover:bg-amber-100 rounded-lg px-2 py-1 transition-colors cursor-pointer"
        title="Click para editar"
      >
        {cantidad}
      </button>
    );
  }

  return (
    <div className="flex items-center gap-1">
      <Input
        type="number"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-20 h-8 text-sm"
        autoFocus
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSave();
          if (e.key === "Escape") handleCancel();
        }}
      />
      <Button variant="ghost" size="sm" onClick={handleSave} disabled={saving} className="h-7 w-7 p-0">
        <Check className="w-4 h-4 text-emerald-600" />
      </Button>
      <Button variant="ghost" size="sm" onClick={handleCancel} className="h-7 w-7 p-0">
        <X className="w-4 h-4 text-red-500" />
      </Button>
    </div>
  );
}

export function InventarioTab({ datos, actualizarInventario, actualizarInventarioFabrica }: InventarioTabProps) {
  // Agrupar inventario por sucursal
  const sucursalGroups = new Map<number, { nombre: string; items: typeof datos.inventarioActual }>();
  datos.inventarioActual.forEach((item) => {
    const nombre = item.sucursales?.nombre ?? "Sin sucursal";
    if (!sucursalGroups.has(item.sucursal_id)) {
      sucursalGroups.set(item.sucursal_id, { nombre, items: [] });
    }
    sucursalGroups.get(item.sucursal_id)!.items.push(item);
  });

  return (
    <div className="space-y-8">
      {/* Inventario por sucursal */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Package className="w-5 h-5 text-amber-700" />
          <h2 className="text-lg font-bold text-amber-900">En los puntos de venta</h2>
        </div>
        <p className="text-xs text-amber-600 mb-4">Haz click en la cantidad para editarla.</p>

        {sucursalGroups.size === 0 ? (
          <div className="rounded-xl bg-amber-50 border border-amber-200 p-6 text-center">
            <p className="text-sm text-amber-600">No hay inventario registrado.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {Array.from(sucursalGroups.entries()).map(([sucId, group]) => (
              <div key={sucId} className="rounded-xl border border-amber-200/60 overflow-hidden">
                <div className="bg-amber-50 px-4 py-2.5 border-b border-amber-200/60">
                  <h3 className="text-sm font-semibold text-amber-900">{group.nombre}</h3>
                  <p className="text-xs text-amber-600">
                    {group.items.reduce((s, i) => s + Number(i.cantidad), 0)} unidades en total
                  </p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-amber-100">
                        <th className="px-4 py-2 text-left text-xs font-semibold text-amber-700">Producto</th>
                        <th className="px-4 py-2 text-left text-xs font-semibold text-amber-700">Cantidad</th>
                        <th className="px-4 py-2 text-left text-xs font-semibold text-amber-700">Estado</th>
                        <th className="px-4 py-2 text-right text-xs font-semibold text-amber-700">Precio</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-amber-50">
                      {group.items
                        .sort((a, b) => Number(a.cantidad) - Number(b.cantidad))
                        .map((item) => (
                          <tr
                            key={item.id}
                            className={`${
                              Number(item.cantidad) === 0
                                ? "bg-red-50/50"
                                : Number(item.cantidad) < 10
                                ? "bg-amber-50/30"
                                : ""
                            }`}
                          >
                            <td className="px-4 py-2.5 text-amber-900 font-medium">
                              {item.productos?.nombre ?? `Producto #${item.producto_id}`}
                            </td>
                            <td className="px-4 py-2.5">
                              <EditableQuantity
                                id={item.id}
                                cantidad={Number(item.cantidad)}
                                onSave={actualizarInventario}
                              />
                            </td>
                            <td className="px-4 py-2.5">
                              <StockBadge cantidad={Number(item.cantidad)} />
                            </td>
                            <td className="px-4 py-2.5 text-right text-amber-600 text-xs">
                              {item.productos?.precio ? formatMoney(Number(item.productos.precio)) : "—"}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Inventario fábrica */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Factory className="w-5 h-5 text-amber-700" />
          <h2 className="text-lg font-bold text-amber-900">En la fábrica</h2>
        </div>
        <p className="text-xs text-amber-600 mb-4">Haz click en la cantidad para editarla.</p>

        {datos.inventarioFabrica.length === 0 ? (
          <div className="rounded-xl bg-amber-50 border border-amber-200 p-6 text-center">
            <p className="text-sm text-amber-600">No hay inventario de fábrica registrado.</p>
          </div>
        ) : (
          <div className="rounded-xl border border-amber-200/60 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-amber-50">
                <tr>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-amber-800">Producto</th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-amber-800">Cantidad</th>
                  <th className="px-4 py-2.5 text-left text-xs font-semibold text-amber-800">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-amber-100">
                {datos.inventarioFabrica
                  .sort((a, b) => Number(a.cantidad) - Number(b.cantidad))
                  .map((item) => (
                    <tr
                      key={item.id}
                      className={`${
                        Number(item.cantidad) === 0
                          ? "bg-red-50/50"
                          : Number(item.cantidad) < 10
                          ? "bg-amber-50/30"
                          : ""
                      }`}
                    >
                      <td className="px-4 py-2.5 text-amber-900 font-medium">
                        {item.productos?.nombre ?? `Producto #${item.producto_id}`}
                      </td>
                      <td className="px-4 py-2.5">
                        <EditableQuantity
                          id={item.id}
                          cantidad={Number(item.cantidad)}
                          onSave={actualizarInventarioFabrica}
                        />
                      </td>
                      <td className="px-4 py-2.5">
                        <StockBadge cantidad={Number(item.cantidad)} />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
