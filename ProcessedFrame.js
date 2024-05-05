var ProcessedFrame = /** @class */ (function () {
    function ProcessedFrame(face) {
        this.face = null;
        this.face = face;
    }
    ProcessedFrame.prototype.getFace = function () {
        if (!this.face) {
            throw new Error('Face is not detected');
        }
        return this.face;
    };
    ProcessedFrame.prototype.isFaceDetected = function () {
        return !!this.face;
    };
    return ProcessedFrame;
}());
export { ProcessedFrame };
