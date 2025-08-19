import { useEffect } from "react";
import congratsImage from "../assets/images/congrats.jpg";
import { useSoundContext } from "../providers/SoundProvider";

export const FanfareOverlay = () => {
  const soundContext = useSoundContext();

  useEffect(() => {
    soundContext.fanfareSound.play();
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        position: "absolute",
        top: 0,
        left: 0,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <img src={congratsImage} style={{ width: "auto", height: "90%" }} />
    </div>
  );
};
