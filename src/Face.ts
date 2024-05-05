import { FaceLandmarks68 } from 'simple-selfie-face-api';
import { getDistance } from './utils/getDistance';
import { FaceDirection } from './FaceDirection';
import { Size, Point, Face as IFace, Frame } from './types';

export class Face implements IFace {
  direction: FaceDirection;
  private landmarks: Point[];
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
    this.landmarks = landmarks._positions;
    this.left = this.landmarks[3];
    this.right = this.landmarks[15];
    this.nose = this.landmarks[33];
    this.bottom = this.landmarks[9];
    this.betweenEyes = this.landmarks[27];
    this.leftBrow = this.landmarks[17];
    this.rightBrow = this.landmarks[26];
    this.leftEye = this.landmarks[36];
    this.rightEye = this.landmarks[45];
    this.direction = new FaceDirection(landmarks);
    this.frame = frame;
  }

  getFacePosiotion() {
    return Math.sqrt(
      Math.pow(this.frame.width / 2 - this.nose.x, 2) + Math.pow(this.frame.height / 2 - this.nose.y, 2)
    );
  }

  getWidth(): number {
    return getDistance(this.left, this.right);
  }

  getHeight(): number {
    return getDistance(this.betweenEyes, this.bottom);
  }

  getEyesFrame(): Frame {
    const fromBrowsToEyes = Math.max(
      Math.abs(this.leftBrow.y - this.leftEye.y),
      Math.abs(this.rightBrow.y - this.rightEye.y)
    );

    const x1 = Math.floor(this.leftEye.x - Math.abs(this.leftBrow.x - this.leftEye.x) / 2);
    const x2 = Math.ceil(this.rightEye.x + Math.abs(this.rightBrow.x - this.rightEye.x) / 2);

    return {
      x: x1,
      y: Math.floor(Math.min(this.leftBrow.y, this.rightBrow.y) + fromBrowsToEyes / 2),
      width: Math.ceil(Math.abs(x1 - x2)),
      height: Math.ceil( Math.abs(this.leftBrow.y - this.rightBrow.y) + fromBrowsToEyes),
    };
  }

  getLeftEyeFrame(): Frame {
    const left = this.landmarks[36];
    const right = this.landmarks[39];
    const leftTop = this.landmarks[37];
    const leftBottom = this.landmarks[41];

    const marginX = Math.abs(left.x - leftTop.x) / 2;
    const marginY = Math.abs(leftTop.y - leftBottom.y) / 2;

    return {
      x: Math.round(left.x - marginX),
      y: Math.round(leftTop.y - marginY),
      width: Math.round(Math.abs(right.x - left.x) + marginX * 2),
      height: Math.round(Math.abs(leftBottom.y - leftTop.y) + marginY * 2),
    };
  }

  getRightEyeFrame(): Frame {
    const left = this.landmarks[42];
    const right = this.landmarks[45];
    const rightTop = this.landmarks[43];
    const rightBottom = this.landmarks[47];

    const marginX = Math.abs(right.x - rightTop.x) / 2;
    const marginY = Math.abs(rightTop.y - rightBottom.y) / 2;

    return {
      x: Math.round(left.x - marginX),
      y: Math.round(rightTop.y - marginY),
      width: Math.round(Math.abs(right.x - left.x) + marginX * 2),
      height: Math.round(Math.abs(rightBottom.y - rightTop.y) + marginY * 2),
    };
  } 

  getBetweenEyes(): Point {
    return {
      x: Math.round(this.betweenEyes.x),
      y: Math.round(this.betweenEyes.y),
    };
  }
}
