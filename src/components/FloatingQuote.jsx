import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChatBubbleLeftRightIcon,
  XMarkIcon,
  PaperAirplaneIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

import { useTranslation } from "react-i18next";
const FloatingQuote = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://smartproeg.com/quickquote.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(formData),
      });

      const result = await response.text();

      if (result.trim() === "success") {
        setFormData({ name: "", email: "", message: "" });
        setIsSubmitted(true);

        setTimeout(() => {
          setIsSubmitted(false);
          setIsOpen(false);
        }, 5000);
      } else {
        alert("❌ Error from backend: " + result);
      }
    } catch (error) {
      console.error("🚨 Error submitting quick quote:", error);
    }
  };

  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, type: "spring", stiffness: 260, damping: 20 }}
      >
        <motion.button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-fire-red to-fire-orange text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 group"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={{
            boxShadow: [
              "0 10px 25px rgba(198, 40, 40, 0.3)",
              "0 15px 35px rgba(198, 40, 40, 0.4)",
              "0 10px 25px rgba(198, 40, 40, 0.3)",
            ],
          }}
          transition={{
            boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <ChatBubbleLeftRightIcon className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
        </motion.button>

        {/* Tooltip */}
        <motion.div
          className="absolute bottom-full right-0 mb-2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 0, y: 10 }}
          whileHover={{ opacity: 1, y: 0 }}
        >
          {t("floatingQuote.quickQuote")}
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
        </motion.div>
      </motion.div>

      {/* Modal Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            {/* Modal Content */}
            <motion.div
              className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {t("floatingQuote.quickQuote")}
                  </h3>
                  <p className="text-gray-600">
                    {t("floatingQuote.description")}
                  </p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-300"
                >
                  <XMarkIcon className="h-5 w-5 text-gray-500" />
                </button>
              </div>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {t("contact.form.msgSuccess")}
                  </h3>
                  <p className="text-gray-600">{t("contact.form.getBack")} </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t("floatingQuote.name")} *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fire-red focus:border-transparent transition-all duration-300"
                      placeholder={t("floatingQuote.namePlaceholder")}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t("floatingQuote.email")} *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fire-red focus:border-transparent transition-all duration-300"
                      placeholder={t("floatingQuote.emailPlaceholder")}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t("floatingQuote.projectDetails")} *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fire-red focus:border-transparent transition-all duration-300 resize-none"
                      placeholder={t("floatingQuote.projectPlaceholder")}
                    ></textarea>
                  </div>

                  {/* Buttons */}
                  <div className="flex space-x-3 pt-4">
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 bg-gradient-to-r from-fire-red to-fire-orange text-white px-6 py-3 rounded-lg font-semibold hover:from-fire-red/90 hover:to-fire-orange/90 transition-all duration-300 flex items-center justify-center  "
                    >
                      <span>{t("floatingQuote.sendRequest")}</span>
                      <PaperAirplaneIcon
                        className={` ${isRTL ? "rotate-180" : ""} h-5 w-5 mx-2`}
                      />
                    </motion.button>
                  </div>

                  <div className="text-center ">
                    <button
                      type="button"
                      onClick={scrollToContact}
                      className="text-fire-red hover:text-fire-orange font-medium transition-colors duration-300 border border-fire-orange hover:border-fire-red px-4 py-2 rounded-lg w-full"
                    >
                      {t("floatingQuote.fullContactForm")}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingQuote;
