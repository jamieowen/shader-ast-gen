import { createTransform } from "./transformer";

interface IGlslifyOpts {
  outDir: string;
}

export const transformGlsl = (opts: any) =>
  createTransform((source) => {
    const contents = source.compiled
      .map((inp) => {
        return `${inp.gles1}\n#pragma glslify: export(${inp.fn.id})`;
      })
      .join("\n\n");
    return [
      {
        contents,
        basename: source.group,
        extname: ".glsl",
        path: "./glsl",
      },
    ];
  });
