import { Frame } from "../types/Frame";
declare function laplacian(frame: Frame, data: Uint8ClampedArray, thickness?: number): Promise<Uint8ClampedArray>;
export default laplacian;
