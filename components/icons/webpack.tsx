import { ComponentProps } from "react";
export default function WebpackIcon({
  width = 24,
  height = 24,
}: ComponentProps<"svg">) {
  return (
    <svg
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
    >
      <path
        d="M29.54 24.663L16.57 32v-5.713l8.08-4.446zm.888-.803V8.52l-4.744 2.742v9.862zm-27.966.803L15.43 32v-5.713L7.345 21.84zm-.888-.803V8.52l4.744 2.742v9.862zM2.13 7.524L15.43 0v5.522L6.84 10.25zm27.74 0L16.57 0v5.522l8.59 4.723z"
        fill="#8ed6fb"
      />
      <path
        d="M15.43 25.237L7.456 20.85v-8.684l7.974 4.604zm1.14 0l7.975-4.383v-8.69L16.57 16.77zm-.57-8.8zm-8.004-5.275L16 6.763l8.004 4.4L16 15.783z"
        fill="#1c78c0"
      />
    </svg>
  );
}
