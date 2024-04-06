Selfie

Vanilla JS Demo: [https://shvl.github.io/simple-selfie](https://shvl.github.io/simple-selfie)

Selfie is a JavaScript library that adds selfie support to your website. It leverages modern face detection algorithms to provide a seamless user experience.

Key Features
- Face Detection: Selfie.js uses the face-api.js library to detect faces in real-time. It can handle multiple faces at once, but focuses on the most prominent face for selfie purposes. See Face and Selfie classes for more details.

- Face Size and Position Detection: The library can calculate the size and position of the detected face relative to the frame. It uses these calculations to ensure the face is properly centered and sized within the selfie frame. See the faceWidth and lastFaceFrame properties in the Selfie class.

- Face Direction Detection: Selfie.js can determine the direction the face is looking at. This feature is implemented in the FaceDirection class and the IFaceDirection interface.

- Overlay to Center Face: An overlay is provided to guide the user to center their face within the frame. The overlay visibility is controlled based on the deviation of the face position from the center of the frame. See the overlayVisible property in the Selfie class.

- Selfie Capture: The library can capture a selfie when the user is centered within the frame. The captured selfie can be procssed with various filters and effects. See processors to crop and resize the selfie, detect blur with laplacian filter.

