# Shader AST Gen

## Overview

Generator tool to export [@thi.ng/shader-ast](https://thi.ng/shader-ast) function nodes to glslify & esm module syntax. Formatting with clang-format.

> State: unpublished & work in progress. Although used to generated glsl-blend successfully.

## Details

Currently generating only GLES 1 but can generate export syntax for GLES 3 also.

Some additional features :

- Renaming of Shader AST function argument ids. For more readable code generation.
- Renaming of function ids in the case of ESM.

## Todo

- [ ] Auto-resolve dependencies
