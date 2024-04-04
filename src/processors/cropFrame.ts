import { Frame } from '../types/Frame';

function cropFrame(originalFrame: Frame, frame: Frame, data: Uint8ClampedArray): Uint8ClampedArray {
  const result = new Uint8ClampedArray(frame.width * frame.height * 4);

  let { width, height, x, y } = frame;

  for (let iy = 0; iy < height; iy++) {
    for (let ix = 0; ix < width; ix++) {
      const originalIndex = (iy + y) * originalFrame.width + (ix + x);
      const index = iy * width + ix;
      result[index * 4] = data[originalIndex * 4];
      result[index * 4 + 1] = data[originalIndex * 4 + 1];
      result[index * 4 + 2] = data[originalIndex * 4 + 2];
      result[index * 4 + 3] = data[originalIndex * 4 + 3];
    }
  }

  return result;
}

export default cropFrame;
