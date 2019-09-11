import * as ora from "ora";
import * as ttagTypes from "../types";
import * as fs from "fs";
import { extractAll } from "../lib/extract";
import { updatePo } from "../lib/update";
import { parse, Messages } from "../lib/parser";
import { serialize } from "../lib/serializer";

async function update(
    pofile: string,
    src: string[],
    lang: string,
    ttagOverrideOpts?: ttagTypes.TtagOpts
) {
    const progress: ttagTypes.Progress = ora(`[ttag] updating ${pofile} ...`);
    progress.start();
    try {
        const po = parse(
            await extractAll(src, lang, progress, ttagOverrideOpts)
        );
        const pot = parse(fs.readFileSync(pofile).toString());

        //console.log(pot, po);

        const resultPo = updatePo(pot, po);

        // sort by message id if enabled
        if (ttagOverrideOpts && ttagOverrideOpts.sortByMsgid) {
            const ctxs = Object.keys(resultPo.translations);
            for (const ctx of ctxs) {
                const oldPoEntries = resultPo.translations[ctx];
                const newPoEntries: Messages = {};
                const keys = Object.keys(oldPoEntries).sort();
                keys.forEach(k => {
                    newPoEntries[k] = oldPoEntries[k];
                });
                resultPo.translations[ctx] = newPoEntries;
            }
        }

        fs.writeFileSync(pofile, serialize(resultPo));
        progress.succeed(`${pofile} updated`);
    } catch (err) {
        progress.fail(`Failed to update. ${err.message}. ${err.stack}`);
        process.exit(1);
    }
}

export default update;
