import { FaceDirection } from './FaceDirection';
import { Frame, Point } from './';
export interface Face {
    direction: FaceDirection;
    getFacePosiotion: () => number;
    getWidth: () => number;
    getHeight: () => number;
    getEyesFrame: () => Frame;
    getLeftEyeFrame: () => Frame;
    getRightEyeFrame: () => Frame;
    getBetweenEyes: () => Point;
}
