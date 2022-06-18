import { resolve, join } from "path";
import { ensureDirSync, writeFileSync } from "fs-extra";
import { map } from "@thi.ng/transducers";
import { IFileOutput } from "./shader-ast-gen";

export const writeFiles = (opts: { outDir: string }) => {
  const out = resolve(opts.outDir);
  ensureDirSync(out);
  return map<IFileOutput, any>((file) => {
    const filename = `${file.basename}${file.extname}`;
    const path = join(out, file.path);
    ensureDirSync(path);
    const res = join(path, filename);
    console.log("write : ", res, file.contents);
    writeFileSync(res, file.contents, { encoding: "utf-8" });

    return file;
  });
};
