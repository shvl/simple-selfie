function calculateVariance(data: Uint8ClampedArray): number {
  const d = new Uint8ClampedArray(data.length / 4);
  for (let i = 0; i < data.length; i += 4) {
    d[i / 4] = data[i];
  }
  const mean = d.reduce((acc, val) => acc + val, 0) / d.length;
  const squaredDifferences: number[] = [];
  for (let i = 0; i < d.length; i++) {
    squaredDifferences.push(Math.pow(d[i] - mean, 2));
  }
  const variance = squaredDifferences.reduce((acc, val) => acc + val, 0) / d.length;
  return variance;
}

export default calculateVariance;