// Icons for the tags that have one, drawn beside the tag on resource cards and
// in the filter panel. A tag missing from the map shows no icon.
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
