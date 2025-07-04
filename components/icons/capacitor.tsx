import { ComponentProps } from "react";
export default function CapacitorIcon({
  width = 24,
  height = 24,
}: ComponentProps<"svg">) {
  return (
    <svg
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256.005"
    >
      <path
        d="M39.863 54.115L.31 93.716l60.995 61.179L0 216.385l39.428 39.62 61.43-61.508 61.097 61.068 39.552-39.602z"
        fill="#53b9ff"
      />
      <path
        d="M140.517 154.896l-39.658 39.601 61.097 61.069 39.552-39.602z"
        fill="#119eff"
      />
      <path
        d="M140.517 154.896l-39.658 39.601 15.267 15.182z"
        fillOpacity=".2"
      />
      <path
        d="M194.57 100.985L256 39.478 216.43 0 155.02 61.384 93.917.31 54.365 39.913 216.01 201.761l39.552-39.602z"
        fill="#53b9ff"
      />
      <path
        d="M115.36 100.987l39.659-39.602L93.917.313 54.365 39.914z"
        fill="#119eff"
      />
      <path
        d="M115.359 100.985l39.659-39.601-15.27-15.186z"
        fillOpacity=".2"
      />
    </svg>
  );
}
