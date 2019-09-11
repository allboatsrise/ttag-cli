"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ora = require("ora");
var fs = require("fs");
var extract_1 = require("../lib/extract");
var update_1 = require("../lib/update");
var parser_1 = require("../lib/parser");
var serializer_1 = require("../lib/serializer");
function update(pofile, src, lang, ttagOverrideOpts) {
    return __awaiter(this, void 0, void 0, function () {
        var progress, pot, _a, po, resultPo, ctxs, _loop_1, ctxs_1, ctxs_1_1, ctx, err_1;
        var e_1, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    progress = ora("[ttag] updating " + pofile + " ...");
                    progress.start();
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 3, , 4]);
                    _a = parser_1.parse;
                    return [4 /*yield*/, extract_1.extractAll(src, lang, progress, ttagOverrideOpts)];
                case 2:
                    pot = _a.apply(void 0, [_c.sent()]);
                    po = parser_1.parse(fs.readFileSync(pofile).toString());
                    resultPo = update_1.updatePo(pot, po);
                    // sort by message id if enabled
                    if (ttagOverrideOpts && ttagOverrideOpts.sortByMsgid) {
                        ctxs = Object.keys(resultPo.translations);
                        _loop_1 = function (ctx) {
                            var oldPoEntries = resultPo.translations[ctx];
                            var newPoEntries = {};
                            var keys = Object.keys(oldPoEntries).sort();
                            keys.forEach(function (k) {
                                newPoEntries[k] = oldPoEntries[k];
                            });
                            resultPo.translations[ctx] = newPoEntries;
                        };
                        try {
                            for (ctxs_1 = __values(ctxs), ctxs_1_1 = ctxs_1.next(); !ctxs_1_1.done; ctxs_1_1 = ctxs_1.next()) {
                                ctx = ctxs_1_1.value;
                                _loop_1(ctx);
                            }
                        }
                        catch (e_1_1) { e_1 = { error: e_1_1 }; }
                        finally {
                            try {
                                if (ctxs_1_1 && !ctxs_1_1.done && (_b = ctxs_1.return)) _b.call(ctxs_1);
                            }
                            finally { if (e_1) throw e_1.error; }
                        }
                    }
                    fs.writeFileSync(pofile, serializer_1.serialize(resultPo));
                    progress.succeed(pofile + " updated");
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _c.sent();
                    progress.fail("Failed to update. " + err_1.message + ". " + err_1.stack);
                    process.exit(1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.default = update;
