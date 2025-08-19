import { MyCanvas } from "./MyCanvas";
import { FeedbackCorrect } from "./progress/FeedbackCorrect";
import { BusyOverlay } from "./BusyOverlay";
import { FanfareOverlay } from "./FanfareOverlay";
import { ProgressBox } from "./ProgressBox";
import { useProgressContext, useTrialDataContext } from "../providers";

export const CanvasContainer = (props) => {
  const progressContext = useProgressContext();
  const trialDataContext = useTrialDataContext();

  const isFanfare =
    trialDataContext.trialData.length === progressContext.currentTrial;

  return isFanfare && !progressContext.busy ? (
    <FanfareOverlay />
  ) : (
    <>
      <BusyOverlay />
      {/* <FanfareOverlay /> */}
      {/* titie */}

      <div
        style={{
          fontSize: "x-large",
        }}
      >
        {props.title}
      </div>

      {/* canvas */}
      <div
        id="p5Canvas"
        style={{
          width: "100%",
          height: "55vh",
          border: "solid gray 1px",
        }}
      />

      {/* action area */}
      <div
        style={{
          display: "flex",
          justifyContent: "right",
          width: "100%",
          height: "6vh",
        }}
      ></div>

      {/* correct feedback area */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          height: "11vh",
        }}
      >
        <FeedbackCorrect />
      </div>

      {/* progress box area */}
      <ProgressBox />

      <MyCanvas
        sketch={props.sketch}
        width={props.canvasWidth}
        height={props.canvasHeight}
      />
    </>
  );
};
