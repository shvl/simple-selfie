import { Selfie } from './Selfie';
import * as Processors from './processors';
import * as Pipeline from './pipeline';

export { Selfie, Processors, Pipeline };

if (window) {
  // @ts-ignore
  window.Selfie = Selfie;
  // @ts-ignore
  window.SelfieProcessors = Processors;
  // @ts-ignore
  window.SelfiePipeline = Pipeline;
}
