'use client';

import { useEffect, useRef } from 'react';
import { useSearch } from '@/contexts/search-context';
import { X, Star } from 'lucide-react';
import { Icon } from '@iconify/react';
import { getTagIconName } from '@/lib/utils/tag-icons';

// All available tags from the memory - comprehensive tag system
const ALL_TAGS = [
  // Technology-specific
  'javascript',
  'typescript',
  'react',
  'vue',
  'css',
  'html',
  'nodejs',
  'python',

  // Purpose/use case
  'ai',
  'interview-prep',
  'coding-challenges',
  'system-design',
  'testing',
  'deployment',
  'design',
  'performance',
  'accessibility',
  'authentication',

  // Learning level
  'beginner-friendly',
  'advanced',
  'interactive',

  // Resource type
  'documentation',
  'tutorial',
  'course',
  'community',
  'blog',
  'tool',
  'platform',

  // Content format
  'free',
  'paid',
  'open-source',
  'video-based',
  'hands-on',

  // Special categories
  'trending',
  'career-focused',
  'full-stack',
  'mobile-dev',
  'desktop-dev',
  'database',
  'cms',
];

// Priority tags that get special styling
const PRIORITY_TAGS = [
  'ai',
  'interview-prep',
  'free',
  'beginner-friendly',
  'trending',
];

interface TagFilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

// Get icon for specific priority tags using shared utility
const getTagIcon = (tag: string) => {
  const iconName = getTagIconName(tag);
  return iconName ? (
    <Icon icon={iconName} className="h-3 w-3" />
  ) : null;
};

export function TagFilterPanel({
  isOpen,
  onClose,
}: TagFilterPanelProps) {
  const { selectedTags, toggleTag, isTagSelected, clearFilters } =
    useSearch();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center md:absolute md:inset-auto md:top-14 md:left-1/2 md:-translate-x-1/2">
      {/* Panel - optimized with v4 patterns */}
      <div
        ref={panelRef}
        className="
          w-full max-h-[90vh] md:max-h-[75vh] overflow-y-auto
          md:w-auto md:min-w-[80vw] lg:min-w-[70vw] xl:min-w-[60vw]
          bg-card/80 backdrop-blur-optimized
          border border-border/20 rounded-2xl
          shadow-lg
          p-4 md:p-6
          animate-optimized animate-scale-in
          transform-gpu
        "
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <h2 className="text-lg md:text-xl font-semibold text-foreground">
            Filter by Tags
          </h2>
          <button
            onClick={onClose}
            className="
              p-1.5 md:p-2 rounded-lg hover:bg-muted/60
              transition-colors duration-200
              text-muted-foreground hover:text-foreground
            "
            aria-label="Close filter panel"
          >
            <X className="h-4 w-4 md:h-5 md:w-5" />
          </button>
        </div>

        {/* Active Filters */}
        {selectedTags.length > 0 && (
          <div className="mb-4 md:mb-5">
            <div className="flex items-center justify-between mb-1.5 md:mb-2">
              <span className="text-xs md:text-sm font-medium text-foreground">
                Active Filters ({selectedTags.length})
              </span>
              <button
                onClick={clearFilters}
                className="
                  px-1.5 md:px-2 py-0.5 md:py-1 text-xs rounded-md
                  text-muted-foreground hover:text-foreground
                  hover:bg-muted/60 transition-colors
                  cursor-pointer
                "
              >
                Clear All
              </button>
            </div>
            <div className="flex flex-wrap gap-1 md:gap-1.5">
              {selectedTags.map((tag) => (
                <span
                  key={tag}
                  className="
                    inline-flex items-center gap-0.5 md:gap-1 px-1.5 md:px-2 py-0.5 md:py-1
                    bg-accent-neon/5 text-accent-neon text-[10px] md:text-xs rounded-md
                    border border-accent-neon/20
                  "
                >
                  {getTagIcon(tag)}
                  {tag.replace('-', ' ')}
                  <button
                    onClick={() => toggleTag(tag)}
                    className="
                      ml-0.5 hover:bg-accent-neon/20 rounded-full p-0.5
                      transition-colors duration-200
                    "
                    aria-label={`Remove ${tag} filter`}
                  >
                    <X className="h-2.5 w-2.5" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Tag sections */}
        <div className="space-y-4 md:space-y-6">
          {/* Featured Tags */}
          <div>
            <div className="flex items-center gap-1.5 md:gap-2 mb-2 md:mb-4">
              <Star className="h-3.5 w-3.5 md:h-4 md:w-4 text-accent-purple" />
              <span className="text-sm md:text-base font-semibold text-foreground">
                Featured Tags
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5 md:gap-2">
              {PRIORITY_TAGS.map((tag) => {
                const isSelected = isTagSelected(tag);
                return (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`
                      inline-flex items-center gap-1 md:gap-2 px-2 md:px-3 py-1 md:py-1.5 rounded-full text-[10px] md:text-xs font-medium
                      transition-all duration-200 border hover:scale-105
                      ${
                        isSelected
                          ? 'bg-accent-neon/20 text-accent-neon border-accent-neon/40 ring-1 md:ring-2 ring-accent-neon/30 shadow-md md:shadow-lg'
                          : 'bg-muted/40 text-foreground/80 border-border/40 hover:bg-muted/60 hover:border-border/60 hover:shadow-md'
                      }
                    `}
                  >
                    {getTagIcon(tag)}
                    <span>{tag.replace('-', ' ')}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* All Tags */}
          <div>
            <span className="text-sm md:text-base font-semibold text-foreground mb-2 md:mb-4 block">
              All Tags
            </span>
            <div className="flex flex-wrap gap-1.5 md:gap-2">
              {ALL_TAGS.filter(
                (tag) => !PRIORITY_TAGS.includes(tag)
              ).map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`
                    inline-flex items-center px-2 md:px-2.5 py-0.5 md:py-1 rounded-full text-[10px] md:text-xs font-medium border
                    transition-all duration-200 hover:scale-105
                    focus:outline-none focus:ring-1 focus:ring-accent-neon/50
                    ${
                      isTagSelected(tag)
                        ? 'bg-accent-neon/20 text-accent-neon border-accent-neon/40 ring-1 ring-accent-neon/30 shadow-md'
                        : 'bg-muted/40 text-foreground/70 border-border/40 hover:bg-muted/60 hover:border-border/60 hover:shadow-sm'
                    }
                  `}
                >
                  {tag.replace('-', ' ')}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Panel footer */}
        <div className="flex items-center justify-between text-[10px] md:text-xs text-muted-foreground pt-2 border-t border-border/20">
          <span>Click tags to add or remove filters</span>
          <span>
            {selectedTags.length} of {ALL_TAGS.length} tags selected
          </span>
        </div>
      </div>
    </div>
  );
}
