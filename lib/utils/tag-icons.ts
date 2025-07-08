/**
 * Maps tag names to their corresponding icon names
 */
export const TAG_ICON_MAP: Record<string, string> = {
  ai: 'mdi:robot',
  'interview-prep': 'mdi:account-tie',
  free: 'mdi:gift',
  'beginner-friendly': 'mdi:school',
  trending: 'mdi:trending-up',
};

/**
 * Get the icon name for a given tag
 * @param tag The tag name
 * @returns The icon name or null if no icon is mapped
 */
export function getTagIconName(tag: string): string | null {
  return TAG_ICON_MAP[tag] || null;
}
