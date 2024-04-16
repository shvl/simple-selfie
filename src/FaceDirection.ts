import { FaceLandmarks68 } from 'simple-selfie-face-api';
import { getDistance } from './utils/getDistance';
import { FaceDirection as IFaceDirection } from './types/FaceDirection';

export class FaceDirection implements IFaceDirection {
  private distanceLeft: number;
  private distanceTop: number;

  constructor(landmarks: FaceLandmarks68) {
    // @ts-ignore
    const landmarksPositions = landmarks._positions;
    const left = landmarksPositions[3];
    const right = landmarksPositions[15];
    const nose = landmarksPositions[33];
    const bottom = landmarksPositions[9];
    const betweenEyes = landmarksPositions[28];
    const faceWidth = getDistance(left, right);
    const faceHeight = getDistance(betweenEyes, bottom);
    this.distanceLeft = getDistance(left, nose) / faceWidth;
    this.distanceTop = getDistance(betweenEyes, nose) / faceHeight;
  }

  isLookStraight() {
    return this.distanceLeft > 0.4 && this.distanceLeft < 0.7 && this.distanceTop > 0.32 && this.distanceTop < 0.4;
  }

  isLookLeft() {
    return this.distanceLeft > 0.7;
  }

  isLookRight() {
    return this.distanceLeft < 0.4;
  }

  isLookUp() {
    return this.distanceTop < 0.32;
  }

  isLookDown() {
    return this.distanceTop > 0.4;
  }
}
