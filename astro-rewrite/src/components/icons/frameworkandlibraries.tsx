import { ComponentProps } from "react";

export default function FrameworkAndLibrariesIcon(
  props: ComponentProps<"svg">
) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6 text-gray-500 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-gray-50"
    >
      <path d="M5.5 8.5 9 12l-3.5 3.5L2 12l3.5-3.5Z"></path>
      <path d="m12 2 3.5 3.5L12 9 8.5 5.5 12 2Z"></path>
      <path d="M18.5 8.5 22 12l-3.5 3.5L15 12l3.5-3.5Z"></path>
      <path d="m12 15 3.5 3.5L12 22l-3.5-3.5L12 15Z"></path>
    </svg>
  );
}
