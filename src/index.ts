import * as faceapi from 'face-api.js';
import { FaceDirection } from './FaceDirection';
import { Face } from './Face';
import { Frame } from './types/Frame';
import { getFaceFrame } from './utils/getFaceFrame';

type ProcessedFrame = {
  face: Face;
  faceFrame: Frame;
  detection: faceapi.WithFaceLandmarks<{ detection: faceapi.FaceDetection }>;
};

type SelfieConfig = {
  video: HTMLVideoElement;
  videoContainer: HTMLElement;
  overlay: HTMLElement;
  debug?: boolean;
  onFrameProcessed?: (parameters: ProcessedFrame) => void;
};

const FRAME = {
  width: 720,
  height: 560,
};

const FACE_WIDTH = 170;
const ALLOWED_FACE_DEVIATION = 45;

export async function selfieLoad(config: SelfieConfig): Promise<void> {
  const onFrameProcessedCallback = config.onFrameProcessed || (() => {});
  const { video, videoContainer, overlay } = config;
  video.addEventListener('play', async () => {
    const canvas = faceapi.createCanvasFromMedia(video);

    videoContainer.append(canvas);
    canvas.classList.add('face-detection-canvas');
    const displaySize = { width: video.width, height: video.height };
    faceapi.matchDimensions(canvas, displaySize);

    let lastFaceFrame: Frame = {} as Frame;

    setInterval(async () => {
      const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks();
      const resizedDetections = faceapi.resizeResults(detections, displaySize);
      if (detections.length > 0) {
        const face = new Face(detections[0].landmarks, FRAME);
        const faceWidth = face.getWidth();

        const deviationFaceWidth = Math.abs(FACE_WIDTH - faceWidth);
        const deviationFacePosition = face.getFacePosiotion();

        if (deviationFaceWidth > ALLOWED_FACE_DEVIATION || deviationFacePosition > ALLOWED_FACE_DEVIATION * 2) {
          overlay.classList.add('overlay__visible');
        } else {
          overlay.classList.remove('overlay__visible');
        }

        canvas.getContext('2d')?.clearRect(0, 0, canvas.width, canvas.height);

        if (config.debug || window.location.search.includes('selfie-debug-show-landmarks')) {
          faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
        }

        lastFaceFrame = getFaceFrame(resizedDetections[0]);

        onFrameProcessedCallback({
          face,
          faceFrame: lastFaceFrame,
          detection: resizedDetections[0],
        });
      }
    }, 100);
  });

  await Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('./weights'),
    faceapi.nets.faceLandmark68Net.loadFromUri('./weights'),
  ]);

  navigator.mediaDevices
    .getUserMedia({
      video: {},
    })
    .then((stream) => {
      video.srcObject = stream;
    })
    .catch((err) => {
      console.error('Error accessing the camera', err);
    });
}

if (window) {
  // @ts-ignore
  window.selfieLoad = selfieLoad;
}
