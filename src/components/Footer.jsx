import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Footer = () => {
  const { t } = useTranslation();
  // const isRTL = i18n.language === "ar";
  // const scrollToTop = () => {
  //   window.scrollTo({ top: 0, behavior: "smooth" });
  // };

  // const scrollToSection = (href) => {
  //   const element = document.querySelector(href);
  //   if (element) {
  //     element.scrollIntoView({ behavior: "smooth" });
  //   }
  // };

  const quickLinks = [
    { name: t("nav.home"), href: "/" },
    { name: t("nav.about"), href: "/about" },
    { name: t("nav.services"), href: "/services" },
    { name: t("nav.vision"), href: "/vision" },
    { name: t("nav.projects"), href: "/projects" },
    { name: t("nav.contact"), href: "/contact" },
  ];

  const services = [
    t("footer.services.0"),
    t("footer.services.1"),
    t("footer.services.2"),
    t("footer.services.3"),
    t("footer.services.4"),
    t("footer.services.5"),
  ];

  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid lg:grid-cols-3 gap-18">
            {/* Company Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-1"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-fire-red to-fire-orange rounded-lg flex items-center justify-center me-2">
                  <img
                    src="/logo-smartPro-removebg-preview.png"
                    alt="Logo"
                    className="w-[100%] h-[100%]"
                  />
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    SMART <span className="text-fire-red">PRO</span>
                  </div>
                  <div className="text-sm text-gray-400">
                    Fire Safety & Industrial Solutions
                  </div>
                </div>
              </div>

              <p className="text-gray-300 mb-6 leading-relaxed">
                {t("footer.description")}
              </p>

              {/* Contact Info */}
              {/* <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <EnvelopeIcon className="h-5 w-5 text-fire-red me-2" />
                  <span className="text-gray-300">info@smartpro.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <PhoneIcon className="h-5 w-5 text-fire-red me-2" />
                  <span className="text-gray-300">01063121118</span>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPinIcon className="h-5 w-5 me-2 text-fire-red mt-0.5" />
                  <span className="text-gray-300">
                    Km 21 Coastal International Road
                    <br />
                    Alexandria, Egypt
                  </span>
                </div>
              </div> */}
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h3 className="text-xl font-bold mb-6">
                {t("footer.quickLinks")}
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.href}
                      onClick={() => window.scrollTo(0, 0)}
                      className="text-gray-300 hover:text-fire-red transition-colors duration-300 flex items-center space-x-2 group"
                    >
                      <span className="w-1 h-1 bg-fire-orange rounded-full group-hover:w-2 transition-all duration-300 me-2"></span>
                      <span>{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Services */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-xl font-bold mb-6">
                {t("footer.ourServices")}
              </h3>
              <ul className="space-y-3">
                {services.map((service, index) => (
                  <li key={index}>
                    <div className="text-gray-300 hover:text-fire-red transition-colors duration-300 flex items-center space-x-2 group cursor-pointer">
                      <span className="w-1 h-1 bg-fire-orange rounded-full group-hover:w-2 transition-all duration-300 me-2"></span>
                      <span>{service}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Newsletter & Social */}
            {/* <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3 className="text-xl font-bold mb-6">Stay Connected</h3>
              <p className="text-gray-300 mb-6">
                Subscribe to our newsletter for the latest updates on fire
                safety and industrial solutions.
              </p>

              <div className="space-y-4">
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:border-fire-red transition-colors duration-300"
                  />
                  <button className="bg-gradient-to-r from-fire-red to-fire-orange px-6 py-3 rounded-r-lg hover:from-fire-red/90 hover:to-fire-orange/90 transition-all duration-300">
                    Subscribe
                  </button>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
                <div className="flex space-x-4">
                  {["LinkedIn", "WhatsApp", "Email"].map((social, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-10 h-10 bg-gray-800 hover:bg-fire-red rounded-lg flex items-center justify-center transition-colors duration-300"
                    >
                      <span className="text-sm font-medium">{social[0]}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div> */}
          </div>
        </div>

        {/* Bottom Bar */}
        {/* <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-gray-800 py-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-center md:text-left">
              <p>&copy; 2025 SMART PRO. All rights reserved.</p>
              <p className="text-sm mt-1">
                Licensed & Insured Fire Protection Specialists
              </p>
            </div>

            <div className="flex items-center space-x-6">
              <button className="text-gray-400 hover:text-white transition-colors duration-300">
                Privacy Policy
              </button>
              <button className="text-gray-400 hover:text-white transition-colors duration-300">
                Terms of Service
              </button>
            </div>
          </div>
        </motion.div> */}
      </div>
    </footer>
  );
};

export default Footer;
