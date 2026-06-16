import { useState } from "react";

type Language = "curl" | "javascript" | "python" | "php" | "csharp";

interface CodeExampleProps {
  examples: Record<Language, string>;
  defaultLanguage?: Language;
}

export default function CodeExample({
  examples,
  defaultLanguage = "javascript",
}: CodeExampleProps) {
  const [language, setLanguage] =
    useState<Language>(defaultLanguage);

  const languages = Object.keys(examples) as Language[];

  return (
    <>
      <div className="flex gap-2 mb-4 flex-wrap">
        {languages.map((lang) => (
          <button
            key={lang}
            onClick={() => setLanguage(lang)}
            className={`px-3 py-1 rounded-md text-sm transition ${
              language === lang
                ? "bg-green-500 text-black"
                : "bg-white/10 hover:bg-white/20"
            }`}
          >
            {lang}
          </button>
        ))}
      </div>

      <pre className="bg-black/40 rounded-lg p-4 overflow-auto text-sm mb-6">
        {examples[language]}
      </pre>
    </>
  );
}