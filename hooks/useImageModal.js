import { useEffect, useState } from "react";

export default function useImageModal(ref) {
  const [imageData, setImageData] = useState({
    src: "",
    height: "",
    width: "",
    active: false,
  });

  useEffect(() => {
    const onClick = (e) => {
      if (e.target.tagName === "IMG") {
        setImageData({
          src: e.target.currentSrc,
          height: e.target.naturalHeight,
          width: e.target.naturalWidth,
          active: true,
        });
      }
    };
    const close = (e) => {
      if (e.key === "Escape") {
        setImageData({ ...imageData, active: false });
      }
    };
    ref.current.addEventListener("click", onClick);
    window.addEventListener("keydown", close);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { imageData, setImageData };
}
