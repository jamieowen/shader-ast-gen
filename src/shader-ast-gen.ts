import { Func, Type } from "@thi.ng/shader-ast";
import { compileFromConfig } from "./compile";

/**
 * Function input inside configuration.
 */
export interface IFnInput {
  fn: Func<Type>;
  group: string;
}

type TransformType = "glslify-1" | "glslify-1" | "esm-1" | "esm-2";

/**
 * Provide a list of shader-ast function inputs to compile.
 */
export interface IShaderAstGenConfig {
  outDir: string;
  inputs: IFnInput[];
  transforms: TransformType[];
}

export interface IFileOutput {
  contents: string;
  path: string;
  basename: string;
  extname: string;
}

export const shaderAstGen = (config: IShaderAstGenConfig) => {
  if (config) {
    const $config = compileFromConfig(config);
    // $config.transform(toGlslify());
    // $config.transform(toEsm());
  }
  console.log("OKOK");
};
