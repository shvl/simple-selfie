import { getDistance } from './utils/getDistance';
var FaceDirection = /** @class */ (function () {
    function FaceDirection(landmarks) {
        // @ts-ignore
        var landmarksPositions = landmarks._positions;
        var left = landmarksPositions[3];
        var right = landmarksPositions[15];
        var nose = landmarksPositions[33];
        var bottom = landmarksPositions[9];
        var leftBrow = landmarksPositions[17];
        var rightBrow = landmarksPositions[26];
        var top = {
            x: (leftBrow.x + rightBrow.x) / 2,
            y: Math.min(leftBrow.y, rightBrow.y),
        };
        var faceWidth = getDistance(left, right);
        var faceHeight = getDistance(top, bottom);
        this.distanceLeft = getDistance(left, nose) / faceWidth;
        this.distanceBottom = getDistance(bottom, nose) / faceHeight;
        this.angleY = (this.distanceLeft - 0.5) * 180;
        this.angleX = (this.distanceBottom - 0.5) * 180;
        var verticalDistance = leftBrow.y - rightBrow.y;
        this.angleZ = -Math.asin(verticalDistance / faceWidth) * 180 / Math.PI;
    }
    FaceDirection.prototype.isLookStraight = function () {
        return !this.isLookLeft() && !this.isLookRight() && !this.isLookUp() && !this.isLookDown();
    };
    FaceDirection.prototype.isLookLeft = function () {
        return this.angleY > 20;
    };
    FaceDirection.prototype.isLookRight = function () {
        return this.angleY < -20;
    };
    FaceDirection.prototype.isLookUp = function () {
        return this.angleX > 20;
    };
    FaceDirection.prototype.isLookDown = function () {
        return this.angleX < -20;
    };
    FaceDirection.prototype.getRotation = function () {
        return {
            x: this.angleX,
            y: this.angleY,
            z: this.angleZ,
        };
    };
    return FaceDirection;
}());
export { FaceDirection };
