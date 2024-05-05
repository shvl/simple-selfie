import { Frame } from '../types/Frame';
declare function relu(frame: Frame, data: Uint8ClampedArray, fn: (n: number) => number): Promise<Uint8ClampedArray>;
export default relu;
