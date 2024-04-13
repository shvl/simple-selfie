import * as faceapi from 'face-api.js';
import { SelfieConfig } from './types/SelfieConfig';
import { Frame, Selfie as ISelfie, ProcessedFrame} from './types';
import { Face } from './Face';
import { getFaceFrame } from './utils/getFaceFrame';

const roundFrame = (frame: Frame) => ({
  x: Math.round(frame.x),
  y: Math.round(frame.y),
  width: Math.round(frame.width),
  height: Math.round(frame.height),
});

export class Selfie implements ISelfie {
  private frame = {
    width: 720,
    height: 560,
  };
  private debug = false;
  private lastFaceFrame: Frame = {} as Frame;
  private onFaceFrameProcessedCallback: (processedFrame: ProcessedFrame) => void = () => {};
  private onFrameProcessedCallback: (frameData: Uint8ClampedArray) => Uint8ClampedArray = (frameData) => frameData;
  private canvas: HTMLCanvasElement;
  private isPlayStarted = false;
  private container: HTMLElement;
  private isStoped = false;
  private isFaceDetectionStarted = false;
  private processingCanvas: HTMLCanvasElement;
  private weightsPath = './weights';
  public video: HTMLVideoElement;
  public outputCanvas: HTMLCanvasElement;

  constructor(config: SelfieConfig) {
    this.debug = config.debug || window.location.search.includes('selfie-debug') || false;
    this.frame = config.frame || this.frame;
    this.container = config.container;
    this.video = document.createElement('video');
    this.video.setAttribute('autoplay', '');
    this.video.setAttribute('muted', '');
    this.video.setAttribute('playsinline', '');
    this.container.append(this.video);
    this.outputCanvas = document.createElement('canvas');
    this.processingCanvas = document.createElement('canvas');
    this.container.append(this.outputCanvas);
    this.canvas = document.createElement('canvas');
    this.container = config.container;
    this.weightsPath = config.weightsPath || this.weightsPath;

    this.onFaceFrameProcessedCallback = config.onFaceFrameProcessed || this.onFaceFrameProcessedCallback;
    this.onFrameProcessedCallback = config.onFrameProcessed || this.onFrameProcessedCallback;
    this.resize = this.resize.bind(this);
    this.play = this.play.bind(this);
  }

  updateCanvas() {
    const outCtx = this.outputCanvas?.getContext('2d');
    const processingCtx = this.processingCanvas?.getContext('2d');
    const updateCanvas = () => {
      const { width, height } = this.outputCanvas as HTMLCanvasElement;
      processingCtx?.drawImage(this.video, 0, 0, width, height);
      const frameData = processingCtx?.getImageData(0, 0, width, height);
      if (frameData) {
        const processedFrame = this.onFrameProcessedCallback(frameData.data);
        outCtx?.putImageData(new ImageData(processedFrame, width, height), 0, 0);
      }
      this.video.requestVideoFrameCallback(updateCanvas);
    };
    this.video.requestVideoFrameCallback(updateCanvas);
  }

  resize() {
    const videoWidth = this.video.videoWidth || 0;
    const videoHeight = this.video?.videoHeight || 0;
    const scaleFactor =
      Math.min(this.container.offsetWidth || 0, this.container.offsetHeight || 0) /
      Math.min(videoWidth || 0, this.video?.videoHeight || 0);
    if (!this.outputCanvas || !this.processingCanvas) {
      return;
    }
    const newWidth = Math.round(videoWidth * scaleFactor);
    const newHeight = Math.round(videoHeight * scaleFactor);
    if (this.outputCanvas.style.width !== `${newWidth}px`) {
      this.outputCanvas.style.width = `${newWidth}px`;
      this.outputCanvas.width = videoWidth;
      this.processingCanvas.style.width = `${newWidth}px`;
      this.processingCanvas.width = videoWidth;
    }
    if (this.outputCanvas.style.height !== `${newHeight}px`) {
      this.outputCanvas.style.height = `${newHeight}px`;
      this.outputCanvas.height = videoHeight;
      this.processingCanvas.style.height = `${newHeight}px`;
      this.processingCanvas.height = videoHeight;
    }
  }

  async start() {
    const { video } = this;
    video.style.width = `${this.frame.width}px`;
    video.style.height = `${this.frame.height}px`;
    video.style.position = 'absolute';

    window.addEventListener('resize', this.resize);

    video.addEventListener('play', this.play);

    await Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri(this.weightsPath),
      faceapi.nets.faceLandmark68Net.loadFromUri(this.weightsPath),
    ]);

    return navigator.mediaDevices
      .getUserMedia({
        video: {
          width: this.frame.width,
          height: this.frame.height,
          facingMode: 'user',
        },
      })
      .then((stream) => {
        video.srcObject = stream;
      })
      .catch((err) => {
        console.error('Error accessing the camera', err);
        throw err;
      });
  }

  play() {
    if (this.isStoped) {
      return;
    }
    this.canvas.remove();
    this.canvas = faceapi.createCanvasFromMedia(this.video);
    this.canvas.style.position = 'absolute';
    this.video.style.opacity = '0';
    this.container.append(this.canvas);
    this.resize();

    const displaySize = { width: this.video.width, height: this.video.height };
    faceapi.matchDimensions(this.canvas, displaySize);
    this.updateCanvas();
    this.isPlayStarted = true;
  }

  async startFaceDetection() {
    const { video } = this;
    this.isFaceDetectionStarted = true;

    while (!this.isPlayStarted) {
      await new Promise((resolve) => setTimeout(resolve, 100));
      if (this.isStoped || !this.isFaceDetectionStarted) {
        return;
      }
    }
    while (true) {
      await new Promise((resolve) => setTimeout(resolve, 100));
      try {
        if (this.isStoped || !this.isFaceDetectionStarted) {
          return;
        }
        const detections = await faceapi
          .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks();
        const frame = {
          width: video.videoWidth,
          height: video.videoHeight,
        };
        const resizedDetections = faceapi.resizeResults(detections, frame);
        if (detections.length > 0) {
          const face = new Face(detections[0].landmarks, frame);

          this.canvas.getContext('2d')?.clearRect(0, 0, this.canvas.width, this.canvas.height);

          if (this.debug && this.canvas) {
            faceapi.draw.drawFaceLandmarks(this.canvas, resizedDetections);
          }

          this.lastFaceFrame = roundFrame(getFaceFrame(resizedDetections[0]));

          this.onFaceFrameProcessedCallback({
            face,
            faceFrame: this.lastFaceFrame,
            detection: resizedDetections[0],
          } );
        }
      } catch (e) {
        console.error(e);
      }
    }
  }

  async stopFaceDetection() {
    this.isFaceDetectionStarted = false;
  }

  captureImage(): Uint8ClampedArray {
    if (!this.video) {
      throw new Error('Video not initialized');
    }
    const frame = this.outputCanvas
      ?.getContext('2d')
      ?.getImageData(0, 0, this.video.videoWidth, this.video.videoHeight);

    const inputData = frame?.data;
    return inputData || new Uint8ClampedArray();
  }

  stop() {
    this.isStoped = true;
    this.video.remove();
    this.canvas.remove();
    this.outputCanvas.remove();
    window.removeEventListener('resize', this.resize);
  }
}
