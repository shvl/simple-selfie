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
export function suppressNoise(frame_1, data_1) {
    return __awaiter(this, arguments, void 0, function (frame, data, minArea, threshold) {
        var resultData, y, x, index, visited, getArea, y, x, index, area, _i, area_1, _a, nx, ny, index_1;
        if (minArea === void 0) { minArea = 4; }
        if (threshold === void 0) { threshold = 1; }
        return __generator(this, function (_b) {
            resultData = new Uint8ClampedArray(data.length);
            for (y = 0; y < frame.height; y++) {
                for (x = 0; x < frame.width; x++) {
                    index = (y * frame.width + x) * 4;
                    resultData[index] = data[index];
                    resultData[index + 1] = data[index];
                    resultData[index + 2] = data[index];
                    resultData[index + 3] = 255;
                }
            }
            visited = new Array(frame.width * frame.height).fill(false);
            getArea = function (x, y) {
                var area = [[x, y]];
                var queue = [[x, y]];
                var direction = [
                    [0, 1],
                    [1, 0],
                    [0, -1],
                    [-1, 0],
                ];
                while (queue.length > 0) {
                    var current = queue.shift();
                    if (!current) {
                        continue;
                    }
                    var x_1 = current[0], y_1 = current[1];
                    for (var _i = 0, direction_1 = direction; _i < direction_1.length; _i++) {
                        var _a = direction_1[_i], dx = _a[0], dy = _a[1];
                        var nx = x_1 + dx;
                        var ny = y_1 + dy;
                        if (nx < 0 || nx >= frame.width) {
                            continue;
                        }
                        if (ny < 0 && ny >= frame.height) {
                            continue;
                        }
                        var index = (ny * frame.width + nx);
                        if (visited[index]) {
                            continue;
                        }
                        visited[index] = true;
                        var rIndex = index * 4;
                        if (resultData[rIndex] > threshold) {
                            queue.push([nx, ny]);
                            area.push([nx, ny]);
                        }
                    }
                }
                return area;
            };
            for (y = 0; y < frame.height; y++) {
                for (x = 0; x < frame.width; x++) {
                    index = (y * frame.width + x) * 4;
                    if (resultData[index] > threshold) {
                        if (visited[y * frame.width + x]) {
                            continue;
                        }
                        area = getArea(x, y);
                        if (area.length < minArea) {
                            for (_i = 0, area_1 = area; _i < area_1.length; _i++) {
                                _a = area_1[_i], nx = _a[0], ny = _a[1];
                                index_1 = (ny * frame.width + nx) * 4;
                                resultData[index_1] = 0;
                                resultData[index_1 + 1] = 0;
                                resultData[index_1 + 2] = 0;
                            }
                        }
                    }
                    else {
                        resultData[index] = 0;
                        resultData[index + 1] = 0;
                        resultData[index + 2] = 0;
                    }
                }
            }
            return [2 /*return*/, resultData];
        });
    });
}
export default suppressNoise;
