import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { GlobeAltIcon } from "@heroicons/react/24/outline";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  // ✅ قراءة اللغة من localStorage عند أول تحميل
  useEffect(() => {
    const savedLang = localStorage.getItem("i18nextLng");
    if (savedLang && savedLang !== i18n.language) {
      i18n.changeLanguage(savedLang);
      document.documentElement.dir = savedLang === "ar" ? "rtl" : "ltr";
      document.documentElement.lang = savedLang;
    } else {
      document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
      document.documentElement.lang = i18n.language;
    }
  }, [i18n]);

  const toggleLanguage = () => {
    const newLang = i18n.language === "ar" ? "en" : "ar";
    i18n.changeLanguage(newLang);
    document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = newLang;
    // localStorage.setItem("appLanguage", newLang);
  };

  const isArabic = i18n.language === "ar";

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center   px-2 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition-colors duration-300"
    >
      <GlobeAltIcon className="h-5 w-5 me-1 text-gray-600" />
      <span className="text-sm font-medium text-gray-700">
        {isArabic ? "En" : "ع"}
      </span>
    </button>
  );
};

export default LanguageSwitcher;
