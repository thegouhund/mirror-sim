import useSimulationStore from "./hooks/useSimulationStore";

export const getCanvasXCenter = () => 1280 / 2;
export const getCanvasYCenter = () => 720 / 2;

export const drawLine = (
  ctx: CanvasRenderingContext2D,
  sx: number,
  sy: number,
  ex: number,
  ey: number,
  color = "black",
  lineWidth = 1
) => {
  ctx.beginPath();
  ctx.moveTo(sx + getCanvasXCenter(), -sy + getCanvasYCenter());
  ctx.lineTo(ex + getCanvasXCenter(), -ey + getCanvasYCenter());
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;
  ctx.stroke();
};

export const drawCircle = (
  ctx: CanvasRenderingContext2D,
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

export const drawText = (
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  color = "black"
) => {
  ctx.fillStyle = color;
  ctx.fillText(text, x + getCanvasXCenter(), -y + getCanvasYCenter());
};
