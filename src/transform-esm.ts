import { createTransform } from "./transformer";

export const transformEsm = (opts: any) =>
  createTransform((source) => {
    const contents = source.compiled
      .map((inp) => {
        return `export const ${inp.fn.id} = \`\n${inp.gles1}\n\``;
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
