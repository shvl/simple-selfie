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
import { getFaceFrame } from './utils/getFaceFrame';
import * as models from './models';
import { setCanvasSize } from './utils/setCanvasSize';
var roundFrame = function (frame) { return ({
    x: Math.round(frame.x),
    y: Math.round(frame.y),
    width: Math.round(frame.width),
    height: Math.round(frame.height),
}); };
var Selfie = /** @class */ (function () {
    function Selfie(config) {
        this.frame = {
            width: 720,
            height: 560,
        };
        this.debug = false;
        this.lastFaceFrame = {};
        this.onFaceFrameProcessedCallback = function () { };
        this.onFrameProcessedCallback = function () { return null; };
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
        this.processingCanvas = document.createElement('canvas');
        this.container.append(this.outputCanvas);
        this.debugCanvas = document.createElement('canvas');
        this.container = config.container;
        this.faceDetectionInterval = config.faceDetectionInterval || this.faceDetectionInterval;
        this.onFaceFrameProcessedCallback = config.onFaceFrameProcessed || this.onFaceFrameProcessedCallback;
        this.onFrameProcessedCallback = config.onFrameProcessed || this.onFrameProcessedCallback;
        this.resize = this.resize.bind(this);
        this.play = this.play.bind(this);
    }
    Selfie.prototype.updateCanvas = function () {
        var _this = this;
        var _a, _b;
        var outCtx = (_a = this.outputCanvas) === null || _a === void 0 ? void 0 : _a.getContext('2d');
        var processingCtx = (_b = this.processingCanvas) === null || _b === void 0 ? void 0 : _b.getContext('2d');
        var updateCanvas = function () {
            var _a = _this.outputCanvas, width = _a.width, height = _a.height;
            processingCtx === null || processingCtx === void 0 ? void 0 : processingCtx.drawImage(_this.video, 0, 0, width, height);
            _this.onFrameProcessedCallback(processingCtx, _this.lastface);
            var frameData = processingCtx === null || processingCtx === void 0 ? void 0 : processingCtx.getImageData(0, 0, width, height);
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
        setCanvasSize(this.outputCanvas, newWidth, newHeight);
        setCanvasSize(this.processingCanvas, newWidth, newHeight);
        setCanvasSize(this.debugCanvas, newWidth, newHeight);
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
        var displaySize = { width: this.video.width, height: this.video.height };
        faceapi.matchDimensions(this.debugCanvas, displaySize);
        this.resize();
        this.updateCanvas();
        this.isPlayStarted = true;
    };
    Selfie.prototype.startFaceDetection = function () {
        return __awaiter(this, void 0, void 0, function () {
            var video, detections, frame, resizedDetections, face, e_1;
            var _this = this;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        video = this.video;
                        this.isFaceDetectionStarted = true;
                        _b.label = 1;
                    case 1:
                        if (!!this.isPlayStarted) return [3 /*break*/, 3];
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 100); })];
                    case 2:
                        _b.sent();
                        if (this.isStoped || !this.isFaceDetectionStarted) {
                            return [2 /*return*/];
                        }
                        return [3 /*break*/, 1];
                    case 3:
                        if (!true) return [3 /*break*/, 9];
                        return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, _this.faceDetectionInterval); })];
                    case 4:
                        _b.sent();
                        _b.label = 5;
                    case 5:
                        _b.trys.push([5, 7, , 8]);
                        if (this.isStoped || !this.isFaceDetectionStarted) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, faceapi
                                .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
                                .withFaceLandmarks()];
                    case 6:
                        detections = _b.sent();
                        frame = {
                            width: video.videoWidth,
                            height: video.videoHeight,
                        };
                        resizedDetections = faceapi.resizeResults(detections, frame);
                        if (detections.length > 0) {
                            face = new Face(detections[0].landmarks, frame);
                            (_a = this.debugCanvas.getContext('2d')) === null || _a === void 0 ? void 0 : _a.clearRect(0, 0, this.debugCanvas.width, this.debugCanvas.height);
                            if (this.debug && this.debugCanvas) {
                                faceapi.draw.drawFaceLandmarks(this.debugCanvas, resizedDetections);
                            }
                            this.lastFaceFrame = roundFrame(getFaceFrame(resizedDetections[0]));
                            this.lastface = face;
                            this.onFaceFrameProcessedCallback({
                                face: face,
                                faceFrame: this.lastFaceFrame,
                                detection: resizedDetections[0],
                            });
                        }
                        return [3 /*break*/, 8];
                    case 7:
                        e_1 = _b.sent();
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
        var _a, _b;
        if (!this.video) {
            throw new Error('Video not initialized');
        }
        var frame = (_b = (_a = this.outputCanvas) === null || _a === void 0 ? void 0 : _a.getContext('2d')) === null || _b === void 0 ? void 0 : _b.getImageData(0, 0, this.video.videoWidth, this.video.videoHeight);
        var inputData = frame === null || frame === void 0 ? void 0 : frame.data;
        return inputData || new Uint8ClampedArray();
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
