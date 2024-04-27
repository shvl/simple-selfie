import { SelfieConfig } from './types/SelfieConfig';
import { Selfie as ISelfie } from './types';
export declare class Selfie implements ISelfie {
    private frame;
    private debug;
    private lastFaceFrame;
    private onFaceFrameProcessedCallback;
    private onFrameProcessedCallback;
    private onLoaded;
    private debugCanvas;
    private isPlayStarted;
    private container;
    private isStoped;
    private isFaceDetectionStarted;
    private faceDetectionInterval;
    private lastface;
    video: HTMLVideoElement;
    outputCanvas: HTMLCanvasElement;
    constructor(config: SelfieConfig);
    updateCanvas(): void;
    resize(): void;
    start(): Promise<void>;
    play(): void;
    startFaceDetection(): Promise<void>;
    stopFaceDetection(): Promise<void>;
    captureImage(): Uint8ClampedArray;
    stop(): void;
}
