import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

type CityConfig = {
  slug: string;
  city: string;
  country: string;
  region: string;
  language: string;
};

const BASE_URL = "https://artiificial.art";

const CITIES: CityConfig[] = [
  { slug: "bucaramanga", city: "Bucaramanga", country: "Colombia", region: "Santander", language: "es" },
  { slug: "medellin", city: "Medellín", country: "Colombia", region: "Antioquia", language: "es" },
  { slug: "bogota", city: "Bogotá", country: "Colombia", region: "Cundinamarca", language: "es" },
  { slug: "barranquilla", city: "Barranquilla", country: "Colombia", region: "Atlántico", language: "es" },
  { slug: "cali", city: "Cali", country: "Colombia", region: "Valle del Cauca", language: "es" },
  { slug: "miami", city: "Miami", country: "Estados Unidos", region: "Florida", language: "en" },
  { slug: "california", city: "California", country: "Estados Unidos", region: "California", language: "en" },
  { slug: "texas", city: "Texas", country: "Estados Unidos", region: "Texas", language: "en" },
  { slug: "new-york", city: "New York", country: "Estados Unidos", region: "New York", language: "en" },
  { slug: "berlin", city: "Berlin", country: "Alemania", region: "Berlin", language: "de" },
  { slug: "hamburg", city: "Hamburg", country: "Alemania", region: "Hamburg", language: "de" },
];

function getCityBySlug(slug: string) {
  return CITIES.find((item) => item.slug === slug);
}

export function generateStaticParams() {
  return CITIES.map((city) => ({ slug: city.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) {
    return {};
  }

  const title = `Agencia digital en ${city.city} | Diseño, software e IA | art_ificial`;
  const description = `Ayudamos empresas en ${city.city}, ${city.country}, con branding, desarrollo web y automatización con IA para crecer con procesos eficientes.`;
  const url = `${BASE_URL}/ciudades/${city.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: `/ciudades/${city.slug}`,
    },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      locale: city.language === "de" ? "de_DE" : city.language === "en" ? "en_US" : "es_CO",
      siteName: "art_ificial",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function CityLandingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const city = getCityBySlug(slug);
  if (!city) {
    notFound();
  }

  redirect("/");
  return null;
}
