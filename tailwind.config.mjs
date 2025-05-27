/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'hsl(var(--primary))',
        'on-primary': 'hsl(var(--on-primary))',
        'primary-container': 'hsl(var(--primary-container))',
        'on-primary-container': 'hsl(var(--on-primary-container))',
        secondary: 'hsl(var(--secondary))',
        'on-secondary': 'hsl(var(--on-secondary))',
        'secondary-container': 'hsl(var(--secondary-container))',
        'on-secondary-container': 'hsl(var(--on-secondary-container))',
        tertiary: 'hsl(var(--tertiary))',
        'on-tertiary': 'hsl(var(--on-tertiary))',
        'tertiary-container': 'hsl(var(--tertiary-container))',
        'on-tertiary-container': 'hsl(var(--on-tertiary-container))',
        error: 'hsl(var(--error))',
        'on-error': 'hsl(var(--on-error))',
        'error-container': 'hsl(var(--error-container))',
        'on-error-container': 'hsl(var(--on-error-container))',
        background: 'hsl(var(--background))',
        'on-background': 'hsl(var(--on-background))',
        surface: 'hsl(var(--surface))',
        'on-surface': 'hsl(var(--on-surface))',
        'surface-variant': 'hsl(var(--surface-variant))',
        'on-surface-variant': 'hsl(var(--on-surface-variant))',
        outline: 'hsl(var(--outline))',
        'outline-variant': 'hsl(var(--outline-variant))',
        shadow: 'hsl(var(--shadow))',
        'surface-tint-color': 'hsl(var(--surface-tint-color))',
        
        // Keeping old semantic names for now, mapping to new MD3 roles.
        // These might need review later if direct MD3 role names are preferred in components.
        border: 'hsl(var(--outline))', // Previously --border, now maps to --outline
        input: 'hsl(var(--surface-variant))', // Example: Input background might be surface-variant
        ring: 'hsl(var(--primary))', // Ring color often primary
        
        foreground: 'hsl(var(--on-background))', // General text color
        'primary-foreground': 'hsl(var(--on-primary))', // Text on primary background
        'secondary-foreground': 'hsl(var(--on-secondary))', // Text on secondary background
        'destructive': 'hsl(var(--error))', // Destructive actions color
        'destructive-foreground': 'hsl(var(--on-error))', // Text on destructive background
        'muted': 'hsl(var(--surface-variant))', // Muted backgrounds
        'muted-foreground': 'hsl(var(--on-surface-variant))', // Muted text
        'accent': 'hsl(var(--secondary))', // Accent can map to secondary or tertiary
        'accent-foreground': 'hsl(var(--on-secondary))', // Text on accent
        'popover': 'hsl(var(--surface))', // Popover background
        'popover-foreground': 'hsl(var(--on-surface))', // Popover text
        'card': 'hsl(var(--surface))', // Card background
        'card-foreground': 'hsl(var(--on-surface))', // Card text
      },
      borderRadius: {
        none: '0px',
        xs: 'var(--radius-xs)',
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        full: '9999px',
        DEFAULT: 'var(--radius-sm)',
      },
      boxShadow: {
        'md3-elevation-0': 'none',
        'md3-elevation-1': '0 1px 3px 0 hsla(var(--shadow), 0.15), 0 1px 2px 0 hsla(var(--shadow), 0.30)',
        'md3-elevation-2': '0 2px 6px 0 hsla(var(--shadow), 0.15), 0 1px 2px 0 hsla(var(--shadow), 0.30)',
        'md3-elevation-3': '0 4px 8px 0 hsla(var(--shadow), 0.15), 0 1px 2px 0 hsla(var(--shadow), 0.30)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        heading: ['var(--font-nunito)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
