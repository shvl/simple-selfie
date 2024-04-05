import * as faceapi from 'face-api.js';
import { SelfieConfig } from './types/SelfieConfig';
import { Frame } from './types/Frame';
import { Face } from './Face';
import { getFaceFrame } from './utils/getFaceFrame';

const roundFrame = (frame: Frame) => ({
  x: Math.round(frame.x),
  y: Math.round(frame.y),
  width: Math.round(frame.width),
  height: Math.round(frame.height),
});

export class Selfie {
  private config: SelfieConfig;
  private faceWidth = 170;
  private allowedFaceDeviation = 45;
  private frame = {
    width: 720,
    height: 560,
  };
  private debug = false;
  private lastFaceFrame: Frame = {} as Frame;
  private onFrameProcessedCallback = (() => {}) as (processedFrame: any) => void;
  private canvas: HTMLCanvasElement | null = null;
  private outputCanvas: HTMLCanvasElement | null = null;
  private video: HTMLVideoElement | null = null;

  constructor(config: SelfieConfig) {
    this.config = config;
    this.debug = config.debug || window.location.search.includes('selfie-debug') || false;
    this.faceWidth = config.faceWidth || this.faceWidth;
    this.allowedFaceDeviation = config.allowedFaceDeviation || this.allowedFaceDeviation;
    this.frame = config.frame || this.frame;
    this.video = config.video;
    this.onFrameProcessedCallback = config.onFrameProcessed || this.onFrameProcessedCallback;
  }

  async start() {
    const { video, videoContainer } = this.config;
    video.style.width = '1px';
    video.style.height = '1px';
    video.style.visibility = 'hidden';
    video.style.position = 'absolute';
    
    this.outputCanvas = document.createElement('canvas');
    this.outputCanvas.width = this.video?.videoWidth || this.frame.width;
    this.outputCanvas.height = this.video?.videoHeight || this.frame.height;
    video.insertAdjacentElement('afterend', this.outputCanvas);

    const updateCanvas = () => {
      const canvas = this.outputCanvas;
      const ctx = this.outputCanvas?.getContext('2d');
      if (!ctx || !canvas) {
        return;
      }
  
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      video.requestVideoFrameCallback(updateCanvas);
    };
    video.requestVideoFrameCallback(updateCanvas);
    
    video.addEventListener('play', async () => {
      this.canvas = faceapi.createCanvasFromMedia(video);
      this.canvas.style.position = 'absolute';

      videoContainer.append(this.canvas);
      const displaySize = { width: video.width, height: video.height };
      faceapi.matchDimensions(this.canvas, displaySize);
    });

    await Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri('./weights'),
      faceapi.nets.faceLandmark68Net.loadFromUri('./weights'),
    ]);

    return navigator.mediaDevices
      .getUserMedia({
        video: {
          width:this.frame.width,
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

  async startProcessingLoop() {
    const { video } = this.config;
    while (true) {
      await new Promise((resolve) => setTimeout(resolve, 100));
      const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks();
      const resizedDetections = faceapi.resizeResults(detections, this.frame);
      if (detections.length > 0) {
        const face = new Face(detections[0].landmarks, this.frame);
        const faceWidth = face.getWidth();

        const deviationFaceWidth = Math.abs(this.faceWidth - faceWidth);
        const deviationFacePosition = face.getFacePosiotion();
        const overlayVisible = deviationFaceWidth > this.allowedFaceDeviation || deviationFacePosition > this.allowedFaceDeviation * 2;

        this.canvas?.getContext('2d')?.clearRect(0, 0, this.canvas.width, this.canvas.height);

        if (this.debug && this.canvas) {
          faceapi.draw.drawFaceLandmarks(this.canvas, resizedDetections);
        }

        this.lastFaceFrame = roundFrame(getFaceFrame(resizedDetections[0]));

        this.onFrameProcessedCallback({
          face,
          faceFrame: this.lastFaceFrame,
          detection: resizedDetections[0],
          overlayVisible,
        });
      }
    }
  }

  captureImage(): Uint8ClampedArray {
    if (!this.video) {
        throw new Error('Video not initialized');
    }
    const frame = this.outputCanvas?.getContext('2d')?.getImageData(
      0,
      0,
      this.video.videoWidth,
      this.video.videoHeight
    );

    const inputData = frame?.data;
    return inputData || new Uint8ClampedArray();
  }
}
