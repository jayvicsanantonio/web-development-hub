import { ComponentProps } from "react";
export default function EsbuildIcon({
  width = 24,
  height = 24,
}: ComponentProps<"svg">) {
  return (
    <svg
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 256 256"
      version="1.1"
      preserveAspectRatio="xMidYMid"
    >
      <g>
        <circle fill="#FFCF00" cx="128" cy="128" r="128"></circle>
        <path
          d="M69.2852814,58.7147186 L138.570563,128 L69.2852814,197.285281 L52.3147186,180.314719 L104.629,128 L52.3147186,75.6852814 L69.2852814,58.7147186 Z M146.085281,58.7147186 L215.370563,128 L146.085281,197.285281 L129.114719,180.314719 L181.429,128 L129.114719,75.6852814 L146.085281,58.7147186 Z"
          fill="#191919"
        ></path>
      </g>
    </svg>
  );
}
