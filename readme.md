# Simple Selfie

Vanilla JS Demo: [https://shvl.github.io/simple-selfie](https://shvl.github.io/simple-selfie)

Vanilla JS Demo AR (add glasses): [https://shvl.github.io/simple-selfie](https://shvl.github.io/simple-selfie?selfie-glasses)

React Demo: [https://github.com/shvl/react-simple-selfie](https://github.com/shvl/react-simple-selfie)

Selfie is a JavaScript library that adds selfie support to your website. It leverages modern face detection algorithms to provide a seamless user experience.

Key Features

- Face Detection: Selfie.js uses the face-api.js library to detect faces in real-time. It can handle multiple faces at once, but focuses on the most prominent face for selfie purposes. See Face and Selfie classes for more details.

- Face Size and Position Detection: The library can calculate the size and position of the detected face relative to the frame. It uses these calculations to ensure the face is properly centered and sized within the selfie frame. See the faceWidth and lastFaceFrame properties in the Selfie class.

- Face Direction Detection: Selfie.js can determine the direction the face is looking at. This feature is implemented in the FaceDirection class and the IFaceDirection interface.

- Overlay to Center Face: An overlay is provided to guide the user to center their face within the frame. The overlay visibility is controlled based on the deviation of the face position from the center of the frame. See the overlayVisible property in the Selfie class.

- Selfie Capture: The library can capture a selfie when the user is centered within the frame. The captured selfie can be procssed with various filters and effects. See processors to crop and resize the selfie, detect blur with laplacian filter.

## Installation

```
npm install simple-selfie
```

## Usage

This project uses the `Selfie` class to detect the face in a video stream and display an overlay if the face deviates from a certain position or size.

### HTML Structure

The HTML structure should include a container for the video stream and overlay, as well as elements for each face direction:

```html
<div class="container">
  <div class="overlay"></div>
  <div class="face-position__direction_top"></div>
  <div class="face-position__direction_left"></div>
  <div class="face-position__direction_bottom"></div>
  <div class="face-position__direction_right"></div>
</div>
```

### JavaScript

Create a new instance of the Selfie class, passing in the container and a callback function for when a face frame is processed:

```javascript
import { Selfie } from 'simple-selfie';

const container = document.querySelector('.container');
const overlay = document.querySelector('.overlay');

const facePositions = {
  isLookUp: document.querySelector('.face-position__direction_top'),
  isLookRight: document.querySelector('.face-position__direction_left'),
  isLookDown: document.querySelector('.face-position__direction_bottom'),
  isLookLeft: document.querySelector('.face-position__direction_right'),
};

const selfie = new Selfie({
  container,
  onFaceFrameProcessed: ({ face, faceFrame, overlayVisible, detection }) => {
    // Handle face frame processing here
  },
});
```

### Face Frame Processing

In the onFaceFrameProcessed callback, you can add or remove the overlay_visible class to the overlay based on the face's position and size. You can also add the face-position\_\_direction_visible class to the appropriate face direction element:

```javascript
onFaceFrameProcessed: ({ face, faceFrame, overlayVisible, detection }) => {
  if (face) {
    const faceWidth = face.getWidth();
    const deviationFaceWidth = Math.abs(FACE_WIDTH - faceWidth);
    const deviationFacePosition = face.getFacePosiotion();
    const overlayVisible = deviationFaceWidth > FACE_DEVIATION || deviationFacePosition > FACE_DEVIATION;
    if (overlayVisible) {
      overlay.classList.add('overlay_visible');
    } else {
      overlay.classList.remove('overlay_visible');
    }
  }

  for (const key in facePositions) {
    if (face.direction[key]()) {
      facePositions[key].classList.add('face-position__direction_visible');
    } else {
      facePositions[key].classList.remove('face-position__direction_visible');
    }
  }
};
```

### Selfie Capture

The `Selfie` class also includes functionality for capturing a selfie. This can be done by calling the `capture` method:

```javascript
import { Processors } from "simple-selfie";

const selfieImage = selfie.capture();
const frame = {
  width: selfie.video.videoWidth,
  height: selfie.video.videoHeight,
};
const faceFrame = {
  width: 200,
  height: 200,
};
// captureImage returns Uint8Array
const data = selfie.captureImage();
// convert uint8array to image
const image = await Processors.toImage(frame, data);

// use processors to process the image to detect blur
const cropped = await Processors.cropFrame(frame, lastFaceFrame, data);
const resized = await Processors.resizeFrame(lastFaceFrame, faceFrame, cropped);
const laplacian = await Processors.laplacian(faceFrame, resized);
const laplacianImage = await Processors.toImage(faceFrame, laplacian);
const blurVarianceResult = await Processors.variance(laplacian);

resultImage.src = image;
resultLaplacian.src = laplacianImage;

resultImageBlurred.textContent = 'Not blurred ' + Math.round(blurVarianceResult);
if (blurVarianceResult < 1100) {
  resultImageBlurred.classList.add('result-image__blurred_blurred');
  resultImageBlurred.textContent = 'Blurred ' + blurVarianceResult;
} else {
  resultImageBlurred.classList.remove('result-image__blurred_blurred');
}
```
