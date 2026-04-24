import type { Metadata } from "next";
import Link from "next/link";

const cities = [
  { slug: "bucaramanga", name: "Bucaramanga" },
  { slug: "medellin", name: "Medellín" },
  { slug: "bogota", name: "Bogotá" },
  { slug: "barranquilla", name: "Barranquilla" },
  { slug: "cali", name: "Cali" },
  { slug: "miami", name: "Miami" },
  { slug: "california", name: "California" },
  { slug: "texas", name: "Texas" },
  { slug: "new-york", name: "New York" },
  { slug: "berlin", name: "Berlin" },
  { slug: "hamburg", name: "Hamburg" },
];

export const metadata: Metadata = {
  title: "Cobertura por ciudades | art_ificial",
  description:
    "Conoce las ciudades donde art_ificial ofrece servicios de branding, desarrollo web y automatización con IA.",
  alternates: {
    canonical: "/ciudades",
  },
};

export default function CitiesPage() {
  return (
    <main className="min-h-screen bg-black px-6 py-24 text-white">
      <section className="mx-auto w-full max-w-4xl">
        <h1 className="text-4xl font-semibold md:text-5xl">Ciudades donde trabajamos</h1>
        <p className="mt-4 max-w-2xl text-white/80">
          Esta sección reúne nuestras páginas locales para facilitar indexación y búsqueda por mercado.
        </p>
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {cities.map((city) => (
            <Link
              key={city.slug}
              href={`/ciudades/${city.slug}`}
              className="rounded-lg border border-white/20 px-4 py-3 text-white/90 transition-colors hover:border-white hover:text-white"
            >
              Agencia digital en {city.name}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
