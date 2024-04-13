import { ProcessedFrame } from './ProcessedFrame';
import { Size } from './Size';

export type SelfieConfig = {
  container: HTMLElement;
  overlay?: HTMLElement;
  frame?: Size;
  debug?: boolean;
  weightsPath?: string;
  onFaceFrameProcessed?: (frame: ProcessedFrame) => void;
  onFrameProcessed?: (frameData: Uint8ClampedArray) => Uint8ClampedArray;
};
