import { ProcessedFrame } from "./ProcessedFrame";

export interface CapturedImage extends ProcessedFrame {
  getImageData(): Uint8ClampedArray
};
