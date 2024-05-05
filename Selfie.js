var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import * as faceapi from 'simple-selfie-face-api';
import { Face } from './Face';
import * as models from './models';
import { setCanvasSize } from './utils/setCanvasSize';
import { ProcessedFrame } from './ProcessedFrame';
import { CapturedImage } from './CapturedImage';
var Selfie = /** @class */ (function () {
    function Selfie(config) {
        this.frame = {
            width: 720,
            height: 560,
        };
        this.debug = false;
        this.onFaceFrameProcessedCallback = function () { };
        this.onFrameProcessedCallback = function () {
            return null;
        };
        this.onLoaded = function () { };
        this.isPlayStarted = false;
        this.isStoped = false;
        this.isFaceDetectionStarted = false;
        this.faceDetectionInterval = 100;
        this.lastface = null;
        this.debug = config.debug || false;
        this.frame = config.frame || this.frame;
        this.container = config.container;
        this.video = document.createElement('video');
        this.video.setAttribute('autoplay', '');
        this.video.setAttribute('muted', '');
        this.video.setAttribute('playsinline', '');
        this.container.append(this.video);
        this.outputCanvas = document.createElement('canvas');
        this.container.append(this.outputCanvas);
        this.debugCanvas = document.createElement('canvas');
        this.container = config.container;
        this.faceDetectionInterval = config.faceDetectionInterval || this.faceDetectionInterval;
        this.onFaceFrameProcessedCallback = config.onFaceFrameProcessed || this.onFaceFrameProcessedCallback;
        this.onFrameProcessedCallback = config.onFrameProcessed || this.onFrameProcessedCallback;
        this.onLoaded = config.onLoaded || this.onLoaded;
        this.resize = this.resize.bind(this);
        this.play = this.play.bind(this);
    }
    Selfie.prototype.updateCanvas = function () {
        var _this = this;
        var _a;
        var outCtx = (_a = this.outputCanvas) === null || _a === void 0 ? void 0 : _a.getContext('2d');
        var updateCanvas = function () {
            var _a = _this.outputCanvas, width = _a.width, height = _a.height;
            outCtx === null || outCtx === void 0 ? void 0 : outCtx.drawImage(_this.video, 0, 0, width, height);
            _this.onFrameProcessedCallback(outCtx, _this.lastface);
            var frameData = outCtx === null || outCtx === void 0 ? void 0 : outCtx.getImageData(0, 0, width, height);
            if (frameData) {
                outCtx === null || outCtx === void 0 ? void 0 : outCtx.putImageData(new ImageData(frameData.data, width, height), 0, 0);
            }
            _this.video.requestVideoFrameCallback(updateCanvas);
        };
        this.video.requestVideoFrameCallback(updateCanvas);
    };
    Selfie.prototype.resize = function () {
        var _a, _b;
        var videoWidth = this.video.videoWidth || 0;
        var videoHeight = ((_a = this.video) === null || _a === void 0 ? void 0 : _a.videoHeight) || 0;
        var scaleFactor = Math.min(this.container.offsetWidth || 0, this.container.offsetHeight || 0) /
            Math.min(videoWidth || 0, ((_b = this.video) === null || _b === void 0 ? void 0 : _b.videoHeight) || 0);
        var newWidth = Math.round(videoWidth * scaleFactor);
        var newHeight = Math.round(videoHeight * scaleFactor);
        this.outputCanvas.width = videoWidth;
        this.outputCanvas.height = videoHeight;
        setCanvasSize(this.outputCanvas, newWidth, newHeight);
        setCanvasSize(this.debugCanvas, newWidth, newHeight);
        var displaySize = { width: videoWidth, height: videoHeight };
        faceapi.matchDimensions(this.debugCanvas, displaySize);
    };
    Selfie.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            var video;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        video = this.video;
                        video.style.width = "".concat(this.frame.width, "px");
                        video.style.height = "".concat(this.frame.height, "px");
                        video.style.position = 'absolute';
                        window.addEventListener('resize', this.resize);
                        video.addEventListener('play', this.play);
                        return [4 /*yield*/, Promise.all([
                                faceapi.nets.tinyFaceDetector.loadFromBuffer(models.manifest.tinyFaceDetector, models.fileToModel),
                                faceapi.nets.faceLandmark68Net.loadFromBuffer(models.manifest.faceLandmark68Net, models.fileToModel),
                            ])];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, navigator.mediaDevices
                                .getUserMedia({
                                video: {
                                    width: this.frame.width,
                                    height: this.frame.height,
                                    facingMode: 'user',
                                },
                            })
                                .then(function (stream) {
                                video.srcObject = stream;
                            })
                                .catch(function (err) {
                                console.error('Error accessing the camera', err);
                                throw err;
                            })];
                }
            });
        });
    };
    Selfie.prototype.play = function () {
        if (this.isStoped) {
            return;
        }
        this.debugCanvas.remove();
        this.debugCanvas = faceapi.createCanvasFromMedia(this.video);
        this.debugCanvas.style.position = 'absolute';
        this.video.style.opacity = '0';
        this.container.append(this.debugCanvas);
        this.resize();
        this.updateCanvas();
        this.isPlayStarted = true;
        this.onLoaded();
    };
    Selfie.prototype.detectFace = function () {
        return __awaiter(this, void 0, void 0, function () {
            var detections, frame, resizedDetections, face;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, faceapi
                            .detectAllFaces(this.video, new faceapi.TinyFaceDetectorOptions())
                            .withFaceLandmarks()];
                    case 1:
                        detections = _b.sent();
                        frame = {
                            width: this.video.videoWidth,
                            height: this.video.videoHeight,
                        };
                        resizedDetections = faceapi.resizeResults(detections, frame);
                        if (detections.length > 0) {
                            face = new Face(resizedDetections[0].landmarks, frame);
                            (_a = this.debugCanvas.getContext('2d')) === null || _a === void 0 ? void 0 : _a.clearRect(0, 0, this.debugCanvas.width, this.debugCanvas.height);
                            if (this.debug && this.debugCanvas) {
                                faceapi.draw.drawFaceLandmarks(this.debugCanvas, resizedDetections);
                            }
                            this.lastface = face;
                            return [2 /*return*/, face];
                        }
                        return [2 /*return*/, null];
                }
            });
        });
    };
    Selfie.prototype.startFaceDetection = function () {
        return __awaiter(this, void 0, void 0, function () {
            var face, e_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.isFaceDetectionStarted = true;
                        _a.label = 1;
                    case 1:
                        if (!!this.isPlayStarted) return [3 /*break*/, 3];
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 100); })];
                    case 2:
                        _a.sent();
                        if (this.isStoped || !this.isFaceDetectionStarted) {
                            return [2 /*return*/];
                        }
                        return [3 /*break*/, 1];
                    case 3:
                        if (!true) return [3 /*break*/, 9];
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, _this.faceDetectionInterval); })];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5:
                        _a.trys.push([5, 7, , 8]);
                        if (this.isStoped || !this.isFaceDetectionStarted) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.detectFace()];
                    case 6:
                        face = _a.sent();
                        if (!face) {
                            return [3 /*break*/, 3];
                        }
                        this.onFaceFrameProcessedCallback(new ProcessedFrame(face));
                        return [3 /*break*/, 8];
                    case 7:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 8];
                    case 8: return [3 /*break*/, 3];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    Selfie.prototype.stopFaceDetection = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.isFaceDetectionStarted = false;
                return [2 /*return*/];
            });
        });
    };
    Selfie.prototype.captureImage = function () {
        return __awaiter(this, void 0, void 0, function () {
            var face, frame, inputData;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!this.video) {
                            throw new Error('Video not initialized');
                        }
                        return [4 /*yield*/, this.detectFace()];
                    case 1:
                        face = _c.sent();
                        frame = (_b = (_a = this.outputCanvas) === null || _a === void 0 ? void 0 : _a.getContext('2d')) === null || _b === void 0 ? void 0 : _b.getImageData(0, 0, this.video.videoWidth, this.video.videoHeight);
                        inputData = frame === null || frame === void 0 ? void 0 : frame.data;
                        return [2 /*return*/, new CapturedImage(face, inputData)];
                }
            });
        });
    };
    Selfie.prototype.stop = function () {
        this.isStoped = true;
        this.video.remove();
        this.debugCanvas.remove();
        this.outputCanvas.remove();
        window.removeEventListener('resize', this.resize);
    };
    return Selfie;
}());
export { Selfie };
