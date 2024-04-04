import * as faceapi from 'face-api.js';
import { Frame } from './Frame';
import { Face } from '../Face';

export type ProcessedFrame = {
  face: Face;
  faceFrame: Frame;
  detection: faceapi.WithFaceLandmarks<{ detection: faceapi.FaceDetection }>;
};
