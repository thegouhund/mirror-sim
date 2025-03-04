"use client";

import { useCallback, useEffect, useRef } from "react";
import coords from "./data.json";
import useSimulationStore from "./hooks/useSimulationStore";
import InputPanel from "./InputPanel";

interface Coord {
  X: number;
  Y: number;
}

export default function MirrorSimulation() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const {
    objectX,
    objectHeight,
    focalPoint,
    showLightRay,
    canvasWidth,
    canvasHeight,
    objectYOffset,
    showLabel,
  } = useSimulationStore();

  const getCanvasXCenter = (): number => canvasWidth / 2;
  const getCanvasYCenter = (): number => canvasHeight / 2;

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    ctx.beginPath();
    ctx.moveTo(0, getCanvasYCenter());
    ctx.lineTo(canvasWidth, getCanvasYCenter());
    ctx.strokeStyle = "black";
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(getCanvasXCenter(), 0);
    ctx.lineTo(getCanvasXCenter(), canvasHeight);
    ctx.stroke();

    ctx.fillStyle = "black";
    ctx.font = "14px Arial";
    ctx.fillText(`${canvasWidth}x${canvasHeight}`, canvasWidth - 80, 30);
    ctx.fillText("(0,0)", getCanvasXCenter() + 2, getCanvasYCenter() - 5);

    let sPrima = 1 / (1 / focalPoint - 1 / objectX);
    let M = -sPrima / objectX;
    let hPrima = M * objectYOffset;

    ctx.fillText(
      `Image Distance: ${Math.abs(sPrima).toFixed(1)} units`,
      20,
      30
    );
    ctx.fillText(`Magnification: ${Math.abs(M).toFixed(2)}×`, 20, 50);
    ctx.fillText(`Image Type: ${sPrima > 0 ? "Virtual" : "Real"}`, 20, 70);

    const drawLine = (
      startX: number,
      startY: number,
      endX: number,
      endY: number,
      color: string = "black",
      lineWidth: number = 1
    ) => {
      ctx.beginPath();
      ctx.moveTo(startX + getCanvasXCenter(), -startY + getCanvasYCenter());
      ctx.lineTo(endX + getCanvasXCenter(), -endY + getCanvasYCenter());
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
      ctx.stroke();
    };

    const drawTexts = () => {
      const drawText = (
        text: string,
        x: number,
        y: number,
        color: string = "black"
      ) => {
        ctx.fillStyle = color;
        ctx.fillText(text, x + getCanvasXCenter(), -y + getCanvasYCenter());
      };
      drawText("Object", objectX - 15, objectYOffset - 200);
      if (sPrima <= 0) {
        drawText("Real Image", sPrima - 25, objectYOffset - 200);
      } else {
        drawText("Virtual Image", sPrima - 30, objectYOffset - 200);
      }
      drawText("F", focalPoint - 3, -15);
      drawText("2F", focalPoint * 2 - 3, -15);
    };

    const drawCircle = (
      x: number,
      y: number,
      radius: number,
      color: string = "black"
    ) => {
      ctx.beginPath();
      ctx.arc(x + getCanvasXCenter(), y, radius, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
    };

    const drawObject = () => {
      coords.forEach((coord: Coord, i: number) => {
        if (i < coords.length - 1) {
          drawLine(
            coord.X + objectX,
            coord.Y + objectYOffset,
            coords[i + 1].X + objectX,
            coords[i + 1].Y + objectYOffset,
            "red",
            3
          );
        }
      });
    };

    const drawObjectImage = () => {
      coords.forEach((coord: Coord, i: number) => {
        if (i < coords.length - 1) {
          drawLine(
            sPrima + coord.X * M,
            hPrima + coord.Y * M,
            sPrima + coords[i + 1].X * M,
            hPrima + coords[i + 1].Y * M,
            "blue",
            3
          );
        }
      });
    };

    const drawLightRays = () => {
      let objectTop = { x: objectX, y: 118.56 + objectYOffset };
      let shadowTop = { x: sPrima, y: hPrima - 118.56 * -M };

      drawLine(objectTop.x, objectTop.y, 0, objectTop.y, "red", 1);
      drawLine(0, objectTop.y, shadowTop.x, shadowTop.y, "red", 1);

      drawLine(objectTop.x, objectTop.y, 0, shadowTop.y, "green", 1);
      drawLine(0, shadowTop.y, shadowTop.x, shadowTop.y, "green", 1);
    };

    const drawFocalPoint = () => {
      drawCircle(focalPoint, getCanvasYCenter(), 5, "green");
    };

    const drawMirrorVertex = () => {
      drawCircle(focalPoint * 2, getCanvasYCenter(), 5, "purple");
    };

    drawObject();
    drawObjectImage();
    drawFocalPoint();
    drawMirrorVertex();
    if (showLightRay) drawLightRays();
    if (showLabel) drawTexts();
  }, [objectX, objectHeight, focalPoint, showLightRay, showLabel]);

  useEffect(() => {
    draw();
  }, [draw]);

  return (
    <div className="flex flex-col gap-6 my-2">
      <canvas
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
        className="w-full relative bg-white border rounded-lg shadow-md mt-2"
      />
      <InputPanel />
    </div>
  );
}
