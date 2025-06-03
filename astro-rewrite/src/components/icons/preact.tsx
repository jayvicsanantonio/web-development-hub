import { ComponentProps } from "react";

export default function PreactIcon({
  width = 24,
  height = 24,
}: ComponentProps<"svg">) {
  return (
    <svg
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="-256 -256 512 512"
      version="1.1"
      xmlSpace="preserve"
    >
      <path
        d="M0,-256 221.7025033688164,-128 221.7025033688164,128 0,256 -221.7025033688164,128 -221.7025033688164,-128z"
        fill="#673ab8"
      />
      <ellipse
        cx="0"
        cy="0"
        strokeWidth="16px"
        rx="75px"
        ry="196px"
        fill="none"
        stroke="white"
        transform="rotate(52.5)"
      />
      <ellipse
        cx="0"
        cy="0"
        strokeWidth="16px"
        rx="75px"
        ry="196px"
        fill="none"
        stroke="white"
        transform="rotate(-52.5)"
      />
      <circle cx="0" cy="0" r="34" fill="white" />
    </svg>
  );
}
