export const setCanvasSize = (canvas: HTMLCanvasElement | undefined, width: number, height: number): void => {
    if (!canvas) {
        return;
    }
    if (canvas.style.width !== `${width}px`) {
        canvas.style.width = `${width}px`;
    }
    if (canvas.width !== width) {
        canvas.width = width;
    }
    if (canvas.style.height !== `${height}px`) {
        canvas.style.height = `${height}px`;
    }
    if (canvas.height !== height) {
        canvas.height = height;
    }
};