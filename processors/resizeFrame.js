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
function resizeFrame(originalFrame, newFrame, data) {
    return __awaiter(this, void 0, void 0, function () {
        var newData, scaleX, scaleY, y, x, srcX, srcY, x1, x2, y1, y2, t, u, index1, index2, index3, index4, i, top_1, bottom;
        return __generator(this, function (_a) {
            newData = new Uint8ClampedArray(newFrame.width * newFrame.height * 4);
            scaleX = originalFrame.width / newFrame.width;
            scaleY = originalFrame.height / newFrame.height;
            for (y = 0; y < newFrame.height; y++) {
                for (x = 0; x < newFrame.width; x++) {
                    srcX = x * scaleX;
                    srcY = y * scaleY;
                    x1 = Math.floor(srcX);
                    x2 = Math.min(Math.ceil(srcX), originalFrame.width - 1);
                    y1 = Math.floor(srcY);
                    y2 = Math.min(Math.ceil(srcY), originalFrame.height - 1);
                    t = srcX - x1;
                    u = srcY - y1;
                    index1 = (y1 * originalFrame.width + x1) * 4;
                    index2 = (y1 * originalFrame.width + x2) * 4;
                    index3 = (y2 * originalFrame.width + x1) * 4;
                    index4 = (y2 * originalFrame.width + x2) * 4;
                    for (i = 0; i < 4; i++) {
                        top_1 = data[index1 + i] * (1 - t) + data[index2 + i] * t;
                        bottom = data[index3 + i] * (1 - t) + data[index4 + i] * t;
                        newData[(y * newFrame.width + x) * 4 + i] = top_1 * (1 - u) + bottom * u;
                    }
                }
            }
            return [2 /*return*/, newData];
        });
    });
}
export default resizeFrame;
