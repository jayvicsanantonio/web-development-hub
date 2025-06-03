import { ComponentProps } from "react";

export default function UnsplashIcon({
  width = 24,
  height = 24,
}: ComponentProps<"svg">) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 32 32"
      version="1.1"
      aria-labelledby="unsplash-home"
      aria-hidden="false"
    >
      <desc lang="en-US">Unsplash logo</desc>
      <title id="unsplash-home">Unsplash Home</title>
      <path d="M10 9V0h12v9H10zm12 5h10v18H0V14h10v9h12v-9z"></path>
    </svg>
  );
}
