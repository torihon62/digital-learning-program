import { createContext, useContext, useState } from "react";
import { useSoundContext } from "../providers/SoundProvider";

const ProgressContext = createContext({});

export const useProgressContext = () => {
  return useContext(ProgressContext);
};

export const ProgressProvider = (props) => {
  const [currentTrial, setCurrentTrial] = useState(0);
  const [trialResults, setTrialResults] = useState([]);
  const [correctAnswerSelect, setCorrectAnswerSelect] = useState(false);
  const [busy, setBusy] = useState(false);
  const soundContext = useSoundContext();

  const handleTrialResultChange = (v) => {
    setTrialResults([...trialResults, v]);
  };

  const handleCurrentTrialChange = (v) => {
    setCurrentTrial(v);
  };

  const handleCorrectAnswer = (p) => {
    setBusy(true);
    setCorrectAnswerSelect(true);
    handleTrialResultChange("correct");
    setCurrentTrial(currentTrial + 1);
    soundContext.correctSound.play();
    (async () => {
      await sleep(1500);
      setBusy(false);
      setCorrectAnswerSelect(false);
      p.remove();
    })();
  };

  const handleIncorrectAnswer = (p) => {
    setBusy(true);
    soundContext.incorrectSound.play();
    (async () => {
      await sleep(2500);
      setBusy(false);
      p.remove();
    })();
  };

  const handleIncorrectAnswerWithNextTrial = (p) => {
    setBusy(true);
    handleTrialResultChange("incorrect");
    setCurrentTrial(currentTrial + 1);
    soundContext.correctSound.play();
    (async () => {
      await sleep(1500);
      setBusy(false);
      p.remove();
    })();
  };

  const value = {
    currentTrial,
    trialResults,
    busy,
    correctAnswerSelect,
    handleCurrentTrialChange,
    handleCorrectAnswer,
    handleIncorrectAnswer,
    handleIncorrectAnswerWithNextTrial,
  };

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  return (
    <ProgressContext.Provider value={value}>
      {props.children}
    </ProgressContext.Provider>
  );
};
