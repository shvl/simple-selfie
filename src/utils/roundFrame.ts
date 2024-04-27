import { Frame } from "../types";

export const roundFrame = (frame: Frame) => ({
  x: Math.round(frame.x),
  y: Math.round(frame.y),
  width: Math.round(frame.width),
  height: Math.round(frame.height),
});
