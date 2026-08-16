import { useState, useEffect } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

import { Link, useLocation } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const Navbar = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const isRTL = i18n.language === "ar";

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: t("nav.home"), href: "/" },
    { name: t("nav.about"), href: "/about" },
    { name: t("nav.services"), href: "/services" },
    { name: t("nav.vision"), href: "/vision" },
    { name: t("nav.projects"), href: "/projects" },
  ];

  const handleLinkClick = () => {
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center py-2">
          {/* Logo */}
          <motion.div
            className="flex items-center  "
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-[60px] h-[70px] bg-gradient-to-br from-fire-red to-fire-orange rounded-lg flex items-center justify-center">
              <img
                src="/logo-smartPro-removebg-preview.png"
                alt="Logo"
                className="w-[100%] h-[100%]"
              />
            </div>
            <div className="ms-2 hidden lg:block">
              <div className="text-xl font-bold text-gray-900">
                SMART <span className="text-fire-red">PRO</span>
              </div>
              <div className="text-xs text-gray-500">
                Fire Safety & Industrial Solutions
              </div>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="flex items-center space-x-4">
            <div className="hidden lg:flex items-center space-x-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={handleLinkClick}
                  className={`relative font-medium transition-colors duration-300 focus:outline-none ${
                    isRTL && "mx-4"
                  }  ${
                    location.pathname === link.href
                      ? "text-fire-red   "
                      : "text-gray-700 hover:text-fire-red"
                  }`}
                >
                  {link.name}
                  {location.pathname === link.href && (
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-fire-red"
                      layoutId="activeTab"
                    />
                  )}
                </Link>
              ))}

              <Link
                to="/contact"
                className="inline-block bg-gradient-to-r from-fire-red to-fire-orange hover:from-fire-red/90 hover:to-fire-orange/90 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105"
                onClick={handleLinkClick}
              >
                {t("nav.contact")}
              </Link>
            </div>
            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-gray-700"
              >
                {isMenuOpen ? (
                  <XMarkIcon className="h-6 w-6" />
                ) : (
                  <Bars3Icon className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        className={`lg:hidden bg-white shadow-lg overflow-hidden ${
          isMenuOpen ? "block" : "hidden"
        }`}
        initial={{ opacity: 0, height: 0 }}
        animate={{
          opacity: isMenuOpen ? 1 : 0,
          height: isMenuOpen ? "auto" : 0,
        }}
      >
        <div className="px-6 py-4 space-y-3 ">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              onClick={handleLinkClick}
              className="block text-left py-2 text-gray-700 hover:text-fire-red transition-colors duration-300"
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/contact"
            className="block text-center w-full bg-gradient-to-r from-fire-red to-fire-orange text-white px-6 py-2 rounded-lg font-medium mt-4"
            onClick={handleLinkClick}
          >
            {t("nav.contact")}
          </Link>
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;
