import { map } from "@thi.ng/transducers";
import { spawnSync } from "child_process";
import { ICompiledAst } from "./compile";

export const clangFormat = () =>
  map<ICompiledAst, ICompiledAst>((compiled) => {
    compiled.compiled.forEach((inp) => {
      const command = spawnSync(
        "clang-format",
        ["--assume-filename=input.glsl"], // assume filename doesn't seem to fix , issue. ( see below )
        {
          input: `\n${inp.gles1}\n`,
        }
      );
      if (command.error) {
        console.error(command.error!.message);
      } else {
        /**
         * Slice the start and end.
         * clang-format seems to add , and the start and end.
         * This doesn't happen when
         **/
        inp.gles1 = command.output.toString().slice(1, -1).trim();
      }
    });
    return compiled;
  });
