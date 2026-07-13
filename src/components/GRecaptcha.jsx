/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";

const GRecaptcha = ({
  sitekey = "6LfErHUrAAAAAMAvbcFPQAbXlER8VsPTT2CS46B9",
  onReady,
}) => {
  const recaptchaRef = useRef(null);

  useEffect(() => {
    const scriptId = "recaptcha-script";
    const scriptAlreadyExists = document.getElementById(scriptId);

    const renderRecaptcha = () => {
      if (
        window.grecaptcha &&
        recaptchaRef.current &&
        recaptchaRef.current.children.length === 0
      ) {
        window.grecaptcha.ready(() => {
          const widgetId = window.grecaptcha.render(recaptchaRef.current, {
            sitekey,
          });
          if (onReady) onReady(widgetId); // optional callback if needed
        });
      }
    };

    if (!scriptAlreadyExists) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://www.google.com/recaptcha/api.js?render=explicit";
      script.async = true;
      script.defer = true;
      script.onload = renderRecaptcha;
      document.body.appendChild(script);
    } else {
      renderRecaptcha();
    }
  }, [sitekey, onReady]);

  return <div ref={recaptchaRef} className="g-recaptcha" />;
};

export default GRecaptcha;
