import { ComponentProps } from "react";

export default function NpmIcon({
  width = 24,
  height = 24,
}: ComponentProps<"svg">) {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <rect fill="#333333" width="27.23" height="27.23" rx="2"></rect>
      <polygon
        fill="#fff"
        points="5.8 21.75 13.66 21.75 13.67 9.98 17.59 9.98 17.58 21.76 21.51 21.76 21.52 6.06 5.82 6.04 5.8 21.75"
      ></polygon>
    </svg>
  );
}
