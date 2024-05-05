import { Frame } from "../types/Frame";

const KERNEL = [0, 1, 0, 1, -4, 1, 0, 1, 0];

async function laplacian(frame: Frame, data: Uint8ClampedArray, thickness = 2): Promise<Uint8ClampedArray> {
  return new Promise((resolve) => {
    const newData = new Uint8ClampedArray(data.length);
    let { width, height } = frame;
    width = Math.floor(width);
    height = Math.floor(height);

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const i = y * width * 4 + x * 4;
        newData[i] = 0;
        newData[i + 1] = 0;
        newData[i + 2] = 0;
        newData[i + 3] = 255;
      }
    }

    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        let sum = 0;
        let index = y * width * 4 + x * 4;

        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            const kernelIndex = (i + 1) * 3 + (j + 1);
            const pixelIndex = index + (i * width + j) * 4;

            sum += data[pixelIndex] * KERNEL[kernelIndex] * thickness;
          }
        }

        sum = sum * 3;

        newData[index] = sum;
        newData[index + 1] = sum;
        newData[index + 2] = sum;
        newData[index + 3] = 255;
      }
    }

    resolve(newData);
  });
}


export default laplacian;