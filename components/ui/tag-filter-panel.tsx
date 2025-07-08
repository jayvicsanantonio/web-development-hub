'use client';

import { useEffect, useRef } from 'react';
import { useSearch } from '@/contexts/search-context';
import { X, Star } from 'lucide-react';
import { Icon } from '@iconify/react';

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

// Get icon for specific priority tags - using same icons as resource card
const getTagIcon = (tag: string) => {
  switch (tag) {
    case 'ai':
      return <Icon icon="mdi:robot" className="h-3 w-3" />;
    case 'interview-prep':
      return <Icon icon="mdi:account-tie" className="h-3 w-3" />;
    case 'free':
      return <Icon icon="mdi:gift" className="h-3 w-3" />;
    case 'beginner-friendly':
      return <Icon icon="mdi:school" className="h-3 w-3" />;
    case 'trending':
      return <Icon icon="mdi:trending-up" className="h-3 w-3" />;
    default:
      return null;
  }
};

export function TagFilterPanel({
  isOpen,
  onClose,
}: TagFilterPanelProps) {
  const { selectedTags, setSelectedTags, clearFilters } = useSearch();
  const panelRef = useRef<HTMLDivElement>(null);

  // Close panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const formatTagDisplay = (tag: string) => {
    return tag.replace(/-/g, ' ');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4">
      {/* Backdrop - no blur */}
      <div
        className="absolute inset-0 bg-black/20"
        onClick={onClose}
      />

      {/* Panel - glass-like style matching search input */}
      <div
        ref={panelRef}
        className="
          relative w-full max-w-2xl
          bg-background-secondary/80 backdrop-blur-md
          border border-white/20 rounded-2xl
          shadow-md
          p-6 max-h-[80vh] overflow-y-auto
          animate-in slide-in-from-top-4 duration-300
        "
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              Filter by Tags
            </h3>
            <p className="text-sm text-foreground/70 mt-1">
              Select tags to filter resources. Multiple tags will show
              resources containing any of the selected tags.
            </p>
          </div>
          <div className="flex items-center gap-2">
            {selectedTags.length > 0 && (
              <button
                onClick={clearFilters}
                className="
                  px-3 py-1.5 text-sm rounded-lg
                  bg-red-500/10 text-red-500 
                  hover:bg-red-500/20 transition-colors
                  focus:outline-none focus:ring-2 focus:ring-red-500/50
                "
              >
                Clear All
              </button>
            )}
            <button
              onClick={onClose}
              className="
                p-2 rounded-lg 
                hover:bg-foreground/10 transition-colors
                focus:outline-none focus:ring-2 focus:ring-accent-neon/50
              "
              aria-label="Close filter panel"
            >
              <X className="h-5 w-5 text-foreground/70" />
            </button>
          </div>
        </div>

        {/* Selected tags summary */}
        {selectedTags.length > 0 && (
          <div className="mb-6 p-4 bg-accent-neon/5 rounded-xl border border-accent-neon/20">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-medium text-foreground">
                Active Filters ({selectedTags.length})
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedTags.map((tag) => (
                <span
                  key={tag}
                  className="
                    inline-flex items-center gap-1.5 px-3 py-1.5
                    bg-accent-neon/20 text-accent-neon text-sm rounded-lg
                    border border-accent-neon/30
                  "
                >
                  {PRIORITY_TAGS.includes(tag) && getTagIcon(tag)}
                  {formatTagDisplay(tag)}
                  <button
                    onClick={() => toggleTag(tag)}
                    className="hover:bg-accent-neon/30 rounded p-0.5 transition-colors"
                    aria-label={`Remove ${tag} filter`}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Tag grid */}
        <div className="space-y-6">
          {/* Priority Tags */}
          <div>
            <h4 className="text-sm font-medium text-foreground/80 mb-3 flex items-center gap-2">
              <Star className="h-4 w-4" />
              Featured Tags
            </h4>
            <div className="flex flex-wrap gap-2">
              {PRIORITY_TAGS.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`
                    inline-flex items-center gap-1.5 px-3 py-2
                    rounded-lg border transition-all duration-200
                    focus:outline-none focus:ring-2 focus:ring-accent-neon/50
                    ${
                      selectedTags.includes(tag)
                        ? 'bg-accent-neon/20 text-accent-neon border-accent-neon/40 ring-2 ring-accent-neon/30'
                        : 'bg-foreground/5 text-foreground/80 border-foreground/20 hover:bg-foreground/10 hover:border-foreground/30'
                    }
                  `}
                >
                  {getTagIcon(tag)}
                  <span className="text-sm font-medium">
                    {formatTagDisplay(tag)}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* All Other Tags */}
          <div>
            <h4 className="text-sm font-medium text-foreground/80 mb-3">
              All Tags
            </h4>
            <div className="flex flex-wrap gap-2">
              {ALL_TAGS.filter(
                (tag) => !PRIORITY_TAGS.includes(tag)
              ).map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`
                    px-3 py-1.5 text-sm rounded-lg border
                    transition-all duration-200
                    focus:outline-none focus:ring-2 focus:ring-accent-neon/50
                    ${
                      selectedTags.includes(tag)
                        ? 'bg-accent-neon/15 text-accent-neon border-accent-neon/30'
                        : 'bg-foreground/5 text-foreground/70 border-foreground/15 hover:bg-foreground/10 hover:border-foreground/25'
                    }
                  `}
                >
                  {formatTagDisplay(tag)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-foreground/10 flex justify-between items-center text-xs text-foreground/60">
          <span>Click tags to add or remove filters</span>
          <span>
            {selectedTags.length} of {ALL_TAGS.length} tags selected
          </span>
        </div>
      </div>
    </div>
  );
}
