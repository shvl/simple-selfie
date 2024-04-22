import { FaceDirection } from './FaceDirection';
export interface Face {
    direction: FaceDirection;
    getFacePosiotion: () => number;
    getWidth: () => number;
    getHeight: () => number;
}
