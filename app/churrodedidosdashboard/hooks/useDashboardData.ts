"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabaseClient";

// ===== Tipos =====

export type Periodo = "today" | "week" | "month";

export interface Venta {
  id: number;
  sucursal_id: number;
  fecha_venta: string;
  hora_venta: string;
  total: number;
  subtotal: number;
  descuento: number;
  metodo_pago: string;
  estado: string;
  numero_ticket: string | null;
  observaciones: string | null;
  sucursales?: { nombre: string } | null;
}

export interface VentaDetalle {
  id: number;
  venta_id: number;
  producto_id: number;
  cantidad: number;
  precio_unitario: number;
  precio_total: number;
  descuento: number;
  productos?: { nombre: string } | null;
}

export interface GastoPV {
  id: number;
  sucursal_id: number;
  usuario_id: number;
  tipo: string;
  descripcion: string;
  monto: number;
  categoria: string | null;
  fecha: string;
  hora: string;
  sucursales?: { nombre: string } | null;
}

export interface GastoVario {
  id: number;
  descripcion: string;
  monto: number;
  tipo: string;
  categoria: string | null;
  fecha: string;
}

export interface InventarioActualItem {
  id: number;
  sucursal_id: number;
  producto_id: number;
  cantidad: number;
  ultima_actualizacion: string;
  productos?: { nombre: string; precio: number | null } | null;
  sucursales?: { nombre: string } | null;
}

export interface InventarioFabricaItem {
  id: number;
  producto_id: number;
  cantidad: number;
  ultima_actualizacion: string;
  productos?: { nombre: string } | null;
}

export interface PedidoFabrica {
  id: number;
  sucursal_id: number;
  fecha_pedido: string;
  hora_pedido: string;
  total_items: number;
  estado: string;
  numero_pedido: string | null;
  observaciones: string | null;
  sucursales?: { nombre: string } | null;
}

export interface PedidoCliente {
  id: number;
  cliente_nombre: string;
  cliente_telefono: string | null;
  direccion_entrega: string;
  fecha_pedido: string;
  hora_pedido: string;
  total_items: number;
  total: number;
  estado: string;
  numero_pedido: string | null;
  metodo_pago: string | null;
  observaciones: string | null;
}

export interface PedidoRecurrente {
  id: number;
  cliente_nombre: string;
  cliente_telefono: string | null;
  direccion_entrega: string;
  fecha_pedido: string;
  total_items: number;
  total: number;
  estado: string;
  metodo_pago: string | null;
  observaciones: string | null;
}

export interface Deudor {
  id: number;
  sucursal_id: number;
  nombre_deudor: string;
  fecha_venta: string;
  total: number;
  estado: string;
  observaciones: string | null;
  sucursales?: { nombre: string } | null;
}

export interface DeudorDetalle {
  id: number;
  deudor_id: number;
  producto_id: number;
  cantidad: number;
  precio_unitario: number;
  precio_total: number;
  productos?: { nombre: string } | null;
}

export interface Sucursal {
  id: number;
  nombre: string;
  direccion: string | null;
  telefono: string | null;
  activa: boolean;
}

export interface VentaPorDia {
  fecha: string;
  total: number;
}

export interface SucursalResumen {
  id: number;
  nombre: string;
  totalVentas: number;
  abierta: boolean;
  activa: boolean;
  totalInventario: number;
}

export interface DashboardDatos {
  totalVentas: number;
  totalGastosPV: number;
  totalGastosVarios: number;
  totalGastos: number;
  utilidad: number;
  totalDeudas: number;
  cantidadDeudores: number;
  ventasPorDia: VentaPorDia[];
  sucursalResumen: SucursalResumen[];
  ventas: Venta[];
  gastosPV: GastoPV[];
  gastosVarios: GastoVario[];
  inventarioActual: InventarioActualItem[];
  inventarioFabrica: InventarioFabricaItem[];
  pedidosFabrica: PedidoFabrica[];
  pedidosClientes: PedidoCliente[];
  pedidosRecurrentes: PedidoRecurrente[];
  deudores: Deudor[];
  sucursales: Sucursal[];
}

// ===== Helpers =====

function toDateStr(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function getFechaInicio(periodo: Periodo): string {
  const now = new Date();
  switch (periodo) {
    case "today":
      return toDateStr(now);
    case "week": {
      const d = new Date(now);
      d.setDate(d.getDate() - 6);
      return toDateStr(d);
    }
    case "month": {
      const d = new Date(now);
      d.setDate(d.getDate() - 29);
      return toDateStr(d);
    }
  }
}

export const formatMoney = (n: number) =>
  "$" + Math.round(n).toLocaleString("es-CO");

export const formatFecha = (fecha: string) => {
  const d = new Date(fecha + "T12:00:00");
  return d.toLocaleDateString("es-CO", { day: "numeric", month: "short" });
};

export const formatFechaCorta = (fecha: string) => {
  const d = new Date(fecha + "T12:00:00");
  return d.toLocaleDateString("es-CO", { day: "2-digit", month: "2-digit" });
};

export const TIPO_GASTO_PV: Record<string, string> = {
  personal: "Personal",
  pago_pedido: "Pago de pedido",
  pago_ocasional: "Pago ocasional",
  otro: "Otro",
};

export const TIPO_GASTO_VARIO: Record<string, string> = {
  compra: "Compra",
  pago: "Pago",
  nomina: "Nómina",
  otro: "Otro",
};

export const ESTADO_PEDIDO: Record<string, string> = {
  pendiente: "Pendiente",
  en_preparacion: "En preparación",
  enviado: "Enviado",
  entregado: "Entregado",
  cancelado: "Cancelado",
};

export const METODO_PAGO: Record<string, string> = {
  efectivo: "Efectivo",
  tarjeta: "Tarjeta",
  transferencia: "Transferencia",
  mixto: "Mixto",
};

// ===== Hook principal =====

export function useDashboardData(periodo: Periodo, sucursalId: number | null) {
  const [datos, setDatos] = useState<DashboardDatos | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!supabase) {
      setError("No se pudo conectar con la base de datos.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const fechaInicio = getFechaInicio(periodo);
      const hoy = toDateStr(new Date());

      // Construir queries con filtro opcional de sucursal
      let ventasQ = supabase
        .from("ventas")
        .select("*,sucursales(nombre)")
        .gte("fecha_venta", fechaInicio)
        .eq("estado", "completada")
        .order("fecha_venta", { ascending: false });
      if (sucursalId) ventasQ = ventasQ.eq("sucursal_id", sucursalId);

      let gastosPVQ = supabase
        .from("gastos_puntoventa")
        .select("*,sucursales(nombre)")
        .gte("fecha", fechaInicio)
        .order("fecha", { ascending: false });
      if (sucursalId) gastosPVQ = gastosPVQ.eq("sucursal_id", sucursalId);

      const gastosVariosQ = supabase
        .from("gastos_varios")
        .select("*")
        .gte("fecha", fechaInicio)
        .order("fecha", { ascending: false });

      let inventarioQ = supabase
        .from("inventario_actual")
        .select("*,productos(nombre,precio),sucursales(nombre)");
      if (sucursalId) inventarioQ = inventarioQ.eq("sucursal_id", sucursalId);

      const inventarioFabricaQ = supabase
        .from("inventario_fabrica")
        .select("*,productos(nombre)");

      let pedidosFabricaQ = supabase
        .from("pedidos_fabrica")
        .select("*,sucursales(nombre)")
        .gte("fecha_pedido", fechaInicio)
        .order("fecha_pedido", { ascending: false });
      if (sucursalId)
        pedidosFabricaQ = pedidosFabricaQ.eq("sucursal_id", sucursalId);

      const pedidosClientesQ = supabase
        .from("pedidos_clientes")
        .select("*")
        .gte("fecha_pedido", fechaInicio)
        .order("fecha_pedido", { ascending: false });

      const pedidosRecurrentesQ = supabase
        .from("pedidos_recurrentes")
        .select("*")
        .gte("fecha_pedido", fechaInicio)
        .order("fecha_pedido", { ascending: false });

      let deudoresQ = supabase
        .from("deudores")
        .select("*,sucursales(nombre)")
        .order("fecha_venta", { ascending: false });
      if (sucursalId) deudoresQ = deudoresQ.eq("sucursal_id", sucursalId);

      const sucursalesQ = supabase.from("sucursales").select("*").order("nombre");

      const aperturasQ = supabase
        .from("aperturas_dia")
        .select("id,sucursal_id,fecha_apertura,estado")
        .eq("fecha_apertura", hoy);

      const [
        ventasRes,
        gastosPVRes,
        gastosVariosRes,
        inventarioRes,
        inventarioFabricaRes,
        pedidosFabricaRes,
        pedidosClientesRes,
        pedidosRecurrentesRes,
        deudoresRes,
        sucursalesRes,
        aperturasRes,
      ] = await Promise.all([
        ventasQ,
        gastosPVQ,
        gastosVariosQ,
        inventarioQ,
        inventarioFabricaQ,
        pedidosFabricaQ,
        pedidosClientesQ,
        pedidosRecurrentesQ,
        deudoresQ,
        sucursalesQ,
        aperturasQ,
      ]);

      const results = [
        ventasRes, gastosPVRes, gastosVariosRes, inventarioRes,
        inventarioFabricaRes, pedidosFabricaRes, pedidosClientesRes,
        pedidosRecurrentesRes, deudoresRes, sucursalesRes, aperturasRes,
      ];
      const firstError = results.find((r) => r.error);
      if (firstError?.error) {
        console.error("Error Supabase:", firstError.error);
        setError("No se pudieron cargar los datos. Intenta de nuevo.");
        setLoading(false);
        return;
      }

      const ventas = (ventasRes.data ?? []) as Venta[];
      const gastosPV = (gastosPVRes.data ?? []) as GastoPV[];
      const gastosVarios = (gastosVariosRes.data ?? []) as GastoVario[];
      const inventarioActual = (inventarioRes.data ?? []) as InventarioActualItem[];
      const inventarioFabrica = (inventarioFabricaRes.data ?? []) as InventarioFabricaItem[];
      const pedidosFabrica = (pedidosFabricaRes.data ?? []) as PedidoFabrica[];
      const pedidosClientes = (pedidosClientesRes.data ?? []) as PedidoCliente[];
      const pedidosRecurrentes = (pedidosRecurrentesRes.data ?? []) as PedidoRecurrente[];
      const deudores = (deudoresRes.data ?? []) as Deudor[];
      const sucursales = (sucursalesRes.data ?? []) as Sucursal[];
      const aperturas = (aperturasRes.data ?? []) as { id: number; sucursal_id: number; fecha_apertura: string; estado: string }[];

      // Calcular totales
      const totalVentas = ventas.reduce((s, v) => s + Number(v.total), 0);
      const totalGastosPV = gastosPV.reduce((s, g) => s + Number(g.monto), 0);
      const totalGastosVarios = gastosVarios.reduce((s, g) => s + Number(g.monto), 0);
      const totalGastos = totalGastosPV + totalGastosVarios;
      const utilidad = totalVentas - totalGastos;

      const deudoresPendientes = deudores.filter((d) => d.estado === "pendiente");
      const totalDeudas = deudoresPendientes.reduce((s, d) => s + Number(d.total), 0);
      const cantidadDeudores = deudoresPendientes.length;

      // Ventas agrupadas por dia
      const ventasDiaMap = new Map<string, number>();
      ventas.forEach((v) => {
        ventasDiaMap.set(v.fecha_venta, (ventasDiaMap.get(v.fecha_venta) || 0) + Number(v.total));
      });
      const ventasPorDia = Array.from(ventasDiaMap.entries())
        .map(([fecha, total]) => ({ fecha, total }))
        .sort((a, b) => a.fecha.localeCompare(b.fecha));

      // Resumen por sucursal
      const sucursalResumen: SucursalResumen[] = sucursales.map((s) => {
        const ventasSuc = ventas.filter((v) => v.sucursal_id === s.id);
        const totalVentasSuc = ventasSuc.reduce((sum, v) => sum + Number(v.total), 0);
        const abierta = aperturas.some((a) => a.sucursal_id === s.id && a.estado === "abierta");
        const totalInventario = inventarioActual
          .filter((i) => i.sucursal_id === s.id)
          .reduce((sum, i) => sum + Number(i.cantidad), 0);
        return {
          id: s.id,
          nombre: s.nombre,
          totalVentas: totalVentasSuc,
          abierta,
          activa: s.activa ?? true,
          totalInventario,
        };
      });

      setDatos({
        totalVentas,
        totalGastosPV,
        totalGastosVarios,
        totalGastos,
        utilidad,
        totalDeudas,
        cantidadDeudores,
        ventasPorDia,
        sucursalResumen,
        ventas,
        gastosPV,
        gastosVarios,
        inventarioActual,
        inventarioFabrica,
        pedidosFabrica,
        pedidosClientes,
        pedidosRecurrentes,
        deudores,
        sucursales,
      });
    } catch (e) {
      console.error("Error inesperado:", e);
      setError("Hubo un problema cargando los datos. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  }, [periodo, sucursalId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // ===== MUTACIONES =====

  const agregarGastoPV = useCallback(
    async (data: { sucursal_id: number; descripcion: string; monto: number; tipo: string }) => {
      if (!supabase) return false;
      const { error } = await supabase.from("gastos_puntoventa").insert({ ...data, usuario_id: 1 });
      if (error) { console.error(error); return false; }
      await fetchData();
      return true;
    },
    [fetchData]
  );

  const editarGastoPV = useCallback(
    async (id: number, data: { descripcion?: string; monto?: number; tipo?: string }) => {
      if (!supabase) return false;
      const { error } = await supabase.from("gastos_puntoventa").update(data).eq("id", id);
      if (error) { console.error(error); return false; }
      await fetchData();
      return true;
    },
    [fetchData]
  );

  const borrarGastoPV = useCallback(
    async (id: number) => {
      if (!supabase) return false;
      const { error } = await supabase.from("gastos_puntoventa").delete().eq("id", id);
      if (error) { console.error(error); return false; }
      await fetchData();
      return true;
    },
    [fetchData]
  );

  const agregarGastoVario = useCallback(
    async (data: { descripcion: string; monto: number; tipo: string }) => {
      if (!supabase) return false;
      const { error } = await supabase.from("gastos_varios").insert(data);
      if (error) { console.error(error); return false; }
      await fetchData();
      return true;
    },
    [fetchData]
  );

  const editarGastoVario = useCallback(
    async (id: number, data: { descripcion?: string; monto?: number; tipo?: string }) => {
      if (!supabase) return false;
      const { error } = await supabase.from("gastos_varios").update(data).eq("id", id);
      if (error) { console.error(error); return false; }
      await fetchData();
      return true;
    },
    [fetchData]
  );

  const borrarGastoVario = useCallback(
    async (id: number) => {
      if (!supabase) return false;
      const { error } = await supabase.from("gastos_varios").delete().eq("id", id);
      if (error) { console.error(error); return false; }
      await fetchData();
      return true;
    },
    [fetchData]
  );

  const actualizarInventario = useCallback(
    async (id: number, cantidad: number) => {
      if (!supabase) return false;
      const { error } = await supabase.from("inventario_actual").update({ cantidad }).eq("id", id);
      if (error) { console.error(error); return false; }
      await fetchData();
      return true;
    },
    [fetchData]
  );

  const actualizarInventarioFabrica = useCallback(
    async (id: number, cantidad: number) => {
      if (!supabase) return false;
      const { error } = await supabase.from("inventario_fabrica").update({ cantidad }).eq("id", id);
      if (error) { console.error(error); return false; }
      await fetchData();
      return true;
    },
    [fetchData]
  );

  const cambiarEstadoPedido = useCallback(
    async (tabla: "pedidos_fabrica" | "pedidos_clientes" | "pedidos_recurrentes", id: number, estado: string) => {
      if (!supabase) return false;
      const { error } = await supabase.from(tabla).update({ estado }).eq("id", id);
      if (error) { console.error(error); return false; }
      await fetchData();
      return true;
    },
    [fetchData]
  );

  const marcarDeudorPagado = useCallback(
    async (id: number) => {
      if (!supabase) return false;
      const { error } = await supabase.from("deudores").update({ estado: "pagado" }).eq("id", id);
      if (error) { console.error(error); return false; }
      await fetchData();
      return true;
    },
    [fetchData]
  );

  const actualizarSucursal = useCallback(
    async (id: number, data: { nombre?: string; direccion?: string; telefono?: string; activa?: boolean }) => {
      if (!supabase) return false;
      const { error } = await supabase.from("sucursales").update(data).eq("id", id);
      if (error) { console.error(error); return false; }
      await fetchData();
      return true;
    },
    [fetchData]
  );

  // Detalles bajo demanda
  const fetchVentaDetalles = useCallback(async (ventaId: number): Promise<VentaDetalle[]> => {
    if (!supabase) return [];
    const { data, error } = await supabase.from("venta_detalles").select("*,productos(nombre)").eq("venta_id", ventaId);
    if (error) { console.error(error); return []; }
    return (data ?? []) as VentaDetalle[];
  }, []);

  const fetchDeudorDetalles = useCallback(async (deudorId: number): Promise<DeudorDetalle[]> => {
    if (!supabase) return [];
    const { data, error } = await supabase.from("deudor_detalles").select("*,productos(nombre)").eq("deudor_id", deudorId);
    if (error) { console.error(error); return []; }
    return (data ?? []) as DeudorDetalle[];
  }, []);

  const fetchPedidoDetalles = useCallback(async (tabla: string, pedidoId: number) => {
    if (!supabase) return [];
    const { data, error } = await supabase.from(tabla).select("*,productos(nombre)").eq("pedido_id", pedidoId);
    if (error) { console.error(error); return []; }
    return data ?? [];
  }, []);

  return {
    datos,
    loading,
    error,
    refetch: fetchData,
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
  };
}
