import * as faceapi from 'simple-selfie-face-api';
import { Frame } from './Frame';
import { Face } from '../Face';

export type ProcessedFrame = {
  face: Face;
  faceFrame: Frame;
  detection: faceapi.WithFaceLandmarks<{ detection: faceapi.FaceDetection }>;
};
