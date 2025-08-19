// 描画処理
export const sketch = (
  trialDataContext,
  progressContext,
  canvasWidth,
  canvasHeight
) => {
  return (p) => {
    let drewLine = {
      startX: 0,
      startY: 0,
      endX: 0,
      endY: 0,
      isX1Y1Start: false,
      isX2Y2Start: false,
    };
    let dotsProps = {
      x1: 0,
      x2: 0,
      y1: 0,
      y2: 0,
      radius: 15,
    };
    let pointerDown = false;
    let drewLines = [];

    p.setup = () => {
      // セットアップ処理
      p.createCanvas(canvasWidth, canvasHeight);
      p.fill(0);
      dotsProps.x1 =
        trialDataContext.trialData[progressContext.currentTrial].x1;
      dotsProps.y1 =
        trialDataContext.trialData[progressContext.currentTrial].y1;
      dotsProps.x2 =
        trialDataContext.trialData[progressContext.currentTrial].x2;
      dotsProps.y2 =
        trialDataContext.trialData[progressContext.currentTrial].y2;

      p.circle(dotsProps.x1, dotsProps.y1, dotsProps.radius * 2);
      p.circle(dotsProps.x2, dotsProps.y2, dotsProps.radius * 2);
    };

    p.draw = () => {
      // TODO: 処理実装
    };

    const handleOnClick = (p) => {
      pointerDown = true;
      drewLine.startX = p.mouseX;
      drewLine.startY = p.mouseY;
      drewLine.isX1Y1Start = circleIsOnOrContains(
        drewLine.startX,
        drewLine.startY,
        dotsProps.x1,
        dotsProps.y1,
        dotsProps.radius
      );
      drewLine.isX2Y2Start = circleIsOnOrContains(
        drewLine.startX,
        drewLine.startY,
        dotsProps.x2,
        dotsProps.y2,
        dotsProps.radius
      );
    };

    const handleOnMove = (p) => {
      if (drewLines.length > 3000 || !pointerDown) return;
      drewLines = [...drewLines, { x: p.mouseX, y: p.mouseY }];

      p.strokeWeight(4);
      p.line(p.pmouseX, p.pmouseY, p.mouseX, p.mouseY);
    };

    const handleOnMoveEnd = (p) => {
      pointerDown = false;

      drewLine.endX = p.mouseX;
      drewLine.endY = p.mouseY;

      const isStartContain = drewLine.isX1Y1Start || drewLine.isX2Y2Start;

      const isEndContain = drewLine.isX1Y1Start
        ? circleIsOnOrContains(
            drewLine.endX,
            drewLine.endY,
            dotsProps.x2,
            dotsProps.y2,
            dotsProps.radius
          )
        : drewLine.isX2Y2Start
        ? circleIsOnOrContains(
            drewLine.endX,
            drewLine.endY,
            dotsProps.x1,
            dotsProps.y1,
            dotsProps.radius
          )
        : false;

      if (isStartContain && isEndContain) {
        progressContext.handleCorrectAnswer(p);
      } else {
        progressContext.handleIncorrectAnswer(p);
      }
    };

    /*******************
     * 円の内外判定
     *******************/
    const circleContains = (pointX, pointY, circleX, circleY, radius) => {
      const x = (pointX - circleX) ** 2;
      const y = (pointY - circleY) ** 2;
      const r = radius ** 2;
      return x + y < r;
    };

    const circleIsOn = (pointX, pointY, circleX, circleY, radius) => {
      const x = (pointX - circleX) ** 2;
      const y = (pointY - circleY) ** 2;
      const r = radius ** 2;
      return x + y === r;
    };

    const circleIsOnOrContains = (pointX, pointY, circleX, circleY, radius) => {
      return (
        circleContains(pointX, pointY, circleX, circleY, radius) ||
        circleIsOn(pointX, pointY, circleX, circleY, radius)
      );
    };
    /**
     * ここから編集しないでください
     */
    const settingOnClick = (p, func) => {
      p.touchStarted = () => {
        func(p);
      };
      p.mouseClicked = () => {
        func(p);
      };
    };

    const settingOnMove = (p, func) => {
      p.touchMoved = () => {
        func(p);
      };
      p.mouseDragged = () => {
        func(p);
      };
    };

    const settingOnMoveEnd = (p, func) => {
      p.touchEnded = () => {
        func(p);
      };
      p.mouseUp = () => {
        func(p);
      };
    };
    settingOnClick(p, handleOnClick);
    settingOnMove(p, handleOnMove);
    settingOnMoveEnd(p, handleOnMoveEnd);
  };
};
