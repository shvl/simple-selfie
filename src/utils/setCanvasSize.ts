export const setCanvasSize = (canvas: HTMLCanvasElement | undefined, width: number, height: number): void => {
    if (!canvas) {
        return;
    }
    if (canvas.style.width !== `${width}px`) {
        canvas.style.width = `${width}px`;
    }
    if (canvas.style.height !== `${height}px`) {
        canvas.style.height = `${height}px`;
    }
};