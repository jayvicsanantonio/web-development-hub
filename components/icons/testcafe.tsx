import { ComponentProps } from "react";
export default function TestcafeIcon({
  width = 24,
  height = 24,
}: ComponentProps<"svg">) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 38 34"
    >
      <path
        fill="#000"
        d="M23.26 26l-1.292 1.333h5.169L32.306 32H5.169l5.169-4.667h3.877L12.921 26H9.046L0 34h37.474l-9.045-8H23.26z"
      ></path>
      <path
        fill="#1274cc"
        d="M34.755 13.232L31.54 10l-13.5 13.578-5.142-5.173-3.214 3.233 8.357 8.405 16.714-16.81z"
      ></path>
    </svg>
  );
}
