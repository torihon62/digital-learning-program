// 描画処理
export const sketch = (
  trialDataContext,
  progressContext,
  canvasWidth,
  canvasHeight
) => {
  return (p) => {
    const selectBoxWidth = canvasWidth / 4;
    const selectBoxHeight = canvasHeight / 7;
    const selectBoxFontSize = 30;
    let samplePict;
    let selectBoxCoordinates = [];

    const calcSelectBoxCoordinates = () => {
      const choicesCount = parseInt(
        trialDataContext.trialData[progressContext.currentTrial].choicesCount
      );

      const twoColumnUse = choicesCount > 3;
      const canvasCenter = canvasWidth / 2;
      const columnY1 = twoColumnUse
        ? canvasHeight - selectBoxHeight * 2.5
        : canvasHeight - selectBoxHeight - selectBoxHeight / 2.5;
      const columnY2 = twoColumnUse ? canvasHeight - selectBoxHeight - 20 : 0;
      const columnX11 = canvasCenter - canvasCenter / 2 - selectBoxWidth / 4;
      const columnX12 = canvasCenter;
      const columnX13 = canvasCenter + canvasCenter / 2 + selectBoxWidth / 4;
      const columnX21 = canvasCenter - canvasCenter / 2 + selectBoxWidth / 4;
      const columnX22 = canvasCenter + canvasCenter / 2 - selectBoxWidth / 4;

      // 選択肢は1から6の対応
      switch (choicesCount) {
        case 1:
          selectBoxCoordinates = [{ x: columnX12, y: columnY1 }];
          break;
        case 2:
          selectBoxCoordinates = [
            { x: columnX21, y: columnY1 },
            { x: columnX22, y: columnY1 },
          ];
          break;
        case 3:
          selectBoxCoordinates = [
            { x: columnX11, y: columnY1 },
            { x: columnX12, y: columnY1 },
            { x: columnX13, y: columnY1 },
          ];
          break;
        case 4:
          selectBoxCoordinates = [
            { x: columnX21, y: columnY1 },
            { x: columnX22, y: columnY1 },
            { x: columnX21, y: columnY2 },
            { x: columnX22, y: columnY2 },
          ];
          break;
        case 5:
          selectBoxCoordinates = [
            { x: columnX11, y: columnY1 },
            { x: columnX12, y: columnY1 },
            { x: columnX13, y: columnY1 },
            { x: columnX21, y: columnY2 },
            { x: columnX22, y: columnY2 },
          ];
          break;
        case 6:
          selectBoxCoordinates = [
            { x: columnX11, y: columnY1 },
            { x: columnX12, y: columnY1 },
            { x: columnX13, y: columnY1 },
            { x: columnX11, y: columnY2 },
            { x: columnX12, y: columnY2 },
            { x: columnX13, y: columnY2 },
          ];
          break;
      }
    };

    const isRectContain = (mouseX, mouseY) => {
      let index = -1;
      const contain = selectBoxCoordinates.some((coordinates, i) => {
        const minX = coordinates.x - selectBoxWidth / 2;
        const maxX = coordinates.x + selectBoxWidth / 2;
        const minY = coordinates.y - selectBoxHeight / 2;
        const maxY = coordinates.y + selectBoxHeight / 2;
        if (
          minX <= mouseX &&
          maxX >= mouseX &&
          minY <= mouseY &&
          maxY >= mouseY
        ) {
          index = i;
          return true;
        }
        return false;
      });
      return {
        ok: contain,
        index,
      };
    };

    p.preload = () => {
      const trialData =
        trialDataContext.trialData[progressContext.currentTrial];
      if (trialData === undefined) return;

      const baseURL = import.meta.env.DEV
        ? "/src/assets/images"
        : "/assets/images";
      const samplePictFilePath = `${baseURL}/${
        trialDataContext.trialData[progressContext.currentTrial].file_name
      }`;
      samplePict = p.loadImage(samplePictFilePath);
    };

    p.setup = () => {
      const trialData =
        trialDataContext.trialData[progressContext.currentTrial];
      if (trialData === undefined) return;

      // セットアップ処理
      p.createCanvas(canvasWidth, canvasHeight);
      p.imageMode(p.CENTER);
      p.image(samplePict, canvasWidth / 2, canvasHeight / 4, 200, 200);
      calcSelectBoxCoordinates();

      const choicesCount = parseInt(trialData.choicesCount);

      p.rectMode(p.CENTER);
      p.textAlign(p.CENTER, p.CENTER);
      p.textSize(selectBoxFontSize);
      for (let i = 0; i < choicesCount; i++) {
        p.rect(
          selectBoxCoordinates[i].x,
          selectBoxCoordinates[i].y,
          selectBoxWidth,
          selectBoxHeight
        );
        p.text(
          trialData[`cp${i + 1}`],
          selectBoxCoordinates[i].x,
          selectBoxCoordinates[i].y
        );
      }
    };

    p.draw = () => {
      // TODO: 処理実装
    };

    const handleOnClick = (p) => {
      const rectContain = isRectContain(p.mouseX, p.mouseY);
      if (rectContain.index === -1) return;

      // 長方形を再レンダリング
      p.fill("lavender");
      p.rect(
        selectBoxCoordinates[rectContain.index].x,
        selectBoxCoordinates[rectContain.index].y,
        selectBoxWidth,
        selectBoxHeight
      );
      p.fill("black");
      p.text(
        trialDataContext.trialData[progressContext.currentTrial][
          `cp${rectContain.index + 1}`
        ],
        selectBoxCoordinates[rectContain.index].x,
        selectBoxCoordinates[rectContain.index].y
      );

      const correctAnswer = parseInt(
        trialDataContext.trialData[progressContext.currentTrial].correctAns
      );

      if (rectContain.ok && correctAnswer === rectContain.index) {
        progressContext.handleCorrectAnswer(p);
      } else {
        progressContext.handleIncorrectAnswer(p);
      }
    };

    const handleOnMove = (p) => {
      // TODO: 処理実装
    };

    const handleOnMoveEnd = (p) => {
      // TODO: 処理実装
    };

    /**
     * ここから編集しないでください
     */
    const settingOnClick = (p, func) => {
      p.touchStarted = () => {
        func(p);
      };
      // p.mouseClicked = () => {
      //   console.log("CLICK");
      //   func(p);
      // };
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
