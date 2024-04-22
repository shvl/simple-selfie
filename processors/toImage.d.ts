import { Frame } from '../types/Frame';
declare function toImage(frame: Frame, data: Uint8ClampedArray): Promise<string>;
export default toImage;
