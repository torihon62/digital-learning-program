import { ProgressDisplayCorrect } from "./progress/ProgressDisplayCorrect";
import { ProgressDisplayStar } from "./progress/ProgressDisplayStar";
import { ProgressDisplayEmpty } from "./progress/ProgressDisplayEmpty";
import { useProgressContext, useTrialDataContext } from "../providers";

export const ProgressBox = () => {
  const trialDataContext = useTrialDataContext();
  const progressContext = useProgressContext();
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        height: "10vh",
      }}
    >
      {trialDataContext.trialData.map((v, i) => {
        if (
          progressContext.trialResults[i] === "correct" &&
          i + 1 === trialDataContext.trialData.length
        )
          return <ProgressDisplayStar key={`progress_${i}`} />;
        if (progressContext.trialResults[i] === "correct")
          return <ProgressDisplayCorrect key={`progress_${i}`} />;
        return <ProgressDisplayEmpty key={`progress_${i}`} />;
      })}
    </div>
  );
};
