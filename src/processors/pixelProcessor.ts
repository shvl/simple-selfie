import { Frame } from '../types/Frame';

async function relu(frame: Frame, data: Uint8ClampedArray, fn: (n: number ) => number) {
  const result = new Uint8ClampedArray(frame.width * frame.height * 4);

  let { width, height } = frame;

  for (let iy = 0; iy < height; iy++) {
    for (let ix = 0; ix < width; ix++) {
      const index = iy * width + ix;
      result[index * 4] = fn(data[index * 4]);
      result[index * 4 + 1] = fn(data[index * 4 + 1]);
      result[index * 4 + 2] = fn(data[index * 4 + 2]);
      result[index * 4 + 3] = data[index * 4 + 3];
    }
  }

  return result;
}

export default relu;
