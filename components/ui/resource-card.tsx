'use client';

import React from 'react';
import { Icon } from '@iconify/react';
import { cn } from '@/lib/utils';
import { BookmarkButton } from '@/components/ui/bookmark-button';

// Map of resource titles to iconify icon names
const ICON_MAP: Record<string, string> = {
  // Learning Resources
  'Frontend Masters': 'simple-icons:frontendmasters',
  'Epic Web': 'simple-icons:epicgames',
  'MDN Web Docs': 'simple-icons:mdnwebdocs',
  freeCodeCamp: 'simple-icons:freecodecamp',
  'Wes Bos': 'simple-icons:wesbos',
  Codecademy: 'simple-icons:codecademy',
  'web.dev': 'simple-icons:google',
  'JavaScript: The Good Parts': 'simple-icons:javascript',
  'Testing JavaScript': 'simple-icons:testinglibrary',
  'Epic React': 'simple-icons:react',
  'Build UI': 'simple-icons:uikit',
  'Great Frontend': 'simple-icons:frontendmentor',
  'Learn With Jason': 'simple-icons:twitch',
  // Developer Tools
  'Visual Studio Code': 'simple-icons:visualstudiocode',
  GitHub: 'simple-icons:github',
  Figma: 'simple-icons:figma',
  Vercel: 'simple-icons:vercel',
  Turso: 'simple-icons:sqlite',
  AWS: 'simple-icons:amazonaws',
  'Google Cloud': 'simple-icons:googlecloud',
  Unsplash: 'simple-icons:unsplash',
  Netlify: 'simple-icons:netlify',
  ChatGPT: 'simple-icons:openai',
  'Google Gemini': 'simple-icons:google',
  // Frameworks & Libraries
  React: 'simple-icons:react',
  'Vue.js': 'simple-icons:vuedotjs',
  Angular: 'simple-icons:angular',
  Svelte: 'simple-icons:svelte',
  Qwik: 'simple-icons:qwik',
  'Alpine.js': 'simple-icons:alpinedotjs',
  Lit: 'simple-icons:lit',
  htmx: 'simple-icons:html5',
  'Next.js': 'simple-icons:nextdotjs',
  Remix: 'simple-icons:remix',
  // Communities
  'Stack Overflow': 'simple-icons:stackoverflow',
  'DEV Community': 'simple-icons:devdotto',
  'GitHub Discussions': 'simple-icons:github',
  Reddit: 'simple-icons:reddit',
  Discord: 'simple-icons:discord',
  'Twitter/X': 'simple-icons:x',
  // Blogs
  'CSS-Tricks': 'simple-icons:css3',
  'Smashing Magazine': 'simple-icons:smashingmagazine',
  'Kent C. Dodds': 'simple-icons:hashnode',
  'Josh W. Comeau': 'simple-icons:hashnode',
  'Lee Robinson': 'simple-icons:vercel',
  'Tao of Node': 'simple-icons:nodedotjs',
};

type ResourceCardProps = {
  resource: {
    title: string;
    href: string;
    description: string;
    section?: string;
  };
  accentColor: 'neon' | 'purple';
};

export default function ResourceCard({
  resource,
  accentColor,
}: ResourceCardProps) {
  // If section is not provided, try to determine it from the context
  const resourceWithSection = {
    ...resource,
    section: resource.section || determineSection(resource.title),
  };
  const resourceId = resource.title
    .toLowerCase()
    .replace(/\s+/g, '-');

  // Get the icon from the map based on resource title
  const iconName =
    ICON_MAP[resource.title] || 'material-symbols:list'; // Default icon
    
  // Function to determine section based on resource title if not provided
  function determineSection(title: string): string {
    // Map titles to their respective sections based on ICON_MAP categorization
    if (['Frontend Masters', 'Epic Web', 'MDN Web Docs', 'freeCodeCamp', 'Wes Bos', 'Codecademy', 'web.dev', 'JavaScript: The Good Parts', 'Testing JavaScript', 'Epic React', 'Build UI', 'Great Frontend', 'Learn With Jason'].includes(title)) {
      return 'Learning Resources';
    } else if (['Visual Studio Code', 'GitHub', 'Figma', 'Vercel', 'Turso', 'AWS', 'Google Cloud', 'Unsplash', 'Netlify', 'ChatGPT', 'Google Gemini'].includes(title)) {
      return 'Developer Tools';
    } else if (['React', 'Vue.js', 'Angular', 'Svelte', 'Qwik', 'Alpine.js', 'Lit', 'htmx', 'Next.js', 'Remix'].includes(title)) {
      return 'Frameworks & Libraries';
    } else if (['Stack Overflow', 'DEV Community', 'GitHub Discussions', 'Reddit', 'Discord', 'Twitter/X'].includes(title)) {
      return 'Communities';
    } else if (['CSS-Tricks', 'Smashing Magazine', 'Kent C. Dodds', 'Josh W. Comeau', 'Lee Robinson', 'Tao of Node'].includes(title)) {
      return 'Blogs';
    }
    return 'Other';
  }

  return (
    <a
      href={resource.href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'relative flex flex-col h-full rounded-lg transition-all',
        'bg-card border border-border',
        'hover:shadow-lg hover:scale-[1.01]',
        accentColor === 'neon'
          ? 'hover:border-neon hover:shadow-neon/10'
          : 'hover:border-purple hover:shadow-purple/10'
      )}
      key={resourceId}
      id={resourceId}
      aria-labelledby={`title-${resourceId}`}
    >
      <div className="flex items-center justify-between p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <Icon
            icon={iconName}
            className={cn(
              'h-8 w-8',
              accentColor === 'neon' ? 'text-neon' : 'text-purple'
            )}
            aria-hidden="true"
          />
          <h3
            id={`title-${resourceId}`}
            className="text-lg font-semibold"
          >
            {resource.title}
          </h3>
        </div>
        <BookmarkButton 
          resource={resourceWithSection} 
          size="md" 
          className="z-10"
        />
      </div>
      <div className="p-6 flex-grow">
        <p className="text-foreground-muted">
          {resource.description}
        </p>
      </div>
    </a>
  );
}
