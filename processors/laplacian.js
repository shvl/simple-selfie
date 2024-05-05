var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var KERNEL = [0, 1, 0, 1, -4, 1, 0, 1, 0];
function laplacian(frame_1, data_1) {
    return __awaiter(this, arguments, void 0, function (frame, data, thickness) {
        if (thickness === void 0) { thickness = 2; }
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve) {
                    var newData = new Uint8ClampedArray(data.length);
                    var width = frame.width, height = frame.height;
                    width = Math.floor(width);
                    height = Math.floor(height);
                    for (var y = 0; y < height; y++) {
                        for (var x = 0; x < width; x++) {
                            var i = y * width * 4 + x * 4;
                            newData[i] = 0;
                            newData[i + 1] = 0;
                            newData[i + 2] = 0;
                            newData[i + 3] = 255;
                        }
                    }
                    for (var y = 1; y < height - 1; y++) {
                        for (var x = 1; x < width - 1; x++) {
                            var sum = 0;
                            var index = y * width * 4 + x * 4;
                            for (var i = -1; i <= 1; i++) {
                                for (var j = -1; j <= 1; j++) {
                                    var kernelIndex = (i + 1) * 3 + (j + 1);
                                    var pixelIndex = index + (i * width + j) * 4;
                                    sum += data[pixelIndex] * KERNEL[kernelIndex] * thickness;
                                }
                            }
                            sum = sum * 3;
                            newData[index] = sum;
                            newData[index + 1] = sum;
                            newData[index + 2] = sum;
                            newData[index + 3] = 255;
                        }
                    }
                    resolve(newData);
                })];
        });
    });
}
export default laplacian;
