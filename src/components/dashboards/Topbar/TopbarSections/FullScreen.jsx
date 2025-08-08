import { useEffect } from 'react';
import { Maximize } from 'react-feather';

const FullscreenToggle = () => {
  const toggleFullscreen = () => {
    const doc = document;
    const docEl = document.documentElement;

    if (doc.fullscreenElement || doc.webkitFullscreenElement || doc.mozFullScreenElement) {
      doc.exitFullscreen?.();
      doc.webkitCancelFullScreen?.();
      doc.mozCancelFullScreen?.();
    } else {
      docEl.requestFullscreen?.();
      docEl.webkitRequestFullscreen?.(Element.ALLOW_KEYBOARD_INPUT);
      docEl.mozRequestFullScreen?.();
    }
    document.body.classList.toggle("fullscreen-enable");
  };

  useEffect(() => {
    const handleExit = () => {
      if (!document.fullscreenElement && !document.webkitFullscreenElement && !document.mozFullScreenElement) {
        document.body.classList.remove("fullscreen-enable");
      }
    };

    document.addEventListener("fullscreenchange", handleExit);
    document.addEventListener("webkitfullscreenchange", handleExit);
    document.addEventListener("mozfullscreenchange", handleExit);

    return () => {
      document.removeEventListener("fullscreenchange", handleExit);
      document.removeEventListener("webkitfullscreenchange", handleExit);
      document.removeEventListener("mozfullscreenchange", handleExit);
    };
  }, []);

  return (
    <button className="btn nav-link" onClick={toggleFullscreen}>
      <Maximize className="fullscreen noti-icon" />
    </button>
  );
};

export default FullscreenToggle;