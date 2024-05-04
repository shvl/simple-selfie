import { Frame } from '../types';
export declare function suppressNoise(frame: Frame, data: Uint8ClampedArray, minArea?: number, threshold?: number): Promise<Uint8ClampedArray>;
export default suppressNoise;
