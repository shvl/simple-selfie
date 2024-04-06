export { Selfie } from './Selfie';
export * as Processors from './processors';
export * as Pipeline from './pipeline';

// @ts-ignore
window.Selfie = Selfie;
// @ts-ignore
window.SelfieProcessors = Processors;
// @ts-ignore
window.SelfiePipeline = Pipeline;