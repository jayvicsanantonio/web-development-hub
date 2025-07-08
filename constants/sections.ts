export const SECTIONS = [
  {
    title: 'Learning Resources',
    href: '/learning-resources',
    description:
      'Comprehensive tutorials, courses, and educational content to master web development fundamentals and advanced concepts.',
    links: [
      {
        title: 'Frontend Masters',
        href: 'https://frontendmasters.com/',
        description:
          'Premium in-depth courses on modern JavaScript, React, Vue, and front-end engineering taught by industry experts.',
        tags: ['course', 'paid', 'javascript', 'react', 'vue', 'advanced', 'video-based'],
      },
      {
        title: 'Epic Web',
        href: 'https://epicweb.dev/',
        description:
          'Full-stack web development workshops with Kent C. Dodds covering TypeScript, React, Node.js, and modern web patterns.',
        tags: ['course', 'paid', 'full-stack', 'typescript', 'react', 'nodejs', 'advanced', 'hands-on'],
      },
      {
        title: 'MDN Web Docs',
        href: 'https://developer.mozilla.org/',
        description:
          'The definitive resource for web technologies including HTML, CSS, JavaScript APIs, and progressive web app development.',
        tags: ['documentation', 'free', 'html', 'css', 'javascript', 'reference', 'beginner-friendly'],
      },
      {
        title: 'FreeCodeCamp',
        href: 'https://www.freecodecamp.org/',
        description:
          'Free interactive coding lessons with hands-on projects and industry-recognized certifications.',
        tags: ['course', 'free', 'beginner-friendly', 'interactive', 'hands-on', 'full-stack', 'javascript'],
      },
      {
        title: 'Codecademy',
        href: 'https://www.codecademy.com/',
        description:
          'Interactive coding lessons and projects to build real-world skills in web development and programming.',
        tags: ['course', 'paid', 'beginner-friendly', 'interactive', 'hands-on', 'javascript', 'python'],
      },
      {
        title: 'web.dev',
        href: 'https://web.dev/',
        description:
          "Google's comprehensive resource for modern web development, performance optimization, and best practices.",
        tags: ['tutorial', 'free', 'performance', 'accessibility', 'modern', 'hands-on', 'beginner-friendly'],
      },
      {
        title: 'Testing JavaScript',
        href: 'https://www.testingjavascript.com/',
        description:
          'Comprehensive testing strategies and patterns for JavaScript applications with Kent C. Dodds.',
        tags: ['course', 'paid', 'testing', 'javascript', 'advanced', 'video-based'],
      },
      {
        title: 'Epic React',
        href: 'https://www.epicreact.dev/',
        description:
          'Advanced React patterns, hooks, performance optimization, and testing strategies for production applications.',
        tags: ['course', 'paid', 'react', 'advanced', 'performance', 'testing', 'video-based'],
      },

      {
        title: 'Great Frontend',
        href: 'https://www.greatfrontend.com/',
        description:
          'Comprehensive front-end interview preparation with 200+ practice questions from ex-FAANG interviewers.',
        tags: ['interview-prep', 'paid', 'coding-challenges', 'javascript', 'react', 'css', 'advanced'],
      },
      {
        title: 'Design Gurus',
        href: 'https://designgurus.com/',
        description:
          'Specialized training for technical interviews with system design, algorithms, and front-end engineering focus.',
        tags: ['interview-prep', 'paid', 'system-design', 'coding-challenges', 'advanced', 'course'],
      },
      {
        title: 'Learn With Jason',
        href: 'https://www.learnwithjason.dev/',
        description:
          'Live coding sessions with web development experts, building real projects and sharing practical knowledge.',
        tags: ['tutorial', 'free', 'video-based', 'hands-on', 'javascript', 'react', 'modern'],
      },
      {
        title: 'CSS-Tricks',
        href: 'https://css-tricks.com/',
        description:
          'Daily articles about CSS, HTML, JavaScript, and web design with practical examples and tutorials.',
        tags: ['blog', 'free', 'css', 'html', 'javascript', 'design', 'tutorial', 'beginner-friendly'],
      },
      {
        title: 'Smashing Magazine',
        href: 'https://www.smashingmagazine.com/',
        description:
          'Leading online magazine for professional web designers and developers with in-depth articles and case studies.',
        tags: ['blog', 'free', 'design', 'advanced', 'css', 'javascript', 'tutorial'],
      },
      {
        title: 'Frontend At Scale',
        href: 'https://frontendatscale.com/',
        description:
          'Articles and insights on software design and architecture specifically tailored for frontend engineers.',
        tags: ['blog', 'free', 'advanced', 'system-design', 'javascript', 'performance'],
      },
      {
        title: 'Frontend Interview Handbook',
        href: 'https://www.frontendinterviewhandbook.com/',
        description:
          'Comprehensive guide for frontend interview preparation with JavaScript, React, CSS, and system design questions.',
        tags: ['interview-prep', 'free', 'javascript', 'react', 'css', 'system-design', 'open-source'],
      },
      {
        title: 'LeetCode',
        href: 'https://leetcode.com/',
        description:
          'Platform for practicing coding problems and preparing for technical interviews with 2000+ programming challenges.',
        tags: ['interview-prep', 'coding-challenges', 'free', 'paid', 'javascript', 'python', 'platform'],
      },
      {
        title: 'AlgoExpert',
        href: 'https://www.algoexpert.io/',
        description:
          'Comprehensive platform for learning algorithms and data structures with video explanations and practice problems.',
        tags: ['interview-prep', 'paid', 'coding-challenges', 'video-based', 'javascript', 'python', 'advanced'],
      },
      {
        title: 'System Design Primer',
        href: 'https://github.com/donnemartin/system-design-primer',
        description:
          'Open-source collection of resources for learning large-scale system design and architecture patterns.',
        tags: ['system-design', 'free', 'open-source', 'interview-prep', 'advanced', 'documentation'],
      },
      {
        title: 'JavaScript.info',
        href: 'https://javascript.info/',
        description:
          'Modern JavaScript tutorial covering from basics to advanced topics with detailed explanations and examples.',
        tags: ['tutorial', 'free', 'javascript', 'beginner-friendly', 'advanced', 'interactive'],
      },
      {
        title: 'React Tutorial',
        href: 'https://react.dev/learn',
        description:
          'Official React tutorial with interactive examples and comprehensive guides for building modern UIs.',
        tags: ['tutorial', 'free', 'react', 'interactive', 'beginner-friendly', 'documentation'],
      },
      {
        title: 'TypeScript Handbook',
        href: 'https://www.typescriptlang.org/docs/',
        description:
          'Official TypeScript documentation with tutorials, reference materials, and examples for type-safe JavaScript.',
        tags: ['documentation', 'free', 'typescript', 'reference', 'beginner-friendly', 'advanced'],
      },
      {
        title: 'CSS Reference',
        href: 'https://cssreference.io/',
        description:
          'Visual guide to CSS properties with examples, browser support, and interactive demonstrations.',
        tags: ['reference', 'free', 'css', 'interactive', 'beginner-friendly', 'documentation'],
      },
      {
        title: 'HTML Reference',
        href: 'https://htmlreference.io/',
        description:
          'Visual guide to HTML elements with examples, attributes, and browser compatibility information.',
        tags: ['reference', 'free', 'html', 'beginner-friendly', 'documentation'],
      },
      {
        title: 'Web.dev Learn',
        href: 'https://web.dev/learn/',
        description:
          'Structured learning paths for modern web development covering HTML, CSS, JavaScript, and performance.',
        tags: ['course', 'free', 'html', 'css', 'javascript', 'performance', 'modern', 'hands-on'],
      },
      {
        title: 'Frontend Mentor',
        href: 'https://www.frontendmentor.io/',
        description:
          'Real-world frontend challenges with designs to practice HTML, CSS, and JavaScript skills.',
        tags: ['coding-challenges', 'free', 'paid', 'html', 'css', 'javascript', 'design', 'hands-on'],
      },
      {
        title: 'Codewars',
        href: 'https://www.codewars.com/',
        description:
          'Platform for improving coding skills through kata challenges in JavaScript, Python, and other languages.',
        tags: ['coding-challenges', 'free', 'javascript', 'python', 'platform', 'interactive'],
      },
      {
        title: 'Exercism',
        href: 'https://exercism.org/',
        description:
          'Free platform for learning programming languages through exercises and mentorship from experienced developers.',
        tags: ['coding-challenges', 'free', 'javascript', 'python', 'community', 'beginner-friendly'],
      },
      {
        title: 'The Odin Project',
        href: 'https://www.theodinproject.com/',
        description:
          'Free full-stack curriculum with projects and community support for learning web development from scratch.',
        tags: ['course', 'free', 'full-stack', 'beginner-friendly', 'hands-on', 'community', 'open-source'],
      },
      {
        title: 'Full Stack Open',
        href: 'https://fullstackopen.com/',
        description:
          'Modern web application development course covering React, Redux, Node.js, MongoDB, and GraphQL.',
        tags: ['course', 'free', 'full-stack', 'react', 'nodejs', 'database', 'modern', 'hands-on'],
      },
      {
        title: 'JavaScript30',
        href: 'https://javascript30.com/',
        description:
          '30-day vanilla JavaScript coding challenge with video tutorials and real-world projects.',
        tags: ['coding-challenges', 'free', 'javascript', 'video-based', 'hands-on', 'beginner-friendly'],
      },
      {
        title: 'CSS Grid Garden',
        href: 'https://cssgridgarden.com/',
        description:
          'Interactive game for learning CSS Grid layout with visual feedback and progressive difficulty.',
        tags: ['interactive', 'free', 'css', 'beginner-friendly', 'tutorial'],
      },
      {
        title: 'Flexbox Froggy',
        href: 'https://flexboxfroggy.com/',
        description:
          'Interactive game for learning CSS Flexbox with visual feedback and progressive difficulty levels.',
        tags: ['interactive', 'free', 'css', 'beginner-friendly', 'tutorial'],
      },
    ],
  },
  {
    title: 'Developer Tools',
    href: '/developer-tools',
    description:
      'Essential software, services, and utilities to enhance your development workflow and boost productivity.',
    links: [
      {
        title: 'Visual Studio Code',
        href: 'https://code.visualstudio.com/',
        description:
          'The most popular code editor with extensive extensions, debugging tools, and integrated terminal for modern development.',
        tags: ['tool', 'free', 'open-source', 'trending', 'beginner-friendly'],
      },
      {
        title: 'GitHub',
        href: 'https://github.com/',
        description:
          "The world's leading platform for version control, collaboration, and open-source development with 100M+ developers.",
        tags: ['platform', 'free', 'paid', 'open-source', 'community', 'trending'],
      },
      {
        title: 'Figma',
        href: 'https://www.figma.com/',
        description:
          'Collaborative design platform for creating, prototyping, and sharing design systems and user interfaces.',
        tags: ['design', 'free', 'paid', 'tool', 'trending', 'community'],
      },
      {
        title: 'Vercel',
        href: 'https://vercel.com/',
        description:
          'Platform for deploying and hosting modern web applications with automatic scaling and global CDN.',
        tags: ['deployment', 'free', 'paid', 'platform', 'trending', 'performance'],
      },
      {
        title: 'Project IDX',
        href: 'https://developers.google.com/idx',
        description:
          "Google's AI-assisted cloud development environment for full-stack, multiplatform application development.",
        tags: ['ai', 'tool', 'free', 'full-stack', 'trending', 'modern'],
      },
      {
        title: 'Amazon Web Services',
        href: 'https://aws.amazon.com/',
        description:
          'Comprehensive cloud computing platform offering 200+ services for building scalable web applications.',
        tags: ['deployment', 'paid', 'platform', 'advanced', 'database', 'performance'],
      },
      {
        title: 'Google Cloud',
        href: 'https://cloud.google.com/',
        description:
          'Enterprise-grade cloud platform with AI/ML services, serverless computing, and global infrastructure.',
        tags: ['deployment', 'paid', 'platform', 'advanced', 'ai', 'database', 'performance'],
      },
      {
        title: 'Unsplash',
        href: 'https://unsplash.com/',
        description:
          'High-quality stock photography platform with free images for commercial and personal web projects.',
        tags: ['design', 'free', 'platform', 'beginner-friendly'],
      },
      {
        title: 'Turso',
        href: 'https://turso.tech/',
        description:
          'Edge database built on SQLite with global distribution, perfect for modern web applications requiring low latency.',
        tags: ['database', 'free', 'paid', 'platform', 'modern', 'performance'],
      },
      {
        title: 'Netlify',
        href: 'https://netlify.com/',
        description:
          'All-in-one platform for building, deploying, and managing modern web applications with serverless functions.',
        tags: ['deployment', 'free', 'paid', 'platform', 'trending', 'beginner-friendly'],
      },
      {
        title: 'Clerk',
        href: 'https://clerk.com/',
        description:
          'Complete authentication and user management solution with pre-built components for React, Next.js, and modern web.',
        tags: ['authentication', 'free', 'paid', 'react', 'platform', 'modern'],
      },
      {
        title: 'Cloudinary',
        href: 'https://cloudinary.com/',
        description:
          'Cloud-based media management platform with AI-powered image optimization, transformation, and delivery APIs.',
        tags: ['ai', 'platform', 'free', 'paid', 'performance', 'design'],
      },
      {
        title: 'Sanity',
        href: 'https://sanity.io/',
        description:
          'Headless CMS with real-time collaboration, customizable content studio, and powerful querying capabilities.',
        tags: ['cms', 'free', 'paid', 'platform', 'modern', 'database'],
      },
      {
        title: 'Frontmatter',
        href: 'https://frontmatter.codes/',
        description:
          'Visual Studio Code extension for managing static site content with support for Hugo, Jekyll, and modern frameworks.',
        tags: ['cms', 'free', 'tool', 'open-source'],
      },
      {
        title: 'Adobe Express',
        href: 'https://www.adobe.com/express/',
        description:
          'All-in-one design tool for creating graphics, videos, and web content with AI-powered templates and assets.',
        tags: ['design', 'ai', 'free', 'paid', 'tool', 'beginner-friendly'],
      },
      {
        title: 'Turborepo',
        href: 'https://turbo.build/repo',
        description:
          'High-performance build system for JavaScript monorepos with intelligent caching and parallel execution.',
        tags: ['tool', 'free', 'open-source', 'javascript', 'performance', 'advanced'],
      },
      {
        title: 'Webpack',
        href: 'https://webpack.js.org/',
        description:
          'Powerful module bundler for JavaScript applications with extensive plugin ecosystem and optimization features.',
        tags: ['tool', 'free', 'open-source', 'javascript', 'performance', 'advanced'],
      },
      {
        title: 'Rollup',
        href: 'https://rollupjs.org/',
        description:
          'Efficient JavaScript module bundler optimized for libraries with tree-shaking and ES module output.',
        tags: ['tool', 'free', 'open-source', 'javascript', 'performance', 'advanced'],
      },
      {
        title: 'Parcel',
        href: 'https://parceljs.org/',
        description:
          'Zero-configuration web application bundler with automatic asset optimization and fast development builds.',
        tags: ['tool', 'free', 'open-source', 'javascript', 'performance', 'beginner-friendly'],
      },
      {
        title: 'SWC',
        href: 'https://swc.rs/',
        description:
          'Blazing-fast JavaScript/TypeScript compiler written in Rust, designed as a drop-in Babel replacement.',
        tags: ['tool', 'free', 'open-source', 'javascript', 'typescript', 'performance', 'advanced'],
      },
      {
        title: 'Esbuild',
        href: 'https://esbuild.github.io/',
        description:
          'Extremely fast JavaScript bundler and minifier written in Go, optimized for large codebases and CI/CD.',
        tags: ['tool', 'free', 'open-source', 'javascript', 'performance', 'advanced'],
      },
      {
        title: 'Vite',
        href: 'https://vitejs.dev/',
        description:
          'Next-generation front-end build tool with instant hot module replacement and optimized production builds.',
        tags: ['tool', 'free', 'open-source', 'javascript', 'performance', 'trending', 'modern'],
      },
      {
        title: 'Turbopack',
        href: 'https://turbo.build/pack',
        description:
          'Incremental bundler optimized for JavaScript and TypeScript, built by Vercel for Next.js applications.',
        tags: ['tool', 'free', 'open-source', 'javascript', 'typescript', 'performance', 'modern'],
      },
      {
        title: 'Biome',
        href: 'https://biomejs.dev/',
        description:
          'All-in-one toolchain for JavaScript and TypeScript with linting, formatting, and bundling capabilities.',
        tags: ['tool', 'free', 'open-source', 'javascript', 'typescript', 'performance', 'modern'],
      },
      {
        title: 'Rush',
        href: 'https://rushjs.io/',
        description:
          "Microsoft's monorepo management tool for large-scale projects with efficient dependency management and builds.",
        tags: ['tool', 'free', 'open-source', 'javascript', 'advanced'],
      },
      {
        title: 'Yarn',
        href: 'https://yarnpkg.com/',
        description:
          'Fast, reliable, and secure package manager with workspaces support for monorepo development.',
        tags: ['tool', 'free', 'open-source', 'javascript', 'nodejs', 'performance'],
      },
      {
        title: 'Lerna',
        href: 'https://lerna.js.org/',
        description:
          'Tool for managing JavaScript projects with multiple packages, automating versioning and publishing workflows.',
        tags: ['tool', 'free', 'open-source', 'javascript', 'nodejs', 'advanced'],
      },
      {
        title: 'NPM',
        href: 'https://www.npmjs.com/',
        description:
          "World's largest software registry with package management tools for JavaScript and Node.js development.",
        tags: ['platform', 'free', 'javascript', 'nodejs', 'trending', 'beginner-friendly'],
      },
      {
        title: 'PNPM',
        href: 'https://pnpm.io/',
        description:
          'Fast, disk space efficient package manager with strict dependency resolution and monorepo support.',
        tags: ['tool', 'free', 'open-source', 'javascript', 'nodejs', 'performance'],
      },
      {
        title: 'Nx',
        href: 'https://nx.dev/',
        description:
          'Powerful build system and monorepo tool with intelligent caching, affected commands, and code generation.',
        tags: ['tool', 'free', 'open-source', 'javascript', 'typescript', 'performance', 'advanced'],
      },
      {
        title: 'ChatGPT',
        href: 'https://chatgpt.com/',
        description:
          'Advanced AI assistant for code generation, debugging, documentation, and learning web development concepts.',
        tags: ['ai', 'free', 'paid', 'platform', 'trending', 'beginner-friendly'],
      },
      {
        title: 'Google Gemini',
        href: 'https://gemini.google.com/',
        description:
          "Google's AI assistant for coding assistance, problem-solving, and learning web development technologies.",
        tags: ['ai', 'free', 'paid', 'platform', 'trending', 'beginner-friendly'],
      },
      {
        title: 'Supermaven',
        href: 'https://supermaven.com/',
        description:
          'AI-powered code completion tool with 300K token context window for high-quality, context-aware suggestions.',
        tags: ['ai', 'free', 'paid', 'tool', 'trending', 'modern'],
      },
      {
        title: 'GitHub Copilot',
        href: 'https://github.com/features/copilot',
        description:
          'AI pair programmer that helps write code faster with less effort, available in popular IDEs and editors.',
        tags: ['ai', 'paid', 'tool', 'trending', 'modern'],
      },
      {
        title: 'Cursor',
        href: 'https://cursor.sh/',
        description:
          'AI-first code editor built on VS Code with advanced AI capabilities for code generation and editing.',
        tags: ['ai', 'free', 'paid', 'tool', 'trending', 'modern'],
      },
      {
        title: 'Figma AI',
        href: 'https://www.figma.com/ai',
        description:
          'AI-powered design tools for generating UI components, layouts, and design variations in Figma.',
        tags: ['ai', 'design', 'free', 'paid', 'tool', 'trending', 'modern'],
      },
      {
        title: 'Adobe Firefly',
        href: 'https://www.adobe.com/products/firefly.html',
        description:
          'Generative AI for creating images, vectors, and 3D content for web design and development projects.',
        tags: ['ai', 'design', 'free', 'paid', 'tool', 'trending', 'modern'],
      },

      {
        title: 'Vercel AI SDK',
        href: 'https://ai-sdk.dev/',
        description:
          'Open-source library for building AI-powered applications with streaming, edge functions, and React components.',
        tags: ['ai', 'free', 'open-source', 'react', 'javascript', 'modern', 'advanced'],
      },
      {
        title: 'Amazon Bedrock',
        href: 'https://aws.amazon.com/bedrock/',
        description:
          'Fully managed service for building and scaling generative AI applications with foundation models.',
        tags: ['ai', 'paid', 'platform', 'advanced', 'modern'],
      },
      {
        title: 'Google AI Studio',
        href: 'https://aistudio.google.com/',
        description:
          "Platform for building AI applications with Google's latest models and development tools.",
        tags: ['ai', 'free', 'paid', 'platform', 'modern', 'advanced'],
      },
      {
        title: 'Docker',
        href: 'https://www.docker.com/',
        description:
          'Platform for developing, shipping, and running applications in containers for consistent environments across machines.',
        tags: ['tool', 'free', 'paid', 'deployment', 'advanced', 'platform'],
      },
      {
        title: 'Kubernetes',
        href: 'https://kubernetes.io/',
        description:
          'Container orchestration system for automating application deployment, scaling, and management in production.',
        tags: ['tool', 'free', 'open-source', 'deployment', 'advanced', 'performance'],
      },
      {
        title: 'GitLab',
        href: 'https://gitlab.com/',
        description:
          'Complete DevOps platform with Git repository, CI/CD, security scanning, and project management tools.',
        tags: ['platform', 'free', 'paid', 'deployment', 'community', 'advanced'],
      },
      {
        title: 'Bitbucket',
        href: 'https://bitbucket.org/',
        description:
          'Git repository management solution with built-in CI/CD and Jira integration for software teams.',
        tags: ['platform', 'free', 'paid', 'deployment', 'community'],
      },
      {
        title: 'CodeSandbox',
        href: 'https://codesandbox.io/',
        description:
          'Online code editor for rapid web development with instant previews and collaborative features.',
        tags: ['tool', 'free', 'paid', 'javascript', 'react', 'beginner-friendly', 'interactive'],
      },
      {
        title: 'StackBlitz',
        href: 'https://stackblitz.com/',
        description:
          'Online IDE for web development with instant startup, real-time collaboration, and fast preview.',
        tags: ['tool', 'free', 'paid', 'javascript', 'typescript', 'react', 'interactive', 'beginner-friendly'],
      },
      {
        title: 'Replit',
        href: 'https://replit.com/',
        description:
          'Collaborative, in-browser IDE for coding, hosting and deploying applications in 50+ programming languages.',
        tags: ['tool', 'free', 'paid', 'javascript', 'python', 'deployment', 'interactive', 'beginner-friendly'],
      },
      {
        title: 'Glitch',
        href: 'https://glitch.com/',
        description:
          'Collaborative platform for building, remixing, and deploying full-stack web apps with instant hosting.',
        tags: ['tool', 'free', 'paid', 'full-stack', 'deployment', 'community', 'beginner-friendly'],
      },
      {
        title: 'Postman',
        href: 'https://www.postman.com/',
        description:
          'API platform for building, testing, and documenting APIs with collaboration features for development teams.',
        tags: ['tool', 'free', 'paid', 'testing', 'api', 'advanced', 'community'],
      },
      {
        title: 'Insomnia',
        href: 'https://insomnia.rest/',
        description:
          'Open-source API client for designing, debugging, and testing REST, GraphQL, and gRPC APIs.',
        tags: ['tool', 'free', 'open-source', 'testing', 'api', 'advanced'],
      },
      {
        title: 'MongoDB Atlas',
        href: 'https://www.mongodb.com/atlas/database',
        description:
          'Multi-cloud developer data platform with fully managed MongoDB database services and built-in search.',
        tags: ['database', 'free', 'paid', 'platform', 'performance', 'modern'],
      },
      {
        title: 'Supabase',
        href: 'https://supabase.com/',
        description:
          'Open-source Firebase alternative with PostgreSQL database, authentication, real-time subscriptions, and storage.',
        tags: ['database', 'free', 'paid', 'open-source', 'authentication', 'platform', 'trending', 'modern'],
      },
      {
        title: 'PlanetScale',
        href: 'https://planetscale.com/',
        description:
          'MySQL-compatible serverless database platform built on Vitess with branching, non-blocking schema changes.',
        tags: ['database', 'free', 'paid', 'platform', 'performance', 'modern'],
      },
      {
        title: 'Firebase',
        href: 'https://firebase.google.com/',
        description:
          'App development platform with real-time database, authentication, hosting, and serverless functions.',
        tags: ['platform', 'free', 'paid', 'database', 'authentication', 'deployment', 'trending'],
      },
      {
        title: 'Auth0',
        href: 'https://auth0.com/',
        description:
          'Identity platform for adding authentication and authorization to web, mobile, and legacy applications.',
        tags: ['authentication', 'free', 'paid', 'platform', 'advanced'],
      },
      {
        title: 'Stripe',
        href: 'https://stripe.com/',
        description:
          'Payment processing platform for internet businesses with APIs for online payments and subscriptions.',
        tags: ['platform', 'paid', 'api', 'advanced', 'trending'],
      },
      {
        title: 'Datadog',
        href: 'https://www.datadoghq.com/',
        description:
          'Monitoring and security platform for cloud applications with real-time observability and analytics.',
        tags: ['platform', 'free', 'paid', 'performance', 'advanced', 'monitoring'],
      },
      {
        title: 'Sentry',
        href: 'https://sentry.io/',
        description:
          'Application monitoring platform that helps identify, fix, and optimize the performance of code.',
        tags: ['platform', 'free', 'paid', 'performance', 'monitoring', 'advanced'],
      },
      {
        title: 'New Relic',
        href: 'https://newrelic.com/',
        description:
          'Observability platform for monitoring application performance, infrastructure metrics, and user experience.',
        tags: ['platform', 'free', 'paid', 'performance', 'monitoring', 'advanced'],
      },
      {
        title: 'Lighthouse',
        href: 'https://developers.google.com/web/tools/lighthouse',
        description:
          'Open-source tool for auditing web pages and applications for performance, accessibility, and SEO.',
        tags: ['tool', 'free', 'open-source', 'performance', 'accessibility', 'testing', 'advanced'],
      },

      {
        title: 'Cloudinary AI',
        href: 'https://cloudinary.com/products/cloudinary_ai',
        description:
          'AI-powered image and video analysis, tagging, and optimization for web content management.',
        tags: ['ai', 'platform', 'free', 'paid', 'performance', 'design', 'modern'],
      },
    ],
  },
  {
    title: 'Frameworks and Libraries',
    href: '/frameworks-and-libraries',
    description:
      'Modern frameworks, libraries, and tools for building robust, scalable web applications with optimal performance.',
    links: [
      {
        title: 'React',
        href: 'https://react.dev/',
        description:
          'Popular JavaScript library for building user interfaces with component-based architecture and virtual DOM.',
        tags: ['javascript', 'free', 'open-source', 'trending', 'beginner-friendly', 'advanced'],
      },
      {
        title: 'Vue.js',
        href: 'https://vuejs.org/',
        description:
          'Progressive JavaScript framework with gentle learning curve, excellent documentation, and powerful ecosystem.',
        tags: ['vue', 'javascript', 'free', 'open-source', 'trending', 'beginner-friendly'],
      },
      {
        title: 'Svelte',
        href: 'https://svelte.dev/',
        description:
          'Modern framework that compiles to vanilla JavaScript, offering smaller bundles and better runtime performance.',
        tags: ['javascript', 'free', 'open-source', 'modern', 'performance', 'trending'],
      },
      {
        title: 'Angular',
        href: 'https://angular.dev/',
        description:
          'Comprehensive framework by Google with TypeScript-first approach, dependency injection, and enterprise features.',
        tags: ['typescript', 'javascript', 'free', 'open-source', 'advanced', 'full-stack'],
      },
      {
        title: 'Preact',
        href: 'https://preactjs.com/',
        description:
          'Lightweight alternative to React with the same API, perfect for performance-critical applications.',
        tags: ['react', 'javascript', 'free', 'open-source', 'performance', 'modern'],
      },
      {
        title: 'SolidJS',
        href: 'https://www.solidjs.com/',
        description:
          'Declarative JavaScript library with fine-grained reactivity and compilation to real DOM nodes.',
        tags: ['javascript', 'free', 'open-source', 'modern', 'performance', 'advanced'],
      },
      {
        title: 'Qwik',
        href: 'https://qwik.builder.io/',
        description:
          'Framework focused on instant loading with resumability and minimal JavaScript execution.',
        tags: ['javascript', 'free', 'open-source', 'modern', 'performance', 'trending'],
      },
      {
        title: 'Alpine.js',
        href: 'https://alpinejs.dev/',
        description:
          'Lightweight framework for adding interactivity to HTML with declarative syntax and minimal overhead.',
        tags: ['javascript', 'free', 'open-source', 'beginner-friendly', 'performance'],
      },
      {
        title: 'Lit',
        href: 'https://lit.dev/',
        description:
          'Library for building fast, lightweight web components with simple APIs and excellent performance.',
        tags: ['javascript', 'free', 'open-source', 'performance', 'modern', 'advanced'],
      },
      {
        title: 'HTMX',
        href: 'https://htmx.org/',
        description:
          'Modern approach to dynamic web applications using HTML attributes for AJAX, CSS transitions, and WebSockets.',
        tags: ['html', 'javascript', 'free', 'open-source', 'modern', 'performance', 'trending'],
      },
      {
        title: 'Next.js',
        href: 'https://nextjs.org/',
        description:
          'Full-featured React framework with server-side rendering, static generation, and optimized performance.',
        tags: ['react', 'typescript', 'free', 'open-source', 'full-stack', 'trending', 'performance'],
      },
      {
        title: 'Remix',
        href: 'https://remix.run/',
        description:
          'Full-stack web framework focused on web standards, performance, and excellent user experience.',
        tags: ['react', 'typescript', 'free', 'open-source', 'full-stack', 'performance', 'modern'],
      },
      {
        title: 'Nuxt',
        href: 'https://nuxt.com/',
        description:
          'Vue.js framework for building modern applications with server-side rendering and static site generation.',
        tags: ['vue', 'typescript', 'free', 'open-source', 'full-stack', 'performance', 'trending'],
      },
      {
        title: 'Gatsby',
        href: 'https://www.gatsbyjs.com/',
        description:
          'React-based static site generator with GraphQL data layer and extensive plugin ecosystem.',
        tags: ['react', 'javascript', 'free', 'open-source', 'performance', 'cms'],
      },
      {
        title: 'Astro',
        href: 'https://astro.build/',
        description:
          'Static site generator that delivers zero JavaScript by default, with component islands architecture.',
        tags: ['javascript', 'typescript', 'free', 'open-source', 'performance', 'modern', 'trending'],
      },
      {
        title: 'Deno Fresh',
        href: 'https://fresh.deno.dev/',
        description:
          'Modern web framework for Deno with server-side rendering, islands architecture, and TypeScript support.',
        tags: ['typescript', 'free', 'open-source', 'modern', 'performance', 'advanced'],
      },
      {
        title: 'Docusaurus',
        href: 'https://docusaurus.io/',
        description:
          'React-based static site generator optimized for documentation websites and technical content.',
        tags: ['react', 'javascript', 'free', 'open-source', 'documentation', 'cms'],
      },
      {
        title: 'SolidStart',
        href: 'https://start.solidjs.com/',
        description:
          'Full-stack meta-framework for SolidJS with server-side rendering, routing, and modern web features.',
        tags: ['javascript', 'typescript', 'free', 'open-source', 'full-stack', 'modern', 'performance'],
      },
      {
        title: 'Eleventy',
        href: 'https://www.11ty.dev/',
        description:
          'Simple static site generator with flexible templating and excellent performance for content-focused sites.',
        tags: ['javascript', 'free', 'open-source', 'performance', 'cms', 'beginner-friendly'],
      },
      {
        title: 'Jest',
        href: 'https://jestjs.io/',
        description:
          'Delightful JavaScript testing framework with zero configuration and comprehensive testing utilities.',
        tags: ['javascript', 'testing', 'free', 'open-source', 'beginner-friendly', 'trending'],
      },
      {
        title: 'Mocha',
        href: 'https://mochajs.org/',
        description:
          'Flexible JavaScript testing framework for Node.js and browser environments with extensive configurability.',
        tags: ['javascript', 'nodejs', 'testing', 'free', 'open-source', 'advanced'],
      },
      {
        title: 'Storybook',
        href: 'https://storybook.js.org/',
        description:
          'Open-source tool for developing UI components in isolation with interactive documentation and testing.',
        tags: ['javascript', 'react', 'vue', 'testing', 'free', 'open-source', 'documentation', 'design'],
      },
      {
        title: 'Cypress',
        href: 'https://www.cypress.io/',
        description:
          'End-to-end testing framework that runs in the browser with real-time reload and comprehensive debugging.',
        tags: ['javascript', 'testing', 'free', 'paid', 'beginner-friendly', 'trending'],
      },
      {
        title: 'Puppeteer',
        href: 'https://pptr.dev/',
        description:
          'Node.js library for controlling Chrome/Chromium with powerful automation and testing capabilities.',
        tags: ['javascript', 'nodejs', 'testing', 'free', 'open-source', 'advanced'],
      },
      {
        title: 'Testing Library',
        href: 'https://testing-library.com/',
        description:
          'Simple and complete testing utilities for React, Vue, and web applications with user-centric testing.',
        tags: ['javascript', 'react', 'vue', 'testing', 'free', 'open-source', 'beginner-friendly'],
      },
      {
        title: 'Playwright',
        href: 'https://playwright.dev/',
        description:
          'Cross-browser automation library for reliable end-to-end testing across Chromium, Firefox, and WebKit.',
        tags: ['javascript', 'typescript', 'testing', 'free', 'open-source', 'advanced', 'trending'],
      },
      {
        title: 'WebdriverIO',
        href: 'https://webdriver.io/',
        description:
          'Next-gen browser and mobile automation test framework for Node.js with comprehensive testing capabilities.',
        tags: ['javascript', 'nodejs', 'testing', 'mobile-dev', 'free', 'open-source', 'advanced'],
      },
      {
        title: 'Vitest',
        href: 'https://vitest.dev/',
        description:
          'Fast unit testing framework built on Vite with native TypeScript support and excellent developer experience.',
        tags: ['javascript', 'typescript', 'testing', 'free', 'open-source', 'performance', 'modern'],
      },
      {
        title: 'TestCafé',
        href: 'https://testcafe.io/',
        description:
          'Cross-browser testing framework with simple syntax and powerful automation capabilities for web applications.',
        tags: ['javascript', 'testing', 'free', 'paid', 'beginner-friendly', 'advanced'],
      },
      {
        title: 'Electron',
        href: 'https://www.electronjs.org/',
        description:
          'Framework for building cross-platform desktop applications using web technologies like HTML, CSS, and JavaScript.',
        tags: ['javascript', 'desktop-dev', 'free', 'open-source', 'advanced', 'trending'],
      },
      {
        title: 'React Native',
        href: 'https://reactnative.dev/',
        description:
          'Framework for building native mobile applications using React and JavaScript with platform-specific optimizations.',
        tags: ['react', 'mobile-dev', 'free', 'open-source', 'advanced', 'trending'],
      },
      {
        title: 'Expo',
        href: 'https://expo.dev/',
        description:
          'Platform for React Native development with managed workflow, pre-built components, and easy deployment.',
        tags: ['react', 'mobile-dev', 'free', 'paid', 'platform', 'beginner-friendly', 'deployment'],
      },
      {
        title: 'Capacitor',
        href: 'https://capacitorjs.com/',
        description:
          'Cross-platform native runtime for web apps with access to native device features and APIs.',
        tags: ['javascript', 'mobile-dev', 'desktop-dev', 'free', 'open-source', 'advanced'],
      },
      {
        title: 'Ionic Framework',
        href: 'https://ionicframework.com/',
        description:
          'Open-source UI toolkit for building cross-platform applications with web technologies and native performance.',
        tags: ['javascript', 'mobile-dev', 'free', 'open-source', 'design', 'beginner-friendly'],
      },
      {
        title: 'Quasar',
        href: 'https://quasar.dev/',
        description:
          'Vue.js framework for building responsive web, mobile, and desktop applications from a single codebase.',
        tags: ['vue', 'javascript', 'mobile-dev', 'desktop-dev', 'free', 'open-source', 'full-stack'],
      },
      {
        title: 'Tauri',
        href: 'https://tauri.app/',
        description:
          'Framework for building tiny, blazingly fast binaries for all major desktop platforms using web technologies.',
        tags: ['javascript', 'desktop-dev', 'free', 'open-source', 'performance', 'modern', 'trending'],
      },
      {
        title: 'NativeScript',
        href: 'https://nativescript.org/',
        description:
          'Framework for building truly native mobile applications using JavaScript, TypeScript, Angular, or Vue.',
        tags: ['javascript', 'typescript', 'vue', 'mobile-dev', 'free', 'open-source', 'advanced'],
      },
      {
        title: 'Tailwind CSS',
        href: 'https://tailwindcss.com/',
        description:
          'Utility-first CSS framework for rapidly building custom designs with composable classes and minimal CSS.',
        tags: ['css', 'free', 'open-source', 'design', 'trending', 'beginner-friendly', 'performance'],
      },
      {
        title: 'shadcn/ui',
        href: 'https://ui.shadcn.com/',
        description:
          'Collection of beautifully designed, accessible components that you can copy and paste into your apps.',
        tags: ['react', 'typescript', 'free', 'open-source', 'design', 'accessibility', 'trending', 'modern'],
      },
      {
        title: 'Redux',
        href: 'https://redux.js.org/',
        description:
          'Predictable state container for JavaScript apps with centralized store and unidirectional data flow.',
        tags: ['javascript', 'react', 'free', 'open-source', 'advanced', 'full-stack'],
      },
      {
        title: 'Zustand',
        href: 'https://zustand-demo.pmnd.rs/',
        description:
          'Small, fast, and scalable state management solution for React with simplified API and minimal boilerplate.',
        tags: ['react', 'javascript', 'free', 'open-source', 'performance', 'beginner-friendly', 'modern'],
      },
      {
        title: 'Jotai',
        href: 'https://jotai.org/',
        description:
          'Primitive and flexible state management for React with atomic approach and excellent TypeScript support.',
        tags: ['react', 'typescript', 'free', 'open-source', 'advanced', 'modern'],
      },
      {
        title: 'XState',
        href: 'https://xstate.js.org/',
        description:
          'State machines and statecharts for the modern web, enabling robust, visual state management.',
        tags: ['javascript', 'typescript', 'free', 'open-source', 'advanced', 'modern'],
      },
      {
        title: 'TanStack Query',
        href: 'https://tanstack.com/query/',
        description:
          'Powerful data fetching and caching library for React, Vue, and Svelte with automatic cache management.',
        tags: ['react', 'vue', 'javascript', 'free', 'open-source', 'performance', 'advanced'],
      },
      {
        title: 'Framer Motion',
        href: 'https://www.framer.com/motion/',
        description:
          'Production-ready animation library for React with declarative syntax and performant transitions.',
        tags: ['react', 'javascript', 'free', 'open-source', 'design', 'advanced', 'trending'],
      },
      {
        title: 'Three.js',
        href: 'https://threejs.org/',
        description:
          'JavaScript 3D library for creating and displaying animated 3D computer graphics in a web browser.',
        tags: ['javascript', 'free', 'open-source', 'design', 'advanced', 'interactive'],
      },
      {
        title: 'D3.js',
        href: 'https://d3js.org/',
        description:
          'JavaScript library for producing dynamic, interactive data visualizations using SVG, HTML, and CSS.',
        tags: ['javascript', 'free', 'open-source', 'design', 'advanced', 'interactive'],
      },
      {
        title: 'Chakra UI',
        href: 'https://chakra-ui.com/',
        description:
          'Simple, modular, and accessible component library for React applications with excellent developer experience.',
        tags: ['react', 'javascript', 'free', 'open-source', 'design', 'accessibility', 'beginner-friendly'],
      },
      {
        title: 'MUI',
        href: 'https://mui.com/',
        description:
          'Comprehensive suite of UI tools and React components implementing Google Material Design principles.',
        tags: ['react', 'javascript', 'typescript', 'free', 'paid', 'design', 'advanced'],
      },
    ],
  },

  {
    title: 'Communities',
    href: '/communities',
    description:
      'Vibrant communities and platforms where developers connect, share knowledge, and collaborate on web development projects.',
    links: [
      {
        title: 'Dev.to',
        href: 'https://dev.to/',
        description:
          'Inclusive social network for software developers with articles, discussions, and community-driven content.',
        tags: ['community', 'free', 'blog', 'beginner-friendly', 'career-focused', 'trending'],
      },
      {
        title: 'r/webdev',
        href: 'https://www.reddit.com/r/webdev/',
        description:
          'Largest web development community on Reddit with discussions, resources, and industry insights.',
        tags: ['community', 'free', 'beginner-friendly', 'career-focused', 'trending'],
      },
      {
        title: 'iCodeThis',
        href: 'https://icodethis.com/',
        description:
          'Daily coding challenges and community for web developers to practice and improve their skills.',
        tags: ['coding-challenges', 'community', 'free', 'hands-on', 'beginner-friendly', 'interactive'],
      },
      {
        title: 'Stack Overflow',
        href: 'https://stackoverflow.com/',
        description:
          "The world's largest Q&A platform for developers to ask questions, share knowledge, and build careers.",
        tags: ['community', 'free', 'documentation', 'advanced', 'career-focused'],
      },
      {
        title: 'GitHub Explore',
        href: 'https://github.com/explore',
        description:
          'The global hub for open-source collaboration, code sharing, and developer networking.',
        tags: ['community', 'free', 'open-source', 'trending', 'advanced', 'platform'],
      },
      {
        title: 'Hashnode',
        href: 'https://hashnode.com/community',
        description:
          'Developer-focused blogging platform and community for sharing knowledge and connecting with peers.',
        tags: ['community', 'blog', 'free', 'beginner-friendly', 'career-focused'],
      },
      {
        title: 'Indie Hackers',
        href: 'https://www.indiehackers.com/',
        description:
          'Community of developers and entrepreneurs sharing stories, strategies, and support for building online businesses.',
        tags: ['community', 'free', 'career-focused', 'trending', 'full-stack'],
      },
      {
        title: 'Women Who Code',
        href: 'https://www.womenwhocode.com/',
        description:
          'Global nonprofit community supporting women in technology with events, mentorship, and resources.',
        tags: ['community', 'free', 'career-focused', 'beginner-friendly'],
      },
      {
        title: 'HackerRank',
        href: 'https://www.hackerrank.com/',
        description:
          'Competitive programming platform and community for developers to practice coding and prepare for interviews.',
        tags: ['coding-challenges', 'interview-prep', 'community', 'free', 'paid', 'hands-on', 'career-focused'],
      },
      {
        title: 'CodeProject',
        href: 'https://www.codeproject.com/',
        description:
          'Collaborative community for sharing code, tutorials, and real-world software development projects.',
        tags: ['community', 'tutorial', 'free', 'beginner-friendly', 'hands-on'],
      },
      {
        title: 'daily.dev',
        href: 'https://daily.dev/',
        description:
          'Professional network and personalized news feed for developers to stay up to date and connect with the community.',
        tags: ['community', 'free', 'trending', 'career-focused', 'modern'],
      },
      {
        title: 'CSS-Tricks Forums',
        href: 'https://css-tricks.com/forums/',
        description:
          'Discussion forum for CSS techniques, troubleshooting, and web development best practices.',
        tags: ['css', 'community', 'free', 'beginner-friendly', 'advanced'],
      },
      {
        title: 'freeCodeCamp Forum',
        href: 'https://forum.freecodecamp.org/',
        description:
          'Supportive community forum for learners and professionals to discuss programming and career development.',
        tags: ['community', 'free', 'beginner-friendly', 'career-focused', 'tutorial'],
      },
      {
        title: 'The Coding Den',
        href: 'https://discord.com/invite/code',
        description:
          'Active Discord community providing programming help, project feedback, and mentorship.',
        tags: ['community', 'free', 'beginner-friendly', 'hands-on', 'career-focused'],
      },
      {
        title: 'Reactiflux',
        href: 'https://www.reactiflux.com/',
        description:
          'The largest React Discord community with channels for React, Next.js, and other related technologies.',
        tags: ['react', 'javascript', 'community', 'free', 'beginner-friendly', 'advanced'],
      },

      {
        title: 'Hacker News',
        href: 'https://news.ycombinator.com/',
        description:
          'Social news website focusing on computer science, entrepreneurship, and technology discussion.',
        tags: ['community', 'free', 'trending', 'career-focused', 'advanced'],
      },
      {
        title: 'Lobsters',
        href: 'https://lobste.rs/',
        description:
          'Computing-focused community with high-quality technical discussions and a strong focus on programming.',
        tags: ['community', 'free', 'advanced', 'trending'],
      },
      {
        title: 'Product Hunt',
        href: 'https://www.producthunt.com/',
        description:
          'Platform for discovering and launching new tech products with an engaged community of makers and early adopters.',
        tags: ['community', 'free', 'trending', 'career-focused', 'modern'],
      },
      {
        title: 'CodeNewbie',
        href: 'https://www.codenewbie.org/',
        description:
          'Supportive community of programmers and people learning to code with podcasts, Twitter chats, and resources.',
        tags: ['community', 'free', 'beginner-friendly', 'career-focused', 'tutorial'],
      },
      {
        title: 'Web Accessibility Initiative',
        href: 'https://www.w3.org/WAI/about/participating/',
        description:
          'W3C community working to improve web accessibility through guidelines, tools, education, and research.',
        tags: ['accessibility', 'community', 'free', 'documentation', 'advanced'],
      },
    ],
  },
  {
    title: 'Blogs',
    href: '/blogs',
    description:
      'Personal blogs and insights from individual web developers sharing their experiences, learnings, and perspectives.',
    links: [
      {
        title: 'Josh W Comeau',
        href: 'https://www.joshwcomeau.com/',
        description:
          'Friendly tutorials focusing on React, CSS animations, and modern web development techniques.',
        tags: ['react', 'css', 'blog', 'free', 'beginner-friendly', 'design', 'tutorial'],
      },
      {
        title: 'Lee Robinson',
        href: 'https://leerob.io/',
        description:
          "Insights on building modern web applications, performance optimization, and developer experience from Vercel's CEO.",
        tags: ['blog', 'free', 'performance', 'advanced', 'career-focused', 'modern'],
      },
      {
        title: 'Alex Kondov',
        href: 'https://alexkondov.com/',
        description:
          'Software engineer and writer sharing insights on JavaScript, React, software design, and architecture with 10+ years of experience.',
        tags: ['javascript', 'react', 'blog', 'free', 'advanced', 'career-focused'],
      },
      {
        title: 'Rafael Camargo',
        href: 'https://www.cmrg.me/',
        description:
          'Software engineering insights on building scalable digital products and high-converting user experiences.',
        tags: ['blog', 'free', 'advanced', 'career-focused', 'design'],
      },
      {
        title: 'Nico Prananta',
        href: 'https://www.nico.fyi/',
        description:
          'Personal blog covering React, Next.js, TypeScript, and modern web development stack experiences.',
        tags: ['react', 'typescript', 'blog', 'free', 'advanced', 'modern'],
      },
      {
        title: 'Dan Abramov',
        href: 'https://overreacted.io/',
        description:
          'Personal blog of React core team member sharing deep insights on React, JavaScript, and software development.',
        tags: ['react', 'javascript', 'blog', 'free', 'advanced', 'trending'],
      },
      {
        title: 'Kent C. Dodds',
        href: 'https://kentcdodds.com/blog',
        description:
          'Thoughtful articles on React, testing, TypeScript, and modern web development from a testing and React expert.',
        tags: ['react', 'testing', 'typescript', 'blog', 'free', 'advanced', 'tutorial'],
      },
      {
        title: 'Sarah Drasner',
        href: 'https://sarah.dev/',
        description:
          'Personal blog covering CSS, animations, Vue.js, and creative web development techniques.',
        tags: ['css', 'vue', 'design', 'blog', 'free', 'advanced', 'tutorial'],
      },
      {
        title: 'Addy Osmani',
        href: 'https://addyosmani.com/',
        description:
          'Performance and web development insights from Google Chrome team member and web performance expert.',
        tags: ['performance', 'blog', 'free', 'advanced', 'trending', 'career-focused'],
      },
      {
        title: 'Chris Coyier',
        href: 'https://chriscoyier.net/',
        description:
          'Personal blog of CSS-Tricks founder sharing insights on CSS, web design, and front-end development.',
        tags: ['css', 'design', 'blog', 'free', 'beginner-friendly', 'advanced'],
      },
      {
        title: 'Wes Bos',
        href: 'https://wesbos.com/blog',
        description:
          'JavaScript and React tutorials, tips, and insights from a popular web development educator.',
        tags: ['javascript', 'react', 'blog', 'free', 'beginner-friendly', 'tutorial', 'trending'],
      },
      {
        title: 'Eric Elliott',
        href: 'https://ericelliottjs.com/',
        description:
          'Advanced JavaScript concepts, functional programming, and software architecture insights.',
        tags: ['javascript', 'blog', 'free', 'paid', 'advanced', 'career-focused'],
      },
      {
        title: 'Adam Wathan',
        href: 'https://adamwathan.me/',
        description:
          'Personal blog of Tailwind CSS creator sharing thoughts on CSS, design systems, and web development.',
        tags: ['css', 'design', 'blog', 'free', 'advanced', 'trending'],
      },
      {
        title: 'Surma',
        href: 'https://surma.dev/',
        description:
          'Deep technical articles on web performance, WebAssembly, and modern web technologies.',
        tags: ['performance', 'blog', 'free', 'advanced', 'modern'],
      },
      {
        title: 'Jake Archibald',
        href: 'https://jakearchibald.com/',
        description:
          'Personal blog covering service workers, web performance, and modern web platform features.',
        tags: ['performance', 'blog', 'free', 'advanced', 'modern'],
      },
      {
        title: 'Una Kravets',
        href: 'https://una.im/',
        description:
          'CSS, web design, and developer experience insights from a web platform advocate.',
        tags: ['css', 'design', 'blog', 'free', 'advanced', 'career-focused'],
      },
      {
        title: 'Phil Hawksworth',
        href: 'https://www.hawksworx.com/blog/',
        description:
          'JAMstack, serverless, and modern web development insights from a developer relations expert.',
        tags: ['blog', 'free', 'advanced', 'modern', 'career-focused'],
      },
      {
        title: 'Rich Harris',
        href: 'https://svelte.dev/blog',
        description:
          'Personal blog of Svelte creator sharing thoughts on web frameworks and modern development.',
        tags: ['javascript', 'blog', 'free', 'advanced', 'trending', 'career-focused'],
      },
      {
        title: 'Evan You',
        href: 'https://blog.evanyou.me/',
        description:
          'Personal blog of Vue.js creator sharing insights on framework design and web development.',
        tags: ['vue', 'javascript', 'blog', 'free', 'advanced', 'trending', 'career-focused'],
      },
      {
        title: 'Guillermo Rauch',
        href: 'https://rauchg.com/',
        description:
          'Personal blog of Vercel CEO and Next.js creator sharing thoughts on modern web development.',
        tags: ['react', 'javascript', 'blog', 'free', 'advanced', 'trending', 'career-focused'],
      },
      {
        title: 'Mark Erikson',
        href: 'https://blog.isquaredsoftware.com/',
        description:
          'Redux maintainer sharing insights on state management, React, and modern front-end architecture.',
        tags: ['react', 'javascript', 'blog', 'free', 'advanced', 'tutorial'],
      },
      {
        title: 'Michelle Barker',
        href: 'https://css-irl.info/',
        description:
          'CSS expert sharing creative techniques, modern CSS features, and web design insights.',
        tags: ['css', 'design', 'blog', 'free', 'advanced', 'tutorial'],
      },
      {
        title: 'Max Stoiber',
        href: 'https://mxstbr.com/',
        description:
          'Personal blog of styled-components creator sharing insights on React, CSS-in-JS, and modern styling.',
        tags: ['react', 'css', 'javascript', 'blog', 'free', 'advanced', 'trending'],
      },
      {
        title: 'Kyle Simpson',
        href: 'https://me.getify.com/',
        description:
          'Deep JavaScript insights and functional programming concepts from the author of You Don\'t Know JS book series.',
        tags: ['javascript', 'blog', 'free', 'paid', 'advanced', 'tutorial'],
      },
      {
        title: 'Lea Verou',
        href: 'https://lea.verou.me/',
        description:
          'CSS expert and web standards advocate sharing creative CSS techniques and modern web development insights.',
        tags: ['css', 'design', 'blog', 'free', 'advanced', 'tutorial'],
      },
      {
        title: 'Paul Irish',
        href: 'https://paulirish.com/',
        description:
          'Chrome team member sharing insights on web performance, developer tools, and modern web platform.',
        tags: ['performance', 'blog', 'free', 'advanced', 'career-focused'],
      },
      {
        title: 'David Walsh',
        href: 'https://davidwalsh.name/',
        description:
          'Mozilla developer sharing JavaScript tips, web development tutorials, and modern browser features.',
        tags: ['javascript', 'blog', 'free', 'tutorial', 'advanced'],
      },
      {
        title: 'Sara Soueidan',
        href: 'https://www.sarasoueidan.com/blog/',
        description:
          'CSS and SVG expert sharing insights on web graphics, animations, and modern CSS techniques.',
        tags: ['css', 'design', 'blog', 'free', 'advanced', 'tutorial'],
      },
      {
        title: 'Harry Roberts',
        href: 'https://csswizardry.com/',
        description:
          'CSS architecture expert sharing insights on scalable CSS, performance, and front-end architecture.',
        tags: ['css', 'performance', 'blog', 'free', 'advanced', 'tutorial'],
      },
      {
        title: 'Robin Rendle',
        href: 'https://www.robinrendle.com/',
        description:
          'CSS and design systems expert sharing thoughts on web design, typography, and modern CSS.',
        tags: ['css', 'design', 'blog', 'free', 'advanced', 'tutorial'],
      },
      {
        title: 'Ben Frain',
        href: 'https://benfrain.com/',
        description:
          'Front-end developer sharing insights on responsive design, CSS, and modern web development practices.',
        tags: ['css', 'design', 'blog', 'free', 'advanced', 'tutorial'],
      },
      {
        title: 'Jeremy Keith',
        href: 'https://adactio.com/journal/',
        description:
          'Web standards advocate and author sharing insights on progressive enhancement and modern web development.',
        tags: ['blog', 'free', 'advanced', 'accessibility', 'career-focused'],
      },
      {
        title: 'Rachel Andrew',
        href: 'https://rachelandrew.co.uk/blog/',
        description:
          'CSS Grid expert and web standards advocate sharing insights on modern CSS and web layout.',
        tags: ['css', 'design', 'blog', 'free', 'advanced', 'tutorial'],
      },
      {
        title: 'Jen Simmons',
        href: 'https://jensimmons.com/',
        description:
          'CSS layout expert and former Mozilla developer sharing insights on modern CSS and web design.',
        tags: ['css', 'design', 'blog', 'free', 'advanced', 'tutorial'],
      },
      {
        title: 'Val Head',
        href: 'https://valhead.com/',
        description:
          'Web animation expert sharing insights on CSS animations, motion design, and user experience.',
      },
    ],
  },
];
