
import React from 'react';
import { useLanguage, Language } from '../contexts/LanguageContext';
import { GlobeIcon } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const LanguageSwitcher = () => {
  const { language, setLanguage, translations } = useLanguage();
  
  const languages: { value: Language; label: string }[] = [
    { value: 'ar', label: 'العربية' },
    { value: 'en', label: 'English' },
    { value: 'fr', label: 'Français' },
    { value: 'es', label: 'Español' },
    { value: 'tr', label: 'Türkçe' },
  ];

  // Map language codes to display text
  const getLanguageDisplay = (lang: Language) => {
    switch(lang) {
      case 'ar': return 'AR';
      case 'en': return 'EN';
      case 'fr': return 'FR';
      case 'es': return 'ES';
      case 'tr': return 'TR';
      default: return 'EN';
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center text-gray-400 hover:text-white">
          <GlobeIcon className="h-5 w-5" />
          <span className="ml-1">{getLanguageDisplay(language)}</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.value}
            onClick={() => setLanguage(lang.value)}
            className={language === lang.value ? "bg-gray-800" : ""}
          >
            {lang.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
