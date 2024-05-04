import { FaceLandmarks68 } from 'simple-selfie-face-api';
import { FaceDirection } from './FaceDirection';
import { Size, Point, Face as IFace, Frame } from './types';
export declare class Face implements IFace {
    direction: FaceDirection;
    private landmarks;
    private frame;
    private left;
    private right;
    private nose;
    private bottom;
    private betweenEyes;
    private leftBrow;
    private rightBrow;
    private leftEye;
    private rightEye;
    constructor(landmarks: FaceLandmarks68, frame: Size);
    getFacePosiotion(): number;
    getWidth(): number;
    getHeight(): number;
    getEyesFrame(): Frame;
    getLeftEyeFrame(): Frame;
    getRightEyeFrame(): Frame;
    getBetweenEyes(): Point;
}
