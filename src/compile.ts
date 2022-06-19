import { stream } from "@thi.ng/rstream";
import { walk, allChildren, Func, Type } from "@thi.ng/shader-ast";
import { GLSLVersion, targetGLSL } from "@thi.ng/shader-ast-glsl";
import { groupByMap, reduce } from "@thi.ng/transducers";
import { rename } from "fs-extra";
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

const renameArgIds = (args: string[], root: Func<Type>) => {
  const idMap = new Map<string, string>();
  args.forEach((newId, i) => {
    /** Store new/old ids */
    idMap.set(root.args[i].id, newId);
    root.args[i].id = newId;
  });

  walk(
    (acc, c) => {
      // console.log(c);
      if (typeof c["id"] === "string" && idMap.has(c["id"])) {
        c["id"] = idMap.get(c["id"]);
      }
      return acc;
    },
    allChildren,
    {},
    root
  );
};

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

        await delay(10);
        s.next({
          group,
          inputs,
          compiled: inputs.map((inp) => {
            /** rename opts */

            if (inp.astOpts) {
              // Id Rename should only renamed the function export ( NOT the AST Node glsl - especially for glslify )
              // if( typeof inp.astOpts.idRen === 'function' ){
              //   inp.
              // }
              console.log("FN : ", inp.fn);
              if (typeof inp.astOpts.argRen === "function") {
                // inp.fn.args.forEach((n, i) => {
                //   n.id = inp.astOpts.argRen[i];
                // });
              } else {
                renameArgIds(inp.astOpts.argRen!, inp.fn);
              }
            }

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
