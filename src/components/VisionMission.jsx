import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  EyeIcon,
  RocketLaunchIcon,
  CheckCircleIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";

const VisionMission = () => {
  const { t } = useTranslation();

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const missionPoints = [
    t("vision.missionPoints.0"),
    t("vision.missionPoints.1"),
    t("vision.missionPoints.2"),
    t("vision.missionPoints.3"),
    t("vision.missionPoints.4"),
    t("vision.missionPoints.5"),
  ];

  return (
    <section id="vision" className="py-20 bg-gray-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C62828' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-48 h-48 bg-fire-red/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-fire-orange/10 rounded-full blur-3xl"></div>
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
            {t("vision.title")}{" "}
            <span className="text-fire-red">{t("vision.mission")}</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t("vision.subtitle")}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Vision Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-fire-red to-fire-orange rounded-2xl p-8 md:p-12 text-white relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-4 end-4 w-28 h-28 border-2 border-white rounded-full"></div>
                <div className="absolute bottom-4 left-4 w-24 h-24 border-2 border-white rounded-full"></div>
              </div>

              <div className="relative z-10">
                <div className="flex items-center  mb-6">
                  <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
                    <EyeIcon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold ms-3">
                    {t("vision.ourVision")}
                  </h3>
                </div>

                <div className="space-y-6">
                  <p className="text-xl leading-relaxed">
                    {t("vision.visionText")}
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-center  ">
                      <StarIcon className="h-6 w-6 me-3  text-yellow-300" />
                      <span className="text-lg">
                        {" "}
                        {t("vision.visionPoints.0")}
                      </span>
                    </div>
                    <div className="flex items-center  ">
                      <StarIcon className="h-6 w-6  me-3 text-yellow-300" />
                      <span className="text-lg">
                        {t("vision.visionPoints.1")}
                      </span>
                    </div>
                    <div className="flex items-center  ">
                      <StarIcon className="h-6 w-6  me-3 text-yellow-300" />
                      <span className="text-lg">
                        {" "}
                        {t("vision.visionPoints.2")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Mission Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl border border-gray-100 relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-4 end-4 w-28 h-28 border-2 border-fire-red rounded-full"></div>
                <div className="absolute bottom-4 left-4 w-24 h-24 border-2 border-fire-orange rounded-full"></div>
              </div>

              <div className="relative z-10">
                <div className="flex items-center    mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-fire-red to-fire-orange rounded-xl flex items-center justify-center">
                    <RocketLaunchIcon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 ms-3">
                    {t("vision.ourMission")}
                  </h3>
                </div>

                <div className="space-y-6">
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {t("vision.missionText")}
                  </p>

                  <div className="space-y-4">
                    {missionPoints.map((point, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                        className="flex items-start space-x-3"
                      >
                        <CheckCircleIcon className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5 me-2" />
                        <span className="text-gray-700">{point}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {t("vision.coreValues")}
              <span className="text-fire-red"> {t("vision.smart")}</span>
            </h2>
            <p className="text-lg text-gray-600">
              {t("vision.valuesSubtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: t("vision.values.experience.title"),
                description: t("vision.values.experience.description"),
                color: "from-red-500 to-red-600",
              },
              {
                title: t("vision.values.unCompromised.title"),
                description: t("vision.values.unCompromised.description"),
                color: "from-blue-500 to-blue-600",
              },
              {
                title: t("vision.values.time.title"),
                description: t("vision.values.time.description"),
                color: "from-green-500 to-green-600",
              },
              {
                title: t("vision.values.dedicated.title"),
                description: t("vision.values.dedicated.description"),
                color: "from-purple-500 to-purple-600",
              },
              {
                title: t("vision.values.multiLocation.title"),
                description: t("vision.values.multiLocation.description"),
                color: "from-orange-500 to-orange-600",
              },
              {
                title: t("vision.values.competitve.title"),
                description: t("vision.values.competitve.description"),
                color: "from-teal-500 to-teal-600",
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                whileHover={{ scale: 1.07, y: -5 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center border border-gray-100"
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${value.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                >
                  <div className="w-8 h-8 bg-white rounded-full"></div>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">
                  {value.title}
                </h4>
                <p className="text-gray-600">{value.description}</p>
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

export default VisionMission;
