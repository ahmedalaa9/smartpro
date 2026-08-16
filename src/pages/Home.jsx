import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import Partners from "../components/Partners";
import {
  ArrowRightIcon,
  ShieldCheckIcon,
  WrenchScrewdriverIcon,
  BuildingOffice2Icon,
  CheckBadgeIcon,
  ClockIcon,
  UserGroupIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";

const Home = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  return (
    <div className="home-page">
      <Hero />

      {/* ───────────── Welcome Header ───────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {t("home.welcome")}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-fire-red to-fire-orange">
                SMART PRO
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {t("home.subtitle")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ───────────── About Us Section ───────────── */}
      <section className="py-20 bg-gray-50 relative overflow-hidden">
        {/* Decorative blob */}
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-fire-red/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image side */}
            <motion.div
              initial={{ opacity: 0, x: isRTL ? 60 : -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg"
                  alt={t("nav.about")}
                  className="w-full h-[400px] object-cover"
                />
              </div>
              {/* Floating accent card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="absolute -bottom-6 -right-6 bg-gradient-to-br from-fire-red to-fire-orange text-white rounded-2xl p-5 shadow-xl"
              >
                <div className="text-3xl font-bold">15+</div>
                <div className="text-sm opacity-90">
                  {t("hero.stats.experience")}
                </div>
              </motion.div>
            </motion.div>

            {/* Text side */}
            <motion.div
              initial={{ opacity: 0, x: isRTL ? -60 : 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center bg-fire-red/10 rounded-full px-4 py-2">
                <ShieldCheckIcon className="h-5 w-5 text-fire-red me-2" />
                <span className="text-fire-red font-semibold text-sm">
                  {t("nav.about")}
                </span>
              </div>

              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                {t("about.leading")}
              </h3>

              <p className="text-lg text-gray-600 leading-relaxed">
                {t("home.aboutBrief")}
              </p>

              <Link
                to="/about"
                onClick={() => window.scrollTo(0, 0)}
                className="inline-flex items-center bg-gradient-to-r from-fire-red to-fire-orange text-white px-7 py-3 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 group"
              >
                <span>{t("home.readMore")}</span>
                <ArrowRightIcon
                  className={`h-5 w-5 ${
                    isRTL ? "mr-2 rotate-180" : "ml-2"
                  } group-hover:translate-x-1 transition-transform`}
                />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ───────────── Services Section ───────────── */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-fire-orange/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text side - LEFT on desktop */}
            <motion.div
              initial={{ opacity: 0, x: isRTL ? 60 : -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6 order-2 lg:order-1"
            >
              <div className="inline-flex items-center bg-blue-500/10 rounded-full px-4 py-2">
                <WrenchScrewdriverIcon className="h-5 w-5 text-blue-600 me-2" />
                <span className="text-blue-600 font-semibold text-sm">
                  {t("nav.services")}
                </span>
              </div>

              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                {t("services.title")} {t("services.services")}
              </h3>

              <p className="text-lg text-gray-600 leading-relaxed">
                {t("home.servicesBrief")}
              </p>

              {/* Mini feature grid */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                {[
                  t("services.fireProtectionTitle"),
                  t("services.mechanicalTitle"),
                  t("services.customSolution"),
                  t("services.learnMore"),
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <div className="w-2 h-2 mt-2 rounded-full bg-fire-orange shrink-0" />
                    <span className="text-gray-700 text-sm font-medium">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <Link
                to="/services"
                onClick={() => window.scrollTo(0, 0)}
                className="inline-flex items-center bg-gradient-to-r from-blue-600 to-blue-700 text-white px-7 py-3 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 group"
              >
                <span>{t("home.readMore")}</span>
                <ArrowRightIcon
                  className={`h-5 w-5 ${
                    isRTL ? "mr-2 rotate-180" : "ml-2"
                  } group-hover:translate-x-1 transition-transform`}
                />
              </Link>
            </motion.div>

            {/* Image side - RIGHT on desktop */}
            <motion.div
              initial={{ opacity: 0, x: isRTL ? -60 : 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative order-1 lg:order-2"
            >
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg"
                  alt={t("nav.services")}
                  className="w-full h-[400px] object-cover"
                />
              </div>
              {/* Floating accent */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="absolute -bottom-6 -left-6 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-2xl p-5 shadow-xl"
              >
                <div className="text-3xl font-bold">24/7</div>
                <div className="text-sm opacity-90">
                  {t("hero.stats.emergency")}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ───────────── Projects Section ───────────── */}
      <section className="py-20 bg-gray-50 relative overflow-hidden">
        <div className="absolute top-10 right-10 w-72 h-72 bg-fire-red/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image side */}
            <motion.div
              initial={{ opacity: 0, x: isRTL ? 60 : -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/images/projects/Boiler and Steam Piping System Installation Works/6030532772973186507.jpg"
                  alt={t("nav.projects")}
                  className="w-full h-[400px] object-cover"
                />
              </div>
              {/* Floating accent */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="absolute -bottom-6 -right-6 bg-gradient-to-br from-fire-red to-fire-orange text-white rounded-2xl p-5 shadow-xl"
              >
                <div className="text-3xl font-bold">500+</div>
                <div className="text-sm opacity-90">
                  {t("hero.stats.projects")}
                </div>
              </motion.div>
            </motion.div>

            {/* Text side */}
            <motion.div
              initial={{ opacity: 0, x: isRTL ? -60 : 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center bg-fire-orange/10 rounded-full px-4 py-2">
                <BuildingOffice2Icon className="h-5 w-5 text-fire-orange me-2" />
                <span className="text-fire-orange font-semibold text-sm">
                  {t("nav.projects")}
                </span>
              </div>

              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                {t("projects.title")} {t("projects.projects")}
              </h3>

              <p className="text-lg text-gray-600 leading-relaxed">
                {t("home.projectsBrief")}
              </p>

              <Link
                to="/projects"
                onClick={() => window.scrollTo(0, 0)}
                className="inline-flex items-center bg-gradient-to-r from-fire-red to-fire-orange text-white px-7 py-3 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 group"
              >
                <span>{t("home.readMore")}</span>
                <ArrowRightIcon
                  className={`h-5 w-5 ${
                    isRTL ? "mr-2 rotate-180" : "ml-2"
                  } group-hover:translate-x-1 transition-transform`}
                />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ───────────── Why Choose Us Section ───────────── */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-10 right-10 w-64 h-64 bg-fire-red/10 rounded-full blur-3xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-10 left-10 w-80 h-80 bg-fire-orange/10 rounded-full blur-3xl"
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 5, repeat: Infinity }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {t("home.whyChooseUs")}
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {t("home.whyChooseUsDesc")}
            </p>
          </motion.div>

          {/* Feature cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              {
                icon: CheckBadgeIcon,
                title: isRTL ? "جودة معتمدة" : "Certified Quality",
                desc: isRTL
                  ? "نلتزم بأعلى المعايير الدولية"
                  : "We adhere to the highest international standards",
              },
              {
                icon: ClockIcon,
                title: isRTL ? "التسليم في الموعد" : "On-Time Delivery",
                desc: isRTL
                  ? "نلتزم بالجداول الزمنية المحددة"
                  : "We commit to agreed timelines",
              },
              {
                icon: UserGroupIcon,
                title: isRTL ? "فريق متخصص" : "Expert Team",
                desc: isRTL
                  ? "مهندسون وفنيون معتمدون"
                  : "Certified engineers and technicians",
              },
              {
                icon: GlobeAltIcon,
                title: isRTL ? "تغطية شاملة" : "Full Coverage",
                desc: isRTL
                  ? "نخدم جميع القطاعات الصناعية"
                  : "Serving all industrial sectors",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(255,255,255,0.12)",
                }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center transition-all duration-300"
              >
                <feature.icon className="h-10 w-10 text-fire-orange mx-auto mb-4" />
                <h4 className="text-lg font-bold text-white mb-2">
                  {feature.title}
                </h4>
                <p className="text-gray-400 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center"
          >
            <Link
              to="/contact"
              onClick={() => window.scrollTo(0, 0)}
              className="inline-flex items-center bg-gradient-to-r from-fire-red to-fire-orange text-white px-10 py-4 rounded-lg font-semibold text-lg hover:shadow-2xl hover:shadow-fire-red/20 hover:scale-105 transition-all duration-300 group"
            >
              <span>{t("home.contactUsNow")}</span>
              <ArrowRightIcon
                className={`h-5 w-5 ${
                  isRTL ? "mr-2 rotate-180" : "ml-2"
                } group-hover:translate-x-1 transition-transform`}
              />
            </Link>
          </motion.div>
        </div>
      </section>

      <Partners />
    </div>
  );
};

export default Home;
