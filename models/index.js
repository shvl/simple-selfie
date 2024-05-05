import { tinyFaceDetectorManifest, faceLandmark68NetManifest } from './manifest';
import { tinyFaceDetector } from './tinyFaceDetector';
import { faceLandmark68Net } from './faceLandmark68Net';
var hexToFloat32 = function (hex) {
    var result = [];
    for (var i = 0; i < hex.length; i += 2) {
        var num = parseInt(hex.substring(i, i + 2), 16);
        result.push(num);
    }
    return new Float32Array(result);
};
export var fileToModel = {
    'face_landmark_68_model-shard1': hexToFloat32(faceLandmark68Net),
    'tiny_face_detector_model-shard1': hexToFloat32(tinyFaceDetector)
};
export var manifest = {
    faceLandmark68Net: faceLandmark68NetManifest,
    tinyFaceDetector: tinyFaceDetectorManifest
};
