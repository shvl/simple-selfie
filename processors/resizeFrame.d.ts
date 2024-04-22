import { Frame } from '../types/Frame';
declare function resizeFrame(originalFrame: Frame, newFrame: Frame, data: Uint8ClampedArray): Promise<Uint8ClampedArray>;
export default resizeFrame;
