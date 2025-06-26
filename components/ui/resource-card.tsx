'use client';

import React from 'react';
import { Icon } from '@iconify/react';
import { cn } from '@/lib/utils';

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
  };
  accentColor: 'neon' | 'purple';
};

export default function ResourceCard({
  resource,
  accentColor,
}: ResourceCardProps) {
  const resourceId = resource.title
    .toLowerCase()
    .replace(/\s+/g, '-');

  // Get the icon from the map based on resource title
  const iconName =
    ICON_MAP[resource.title] || 'material-symbols:list'; // Default icon

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
      <div className="flex items-center justify-start gap-3 p-6 border-b border-border">
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
      <div className="p-6 flex-grow">
        <p className="text-foreground-muted">
          {resource.description}
        </p>
      </div>
    </a>
  );
}
