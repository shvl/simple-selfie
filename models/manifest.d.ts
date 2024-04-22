export const tinyFaceDetectorManifest: {
    weights: {
        name: string;
        shape: number[];
        dtype: string;
        quantization: {
            dtype: string;
            scale: number;
            min: number;
        };
    }[];
    paths: string[];
}[];
export const faceLandmark68NetManifest: {
    weights: {
        name: string;
        shape: number[];
        dtype: string;
        quantization: {
            dtype: string;
            scale: number;
            min: number;
        };
    }[];
    paths: string[];
}[];
