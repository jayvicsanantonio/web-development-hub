import { ComponentProps } from "react";

export default function MountainIcon(props: ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24" // Default width
      height="24" // Default height
      viewBox="0 0 24 24"
      fill="var(--color-primary)" // Use theme's primary color for fill
      {...props} // Spread other props, allowing className, onClick, etc.
    >
      {/* A simple, friendly, rounded two-peak mountain shape. Adjust path as needed for aesthetics. */}
      <path d="M6 20 C6 18 7 15 9 15 C11 15 11.5 17 12.5 17 C13.5 17 14 15 16 15 C18 15 19 18 19 20 Z M9.5 20 C9.5 19 10 17 12 17 C14 17 14.5 19 14.5 20 Z" />
      {/* Optional: Small sun/moon as a cute accent - uncomment and style if desired */}
      {/* <circle cx="17" cy="7" r="2.5" fill="var(--color-accent)" /> */}
    </svg>
  );
}
