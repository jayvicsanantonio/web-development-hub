// cn(): joins class names and resolves conflicting Tailwind classes, so the
// className a component is passed can override its defaults.
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
