import { ProgressProvider, TrialDataProvider } from "../providers";
import { useRef, useEffect, useState } from "react";
import { SoundProvider } from "../providers/SoundProvider";
import { Overlay } from "./Overlay";
import { CanvasContainer } from "./CanvasContainer";

export const LearningTemplate = ({ sketch, title }) => {
  const canvasSizeRef = useRef(null);
  const [overlayVisible, setOverlayVisible] = useState(true);
  const [canvasWidth, setCanvasWidth] = useState(0);
  const [canvasHeight, setCanvasHeight] = useState(0);

  const handleOverlayClick = () => {
    setOverlayVisible(false);
  };

  useEffect(() => {
    if (canvasSizeRef.current) {
      const canvasRect = canvasSizeRef.current.getBoundingClientRect();

      setCanvasWidth(canvasRect.width);
      setCanvasHeight(canvasRect.height);
    }
  }, [canvasSizeRef]);

  return (
    <SoundProvider>
      <TrialDataProvider>
        <ProgressProvider>
          {overlayVisible ? (
            <>
              <Overlay onClick={handleOverlayClick} />
              <div
                style={{
                  width: "100%",
                  height: "60vh",
                  visibility: "hidden",
                }}
                ref={canvasSizeRef}
              ></div>
            </>
          ) : (
            <CanvasContainer
              sketch={sketch}
              canvasWidth={canvasWidth}
              canvasHeight={canvasHeight}
              title={title}
            />
          )}
        </ProgressProvider>
      </TrialDataProvider>
    </SoundProvider>
  );
};
