import { Face } from './Face';
import { ProcessedFrame } from './ProcessedFrame';
import { CapturedImage as ICapturedImage } from './types/CapturedImage';

export class CapturedImage extends ProcessedFrame implements ICapturedImage {
    private data: Uint8ClampedArray;

    constructor(face: Face | null, data: Uint8ClampedArray | undefined) {
        super(face);
        this.data = data || new Uint8ClampedArray();
    }

    getImageData(): Uint8ClampedArray {
        return this.data;
    }
}