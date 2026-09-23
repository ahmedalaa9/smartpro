import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChatBubbleLeftRightIcon,
  XMarkIcon,
  PaperAirplaneIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const TURNSTILE_SITE_KEY = "0x4AAAAAAFAbKnhuBTyp7uNV";

const FloatingQuote = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [turnstileToken, setTurnstileToken] = useState("");

  const turnstileContainerRef = useRef(null);
  const turnstileWidgetId = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  /*
   * ---------------------------------------------------------
   * Cloudflare Turnstile
   * ---------------------------------------------------------
   */
  useEffect(() => {
    if (!isOpen || isSubmitted) return;

    let cancelled = false;

    const renderTurnstile = () => {
      if (cancelled || !window.turnstile || !turnstileContainerRef.current) {
        return;
      }

      /*
       * Remove any previous widget before rendering
       */
      if (turnstileWidgetId.current !== null) {
        try {
          window.turnstile.remove(turnstileWidgetId.current);
        } catch (error) {
          console.warn("Could not remove old Turnstile widget:", error);
        }

        turnstileWidgetId.current = null;
      }

      turnstileContainerRef.current.innerHTML = "";

      turnstileWidgetId.current = window.turnstile.render(
        turnstileContainerRef.current,
        {
          sitekey: TURNSTILE_SITE_KEY,

          callback: (token) => {
            setTurnstileToken(token);
          },

          "expired-callback": () => {
            setTurnstileToken("");
          },

          "error-callback": () => {
            setTurnstileToken("");
          },
        },
      );
    };

    const scriptUrl =
      "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

    const existingScript = document.querySelector(`script[src="${scriptUrl}"]`);

    if (existingScript) {
      if (window.turnstile) {
        renderTurnstile();
      } else {
        existingScript.addEventListener("load", renderTurnstile, {
          once: true,
        });
      }
    } else {
      const script = document.createElement("script");

      script.src = scriptUrl;
      script.async = true;
      script.defer = true;

      script.addEventListener("load", renderTurnstile, {
        once: true,
      });

      document.body.appendChild(script);
    }

    return () => {
      cancelled = true;

      if (window.turnstile && turnstileWidgetId.current !== null) {
        try {
          window.turnstile.remove(turnstileWidgetId.current);
        } catch (error) {
          console.warn("Could not clean up Turnstile widget:", error);
        }

        turnstileWidgetId.current = null;
      }
    };
  }, [isOpen, isSubmitted]);

  /*
   * ---------------------------------------------------------
   * Input handling
   * ---------------------------------------------------------
   */
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /*
   * ---------------------------------------------------------
   * Reset Turnstile
   * ---------------------------------------------------------
   */
  const resetTurnstile = () => {
    setTurnstileToken("");

    if (window.turnstile && turnstileWidgetId.current !== null) {
      try {
        window.turnstile.reset(turnstileWidgetId.current);
      } catch (error) {
        console.warn("Could not reset Turnstile:", error);
      }
    }
  };

  /*
   * ---------------------------------------------------------
   * Close modal
   * ---------------------------------------------------------
   */
  const handleClose = () => {
    if (isSubmitting) return;

    setIsOpen(false);
    setTurnstileToken("");
  };

  /*
   * ---------------------------------------------------------
   * Submit Quick Quote
   * ---------------------------------------------------------
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    if (!turnstileToken) {
      alert("Please verify that you're not a robot");
      return;
    }

    const data = {
      ...formData,
      "cf-turnstile-response": turnstileToken,
    };

    try {
      setIsSubmitting(true);

      const response = await fetch("/api/quick-quote", {
        method: "POST",

        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },

        body: new URLSearchParams(data),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Unable to send your request.");
      }

      /*
       * Success
       */
      setFormData({
        name: "",
        email: "",
        message: "",
      });

      setTurnstileToken("");
      setIsSubmitted(true);

      setTimeout(() => {
        setIsSubmitted(false);
        setIsOpen(false);
      }, 5000);
    } catch (error) {
      console.error("Error submitting quick quote:", error);

      alert(error.message || "Something went wrong. Please try again.");

      /*
       * Turnstile tokens are single-use,
       * so generate a new token after failure.
       */
      resetTurnstile();
    } finally {
      setIsSubmitting(false);
    }
  };

  /*
   * ---------------------------------------------------------
   * Scroll to full Contact form
   * ---------------------------------------------------------
   */
  const scrollToContact = () => {
    if (window.location.pathname === "/contact") {
      const element = document.getElementById("contact");

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      } else {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    } else {
      navigate("/contact");
    }

    setIsOpen(false);
    setTurnstileToken("");
  };

  return (
    <>
      {/* Floating Button */}

      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{
          scale: 0,
        }}
        animate={{
          scale: 1,
        }}
        transition={{
          delay: 2,
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
      >
        <motion.button
          type="button"
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-fire-red to-fire-orange text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 group"
          whileHover={{
            scale: 1.1,
          }}
          whileTap={{
            scale: 0.9,
          }}
          animate={{
            boxShadow: [
              "0 10px 25px rgba(198, 40, 40, 0.3)",
              "0 15px 35px rgba(198, 40, 40, 0.4)",
              "0 10px 25px rgba(198, 40, 40, 0.3)",
            ],
          }}
          transition={{
            boxShadow: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          aria-label={t("floatingQuote.quickQuote")}
        >
          <ChatBubbleLeftRightIcon className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
        </motion.button>

        {/* Tooltip */}

        <motion.div
          className="absolute bottom-full right-0 mb-2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 0,
            y: 10,
          }}
          whileHover={{
            opacity: 1,
            y: 0,
          }}
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
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            onClick={handleClose}
          >
            {/* Modal Content */}

            <motion.div
              className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl max-h-[90vh] overflow-y-auto"
              initial={{
                scale: 0.8,
                opacity: 0,
                y: 50,
              }}
              animate={{
                scale: 1,
                opacity: 1,
                y: 0,
              }}
              exit={{
                scale: 0.8,
                opacity: 0,
                y: 50,
              }}
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
                  type="button"
                  onClick={handleClose}
                  disabled={isSubmitting}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-300 disabled:opacity-50"
                  aria-label="Close"
                >
                  <XMarkIcon className="h-5 w-5 text-gray-500" />
                </button>
              </div>

              {isSubmitted ? (
                /*
                 * -------------------------------------------------
                 * Success message
                 * -------------------------------------------------
                 */
                <motion.div
                  initial={{
                    opacity: 0,
                    scale: 0.8,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  className="text-center py-12"
                >
                  <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />

                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {t("contact.form.msgSuccess")}
                  </h3>

                  <p className="text-gray-600">{t("contact.form.getBack")}</p>
                </motion.div>
              ) : (
                /*
                 * -------------------------------------------------
                 * Quick Quote form
                 * -------------------------------------------------
                 */
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name */}

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
                      maxLength={100}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fire-red focus:border-transparent transition-all duration-300"
                      placeholder={t("floatingQuote.namePlaceholder")}
                    />
                  </div>

                  {/* Email */}

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
                      maxLength={254}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fire-red focus:border-transparent transition-all duration-300"
                      placeholder={t("floatingQuote.emailPlaceholder")}
                    />
                  </div>

                  {/* Project Details */}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t("floatingQuote.projectDetails")} *
                    </label>

                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      maxLength={5000}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fire-red focus:border-transparent transition-all duration-300 resize-none"
                      placeholder={t("floatingQuote.projectPlaceholder")}
                    ></textarea>
                  </div>

                  {/* Cloudflare Turnstile */}

                  <div className="pt-2">
                    <div ref={turnstileContainerRef}></div>
                  </div>

                  {/* Submit Button */}

                  <div className="flex space-x-3 pt-4">
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={
                        !isSubmitting
                          ? {
                              scale: 1.02,
                            }
                          : {}
                      }
                      whileTap={
                        !isSubmitting
                          ? {
                              scale: 0.98,
                            }
                          : {}
                      }
                      className={`flex-1 bg-gradient-to-r from-fire-red to-fire-orange text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center ${
                        isSubmitting
                          ? "opacity-60 cursor-not-allowed"
                          : "hover:from-fire-red/90 hover:to-fire-orange/90"
                      }`}
                    >
                      <span>
                        {isSubmitting
                          ? "Sending..."
                          : t("floatingQuote.sendRequest")}
                      </span>

                      <PaperAirplaneIcon
                        className={`${isRTL ? "rotate-180" : ""} h-5 w-5 mx-2`}
                      />
                    </motion.button>
                  </div>

                  {/* Full Contact Form */}

                  <div className="text-center">
                    <button
                      type="button"
                      onClick={scrollToContact}
                      disabled={isSubmitting}
                      className="text-fire-red hover:text-fire-orange font-medium transition-colors duration-300 border border-fire-orange hover:border-fire-red px-4 py-2 rounded-lg w-full disabled:opacity-50"
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
