import { createTransform } from "./pipeline";

export const transformEsm = (opts: any) =>
  createTransform((source) => {
    const contents = source.compiled
      .map((inp) => {
        /**
         * Check rename of functions for ESM export only.
         * glslify can overload same function name providing different function signatures exist.
         */
        let id = inp.fn.id;
        if (inp.astOpts && inp.astOpts.idRen) {
          if (typeof inp.astOpts.idRen === "function") {
            id = inp.astOpts.idRen(id);
          } else {
            id = inp.astOpts.idRen;
          }
        }
        return `export const ${id} = \`\n${inp.gles1}\n\``;
      })
      .join("\n\n");
    return [
      {
        contents,
        basename: source.group,
        extname: ".js",
        path: "./esm",
      },
    ];
  });
