import { cn } from '@/lib/utils';

export function generateResourceId(title: string): string {
  return title.toLowerCase().replace(/\s+/g, '-');
}

export function getAccentColorClasses(
  accentColor: 'neon' | 'purple'
): {
  icon: string;
  hover: string;
} {
  return {
    icon: accentColor === 'neon' ? 'text-neon' : 'text-purple',
    hover:
      accentColor === 'neon'
        ? 'hover:border-neon hover:shadow-neon/10'
        : 'hover:border-purple hover:shadow-purple/10',
  };
}

export function getCardClassName(
  accentColor: 'neon' | 'purple'
): string {
  const { hover } = getAccentColorClasses(accentColor);

  return cn(
    'relative flex flex-col h-full rounded-lg transition-all',
    'bg-card border border-border',
    'hover:shadow-lg hover:scale-[1.01]',
    hover
  );
}
