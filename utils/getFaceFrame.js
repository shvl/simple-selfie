export var getFaceFrame = function (resizedDetections) {
    var frame = {
        height: resizedDetections.detection.box.height,
        width: resizedDetections.detection.box.width,
        x: resizedDetections.detection.box.x,
        y: resizedDetections.detection.box.y,
    };
    return frame;
};
