import { Point } from "../types/Point";

export function calculateFaceRotationAngle(nosePosition: Point, leftEdge: Point, rightEdge: Point): number {
  // Step 2: Calculate vectors LN and RN
  const vectorLN = {
    x: nosePosition.x - leftEdge.x,
    y: nosePosition.y - leftEdge.y,
  };

  const vectorRN = {
    x: nosePosition.x - rightEdge.x,
    y: nosePosition.y - rightEdge.y,
  };

  // Step 3: Calculate Dot Product
  const dotProduct = vectorLN.x * vectorRN.x + vectorLN.y * vectorRN.y;

  // Step 4: Calculate Magnitudes
  const magnitudeLN = Math.sqrt(vectorLN.x ** 2 + vectorLN.y ** 2);
  const magnitudeRN = Math.sqrt(vectorRN.x ** 2 + vectorRN.y ** 2);

  // Step 5: Calculate Angle (in radians)
  const angleInRadians = Math.acos(dotProduct / (magnitudeLN * magnitudeRN));

  // Step 6: Convert to Degrees
  const angleInDegrees = angleInRadians * (180 / Math.PI);

  return angleInDegrees;
}