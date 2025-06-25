import { Resource, Tool, Framework, Community, Blog } from "../types";
export const learningResources: Resource[] = [
  {
    id: "1",
    title: "MDN Web Docs",
    description: "Resources for developers, by developers. Comprehensive documentation for web technologies.",
    url: "https:
    category: "learning",
    tags: ["documentation", "web", "reference"],
    rating: 4.9,
    createdAt: "2020-01-01T00:00:00Z",
    updatedAt: "2025-01-01T00:00:00Z",
    imageUrl: "/images/mdn.png",
    iconifyIcon: "simple-icons:mdnwebdocs",
  },
  {
    id: "2",
    title: "freeCodeCamp",
    description: "Learn to code for free with interactive tutorials and projects.",
    url: "https:
    category: "learning",
    tags: ["tutorials", "interactive", "free"],
    rating: 4.8,
    createdAt: "2020-02-01T00:00:00Z",
    updatedAt: "2025-01-01T00:00:00Z",
    imageUrl: "/images/freecodecamp.png",
    iconifyIcon: "simple-icons:freecodecamp",
  },
  {
    id: "3",
    title: "Frontend Masters",
    description: "Expert-led workshops on frontend development topics.",
    url: "https:
    category: "learning",
    tags: ["workshops", "advanced", "video"],
    rating: 4.7,
    createdAt: "2020-03-01T00:00:00Z",
    updatedAt: "2025-01-01T00:00:00Z",
    imageUrl: "/images/frontendmasters.png",
    iconifyIcon: "simple-icons:frontendmentor",
  },
  {
    id: "4",
    title: "CSS-Tricks",
    description: "Articles, tutorials, and guides for CSS and web development.",
    url: "https:
    category: "learning",
    tags: ["css", "tutorials", "articles"],
    rating: 4.6,
    createdAt: "2020-04-01T00:00:00Z",
    updatedAt: "2025-01-01T00:00:00Z",
    imageUrl: "/images/css-tricks.png",
    iconifyIcon: "logos:css-3",
  },
  {
    id: "5",
    title: "Codecademy",
    description: "Interactive coding lessons for beginners and advanced developers.",
    url: "https:
    category: "learning",
    tags: ["interactive", "lessons", "beginner"],
    rating: 4.5,
    createdAt: "2020-05-01T00:00:00Z",
    updatedAt: "2025-01-01T00:00:00Z",
    imageUrl: "/images/codecademy.png",
  },
  {
    id: "6",
    title: "Web.dev",
    description: "Guidance and analysis for modern web development from Google.",
    url: "https:
    category: "learning",
    tags: ["guides", "performance", "best practices"],
    rating: 4.7,
    createdAt: "2020-06-01T00:00:00Z",
    updatedAt: "2025-01-01T00:00:00Z",
    imageUrl: "/images/web-dev.png",
  },
];
export const developerTools: Tool[] = [
  {
    id: "1",
    title: "VS Code",
    description: "Lightweight but powerful source code editor with built-in support for JavaScript, TypeScript and Node.js.",
    url: "https:
    category: "tools",
    tags: ["editor", "ide", "javascript"],
    rating: 4.9,
    createdAt: "2021-01-01T00:00:00Z",
    updatedAt: "2025-01-01T00:00:00Z",
    imageUrl: "/images/vscode.png",
    iconifyIcon: "vscode-icons:file-type-vscode",
    pricing: "free",
    features: ["Intellisense", "Debugging", "Git integration", "Extensions"],
  },
  {
    id: "2",
    title: "Chrome DevTools",
    description: "Built-in web development tools in Google Chrome for debugging and profiling websites.",
    url: "https:
    category: "tools",
    tags: ["debugging", "performance", "browser"],
    rating: 4.8,
    createdAt: "2020-02-01T00:00:00Z",
    updatedAt: "2025-01-01T00:00:00Z",
    imageUrl: "/images/chrome-devtools.png",
    iconifyIcon: "logos:google-chrome",
    pricing: "free",
    features: ["Elements Panel", "Console", "Network Monitor", "Performance Analysis"],
  },
  {
    id: "3",
    title: "Figma",
    description: "Collaborative interface design tool for creating, prototyping, and sharing designs.",
    url: "https:
    category: "tools",
    tags: ["design", "ui", "collaboration"],
    rating: 4.7,
    createdAt: "2020-03-01T00:00:00Z",
    updatedAt: "2025-01-01T00:00:00Z",
    imageUrl: "/images/figma.png",
    iconifyIcon: "logos:figma",
    pricing: "freemium",
    features: ["Design Tools", "Prototyping", "Collaboration", "Design Systems"],
  },
  {
    id: "4",
    title: "Postman",
    description: "API development platform for testing and documenting APIs.",
    url: "https:
    category: "tools",
    tags: ["api", "testing", "collaboration"],
    rating: 4.6,
    createdAt: "2020-04-01T00:00:00Z",
    updatedAt: "2025-01-01T00:00:00Z",
    imageUrl: "/images/postman.png",
    iconifyIcon: "logos:postman-icon",
    pricing: "freemium",
    features: ["API Testing", "Automation", "API Documentation", "Team Collaboration"],
  },
  {
    id: "5",
    title: "GitHub",
    description: "Web-based hosting service for version control using Git.",
    url: "https:
    category: "tools",
    tags: ["git", "collaboration", "version control"],
    rating: 4.8,
    createdAt: "2020-05-01T00:00:00Z",
    updatedAt: "2025-01-01T00:00:00Z",
    imageUrl: "/images/github.png",
    iconifyIcon: "logos:github-icon",
    pricing: "freemium",
    features: ["Code Hosting", "Pull Requests", "Issue Tracking", "Actions"],
  },
  {
    id: "6",
    title: "Cloudflare",
    description: "Web infrastructure and website security company, providing content delivery network services.",
    url: "https:
    category: "tools",
    tags: ["cdn", "security", "performance"],
    rating: 4.7,
    createdAt: "2020-06-01T00:00:00Z",
    updatedAt: "2025-01-01T00:00:00Z",
    imageUrl: "/images/cloudflare.png",
    iconifyIcon: "logos:cloudflare",
    pricing: "freemium",
    features: ["CDN", "DDoS Protection", "DNS", "Web Optimization"],
  },
];
export const frameworks: Framework[] = [
  {
    id: "1",
    title: "React",
    description: "A JavaScript library for building user interfaces. Declarative, efficient, and flexible.",
    url: "https:
    category: "frameworks",
    tags: ["javascript", "ui", "frontend"],
    rating: 4.8,
    createdAt: "2021-01-01T00:00:00Z",
    updatedAt: "2025-01-01T00:00:00Z",
    imageUrl: "/images/react.png",
    iconifyIcon: "skill-icons:react-dark",
    version: "18.2.0",
    documentation: "https:
    github: "https:
    stars: 200000,
  },
  {
    id: "2",
    title: "Next.js",
    description: "The React framework for production. Hybrid static & server rendering, TypeScript support, and more.",
    url: "https:
    category: "frameworks",
    tags: ["react", "ssr", "typescript"],
    rating: 4.7,
    createdAt: "2020-02-01T00:00:00Z",
    updatedAt: "2025-01-01T00:00:00Z",
    imageUrl: "/images/nextjs.png",
    iconifyIcon: "logos:next-js",
    version: "15.4.0",
    documentation: "https:
    github: "https:
    stars: 110000,
  },
  {
    id: "3",
    title: "Tailwind CSS",
    description: "A utility-first CSS framework packed with classes that can be composed to build any design, directly in your markup.",
    url: "https:
    category: "frameworks",
    tags: ["css", "utility", "design"],
    rating: 4.8,
    createdAt: "2020-03-01T00:00:00Z",
    updatedAt: "2025-01-01T00:00:00Z",
    imageUrl: "/images/tailwindcss.png",
    iconifyIcon: "logos:tailwindcss-icon",
    version: "4.1.4",
    documentation: "https:
    github: "https:
    stars: 71000,
  },
  {
    id: "4",
    title: "Node.js",
    description: "JavaScript runtime built on Chrome's V8 JavaScript engine for server-side development.",
    url: "https:
    category: "frameworks",
    tags: ["javascript", "runtime", "backend"],
    rating: 4.7,
    createdAt: "2020-04-01T00:00:00Z",
    updatedAt: "2025-01-01T00:00:00Z",
    imageUrl: "/images/nodejs.png",
    iconifyIcon: "logos:nodejs-icon",
    version: "21.1.0",
    documentation: "https:
    github: "https:
    stars: 95000,
  },
  {
    id: "5",
    title: "Vue.js",
    description: "Progressive JavaScript framework for building user interfaces.",
    url: "https:
    category: "frameworks",
    tags: ["javascript", "ui", "frontend"],
    rating: 4.7,
    createdAt: "2020-05-01T00:00:00Z",
    updatedAt: "2025-01-01T00:00:00Z",
    imageUrl: "/images/vuejs.png",
    iconifyIcon: "logos:vue",
    version: "3.3.4",
    documentation: "https:
    github: "https:
    stars: 200000,
  },
  {
    id: "6",
    title: "Express.js",
    description: "Fast, unopinionated, minimalist web framework for Node.js.",
    url: "https:
    category: "frameworks",
    tags: ["node", "backend", "server"],
    rating: 4.6,
    createdAt: "2020-06-01T00:00:00Z",
    updatedAt: "2025-01-01T00:00:00Z",
    imageUrl: "/images/expressjs.png",
    iconifyIcon: "logos:express",
    version: "4.18.2",
    documentation: "https:
    github: "https:
    stars: 60000,
  },
];
export const communities: Community[] = [
  {
    id: "1",
    title: "Stack Overflow",
    description: "A public platform for developers to learn, share their knowledge, and build their careers.",
    url: "https:
    category: "communities",
    tags: ["q&a", "knowledge", "solutions"],
    rating: 4.7,
    createdAt: "2021-01-01T00:00:00Z",
    updatedAt: "2025-01-01T00:00:00Z",
    imageUrl: "/images/stackoverflow.png",
    iconifyIcon: "logos:stackoverflow-icon",
    members: 15000000,
    platform: "Web",
    joinUrl: "https:
  },
  {
    id: "2",
    title: "DEV Community",
    description: "A constructive and inclusive social network for software developers.",
    url: "https:
    category: "communities",
    tags: ["blogging", "social", "inclusive"],
    rating: 4.7,
    createdAt: "2020-02-01T00:00:00Z",
    updatedAt: "2025-01-01T00:00:00Z",
    imageUrl: "/images/devto.png",
    iconifyIcon: "logos:dev-dot-to",
    members: 800000,
    platform: "Web",
    joinUrl: "https:
  },
  {
    id: "3",
    title: "Reddit r/webdev",
    description: "A community dedicated to all things web development.",
    url: "https:
    category: "communities",
    tags: ["forum", "discussion", "help"],
    rating: 4.6,
    createdAt: "2020-03-01T00:00:00Z",
    updatedAt: "2025-01-01T00:00:00Z",
    imageUrl: "/images/reddit.png",
    iconifyIcon: "logos:reddit",
    members: 1200000,
    platform: "Reddit",
    joinUrl: "https:
  },
  {
    id: "4",
    title: "Discord - The Coding Den",
    description: "A friendly community focused on programming and developer support.",
    url: "https:
    category: "communities",
    tags: ["chat", "support", "realtime"],
    rating: 4.6,
    createdAt: "2020-04-01T00:00:00Z",
    updatedAt: "2025-01-01T00:00:00Z",
    imageUrl: "/images/discord.png",
    iconifyIcon: "logos:discord-icon",
    members: 75000,
    platform: "Discord",
    joinUrl: "https:
  },
  {
    id: "5",
    title: "Frontend Mentor",
    description: "Community of developers improving their skills by building real projects.",
    url: "https:
    category: "communities",
    tags: ["challenges", "projects", "feedback"],
    rating: 4.7,
    createdAt: "2020-05-01T00:00:00Z",
    updatedAt: "2025-01-01T00:00:00Z",
    imageUrl: "/images/frontendmentor.png",
    iconifyIcon: "logos:frontendmentor",
    members: 350000,
    platform: "Web",
    joinUrl: "https:
  },
  {
    id: "6",
    title: "Hashnode",
    description: "Developer blogging platform and community for software developers.",
    url: "https:
    category: "communities",
    tags: ["blogging", "networking", "knowledge-sharing"],
    rating: 4.7,
    createdAt: "2020-06-01T00:00:00Z",
    updatedAt: "2025-01-01T00:00:00Z",
    imageUrl: "/images/hashnode.png",
    iconifyIcon: "logos:hashnode",
    members: 500000,
    platform: "Web",
    joinUrl: "https:
  },
];
export const blogs: Blog[] = [
  {
    id: "1",
    title: "Overreacted",
    description: "Personal blog by Dan Abramov. He explains with words and code.",
    url: "https:
    category: "blogs",
    tags: ["react", "javascript", "tutorials"],
    rating: 4.9,
    createdAt: "2021-01-01T00:00:00Z",
    updatedAt: "2025-01-01T00:00:00Z",
    imageUrl: "/images/overreacted.png",
    iconifyIcon: "logos:react",
    author: "Dan Abramov",
    readTime: 10,
    publishDate: "2023-05-01T00:00:00Z",
  },
  {
    id: "2",
    title: "Josh W Comeau's Blog",
    description: "A blog about JavaScript, React, CSS, animations, and more.",
    url: "https:
    category: "blogs",
    tags: ["react", "css", "animations"],
    rating: 4.8,
    createdAt: "2020-02-01T00:00:00Z",
    updatedAt: "2025-01-01T00:00:00Z",
    imageUrl: "/images/joshwcomeau.png",
    iconifyIcon: "logos:joshwcomeau",
    author: "Josh W Comeau",
    readTime: 10,
    publishDate: "2025-01-01"
  },
  {
    id: "3",
    title: "CSS-Tricks",
    description: "A blog dedicated to publishing articles about front-end development.",
    url: "https:
    category: "blogs",
    tags: ["css", "front-end", "tutorials"],
    rating: 4.8,
    createdAt: "2020-03-01T00:00:00Z",
    updatedAt: "2025-01-01T00:00:00Z",
    imageUrl: "/images/css-tricks-blog.png",
    iconifyIcon: "logos:css-3",
    author: "Chris Coyier",
    readTime: 8,
    publishDate: "2025-01-01"
  },
  {
    id: "4",
    title: "Kent C. Dodds Blog",
    description: "Helping people make the world better through quality software.",
    url: "https:
    category: "blogs",
    tags: ["react", "testing", "javascript"],
    rating: 4.8,
    createdAt: "2020-04-01T00:00:00Z",
    updatedAt: "2025-01-01T00:00:00Z",
    imageUrl: "/images/kentcdodds.png",
    iconifyIcon: "logos:kentcdodds",
    author: "Kent C. Dodds",
    readTime: 15,
    publishDate: "2025-01-01"
  },
  {
    id: "5",
    title: "Smashing Magazine",
    description: "A magazine for web designers and developers.",
    url: "https:
    category: "blogs",
    tags: ["design", "web-development", "tutorials"],
    rating: 4.8,
    createdAt: "2020-05-01T00:00:00Z",
    updatedAt: "2025-01-01T00:00:00Z",
    imageUrl: "/images/smashing.png",
    iconifyIcon: "simple-icons:smashingmagazine",
    author: "Vitaly Friedman",
    readTime: 10,
    publishDate: "2025-01-01"
  },
  {
    id: "6",
    title: "LogRocket Blog",
    description: "Frontend debugging tools and best practices for web development.",
    url: "https:
    category: "blogs",
    tags: ["debugging", "frontend", "performance"],
    rating: 4.5,
    createdAt: "2020-06-01T00:00:00Z",
    updatedAt: "2025-01-01T00:00:00Z",
    imageUrl: "/images/logrocket.png",
    author: "LogRocket Team",
    readTime: 10,
    publishDate: "2025-01-01"
  },
];
export const allResources = [
  ...learningResources,
  ...developerTools,
  ...frameworks,
  ...communities,
  ...blogs,
];
