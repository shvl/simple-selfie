import { getDistance } from './utils/getDistance';
import { FaceDirection } from './FaceDirection';
var Face = /** @class */ (function () {
    function Face(landmarks, frame) {
        // @ts-ignore
        var landmarksPositions = landmarks._positions;
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
        return {
            x: Math.floor(this.leftBrow.x),
            y: Math.floor(Math.min(this.leftBrow.y, this.rightBrow.y)),
            width: Math.ceil(Math.abs(this.leftBrow.x - this.rightBrow.x)),
            height: Math.ceil(fromBrowsToEyes * 2),
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
