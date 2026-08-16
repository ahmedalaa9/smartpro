import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { projects } from "../components/project-data";

const ProjectSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full h-64 md:h-96 overflow-hidden rounded-xl group">
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 w-full h-full object-cover"
          alt={`Slide ${currentIndex + 1}`}
        />
      </AnimatePresence>
      
      {images.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <ChevronLeftIcon className={`h-6 w-6 text-gray-800 ${isRTL ? "rotate-180" : ""}`} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <ChevronRightIcon className={`h-6 w-6 text-gray-800 ${isRTL ? "rotate-180" : ""}`} />
          </button>
        </>
      )}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, idx) => (
          <div
            key={idx}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              idx === currentIndex ? "bg-fire-red scale-125" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

const ProjectsPage = () => {
  const { t } = useTranslation();

  return (
    <div className="pt-24 pb-20 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t("projects.title", "Our Projects")}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t("projects.subtitle", "Discover our extensive portfolio of successfully executed projects across various industrial sectors.")}
          </p>
        </motion.div>

        <div className="space-y-16">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl p-6 md:p-8 shadow-xl border border-gray-100"
            >
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div className={`${index % 2 !== 0 ? "lg:order-2" : ""}`}>
                  <ProjectSlider images={project.images} />
                </div>
                <div className="space-y-6">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                      {t(`projects.list.${index}.title`, project.title)}
                    </h2>
                  </div>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    {t(`projects.list.${index}.description`, project.description)}
                  </p>
                  
                  <div className="pt-4 border-t border-gray-100">
                    <h4 className="font-semibold text-gray-900 mb-4">{t('projects.keyFeatures', 'Key Features & Scope:')}</h4>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {project.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-fire-orange rounded-full"></div>
                          <span className="text-gray-700">{t(`projects.list.${index}.features.${idx}`, feature)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
