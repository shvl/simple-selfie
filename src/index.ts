import { Selfie as SelfieModule } from './Selfie';
import * as ProcessorsModule from './processors';
import * as TypesModule from './types';

export const Selfie = SelfieModule;
export const Processors = ProcessorsModule;
export const Types = TypesModule;

export default { Selfie, Processors, Types };

// @ts-ignore
window?.SimpleSelfie = { Selfie, Processors, Types };
