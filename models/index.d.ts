export const fileToModel: {
    'face_landmark_68_model-shard1': Float32Array;
    'tiny_face_detector_model-shard1': Float32Array;
};
export namespace manifest {
    export { faceLandmark68NetManifest as faceLandmark68Net };
    export { tinyFaceDetectorManifest as tinyFaceDetector };
}
import { faceLandmark68NetManifest } from './manifest';
import { tinyFaceDetectorManifest } from './manifest';
