var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { ProcessedFrame } from './ProcessedFrame';
var CapturedImage = /** @class */ (function (_super) {
    __extends(CapturedImage, _super);
    function CapturedImage(face, data) {
        var _this = _super.call(this, face) || this;
        _this.data = data || new Uint8ClampedArray();
        return _this;
    }
    CapturedImage.prototype.getImageData = function () {
        return this.data;
    };
    return CapturedImage;
}(ProcessedFrame));
export { CapturedImage };
