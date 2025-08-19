import { useEffect } from "react";
import p5 from "p5";
import { useProgressContext, useTrialDataContext } from "../providers";
import * as tf from "@tensorflow/tfjs";

export const MyCanvas = ({ sketch, width, height }) => {
  const trialDataContext = useTrialDataContext();
  const progressContext = useProgressContext();
  const sketchInstance = sketch(
    trialDataContext,
    progressContext,
    width,
    height,
    tf
  );

  useEffect(() => {
    if (
      trialDataContext.dataId !== "" &&
      trialDataContext.trialData.length &&
      !progressContext.busy
    ) {
      new p5(sketchInstance, "p5Canvas");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sketchInstance, width, height]);

  return null;
};
