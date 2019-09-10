"use strict";
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
var parser_1 = require("../lib/parser");
var utils_1 = require("../lib/utils");
var fs = require("fs");
function po2json(path, pretty, nostrip, format) {
    var e_1, _a;
    var poData = parser_1.parse(fs.readFileSync(path).toString());
    var messages = utils_1.iterateTranslations(poData.translations);
    if (!nostrip) {
        var header = messages.next().value;
        delete header.comments;
        try {
            for (var messages_1 = __values(messages), messages_1_1 = messages_1.next(); !messages_1_1.done; messages_1_1 = messages_1.next()) {
                var msg = messages_1_1.value;
                delete msg.comments;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (messages_1_1 && !messages_1_1.done && (_a = messages_1.return)) _a.call(messages_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    }
    if (format === "compact") {
        poData = utils_1.convert2Compact(poData);
    }
    process.stdout.write(JSON.stringify(poData, null, pretty ? 2 : 0));
}
exports.default = po2json;
