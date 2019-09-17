import { size, componentSize } from "./size";
import { color } from "./color";
import { borderRadius, borderWidth } from "./border";
import { zIndex } from "./z-index";

export const styleSettings = {
  ...size,
  ...componentSize,
  ...color,
  ...borderRadius,
  ...borderWidth,
  ...zIndex
};
