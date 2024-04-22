import { Rotation } from "./Rotation";
export interface FaceDirection {
    isLookStraight(): boolean;
    isLookLeft(): boolean;
    isLookRight(): boolean;
    isLookUp(): boolean;
    isLookDown(): boolean;
    getRotation(): Rotation;
}
