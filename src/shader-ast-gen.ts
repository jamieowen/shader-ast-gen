import { Func, Type } from "@thi.ng/shader-ast";

import { compileFromConfig } from "./compile";
import { transformGlsl } from "./transform-glslify";
import { createPipeline } from "./pipeline";
import { transformEsm } from "./transform-esm";
import { writeFiles } from "./write-files";
import { clangFormat } from "./formatting";

/**
 * Function input inside configuration.
 */
export interface IFnInput {
  fn: Func<Type>;
  group: string;
  astOpts?: Partial<{
    /** Rename options for ast nodes */
    argRen: string[] | ((arg: string[]) => string[]);
    idRen: string | ((s: string) => string);
  }>;
}

// type TransformType = "glslify-1" | "glslify-1" | "esm-1" | "esm-2";

/**
 * Provide a list of shader-ast function inputs to compile.
 */
export interface IShaderAstGenConfig {
  outDir: string;
  inputs: IFnInput[];
}

export interface IFileOutput {
  contents: string;
  path: string;
  basename: string;
  extname: string;
}

export const shaderAstGen = (config: IShaderAstGenConfig) => {
  if (config) {
    compileFromConfig(config)
      .transform(clangFormat())
      .transform(createPipeline(transformGlsl({}), transformEsm({})))
      .transform(writeFiles({ outDir: config.outDir }));
  }
};
