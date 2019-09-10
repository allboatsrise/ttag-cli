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
var chalk_1 = require("chalk");
var fs = require("fs");
var parser_1 = require("../lib/parser");
var utils_1 = require("../lib/utils");
var print_1 = require("../lib/print");
function color(path) {
    var e_1, _a;
    // Force color output even on tty, otherwise this command is useless
    chalk_1.default.enabled = true;
    chalk_1.default.level = 1;
    var data = fs.readFileSync(path).toString();
    var poData = parser_1.parse(data);
    print_1.printMsg({ msgid: "", msgstr: [""] });
    print_1.printHeader(poData.headers);
    process.stdout.write("\n");
    var messages = utils_1.iterateTranslations(poData.translations);
    messages.next(); // skip empty translation
    try {
        for (var messages_1 = __values(messages), messages_1_1 = messages_1.next(); !messages_1_1.done; messages_1_1 = messages_1.next()) {
            var msg = messages_1_1.value;
            print_1.printMsg(msg);
            process.stdout.write("\n");
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
exports.default = color;
