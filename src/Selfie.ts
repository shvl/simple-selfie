import * as faceapi from 'simple-selfie-face-api';
import { SelfieConfig } from './types/SelfieConfig';
import { Selfie as ISelfie } from './types';
import { Face } from './Face';
import * as models from './models';
import { setCanvasSize } from './utils/setCanvasSize';
import { ProcessedFrame } from './ProcessedFrame';
import { CapturedImage } from './CapturedImage';

export class Selfie implements ISelfie {
  private frame = {
    width: 720,
    height: 560,
  };
  private debug = false;
  private onFaceFrameProcessedCallback: (processedFrame: ProcessedFrame) => void = () => {};
  private onFrameProcessedCallback: (frameData: CanvasRenderingContext2D | null, face: Face | null) => void = () =>
    null;
  private onLoaded: () => void = () => {};
  private debugCanvas: HTMLCanvasElement;
  private isPlayStarted = false;
  private container: HTMLElement;
  private isStoped = false;
  private isFaceDetectionStarted = false;
  private faceDetectionInterval = 100;
  private lastface: Face | null = null;
  public video: HTMLVideoElement;
  public outputCanvas: HTMLCanvasElement;

  constructor(config: SelfieConfig) {
    this.debug = config.debug || false;
    this.frame = config.frame || this.frame;
    this.container = config.container;
    this.video = document.createElement('video');
    this.video.setAttribute('autoplay', '');
    this.video.setAttribute('muted', '');
    this.video.setAttribute('playsinline', '');
    this.container.append(this.video);
    this.outputCanvas = document.createElement('canvas');
    this.container.append(this.outputCanvas);
    this.debugCanvas = document.createElement('canvas');
    this.container = config.container;
    this.faceDetectionInterval = config.faceDetectionInterval || this.faceDetectionInterval;

    this.onFaceFrameProcessedCallback = config.onFaceFrameProcessed || this.onFaceFrameProcessedCallback;
    this.onFrameProcessedCallback = config.onFrameProcessed || this.onFrameProcessedCallback;
    this.onLoaded = config.onLoaded || this.onLoaded;
    this.resize = this.resize.bind(this);
    this.play = this.play.bind(this);
  }

  updateCanvas() {
    const outCtx = this.outputCanvas?.getContext('2d');
    const updateCanvas = () => {
      const { width, height } = this.outputCanvas as HTMLCanvasElement;
      outCtx?.drawImage(this.video, 0, 0, width, height);
      this.onFrameProcessedCallback(outCtx, this.lastface);
      const frameData = outCtx?.getImageData(0, 0, width, height);
      if (frameData) {
        outCtx?.putImageData(new ImageData(frameData.data, width, height), 0, 0);
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
    const newWidth = Math.round(videoWidth * scaleFactor);
    const newHeight = Math.round(videoHeight * scaleFactor);

    this.outputCanvas.width = videoWidth;
    this.outputCanvas.height = videoHeight;

    setCanvasSize(this.outputCanvas, newWidth, newHeight);
    setCanvasSize(this.debugCanvas, newWidth, newHeight);

    const displaySize = { width: videoWidth, height: videoHeight };
    faceapi.matchDimensions(this.debugCanvas, displaySize);
  }

  async start() {
    const { video } = this;
    video.style.width = `${this.frame.width}px`;
    video.style.height = `${this.frame.height}px`;
    video.style.position = 'absolute';

    window.addEventListener('resize', this.resize);
    video.addEventListener('play', this.play);

    await Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromBuffer(models.manifest.tinyFaceDetector, models.fileToModel),
      faceapi.nets.faceLandmark68Net.loadFromBuffer(models.manifest.faceLandmark68Net, models.fileToModel),
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
    this.debugCanvas.remove();
    this.debugCanvas = faceapi.createCanvasFromMedia(this.video);
    this.debugCanvas.style.position = 'absolute';
    this.video.style.opacity = '0';
    this.container.append(this.debugCanvas);
    this.resize();

    this.updateCanvas();
    this.isPlayStarted = true;
    this.onLoaded();
  }

  async detectFace(): Promise<Face | null> {
    const detections = await faceapi
      .detectAllFaces(this.video, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks();
    const frame = {
      width: this.video.videoWidth,
      height: this.video.videoHeight,
    };
    const resizedDetections = faceapi.resizeResults(detections, frame);
    if (detections.length > 0) {
      const face = new Face(resizedDetections[0].landmarks, frame);

      this.debugCanvas.getContext('2d')?.clearRect(0, 0, this.debugCanvas.width, this.debugCanvas.height);

      if (this.debug && this.debugCanvas) {
        faceapi.draw.drawFaceLandmarks(this.debugCanvas, resizedDetections);
      }

      this.lastface = face;

      return face;
    }
    return null;
  }

  async startFaceDetection() {
    this.isFaceDetectionStarted = true;

    while (!this.isPlayStarted) {
      await new Promise((resolve) => setTimeout(resolve, 100));
      if (this.isStoped || !this.isFaceDetectionStarted) {
        return;
      }
    }
    while (true) {
      await new Promise((resolve) => setTimeout(resolve, this.faceDetectionInterval));
      try {
        if (this.isStoped || !this.isFaceDetectionStarted) {
          return;
        }

        const face = await this.detectFace();
        if (!face) {
          continue;
        }

        this.onFaceFrameProcessedCallback(new ProcessedFrame(face));
      } catch (e) {
        console.error(e);
      }
    }
  }

  async stopFaceDetection() {
    this.isFaceDetectionStarted = false;
  }

  async captureImage(): Promise<CapturedImage> {
    if (!this.video) {
      throw new Error('Video not initialized');
    }
    const face = await this.detectFace();
    const frame = this.outputCanvas
      ?.getContext('2d')
      ?.getImageData(0, 0, this.video.videoWidth, this.video.videoHeight);

    const inputData = frame?.data;
    return new CapturedImage(face, inputData);
  }

  stop() {
    this.isStoped = true;
    this.video.remove();
    this.debugCanvas.remove();
    this.outputCanvas.remove();
    window.removeEventListener('resize', this.resize);
  }
}
