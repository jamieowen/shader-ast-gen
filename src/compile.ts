import { stream } from "@thi.ng/rstream";
import { GLSLVersion, targetGLSL } from "@thi.ng/shader-ast-glsl";
import { groupByMap, reduce } from "@thi.ng/transducers";
import { IFnInput, IShaderAstGenConfig } from "./shader-ast-gen";

/**
 * Compiled and grouped shader functions.
 */
export interface ICompiledAst {
  group: string;
  inputs: IFnInput[];
  compiled: {
    fn: IFnInput["fn"];
    gles1: string;
    gles3: string;
  }[];
}

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const compileFromConfig = (config: IShaderAstGenConfig) =>
  stream<ICompiledAst>((s) => {
    const gles1 = targetGLSL({
      type: "fs",
      versionPragma: false,
      prelude: "",
      version: GLSLVersion.GLES_100,
    });

    const gles3 = targetGLSL({
      type: "fs",
      versionPragma: false,
      prelude: "",
      version: GLSLVersion.GLES_300,
    });

    const groups = reduce(
      groupByMap<IFnInput, string, IFnInput[]>({
        key: (s) => s.group,
      }),
      config.inputs
    );

    let emit = async () => {
      for (let entry of groups) {
        const [group, inputs] = entry;
        console.log("Emit", group);
        await delay(10);
        s.next({
          group,
          inputs,
          compiled: inputs.map((inp) => {
            return {
              fn: inp.fn,
              gles1: gles1(inp.fn),
              gles3: gles3(inp.fn),
            };
          }),
        });
      }
    };
    emit();
  });
