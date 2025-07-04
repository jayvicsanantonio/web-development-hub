import { ComponentProps } from "react";
export default function RemixIcon({
  width = 24,
  height = 24,
}: ComponentProps<"svg">) {
  return (
    <svg
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      shapeRendering="geometricPrecision"
      textRendering="geometricPrecision"
      imageRendering="optimizeQuality"
      fillRule="evenodd"
      clipRule="evenodd"
      viewBox="0 0 445 512.13"
    >
      <path
        fill="#121212"
        fillRule="nonzero"
        d="M0 512.13v-79.52h144.76c24.18 0 29.43 17.93 29.43 28.62v50.9H0zm425.45-117.19c4.61 59.17 4.61 86.91 4.61 117.19H293.15c0-6.6.12-12.63.24-18.75.37-19.01.76-38.84-2.32-78.89-4.08-58.63-29.32-71.66-75.75-71.66H0V236.15h221.84c58.64 0 87.96-17.84 87.96-65.07 0-41.53-29.32-66.69-87.96-66.69H0V0h246.27C379.03 0 445 62.7 445 162.86c0 74.92-46.42 123.78-109.14 131.92 52.94 10.59 83.89 40.72 89.59 100.16z"
      />
    </svg>
  );
}
