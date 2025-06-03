import { ComponentProps } from "react";

export default function VercelIcon({
  width = 24,
  height = 24,
}: ComponentProps<"svg">) {
  return (
    <svg
      width={width}
      height={height}
      aria-label="Vercel Logo"
      fill="#000000"
      viewBox="0 0 75 65"
    >
      <path d="M37.59.25l36.95 64H.64l36.95-64z"></path>
    </svg>
  );
}
