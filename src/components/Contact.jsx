import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  PaperAirplaneIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import InfoWithCopy from "./InfoWithCopy";
import { useTranslation } from "react-i18next";

const TURNSTILE_SITE_KEY = "0x4AAAAAAFAbKnhuBTyp7uNV";

const Contact = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const turnstileWidgetId = useRef(null);

  const contactInfo = {
    email: {
      icon: EnvelopeIcon,
      title: t("contact.emailUs"),
      email1: "info@smartpro.com",
      email2: "support@smartpro.com",
      email3: "smart.pro.mep@gmail.com",
      color: "from-blue-500 to-blue-600",
    },

    call: {
      icon: PhoneIcon,
      title: t("contact.callUs"),
      num1: "01063121118",
      num2: "01007533741",
      num3: "01288813205",
      num4: "01555055749",
      color: "from-green-500 to-green-600",
    },

    visit: {
      icon: MapPinIcon,
      title: t("contact.visitUs"),
      details: "Km 21 Coastal International Road ",
      subDetails: "Alexandria, Egypt ",
      color: "from-purple-500 to-purple-600",
    },
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");

  /*
   * ---------------------------------------------------------
   * Cloudflare Turnstile
   * ---------------------------------------------------------
   */
  useEffect(() => {
    if (!inView || isSubmitted) return;

    let cancelled = false;

    const renderTurnstile = () => {
      if (cancelled) return;

      const container = document.getElementById("turnstile-container");

      if (!container || !window.turnstile) return;

      /*
       * Remove an old widget if one still exists.
       */
      if (turnstileWidgetId.current !== null) {
        try {
          window.turnstile.remove(turnstileWidgetId.current);
        } catch (error) {
          console.warn("Could not remove old Turnstile widget:", error);
        }

        turnstileWidgetId.current = null;
      }

      container.innerHTML = "";

      turnstileWidgetId.current = window.turnstile.render(container, {
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
      });
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
  }, [inView, isSubmitted]);

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
   * Submit contact form
   * ---------------------------------------------------------
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) {
      return;
    }

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

      const response = await fetch("/api/contact", {
        method: "POST",

        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },

        body: new URLSearchParams(data),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Something went wrong.");
      }

      /*
       * Successful submission
       */
      setIsSubmitted(true);

      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        service: "",
        message: "",
      });

      setTurnstileToken("");

      /*
       * Show success message for 5 seconds,
       * then bring the form back.
       */
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (error) {
      console.error("Contact form error:", error);

      alert(error.message || "Something went wrong. Please try again.");

      /*
       * Turnstile tokens can only be used once.
       * Get a new token after failure.
       */
      resetTurnstile();
    } finally {
      setIsSubmitting(false);
    }
  };

  const services = [
    t("contact.services.0"),
    t("contact.services.1"),
    t("contact.services.2"),
    t("contact.services.3"),
    t("contact.services.4"),
    t("contact.services.5"),
    t("contact.services.6"),
    t("contact.services.7"),
  ];

  return (
    <section id="contact" className="py-20 bg-gray-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-64 h-64 bg-fire-red/5 rounded-full blur-3xl"></div>

        <div className="absolute bottom-20 left-20 w-96 h-96 bg-fire-orange/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{
            opacity: 0,
            y: 50,
          }}
          animate={
            inView
              ? {
                  opacity: 1,
                  y: 0,
                }
              : {}
          }
          transition={{
            duration: 0.8,
          }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t("contact.title")}{" "}
            <span className="text-fire-red">{t("contact.touch")}</span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t("contact.subtitle")}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Information */}

          <motion.div
            initial={{
              opacity: 0,
              x: -50,
            }}
            animate={
              inView
                ? {
                    opacity: 1,
                    x: 0,
                  }
                : {}
            }
            transition={{
              duration: 0.8,
              delay: 0.2,
            }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                {t("contact.contactInfo")}
              </h3>

              <p className="text-gray-600 mb-8">
                {t("contact.contactDescription")}
              </p>
            </div>

            {/* our Email */}

            <motion.div
              initial={{
                opacity: 0,
                y: 30,
              }}
              animate={
                inView
                  ? {
                      opacity: 1,
                      y: 0,
                    }
                  : {}
              }
              transition={{
                duration: 0.6,
                delay: 0.4,
              }}
              whileHover={{
                scale: 1.04,
                y: -4,
              }}
              className="relative flex items-center gap-4 p-5 bg-gradient-to-br from-blue-50 via-white to-blue-100 rounded-2xl shadow-xl border-r-8 border-blue-500/80 hover:border-fire-red/80 transition-all duration-300 group overflow-hidden"
            >
              {/* Decorative icon background */}

              <div className="absolute -top-6 -left-6 w-20 h-20 bg-blue-500/10 rounded-full blur-2xl pointer-events-none"></div>

              <div className="z-10 flex items-center justify-center h-14 w-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg group-hover:from-fire-red group-hover:to-fire-orange transition-all duration-300">
                <contactInfo.email.icon className="h-7 w-7 text-white" />
              </div>

              <div className="z-10">
                <h4 className="text-lg font-bold text-blue-900 mb-1 tracking-wide group-hover:text-fire-red transition-colors duration-300">
                  {contactInfo.email.title}
                </h4>

                <InfoWithCopy
                  contactInfo={contactInfo.email.email1}
                  textColor={"text-blue-700"}
                />

                <InfoWithCopy
                  contactInfo={contactInfo.email.email2}
                  textColor={"text-blue-700"}
                />

                <InfoWithCopy
                  contactInfo={contactInfo.email.email3}
                  textColor={"text-blue-700"}
                />
              </div>
            </motion.div>

            {/* our numbers */}

            <motion.div
              initial={{
                opacity: 0,
                y: 30,
              }}
              animate={
                inView
                  ? {
                      opacity: 1,
                      y: 0,
                    }
                  : {}
              }
              transition={{
                duration: 0.6,
                delay: 0.4,
              }}
              whileHover={{
                scale: 1.04,
                y: -4,
              }}
              className="relative flex items-center gap-4 p-5 bg-gradient-to-br from-green-50 via-white to-green-100 rounded-2xl shadow-xl border-r-8 border-green-500/80 hover:border-fire-orange/80 transition-all duration-300 group overflow-hidden"
            >
              {/* Decorative icon background */}

              <div className="absolute -top-6 -left-6 w-20 h-20 bg-green-500/10 rounded-full blur-2xl pointer-events-none"></div>

              <div className="z-10 flex items-center justify-center h-14 w-14 rounded-xl bg-gradient-to-br from-green-500 to-green-600 shadow-lg group-hover:from-fire-red group-hover:to-fire-orange transition-all duration-300">
                <contactInfo.call.icon className="h-7 w-7 text-white" />
              </div>

              <div className="z-10">
                <h4 className="text-lg font-bold text-green-900 mb-1 tracking-wide group-hover:text-fire-orange transition-colors duration-300 space-y-3">
                  {contactInfo.call.title}
                </h4>

                <InfoWithCopy
                  contactInfo={contactInfo.call.num1}
                  textColor={"text-green-700"}
                />

                <InfoWithCopy
                  contactInfo={contactInfo.call.num2}
                  textColor={"text-green-700"}
                />

                <InfoWithCopy
                  contactInfo={contactInfo.call.num3}
                  textColor={"text-green-700"}
                />

                <InfoWithCopy
                  contactInfo={contactInfo.call.num4}
                  textColor={"text-green-700"}
                />
              </div>
            </motion.div>

            {/* visit us */}

            <motion.div
              initial={{
                opacity: 0,
                y: 30,
              }}
              animate={
                inView
                  ? {
                      opacity: 1,
                      y: 0,
                    }
                  : {}
              }
              transition={{
                duration: 0.6,
                delay: 0.4,
              }}
              whileHover={{
                scale: 1.04,
                y: -4,
              }}
              className="relative flex items-center gap-4 p-5 bg-gradient-to-br from-purple-50 via-white to-purple-100 rounded-2xl shadow-xl border-r-8 border-purple-500/80 hover:border-fire-red/80 transition-all duration-300 group overflow-hidden"
            >
              {/* Decorative icon background */}

              <div className="absolute -top-6 -left-6 w-20 h-20 bg-purple-500/10 rounded-full blur-2xl pointer-events-none"></div>

              <div className="z-10 flex items-center justify-center h-14 w-14 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg group-hover:from-fire-red group-hover:to-fire-orange transition-all duration-300">
                <contactInfo.visit.icon className="h-7 w-7 text-white" />
              </div>

              <div className="z-10">
                <h4 className="text-lg font-bold text-purple-900 mb-1 tracking-wide group-hover:text-fire-red transition-colors duration-300">
                  {contactInfo.visit.title}
                </h4>

                <p className="text-purple-700 font-medium group-hover:text-fire-red transition-colors duration-300">
                  {contactInfo.visit.details}
                </p>

                <p className="text-purple-500 text-sm group-hover:text-fire-orange transition-colors duration-300">
                  {contactInfo.visit.subDetails}
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}

          <motion.div
            initial={{
              opacity: 0,
              x: 50,
            }}
            animate={
              inView
                ? {
                    opacity: 1,
                    x: 0,
                  }
                : {}
            }
            transition={{
              duration: 0.8,
              delay: 0.4,
            }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                {t("contact.sendMessage")}
              </h3>

              {isSubmitted ? (
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

                  <h4 className="text-xl font-bold text-gray-900 mb-2">
                    {t("contact.form.msgSuccess")}
                  </h4>

                  <p className="text-gray-600">{t("contact.form.getBack")}</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t("contact.form.fullName")}*
                      </label>

                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fire-red focus:border-transparent transition-all duration-300"
                        placeholder={t("contact.form.namePlaceholder")}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t("contact.form.email")} *
                      </label>

                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fire-red focus:border-transparent transition-all duration-300"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t("contact.form.phone")} *
                      </label>

                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fire-red focus:border-transparent transition-all duration-300"
                        placeholder="+1 (555) 123-4567"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {t("contact.form.company")}
                      </label>

                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fire-red focus:border-transparent transition-all duration-300"
                        placeholder={t("contact.form.companyPlaceholder")}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t("contact.form.service")}
                    </label>

                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fire-red focus:border-transparent transition-all duration-300"
                    >
                      <option value="">
                        {t("contact.form.selectService")}
                      </option>

                      {services.map((service, index) => (
                        <option key={index} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t("contact.form.message")} *
                    </label>

                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fire-red focus:border-transparent transition-all duration-300 resize-none"
                      placeholder={t("contact.form.messagePlaceholder")}
                    ></textarea>
                  </div>

                  {/* Cloudflare Turnstile */}

                  <div className="mt-6">
                    {inView && <div id="turnstile-container"></div>}
                  </div>

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
                    className={`w-full bg-gradient-to-r from-fire-red to-fire-orange text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center ${
                      isSubmitting
                        ? "opacity-60 cursor-not-allowed"
                        : "hover:from-fire-red/90 hover:to-fire-orange/90"
                    }`}
                  >
                    <span>
                      {isSubmitting
                        ? "Sending..."
                        : t("contact.form.sendMessage")}
                    </span>

                    <PaperAirplaneIcon
                      className={`${isRTL ? "rotate-180" : ""} h-5 w-5 mx-2`}
                    />
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Section Divider */}

      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-16 fill-gray-900"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".25"
          ></path>

          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            opacity=".5"
          ></path>

          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default Contact;
