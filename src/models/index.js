import { tinyFaceDetectorManifest, faceLandmark68NetManifest } from './manifest';
import { tinyFaceDetector } from './tinyFaceDetector';
import { faceLandmark68Net } from './faceLandmark68Net';

export const fileToModel = {
    'face_landmark_68_model-shard1': faceLandmark68Net,
    'tiny_face_detector_model-shard1': tinyFaceDetector
}

export const manifest = {
    faceLandmark68Net: faceLandmark68NetManifest,
    tinyFaceDetector: tinyFaceDetectorManifest
}