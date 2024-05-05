import { Face } from './Face';
import { ProcessedFrame } from './ProcessedFrame';
import { CapturedImage as ICapturedImage } from './types/CapturedImage';
export declare class CapturedImage extends ProcessedFrame implements ICapturedImage {
    private data;
    constructor(face: Face | null, data: Uint8ClampedArray | undefined);
    getImageData(): Uint8ClampedArray;
}
