import { size } from "./size";
import { color } from "./color";
import { borderRadius, borderWidth } from "./border";
import { zIndex } from "./z-index";

export const styleSettings = {
  ...size,
  ...color,
  ...borderRadius,
  ...borderWidth,
  ...zIndex
};
