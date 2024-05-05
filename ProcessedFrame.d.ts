import { Face } from './Face';
import { ProcessedFrame as IProcessedFrame } from './types/ProcessedFrame';
export declare class ProcessedFrame implements IProcessedFrame {
    private face;
    constructor(face: Face | null);
    getFace(): Face;
    isFaceDetected(): boolean;
}
