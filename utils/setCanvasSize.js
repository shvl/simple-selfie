export var setCanvasSize = function (canvas, width, height) {
    if (!canvas) {
        return;
    }
    if (canvas.style.width !== "".concat(width, "px")) {
        canvas.style.width = "".concat(width, "px");
    }
    if (canvas.style.height !== "".concat(height, "px")) {
        canvas.style.height = "".concat(height, "px");
    }
};
