import { ProcessedFrame } from './ProcessedFrame';
import { Size } from './Size';

export type SelfieConfig = {
  container: HTMLElement;
  overlay?: HTMLElement;
  frame?: Size;
  debug?: boolean;
  faceDetectionInterval?: number;
  onFaceFrameProcessed?: (frame: ProcessedFrame) => void;
  onFrameProcessed?: (ctx: CanvasRenderingContext2D | null) => void;
};
