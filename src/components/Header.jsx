// import { useState, useEffect } from "react";
// import {
//   Bars3Icon,
//   XMarkIcon,
//   ShieldCheckIcon,
//   CheckCircleIcon,
//   ArrowRightIcon,
// } from "@heroicons/react/24/outline";

// const Header = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 50);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   const navLinks = [
//     { name: "Home", href: "#home" },
//     { name: "Services", href: "#services" },
//     { name: "About Us", href: "#about" },
//     { name: "Contact", href: "#contact" },
//     { name: "Login", href: "#login" },
//   ];

//   const services = [
//     "Smoke Detection",
//     "Heat Sensors",
//     "Gas Detection",
//     "Fire Suppression",
//   ];

//   const stats = [
//     { number: "500+", label: "Projects Completed", color: "text-fire-red" },
//     { number: "24/7", label: "Emergency Support", color: "text-fire-orange" },
//     { number: "15+", label: "Years Experience", color: "text-blue-600" },
//   ];

//   return (
//     <div className="bg-gray-50 min-h-screen">
//       {/* Navigation */}
//       <nav
//         className={`sssssssssssssssssssssssssssssssssssssssssss fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
//           isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-white"
//         }`}
//       >
//         <div className="max-w-7xl mx-auto px-6 lg:px-8">
//           <div className="flex justify-between items-center py-4">
//             {/* Logo */}
//             <div className="flex items-center space-x-3">
//               <div className="w-10 h-10 bg-fire-red rounded-lg flex items-center justify-center">
//                 <ShieldCheckIcon className="h-6 w-6 text-white" />
//               </div>
//               <div>
//                 <div className="text-xl font-bold text-gray-900">
//                   SMART <span className="text-fire-red">PRO</span>
//                 </div>
//                 <div className="text-xs text-gray-500">
//                   Fire Safety Solutions
//                 </div>
//               </div>
//             </div>

//             {/* Desktop Navigation */}
//             <div className="hidden md:flex items-center space-x-8">
//               {navLinks.map((link) => (
//                 <a
//                   key={link.name}
//                   href={link.href}
//                   className="text-gray-700 hover:text-fire-red font-medium transition-colors duration-300"
//                 >
//                   {link.name}
//                 </a>
//               ))}
//               <button className="bg-fire-red hover:bg-fire-red/90 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2">
//                 <span>Get Free Quote</span>
//                 <ArrowRightIcon className="h-4 w-4" />
//               </button>
//             </div>

//             {/* Mobile Menu Button */}
//             <div className="md:hidden">
//               <button onClick={toggleMenu} className="p-2 text-gray-700">
//                 {isMenuOpen ? (
//                   <XMarkIcon className="h-6 w-6" />
//                 ) : (
//                   <Bars3Icon className="h-6 w-6" />
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         <div
//           className={`md:hidden transition-all duration-300 ${
//             isMenuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
//           } overflow-hidden bg-white shadow-lg`}
//         >
//           <div className="px-6 py-4 space-y-3">
//             {navLinks.map((link) => (
//               <a
//                 key={link.name}
//                 href={link.href}
//                 className="block py-2 text-gray-700 hover:text-fire-red transition-colors duration-300"
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 {link.name}
//               </a>
//             ))}
//             <button className="w-full bg-fire-red hover:bg-fire-red/90 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 flex items-center justify-center space-x-2 mt-4">
//               <span>Get Free Quote</span>
//               <ArrowRightIcon className="h-4 w-4" />
//             </button>
//           </div>
//         </div>
//       </nav>

//       {/* Hero Section */}
//       <div className="pt-24 pb-16 px-6 lg:px-8">
//         <div className="max-w-7xl mx-auto">
//           <div className="grid lg:grid-cols-2 gap-12 items-center">
//             {/* Left Content */}
//             <div className="space-y-8">
//               {/* Trust Badge */}
//               <div className="inline-flex items-center space-x-2 bg-white border border-fire-red/20 rounded-full px-4 py-2 text-fire-red">
//                 <ShieldCheckIcon className="h-4 w-4" />
//                 <span className="text-sm font-medium">
//                   Trusted Fire Safety Experts
//                 </span>
//               </div>

//               {/* Main Headline */}
//               <div className="space-y-4">
//                 <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
//                   Advanced Fire Safety{" "}
//                   <span className="text-fire-red">Solutions</span>{" "}
//                   <span className="text-fire-orange">That Save Lives</span>
//                 </h1>

//                 <div className="space-y-3 text-lg text-gray-600">
//                   <p>
//                     Protect your property and people with our cutting-edge fire
//                     detection, suppression, and safety systems.
//                   </p>
//                   <p>Professional installation and 24/7 monitoring services.</p>
//                 </div>
//               </div>

//               {/* CTA Buttons */}
//               <div className="flex flex-col sm:flex-row gap-4">
//                 <button className="bg-fire-red hover:bg-fire-red/90 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 group">
//                   <span>Schedule Free Inspection</span>
//                   <ArrowRightIcon className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
//                 </button>

//                 <button className="border-2 border-gray-300 hover:border-gray-400 text-gray-700 hover:bg-gray-50 px-8 py-4 rounded-lg font-semibold transition-all duration-300">
//                   View Our Services
//                 </button>
//               </div>

//               {/* Stats */}
//               <div className="grid grid-cols-3 gap-8 pt-8">
//                 {stats.map((stat, index) => (
//                   <div key={index} className="text-center">
//                     <div className={`text-3xl font-bold ${stat.color}`}>
//                       {stat.number}
//                     </div>
//                     <div className="text-sm text-gray-600 mt-1">
//                       {stat.label}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Right Content - Service Card */}
//             <div className="lg:pl-8">
//               <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
//                 {/* Service Header */}
//                 <div className="flex items-center space-x-3">
//                   <div className="w-12 h-12 bg-fire-red rounded-lg flex items-center justify-center">
//                     <ShieldCheckIcon className="h-6 w-6 text-white" />
//                   </div>
//                   <div>
//                     <h3 className="text-xl font-bold text-gray-900">
//                       Fire Detection Systems
//                     </h3>
//                     <p className="text-gray-600">
//                       Advanced smoke & heat detection
//                     </p>
//                   </div>
//                 </div>

//                 {/* Service List */}
//                 <div className="space-y-4">
//                   {services.map((service, index) => (
//                     <div key={index} className="flex items-center space-x-3">
//                       <CheckCircleIcon className="h-5 w-5 text-green-500 flex-shrink-0" />
//                       <span className="text-gray-700">{service}</span>
//                     </div>
//                   ))}
//                 </div>

//                 {/* Free Consultation CTA */}
//                 <div className="bg-red-50 rounded-lg p-4 flex items-center justify-between">
//                   <div>
//                     <div className="font-semibold text-gray-900">
//                       Free Consultation
//                     </div>
//                     <div className="text-sm text-gray-600">
//                       Get expert advice today
//                     </div>
//                   </div>
//                   <ArrowRightIcon className="h-5 w-5 text-fire-red" />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Scroll Indicator */}
//       <div className="flex justify-center pb-8">
//         <div className="flex flex-col items-center space-y-2 text-gray-400">
//           <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center">
//             <div className="w-1 h-3 bg-fire-red rounded-full mt-2 animate-bounce"></div>
//           </div>
//           <span className="text-xs">Scroll to explore</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Header;
