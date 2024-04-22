import { Frame } from "../types/Frame";
declare function laplacian(frame: Frame, data: Uint8ClampedArray): Promise<Uint8ClampedArray>;
export default laplacian;
