// 描画処理
export const sketch = (
  trialDataContext,
  progressContext,
  canvasWidth,
  canvasHeight,
  tensorflow
) => {
  return (p) => {
    let canvas = null;
    let miniCanvas = null;
    let miniCanvasContext = null;
    let model = null;
    let pointerDown = false;
    let strokes = [];
    let drewLines = [];
    let timerID = null;
    let results = [];

    function percent(value) {
      return Math.round(value * 100);
    }

    function drawMini(inputStrokes) {
      const context = miniCanvasContext;
      const w = miniCanvas.width;
      const S = 2;
      context.fillStyle = "#000";
      context.fillRect(0, 0, w, w);
      context.lineWidth = S;

      const invW = w / canvasWidth;
      const weight = canvasWidth / canvasHeight >= 1.8 ? 2 : 1;
      for (const points of inputStrokes) {
        context.strokeStyle = "#fff";
        context.beginPath();
        points.forEach((pos, i) => {
          if (i === 0) context.moveTo(pos.x * invW, pos.y * invW * weight);
          else context.lineTo(pos.x * invW, pos.y * invW * weight);
        });
        context.stroke();
      }
      const url = miniCanvas.toDataURL("image/png");
      console.log(url);
    }

    function recognizeCharacter(p) {
      if (!drewLines.length) return;
      if (pointerDown) return;
      if (model === null) return;
      if (canvas === null) return;
      tensorflow.tidy(() => {
        const x = tensorflow.browser
          .fromPixels(miniCanvas, 1)
          .expandDims()
          .toFloat();
        const y = model.predict(x, { batchSize: 1 });
        const yArray = y.arraySync();
        const probabilities = yArray[0];

        const order = [...Array(probabilities.length)]
          .map((_, i) => i)
          .filter((i) => probabilities[i] >= 0.005);
        order.sort((a, b) => probabilities[b] - probabilities[a]);
        console.log(order);
        return;
        order.forEach((idx) => {
          const prob = probabilities[idx];
          const per = percent(prob);
          const resultChar = CLASS[idx];
          results.push({
            detectChar: resultChar,
            percent: per,
          });
        });
      });
    }

    function viewDetectResult() {
      console.log(JSON.stringify(results));
    }

    p.preload = () => {
      const trialData =
        trialDataContext.trialData[progressContext.currentTrial];
      if (trialData === undefined) return;
      // 画像などを事前に読み込む場合はここに記述

      const url = import.meta.env.DEV
        ? "/src/assets/models/detectFigure/model.json"
        : "/assets/models/detectFigure/model.json";

      (async () => {
        model = await tensorflow.loadLayersModel(url);
      })();
    };

    p.setup = () => {
      const trialData =
        trialDataContext.trialData[progressContext.currentTrial];
      if (trialData === undefined) return;
      console.log(trialData);
      // セットアップ処理
      canvas = p.createCanvas(canvasWidth, canvasHeight);
      miniCanvas = document.createElement("canvas");
      miniCanvas.width = 400;
      miniCanvas.height = 400;
      miniCanvasContext = miniCanvas.getContext("2d");

      p.textAlign(p.CENTER);
      p.fill("#D8D8D8");
      p.textSize(22);
      p.text(trialData.question, canvasWidth / 2, canvasHeight / 1.1);
    };

    p.draw = () => {
      // TODO: 処理実装
    };

    const handleOnClick = (p) => {
      pointerDown = true;
      if (timerID !== null) {
        clearTimeout(timerID);
      }
      drewLines = [];
    };

    const handleOnMove = (p) => {
      if (drewLines.length > 3000 || !pointerDown) return;
      drewLines = [...drewLines, { x: p.mouseX, y: p.mouseY }];

      p.strokeWeight(10);
      p.line(p.pmouseX, p.pmouseY, p.mouseX, p.mouseY);
    };

    const handleOnMoveEnd = (p) => {
      pointerDown = false;
      if (drewLines.length > 1) {
        strokes.push(drewLines);
      }
      results = [];
      drawMini(strokes);
      recognizeCharacter(p);

      timerID = setTimeout(() => {
        viewDetectResult();
      }, 2000);
    };

    /**
     * ここから編集しないでください
     */
    const settingOnClick = (p, func) => {
      p.touchStarted = () => {
        func(p);
      };
      // p.mouseClicked = () => {
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
