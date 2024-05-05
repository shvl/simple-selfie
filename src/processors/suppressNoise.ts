import { Frame } from '../types';

export async function suppressNoise(
  frame: Frame,
  data: Uint8ClampedArray,
  minArea: number = 4,
  threshold = 1
): Promise<Uint8ClampedArray> {
  const resultData = new Uint8ClampedArray(data.length);

  for (let y = 0; y < frame.height; y++) {
    for (let x = 0; x < frame.width; x++) {
      const index = (y * frame.width + x) * 4;
      resultData[index] = data[index];
      resultData[index + 1] = data[index];
      resultData[index + 2] = data[index];
      resultData[index + 3] = 255;
    }
  }

  const visited = new Array(frame.width * frame.height).fill(false);
  const getArea = (x: number, y: number): number[][] => {
    const area = [[x, y]];
    const queue = [[x, y]];
    const direction = [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
    ];
    while (queue.length > 0) {
      const current = queue.shift();
      if (!current) {
        continue;
      }
      const [x, y] = current;
      for (const [dx, dy] of direction) {
        const nx = x + dx;
        const ny = y + dy;
        if (nx < 0 || nx >= frame.width){
          continue;
        }
        if (ny < 0 && ny >= frame.height){
          continue;
        }
        const index = (ny * frame.width + nx);
        if (visited[index]) {
          continue;
        }
        visited[index] = true;
        const rIndex = index * 4;
        if (resultData[rIndex] > threshold) {
          queue.push([nx, ny]);
          area.push([nx, ny]);
        }
      }
    }

    return area;
  };

  for (let y = 0; y < frame.height; y++) {
    for (let x = 0; x < frame.width; x++) {
      const index = (y * frame.width + x) * 4;
      if (resultData[index] > threshold ) {
        if (visited[y * frame.width + x]) {
          continue;
        }
        const area = getArea(x, y);
        if (area.length < minArea) {
          for (const [nx, ny] of area) {
            const index = (ny * frame.width + nx) * 4;
            resultData[index] = 0;
            resultData[index + 1] = 0;
            resultData[index + 2] = 0;
          }
        }
      } else {
        resultData[index] = 0;
        resultData[index + 1] = 0;
        resultData[index + 2] = 0;
      }
    }
  }

  return resultData;
}

export default suppressNoise;
