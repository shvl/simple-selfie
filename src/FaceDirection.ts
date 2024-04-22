import { FaceLandmarks68 } from 'simple-selfie-face-api';
import { getDistance } from './utils/getDistance';
import { FaceDirection as IFaceDirection } from './types/FaceDirection';

export class FaceDirection implements IFaceDirection {
  private distanceLeft: number;
  private distanceBottom: number;
  private angleY: number;
  private angleX: number;
  private angleZ: number;

  constructor(landmarks: FaceLandmarks68) {
    // @ts-ignore
    const landmarksPositions = landmarks._positions;
    const left = landmarksPositions[3];
    const right = landmarksPositions[15];
    const nose = landmarksPositions[33];
    const bottom = landmarksPositions[9];
    const leftBrow = landmarksPositions[17];
    const rightBrow = landmarksPositions[26];

    const top = {
      x: (leftBrow.x + rightBrow.x) / 2,
      y: Math.min(leftBrow.y, rightBrow.y),
    };

    const faceWidth = getDistance(left, right);
    const faceHeight = getDistance(top, bottom);
    this.distanceLeft = getDistance(left, nose) / faceWidth;
    this.distanceBottom = getDistance(bottom, nose) / faceHeight;
    this.angleY = (this.distanceLeft - 0.5) * 180;
    this.angleX = (this.distanceBottom - 0.5) * 180;
    const verticalDistance = leftBrow.y - rightBrow.y;
    this.angleZ = - Math.asin(verticalDistance / faceWidth) * 180 / Math.PI;
  }

  isLookStraight(): boolean {
    return !this.isLookLeft() && !this.isLookRight() && !this.isLookUp() && !this.isLookDown();
  }

  isLookLeft(): boolean {
    return this.angleY > 20;
  }

  isLookRight(): boolean {
    return this.angleY < -20;
  }

  isLookUp(): boolean {
    return this.angleX > 20;
  }

  isLookDown(): boolean {
    return this.angleX < -20;
  }

  getRotation() {
    return {
      x: this.angleX,
      y: this.angleY,
      z: this.angleZ,
    };
  }
}
