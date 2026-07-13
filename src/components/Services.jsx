/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FireIcon,
  WrenchScrewdriverIcon,
  ShieldCheckIcon,
  ExclamationTriangleIcon,
  CogIcon,
  BuildingOfficeIcon,
} from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";

const Services = () => {
  const { t } = useTranslation();

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const fireProtectionServices = [
    {
      icon: FireIcon,
      title: t("services.fireDetection.title"),
      description: t("services.fireDetection.description"),
      features: [
        t("services.fireDetection.features.1"),
        t("services.fireDetection.features.2"),
        t("services.fireDetection.features.3"),
        t("services.fireDetection.features.4"),
      ],
    },
    {
      icon: ShieldCheckIcon,
      title: t("services.fireSuppression.title"),
      description: t("services.fireSuppression.description"),
      features: [
        t("services.fireSuppression.features.1"),
        t("services.fireSuppression.features.2"),
        t("services.fireSuppression.features.3"),
        t("services.fireSuppression.features.4"),
      ],
    },
    {
      icon: ExclamationTriangleIcon,
      title: t("services.fireAlarm.title"),
      description: t("services.fireAlarm.description"),
      features: [
        t("services.fireAlarm.features.1"),
        t("services.fireAlarm.features.2"),
        t("services.fireAlarm.features.3"),
        t("services.fireAlarm.features.4"),
      ],
    },
  ];

  const mechanicalServices = [
    {
      icon: WrenchScrewdriverIcon,
      title: t("services.industrialPiping.title"),
      description: t("services.industrialPiping.description"),
      features: [
        t("services.industrialPiping.features.1"),
        t("services.industrialPiping.features.2"),
        t("services.industrialPiping.features.3"),
        t("services.industrialPiping.features.4"),
      ],
    },
    {
      icon: CogIcon,
      title: t("services.mechanicalSystems.title"),
      description: t("services.mechanicalSystems.description"),
      features: [
        t("services.mechanicalSystems.features.1"),
        t("services.mechanicalSystems.features.2"),
        t("services.mechanicalSystems.features.3"),
        t("services.mechanicalSystems.features.4"),
      ],
    },
    {
      icon: BuildingOfficeIcon,
      title: t("services.facilityServices.title"),
      description: t("services.facilityServices.description"),
      features: [
        t("services.facilityServices.features.1"),
        t("services.facilityServices.features.2"),
        t("services.facilityServices.features.3"),
        t("services.facilityServices.features.4"),
      ],
    },
  ];

  const ServiceCard = ({ service, delay }) => (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      whileHover={{ scale: 1.02, y: -5 }}
      className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group"
    >
      <div className="flex items-center  mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-fire-red to-fire-orange rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 me-4">
          <service.icon className="h-8 w-8 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">{service.title}</h3>
        </div>
      </div>

      <p className="text-gray-600 mb-6">{service.description}</p>

      <div className="space-y-3 mb-6">
        {service.features.map((feature, idx) => (
          <div key={idx} className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-fire-orange rounded-full"></div>
            <span className="text-gray-700">{feature}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );

  return (
    <section id="services" className="py-20 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-40 right-20 w-64 h-64 bg-fire-red/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 left-20 w-96 h-96 bg-fire-orange/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t("services.title")}{" "}
            <span className="text-fire-red">{t("services.services")}</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {" "}
            {t("services.subtitle")}
          </p>
        </motion.div>

        {/* Fire Protection Services */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center   mb-12"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-fire-red to-fire-orange rounded-lg flex items-center justify-center me-3">
              <FireIcon className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900">
              {t("services.fireProtectionTitle")}
            </h3>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {fireProtectionServices.map((service, index) => (
              <ServiceCard
                key={index}
                service={service}
                index={index}
                delay={0.4 + index * 0.1}
              />
            ))}
          </div>
        </div>

        {/* Mechanical & Utility Installations */}
        <div>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex items-center   mb-12"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg flex items-center justify-center me-3">
              <WrenchScrewdriverIcon className="h-6 w-6 text-white  " />
            </div>
            <h3 className="text-3xl font-bold text-gray-900">
              {t("services.mechanicalTitle")}
            </h3>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mechanicalServices.map((service, index) => (
              <ServiceCard
                key={index}
                service={service}
                index={index}
                delay={0.8 + index * 0.1}
              />
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-20 text-center"
        >
          <div className="bg-gradient-to-r from-fire-red to-fire-orange rounded-2xl p-8 md:p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">
              {t("services.customSolution")}
            </h3>
            <p className="text-xl mb-8 opacity-90">
              {t("services.customDescription")}
            </p>
            <motion.button
              onClick={() => scrollToSection("#contact")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-fire-red px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300 inline-flex items-center space-x-2"
            >
              <span> {t("services.getCustomQuote")}</span>
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Section Divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-16 fill-gray-50"
        >
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default Services;
