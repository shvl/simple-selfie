import { FaceDetection, WithFaceLandmarks } from "face-api.js";
import { Frame } from "../types/Frame";

export const getFaceFrame = (resizedDetections: WithFaceLandmarks<{ detection: FaceDetection; }>): Frame => {
    const frame = {
        height: resizedDetections.detection.box.height,
        width: resizedDetections.detection.box.width,
        x: resizedDetections.detection.box.x,
        y: resizedDetections.detection.box.y,
    };

    return frame;
}