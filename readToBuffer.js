const fs = require('fs');

const readToBuffer = (path) => {
    const buffer = fs.readFileSync(path);
    const float32Array = new Float32Array(buffer);
    return JSON.stringify([...float32Array]);
}

console.log(readToBuffer('./weights/face_landmark_68_model-shard1'))