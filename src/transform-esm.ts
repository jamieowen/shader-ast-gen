import { map } from "@thi.ng/transducers";
import { ICompiledAst } from "./compile";
import { IFileOutput } from "./shader-ast-gen";

// const toEsm = () =>
//   map<ICompiledAst, IFileOutput>(() => {
//     // console.log(src.input.basename);
//     // console.log(src.input.fn);
//     // console.log(src.input.fn.args);
//     // console.log(src.input.fn.deps);

//     // console.log(src.gles1, src.gles3);
//     console.log("to-esm");
//     return {};
//   });
