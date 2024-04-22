export function calculateFaceRotationAngle(nosePosition, leftEdge, rightEdge) {
    // Step 2: Calculate vectors LN and RN
    var vectorLN = {
        x: nosePosition.x - leftEdge.x,
        y: nosePosition.y - leftEdge.y,
    };
    var vectorRN = {
        x: nosePosition.x - rightEdge.x,
        y: nosePosition.y - rightEdge.y,
    };
    // Step 3: Calculate Dot Product
    var dotProduct = vectorLN.x * vectorRN.x + vectorLN.y * vectorRN.y;
    // Step 4: Calculate Magnitudes
    var magnitudeLN = Math.sqrt(Math.pow(vectorLN.x, 2) + Math.pow(vectorLN.y, 2));
    var magnitudeRN = Math.sqrt(Math.pow(vectorRN.x, 2) + Math.pow(vectorRN.y, 2));
    // Step 5: Calculate Angle (in radians)
    var angleInRadians = Math.acos(dotProduct / (magnitudeLN * magnitudeRN));
    // Step 6: Convert to Degrees
    var angleInDegrees = angleInRadians * (180 / Math.PI);
    return angleInDegrees;
}
