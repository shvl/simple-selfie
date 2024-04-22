import { Selfie as SelfieModule } from './Selfie';
import * as ProcessorsModule from './processors';
import * as TypesModule from './types';
export var Selfie = SelfieModule;
export var Processors = ProcessorsModule;
export var Types = TypesModule;
export default { Selfie: Selfie, Processors: Processors, Types: Types };
// @ts-ignore
window === null || window === void 0 ? void 0 : window.SimpleSelfie = { Selfie: Selfie, Processors: Processors, Types: Types };
