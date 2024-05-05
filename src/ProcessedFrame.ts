import { Face } from './Face';
import { ProcessedFrame as IProcessedFrame } from './types/ProcessedFrame';

export class ProcessedFrame implements IProcessedFrame {
    private face: Face | null = null;

    constructor(face: Face | null) {
        this.face = face;
    }

    getFace(): Face {
        if (!this.face) {
            throw new Error('Face is not detected');
        }
        return this.face;
    }

    isFaceDetected(): boolean {
        return !!this.face;
    }
}