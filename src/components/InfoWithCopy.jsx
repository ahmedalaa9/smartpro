/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { useState } from "react";

function InfoWithCopy({ textColor, contactInfo }) {
  const [status, setStatus] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setStatus("Copied!");
    } catch (err) {
      console.error("Copy failed:", err);
      setStatus("Failed to copy");
    }

    // Clear status after 2 seconds
    setTimeout(() => setStatus(""), 1000);
  };
  let copiedText = false;
  let lastTargett = null;

  function handleHoverIn(e) {
    if (e.target === lastTargett) copiedText = true;
    if (copiedText) setShowTooltip(false);
    console.log(e);
    setShowTooltip(true);
    setTimeout(() => setShowTooltip(false), 2000);
  }
  function handleHoverOut() {
    setShowTooltip(false);
  }

  return (
    <motion.p
      onMouseEnter={handleHoverIn}
      onMouseLeave={handleHoverOut}
      whileHover={{ scale: 1.04, margin: 10 }}
      onClick={() => handleCopy(contactInfo)}
      className={` ${textColor} relative font-medium group-hover:text-fire-red transition-colors duration-300 cursor-pointer w-full hover:font-bold    `}
    >
      {contactInfo}
      {showTooltip && !status && (
        <span className="absolute bottom-[-60%] z-90 right-[0%] text-nowrap pointer-events-none bg-gray-300 text-red-800 text-sm py-0 px-2 rounded">
          Click to Copy
        </span>
      )}
      {status && (
        <span className="absolute bottom-[-60%] z-90 right-[0%] text-nowrap pointer-events-none bg-gray-300 text-red-800 text-sm py-0 px-2 rounded">
          {status}
        </span>
      )}
    </motion.p>
  );
}

export default InfoWithCopy;
