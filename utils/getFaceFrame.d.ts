import { FaceDetection, WithFaceLandmarks } from "simple-selfie-face-api";
import { Frame } from "../types/Frame";
export declare const getFaceFrame: (resizedDetections: WithFaceLandmarks<{
    detection: FaceDetection;
}>) => Frame;
