export const getCanvasXCenter = () => 1280 / 2;
export const getCanvasYCenter = () => 720 / 2;
const max = 8000;

export const drawLine = (
  ctx: CanvasRenderingContext2D,
  sx: number,
  sy: number,
  ex: number,
  ey: number,
  color = "black",
  lineWidth = 1
) => {
  const clamp = (val: number) => Math.max(-max, Math.min(max, val));
  sx = clamp(sx);
  sy = clamp(sy);
  ex = clamp(ex);
  ey = clamp(ey);

  const dx = ex - sx;
  const dy = ey - sy;
  const steps = Math.max(Math.abs(dx), Math.abs(dy));
  const xIncrement = dx / steps;
  const yIncrement = dy / steps;

  let x = sx;
  let y = sy;
  ctx.fillStyle = color;
  ctx.beginPath();

  for (let i = 0; i <= steps; i++) {
    ctx.fillRect(
      x + getCanvasXCenter(),
      -y + getCanvasYCenter(),
      lineWidth,
      lineWidth
    );
    x += xIncrement;
    y += yIncrement;
  }
};

export const drawLineInfinite = (
  ctx: CanvasRenderingContext2D,
  sx: number,
  sy: number,
  ex: number,
  ey: number,
  color = "black",
  lineWidth = 1,
  objectX: number
) => {
  const dx = ex - sx;
  const dy = ey - sy;
  const xIncrement = dx / Math.sqrt(dx * dx + dy * dy);
  const yIncrement = dy / Math.sqrt(dx * dx + dy * dy);
  const dotSpacing = 5;

  let x = sx;
  let y = sy;
  ctx.fillStyle = color;
  ctx.beginPath();

  for (let i = 0; i < max; i++) {
    if (
      objectX > 0
        ? x + getCanvasXCenter() > getCanvasXCenter()
        : x + getCanvasXCenter() < getCanvasXCenter()
    ) {
      ctx.fillRect(
        x + getCanvasXCenter(),
        -y + getCanvasYCenter(),
        lineWidth,
        lineWidth
      );
    } else if (i % dotSpacing === 0) {
      ctx.fillRect(
        x + getCanvasXCenter(),
        -y + getCanvasYCenter(),
        lineWidth,
        lineWidth
      );
    }

    x += xIncrement;
    y += yIncrement;

    // if (
    //   x + getCanvasXCenter() < 0 ||
    //   x + getCanvasXCenter() > 1280 ||
    //   -y + getCanvasYCenter() < 0 ||
    //   -y + getCanvasYCenter() > 720
    // ) {
    //   break;
    // }
  }
};

export const drawLineInfinite1 = (
  ctx: CanvasRenderingContext2D,
  sx: number,
  sy: number,
  ex: number,
  ey: number,
  color = "black",
  lineWidth = 1
) => {
  const dx = ex - sx;
  const dy = ey - sy;
  const xIncrement = dx / Math.sqrt(dx * dx + dy * dy);
  const yIncrement = dy / Math.sqrt(dx * dx + dy * dy);

  let x = sx;
  let y = sy;

  ctx.fillStyle = color;
  ctx.beginPath();

  for (let i = 0; i < max; i++) {
    ctx.fillRect(
      x + getCanvasXCenter(),
      -y + getCanvasYCenter(),
      lineWidth,
      lineWidth
    );

    x += xIncrement;
    y += yIncrement;
    // if (x < -1280 || x > 1280 || y < -1280 || y > 1280) break;
  }
};

export const dottedDrawLine = (
  ctx: CanvasRenderingContext2D,
  sx: number,
  sy: number,
  ex: number,
  ey: number,
  color = "black",
  lineWidth = 1,
  dotSpacing = 5
) => {
  const dx = ex - sx;
  const dy = ey - sy;
  const xIncrement = dx / Math.sqrt(dx * dx + dy * dy);
  const yIncrement = dy / Math.sqrt(dx * dx + dy * dy);

  let x = sx;
  let y = sy;
  ctx.fillStyle = color;
  ctx.beginPath();

  for (let i = 0; i < max; i++) {
    if (i % dotSpacing === 0) {
      ctx.fillRect(
        x + getCanvasXCenter(),
        -y + getCanvasYCenter(),
        lineWidth,
        lineWidth
      );
    }
    x += xIncrement;
    y += yIncrement;
  }
};

export const drawCircle = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  color: string = "black"
) => {
  ctx.beginPath();
  ctx.arc(
    x + getCanvasXCenter(),
    -y + getCanvasYCenter(),
    radius,
    0,
    Math.PI * 2
  );
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
  ctx.textAlign = "left";
  ctx.font = "14px Arial";
  ctx.fillStyle = color;
  ctx.fillText(text, x + getCanvasXCenter(), -y + getCanvasYCenter());
};
