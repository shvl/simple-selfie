export function calculateVariance(data: Uint8ClampedArray): number {
    const d = new Uint8ClampedArray(data.length / 4);
  
    // Extract every fourth element from the data array
    for (let i = 0; i < data.length; i += 4) {
      d[i / 4] = data[i];
    }
  
    // Calculate the mean
    const mean = d.reduce((acc, val) => acc + val, 0) / d.length;
  
    // Calculate squared differences
    const squaredDifferences: number[] = [];
    for (let i = 0; i < d.length; i++) {
      squaredDifferences.push(Math.pow(d[i] - mean, 2));
    }
  
    // Calculate the variance
    const variance = squaredDifferences.reduce((acc, val) => acc + val, 0) / d.length;
  
    return variance;
  }