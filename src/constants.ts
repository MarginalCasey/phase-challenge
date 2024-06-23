import { StrokeAlignment } from "./types";

export const DEFAULT_COLOR = "transparent";

export const DEFAULT_FILL = {
  color: DEFAULT_COLOR,
  alpha: 1,
};

export const DEFAULT_STROKE = {
  width: 1,
  color: DEFAULT_COLOR,
  alpha: 1,
  alignment: StrokeAlignment.Inner,
};
