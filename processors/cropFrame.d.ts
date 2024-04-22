import { Frame } from '../types/Frame';
declare function cropFrame(originalFrame: Frame, frame: Frame, data: Uint8ClampedArray): Promise<Uint8ClampedArray>;
export default cropFrame;
