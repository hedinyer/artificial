"use client";

import { useEffect, useState } from "react";

declare global {
  interface Window {
    google?: {
      translate?: {
        TranslateElement: new (
          options: Record<string, unknown>,
          elementId: string
        ) => void;
      };
    };
    googleTranslateElementInit?: () => void;
  }
}

const LANG_OPTIONS = [
  { value: "es", label: "ES" },
  { value: "en", label: "EN" },
  { value: "de", label: "DE" },
];

export default function LanguageSwitcher() {
  const [selectedLanguage, setSelectedLanguage] = useState("es");

  useEffect(() => {
    if (window.google?.translate?.TranslateElement) {
      return;
    }

    window.googleTranslateElementInit = () => {
      if (!window.google?.translate?.TranslateElement) {
        return;
      }

      new window.google.translate.TranslateElement(
        {
          pageLanguage: "es",
          includedLanguages: "es,en,de",
          autoDisplay: false,
        },
        "google_translate_element"
      );
    };

    const scriptId = "google-translate-script";
    if (document.getElementById(scriptId)) {
      return;
    }

    const script = document.createElement("script");
    script.id = scriptId;
    script.src =
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const changeLanguage = (lang: string) => {
    if (lang === "es") {
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.artiificial.art;";
      window.location.reload();
      return;
    }

    const translateCombo = document.querySelector<HTMLSelectElement>(".goog-te-combo");
    if (!translateCombo) {
      return;
    }

    translateCombo.value = lang;
    translateCombo.dispatchEvent(new Event("change"));
    setSelectedLanguage(lang);
  };

  return (
    <div className="notranslate flex items-center gap-1.5" translate="no">
      <span className="sr-only">Traducir página</span>
      {LANG_OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => changeLanguage(option.value)}
          translate="no"
          className={`rounded-md border px-2 py-1 text-[11px] font-semibold tracking-wide transition-colors ${
            selectedLanguage === option.value
              ? "border-white bg-white text-black"
              : "border-white/30 text-white/80 hover:border-white/60 hover:text-white"
          }`}
          aria-label={`Traducir a ${option.value}`}
        >
          {option.label}
        </button>
      ))}
      <div id="google_translate_element" className="hidden" />
    </div>
  );
}
