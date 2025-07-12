
export const TAG_ICON_MAP: Record<string, string> = {
  ai: 'mdi:robot',
  'interview-prep': 'mdi:account-tie',
  free: 'mdi:gift',
  'beginner-friendly': 'mdi:school',
  trending: 'mdi:trending-up',
};


export function getTagIconName(tag: string): string | null {
  return TAG_ICON_MAP[tag] || null;
}
