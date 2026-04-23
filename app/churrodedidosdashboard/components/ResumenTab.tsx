"use client";

import { TrendingUp, TrendingDown, AlertCircle, DollarSign } from "lucide-react";
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { type DashboardDatos, type Periodo, formatMoney, formatFecha } from "../hooks/useDashboardData";

interface ResumenTabProps {
  datos: DashboardDatos;
  periodo: Periodo;
}

const PERIODO_LABEL: Record<Periodo, string> = {
  today: "hoy",
  week: "esta semana",
  month: "este mes",
};

export function ResumenTab({ datos, periodo }: ResumenTabProps) {
  const {
    totalVentas,
    totalGastos,
    utilidad,
    totalDeudas,
    cantidadDeudores,
    ventasPorDia,
    sucursalResumen,
  } = datos;

  const periodoLabel = PERIODO_LABEL[periodo];

  return (
    <div className="space-y-6">
      {/* 4 tarjetas grandes */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {/* Vendimos */}
        <div className="rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 p-4 md:p-5">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            <p className="text-xs font-medium text-emerald-700">Vendimos {periodoLabel}</p>
          </div>
          <p className="text-xl md:text-2xl font-bold text-emerald-900">
            {formatMoney(totalVentas)}
          </p>
          <p className="text-xs text-emerald-600 mt-1">
            {datos.ventas.length} ventas
          </p>
        </div>

        {/* Gastamos */}
        <div className="rounded-2xl bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 p-4 md:p-5">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-4 h-4 text-orange-600" />
            <p className="text-xs font-medium text-orange-700">Gastamos {periodoLabel}</p>
          </div>
          <p className="text-xl md:text-2xl font-bold text-orange-900">
            {formatMoney(totalGastos)}
          </p>
          <p className="text-xs text-orange-600 mt-1">
            {datos.gastosPV.length + datos.gastosVarios.length} gastos
          </p>
        </div>

        {/* Nos quedo */}
        <div
          className={`rounded-2xl border p-4 md:p-5 ${
            utilidad >= 0
              ? "bg-gradient-to-br from-green-50 to-emerald-50 border-green-200"
              : "bg-gradient-to-br from-red-50 to-red-100 border-red-200"
          }`}
        >
          <div className="flex items-center gap-2 mb-2">
            {utilidad >= 0 ? (
              <TrendingUp className="w-4 h-4 text-green-600" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-600" />
            )}
            <p className={`text-xs font-medium ${utilidad >= 0 ? "text-green-700" : "text-red-700"}`}>
              Nos quedó {periodoLabel}
            </p>
          </div>
          <p className={`text-xl md:text-2xl font-bold ${utilidad >= 0 ? "text-green-900" : "text-red-900"}`}>
            {formatMoney(utilidad)}
          </p>
          <p className={`text-xs mt-1 ${utilidad >= 0 ? "text-green-600" : "text-red-600"}`}>
            Ventas - Gastos
          </p>
        </div>

        {/* Nos deben */}
        <div className="rounded-2xl bg-gradient-to-br from-amber-50 to-yellow-100 border border-amber-200 p-4 md:p-5">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="w-4 h-4 text-amber-600" />
            <p className="text-xs font-medium text-amber-700">Nos deben</p>
          </div>
          <p className="text-xl md:text-2xl font-bold text-amber-900">
            {formatMoney(totalDeudas)}
          </p>
          <p className="text-xs text-amber-600 mt-1">
            {cantidadDeudores} {cantidadDeudores === 1 ? "persona" : "personas"}
          </p>
        </div>
      </div>

      {/* Gráfica de ventas por día */}
      {ventasPorDia.length > 0 && (
        <div className="rounded-2xl bg-white border border-amber-200/60 p-4 md:p-5">
          <h3 className="text-sm font-semibold text-amber-900 mb-4">
            Ventas por día
          </h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={ventasPorDia} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
              <XAxis
                dataKey="fecha"
                tickFormatter={formatFecha}
                tick={{ fontSize: 11, fill: "#92400e" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                formatter={(value: number) => [formatMoney(value), "Ventas"]}
                labelFormatter={formatFecha}
                contentStyle={{
                  borderRadius: "12px",
                  border: "1px solid #fbbf24",
                  fontSize: "13px",
                }}
              />
              <Bar dataKey="total" radius={[6, 6, 0, 0]} maxBarSize={48}>
                {ventasPorDia.map((_, i) => (
                  <Cell key={i} fill={i === ventasPorDia.length - 1 ? "#d97706" : "#fbbf24"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {ventasPorDia.length === 0 && (
        <div className="rounded-2xl bg-white border border-amber-200/60 p-8 text-center">
          <p className="text-sm text-amber-600">No hay ventas registradas {periodoLabel}.</p>
        </div>
      )}

      {/* Estado de cada punto de venta */}
      {sucursalResumen.length > 0 && (
        <div className="rounded-2xl bg-white border border-amber-200/60 p-4 md:p-5">
          <h3 className="text-sm font-semibold text-amber-900 mb-3">
            Tus puntos de venta {periodoLabel}
          </h3>
          <div className="space-y-2">
            {sucursalResumen.map((s) => (
              <div
                key={s.id}
                className="flex items-center justify-between rounded-xl bg-amber-50/60 px-4 py-3 border border-amber-100"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-2.5 h-2.5 rounded-full ${
                      s.abierta ? "bg-emerald-500" : "bg-zinc-300"
                    }`}
                  />
                  <div>
                    <p className="text-sm font-medium text-amber-900">{s.nombre}</p>
                    <p className="text-xs text-amber-600">
                      {s.abierta ? "Abierta hoy" : "Cerrada hoy"} · {s.totalInventario} productos en stock
                    </p>
                  </div>
                </div>
                <p className="text-sm font-bold text-amber-900">
                  {formatMoney(s.totalVentas)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
