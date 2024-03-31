const KERNEL = [0, 1, 0, 1, -4, 1, 0, 1, 0];


function getLaplacian(data: Uint8ClampedArray, width: number, height: number): Promise<Uint8ClampedArray> {
    return new Promise((resolve) => {
      const newData = new Uint8ClampedArray(data.length);
      const THICKNESS = 2;
  
      for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {
          let sum = 0;
          let index = y * width * 4 + x * 4; // Index of the current pixel
  
          for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
              const kernelIndex = (i + 1) * 3 + (j + 1);
              const pixelIndex = index + (i * width + j) * 4;
  
              sum += data[pixelIndex] * KERNEL[kernelIndex] * THICKNESS;
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