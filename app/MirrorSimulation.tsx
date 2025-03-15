"use client";

import { useCallback, useEffect, useRef } from "react";
import coords from "./data.json";
import useSimulationStore from "./hooks/useSimulationStore";
import InputPanel from "./InputPanel";
import {
  drawCircle,
  drawLine,
  drawText,
  getCanvasXCenter,
  getCanvasYCenter,
} from "./Helper";

export interface Coords {
  x: number;
  y: number;
}

export default function MirrorSimulation() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const {
    objectX,
    objectHeightMultiplier,
    focalPoint,
    showLightRay,
    canvasWidth,
    canvasHeight,
    objectYOffset,
    showLabel,
    isConvex,
  } = useSimulationStore();

  const minY = Math.min(...coords.map((coord) => coord.Y));
  const maxY = Math.max(...coords.map((coord) => coord.Y));

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    const sPrima = 1 / (1 / focalPoint - 1 / objectX);
    const M = -sPrima / objectX;
    const hPrima = M * objectYOffset;
    const imageX = isConvex ? -sPrima : sPrima;

    const drawMirror = () => {
      ctx.beginPath();
      ctx.moveTo(0, getCanvasYCenter());
      ctx.lineTo(canvasWidth, getCanvasYCenter());
      ctx.strokeStyle = "black";
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(getCanvasXCenter(), 0);
      ctx.lineTo(getCanvasXCenter(), canvasHeight);
      ctx.stroke();

      if (isConvex) {
        ctx.beginPath();
        let lensWidth = Math.max(10, 200 / Math.abs(focalPoint || 1)); // Prevent division by 0
        lensWidth = Math.min(lensWidth, canvasWidth / 2 - 20); // Prevent it from getting too large

        ctx.ellipse(
          getCanvasXCenter(),
          getCanvasYCenter(),
          lensWidth,
          canvasHeight / 2,
          0,
          0,
          Math.PI * 2
        );
        ctx.strokeStyle = "blue";
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    };

    const drawInfo = () => {
      ctx.fillStyle = "black";
      ctx.font = "14px Arial";
      ctx.fillText(`${canvasWidth}x${canvasHeight}`, canvasWidth - 80, 30);
      ctx.fillText("(0,0)", getCanvasXCenter() + 2, getCanvasYCenter() - 5);

      ctx.fillText(
        `
      Image Distance: ${Math.abs(sPrima).toFixed(1)} units`,
        -8,
        30
      );
      ctx.fillText(`Magnification: ${Math.abs(M).toFixed(2)}×`, 20, 50);
      ctx.fillText(`Image Type: ${sPrima > 0 ? "Virtual" : "Real"}`, 20, 70);
    };

    const drawObject = () => {
      coords.forEach((coord, i) => {
        if (i < coords.length - 1) {
          drawLine(
            ctx,
            objectX + coord.X,
            (coord.Y - minY) * objectHeightMultiplier,
            objectX + coords[i + 1].X,
            (coords[i + 1].Y - minY) * objectHeightMultiplier,
            "red",
            3
          );
        }
      });
    };

    const drawObjectImage = () => {
      coords.forEach((coord, i) => {
        if (i < coords.length - 1) {
          drawLine(
            ctx,
            imageX + coord.X * M,
            (coord.Y - minY) * objectHeightMultiplier * M,
            imageX + coords[i + 1].X * M,
            (coords[i + 1].Y - minY) * objectHeightMultiplier * M,
            "blue",
            3
          );
        }
      });
    };

    const drawLightRays = () => {
      const objectTop: Coords = {
        x: objectX,
        y: (maxY - minY) * objectHeightMultiplier,
      };
      const shadowTop: Coords = { x: imageX, y: objectTop.y * M };

      drawLine(ctx, objectTop.x, objectTop.y, 0, objectTop.y, "red", 1);
      drawLine(ctx, 0, objectTop.y, shadowTop.x, shadowTop.y, "red", 1);
      drawLine(ctx, objectTop.x, objectTop.y, 0, shadowTop.y, "green", 1);
      drawLine(ctx, 0, shadowTop.y, shadowTop.x, shadowTop.y, "green", 1);
      if (isConvex)
        drawLine(
          ctx,
          objectTop.x,
          objectTop.y,
          shadowTop.x,
          shadowTop.y,
          "green",
          1
        );
    };

    const drawFocalPoint = () => {
      drawCircle(ctx, focalPoint, getCanvasYCenter(), 5, "green");
      if (isConvex)
        drawCircle(ctx, -focalPoint, getCanvasYCenter(), 5, "green");
    };

    const drawMirrorVertex = () => {
      drawCircle(ctx, focalPoint * 2, getCanvasYCenter(), 5, "purple");
      if (isConvex)
        drawCircle(ctx, -focalPoint * 2, getCanvasYCenter(), 5, "green");
    };

    drawInfo();
    drawMirror();
    drawObject();
    drawObjectImage();
    drawFocalPoint();
    drawMirrorVertex();
    if (showLightRay) drawLightRays();
    if (showLabel) {
      drawText(ctx, "Object", objectX - 15, objectYOffset - 200);
      drawText(
        ctx,
        sPrima <= 0 ? "Real Image" : "Virtual Image",
        imageX - 25,
        objectYOffset - 200
      );

      drawText(ctx, "F", focalPoint - 3, -15);
      drawText(ctx, "2F", focalPoint * 2 - 3, -15);

      if (isConvex) {
        drawText(ctx, "F", -focalPoint - 3, -15);
        drawText(ctx, "2F", -focalPoint * 2 - 3, -15);
      }
    }
  }, [
    objectX,
    objectHeightMultiplier,
    focalPoint,
    showLightRay,
    showLabel,
    isConvex,
  ]);

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
