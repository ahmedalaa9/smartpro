import { motion } from "framer-motion";
// import { ArrowRightIcon, PlayIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";

const Hero = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background with overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-300 via-gray-600 to-black">
        {/* <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg')] bg-cover bg-center opacity-20"></div> */}
        <div className="absolute inset-0 bg-[url('/public/test-2.jpeg')] bg-cover bg-center opacity-40"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"></div>
      </div>

      {/* Geometric shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 right-20 w-64 h-64 bg-fire-red/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-96 h-96 bg-fire-orange/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 5, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Trust Badge */}
            <motion.div
              className={`inline-flex items-center   bg-white/10 backdrop-blur-sm border border-fire-red/30 rounded-full px-4 py-2 text-fire-red `}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="w-2 h-2 bg-fire-red rounded-full animate-pulse me-2 "></div>
              <span className="text-sm font-medium text-white">
                {t("hero.badge")}
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold text-white leading-normal">
                {t("hero.title")}{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-fire-red to-fire-orange">
                  {t("hero.fireProtection")}
                </span>{" "}
                {t("hero.and")}{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-fire-orange to-yellow-400">
                  {t("hero.industrial")} {t("hero.pipingSystems")}
                </span>
              </h1>

              <p className="text-xl text-gray-300 max-w-2xl">
                {t("hero.description")}
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <motion.button
                className="bg-gradient-to-r from-fire-red to-fire-orange hover:from-fire-red/90 hover:to-fire-orange/90 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection("#contact")}
              >
                <span> {t("hero.requestQuote")}</span>
                {/* <ArrowRightIcon className="h-5 w-5 group-hover:translate-x-1 transition-transform" /> */}
              </motion.button>

              <motion.button
                className="border-2 border-white/30 hover:border-white hover:bg-white/10 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection("#projects")}
              >
                {/* <PlayIcon className="h-5 w-5" /> */}
                <span>{t("hero.exploreProjects")}</span>
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-3 gap-8 pt-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              {[
                {
                  number: "500+",
                  label: t("hero.stats.projects"),
                  color: "text-fire-red",
                },
                {
                  number: "24/7",
                  label: t("hero.stats.emergency"),
                  color: "text-fire-orange",
                },
                {
                  number: "15+",
                  label: t("hero.stats.experience"),
                  color: "text-blue-400",
                },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  whileHover={{ scale: 1.1 }}
                >
                  <div className={`text-3xl font-bold ${stat.color}`}>
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-200 mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Feature Cards */}
          <motion.div
            className="lg:pl-8 space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {[
              {
                title: t("hero.sideContent.FireProtectionSystems"),
                description: t("hero.sideContent.fireSubTitle"),
                features: [
                  t("hero.sideContent.smokeDetection"),
                  t("hero.sideContent.fireSuppression"),
                  t("hero.sideContent.gasDetection"),
                  t("hero.sideContent.heatSensors"),
                ],
              },
              {
                title: t("hero.sideContent.IndustrialPiping"),
                description: t("hero.sideContent.pipingSubTitle"),
                features: [
                  t("hero.sideContent.steamsystems"),
                  t("hero.sideContent.compressedAir"),
                  t("hero.sideContent.processLines"),
                  t("hero.sideContent.utilityPiping"),
                ],
              },
            ].map((card, index) => (
              <motion.div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
                whileHover={{
                  scale: 1.02,
                  backgroundColor: "rgba(255,255,255,0.15)",
                }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl font-bold text-white mb-2">
                  {card.title}
                </h3>
                <p className="text-gray-300 mb-4">{card.description}</p>
                <div className="grid grid-cols-2 gap-2">
                  {card.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <div className="w-2 h-2 me-2 bg-fire-orange rounded-full"></div>
                      <span className="text-sm text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Section Divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-16 fill-white"
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

export default Hero;
