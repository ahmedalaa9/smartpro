import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  BuildingOfficeIcon,
  FireIcon,
  WrenchScrewdriverIcon,
  CogIcon,
} from "@heroicons/react/24/outline";

import { projects } from "./project-data";
import { useTranslation } from "react-i18next";

const Projects = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [activeCategory, setActiveCategory] = useState("all");
  const [currentSlide, setCurrentSlide] = useState(0);

  const categories = [
    { id: "all", name: t("projects.categories.all"), icon: BuildingOfficeIcon },
    { id: "fire", name: t("projects.categories.fire"), icon: FireIcon },
    {
      id: "piping",
      name: t("projects.categories.piping"),
      icon: WrenchScrewdriverIcon,
    },
    {
      id: "mechanical",
      name: t("projects.categories.mechanical"),
      icon: CogIcon,
    },
  ];

  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  // Calculate slides based on items per slide (3 items per slide)
  const itemsPerSlide = 3;
  const totalSlides = Math.ceil(filteredProjects.length / itemsPerSlide);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  // Reset carousel when category changes
  const handleCategoryChange = (id) => {
    setActiveCategory(id);
    setCurrentSlide(0);
  };

  // Get current slide projects
  const getCurrentSlideProjects = () => {
    const startIndex = currentSlide * itemsPerSlide;
    const endIndex = startIndex + itemsPerSlide;
    return filteredProjects.slice(startIndex, endIndex);
  };

  return (
    <section id="projects" className="py-20 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-40 left-20 w-64 h-64 bg-red-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 right-20 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 mb-20">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t("projects.title")}{" "}
            <span className="text-red-600">{t("projects.projects")}</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t("projects.subtitle")}
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                activeCategory === category.id
                  ? "bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <category.icon className={`h-5 w-5 ${isRTL ? "ml-1" : "mr-1"}`} />
              <span>{category.name}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Carousel */}
        <div className="relative">
          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mb-8">
            <motion.button
              onClick={prevSlide}
              disabled={totalSlides <= 1}
              className={`p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 ${
                totalSlides <= 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              whileHover={totalSlides > 1 ? { scale: 1.1 } : {}}
              whileTap={totalSlides > 1 ? { scale: 0.9 } : {}}
            >
              <ChevronLeftIcon
                className={`${isRTL ? "rotate-180" : ""} h-6 w-6 text-gray-600`}
              />
            </motion.button>

            <div className="text-center">
              <span className="text-gray-500">
                <span>{currentSlide + 1}</span>
                <span> {t("projects.of")} </span>
                <span>{totalSlides}</span>
              </span>
            </div>

            <motion.button
              onClick={nextSlide}
              disabled={totalSlides <= 1}
              className={`p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 ${
                totalSlides <= 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              whileHover={totalSlides > 1 ? { scale: 1.1 } : {}}
              whileTap={totalSlides > 1 ? { scale: 0.9 } : {}}
            >
              <ChevronRightIcon
                className={`${isRTL ? "rotate-180" : ""} h-6 w-6 text-gray-600`}
              />
            </motion.button>
          </div>

          {/* Projects Grid */}
          <div className="min-h-[400px]">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {getCurrentSlideProjects().map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{
                    duration: 0.4,
                    delay: 0.1 + index * 0.1,
                  }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group"
                >
                  {/* Project Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-4 right-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          project.category === "fire"
                            ? "bg-red-100 text-red-800"
                            : project.category === "piping"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {
                          categories.find((cat) => cat.id === project.category)
                            ?.name
                        }
                      </span>
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-6">
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors duration-300">
                        {project.title}
                      </h3>
                      <p className="text-red-600 font-medium text-sm">
                        {project.client}
                      </p>
                    </div>

                    <p className="text-gray-600 mb-4">{project.description}</p>

                    {/* Features */}
                    <div className="space-y-2">
                      {project.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <div
                            className={`w-1.5 h-1.5 bg-orange-500 rounded-full ${
                              isRTL ? "ml-2" : "mr-2"
                            }`}
                          ></div>
                          <span className="text-sm text-gray-700">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Slide Indicators */}
          {totalSlides > 1 && (
            <div className="flex justify-center mt-12  ">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-4 h-4 rounded-full transition-all duration-300 mx-1.5 ${
                    index === currentSlide
                      ? "bg-red-600 scale-125"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Section Divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-16 fill-gray-50"
        >
          <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default Projects;
