import { ProcessedFrame } from './ProcessedFrame';
import { Size } from './Size';

export type SelfieConfig = {
  video: HTMLVideoElement;
  videoContainer: HTMLElement;
  overlay: HTMLElement;
  faceWidth?: number;
  allowedFaceDeviation?: number;
  frame?: Size;
  debug?: boolean;
  onFrameProcessed?: (parameters: ProcessedFrame) => void;
};
