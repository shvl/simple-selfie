import { FaceLandmarks68 } from 'simple-selfie-face-api';
import { getDistance } from './utils/getDistance';
import { FaceDirection } from './FaceDirection';
import { Size, Point, Face as IFace } from './types';

export class Face implements IFace {
  direction: FaceDirection;
  private frame: Size;
  private left: Point;
  private right: Point;
  private nose: Point;
  private bottom: Point;
  private betweenEyes: Point;
  private leftBrow: Point;
  private rightBrow: Point;
  private leftEye: Point;
  private rightEye: Point;
  

  constructor(landmarks: FaceLandmarks68, frame: Size) {
    // @ts-ignore
    const landmarksPositions = landmarks._positions;
    this.left = landmarksPositions[3];
    this.right = landmarksPositions[15];
    this.nose = landmarksPositions[33];
    this.bottom = landmarksPositions[9];
    this.betweenEyes = landmarksPositions[27];
    this.leftBrow = landmarksPositions[17];
    this.rightBrow = landmarksPositions[26];
    this.leftEye = landmarksPositions[36];
    this.rightEye = landmarksPositions[45];
    this.direction = new FaceDirection(landmarks);
    this.frame = frame;
  }

  getFacePosiotion() {
    return Math.sqrt(
      Math.pow(this.frame.width / 2 - this.nose.x, 2) + Math.pow(this.frame.height / 2 - this.nose.y, 2)
    );
  }

  getWidth() {
    return getDistance(this.left, this.right);
  }

  getHeight() {
    return getDistance(this.betweenEyes, this.bottom);
  }

  getEyesFrame() {
    const fromBrowsToEyes = Math.max(
      Math.abs(this.leftBrow.y - this.leftEye.y),
      Math.abs(this.rightBrow.y - this.rightEye.y)
    )
    return {
      x: Math.floor(this.leftBrow.x),
      y: Math.floor(Math.min(this.leftBrow.y, this.rightBrow.y)),
      width: Math.ceil(Math.abs(this.leftBrow.x - this.rightBrow.x)),
      height: Math.ceil(fromBrowsToEyes * 2),
    };
  }

  getBetweenEyes(): Point {
    return {
      x: Math.round(this.betweenEyes.x),
      y: Math.round(this.betweenEyes.y),
    };
  }
}
