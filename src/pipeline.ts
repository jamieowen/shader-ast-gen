import { comp, map, mapcat, push, transduce } from "@thi.ng/transducers";
import { ICompiledAst } from "./compile";
import { IFileOutput } from "./shader-ast-gen";

/**
 *
 * A Transform takes a compiled ast outout and emits an Array
 * of file outputs.
 *
 * Arrays are flattened, so only single FileOuputs are mapped.
 *
 * @param transform
 * @returns
 */
export const createTransform = (
  transform: (compiled: ICompiledAst) => IFileOutput[]
) => {
  return comp(
    map<ICompiledAst, IFileOutput[]>(transform),
    mapcat((files) => files)
  );
};

export type CompiledAstTransfrom = ReturnType<typeof createTransform>;

export const createPipeline = (...transforms: CompiledAstTransfrom[]) => {
  return comp(
    map<ICompiledAst, IFileOutput[]>((compiled) => {
      return transforms.map((t) => {
        return transduce(t, push(), [compiled])[0];
      });
    }),
    mapcat((file) => file)
  );
};
