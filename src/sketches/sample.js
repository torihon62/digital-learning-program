// 描画処理
export const sketch = (
  trialDataContext,
  progressContext,
  canvasWidth,
  canvasHeight
) => {
  return (p) => {
    p.preload = () => {
      const trialData =
        trialDataContext.trialData[progressContext.currentTrial];
      if (trialData === undefined) return;
      // 画像などを事前に読み込む場合はここに記述
    };

    p.setup = () => {
      const trialData =
        trialDataContext.trialData[progressContext.currentTrial];
      if (trialData === undefined) return;

      // セットアップ処理
      p.createCanvas(canvasWidth, canvasHeight);
      console.log(trialDataContext);
    };

    p.draw = () => {
      // TODO: 処理実装
    };

    const handleOnClick = (p) => {
      // TODO: 処理実装
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
