import { map } from "@thi.ng/transducers";
import { ICompiledAst } from "./compile";

interface IGlslifyOpts {
  outDir: string;
}

// export const transformGlslify = () =>
//   map<ICompiledAst, IFileOutput>((src) => {
//     // console.log(src.input.basename);
//     // console.log(src.input.fn);
//     // console.log(src.input.fn.args);
//     // console.log(src.input.fn.deps);

//     // console.log(src.gles1, src.gles3);
//     console.log("to-glslify");
//     return {};
//   });
