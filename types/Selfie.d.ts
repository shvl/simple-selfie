export interface Selfie {
    video: HTMLVideoElement;
    outputCanvas: HTMLCanvasElement;
    start(): Promise<void>;
    stop(): void;
    startFaceDetection(): void;
    stopFaceDetection(): void;
    captureImage(): Uint8ClampedArray;
}
