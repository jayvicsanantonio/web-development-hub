# Modern CSS Concepts & Features Guide

*A comprehensive guide to understanding modern CSS features and terminologies used in Tailwind CSS v4*

## 📚 Table of Contents

1. [CSS Custom Properties (Variables)](#css-custom-properties-variables)
2. [CSS Directives & At-Rules](#css-directives--at-rules)
3. [Cascade Layers](#cascade-layers)
4. [Container Queries](#container-queries)
5. [Logical Properties](#logical-properties)
6. [Modern CSS Selectors](#modern-css-selectors)
7. [CSS Functions](#css-functions)
8. [Performance & Optimization](#performance--optimization)
9. [Browser Support & Progressive Enhancement](#browser-support--progressive-enhancement)
10. [Practical Examples](#practical-examples)

---

## CSS Custom Properties (Variables)

### What Are CSS Custom Properties?

CSS Custom Properties (also called CSS Variables) are entities defined by CSS authors that contain specific values to be reused throughout a document.

### Basic Syntax

```css
/* Definition */
:root {
  --primary-color: #3b82f6;
  --spacing-unit: 1rem;
  --border-radius: 0.5rem;
}

/* Usage */
.button {
  background-color: var(--primary-color);
  padding: var(--spacing-unit);
  border-radius: var(--border-radius);
}
```

### Key Features

#### 1. **Scoping**
Unlike Sass variables, CSS custom properties follow normal CSS scoping rules:

```css
:root {
  --color: blue; /* Global scope */
}

.component {
  --color: red; /* Local scope - overrides global */
}

.child {
  color: var(--color); /* Uses closest defined value */
}
```

#### 2. **Runtime Modification**
Can be changed dynamically with JavaScript:

```javascript
// Change theme at runtime
document.documentElement.style.setProperty('--primary-color', '#ef4444');

// Read current value
const currentColor = getComputedStyle(document.documentElement)
  .getPropertyValue('--primary-color');
```

#### 3. **Fallback Values**
Provide fallbacks for better browser support:

```css
.element {
  color: var(--primary-color, #3b82f6); /* Falls back to blue */
  margin: var(--spacing, var(--default-spacing, 1rem)); /* Nested fallbacks */
}
```

### Advanced Patterns

#### **Theme Switching**
```css
:root {
  --bg-color: white;
  --text-color: black;
}

[data-theme="dark"] {
  --bg-color: black;
  --text-color: white;
}

body {
  background-color: var(--bg-color);
  color: var(--text-color);
  transition: background-color 0.3s, color 0.3s;
}
```

#### **Responsive Typography**
```css
:root {
  --font-size-base: clamp(1rem, 2.5vw, 1.25rem);
  --font-size-lg: calc(var(--font-size-base) * 1.25);
  --font-size-xl: calc(var(--font-size-base) * 1.5);
}
```

#### **Component Variations**
```css
.button {
  --button-bg: var(--color-primary);
  --button-color: var(--color-primary-foreground);
  
  background-color: var(--button-bg);
  color: var(--button-color);
}

.button--secondary {
  --button-bg: var(--color-secondary);
  --button-color: var(--color-secondary-foreground);
}
```

### CSS Custom Properties vs Sass Variables

| Feature | CSS Custom Properties | Sass Variables |
|---------|----------------------|----------------|
| **Runtime Changes** | ✅ Yes | ❌ No (compiled) |
| **Browser DevTools** | ✅ Inspectable | ❌ Not visible |
| **Scoping** | ✅ CSS cascade rules | ❌ Lexical scope only |
| **Dynamic Values** | ✅ Calc, viewport units | ✅ Limited to compile time |
| **Performance** | ✅ Native browser support | ✅ No runtime overhead |

---

## CSS Directives & At-Rules

### What Are CSS Directives?

CSS directives (at-rules) are statements that begin with `@` and provide instructions to the CSS processor about how to behave.

### Standard CSS At-Rules

#### **@media** - Media Queries
```css
@media (min-width: 768px) {
  .container {
    max-width: 1200px;
  }
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg-color: #1a1a1a;
  }
}
```

#### **@supports** - Feature Queries
```css
@supports (display: grid) {
  .layout {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
}

@supports not (display: grid) {
  .layout {
    display: flex;
    flex-wrap: wrap;
  }
}
```

#### **@keyframes** - Animations
```css
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-out;
}
```

#### **@import** - Importing Stylesheets
```css
@import url('normalize.css');
@import url('components.css') screen and (min-width: 600px);
```

### Tailwind CSS v4 Specific Directives

#### **@theme** - Theme Configuration
```css
@theme {
  --color-primary: hsl(200 100% 50%);
  --color-secondary: hsl(280 100% 60%);
  
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  
  --radius-none: 0;
  --radius-sm: 0.125rem;
  --radius-md: 0.375rem;
  
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
}
```

#### **@utility** - Custom Utilities
```css
@utility container {
  margin-inline: auto;
  padding-inline: 2rem;
  max-width: 1200px;
}

@utility flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Responsive utilities */
@utility responsive-text {
  font-size: clamp(1rem, 2.5vw, 1.5rem);
  line-height: 1.5;
}
```

#### **@custom-variant** - Custom Variants
```css
/* Dark mode variant */
@custom-variant dark (&:is(.dark *));

/* Group hover variant */
@custom-variant group-hover (&:is(.group:hover *));

/* Custom state variant */
@custom-variant loading (&:is([data-loading="true"] *));

/* Complex variant with multiple conditions */
@custom-variant mobile-dark (&:is(.dark *)) {
  @media (max-width: 767px) {
    /* Styles for mobile dark mode */
  }
}
```

### Advanced Directive Patterns

#### **Conditional Styling with @supports**
```css
@supports (backdrop-filter: blur(10px)) {
  .glass-effect {
    backdrop-filter: blur(10px);
    background: rgba(255, 255, 255, 0.1);
  }
}

@supports not (backdrop-filter: blur(10px)) {
  .glass-effect {
    background: rgba(255, 255, 255, 0.9);
  }
}
```

#### **Progressive Enhancement with @media**
```css
/* Base styles (mobile first) */
.card {
  padding: 1rem;
  background: white;
}

/* Enhanced styles for larger screens */
@media (min-width: 768px) {
  .card {
    padding: 2rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .card {
    border: 2px solid black;
  }
}
```

---

## Cascade Layers

### What Are Cascade Layers?

Cascade layers provide a structured way to organize CSS and control specificity without relying on source order or specificity hacks.

### Basic Syntax

```css
/* Define layer order */
@layer reset, base, components, utilities;

/* Add styles to layers */
@layer reset {
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
}

@layer base {
  body {
    font-family: system-ui, sans-serif;
    line-height: 1.5;
  }
}

@layer components {
  .button {
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    border: none;
    cursor: pointer;
  }
}

@layer utilities {
  .text-center {
    text-align: center;
  }
}
```

### Layer Priority

Layers are resolved in the order they're declared, **not** by specificity:

```css
@layer base, components, utilities;

@layer utilities {
  .text-red { color: red; } /* Wins despite lower specificity */
}

@layer components {
  .my-component .title { color: blue; } /* Higher specificity but loses */
}
```

### Advanced Layer Patterns

#### **Nested Layers**
```css
@layer framework {
  @layer reset, base, components;
  
  @layer reset {
    * { margin: 0; padding: 0; }
  }
  
  @layer base {
    body { font-family: sans-serif; }
  }
  
  @layer components {
    .button { /* styles */ }
  }
}

@layer app {
  @layer components, utilities;
  
  @layer components {
    .custom-button { /* overrides framework button */ }
  }
}
```

#### **Conditional Layers**
```css
@layer base {
  @media (prefers-color-scheme: dark) {
    :root {
      --bg: black;
      --text: white;
    }
  }
}

@layer components {
  @supports (container-type: inline-size) {
    .responsive-component {
      container-type: inline-size;
    }
  }
}
```

### Benefits of Cascade Layers

1. **Predictable Specificity**: Layer order matters more than selector specificity
2. **Better Organization**: Clear separation of concerns
3. **Easier Maintenance**: No more `!important` hacks
4. **Framework Integration**: Multiple CSS frameworks can coexist

---

## Container Queries

### What Are Container Queries?

Container queries allow you to style elements based on the size of their containing element, not the viewport.

### Basic Syntax

```css
/* Define a container */
.sidebar {
  container-type: inline-size;
  container-name: sidebar;
}

/* Query the container */
@container sidebar (width >= 300px) {
  .sidebar-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}

/* Anonymous container query */
.card-container {
  container-type: inline-size;
}

@container (width >= 400px) {
  .card {
    display: flex;
    gap: 1rem;
  }
}
```

### Container Types

#### **inline-size**
```css
.container {
  container-type: inline-size; /* Width only */
}

@container (width >= 400px) {
  /* Responds to width changes */
}
```

#### **block-size**
```css
.container {
  container-type: block-size; /* Height only */
}

@container (height >= 300px) {
  /* Responds to height changes */
}
```

#### **size**
```css
.container {
  container-type: size; /* Both width and height */
}

@container (width >= 400px) and (height >= 300px) {
  /* Responds to both dimensions */
}
```

### Advanced Container Query Patterns

#### **Responsive Component Design**
```css
.article-card {
  container-type: inline-size;
  container-name: article;
}

/* Compact layout for narrow containers */
@container article (width < 300px) {
  .article-card .image {
    width: 100%;
    height: 120px;
    object-fit: cover;
  }
  
  .article-card .content {
    padding: 0.75rem;
  }
  
  .article-card .title {
    font-size: 1rem;
    line-height: 1.3;
  }
}

/* Standard layout for medium containers */
@container article (width >= 300px) and (width < 500px) {
  .article-card {
    display: flex;
    gap: 1rem;
  }
  
  .article-card .image {
    width: 120px;
    height: 120px;
    flex-shrink: 0;
  }
}

/* Enhanced layout for wide containers */
@container article (width >= 500px) {
  .article-card {
    display: grid;
    grid-template-columns: 200px 1fr;
    gap: 1.5rem;
  }
  
  .article-card .image {
    width: 100%;
    height: 150px;
  }
  
  .article-card .content {
    padding: 1rem;
  }
}
```

#### **Container Query Units**
```css
.container {
  container-type: inline-size;
}

@container (width >= 400px) {
  .element {
    /* Container query units */
    width: 50cqw;      /* 50% of container width */
    height: 25cqh;     /* 25% of container height */
    font-size: 4cqi;   /* 4% of container inline size */
    margin: 2cqb;      /* 2% of container block size */
    padding: 1cqmin;   /* 1% of container's smaller dimension */
    gap: 2cqmax;       /* 2% of container's larger dimension */
  }
}
```

### Container Queries vs Media Queries

| Feature | Container Queries | Media Queries |
|---------|------------------|---------------|
| **Reference Point** | Container size | Viewport size |
| **Modularity** | ✅ High | ❌ Limited |
| **Reusability** | ✅ Context-aware | ❌ Global only |
| **Component Design** | ✅ Perfect fit | ❌ Breaks modularity |
| **Browser Support** | ⚠️ Modern browsers | ✅ Universal |

### Practical Use Cases

1. **Sidebar Components**: Adapt based on sidebar width, not screen size
2. **Card Layouts**: Different layouts for different container sizes
3. **Navigation Menus**: Collapse/expand based on available space
4. **Form Elements**: Responsive form layouts within containers
5. **Dashboard Widgets**: Self-contained responsive widgets

---

## Logical Properties

### What Are Logical Properties?

Logical properties are CSS properties that map to physical properties based on the writing mode and direction of the content.

### Physical vs Logical Properties

#### **Physical Properties** (Traditional)
```css
.element {
  margin-top: 1rem;
  margin-right: 2rem;
  margin-bottom: 1rem;
  margin-left: 2rem;
  
  padding-top: 0.5rem;
  padding-right: 1rem;
  padding-bottom: 0.5rem;
  padding-left: 1rem;
  
  border-top: 1px solid black;
  border-right: 2px solid black;
  border-bottom: 1px solid black;
  border-left: 2px solid black;
}
```

#### **Logical Properties** (Modern)
```css
.element {
  margin-block: 1rem;     /* top and bottom */
  margin-inline: 2rem;    /* left and right in LTR */
  
  padding-block: 0.5rem;  /* top and bottom */
  padding-inline: 1rem;   /* left and right in LTR */
  
  border-block: 1px solid black;  /* top and bottom */
  border-inline: 2px solid black; /* left and right in LTR */
}
```

### Complete Logical Property Mapping

#### **Margins**
```css
/* Physical → Logical */
margin-top    → margin-block-start
margin-right  → margin-inline-end
margin-bottom → margin-block-end
margin-left   → margin-inline-start

/* Shorthand */
margin-block: 1rem 2rem;   /* block-start block-end */
margin-inline: 1rem 2rem;  /* inline-start inline-end */
```

#### **Padding**
```css
/* Physical → Logical */
padding-top    → padding-block-start
padding-right  → padding-inline-end
padding-bottom → padding-block-end
padding-left   → padding-inline-start

/* Shorthand */
padding-block: 1rem;   /* both block directions */
padding-inline: 2rem;  /* both inline directions */
```

#### **Borders**
```css
/* Physical → Logical */
border-top    → border-block-start
border-right  → border-inline-end
border-bottom → border-block-end
border-left   → border-inline-start

/* Border radius */
border-top-left-radius     → border-start-start-radius
border-top-right-radius    → border-start-end-radius
border-bottom-right-radius → border-end-end-radius
border-bottom-left-radius  → border-end-start-radius
```

#### **Positioning**
```css
/* Physical → Logical */
top    → inset-block-start
right  → inset-inline-end
bottom → inset-block-end
left   → inset-inline-start

/* Shorthand */
inset-block: 10px 20px;   /* block-start block-end */
inset-inline: 10px 20px;  /* inline-start inline-end */
inset: 10px 20px 30px 40px; /* all four directions */
```

#### **Sizing**
```css
/* Physical → Logical */
width  → inline-size
height → block-size

min-width  → min-inline-size
min-height → min-block-size

max-width  → max-inline-size
max-height → max-block-size
```

### Writing Modes and Text Direction

#### **Writing Mode Examples**
```css
/* Horizontal, left-to-right (default) */
.horizontal-lr {
  writing-mode: horizontal-tb;
  direction: ltr;
}

/* Horizontal, right-to-left */
.horizontal-rl {
  writing-mode: horizontal-tb;
  direction: rtl;
}

/* Vertical, right-to-left */
.vertical-rl {
  writing-mode: vertical-rl;
}

/* Vertical, left-to-right */
.vertical-lr {
  writing-mode: vertical-lr;
}
```

#### **How Logical Properties Adapt**
```css
.card {
  margin-inline: 1rem;  /* Adapts to text direction */
  padding-block: 2rem;  /* Always vertical in writing mode */
  border-inline-start: 3px solid blue; /* Leading edge */
}

/* In LTR: margin-left: 1rem; margin-right: 1rem; */
/* In RTL: margin-right: 1rem; margin-left: 1rem; */
/* In vertical: margin-top: 1rem; margin-bottom: 1rem; */
```

### Practical Examples

#### **Internationalization-Ready Components**
```css
.button {
  padding-inline: 1rem;           /* Horizontal padding */
  padding-block: 0.5rem;          /* Vertical padding */
  margin-inline-end: 0.5rem;      /* Trailing margin */
  border-inline-start: 3px solid; /* Leading border */
  text-align: start;               /* Align to reading direction */
}

.form-field {
  margin-block-end: 1rem;         /* Bottom margin */
  
  .label {
    margin-block-end: 0.25rem;    /* Space below label */
    text-align: start;             /* Align to reading direction */
  }
  
  .input {
    inline-size: 100%;             /* Full width */
    padding-inline: 0.75rem;       /* Horizontal padding */
    padding-block: 0.5rem;         /* Vertical padding */
  }
}
```

#### **RTL-Aware Navigation**
```css
.navigation {
  .nav-item {
    margin-inline-end: 1rem;       /* Space after each item */
    
    &:last-child {
      margin-inline-end: 0;        /* No space after last item */
    }
  }
  
  .nav-link {
    padding-inline: 0.75rem;       /* Horizontal padding */
    padding-block: 0.5rem;         /* Vertical padding */
    border-radius: 0.25rem;
    
    &::after {
      content: '→';
      margin-inline-start: 0.5rem; /* Space before arrow */
    }
  }
}

/* In RTL, the arrow automatically becomes ← and spacing flips */
```

### Browser Support Considerations

```css
/* Progressive enhancement approach */
.element {
  /* Fallback for older browsers */
  margin-left: 1rem;
  margin-right: 1rem;
  
  /* Modern browsers */
  margin-inline: 1rem;
}

/* Feature detection */
@supports (margin-inline: 1rem) {
  .element {
    margin-left: unset;
    margin-right: unset;
    margin-inline: 1rem;
  }
}
```

---

## Modern CSS Selectors

### Advanced Pseudo-Classes

#### **:is()** - Matches any of the selectors
```css
/* Instead of this */
h1:hover, h2:hover, h3:hover {
  color: blue;
}

/* Use this */
:is(h1, h2, h3):hover {
  color: blue;
}

/* Complex example */
:is(.card, .panel) :is(h1, h2, h3) {
  margin-block-start: 0;
}
```

#### **:where()** - Same as :is() but with 0 specificity
```css
/* These have different specificity */
:is(.a, .b) .c { /* Specificity: 0,2,0 */ }
:where(.a, .b) .c { /* Specificity: 0,1,0 */ }

/* Use :where() for base styles that should be easily overridden */
:where(h1, h2, h3, h4, h5, h6) {
  margin-block: 0;
  font-weight: inherit;
}
```

#### **:has()** - Parent selector (relational pseudo-class)
```css
/* Style a card that contains an image */
.card:has(img) {
  display: grid;
  grid-template-columns: 200px 1fr;
}

/* Style a form that has invalid inputs */
form:has(input:invalid) {
  border: 2px solid red;
}

/* Style previous siblings */
.tab:has(+ .tab:hover) {
  opacity: 0.7;
}
```

#### **:not()** - Negation pseudo-class
```css
/* Select all buttons except primary ones */
button:not(.primary) {
  background: gray;
}

/* Complex negation */
.list-item:not(:first-child):not(:last-child) {
  border-block: 1px solid;
}

/* Multiple selectors (modern browsers) */
input:not([type="radio"], [type="checkbox"]) {
  border: 1px solid;
}
```

### State-Based Selectors

#### **:focus-visible** - Keyboard-only focus
```css
/* Only show focus ring for keyboard users */
button:focus-visible {
  outline: 2px solid blue;
  outline-offset: 2px;
}

/* Hide focus ring for mouse users */
button:focus:not(:focus-visible) {
  outline: none;
}
```

#### **:target** - URL fragment target
```css
.section:target {
  background: yellow;
  scroll-margin-block-start: 2rem; /* Account for fixed header */
}

/* Smooth scroll to target */
html {
  scroll-behavior: smooth;
}
```

#### **:user-invalid** - User interaction required
```css
/* Only show error state after user interaction */
input:user-invalid {
  border-color: red;
}

/* vs :invalid which triggers immediately */
input:invalid {
  /* Might be annoying if it triggers on page load */
}
```

### Tree-Structural Selectors

#### **:nth-child()** variants
```css
/* Select every 3rd item */
.item:nth-child(3n) {
  background: lightblue;
}

/* Select first 3 items */
.item:nth-child(-n+3) {
  font-weight: bold;
}

/* Select all but first 2 and last 2 */
.item:nth-child(n+3):nth-last-child(n+3) {
  margin-inline: 1rem;
}
```

#### **:only-child** and **:only-of-type**
```css
/* Style when there's only one child */
.container .item:only-child {
  text-align: center;
  margin-inline: auto;
}

/* Style when there's only one heading */
.section h2:only-of-type {
  border-block-end: 2px solid;
}
```

---

## CSS Functions

### Mathematical Functions

#### **calc()** - Mathematical calculations
```css
.element {
  width: calc(100% - 2rem);
  height: calc(100vh - var(--header-height));
  margin: calc(var(--spacing) * 2);
  font-size: calc(1rem + 0.5vw);
}
```

#### **clamp()** - Responsive values with min/max
```css
.responsive-text {
  /* min, preferred, max */
  font-size: clamp(1rem, 4vw, 2rem);
  margin-block: clamp(0.5rem, 2vw, 1.5rem);
}

.container {
  width: clamp(320px, 90%, 1200px);
  padding-inline: clamp(1rem, 5%, 3rem);
}
```

#### **min()** and **max()** - Choose between values
```css
.element {
  width: min(90%, 1200px);        /* Smaller of 90% or 1200px */
  height: max(200px, 50vh);       /* Larger of 200px or 50vh */
  margin: max(1rem, 3vw);         /* Responsive margin */
}
```

### Color Functions

#### **hsl()** and **oklch()** - Modern color spaces
```css
:root {
  /* HSL - good for color manipulation */
  --primary-hue: 200;
  --primary-saturation: 100%;
  --primary-lightness: 50%;
  
  --primary: hsl(var(--primary-hue) var(--primary-saturation) var(--primary-lightness));
  --primary-light: hsl(var(--primary-hue) var(--primary-saturation) 70%);
  --primary-dark: hsl(var(--primary-hue) var(--primary-saturation) 30%);
}

/* OKLCH - perceptually uniform (future) */
.modern-colors {
  color: oklch(0.7 0.15 180); /* Lightness, Chroma, Hue */
}
```

#### **color-mix()** - Blend colors
```css
.element {
  /* Mix 80% primary with 20% white */
  background: color-mix(in srgb, var(--primary) 80%, white);
  
  /* Create hover state */
  &:hover {
    background: color-mix(in srgb, var(--primary) 90%, black);
  }
}
```

### Layout Functions

#### **repeat()** - Grid repetition
```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-template-rows: repeat(3, minmax(100px, auto));
}
```

#### **minmax()** - Grid sizing
```css
.grid-container {
  display: grid;
  grid-template-columns: 
    minmax(200px, 1fr)    /* Sidebar: min 200px, max available */
    minmax(0, 3fr)        /* Main: min 0, max 3 times sidebar */
    minmax(150px, 1fr);   /* Aside: min 150px, max available */
}
```

### Transform Functions

#### **transform** combinations
```css
.element {
  /* Individual transforms */
  transform: translateX(50px) rotate(45deg) scale(1.2);
  
  /* 3D transforms */
  transform: translate3d(10px, 20px, 0) rotateY(180deg);
  
  /* Transform origin */
  transform-origin: center bottom;
}

/* Hardware acceleration */
.gpu-accelerated {
  transform: translateZ(0); /* Trigger hardware acceleration */
  will-change: transform;   /* Hint to browser */
}
```

---

## Performance & Optimization

### CSS Performance Best Practices

#### **1. Efficient Selectors**
```css
/* Good - Efficient selectors */
.component { }
.component__element { }
.component--modifier { }

/* Bad - Inefficient selectors */
div > ul > li > a { }           /* Slow descendant chain */
.container .card .title span { } /* Too specific */
[data-role*="component"] { }     /* Slow attribute matching */
```

#### **2. Hardware Acceleration**
```css
.optimized-animation {
  /* Properties that trigger GPU acceleration */
  transform: translateZ(0);
  will-change: transform, opacity;
  
  /* Use transform instead of position changes */
  transition: transform 0.3s ease;
}

/* Avoid these for animations */
.slow-animation {
  transition: 
    left 0.3s ease,      /* Triggers layout */
    width 0.3s ease,     /* Triggers layout */
    background 0.3s ease; /* Triggers paint */
}
```

#### **3. Critical CSS Patterns**
```css
/* Inline critical styles */
.above-fold {
  display: grid;
  grid-template-columns: 1fr 300px;
  min-height: 100vh;
}

/* Load non-critical styles later */
@media (min-width: 768px) {
  .enhanced-layout {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);
  }
}
```

### CSS Architecture Patterns

#### **BEM with Logical Properties**
```css
/* Block */
.card {
  padding-block: 1rem;
  padding-inline: 1.5rem;
  border: 1px solid var(--border-color);
}

/* Element */
.card__header {
  margin-block-end: 1rem;
  padding-block-end: 0.5rem;
  border-block-end: 1px solid var(--border-color);
}

.card__content {
  margin-block-end: 1rem;
}

.card__footer {
  margin-block-start: auto;
  padding-block-start: 0.5rem;
}

/* Modifiers */
.card--featured {
  border-inline-start: 4px solid var(--accent-color);
}

.card--compact {
  padding-block: 0.5rem;
  padding-inline: 1rem;
}
```

#### **Utility-First with Custom Properties**
```css
/* Base utilities */
.p-4 { padding: var(--spacing-4); }
.p-inline-4 { padding-inline: var(--spacing-4); }
.p-block-4 { padding-block: var(--spacing-4); }

.text-primary { color: var(--color-primary); }
.bg-primary { background-color: var(--color-primary); }

/* Component compositions */
.btn {
  @apply p-inline-4 p-block-2 text-primary bg-white border border-primary;
  transition: all 0.2s ease;
}

.btn:hover {
  @apply bg-primary text-white;
}
```

---

## Browser Support & Progressive Enhancement

### Feature Detection Strategies

#### **CSS Feature Queries**
```css
/* Base styles for all browsers */
.layout {
  display: block;
}

/* Enhanced styles for grid-supporting browsers */
@supports (display: grid) {
  .layout {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
  }
}

/* Fallback for non-grid browsers */
@supports not (display: grid) {
  .layout {
    display: flex;
    flex-wrap: wrap;
  }
  
  .layout > * {
    flex: 1 1 250px;
    margin: 0.5rem;
  }
}
```

#### **Container Query Fallbacks**
```css
/* Base responsive design with media queries */
.component {
  display: block;
}

@media (min-width: 600px) {
  .component {
    display: flex;
    gap: 1rem;
  }
}

/* Enhanced with container queries where supported */
@supports (container-type: inline-size) {
  .component-container {
    container-type: inline-size;
  }
  
  @container (width >= 400px) {
    .component {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }
  }
}
```

#### **Logical Properties Fallbacks**
```css
/* Progressive enhancement approach */
.element {
  /* Physical properties (fallback) */
  margin-left: 1rem;
  margin-right: 1rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}

@supports (margin-inline: 1rem) {
  .element {
    /* Remove physical properties */
    margin-left: unset;
    margin-right: unset;
    padding-left: unset;
    padding-right: unset;
    
    /* Use logical properties */
    margin-inline: 1rem;
    padding-inline: 0.5rem;
  }
}
```

### Browser Support Matrix

| Feature | Chrome | Firefox | Safari | Edge | Support Level |
|---------|--------|---------|--------|------|---------------|
| **CSS Custom Properties** | 49+ | 31+ | 9.1+ | 16+ | ✅ Universal |
| **CSS Grid** | 57+ | 52+ | 10.1+ | 16+ | ✅ Universal |
| **Container Queries** | 105+ | 110+ | 16+ | 105+ | ⚠️ Modern |
| **Logical Properties** | 69+ | 66+ | 12.1+ | 79+ | ⚠️ Modern |
| **:focus-visible** | 86+ | 85+ | 15.4+ | 86+ | ⚠️ Modern |
| **:has()** | 105+ | 121+ | 15.4+ | 105+ | ⚠️ Modern |
| **Cascade Layers** | 99+ | 97+ | 15.4+ | 99+ | ⚠️ Modern |

---

## Practical Examples

### Complete Component Example

```css
/* Component using modern CSS features */
@layer components {
  .article-card {
    /* Container for container queries */
    container-type: inline-size;
    container-name: article-card;
    
    /* Base styles with logical properties */
    padding-block: var(--spacing-md);
    padding-inline: var(--spacing-md);
    margin-block-end: var(--spacing-lg);
    
    /* Custom properties for theming */
    background: var(--card-bg, white);
    color: var(--card-text, black);
    border: 1px solid var(--card-border, #e5e5e5);
    border-radius: var(--radius-md);
    
    /* Performance optimization */
    will-change: transform;
    transition: transform 0.2s ease;
  }
  
  /* Hover state with hardware acceleration */
  .article-card:hover {
    transform: translateY(-2px);
  }
  
  /* Enhanced focus for accessibility */
  .article-card:focus-visible {
    outline: 2px solid var(--focus-color);
    outline-offset: 2px;
  }
  
  /* Container query responsive design */
  @container article-card (width >= 400px) {
    .article-card {
      display: grid;
      grid-template-columns: 120px 1fr;
      gap: var(--spacing-md);
      padding-block: var(--spacing-lg);
    }
    
    .article-card__image {
      block-size: 80px;
      inline-size: 100%;
      object-fit: cover;
      border-radius: var(--radius-sm);
    }
  }
  
  @container article-card (width >= 600px) {
    .article-card {
      grid-template-columns: 200px 1fr;
    }
    
    .article-card__image {
      block-size: 120px;
    }
    
    .article-card__content {
      padding-inline-start: var(--spacing-md);
    }
  }
  
  /* Dark theme variant */
  .article-card:where(.dark *) {
    --card-bg: var(--dark-card-bg);
    --card-text: var(--dark-card-text);
    --card-border: var(--dark-card-border);
  }
  
  /* RTL support with logical properties */
  .article-card__meta {
    margin-block-start: var(--spacing-sm);
    text-align: start; /* Respects text direction */
  }
  
  .article-card__date {
    margin-inline-end: var(--spacing-sm);
    color: var(--text-muted);
  }
  
  /* Reduced motion support */
  @media (prefers-reduced-motion: reduce) {
    .article-card {
      transition: none;
    }
    
    .article-card:hover {
      transform: none;
    }
  }
}
```

### Theme System Example

```css
@layer theme {
  /* Base theme using custom properties */
  :root {
    /* Color system */
    --hue-primary: 200;
    --hue-secondary: 280;
    
    --color-primary: hsl(var(--hue-primary) 100% 50%);
    --color-primary-light: hsl(var(--hue-primary) 100% 70%);
    --color-primary-dark: hsl(var(--hue-primary) 100% 30%);
    
    --color-secondary: hsl(var(--hue-secondary) 100% 60%);
    --color-secondary-light: hsl(var(--hue-secondary) 100% 80%);
    --color-secondary-dark: hsl(var(--hue-secondary) 100% 40%);
    
    /* Spacing system */
    --spacing-unit: 0.25rem;
    --spacing-xs: calc(var(--spacing-unit) * 1);
    --spacing-sm: calc(var(--spacing-unit) * 2);
    --spacing-md: calc(var(--spacing-unit) * 4);
    --spacing-lg: calc(var(--spacing-unit) * 6);
    --spacing-xl: calc(var(--spacing-unit) * 8);
    
    /* Typography system */
    --font-size-xs: clamp(0.75rem, 2vw, 0.875rem);
    --font-size-sm: clamp(0.875rem, 2.2vw, 1rem);
    --font-size-base: clamp(1rem, 2.5vw, 1.125rem);
    --font-size-lg: clamp(1.125rem, 3vw, 1.25rem);
    --font-size-xl: clamp(1.25rem, 3.5vw, 1.5rem);
    
    /* Border radius system */
    --radius-xs: 0.125rem;
    --radius-sm: 0.25rem;
    --radius-md: 0.375rem;
    --radius-lg: 0.5rem;
    --radius-xl: 0.75rem;
    
    /* Animation system */
    --duration-fast: 0.15s;
    --duration-normal: 0.3s;
    --duration-slow: 0.5s;
    
    --easing-ease: ease;
    --easing-ease-in: ease-in;
    --easing-ease-out: ease-out;
    --easing-ease-in-out: ease-in-out;
  }
  
  /* Dark theme */
  .dark {
    --color-primary: hsl(var(--hue-primary) 80% 60%);
    --color-primary-light: hsl(var(--hue-primary) 80% 80%);
    --color-primary-dark: hsl(var(--hue-primary) 80% 40%);
    
    --color-secondary: hsl(var(--hue-secondary) 70% 70%);
    --color-secondary-light: hsl(var(--hue-secondary) 70% 90%);
    --color-secondary-dark: hsl(var(--hue-secondary) 70% 50%);
  }
  
  /* High contrast theme */
  @media (prefers-contrast: high) {
    :root {
      --color-primary: hsl(var(--hue-primary) 100% 40%);
      --color-secondary: hsl(var(--hue-secondary) 100% 50%);
    }
  }
  
  /* Reduced motion */
  @media (prefers-reduced-motion: reduce) {
    :root {
      --duration-fast: 0.01ms;
      --duration-normal: 0.01ms;
      --duration-slow: 0.01ms;
    }
  }
}
```

This comprehensive guide covers all the modern CSS concepts and features that are essential for understanding and working with Tailwind CSS v4 and modern web development. Each section provides practical examples and real-world use cases to help developers understand not just the syntax, but the reasoning behind these features.

---

*This guide represents the current state of CSS and will be updated as new features and browser support evolve.*