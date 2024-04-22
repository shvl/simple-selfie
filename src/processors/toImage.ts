import { Frame } from '../types/Frame';

async function toImage(frame: Frame, data: Uint8ClampedArray): Promise<string> {
  const canvas = document.createElement('canvas');
  canvas.width = frame.width;
  canvas.height = frame.height;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Could not get canvas context');
  }

  const imageData = new ImageData(data, frame.width, frame.height);
  ctx.putImageData(imageData, 0, 0);
  const src = canvas.toDataURL();
  canvas.remove();
  return src;
}

export default toImage;
