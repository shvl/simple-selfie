import { getDistance } from './utils/getDistance';
import { FaceDirection } from './FaceDirection';
var Face = /** @class */ (function () {
    function Face(landmarks, frame) {
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
    Face.prototype.getFacePosiotion = function () {
        return Math.sqrt(Math.pow(this.frame.width / 2 - this.nose.x, 2) + Math.pow(this.frame.height / 2 - this.nose.y, 2));
    };
    Face.prototype.getWidth = function () {
        return getDistance(this.left, this.right);
    };
    Face.prototype.getHeight = function () {
        return getDistance(this.betweenEyes, this.bottom);
    };
    Face.prototype.getEyesFrame = function () {
        var fromBrowsToEyes = Math.max(Math.abs(this.leftBrow.y - this.leftEye.y), Math.abs(this.rightBrow.y - this.rightEye.y));
        var x1 = Math.floor(this.leftEye.x - Math.abs(this.leftBrow.x - this.leftEye.x) / 2);
        var x2 = Math.ceil(this.rightEye.x + Math.abs(this.rightBrow.x - this.rightEye.x) / 2);
        return {
            x: x1,
            y: Math.floor(Math.min(this.leftBrow.y, this.rightBrow.y) + fromBrowsToEyes / 2),
            width: Math.ceil(Math.abs(x1 - x2)),
            height: Math.ceil(Math.abs(this.leftBrow.y - this.rightBrow.y) + fromBrowsToEyes),
        };
    };
    Face.prototype.getLeftEyeFrame = function () {
        var left = this.landmarks[36];
        var right = this.landmarks[39];
        var leftTop = this.landmarks[37];
        var leftBottom = this.landmarks[41];
        var marginX = Math.abs(left.x - leftTop.x) / 2;
        var marginY = Math.abs(leftTop.y - leftBottom.y) / 2;
        return {
            x: Math.round(left.x - marginX),
            y: Math.round(leftTop.y - marginY),
            width: Math.round(Math.abs(right.x - left.x) + marginX * 2),
            height: Math.round(Math.abs(leftBottom.y - leftTop.y) + marginY * 2),
        };
    };
    Face.prototype.getRightEyeFrame = function () {
        var left = this.landmarks[42];
        var right = this.landmarks[45];
        var rightTop = this.landmarks[43];
        var rightBottom = this.landmarks[47];
        var marginX = Math.abs(right.x - rightTop.x) / 2;
        var marginY = Math.abs(rightTop.y - rightBottom.y) / 2;
        return {
            x: Math.round(left.x - marginX),
            y: Math.round(rightTop.y - marginY),
            width: Math.round(Math.abs(right.x - left.x) + marginX * 2),
            height: Math.round(Math.abs(rightBottom.y - rightTop.y) + marginY * 2),
        };
    };
    Face.prototype.getBetweenEyes = function () {
        return {
            x: Math.round(this.betweenEyes.x),
            y: Math.round(this.betweenEyes.y),
        };
    };
    return Face;
}());
export { Face };
