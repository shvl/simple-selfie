import { CapturedImage } from "./CapturedImage";
export interface Selfie {
    video: HTMLVideoElement;
    outputCanvas: HTMLCanvasElement;
    start(): Promise<void>;
    stop(): void;
    startFaceDetection(): void;
    stopFaceDetection(): void;
    captureImage(): Promise<CapturedImage>;
}
