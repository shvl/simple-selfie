import { Frame } from '../types/Frame';


async function resizeFrame(originalFrame: Frame, newFrame: Frame, data: Uint8ClampedArray): Promise<Uint8ClampedArray> {
  const newData = new Uint8ClampedArray(newFrame.width * newFrame.height * 4);

  const scaleX = originalFrame.width / newFrame.width;
  const scaleY = originalFrame.height / newFrame.height;

  for (let y = 0; y < newFrame.height; y++) {
      for (let x = 0; x < newFrame.width; x++) {
          const srcX = x * scaleX;
          const srcY = y * scaleY;

          const x1 = Math.floor(srcX);
          const x2 = Math.min(Math.ceil(srcX), originalFrame.width - 1);
          const y1 = Math.floor(srcY);
          const y2 = Math.min(Math.ceil(srcY), originalFrame.height - 1);

          const t = srcX - x1;
          const u = srcY - y1;

          const index1 = (y1 * originalFrame.width + x1) * 4;
          const index2 = (y1 * originalFrame.width + x2) * 4;
          const index3 = (y2 * originalFrame.width + x1) * 4;
          const index4 = (y2 * originalFrame.width + x2) * 4;

          for (let i = 0; i < 4; i++) {
              const top = data[index1 + i] * (1 - t) + data[index2 + i] * t;
              const bottom = data[index3 + i] * (1 - t) + data[index4 + i] * t;

              newData[(y * newFrame.width + x) * 4 + i] = top * (1 - u) + bottom * u;
          }
      }
  }

  return newData;
}

export default resizeFrame;
