import { ProcessedFrame } from './ProcessedFrame';
import { Size } from './Size';

export type SelfieConfig = {
  container: HTMLElement;
  overlay?: HTMLElement;
  frame?: Size;
  debug?: boolean;
  onFrameProcessed?: (parameters: ProcessedFrame) => void;
};
