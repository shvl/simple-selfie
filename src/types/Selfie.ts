import { CapturedImage } from "./CapturedImage";
import { Face } from "./Face";
import { ProcessedFrame } from "./ProcessedFrame";

export interface Selfie {
  video: HTMLVideoElement;
  outputCanvas: HTMLCanvasElement;

  start(): Promise<void>;
  stop(): void;
  startFaceDetection(): void;
  stopFaceDetection(): void;
  captureImage(): Promise<CapturedImage> 
  setOnFrameProcessedCallback(callback: (frameData: CanvasRenderingContext2D | null, face: Face | null) => void): void;
  setOnFaceFrameProcessedCallback(callback: (processedFrame: ProcessedFrame) => void): void;
  setOnResize(callback: () => void): void;
  getContainer(): HTMLElement;
}
