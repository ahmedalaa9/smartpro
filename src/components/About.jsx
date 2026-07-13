import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  ShieldCheckIcon,
  WrenchScrewdriverIcon,
  FireIcon,
  CogIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation();

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const specializations = [
    {
      icon: FireIcon,
      title: t("about.specializations.fireProtection.title"),
      description: t("about.specializations.fireProtection.description"),
    },
    {
      icon: WrenchScrewdriverIcon,
      title: t("about.specializations.industrialPiping.title"),
      description: t("about.specializations.industrialPiping.description"),
    },
    {
      icon: CogIcon,
      title: t("about.specializations.mechanicalSystems.title"),
      description: t("about.specializations.mechanicalSystems.description"),
    },
    {
      icon: ShieldCheckIcon,
      title: t("about.specializations.safetyEngineering.title"),
      description: t("about.specializations.safetyEngineering.description"),
    },
  ];

  const achievements = [
    t("about.achievements.1"),
    t("about.achievements.2"),
    t("about.achievements.3"),
    t("about.achievements.4"),
    t("about.achievements.5"),
    t("about.achievements.6"),
  ];

  return (
    <section id="about" className="py-20 bg-gray-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-fire-red/5 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-fire-orange/5 rounded-full blur-2xl"></div>
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
            {t("about.title")}{" "}
            <span className="text-fire-red"> {t("about.smartPro")} </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t("about.subtitle")}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <h3 className="text-3xl font-bold text-gray-900">
                {t("about.leading")}
              </h3>
              <p className="text-lg text-gray-600">{t("about.description1")}</p>
              <p className="text-lg text-gray-600">{t("about.description2")}</p>
            </div>

            {/* Achievements */}
            <div className="grid grid-cols-2 gap-4">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="flex items-center space-x-2"
                >
                  <CheckCircleIcon className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">
                    {achievement}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Content - Specializations */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {specializations.map((spec, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-fire-red to-fire-orange rounded-lg flex items-center justify-center mb-4">
                  <spec.icon className="h-6 w-6 text-white" />
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">
                  {spec.title}
                </h4>
                <p className="text-gray-600">{spec.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 md:p-12"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              {
                number: "15+",
                label: t("hero.stats.experience"),
                color: "text-fire-red",
              },
              {
                number: "500+",
                label: t("hero.stats.projects"),
                color: "text-fire-orange",
              },
              {
                number: "24/7",
                label: t("hero.stats.emergency"),
                color: "text-blue-400",
              },
              {
                number: "100%",
                label: t("about.satisfaction"),
                color: "text-green-400",
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                whileHover={{ scale: 1.1 }}
                className="space-y-2"
              >
                <div className={`text-4xl md:text-5xl font-bold ${stat.color}`}>
                  {stat.number}
                </div>
                <div className="text-gray-300 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Section Divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-16 fill-white"
        >
          <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default About;
