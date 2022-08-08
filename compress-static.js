"use strict";
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
        while (_) try {
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
exports.__esModule = true;
exports.CompressStatic = void 0;
var n_defensive_1 = require("@nivinjoseph/n-defensive");
var Path = require("path");
var Fs = require("fs");
var Zlib = require("zlib");
var n_util_1 = require("@nivinjoseph/n-util");
var CompressStatic = /** @class */ (function () {
    function CompressStatic(rootDir) {
        var extensions = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            extensions[_i - 1] = arguments[_i];
        }
        (0, n_defensive_1.given)(rootDir, "rootDir").ensureHasValue().ensureIsString()
            .ensure(function (t) { return Fs.statSync(Path.resolve(process.cwd(), t.trim())).isDirectory(); }, "not directory");
        this._rootDir = Path.resolve(process.cwd(), rootDir.trim());
        (0, n_defensive_1.given)(extensions, "extensions").ensureHasValue().ensureIsArray();
        this._extensions = extensions;
    }
    CompressStatic.prototype.compress = function () {
        return __awaiter(this, void 0, void 0, function () {
            var allFiles;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        allFiles = this._traverseAccumulate(this._rootDir);
                        return [4 /*yield*/, allFiles.forEachAsync(function (filePath) { return __awaiter(_this, void 0, void 0, function () {
                                var fileData, compressed, compressedFilePath;
                                var _a;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0: return [4 /*yield*/, n_util_1.Make.callbackToPromise(Fs.readFile)(filePath)];
                                        case 1:
                                            fileData = _b.sent();
                                            return [4 /*yield*/, n_util_1.Make.callbackToPromise(Zlib.brotliCompress)(fileData, { params: (_a = {}, _a[Zlib.constants.BROTLI_PARAM_MODE] = Zlib.constants.BROTLI_MODE_TEXT, _a) })];
                                        case 2:
                                            compressed = _b.sent();
                                            compressedFilePath = Path.join(Path.dirname(filePath), Path.basename(filePath) + ".br");
                                            return [4 /*yield*/, n_util_1.Make.callbackToPromise(Fs.writeFile)(compressedFilePath, compressed)];
                                        case 3:
                                            _b.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CompressStatic.prototype._traverseAccumulate = function (dir) {
        var _this = this;
        (0, n_defensive_1.given)(dir, "dir").ensureHasValue().ensureIsString()
            .ensure(function (t) { return Fs.statSync(t).isDirectory(); }, "not directory");
        return Fs.readdirSync(dir).reduce(function (acc, path) {
            path = Path.resolve(dir, path);
            if (Fs.statSync(path).isDirectory())
                acc.push.apply(acc, _this._traverseAccumulate(path));
            else if (_this._extensions.isEmpty || _this._extensions.contains(Path.extname(path)))
                acc.push(path);
            return acc;
        }, new Array());
    };
    return CompressStatic;
}());
exports.CompressStatic = CompressStatic;
var compressor = new CompressStatic("src/client/3rd-party/dist", ".js");
compressor
    .compress()
    .then(function () { return process.exit(0); })["catch"](function (e) {
    console.error(e);
    process.exit(1);
});
