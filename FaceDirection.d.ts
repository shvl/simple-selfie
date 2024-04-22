import { FaceLandmarks68 } from 'simple-selfie-face-api';
import { FaceDirection as IFaceDirection } from './types/FaceDirection';
export declare class FaceDirection implements IFaceDirection {
    private distanceLeft;
    private distanceBottom;
    private angleY;
    private angleX;
    private angleZ;
    constructor(landmarks: FaceLandmarks68);
    isLookStraight(): boolean;
    isLookLeft(): boolean;
    isLookRight(): boolean;
    isLookUp(): boolean;
    isLookDown(): boolean;
    getRotation(): {
        x: number;
        y: number;
        z: number;
    };
}
