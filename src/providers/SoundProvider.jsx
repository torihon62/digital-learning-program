import useSound from "use-sound";
import correct from "../assets/sounds/s1.mp3";
import incorrect from "../assets/sounds/s2.mp3";
import fanfare from "../assets/sounds/clap.mp3";
import nosound from "../assets/sounds/nosound.mp3";
import { createContext, useContext } from "react";

const SoundContext = createContext({});

export const useSoundContext = () => {
  return useContext(SoundContext);
};

export const SoundProvider = (props) => {
  const [playCorrect] = useSound(correct);
  const [playIncorrect] = useSound(incorrect);
  const [playFanfare] = useSound(fanfare);
  const [playNosound] = useSound(nosound);
  const correctSound = {
    play: () => playCorrect(),
  };
  const incorrectSound = {
    play: () => playIncorrect(),
  };
  const fanfareSound = {
    play: () => playFanfare(),
  };
  const noSound = {
    play: () => playNosound(),
  };

  const value = {
    correctSound,
    incorrectSound,
    fanfareSound,
    noSound,
  };

  return (
    <SoundContext.Provider value={value}>
      {props.children}
    </SoundContext.Provider>
  );
};
