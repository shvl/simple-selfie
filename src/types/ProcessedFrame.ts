import { Face } from '../Face';

export interface ProcessedFrame {
  getFace: () => Face;
  isFaceDetected: () => boolean;
};
