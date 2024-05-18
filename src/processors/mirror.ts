import { Frame } from '../types/Frame';

async function mirror(frame: Frame, data: Uint8ClampedArray): Promise<Uint8ClampedArray> {
  const result = new Uint8ClampedArray(frame.width * frame.height * 4);

  let { width, height, x, y } = frame;

  for (let iy = 0; iy < height; iy++) {
    for (let ix = 0; ix < width; ix++) {
      const originalIndex = (iy * width + ix) * 4;
      const mirroredIndex = ((iy + y) * width + (width - ix - 1) + x) * 4;

      result[mirroredIndex] = data[originalIndex];
      result[mirroredIndex + 1] = data[originalIndex + 1];
      result[mirroredIndex + 2] = data[originalIndex + 2];
      result[mirroredIndex + 3] = data[originalIndex + 3];
    }
  }

  return result;
}

export default mirror;
