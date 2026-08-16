import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useTranslation } from "react-i18next";

const Partners = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const partners = [
    { name: "BAVARIA EGYPT - FIRE FIGHTING SOLUTION", img: "/images/partners/6030532772973186576.jpg" },
    { name: "BUSCH VACCUM SOLUTION", img: "/images/partners/6030532772973186577.jpg" },
    { name: "ATLASCOPCO - COMPRESSOR", img: "/images/partners/6030532772973186579.jpg" },
    { name: "Enthalpic for steam solutions", img: "/images/partners/6030532772973186581.jpg" },
    { name: "Hebeish Group", img: "/images/partners/6030532772973186583.jpg" },
    { name: "PYRAMIDS STEEL - Sandwich Panels", img: "/images/partners/6030532772973186584.jpg" },
    { name: "EMIRATES SMART SOLUTION", img: "/images/partners/6030532772973186585.jpg" },
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t("partners.title", "Our Success")} <span className="text-fire-red">{t("partners.subtitle", "Partners")}</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t("partners.description", "Collaborating with industry leaders to deliver exceptional results.")}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 items-center justify-items-center">
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-50 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 flex flex-col items-center justify-center space-y-4 w-full h-full aspect-square"
            >
              <img
                src={partner.img}
                alt={partner.name}
                className="w-full h-full object-contain max-h-24 mix-blend-multiply filter hover:grayscale-0 transition-all duration-300"
              />
              <span className="text-sm font-medium text-gray-700 text-center">{partner.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;
