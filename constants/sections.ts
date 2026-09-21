// The curated resource dataset: five sections, each holding the links the site
// renders. `satisfies` checks every entry's shape without widening the array.
import type { Resource, Section } from '@/lib/types';

export const SECTIONS = [
  {
    title: 'Learning Resources',
    href: '/learning-resources',
    icon: 'mdi:book-open-page-variant',
    description:
      'Start or advance your web development journey with these educational resources',
    links: [
      {
        title: 'Master.dev',
        href: 'https://master.dev/',
        icon: 'mdi:school-outline',
        description:
          'Frontend Masters, renamed in 2026, with in-depth courses across JavaScript, TypeScript, backend, and AI engineering.',
        tags: [
          'course',
          'paid',
          'javascript',
          'react',
          'vue',
          'advanced',
          'video-based',
        ],
      },
      {
        title: 'Epic Web',
        href: 'https://epicweb.dev/',
        icon: 'simple-icons:rocket',
        description:
          'Full-stack web development workshops with Kent C. Dodds covering TypeScript, React, Node.js, and modern web patterns.',
        tags: [
          'course',
          'paid',
          'full-stack',
          'typescript',
          'react',
          'nodejs',
          'advanced',
          'hands-on',
        ],
      },
      {
        title: 'MDN Web Docs',
        href: 'https://developer.mozilla.org/',
        icon: 'simple-icons:mdnwebdocs',
        description:
          'The definitive resource for web technologies including HTML, CSS, JavaScript APIs, and progressive web app development.',
        tags: [
          'documentation',
          'free',
          'html',
          'css',
          'javascript',
          'reference',
          'beginner-friendly',
        ],
      },
      {
        title: 'FreeCodeCamp',
        href: 'https://www.freecodecamp.org/',
        icon: 'simple-icons:freecodecamp',
        description:
          'Free interactive coding lessons with hands-on projects and industry-recognized certifications.',
        tags: [
          'course',
          'free',
          'beginner-friendly',
          'interactive',
          'hands-on',
          'full-stack',
          'javascript',
        ],
      },
      {
        title: 'Codecademy',
        href: 'https://www.codecademy.com/',
        icon: 'simple-icons:codecademy',
        description:
          'Interactive coding lessons and projects to build real-world skills in web development and programming.',
        tags: [
          'course',
          'paid',
          'beginner-friendly',
          'interactive',
          'hands-on',
          'javascript',
          'python',
        ],
      },
      {
        title: 'web.dev',
        href: 'https://web.dev/',
        icon: 'simple-icons:google',
        description:
          "Google's comprehensive resource for modern web development, performance optimization, and best practices.",
        tags: [
          'tutorial',
          'free',
          'performance',
          'accessibility',
          'modern',
          'hands-on',
          'beginner-friendly',
        ],
      },
      {
        title: 'Testing JavaScript',
        href: 'https://www.testingjavascript.com/',
        icon: 'simple-icons:testinglibrary',
        description:
          'Comprehensive testing strategies and patterns for JavaScript applications with Kent C. Dodds.',
        tags: [
          'course',
          'paid',
          'testing',
          'javascript',
          'advanced',
          'video-based',
        ],
      },
      {
        title: 'Epic React',
        href: 'https://www.epicreact.dev/',
        icon: 'simple-icons:react',
        description:
          'Advanced React patterns, hooks, performance optimization, and testing strategies for production applications.',
        tags: [
          'course',
          'paid',
          'react',
          'advanced',
          'performance',
          'testing',
          'video-based',
        ],
      },
      {
        title: 'Great Frontend',
        href: 'https://www.greatfrontend.com/',
        icon: 'simple-icons:frontendmentor',
        description:
          'Comprehensive front-end interview preparation with 200+ practice questions from ex-FAANG interviewers.',
        tags: [
          'interview-prep',
          'paid',
          'coding-challenges',
          'javascript',
          'react',
          'css',
          'advanced',
        ],
      },
      {
        title: 'Design Gurus',
        href: 'https://www.designgurus.io/',
        icon: 'mdi:pencil-ruler',
        description:
          'Grokking courses for technical interviews with system design, algorithms, and front-end engineering focus.',
        tags: [
          'interview-prep',
          'paid',
          'system-design',
          'coding-challenges',
          'advanced',
          'course',
        ],
      },
      {
        title: 'CodeTV',
        href: 'https://codetv.dev/',
        icon: 'mdi:television-play',
        description:
          'Jason Lengstorf\'s developer TV network, home to Learn With Jason live coding sessions and Web Dev Challenge.',
        tags: [
          'tutorial',
          'free',
          'video-based',
          'hands-on',
          'javascript',
          'react',
          'modern',
        ],
      },
      {
        title: 'CSS-Tricks',
        href: 'https://css-tricks.com/',
        icon: 'simple-icons:css3',
        description:
          'Daily articles about CSS, HTML, JavaScript, and web design with practical examples and tutorials.',
        tags: [
          'blog',
          'free',
          'css',
          'html',
          'javascript',
          'design',
          'tutorial',
          'beginner-friendly',
        ],
      },
      {
        title: 'Smashing Magazine',
        href: 'https://www.smashingmagazine.com/',
        icon: 'simple-icons:smashingmagazine',
        description:
          'Leading online magazine for professional web designers and developers with in-depth articles and case studies.',
        tags: [
          'blog',
          'free',
          'design',
          'advanced',
          'css',
          'javascript',
          'tutorial',
        ],
      },
      {
        title: 'Frontend At Scale',
        href: 'https://frontendatscale.com/',
        icon: 'mdi:scale-balance',
        description:
          'Articles and insights on software design and architecture specifically tailored for frontend engineers.',
        tags: [
          'blog',
          'free',
          'advanced',
          'system-design',
          'javascript',
          'performance',
        ],
      },
      {
        title: 'Frontend Interview Handbook',
        href: 'https://www.frontendinterviewhandbook.com/',
        icon: 'mdi:book-open-page-variant',
        description:
          'Comprehensive guide for frontend interview preparation with JavaScript, React, CSS, and system design questions.',
        tags: [
          'interview-prep',
          'free',
          'javascript',
          'react',
          'css',
          'system-design',
          'open-source',
        ],
      },
      {
        title: 'LeetCode',
        href: 'https://leetcode.com/',
        icon: 'simple-icons:leetcode',
        description:
          'Platform for practicing coding problems and preparing for technical interviews with 2000+ programming challenges.',
        tags: [
          'interview-prep',
          'coding-challenges',
          'free',
          'paid',
          'javascript',
          'python',
          'platform',
        ],
      },
      {
        title: 'AlgoExpert',
        href: 'https://www.algoexpert.io/',
        icon: 'mdi:brain',
        description:
          'Comprehensive platform for learning algorithms and data structures with video explanations and practice problems.',
        tags: [
          'interview-prep',
          'paid',
          'coding-challenges',
          'video-based',
          'javascript',
          'python',
          'advanced',
        ],
      },
      {
        title: 'System Design Primer',
        href: 'https://github.com/donnemartin/system-design-primer',
        icon: 'mdi:file-document',
        description:
          'Open-source collection of resources for learning large-scale system design and architecture patterns.',
        tags: [
          'system-design',
          'free',
          'open-source',
          'interview-prep',
          'advanced',
          'documentation',
        ],
      },
      {
        title: 'JavaScript.info',
        href: 'https://javascript.info/',
        icon: 'mdi:language-javascript',
        description:
          'Modern JavaScript tutorial covering from basics to advanced topics with detailed explanations and examples.',
        tags: [
          'tutorial',
          'free',
          'javascript',
          'beginner-friendly',
          'advanced',
          'interactive',
        ],
      },
      {
        title: 'React Tutorial',
        href: 'https://react.dev/learn',
        icon: 'simple-icons:react',
        description:
          'Official React tutorial with interactive examples and comprehensive guides for building modern UIs.',
        tags: [
          'tutorial',
          'free',
          'react',
          'interactive',
          'beginner-friendly',
          'documentation',
        ],
      },
      {
        title: 'TypeScript Handbook',
        href: 'https://www.typescriptlang.org/docs/',
        icon: 'simple-icons:typescript',
        description:
          'Official TypeScript documentation with tutorials, reference materials, and examples for type-safe JavaScript.',
        tags: [
          'documentation',
          'free',
          'typescript',
          'reference',
          'beginner-friendly',
          'advanced',
        ],
      },
      {
        title: 'CSS Reference',
        href: 'https://cssreference.io/',
        icon: 'simple-icons:css3',
        description:
          'Visual guide to CSS properties with examples, browser support, and interactive demonstrations.',
        tags: [
          'reference',
          'free',
          'css',
          'interactive',
          'beginner-friendly',
          'documentation',
        ],
      },
      {
        title: 'HTML Reference',
        href: 'https://htmlreference.io/',
        icon: 'simple-icons:html5',
        description:
          'Visual guide to HTML elements with examples, attributes, and browser compatibility information.',
        tags: [
          'reference',
          'free',
          'html',
          'beginner-friendly',
          'documentation',
        ],
      },
      {
        title: 'Web.dev Learn',
        href: 'https://web.dev/learn/',
        icon: 'simple-icons:google',
        description:
          'Structured learning paths for modern web development covering HTML, CSS, JavaScript, and performance.',
        tags: [
          'course',
          'free',
          'html',
          'css',
          'javascript',
          'performance',
          'modern',
          'hands-on',
        ],
      },
      {
        title: 'Frontend Mentor',
        href: 'https://www.frontendmentor.io/',
        icon: 'simple-icons:frontendmentor',
        description:
          'Real-world frontend challenges with designs to practice HTML, CSS, and JavaScript skills.',
        tags: [
          'coding-challenges',
          'free',
          'paid',
          'html',
          'css',
          'javascript',
          'design',
          'hands-on',
        ],
      },
      {
        title: 'Codewars',
        href: 'https://www.codewars.com/',
        icon: 'simple-icons:codewars',
        description:
          'Platform for improving coding skills through kata challenges in JavaScript, Python, and other languages.',
        tags: [
          'coding-challenges',
          'free',
          'javascript',
          'python',
          'platform',
          'interactive',
        ],
      },
      {
        title: 'Exercism',
        href: 'https://exercism.org/',
        icon: 'simple-icons:exercism',
        description:
          'Free platform for learning programming languages through exercises and mentorship from experienced developers.',
        tags: [
          'coding-challenges',
          'free',
          'javascript',
          'python',
          'community',
          'beginner-friendly',
        ],
      },
      {
        title: 'The Odin Project',
        href: 'https://www.theodinproject.com/',
        icon: 'simple-icons:odin',
        description:
          'Free full-stack curriculum with projects and community support for learning web development from scratch.',
        tags: [
          'course',
          'free',
          'full-stack',
          'beginner-friendly',
          'hands-on',
          'community',
          'open-source',
        ],
      },
      {
        title: 'Full Stack Open',
        href: 'https://fullstackopen.com/',
        icon: 'mdi:code-braces',
        description:
          'Modern web application development course covering React, Redux, Node.js, MongoDB, and GraphQL.',
        tags: [
          'course',
          'free',
          'full-stack',
          'react',
          'nodejs',
          'database',
          'modern',
          'hands-on',
        ],
      },
      {
        title: 'JavaScript30',
        href: 'https://javascript30.com/',
        icon: 'mdi:language-javascript',
        description:
          '30-day vanilla JavaScript coding challenge with video tutorials and real-world projects.',
        tags: [
          'coding-challenges',
          'free',
          'javascript',
          'video-based',
          'hands-on',
          'beginner-friendly',
        ],
      },
      {
        title: 'CSS Grid Garden',
        href: 'https://cssgridgarden.com/',
        icon: 'mdi:grid',
        description:
          'Interactive game for learning CSS Grid layout with visual feedback and progressive difficulty.',
        tags: [
          'interactive',
          'free',
          'css',
          'beginner-friendly',
          'tutorial',
        ],
      },
      {
        title: 'Flexbox Froggy',
        href: 'https://flexboxfroggy.com/',
        icon: 'simple-icons:css3',
        description:
          'Interactive game for learning CSS Flexbox with visual feedback and progressive difficulty levels.',
        tags: [
          'interactive',
          'free',
          'css',
          'beginner-friendly',
          'tutorial',
        ],
      },
      {
        title: 'AI Tutor',
        href: 'https://roadmap.sh/ai',
        icon: 'mdi:robot-happy',
        description:
          'Your personalized learning companion for any topic by roadmap.sh',
        tags: [
          'ai',
          'free',
          'personalized',
          'tutorial',
          'modern',
          'beginner-friendly',
        ],
      },
      {
        title: 'roadmap.sh',
        href: 'https://roadmap.sh/',
        icon: 'mdi:map-marker-path',
        description:
          'Community-driven step-by-step roadmaps for frontend, backend, and DevOps careers with curated resources at every node.',
        tags: [
          'tutorial',
          'free',
          'open-source',
          'career-focused',
          'full-stack',
          'community',
          'beginner-friendly',
        ],
      },
      {
        title: 'Total TypeScript',
        href: 'https://www.totaltypescript.com/',
        icon: 'simple-icons:typescript',
        description:
          'Exercise-driven TypeScript training from Matt Pocock, with free tutorials on generics, type transformations, and library-grade types.',
        tags: [
          'course',
          'free',
          'paid',
          'typescript',
          'advanced',
          'interactive',
          'hands-on',
        ],
      },
      {
        title: 'Patterns.dev',
        href: 'https://www.patterns.dev/',
        icon: 'mdi:puzzle-outline',
        description:
          'Free book on design, rendering, and performance patterns for modern web apps by Lydia Hallie and Addy Osmani.',
        tags: [
          'documentation',
          'free',
          'javascript',
          'react',
          'performance',
          'system-design',
          'advanced',
        ],
      },
      {
        title: 'Scrimba',
        href: 'https://scrimba.com/',
        icon: 'mdi:play-box-outline',
        description:
          "Interactive courses you edit while the video plays; its Frontend Career Path is MDN's recommended course partner.",
        tags: [
          'course',
          'free',
          'paid',
          'interactive',
          'javascript',
          'react',
          'career-focused',
          'beginner-friendly',
        ],
      },
      {
        title: 'Josh W. Comeau Courses',
        href: 'https://www.joshwcomeau.com/courses/',
        icon: 'mdi:palette-outline',
        description:
          'Deep interactive courses on CSS, React, and web animation, including CSS for JavaScript Developers and The Joy of React.',
        tags: [
          'course',
          'paid',
          'css',
          'react',
          'interactive',
          'advanced',
          'hands-on',
        ],
      },
      {
        title: 'Practical Accessibility',
        href: 'https://practical-accessibility.today/',
        icon: 'mdi:human',
        description:
          "Sara Soueidan's video course on semantic HTML, ARIA, and WCAG for building genuinely accessible interfaces.",
        tags: [
          'course',
          'paid',
          'accessibility',
          'html',
          'video-based',
          'advanced',
          'hands-on',
        ],
      },
      {
        title: 'The A11Y Project',
        href: 'https://www.a11yproject.com/',
        icon: 'mdi:checkbox-marked-circle-outline',
        description:
          'Community-maintained accessibility checklist, patterns, and resources for shipping inclusive web interfaces.',
        tags: [
          'documentation',
          'free',
          'accessibility',
          'open-source',
          'community',
          'beginner-friendly',
        ],
      },
      {
        title: 'Defensive CSS',
        href: 'https://defensivecss.dev/',
        icon: 'mdi:shield-outline',
        description:
          "Ahmad Shadeed's catalogue of CSS patterns that keep layouts from breaking on long strings, odd images, and dynamic content.",
        tags: [
          'tutorial',
          'free',
          'css',
          'design',
          'advanced',
          'hands-on',
        ],
      },
      {
        title: 'Learn Git Branching',
        href: 'https://learngitbranching.js.org/',
        icon: 'simple-icons:git',
        description:
          'Interactive Git tutorial that visualises the commit tree as you run real branching, merging, and rebasing commands.',
        tags: [
          'interactive',
          'free',
          'open-source',
          'tutorial',
          'hands-on',
          'beginner-friendly',
        ],
      },
      {
        title: 'BFE.dev',
        href: 'https://bigfrontend.dev/',
        icon: 'mdi:code-tags-check',
        description:
          'Frontend-specific coding problems, quizzes, and system design questions across JavaScript, React, TypeScript, and CSS.',
        tags: [
          'interview-prep',
          'coding-challenges',
          'free',
          'paid',
          'javascript',
          'react',
          'typescript',
          'css',
        ],
      },
      {
        title: 'NeetCode',
        href: 'https://neetcode.io/',
        icon: 'mdi:sitemap-outline',
        description:
          'Curated data structures and algorithms roadmap with free video walkthroughs of the essential interview problems.',
        tags: [
          'interview-prep',
          'free',
          'coding-challenges',
          'video-based',
          'javascript',
          'python',
          'career-focused',
        ],
      },
      {
        title: 'Anthropic Academy',
        href: 'https://academy.claude.com/',
        icon: 'simple-icons:anthropic',
        description:
          "Anthropic's own curriculum for building with Claude, covering the API, tool use, agent design, and Claude Code workflows.",
        tags: [
          'course',
          'free',
          'ai',
          'agent',
          'modern',
          'hands-on',
        ],
      },
      {
        title: 'Claude Docs',
        href: 'https://platform.claude.com/docs',
        icon: 'simple-icons:claude',
        description:
          'Reference for the Claude API, tool use, context management, and the Agent SDK, alongside prompting guides and model comparisons.',
        tags: [
          'documentation',
          'free',
          'ai',
          'agent',
          'reference',
          'advanced',
        ],
      },
      {
        title: 'DeepLearning.AI',
        href: 'https://www.deeplearning.ai/',
        icon: 'mdi:school',
        description:
          'Short courses and specializations on LLMs, retrieval, agents, and evaluation, each taught with the tooling teams actually ship.',
        tags: [
          'course',
          'free',
          'paid',
          'ai',
          'video-based',
          'beginner-friendly',
        ],
      },
      {
        title: 'Hugging Face Learn',
        href: 'https://huggingface.co/learn',
        icon: 'simple-icons:huggingface',
        description:
          'Free courses on transformers, diffusion models, agents, and MCP, each built around notebooks you run against real open models.',
        tags: [
          'course',
          'free',
          'ai',
          'hands-on',
          'open-source',
          'advanced',
        ],
      },
      {
        title: 'Prompt Engineering Guide',
        href: 'https://www.promptingguide.ai/',
        icon: 'mdi:message-text-outline',
        description:
          'Paper-backed catalogue of prompting techniques from few-shot to ReAct, with a worked example behind every entry.',
        tags: [
          'documentation',
          'free',
          'ai',
          'open-source',
          'reference',
          'advanced',
        ],
      },
      {
        title: 'OpenAI Cookbook',
        href: 'https://developers.openai.com/cookbook',
        icon: 'simple-icons:openai',
        description:
          'Runnable recipes for structured outputs, function calling, embeddings, evals, and agent loops against the OpenAI API.',
        tags: [
          'documentation',
          'free',
          'ai',
          'open-source',
          'hands-on',
          'advanced',
        ],
      },
      {
        title: 'Claude Cookbooks',
        href: 'https://github.com/anthropics/claude-cookbooks',
        icon: 'simple-icons:anthropic',
        description:
          "Anthropic's notebook collection showing tool use, sub-agents, retrieval, and vision patterns as code you can run and adapt.",
        tags: [
          'documentation',
          'free',
          'ai',
          'agent',
          'open-source',
          'hands-on',
        ],
      },
      {
        title: 'OpenAI Platform Docs',
        href: 'https://developers.openai.com/api/docs',
        icon: 'simple-icons:openai',
        description:
          'Reference for the OpenAI API — responses, structured outputs, function calling, embeddings, and realtime — with a guide beside every endpoint.',
        tags: [
          'documentation',
          'free',
          'ai',
          'agent',
          'api',
          'reference',
          'advanced',
        ],
      },
      {
        title: 'Gemini API Docs',
        href: 'https://ai.google.dev/gemini-api/docs',
        icon: 'simple-icons:googlegemini',
        description:
          "Google's developer docs for Gemini, covering long context, multimodal input, function calling, grounding, and which model family fits which job.",
        tags: [
          'documentation',
          'free',
          'ai',
          'api',
          'reference',
          'modern',
          'advanced',
        ],
      },
      {
        title: 'Gemini Cookbook',
        href: 'https://github.com/google-gemini/cookbook',
        icon: 'simple-icons:googlegemini',
        description:
          'Notebooks from Google showing Gemini against real tasks — long documents, video, structured output, and tool calling.',
        tags: [
          'documentation',
          'free',
          'ai',
          'open-source',
          'hands-on',
          'advanced',
        ],
      },
      {
        title: 'Mistral AI Docs',
        href: 'https://docs.mistral.ai/',
        icon: 'simple-icons:mistralai',
        description:
          "API and deployment guides for Mistral's open and commercial models, including fine-tuning, embeddings, and self-hosted inference.",
        tags: [
          'documentation',
          'free',
          'ai',
          'api',
          'open-source',
          'reference',
          'advanced',
        ],
      },
      {
        title: 'Grok API Docs',
        href: 'https://docs.x.ai/',
        icon: 'simple-icons:x',
        description:
          'Quickstarts and API reference for Grok, spanning chat, image and video generation, voice, tool calling, and structured outputs.',
        tags: [
          'documentation',
          'free',
          'ai',
          'api',
          'reference',
          'modern',
        ],
      },
      {
        title: 'DeepSeek API Docs',
        href: 'https://api-docs.deepseek.com/',
        icon: 'simple-icons:deepseek',
        description:
          "OpenAI-compatible reference for DeepSeek's chat and reasoning models, documenting context caching, reasoning output, and per-token pricing.",
        tags: [
          'documentation',
          'free',
          'ai',
          'api',
          'reference',
          'advanced',
        ],
      },
      {
        title: 'Cohere Docs',
        href: 'https://docs.cohere.com/',
        icon: 'mdi:alpha-c-circle-outline',
        description:
          "Docs for Cohere's command, embed, and rerank models, written around retrieval and enterprise search rather than chat alone.",
        tags: [
          'documentation',
          'free',
          'ai',
          'api',
          'reference',
          'advanced',
        ],
      },
      {
        title: 'Hugging Face Transformers',
        href: 'https://huggingface.co/docs/transformers',
        icon: 'simple-icons:huggingface',
        description:
          'Reference for the library most open models ship against, covering loading, generation, quantization, and fine-tuning in Python.',
        tags: [
          'documentation',
          'free',
          'ai',
          'python',
          'open-source',
          'reference',
          'advanced',
        ],
      },
      {
        title: 'Microsoft Foundry Docs',
        href: 'https://learn.microsoft.com/en-us/azure/foundry/',
        icon: 'mdi:microsoft-azure',
        description:
          "Microsoft's platform docs for deploying models, agents, and evaluations on Azure, with the quotas and regions each model is bound by.",
        tags: [
          'documentation',
          'free',
          'ai',
          'agent',
          'reference',
          'advanced',
        ],
      },
      {
        title: 'PyTorch Tutorials',
        href: 'https://docs.pytorch.org/tutorials/',
        icon: 'simple-icons:pytorch',
        description:
          'Official runnable tutorials for PyTorch, from tensors and autograd through training loops, fine-tuning, and deployment.',
        tags: [
          'documentation',
          'free',
          'ai',
          'python',
          'open-source',
          'hands-on',
          'advanced',
        ],
      },
      {
        title: 'Model Context Protocol',
        href: 'https://modelcontextprotocol.io/',
        icon: 'mdi:transit-connection-variant',
        description:
          'Spec and quickstarts for MCP, the open standard letting agents reach tools, data, and prompts through one interface.',
        tags: [
          'documentation',
          'free',
          'ai',
          'agent',
          'open-source',
          'reference',
          'modern',
        ],
      },
      {
        title: 'AGENTS.md',
        href: 'https://agents.md/',
        icon: 'mdi:file-document-edit-outline',
        description:
          'Open format for the instructions file coding agents read, honored across tools so one file serves Claude Code, Codex, and Cursor alike.',
        tags: [
          'documentation',
          'free',
          'ai',
          'agent',
          'open-source',
          'reference',
          'modern',
        ],
      },
      {
        title: 'Agent Skills',
        href: 'https://agentskills.io/',
        icon: 'mdi:puzzle-outline',
        description:
          'Open specification for SKILL.md packages, loaded on demand so one skill works across Claude Code, Codex, Cursor, and Copilot.',
        tags: [
          'documentation',
          'free',
          'ai',
          'agent',
          'open-source',
          'reference',
          'modern',
        ],
      },
      {
        title: 'Claude Code Docs',
        href: 'https://code.claude.com/docs/en/overview',
        icon: 'simple-icons:anthropic',
        description:
          'Reference for Claude Code — subagents, hooks, slash commands, MCP servers, and the settings governing what the agent may touch.',
        tags: [
          'documentation',
          'free',
          'ai',
          'agent',
          'tool',
          'reference',
          'modern',
        ],
      },
      {
        title: 'Cursor Docs',
        href: 'https://cursor.com/docs',
        icon: 'simple-icons:cursor',
        description:
          "How Cursor's agent, rules, and MCP integration actually work, alongside the CLI and the codebase indexing behind them.",
        tags: [
          'documentation',
          'free',
          'ai',
          'agent',
          'tool',
          'reference',
          'modern',
        ],
      },
      {
        title: 'GitHub Copilot Docs',
        href: 'https://docs.github.com/en/copilot',
        icon: 'simple-icons:githubcopilot',
        description:
          "GitHub's reference for Copilot across editor, CLI, and coding agent, covering custom instructions and organization policy.",
        tags: [
          'documentation',
          'free',
          'ai',
          'agent',
          'tool',
          'reference',
          'advanced',
        ],
      },
      {
        title: 'Codex Docs',
        href: 'https://learn.chatgpt.com/docs/codex/cli',
        icon: 'simple-icons:openai',
        description:
          'Setup and configuration for the Codex CLI, covering approval modes, sandboxing, and running the agent against your own repository.',
        tags: [
          'documentation',
          'free',
          'ai',
          'agent',
          'tool',
          'reference',
          'modern',
        ],
      },
      {
        title: 'Aider Docs',
        href: 'https://aider.chat/docs/',
        icon: 'mdi:console',
        description:
          'Configuration and usage for Aider, including model choice, repository maps, and the commit-per-edit git workflow it is built around.',
        tags: [
          'documentation',
          'free',
          'ai',
          'agent',
          'tool',
          'open-source',
          'reference',
        ],
      },
      {
        title: 'Cline Docs',
        href: 'https://docs.cline.bot/',
        icon: 'mdi:robot-excited',
        description:
          'Reference for the Cline editor agent — plan and act modes, MCP servers, checkpoints, and bringing your own provider key.',
        tags: [
          'documentation',
          'free',
          'ai',
          'agent',
          'tool',
          'open-source',
          'reference',
        ],
      },
      {
        title: 'Continue Docs',
        href: 'https://docs.continue.dev/',
        icon: 'mdi:arrow-right-circle-outline',
        description:
          'Docs for the open-source Continue extension, covering custom assistants, context providers, and pointing it at local models.',
        tags: [
          'documentation',
          'free',
          'ai',
          'agent',
          'tool',
          'open-source',
          'reference',
        ],
      },
      {
        title: 'OpenCode Docs',
        href: 'https://opencode.ai/docs/',
        icon: 'simple-icons:opencode',
        description:
          'Reference for the terminal agent, covering providers, shared sessions, and the config driving its non-interactive runs.',
        tags: [
          'documentation',
          'free',
          'ai',
          'agent',
          'tool',
          'open-source',
          'reference',
        ],
      },
      {
        title: 'Kiro Docs',
        href: 'https://kiro.dev/docs/',
        icon: 'mdi:robot-industrial',
        description:
          "Reference for AWS's spec-driven agent IDE, covering specs, steering files, and hooks that fire on repository events.",
        tags: [
          'documentation',
          'free',
          'ai',
          'agent',
          'tool',
          'reference',
          'modern',
        ],
      },
      {
        title: 'Ollama Docs',
        href: 'https://docs.ollama.com/',
        icon: 'simple-icons:ollama',
        description:
          'Reference for running models locally — Modelfiles, the REST API, GPU configuration, and the OpenAI-compatible endpoint.',
        tags: [
          'documentation',
          'free',
          'ai',
          'tool',
          'open-source',
          'reference',
          'advanced',
        ],
      },
      {
        title: 'Langfuse Docs',
        href: 'https://langfuse.com/docs',
        icon: 'mdi:chart-timeline-variant-shimmer',
        description:
          'Docs for the open-source LLM observability stack — tracing, prompt management, evaluations, and running it self-hosted.',
        tags: [
          'documentation',
          'free',
          'ai',
          'agent',
          'tool',
          'open-source',
          'advanced',
        ],
      },
      {
        title: 'fast.ai',
        href: 'https://www.fast.ai/',
        icon: 'mdi:rocket-launch-outline',
        description:
          'Practical Deep Learning, taught top-down from working code rather than from the mathematics up.',
        tags: [
          'course',
          'free',
          'ai',
          'python',
          'hands-on',
          'advanced',
        ],
      },
      {
        title: 'Web Platform Status',
        href: 'https://webstatus.dev/',
        icon: 'mdi:chart-timeline-variant',
        description:
          'Baseline dashboard for which web features are safe to use today, with per-feature interoperability timelines across browsers.',
        tags: [
          'reference',
          'free',
          'css',
          'javascript',
          'html',
          'documentation',
          'modern',
        ],
      },
      {
        title: 'CodeCrafters',
        href: 'https://codecrafters.io/',
        icon: 'mdi:hammer-wrench',
        description:
          'Build-your-own-X challenges — Redis, Git, an interpreter, an HTTP server — staged in the language you want to practise.',
        tags: [
          'free',
          'paid',
          'hands-on',
          'advanced',
          'interactive',
          'coding-challenges',
        ],
      },
      {
        title: 'Next.js Learn',
        href: 'https://nextjs.org/learn',
        icon: 'simple-icons:nextdotjs',
        description:
          'Official Next.js course that builds an App Router dashboard end to end with server components, streaming, and mutations.',
        tags: [
          'course',
          'free',
          'react',
          'typescript',
          'tutorial',
          'hands-on',
          'modern',
        ],
      },
      {
        title: 'Svelte Tutorial',
        href: 'https://svelte.dev/tutorial',
        icon: 'simple-icons:svelte',
        description:
          'Interactive walkthrough of Svelte and SvelteKit that runs entirely in the browser, from runes to server routes.',
        tags: [
          'tutorial',
          'free',
          'interactive',
          'javascript',
          'beginner-friendly',
          'hands-on',
        ],
      },
      {
        title: 'Can I Use',
        href: 'https://caniuse.com/',
        icon: 'mdi:table-check',
        description:
          'Per-browser support tables for every web platform feature, with usage share so you can judge what a fallback is worth.',
        tags: [
          'reference',
          'free',
          'css',
          'javascript',
          'html',
          'documentation',
        ],
      },
      {
        title: 'MDN Curriculum',
        href: 'https://developer.mozilla.org/en-US/curriculum/',
        icon: 'simple-icons:mdnwebdocs',
        description:
          "Mozilla's ordered path through front-end development, naming what to learn, in what sequence, and what employers expect.",
        tags: [
          'course',
          'free',
          'html',
          'css',
          'javascript',
          'beginner-friendly',
          'career-focused',
        ],
      },
      {
        title: 'State of JS',
        href: 'https://stateofjs.com/',
        icon: 'mdi:poll',
        description:
          'Annual survey of what developers actually use and abandon across the JavaScript ecosystem, charted over years.',
        tags: [
          'reference',
          'free',
          'javascript',
          'documentation',
          'trending',
        ],
      },
      {
        title: 'Web Almanac',
        href: 'https://almanac.httparchive.org/',
        icon: 'mdi:book-open-variant',
        description:
          "HTTP Archive's yearly report on how the web is really built, measured across millions of production sites.",
        tags: [
          'reference',
          'free',
          'performance',
          'documentation',
          'advanced',
        ],
      },
      {
        title: 'TC39 Proposals',
        href: 'https://github.com/tc39/proposals',
        icon: 'simple-icons:javascript',
        description:
          'The live list of JavaScript language proposals and the stage each one has reached on its way into the spec.',
        tags: [
          'reference',
          'free',
          'javascript',
          'documentation',
          'open-source',
          'advanced',
        ],
      },
      {
        title: 'Fireship',
        href: 'https://fireship.dev/',
        icon: 'mdi:fire',
        description:
          "Jeff Delaney's fast-paced courses and videos on frameworks, tooling, and whatever shipped last week.",
        tags: [
          'course',
          'free',
          'paid',
          'javascript',
          'video-based',
          'trending',
        ],
      },
      {
        title: 'Kevin Powell',
        href: 'https://www.kevinpowell.co/',
        icon: 'mdi:account',
        description:
          'CSS-focused videos and courses that work through modern layout and styling by rebuilding real interfaces.',
        tags: [
          'course',
          'free',
          'paid',
          'css',
          'video-based',
          'beginner-friendly',
        ],
      },
      {
        title: 'Every Layout',
        href: 'https://every-layout.dev/',
        icon: 'mdi:view-grid-outline',
        description:
          'A set of composable CSS layout primitives, each derived from first principles rather than copied from a framework.',
        tags: [
          'reference',
          'free',
          'paid',
          'css',
          'design',
          'advanced',
        ],
      },
      {
        title: 'The Copenhagen Book',
        href: 'https://thecopenhagenbook.com/',
        icon: 'mdi:shield-key-outline',
        description:
          'Concise, implementation-agnostic reference for doing web auth correctly — sessions, tokens, password storage, and MFA.',
        tags: [
          'reference',
          'free',
          'open-source',
          'authentication',
          'security',
          'advanced',
        ],
      },
      {
        title: 'Advent of Code',
        href: 'https://adventofcode.com/',
        icon: 'mdi:pine-tree',
        description:
          'December puzzle calendar that has become the yearly excuse to learn a new language alongside everyone else.',
        tags: [
          'free',
          'coding-challenges',
          'hands-on',
          'interactive',
          'community',
        ],
      },
    ],
  },
  {
    title: 'Developer Tools',
    href: '/developer-tools',
    icon: 'mdi:tools',
    description:
      'Essential tools to streamline your development workflow',
    links: [
      {
        title: 'Visual Studio Code',
        href: 'https://code.visualstudio.com/',
        icon: 'simple-icons:visualstudiocode',
        description:
          'Open source AI code editor with agent mode, next edit suggestions, and support for multiple AI models like Claude Sonnet, GPT-4, and more.',
        tags: [
          'editor',
          'ai',
          'tool',
          'free',
          'open-source',
          'trending',
          'beginner-friendly',
          'agent',
        ],
      },
      {
        title: 'GitHub',
        href: 'https://github.com/',
        icon: 'simple-icons:github',
        description:
          "The world's leading platform for version control, collaboration, and open-source development with 100M+ developers.",
        tags: [
          'platform',
          'free',
          'paid',
          'open-source',
          'community',
          'trending',
        ],
      },
      {
        title: 'Figma',
        href: 'https://www.figma.com/',
        icon: 'simple-icons:figma',
        description:
          'Collaborative design platform for creating, prototyping, and sharing design systems and user interfaces.',
        tags: [
          'design',
          'free',
          'paid',
          'tool',
          'trending',
          'community',
        ],
      },
      {
        title: 'Vercel',
        href: 'https://vercel.com/',
        icon: 'simple-icons:vercel',
        description:
          'Platform for deploying and hosting modern web applications with automatic scaling and global CDN.',
        tags: [
          'deployment',
          'free',
          'paid',
          'platform',
          'trending',
          'performance',
        ],
      },
      {
        title: 'Amazon Web Services',
        href: 'https://aws.amazon.com/',
        icon: 'simple-icons:amazonaws',
        description:
          'Comprehensive cloud computing platform offering 200+ services for building scalable web applications.',
        tags: [
          'deployment',
          'paid',
          'platform',
          'advanced',
          'database',
          'performance',
        ],
      },
      {
        title: 'Google Cloud',
        href: 'https://cloud.google.com/',
        icon: 'simple-icons:googlecloud',
        description:
          'Enterprise-grade cloud platform with AI/ML services, serverless computing, and global infrastructure.',
        tags: [
          'deployment',
          'paid',
          'platform',
          'advanced',
          'ai',
          'database',
          'performance',
        ],
      },
      {
        title: 'Unsplash',
        href: 'https://unsplash.com/',
        icon: 'simple-icons:unsplash',
        description:
          'High-quality stock photography platform with free images for commercial and personal web projects.',
        tags: ['design', 'free', 'platform', 'beginner-friendly'],
      },
      {
        title: 'Turso',
        href: 'https://turso.tech/',
        icon: 'simple-icons:sqlite',
        description:
          'Edge database built on SQLite with global distribution, perfect for modern web applications requiring low latency.',
        tags: [
          'database',
          'free',
          'paid',
          'platform',
          'modern',
          'performance',
        ],
      },
      {
        title: 'Netlify',
        href: 'https://www.netlify.com/',
        icon: 'simple-icons:netlify',
        description:
          'All-in-one platform for building, deploying, and managing modern web applications with serverless functions.',
        tags: [
          'deployment',
          'free',
          'paid',
          'platform',
          'trending',
          'beginner-friendly',
        ],
      },
      {
        title: 'Clerk',
        href: 'https://clerk.com/',
        icon: 'simple-icons:clerk',
        description:
          'Complete authentication and user management solution with pre-built components for React, Next.js, and modern web.',
        tags: [
          'authentication',
          'free',
          'paid',
          'react',
          'platform',
          'modern',
        ],
      },
      {
        title: 'Cloudinary',
        href: 'https://cloudinary.com/',
        icon: 'simple-icons:cloudinary',
        description:
          'Cloud-based media management platform with AI-powered image optimization, transformation, and delivery APIs.',
        tags: [
          'ai',
          'platform',
          'free',
          'paid',
          'performance',
          'design',
        ],
      },
      {
        title: 'Sanity',
        href: 'https://www.sanity.io/',
        icon: 'simple-icons:sanity',
        description:
          'Headless CMS with real-time collaboration, customizable content studio, and powerful querying capabilities.',
        tags: [
          'cms',
          'free',
          'paid',
          'platform',
          'modern',
          'database',
        ],
      },
      {
        title: 'Frontmatter',
        href: 'https://frontmatter.codes/',
        icon: 'mdi:markdown',
        description:
          'Visual Studio Code extension for managing static site content with support for Hugo, Jekyll, and modern frameworks.',
        tags: ['cms', 'free', 'tool', 'open-source'],
      },
      {
        title: 'Adobe Express',
        href: 'https://www.adobe.com/express/',
        icon: 'simple-icons:adobe',
        description:
          'All-in-one design tool for creating graphics, videos, and web content with AI-powered templates and assets.',
        tags: [
          'design',
          'ai',
          'free',
          'paid',
          'tool',
          'beginner-friendly',
        ],
      },
      {
        title: 'Turborepo',
        href: 'https://turborepo.dev/',
        icon: 'simple-icons:turborepo',
        description:
          'High-performance build system for JavaScript monorepos with intelligent caching and parallel execution.',
        tags: [
          'tool',
          'free',
          'open-source',
          'javascript',
          'performance',
          'advanced',
        ],
      },
      {
        title: 'Webpack',
        href: 'https://webpack.js.org/',
        icon: 'simple-icons:webpack',
        description:
          'Powerful module bundler for JavaScript applications with extensive plugin ecosystem and optimization features.',
        tags: [
          'tool',
          'free',
          'open-source',
          'javascript',
          'performance',
          'advanced',
        ],
      },
      {
        title: 'Rollup',
        href: 'https://rollupjs.org/',
        icon: 'simple-icons:rollupdotjs',
        description:
          'Efficient JavaScript module bundler optimized for libraries with tree-shaking and ES module output.',
        tags: [
          'tool',
          'free',
          'open-source',
          'javascript',
          'performance',
          'advanced',
        ],
      },
      {
        title: 'Parcel',
        href: 'https://parceljs.org/',
        icon: 'mdi:package-variant',
        description:
          'Zero-configuration web application bundler with automatic asset optimization and fast development builds.',
        tags: [
          'tool',
          'free',
          'open-source',
          'javascript',
          'performance',
          'beginner-friendly',
        ],
      },
      {
        title: 'SWC',
        href: 'https://swc.rs/',
        icon: 'simple-icons:swc',
        description:
          'Blazing-fast JavaScript/TypeScript compiler written in Rust, designed as a drop-in Babel replacement.',
        tags: [
          'tool',
          'free',
          'open-source',
          'javascript',
          'typescript',
          'performance',
          'advanced',
        ],
      },
      {
        title: 'Esbuild',
        href: 'https://esbuild.github.io/',
        icon: 'simple-icons:esbuild',
        description:
          'Extremely fast JavaScript bundler and minifier written in Go, optimized for large codebases and CI/CD.',
        tags: [
          'tool',
          'free',
          'open-source',
          'javascript',
          'performance',
          'advanced',
        ],
      },
      {
        title: 'Vite',
        href: 'https://vite.dev/',
        icon: 'simple-icons:vite',
        description:
          'Next-generation front-end build tool with instant hot module replacement and optimized production builds.',
        tags: [
          'tool',
          'free',
          'open-source',
          'javascript',
          'performance',
          'trending',
          'modern',
        ],
      },
      {
        title: 'Turbopack',
        href: 'https://nextjs.org/docs/app/api-reference/turbopack',
        icon: 'simple-icons:turborepo',
        description:
          'Incremental bundler optimized for JavaScript and TypeScript, built by Vercel for Next.js applications.',
        tags: [
          'tool',
          'free',
          'open-source',
          'javascript',
          'typescript',
          'performance',
          'modern',
        ],
      },
      {
        title: 'Biome',
        href: 'https://biomejs.dev/',
        icon: 'simple-icons:biome',
        description:
          'All-in-one toolchain for JavaScript and TypeScript with linting, formatting, and bundling capabilities.',
        tags: [
          'tool',
          'free',
          'open-source',
          'javascript',
          'typescript',
          'performance',
          'modern',
        ],
      },
      {
        title: 'Rush',
        href: 'https://rushjs.io/',
        icon: 'mdi:package-variant',
        description:
          "Microsoft's monorepo management tool for large-scale projects with efficient dependency management and builds.",
        tags: [
          'tool',
          'free',
          'open-source',
          'javascript',
          'advanced',
        ],
      },
      {
        title: 'Yarn',
        href: 'https://yarnpkg.com/',
        icon: 'simple-icons:yarn',
        description:
          'Fast, reliable, and secure package manager with workspaces support for monorepo development.',
        tags: [
          'tool',
          'free',
          'open-source',
          'javascript',
          'nodejs',
          'performance',
        ],
      },
      {
        title: 'Lerna',
        href: 'https://lerna.js.org/',
        icon: 'simple-icons:lerna',
        description:
          'Tool for managing JavaScript projects with multiple packages, automating versioning and publishing workflows.',
        tags: [
          'tool',
          'free',
          'open-source',
          'javascript',
          'nodejs',
          'advanced',
        ],
      },
      {
        title: 'NPM',
        href: 'https://www.npmjs.com/',
        icon: 'simple-icons:npm',
        description:
          "World's largest software registry with package management tools for JavaScript and Node.js development.",
        tags: [
          'platform',
          'free',
          'javascript',
          'nodejs',
          'trending',
          'beginner-friendly',
        ],
      },
      {
        title: 'PNPM',
        href: 'https://pnpm.io/',
        icon: 'simple-icons:pnpm',
        description:
          'Fast, disk space efficient package manager with strict dependency resolution and monorepo support.',
        tags: [
          'tool',
          'free',
          'open-source',
          'javascript',
          'nodejs',
          'performance',
        ],
      },
      {
        title: 'Nx',
        href: 'https://nx.dev/',
        icon: 'simple-icons:nx',
        description:
          'Powerful build system and monorepo tool with intelligent caching, affected commands, and code generation.',
        tags: [
          'tool',
          'free',
          'open-source',
          'javascript',
          'typescript',
          'performance',
          'advanced',
        ],
      },
      {
        title: 'ChatGPT',
        href: 'https://chatgpt.com/',
        icon: 'simple-icons:openai',
        description:
          'Advanced AI assistant for code generation, debugging, documentation, and learning web development concepts.',
        tags: [
          'ai',
          'free',
          'paid',
          'platform',
          'trending',
          'beginner-friendly',
        ],
      },
      {
        title: 'Google Gemini',
        href: 'https://gemini.google.com/',
        icon: 'simple-icons:google',
        description:
          "Google's AI assistant for coding assistance, problem-solving, and learning web development technologies.",
        tags: [
          'ai',
          'free',
          'paid',
          'platform',
          'trending',
          'beginner-friendly',
        ],
      },
      {
        title: 'GitHub Copilot',
        href: 'https://github.com/features/copilot',
        icon: 'simple-icons:github',
        description:
          'AI pair programmer that helps write code faster with less effort, available in popular IDEs and editors.',
        tags: ['ai', 'paid', 'tool', 'trending', 'modern'],
      },
      {
        title: 'Cursor',
        href: 'https://cursor.com/',
        icon: 'mdi:cursor-default',
        description:
          'AI-first code editor built on VS Code with advanced AI capabilities for code generation and editing.',
        tags: ['ai', 'free', 'paid', 'tool', 'trending', 'modern'],
      },
      {
        title: 'Figma AI',
        href: 'https://www.figma.com/ai',
        icon: 'simple-icons:figma',
        description:
          'AI-powered design tools for generating UI components, layouts, and design variations in Figma.',
        tags: [
          'ai',
          'design',
          'free',
          'paid',
          'tool',
          'trending',
          'modern',
        ],
      },
      {
        title: 'Adobe Firefly',
        href: 'https://www.adobe.com/products/firefly.html',
        icon: 'simple-icons:adobe',
        description:
          'Generative AI for creating images, vectors, and 3D content for web design and development projects.',
        tags: [
          'ai',
          'design',
          'free',
          'paid',
          'tool',
          'trending',
          'modern',
        ],
      },

      {
        title: 'Amazon Bedrock',
        href: 'https://aws.amazon.com/bedrock/',
        icon: 'simple-icons:amazonaws',
        description:
          'Fully managed service for building and scaling generative AI applications with foundation models.',
        tags: ['ai', 'paid', 'platform', 'advanced', 'modern'],
      },
      {
        title: 'Google AI Studio',
        href: 'https://aistudio.google.com/',
        icon: 'simple-icons:google',
        description:
          "Platform for building AI applications with Google's latest models and development tools.",
        tags: [
          'ai',
          'free',
          'paid',
          'platform',
          'modern',
          'advanced',
        ],
      },
      {
        title: 'Docker',
        href: 'https://www.docker.com/',
        icon: 'simple-icons:docker',
        description:
          'Platform for developing, shipping, and running applications in containers for consistent environments across machines.',
        tags: [
          'tool',
          'free',
          'paid',
          'deployment',
          'advanced',
          'platform',
        ],
      },
      {
        title: 'Kubernetes',
        href: 'https://kubernetes.io/',
        icon: 'simple-icons:kubernetes',
        description:
          'Container orchestration system for automating application deployment, scaling, and management in production.',
        tags: [
          'tool',
          'free',
          'open-source',
          'deployment',
          'advanced',
          'performance',
        ],
      },
      {
        title: 'GitLab',
        href: 'https://about.gitlab.com/',
        icon: 'simple-icons:gitlab',
        description:
          'Complete DevOps platform with Git repository, CI/CD, security scanning, and project management tools.',
        tags: [
          'platform',
          'free',
          'paid',
          'deployment',
          'community',
          'advanced',
        ],
      },
      {
        title: 'Bitbucket',
        href: 'https://bitbucket.org/',
        icon: 'simple-icons:bitbucket',
        description:
          'Git repository management solution with built-in CI/CD and Jira integration for software teams.',
        tags: ['platform', 'free', 'paid', 'deployment', 'community'],
      },
      {
        title: 'CodeSandbox',
        href: 'https://codesandbox.io/',
        icon: 'simple-icons:codesandbox',
        description:
          'Online code editor for rapid web development with instant previews and collaborative features.',
        tags: [
          'tool',
          'free',
          'paid',
          'javascript',
          'react',
          'beginner-friendly',
          'interactive',
        ],
      },
      {
        title: 'StackBlitz',
        href: 'https://stackblitz.com/',
        icon: 'simple-icons:stackblitz',
        description:
          'Online IDE for web development with instant startup, real-time collaboration, and fast preview.',
        tags: [
          'tool',
          'free',
          'paid',
          'javascript',
          'typescript',
          'react',
          'interactive',
          'beginner-friendly',
        ],
      },
      {
        title: 'Replit',
        href: 'https://replit.com/',
        icon: 'simple-icons:replit',
        description:
          'Collaborative, in-browser IDE for coding, hosting and deploying applications in 50+ programming languages.',
        tags: [
          'tool',
          'free',
          'paid',
          'javascript',
          'python',
          'deployment',
          'interactive',
          'beginner-friendly',
        ],
      },
      {
        title: 'Postman',
        href: 'https://www.postman.com/',
        icon: 'simple-icons:postman',
        description:
          'API platform for building, testing, and documenting APIs with collaboration features for development teams.',
        tags: [
          'tool',
          'free',
          'paid',
          'testing',
          'api',
          'advanced',
          'community',
        ],
      },
      {
        title: 'Insomnia',
        href: 'https://insomnia.rest/',
        icon: 'simple-icons:insomnia',
        description:
          'Open-source API client for designing, debugging, and testing REST, GraphQL, and gRPC APIs.',
        tags: [
          'tool',
          'free',
          'open-source',
          'testing',
          'api',
          'advanced',
        ],
      },
      {
        title: 'MongoDB Atlas',
        href: 'https://www.mongodb.com/products/platform/atlas-database',
        icon: 'simple-icons:mongodb',
        description:
          'Multi-cloud developer data platform with fully managed MongoDB database services and built-in search.',
        tags: [
          'database',
          'free',
          'paid',
          'platform',
          'performance',
          'modern',
        ],
      },
      {
        title: 'Supabase',
        href: 'https://supabase.com/',
        icon: 'simple-icons:supabase',
        description:
          'Open-source Firebase alternative with PostgreSQL database, authentication, real-time subscriptions, and storage.',
        tags: [
          'database',
          'free',
          'paid',
          'open-source',
          'authentication',
          'platform',
          'trending',
          'modern',
        ],
      },
      {
        title: 'PlanetScale',
        href: 'https://planetscale.com/',
        icon: 'simple-icons:planetscale',
        description:
          'MySQL-compatible serverless database platform built on Vitess with branching, non-blocking schema changes.',
        tags: [
          'database',
          'paid',
          'platform',
          'performance',
          'modern',
        ],
      },
      {
        title: 'Firebase',
        href: 'https://firebase.google.com/',
        icon: 'simple-icons:firebase',
        description:
          'App development platform with real-time database, authentication, hosting, and serverless functions.',
        tags: [
          'platform',
          'free',
          'paid',
          'database',
          'authentication',
          'deployment',
          'trending',
        ],
      },
      {
        title: 'Auth0',
        href: 'https://auth0.com/',
        icon: 'simple-icons:auth0',
        description:
          'Identity platform for adding authentication and authorization to web, mobile, and legacy applications.',
        tags: [
          'authentication',
          'free',
          'paid',
          'platform',
          'advanced',
        ],
      },
      {
        title: 'Stripe',
        href: 'https://stripe.com/',
        icon: 'simple-icons:stripe',
        description:
          'Payment processing platform for internet businesses with APIs for online payments and subscriptions.',
        tags: ['platform', 'paid', 'api', 'advanced', 'trending'],
      },
      {
        title: 'Datadog',
        href: 'https://www.datadoghq.com/',
        icon: 'simple-icons:datadog',
        description:
          'Monitoring and security platform for cloud applications with real-time observability and analytics.',
        tags: [
          'platform',
          'free',
          'paid',
          'performance',
          'advanced',
          'monitoring',
        ],
      },
      {
        title: 'Sentry',
        href: 'https://sentry.io/',
        icon: 'simple-icons:sentry',
        description:
          'Application monitoring platform that helps identify, fix, and optimize the performance of code.',
        tags: [
          'platform',
          'free',
          'paid',
          'performance',
          'monitoring',
          'advanced',
        ],
      },
      {
        title: 'New Relic',
        href: 'https://newrelic.com/',
        icon: 'simple-icons:newrelic',
        description:
          'Observability platform for monitoring application performance, infrastructure metrics, and user experience.',
        tags: [
          'platform',
          'free',
          'paid',
          'performance',
          'monitoring',
          'advanced',
        ],
      },
      {
        title: 'Lighthouse',
        href: 'https://developer.chrome.com/docs/lighthouse/overview/',
        icon: 'simple-icons:lighthouse',
        description:
          'Open-source tool for auditing web pages and applications for performance, accessibility, and SEO.',
        tags: [
          'tool',
          'free',
          'open-source',
          'performance',
          'accessibility',
          'testing',
          'advanced',
        ],
      },

      {
        title: 'Cloudinary AI',
        href: 'https://cloudinary.com/products/cloudinary_ai',
        icon: 'simple-icons:cloudinary',
        description:
          'AI-powered image and video analysis, tagging, and optimization for web content management.',
        tags: [
          'ai',
          'platform',
          'free',
          'paid',
          'performance',
          'design',
          'modern',
        ],
      },
      {
        title: 'Convex',
        href: 'https://www.convex.dev/',
        icon: 'mdi:database',
        description:
          'Open-source reactive database for app developers with TypeScript-first approach, real-time sync, and backend built-ins.',
        tags: [
          'database',
          'free',
          'open-source',
          'typescript',
          'platform',
          'modern',
          'performance',
          'trending',
        ],
      },
      {
        title: 'Kiro',
        href: 'https://kiro.dev/',
        icon: 'mdi:robot-industrial',
        description:
          'The AI IDE for prototype to production that brings structure to AI coding with spec-driven development and autonomous agent workflows.',
        tags: [
          'ai',
          'ide',
          'tool',
          'paid',
          'modern',
          'trending',
          'productivity',
          'agent',
        ],
      },
      {
        title: 'Claude Code',
        href: 'https://claude.com/product/claude-code',
        icon: 'mdi:console',
        description:
          'Command-line AI coding assistant powered by Claude Opus 4.1 that understands entire codebases and makes coordinated changes across multiple files.',
        tags: [
          'ai',
          'cli',
          'tool',
          'paid',
          'modern',
          'trending',
          'productivity',
          'terminal',
        ],
      },
      {
        title: 'Warp',
        href: 'https://www.warp.dev/',
        icon: 'mdi:lightning-bolt',
        description:
          'Agentic development environment with modern, intelligent terminal and AI coding agents that can build features, debug code, and create PRs across multi-repo codebases.',
        tags: [
          'ai',
          'terminal',
          'tool',
          'free',
          'paid',
          'modern',
          'trending',
          'productivity',
          'agent',
        ],
      },
      {
        title: 'Devin Desktop',
        href: 'https://devin.ai/desktop',
        icon: 'mdi:wind-power',
        description:
          "Cognition's agentic IDE, formerly Windsurf, running Devin Local plus any Agent Client Protocol agent for autonomous multi-file editing.",
        tags: [
          'ai',
          'ide',
          'tool',
          'free',
          'paid',
          'modern',
          'trending',
          'productivity',
          'agent',
        ],
      },
      {
        title: 'Zed',
        href: 'https://zed.dev/',
        icon: 'mdi:code-braces-box',
        description:
          'Next-generation code editor built in Rust for high-performance collaboration with humans and AI, featuring agentic editing and native debugging support.',
        tags: [
          'editor',
          'ai',
          'tool',
          'free',
          'open-source',
          'modern',
          'trending',
          'productivity',
          'collaborative',
        ],
      },
      {
        title: 'Jules',
        href: 'https://jules.google/',
        icon: 'simple-icons:google',
        description:
          "Google's AI coding assistant powered by Gemini 2.5 Pro that handles coding tasks you don't want to do - from bug fixes and version bumps to feature building.",
        tags: [
          'ai',
          'assistant',
          'tool',
          'paid',
          'modern',
          'trending',
          'productivity',
          'automation',
        ],
      },
      {
        title: 'Cline',
        href: 'https://cline.bot/',
        icon: 'mdi:robot-excited',
        description:
          'Open-source AI coding agent with complete transparency, plan mode for complex tasks, and support for any AI model with client-side architecture for maximum security.',
        tags: [
          'ai',
          'agent',
          'tool',
          'free',
          'open-source',
          'modern',
          'trending',
          'productivity',
          'security',
        ],
      },
      {
        title: 'Augment Code',
        href: 'https://www.augmentcode.com/',
        icon: 'mdi:code-greater-than',
        description:
          'Cosmos, an agent platform that carries work from spec to verification across GitHub, GitLab, and Slack with shared context, audit trails, and human review points.',
        tags: [
          'ai',
          'platform',
          'tool',
          'paid',
          'modern',
          'trending',
          'productivity',
          'agent',
        ],
      },
      {
        title: 'Bolt',
        href: 'https://bolt.new/',
        icon: 'mdi:flash',
        description:
          'AI-powered platform for creating stunning apps and websites through conversational interface, enabling rapid prototyping and development.',
        tags: [
          'ai',
          'platform',
          'tool',
          'paid',
          'modern',
          'trending',
          'no-code',
          'prototyping',
        ],
      },
      {
        title: 'Lovable',
        href: 'https://lovable.dev/',
        icon: 'mdi:heart',
        description:
          'AI-powered platform for building apps and websites through conversational interface with Figma import support and community-driven development.',
        tags: [
          'ai',
          'platform',
          'tool',
          'paid',
          'modern',
          'trending',
          'no-code',
          'design',
        ],
      },
      {
        title: 'v0',
        href: 'https://v0.app/',
        icon: 'simple-icons:vercel',
        description:
          "Vercel's AI-powered generative UI tool that creates React components and interfaces from text prompts, enabling rapid UI development and prototyping.",
        tags: [
          'ai',
          'ui',
          'tool',
          'paid',
          'modern',
          'trending',
          'react',
          'generative',
        ],
      },
      {
        title: 'ESLint',
        href: 'https://eslint.org/',
        icon: 'simple-icons:eslint',
        description:
          'Pluggable JavaScript and TypeScript linter with a flat config system and an ecosystem of framework-specific rule sets.',
        tags: [
          'tool',
          'free',
          'open-source',
          'javascript',
          'typescript',
        ],
      },
      {
        title: 'Prettier',
        href: 'https://prettier.io/',
        icon: 'simple-icons:prettier',
        description:
          'Opinionated code formatter that reprints source from its own AST, ending style debates across JavaScript, CSS, HTML, and Markdown.',
        tags: [
          'tool',
          'free',
          'open-source',
          'javascript',
          'css',
          'productivity',
        ],
      },
      {
        title: 'Bun',
        href: 'https://bun.com/',
        icon: 'simple-icons:bun',
        description:
          'JavaScript runtime, package manager, bundler, and test runner in one binary, built on JavaScriptCore for fast startup.',
        tags: [
          'tool',
          'free',
          'open-source',
          'javascript',
          'typescript',
          'nodejs',
          'performance',
          'modern',
        ],
      },
      {
        title: 'Neon',
        href: 'https://neon.com/',
        icon: 'simple-icons:neon',
        description:
          'Serverless Postgres with database branching, scale-to-zero compute, and instant restore from any point in time.',
        tags: [
          'database',
          'free',
          'paid',
          'platform',
          'performance',
          'modern',
        ],
      },
      {
        title: 'Prisma',
        href: 'https://www.prisma.io/',
        icon: 'simple-icons:prisma',
        description:
          'Type-safe ORM for TypeScript with a declarative schema, generated client, and a migration workflow for Postgres, MySQL, and SQLite.',
        tags: [
          'database',
          'tool',
          'free',
          'paid',
          'open-source',
          'typescript',
          'nodejs',
        ],
      },
      {
        title: 'Cloudflare Workers',
        href: 'https://www.cloudflare.com/products/workers/',
        icon: 'simple-icons:cloudflareworkers',
        description:
          'Edge runtime that executes JavaScript close to users, with bound storage in KV, D1, R2, and Durable Objects.',
        tags: [
          'platform',
          'free',
          'paid',
          'deployment',
          'performance',
          'javascript',
          'modern',
        ],
      },
      {
        title: 'Railway',
        href: 'https://railway.com/',
        icon: 'simple-icons:railway',
        description:
          'Deployment platform that provisions apps, databases, and cron jobs from a repository without writing infrastructure config.',
        tags: [
          'platform',
          'paid',
          'deployment',
          'full-stack',
          'beginner-friendly',
          'modern',
        ],
      },
      {
        title: 'Bruno',
        href: 'https://www.usebruno.com/',
        icon: 'simple-icons:bruno',
        description:
          'Offline-first API client that stores collections as plain files in your repository, so requests review and merge like code.',
        tags: [
          'api',
          'tool',
          'free',
          'open-source',
          'testing',
        ],
      },
      {
        title: 'Excalidraw',
        href: 'https://excalidraw.com/',
        icon: 'simple-icons:excalidraw',
        description:
          'Virtual whiteboard with a hand-drawn look for architecture sketches and diagrams, with live collaboration and end-to-end encryption.',
        tags: [
          'design',
          'free',
          'open-source',
          'tool',
          'community',
          'beginner-friendly',
        ],
      },
      {
        title: 'PostHog',
        href: 'https://posthog.com/',
        icon: 'simple-icons:posthog',
        description:
          'Product analytics with session replay, feature flags, A/B testing, and error tracking, available self-hosted or as a cloud service.',
        tags: [
          'platform',
          'free',
          'paid',
          'open-source',
          'monitoring',
          'modern',
        ],
      },
      {
        title: 'Better Auth',
        href: 'https://better-auth.com/',
        icon: 'simple-icons:betterauth',
        description:
          'Framework-agnostic authentication library for TypeScript that runs on your own database, covering sessions, OAuth, 2FA, and organizations.',
        tags: [
          'authentication',
          'free',
          'open-source',
          'typescript',
          'full-stack',
          'modern',
        ],
      },
      {
        title: 'Ghostty',
        href: 'https://ghostty.org/',
        icon: 'simple-icons:ghostty',
        description:
          'GPU-accelerated terminal emulator using native platform UI, with fast rendering and a broad set of terminal escape sequences.',
        tags: [
          'terminal',
          'tool',
          'free',
          'open-source',
          'performance',
        ],
      },
      {
        title: 'Google Antigravity',
        href: 'https://antigravity.google/',
        icon: 'simple-icons:google',
        description:
          "Google's agent-first development platform where agents work across editor, terminal, and browser and report back with verifiable artifacts.",
        tags: [
          'ai',
          'ide',
          'tool',
          'free',
          'agent',
          'modern',
          'trending',
        ],
      },
      {
        title: 'Resend',
        href: 'https://resend.com/',
        icon: 'simple-icons:resend',
        description:
          'Transactional email API for developers, with React Email templates, a test mode, and deliverability tooling for domains.',
        tags: [
          'api',
          'platform',
          'free',
          'paid',
          'react',
          'modern',
        ],
      },
      {
        title: 'Claude',
        href: 'https://claude.ai/',
        icon: 'simple-icons:claude',
        description:
          "Anthropic's assistant for research, writing, and code, with projects, artifacts, and connectors into the tools a team already uses.",
        tags: [
          'ai',
          'free',
          'paid',
          'tool',
          'trending',
          'modern',
          'assistant',
        ],
      },
      {
        title: 'OpenAI Codex',
        href: 'https://openai.com/codex/',
        icon: 'simple-icons:openai',
        description:
          "OpenAI's coding agent across terminal, IDE, and cloud, running tasks against a checkout and handing back reviewable diffs.",
        tags: [
          'ai',
          'agent',
          'paid',
          'tool',
          'trending',
          'modern',
        ],
      },
      {
        title: 'Antigravity CLI',
        href: 'https://antigravity.google/product/antigravity-cli/',
        icon: 'simple-icons:google',
        description:
          "Google's terminal agent, invoked as agy, running Antigravity subagents concurrently; it replaced Gemini CLI in June 2026.",
        tags: [
          'ai',
          'agent',
          'free',
          'tool',
          'cli',
          'modern',
          'trending',
        ],
      },
      {
        title: 'GitHub Copilot CLI',
        href: 'https://github.com/features/copilot/cli',
        icon: 'simple-icons:githubcopilot',
        description:
          "Copilot's terminal agent, with a plan mode for review before edits and an autopilot mode that runs commands without stopping.",
        tags: [
          'ai',
          'agent',
          'tool',
          'paid',
          'cli',
          'modern',
        ],
      },
      {
        title: 'Factory Droid',
        href: 'https://factory.ai/',
        icon: 'mdi:factory',
        description:
          'Terminal and CI coding agent that routes across models, runs headless in pipelines, and hands off to Slack and Linear.',
        tags: [
          'ai',
          'agent',
          'tool',
          'paid',
          'cli',
          'advanced',
        ],
      },
      {
        title: 'Kilo Code',
        href: 'https://kilo.ai/',
        icon: 'mdi:alpha-k-box-outline',
        description:
          'Open-source agent for VS Code, JetBrains, and the terminal, with subagents and hundreds of models billed at provider rates.',
        tags: [
          'ai',
          'agent',
          'tool',
          'free',
          'paid',
          'open-source',
          'trending',
        ],
      },
      {
        title: 'Qwen Code',
        href: 'https://github.com/QwenLM/qwen-code',
        icon: 'simple-icons:qwen',
        description:
          "Alibaba's open-source terminal agent, tuned for the open-weight Qwen coder models but usable with any compatible API.",
        tags: [
          'ai',
          'agent',
          'tool',
          'free',
          'open-source',
          'cli',
        ],
      },
      {
        title: 'Crush',
        href: 'https://github.com/charmbracelet/crush',
        icon: 'mdi:star-four-points-outline',
        description:
          "Charm's terminal coding agent, pairing a polished TUI with MCP, LSP context, and switching models mid-session.",
        tags: [
          'ai',
          'agent',
          'tool',
          'free',
          'cli',
          'modern',
        ],
      },
      {
        title: 'Pi',
        href: 'https://pi.dev/',
        icon: 'mdi:pi',
        description:
          'Deliberately minimal terminal harness — four tools and a one-screen system prompt — extended through TypeScript hooks and skills.',
        tags: [
          'ai',
          'agent',
          'tool',
          'free',
          'open-source',
          'cli',
          'typescript',
          'advanced',
        ],
      },
      {
        title: 'goose',
        href: 'https://goose-docs.ai/',
        icon: 'mdi:bird',
        description:
          'General-purpose local agent with desktop app and CLI, governed by the Agentic AI Foundation and extended entirely through MCP.',
        tags: [
          'ai',
          'agent',
          'tool',
          'free',
          'open-source',
          'cli',
          'desktop-dev',
        ],
      },
      {
        title: 'OpenHands',
        href: 'https://www.openhands.dev/',
        icon: 'mdi:hand-back-right-outline',
        description:
          'Open platform for autonomous coding agents, offering a GUI, CLI, and SDK for unattended runs locally or in the cloud.',
        tags: [
          'ai',
          'agent',
          'tool',
          'free',
          'paid',
          'open-source',
          'advanced',
        ],
      },
      {
        title: 'Hermes Agent',
        href: 'https://hermes-agent.nousresearch.com/',
        icon: 'mdi:feather',
        description:
          "Nous Research's self-improving agent harness, which writes and refines its own skills and keeps memory across sessions.",
        tags: [
          'ai',
          'agent',
          'tool',
          'free',
          'open-source',
          'trending',
        ],
      },
      {
        title: 'OpenClaw',
        href: 'https://openclaw.ai/',
        icon: 'mdi:robot-love-outline',
        description:
          'Self-hosted personal agent gateway connecting models to messaging apps and dozens of integrations; review what it can reach before granting access.',
        tags: [
          'ai',
          'agent',
          'tool',
          'free',
          'open-source',
          'trending',
        ],
      },
      {
        title: 'Amp',
        href: 'https://ampcode.com/',
        icon: 'mdi:lightning-bolt-outline',
        description:
          "Sourcegraph's coding agent for terminal and editor, built around unconstrained token use and shareable thread history.",
        tags: [
          'ai',
          'agent',
          'paid',
          'tool',
          'terminal',
          'modern',
        ],
      },
      {
        title: 'OpenCode',
        href: 'https://opencode.ai/',
        icon: 'mdi:console-line',
        description:
          'Open-source terminal coding agent that drives any model through one TUI, with a client/server split for remote sessions.',
        tags: [
          'ai',
          'agent',
          'free',
          'open-source',
          'terminal',
          'tool',
          'modern',
        ],
      },
      {
        title: 'Aider',
        href: 'https://aider.chat/',
        icon: 'mdi:console',
        description:
          'Terminal pair programmer that edits files directly in a git repo and commits each change with a written message.',
        tags: [
          'ai',
          'agent',
          'free',
          'open-source',
          'terminal',
          'tool',
        ],
      },
      {
        title: 'Continue',
        href: 'https://continue.dev/',
        icon: 'mdi:arrow-right-circle-outline',
        description:
          'Open-source IDE assistant you configure yourself — choose the models, context providers, and rules per project.',
        tags: [
          'ai',
          'free',
          'open-source',
          'tool',
          'ide',
          'modern',
        ],
      },
      {
        title: 'Conductor',
        href: 'https://www.conductor.build/',
        icon: 'mdi:view-parallel-outline',
        description:
          'Mac app running Claude Code, Codex, and Cursor agents in parallel, each in its own git worktree, with review and merge built in.',
        tags: [
          'ai',
          'agent',
          'tool',
          'free',
          'desktop-dev',
          'productivity',
          'modern',
        ],
      },
      {
        title: 'T3 Code',
        href: 'https://t3.codes/',
        icon: 'mdi:view-dashboard-variant-outline',
        description:
          'Open-source desktop, web, and mobile front end for driving Claude Code, Codex, and OpenCode sessions across worktrees.',
        tags: [
          'ai',
          'agent',
          'tool',
          'free',
          'open-source',
          'desktop-dev',
          'modern',
        ],
      },
      {
        title: 'Superpowers',
        href: 'https://github.com/obra/superpowers',
        icon: 'mdi:lightning-bolt-circle',
        description:
          'Skills library and working method for coding agents, enforcing brainstorm, plan, test-first implementation, and review in order.',
        tags: [
          'ai',
          'agent',
          'tool',
          'free',
          'open-source',
          'testing',
          'trending',
        ],
      },
      {
        title: 'Spec Kit',
        href: 'https://github.com/github/spec-kit',
        icon: 'mdi:clipboard-text-outline',
        description:
          "GitHub's toolkit for spec-driven development, turning a written specification into a plan and task list an agent implements.",
        tags: [
          'ai',
          'agent',
          'tool',
          'free',
          'open-source',
          'cli',
          'modern',
        ],
      },
      {
        title: 'Context7',
        href: 'https://context7.com/',
        icon: 'mdi:book-sync-outline',
        description:
          'MCP server feeding agents current, version-specific library documentation, so generated code stops targeting outdated APIs.',
        tags: [
          'ai',
          'agent',
          'tool',
          'free',
          'paid',
          'api',
          'modern',
        ],
      },
      {
        title: 'CodeRabbit',
        href: 'https://www.coderabbit.ai/',
        icon: 'mdi:rabbit',
        description:
          'AI reviewer that comments on pull requests line by line and picks up the conventions a repository already follows.',
        tags: [
          'ai',
          'paid',
          'free',
          'tool',
          'testing',
          'modern',
        ],
      },
      {
        title: 'Greptile',
        href: 'https://www.greptile.com/',
        icon: 'mdi:magnify-scan',
        description:
          'AI pull request reviewer that indexes the whole codebase, so comments account for code outside the diff.',
        tags: [
          'ai',
          'paid',
          'tool',
          'productivity',
          'modern',
        ],
      },
      {
        title: 'Graphite',
        href: 'https://graphite.com/',
        icon: 'mdi:source-branch',
        description:
          'Stacked pull request workflow with an AI reviewer, keeping a large change as small dependent PRs that merge in order.',
        tags: [
          'ai',
          'paid',
          'free',
          'tool',
          'productivity',
          'modern',
        ],
      },
      {
        title: 'Hugging Face',
        href: 'https://huggingface.co/',
        icon: 'simple-icons:huggingface',
        description:
          'Hub for open models, datasets, and demo Spaces, with inference endpoints for serving any of them.',
        tags: [
          'ai',
          'free',
          'paid',
          'platform',
          'open-source',
          'trending',
        ],
      },
      {
        title: 'Ollama',
        href: 'https://ollama.com/',
        icon: 'simple-icons:ollama',
        description:
          'Runs open models locally behind a familiar API, so prototypes work offline and private data never leaves the machine.',
        tags: [
          'ai',
          'free',
          'open-source',
          'tool',
          'cli',
          'modern',
        ],
      },
      {
        title: 'LM Studio',
        href: 'https://lmstudio.ai/',
        icon: 'mdi:desktop-classic',
        description:
          'Desktop app for downloading and running local models, exposing an OpenAI-compatible server for existing code to point at.',
        tags: [
          'ai',
          'free',
          'tool',
          'desktop-dev',
          'modern',
        ],
      },
      {
        title: 'OpenRouter',
        href: 'https://openrouter.ai/',
        icon: 'mdi:router-network',
        description:
          'One API and one bill across hundreds of models, with routing, fallbacks, and published price and latency per model.',
        tags: [
          'ai',
          'paid',
          'platform',
          'api',
          'modern',
          'trending',
        ],
      },
      {
        title: 'Groq',
        href: 'https://groq.com/',
        icon: 'mdi:chip',
        description:
          'Inference platform on custom silicon, aimed at the token rates interactive and voice applications need.',
        tags: [
          'ai',
          'free',
          'paid',
          'platform',
          'performance',
          'api',
        ],
      },
      {
        title: 'Replicate',
        href: 'https://replicate.com/',
        icon: 'mdi:play-network-outline',
        description:
          'Runs open image, video, audio, and language models behind one API, with your own models deployable via Cog.',
        tags: [
          'ai',
          'paid',
          'platform',
          'api',
          'open-source',
          'generative',
        ],
      },
      {
        title: 'fal',
        href: 'https://fal.ai/',
        icon: 'mdi:image-auto-adjust',
        description:
          'Generative media platform tuned for fast image, video, and audio inference, with a JavaScript client for web apps.',
        tags: [
          'ai',
          'paid',
          'platform',
          'api',
          'generative',
          'performance',
        ],
      },
      {
        title: 'Modal',
        href: 'https://modal.com/',
        icon: 'mdi:cube-outline',
        description:
          'Serverless GPU compute defined in Python, spinning containers up per request for inference, fine-tuning, and batch jobs.',
        tags: [
          'ai',
          'paid',
          'platform',
          'python',
          'deployment',
          'advanced',
        ],
      },
      {
        title: 'Langfuse',
        href: 'https://langfuse.com/',
        icon: 'mdi:chart-timeline-variant-shimmer',
        description:
          'Open-source tracing, evals, and prompt management for LLM apps, self-hostable so traces stay in your own infrastructure.',
        tags: [
          'ai',
          'free',
          'open-source',
          'monitoring',
          'tool',
          'modern',
        ],
      },
      {
        title: 'Braintrust',
        href: 'https://www.braintrust.dev/',
        icon: 'mdi:flask-outline',
        description:
          'Eval-first platform for LLM products, scoring changes against datasets before release and tracing what happens after.',
        tags: [
          'ai',
          'paid',
          'free',
          'monitoring',
          'testing',
          'tool',
        ],
      },
      {
        title: 'LangSmith',
        href: 'https://www.langchain.com/langsmith',
        icon: 'simple-icons:langchain',
        description:
          'Tracing, evaluation, and prompt iteration for agent apps, with the closest view into LangChain and LangGraph runs.',
        tags: [
          'ai',
          'agent',
          'paid',
          'free',
          'monitoring',
          'tool',
        ],
      },
      {
        title: 'E2B',
        href: 'https://e2b.dev/',
        icon: 'mdi:shield-lock-outline',
        description:
          'Isolated cloud sandboxes for running agent-written code, with filesystem, network, and process control per session.',
        tags: [
          'ai',
          'agent',
          'free',
          'paid',
          'open-source',
          'tool',
          'security',
        ],
      },
      {
        title: 'Daytona',
        href: 'https://www.daytona.io/',
        icon: 'mdi:cube-send',
        description:
          'Sandboxes for running agent-generated code, started in milliseconds and kept isolated from the host and each other.',
        tags: [
          'ai',
          'agent',
          'free',
          'paid',
          'platform',
          'open-source',
        ],
      },
      {
        title: 'MCP Registry',
        href: 'https://registry.modelcontextprotocol.io/',
        icon: 'mdi:server-network-outline',
        description:
          'Official index of Model Context Protocol servers, so agents discover published tools instead of hardcoding endpoints.',
        tags: [
          'ai',
          'agent',
          'free',
          'open-source',
          'platform',
          'modern',
        ],
      },
      {
        title: 'Vercel AI Gateway',
        href: 'https://vercel.com/ai-gateway',
        icon: 'simple-icons:vercel',
        description:
          'One endpoint in front of many model providers, adding failover, spend limits, and per-request observability.',
        tags: [
          'ai',
          'paid',
          'free',
          'platform',
          'api',
          'monitoring',
          'modern',
        ],
      },
      {
        title: 'LiteLLM',
        href: 'https://docs.litellm.ai/',
        icon: 'mdi:swap-horizontal',
        description:
          'Proxy and SDK putting every major provider behind the OpenAI request shape, adding virtual keys, budgets, fallbacks, and request logs.',
        tags: [
          'ai',
          'free',
          'open-source',
          'tool',
          'api',
          'platform',
        ],
      },
      {
        title: 'Together AI',
        href: 'https://www.together.ai/',
        icon: 'mdi:server-network-outline',
        description:
          'Hosted inference and fine-tuning for open models, with dedicated endpoints for when shared capacity stops being enough.',
        tags: [
          'ai',
          'paid',
          'platform',
          'api',
          'open-source',
        ],
      },
      {
        title: 'Artificial Analysis',
        href: 'https://artificialanalysis.ai/',
        icon: 'mdi:gauge',
        description:
          'Independent benchmarks comparing models and the providers hosting them on quality, price, latency, and tokens per second.',
        tags: [
          'ai',
          'free',
          'reference',
          'tool',
          'modern',
        ],
      },
      {
        title: 'Arena AI',
        href: 'https://arena.ai/',
        icon: 'mdi:trophy-outline',
        description:
          'Public leaderboard ranking text, image, and code models by blind side-by-side votes rather than self-reported benchmarks.',
        tags: [
          'ai',
          'free',
          'reference',
          'community',
          'trending',
        ],
      },
      {
        title: 'Terminal-Bench',
        href: 'https://www.tbench.ai/',
        icon: 'mdi:console-network-outline',
        description:
          'Open benchmark scoring agents on end-to-end terminal tasks, and the leaderboard coding-agent harnesses compete on.',
        tags: [
          'ai',
          'agent',
          'free',
          'open-source',
          'reference',
          'trending',
        ],
      },
      {
        title: 'SWE-bench',
        href: 'https://www.swebench.com/',
        icon: 'mdi:trophy-award',
        description:
          'Leaderboards measuring whether agents resolve real GitHub issues, with Verified and multimodal splits alongside the original.',
        tags: [
          'ai',
          'agent',
          'free',
          'open-source',
          'reference',
          'advanced',
        ],
      },
      {
        title: 'Pinecone',
        href: 'https://www.pinecone.io/',
        icon: 'mdi:pine-tree',
        description:
          'Managed vector database with serverless indexes and built-in reranking, sized for retrieval without running your own cluster.',
        tags: [
          'ai',
          'paid',
          'database',
          'platform',
          'tool',
        ],
      },
      {
        title: 'Chroma',
        href: 'https://www.trychroma.com/',
        icon: 'mdi:database-search-outline',
        description:
          'Embedding database that runs in-process during development and as a server in production, behind the same API.',
        tags: [
          'ai',
          'free',
          'open-source',
          'database',
          'tool',
        ],
      },
      {
        title: 'Qdrant',
        href: 'https://qdrant.tech/',
        icon: 'mdi:vector-triangle',
        description:
          'Rust vector database with payload filtering and hybrid search, built for retrieval across large document sets.',
        tags: [
          'ai',
          'free',
          'open-source',
          'database',
          'performance',
          'advanced',
        ],
      },
      {
        title: 'Oxc',
        href: 'https://oxc.rs/',
        icon: 'mdi:rocket-launch',
        description:
          'Rust JavaScript toolchain — parser, linter, resolver, minifier — and the engine underneath Oxlint and Rolldown.',
        tags: [
          'tool',
          'free',
          'open-source',
          'javascript',
          'typescript',
          'performance',
          'modern',
        ],
      },
      {
        title: 'Rolldown',
        href: 'https://rolldown.rs/',
        icon: 'mdi:package-variant-closed',
        description:
          "Rust bundler that keeps Rollup's plugin API, now powering Vite for both development and production builds.",
        tags: [
          'tool',
          'free',
          'open-source',
          'javascript',
          'performance',
          'modern',
          'trending',
        ],
      },
      {
        title: 'Rspack',
        href: 'https://rspack.rs/',
        icon: 'mdi:speedometer-medium',
        description:
          'Rust bundler that reads webpack config and loaders, offered as a drop-in for large existing webpack builds.',
        tags: [
          'tool',
          'free',
          'open-source',
          'javascript',
          'performance',
          'modern',
        ],
      },
      {
        title: 'Upstash',
        href: 'https://upstash.com/',
        icon: 'simple-icons:upstash',
        description:
          'Serverless Redis, queues, and vector search billed per request, designed for edge runtimes with no connection pooling.',
        tags: [
          'platform',
          'free',
          'paid',
          'database',
          'deployment',
          'modern',
        ],
      },
      {
        title: 'Node.js',
        href: 'https://nodejs.org/',
        icon: 'simple-icons:nodedotjs',
        description:
          'The JavaScript runtime most of the server-side ecosystem targets, now with a built-in test runner, watch mode, and type stripping.',
        tags: [
          'tool',
          'free',
          'open-source',
          'javascript',
          'nodejs',
          'platform',
        ],
      },
      {
        title: 'Deno',
        href: 'https://deno.com/',
        icon: 'simple-icons:deno',
        description:
          'Secure-by-default TypeScript runtime with a built-in formatter, linter, and test runner, and npm compatibility.',
        tags: [
          'tool',
          'free',
          'open-source',
          'typescript',
          'javascript',
          'modern',
        ],
      },
      {
        title: 'Zero',
        href: 'https://zero.rocicorp.dev/',
        icon: 'mdi:sync',
        description:
          'Sync engine that queries a local cache first and reconciles with Postgres in the background, giving reads and writes no spinner.',
        tags: [
          'free',
          'open-source',
          'database',
          'performance',
          'modern',
          'trending',
        ],
      },
      {
        title: 'Electric',
        href: 'https://electric.ax/',
        icon: 'mdi:flash-outline',
        description:
          'Postgres sync engine, now the base of an agent platform where long-running sessions stay resumable and observable.',
        tags: [
          'ai',
          'agent',
          'free',
          'open-source',
          'database',
          'modern',
        ],
      },
      {
        title: 'Liveblocks',
        href: 'https://liveblocks.io/',
        icon: 'mdi:account-multiple-outline',
        description:
          'Hosted presence, comments, and conflict-free document state for adding multiplayer collaboration to an existing app.',
        tags: [
          'free',
          'paid',
          'platform',
          'api',
          'modern',
          'collaborative',
        ],
      },
      {
        title: 'Inngest',
        href: 'https://www.inngest.com/',
        icon: 'mdi:cog-sync-outline',
        description:
          'Durable execution for background work and agents — each step checkpoints, so a retry resumes rather than restarts.',
        tags: [
          'ai',
          'agent',
          'free',
          'paid',
          'platform',
          'typescript',
          'modern',
        ],
      },
      {
        title: 'Trigger.dev',
        href: 'https://trigger.dev/',
        icon: 'mdi:play-circle-outline',
        description:
          'Long-running TypeScript tasks and agents that survive redeploys and crashes, with queues, retries, and streaming built in.',
        tags: [
          'ai',
          'agent',
          'free',
          'paid',
          'open-source',
          'typescript',
          'deployment',
        ],
      },
      {
        title: 'Browserbase',
        href: 'https://www.browserbase.com/',
        icon: 'mdi:web-box',
        description:
          'Managed headless browsers for agents, handling sessions, proxies, and stealth so Playwright code runs at scale.',
        tags: [
          'ai',
          'agent',
          'paid',
          'platform',
          'testing',
          'modern',
        ],
      },
      {
        title: 'Browser Use',
        href: 'https://browser-use.com/',
        icon: 'mdi:web-box',
        description:
          'Open-source library and hosted browsers for agents that navigate, fill forms, and extract data from live websites.',
        tags: [
          'ai',
          'agent',
          'free',
          'paid',
          'open-source',
          'tool',
        ],
      },
      {
        title: 'Stagehand',
        href: 'https://www.stagehand.dev/',
        icon: 'mdi:hand-back-right-outline',
        description:
          'Open-source layer over Playwright giving agents act, extract, and observe, so scripts survive a page redesign.',
        tags: [
          'ai',
          'agent',
          'free',
          'open-source',
          'typescript',
          'testing',
          'modern',
        ],
      },
      {
        title: 'Firecrawl',
        href: 'https://www.firecrawl.dev/',
        icon: 'mdi:spider-web',
        description:
          'Turns any site into clean markdown or structured JSON for retrieval, handling JavaScript rendering and crawling.',
        tags: [
          'ai',
          'agent',
          'free',
          'paid',
          'open-source',
          'api',
          'tool',
        ],
      },
      {
        title: 'Playwright MCP',
        href: 'https://github.com/microsoft/playwright-mcp',
        icon: 'simple-icons:playwright',
        description:
          "Microsoft's MCP server exposing Playwright as agent tools, driving the accessibility tree rather than screenshots.",
        tags: [
          'ai',
          'agent',
          'free',
          'open-source',
          'testing',
          'tool',
          'modern',
        ],
      },
      {
        title: 'ElevenLabs',
        href: 'https://elevenlabs.io/',
        icon: 'mdi:waveform',
        description:
          'Speech synthesis and voice agent APIs with low enough latency for conversational interfaces in the browser.',
        tags: [
          'ai',
          'free',
          'paid',
          'platform',
          'api',
          'generative',
        ],
      },
      {
        title: 'WorkOS',
        href: 'https://workos.com/',
        icon: 'mdi:office-building-outline',
        description:
          'The enterprise checklist as an API — SAML, SCIM directory sync, and audit logs added without rebuilding auth.',
        tags: [
          'paid',
          'free',
          'platform',
          'authentication',
          'api',
          'security',
        ],
      },
      {
        title: 'Polar',
        href: 'https://polar.sh/',
        icon: 'mdi:cash-multiple',
        description:
          'Open-source merchant of record for developer products, handling billing, licences, and the tax paperwork.',
        tags: [
          'free',
          'paid',
          'open-source',
          'platform',
          'api',
          'modern',
        ],
      },
      {
        title: 'ClickHouse',
        href: 'https://clickhouse.com/',
        icon: 'simple-icons:clickhouse',
        description:
          'Columnar database for analytics at scale, fast enough to back user-facing dashboards over billions of rows.',
        tags: [
          'free',
          'open-source',
          'database',
          'performance',
          'advanced',
          'platform',
        ],
      },
      {
        title: 'DuckDB',
        href: 'https://duckdb.org/',
        icon: 'simple-icons:duckdb',
        description:
          'In-process analytical database that queries Parquet, CSV, and JSON directly, and runs in the browser via WebAssembly.',
        tags: [
          'free',
          'open-source',
          'database',
          'performance',
          'advanced',
        ],
      },
      {
        title: 'Framer',
        href: 'https://www.framer.com/',
        icon: 'simple-icons:framer',
        description:
          'Design tool that publishes directly to a live site, with a canvas that produces real responsive layout rather than a mockup.',
        tags: [
          'design',
          'free',
          'paid',
          'platform',
          'no-code',
          'prototyping',
        ],
      },
      {
        title: 'Penpot',
        href: 'https://penpot.app/',
        icon: 'simple-icons:penpot',
        description:
          'Open-source design and prototyping tool built on open web standards, self-hostable and free of seat licensing.',
        tags: [
          'design',
          'free',
          'open-source',
          'prototyping',
          'collaborative',
        ],
      },
      {
        title: 'Rive',
        href: 'https://rive.app/',
        icon: 'simple-icons:rive',
        description:
          'Interactive vector animation with a state machine, exported to a runtime that responds to input instead of just playing.',
        tags: [
          'design',
          'free',
          'paid',
          'tool',
          'performance',
          'modern',
        ],
      },
      {
        title: 'Spline',
        href: 'https://spline.design/',
        icon: 'mdi:cube-scan',
        description:
          'Browser-based 3D design tool that exports scenes to the web without a modelling pipeline.',
        tags: [
          'design',
          'free',
          'paid',
          'tool',
          'prototyping',
          'modern',
        ],
      },
      {
        title: 'WebPageTest',
        href: 'https://www.webpagetest.org/',
        icon: 'mdi:timer-outline',
        description:
          'Runs a page on real devices and networks, returning filmstrips, waterfalls, and Core Web Vitals per configuration.',
        tags: [
          'tool',
          'free',
          'paid',
          'performance',
          'monitoring',
          'advanced',
        ],
      },
      {
        title: 'axe DevTools',
        href: 'https://www.deque.com/axe/devtools/',
        icon: 'mdi:axe',
        description:
          "Deque's accessibility scanner in the browser and in CI, built on the axe-core engine most other checkers use.",
        tags: [
          'tool',
          'free',
          'paid',
          'accessibility',
          'testing',
          'advanced',
        ],
      },
      {
        title: 'Polypane',
        href: 'https://polypane.app/',
        icon: 'mdi:monitor-multiple',
        description:
          'Browser that renders several viewports at once with accessibility, contrast, and meta checks always on.',
        tags: [
          'tool',
          'paid',
          'accessibility',
          'testing',
          'design',
          'productivity',
        ],
      },
      {
        title: 'Changesets',
        href: 'https://github.com/changesets/changesets',
        icon: 'mdi:file-document-edit-outline',
        description:
          'Version and changelog management for monorepos, where each pull request declares its own release intent.',
        tags: [
          'tool',
          'free',
          'open-source',
          'javascript',
          'productivity',
        ],
      },
      {
        title: 'Fumadocs',
        href: 'https://www.fumadocs.dev/',
        icon: 'mdi:book-open-outline',
        description:
          'Composable documentation framework for Next.js with search, OpenAPI reference generation, and full UI control.',
        tags: [
          'tool',
          'free',
          'open-source',
          'react',
          'documentation',
          'modern',
        ],
      },
      {
        title: 'Starlight',
        href: 'https://starlight.astro.build/',
        icon: 'simple-icons:astro',
        description:
          "Astro's documentation theme — fast builds, built-in search, and internationalization with almost no configuration.",
        tags: [
          'tool',
          'free',
          'open-source',
          'documentation',
          'performance',
          'modern',
        ],
      },
      {
        title: 'Mintlify',
        href: 'https://www.mintlify.com/',
        icon: 'mdi:leaf',
        description:
          'Hosted documentation platform with API playgrounds and analytics, written as MDX in your own repository.',
        tags: [
          'tool',
          'free',
          'paid',
          'platform',
          'documentation',
          'modern',
        ],
      },
    ],
  },
  {
    title: 'Frameworks and Libraries',
    href: '/frameworks-and-libraries',
    icon: 'mdi:code-braces',
    description:
      'Powerful frameworks and libraries to build modern web applications',
    links: [
      {
        title: 'React',
        href: 'https://react.dev/',
        icon: 'simple-icons:react',
        description:
          'Popular JavaScript library for building user interfaces with component-based architecture and virtual DOM.',
        tags: [
          'javascript',
          'free',
          'open-source',
          'trending',
          'beginner-friendly',
          'advanced',
        ],
      },
      {
        title: 'Vue.js',
        href: 'https://vuejs.org/',
        icon: 'simple-icons:vuedotjs',
        description:
          'Progressive JavaScript framework with gentle learning curve, excellent documentation, and powerful ecosystem.',
        tags: [
          'vue',
          'javascript',
          'free',
          'open-source',
          'trending',
          'beginner-friendly',
        ],
      },
      {
        title: 'Svelte',
        href: 'https://svelte.dev/',
        icon: 'simple-icons:svelte',
        description:
          'Modern framework that compiles to vanilla JavaScript, offering smaller bundles and better runtime performance.',
        tags: [
          'javascript',
          'free',
          'open-source',
          'modern',
          'performance',
          'trending',
        ],
      },
      {
        title: 'Angular',
        href: 'https://angular.dev/',
        icon: 'simple-icons:angular',
        description:
          'Comprehensive framework by Google with TypeScript-first approach, dependency injection, and enterprise features.',
        tags: [
          'typescript',
          'javascript',
          'free',
          'open-source',
          'advanced',
          'full-stack',
        ],
      },
      {
        title: 'Preact',
        href: 'https://preactjs.com/',
        icon: 'simple-icons:preact',
        description:
          'Lightweight alternative to React with the same API, perfect for performance-critical applications.',
        tags: [
          'react',
          'javascript',
          'free',
          'open-source',
          'performance',
          'modern',
        ],
      },
      {
        title: 'SolidJS',
        href: 'https://www.solidjs.com/',
        icon: 'simple-icons:solid',
        description:
          'Declarative JavaScript library with fine-grained reactivity and compilation to real DOM nodes.',
        tags: [
          'javascript',
          'free',
          'open-source',
          'modern',
          'performance',
          'advanced',
        ],
      },
      {
        title: 'Qwik',
        href: 'https://qwik.dev/',
        icon: 'simple-icons:qwik',
        description:
          'Framework focused on instant loading with resumability and minimal JavaScript execution.',
        tags: [
          'javascript',
          'free',
          'open-source',
          'modern',
          'performance',
          'trending',
        ],
      },
      {
        title: 'Alpine.js',
        href: 'https://alpinejs.dev/',
        icon: 'simple-icons:alpinedotjs',
        description:
          'Lightweight framework for adding interactivity to HTML with declarative syntax and minimal overhead.',
        tags: [
          'javascript',
          'free',
          'open-source',
          'beginner-friendly',
          'performance',
        ],
      },
      {
        title: 'Lit',
        href: 'https://lit.dev/',
        icon: 'simple-icons:lit',
        description:
          'Library for building fast, lightweight web components with simple APIs and excellent performance.',
        tags: [
          'javascript',
          'free',
          'open-source',
          'performance',
          'modern',
          'advanced',
        ],
      },
      {
        title: 'HTMX',
        href: 'https://htmx.org/',
        icon: 'simple-icons:html5',
        description:
          'Modern approach to dynamic web applications using HTML attributes for AJAX, CSS transitions, and WebSockets.',
        tags: [
          'html',
          'javascript',
          'free',
          'open-source',
          'modern',
          'performance',
          'trending',
        ],
      },
      {
        title: 'Next.js',
        href: 'https://nextjs.org/',
        icon: 'simple-icons:nextdotjs',
        description:
          'Full-featured React framework with server-side rendering, static generation, and optimized performance.',
        tags: [
          'react',
          'typescript',
          'free',
          'open-source',
          'full-stack',
          'trending',
          'performance',
        ],
      },
      {
        title: 'Remix',
        href: 'https://remix.run/',
        icon: 'simple-icons:remix',
        description:
          'Full-stack web framework focused on web standards, performance, and excellent user experience.',
        tags: [
          'react',
          'typescript',
          'free',
          'open-source',
          'full-stack',
          'performance',
          'modern',
        ],
      },
      {
        title: 'Nuxt',
        href: 'https://nuxt.com/',
        icon: 'simple-icons:nuxtdotjs',
        description:
          'Vue.js framework for building modern applications with server-side rendering and static site generation.',
        tags: [
          'vue',
          'typescript',
          'free',
          'open-source',
          'full-stack',
          'performance',
          'trending',
        ],
      },
      {
        title: 'React Router',
        href: 'https://reactrouter.com/',
        icon: 'simple-icons:reactrouter',
        description:
          'Standards-focused router for React that scales from client-side routing to a full server-rendered framework.',
        tags: [
          'react',
          'typescript',
          'free',
          'open-source',
          'full-stack',
          'trending',
        ],
      },
      {
        title: 'SvelteKit',
        href: 'https://svelte.dev/docs/kit/introduction',
        icon: 'simple-icons:svelte',
        description:
          'Official Svelte application framework with filesystem routing, server rendering, and adapters for any host.',
        tags: [
          'javascript',
          'typescript',
          'free',
          'open-source',
          'full-stack',
          'performance',
          'modern',
        ],
      },
      {
        title: 'Astro',
        href: 'https://astro.build/',
        icon: 'simple-icons:astro',
        description:
          'Static site generator that delivers zero JavaScript by default, with component islands architecture.',
        tags: [
          'javascript',
          'typescript',
          'free',
          'open-source',
          'performance',
          'modern',
          'trending',
        ],
      },
      {
        title: 'Deno Fresh',
        href: 'https://usefresh.dev/',
        icon: 'simple-icons:deno',
        description:
          'Modern web framework for Deno with server-side rendering, islands architecture, and TypeScript support.',
        tags: [
          'typescript',
          'free',
          'open-source',
          'modern',
          'performance',
          'advanced',
        ],
      },
      {
        title: 'Docusaurus',
        href: 'https://docusaurus.io/',
        icon: 'simple-icons:docusaurus',
        description:
          'React-based static site generator optimized for documentation websites and technical content.',
        tags: [
          'react',
          'javascript',
          'free',
          'open-source',
          'documentation',
          'cms',
        ],
      },
      {
        title: 'SolidStart',
        href: 'https://start.solidjs.com/',
        icon: 'simple-icons:solid',
        description:
          'Full-stack meta-framework for SolidJS with server-side rendering, routing, and modern web features.',
        tags: [
          'javascript',
          'typescript',
          'free',
          'open-source',
          'full-stack',
          'modern',
          'performance',
        ],
      },
      {
        title: 'Eleventy',
        href: 'https://www.11ty.dev/',
        icon: 'simple-icons:eleventy',
        description:
          'Simple static site generator with flexible templating and excellent performance for content-focused sites.',
        tags: [
          'javascript',
          'free',
          'open-source',
          'performance',
          'cms',
          'beginner-friendly',
        ],
      },
      {
        title: 'Express',
        href: 'https://expressjs.com/',
        icon: 'simple-icons:express',
        description:
          'Minimal and unopinionated Node.js web framework, the long-standing default for HTTP servers and APIs.',
        tags: [
          'nodejs',
          'javascript',
          'free',
          'open-source',
          'full-stack',
          'beginner-friendly',
        ],
      },
      {
        title: 'Fastify',
        href: 'https://fastify.dev/',
        icon: 'simple-icons:fastify',
        description:
          'Node.js web framework built around schema-based validation and low request overhead.',
        tags: [
          'nodejs',
          'javascript',
          'typescript',
          'free',
          'open-source',
          'full-stack',
          'performance',
        ],
      },
      {
        title: 'Hono',
        href: 'https://hono.dev/',
        icon: 'simple-icons:hono',
        description:
          'Small web framework built on Web Standards that runs on Node.js, Bun, Deno, and edge runtimes.',
        tags: [
          'typescript',
          'javascript',
          'free',
          'open-source',
          'performance',
          'modern',
          'trending',
        ],
      },
      {
        title: 'NestJS',
        href: 'https://nestjs.com/',
        icon: 'simple-icons:nestjs',
        description:
          'Opinionated Node.js framework with dependency injection and modular architecture for large server applications.',
        tags: [
          'typescript',
          'nodejs',
          'free',
          'open-source',
          'full-stack',
          'advanced',
        ],
      },
      {
        title: 'Jest',
        href: 'https://jestjs.io/',
        icon: 'simple-icons:jest',
        description:
          'Delightful JavaScript testing framework with zero configuration and comprehensive testing utilities.',
        tags: [
          'javascript',
          'testing',
          'free',
          'open-source',
          'beginner-friendly',
          'trending',
        ],
      },
      {
        title: 'Mocha',
        href: 'https://mochajs.org/',
        icon: 'simple-icons:mocha',
        description:
          'Flexible JavaScript testing framework for Node.js and browser environments with extensive configurability.',
        tags: [
          'javascript',
          'nodejs',
          'testing',
          'free',
          'open-source',
          'advanced',
        ],
      },
      {
        title: 'Storybook',
        href: 'https://storybook.js.org/',
        icon: 'simple-icons:storybook',
        description:
          'Open-source tool for developing UI components in isolation with interactive documentation and testing.',
        tags: [
          'javascript',
          'react',
          'vue',
          'testing',
          'free',
          'open-source',
          'documentation',
          'design',
        ],
      },
      {
        title: 'Cypress',
        href: 'https://www.cypress.io/',
        icon: 'simple-icons:cypress',
        description:
          'End-to-end testing framework that runs in the browser with real-time reload and comprehensive debugging.',
        tags: [
          'javascript',
          'testing',
          'free',
          'paid',
          'beginner-friendly',
          'trending',
        ],
      },
      {
        title: 'Puppeteer',
        href: 'https://pptr.dev/',
        icon: 'simple-icons:puppeteer',
        description:
          'Node.js library for controlling Chrome/Chromium with powerful automation and testing capabilities.',
        tags: [
          'javascript',
          'nodejs',
          'testing',
          'free',
          'open-source',
          'advanced',
        ],
      },
      {
        title: 'Testing Library',
        href: 'https://testing-library.com/',
        icon: 'simple-icons:testinglibrary',
        description:
          'Simple and complete testing utilities for React, Vue, and web applications with user-centric testing.',
        tags: [
          'javascript',
          'react',
          'vue',
          'testing',
          'free',
          'open-source',
          'beginner-friendly',
        ],
      },
      {
        title: 'Playwright',
        href: 'https://playwright.dev/',
        icon: 'simple-icons:playwright',
        description:
          'Cross-browser automation library for reliable end-to-end testing across Chromium, Firefox, and WebKit.',
        tags: [
          'javascript',
          'typescript',
          'testing',
          'free',
          'open-source',
          'advanced',
          'trending',
        ],
      },
      {
        title: 'WebdriverIO',
        href: 'https://webdriver.io/',
        icon: 'simple-icons:webdriverio',
        description:
          'Next-gen browser and mobile automation test framework for Node.js with comprehensive testing capabilities.',
        tags: [
          'javascript',
          'nodejs',
          'testing',
          'mobile-dev',
          'free',
          'open-source',
          'advanced',
        ],
      },
      {
        title: 'Vitest',
        href: 'https://vitest.dev/',
        icon: 'simple-icons:vitest',
        description:
          'Fast unit testing framework built on Vite with native TypeScript support and excellent developer experience.',
        tags: [
          'javascript',
          'typescript',
          'testing',
          'free',
          'open-source',
          'performance',
          'modern',
        ],
      },
      {
        title: 'TestCafé',
        href: 'https://testcafe.io/',
        icon: 'simple-icons:testcafe',
        description:
          'Cross-browser testing framework with simple syntax and powerful automation capabilities for web applications.',
        tags: [
          'javascript',
          'testing',
          'free',
          'paid',
          'beginner-friendly',
          'advanced',
        ],
      },
      {
        title: 'Electron',
        href: 'https://www.electronjs.org/',
        icon: 'simple-icons:electron',
        description:
          'Framework for building cross-platform desktop applications using web technologies like HTML, CSS, and JavaScript.',
        tags: [
          'javascript',
          'desktop-dev',
          'free',
          'open-source',
          'advanced',
          'trending',
        ],
      },
      {
        title: 'React Native',
        href: 'https://reactnative.dev/',
        icon: 'simple-icons:react',
        description:
          'Framework for building native mobile applications using React and JavaScript with platform-specific optimizations.',
        tags: [
          'react',
          'mobile-dev',
          'free',
          'open-source',
          'advanced',
          'trending',
        ],
      },
      {
        title: 'Expo',
        href: 'https://expo.dev/',
        icon: 'simple-icons:expo',
        description:
          'Platform for React Native development with managed workflow, pre-built components, and easy deployment.',
        tags: [
          'react',
          'mobile-dev',
          'free',
          'paid',
          'platform',
          'beginner-friendly',
          'deployment',
        ],
      },
      {
        title: 'Capacitor',
        href: 'https://capacitorjs.com/',
        icon: 'simple-icons:capacitor',
        description:
          'Cross-platform native runtime for web apps with access to native device features and APIs.',
        tags: [
          'javascript',
          'mobile-dev',
          'desktop-dev',
          'free',
          'open-source',
          'advanced',
        ],
      },
      {
        title: 'Ionic Framework',
        href: 'https://ionicframework.com/',
        icon: 'simple-icons:ionic',
        description:
          'Open-source UI toolkit for building cross-platform applications with web technologies and native performance.',
        tags: [
          'javascript',
          'mobile-dev',
          'free',
          'open-source',
          'design',
          'beginner-friendly',
        ],
      },
      {
        title: 'Quasar',
        href: 'https://quasar.dev/',
        icon: 'simple-icons:quasar',
        description:
          'Vue.js framework for building responsive web, mobile, and desktop applications from a single codebase.',
        tags: [
          'vue',
          'javascript',
          'mobile-dev',
          'desktop-dev',
          'free',
          'open-source',
          'full-stack',
        ],
      },
      {
        title: 'Tauri',
        href: 'https://tauri.app/',
        icon: 'simple-icons:tauri',
        description:
          'Framework for building tiny, blazingly fast binaries for all major desktop platforms using web technologies.',
        tags: [
          'javascript',
          'desktop-dev',
          'free',
          'open-source',
          'performance',
          'modern',
          'trending',
        ],
      },
      {
        title: 'Tailwind CSS',
        href: 'https://tailwindcss.com/',
        icon: 'simple-icons:tailwindcss',
        description:
          'Utility-first CSS framework for rapidly building custom designs with composable classes and minimal CSS.',
        tags: [
          'css',
          'free',
          'open-source',
          'design',
          'trending',
          'beginner-friendly',
          'performance',
        ],
      },
      {
        title: 'Bootstrap',
        href: 'https://getbootstrap.com/',
        icon: 'simple-icons:bootstrap',
        description:
          'Component-driven CSS framework with a responsive grid, prebuilt widgets, and extensive theming.',
        tags: [
          'css',
          'javascript',
          'free',
          'open-source',
          'design',
          'beginner-friendly',
        ],
      },
      {
        title: 'shadcn/ui',
        href: 'https://ui.shadcn.com/',
        icon: 'simple-icons:shadcnui',
        description:
          'Collection of beautifully designed, accessible components that you can copy and paste into your apps.',
        tags: [
          'react',
          'typescript',
          'free',
          'open-source',
          'design',
          'accessibility',
          'trending',
          'modern',
        ],
      },
      {
        title: 'Radix UI',
        href: 'https://www.radix-ui.com/',
        icon: 'simple-icons:radixui',
        description:
          'Unstyled, accessible React primitives that handle keyboard, focus, and ARIA behavior for you.',
        tags: [
          'react',
          'typescript',
          'free',
          'open-source',
          'design',
          'accessibility',
          'modern',
        ],
      },
      {
        title: 'Mantine',
        href: 'https://mantine.dev/',
        icon: 'simple-icons:mantine',
        description:
          'Full-featured React component and hooks library with dark mode, forms, and accessible defaults.',
        tags: [
          'react',
          'typescript',
          'free',
          'open-source',
          'design',
          'accessibility',
          'beginner-friendly',
        ],
      },
      {
        title: 'Redux',
        href: 'https://redux.js.org/',
        icon: 'simple-icons:redux',
        description:
          'Predictable state container for JavaScript apps with centralized store and unidirectional data flow.',
        tags: [
          'javascript',
          'react',
          'free',
          'open-source',
          'advanced',
          'full-stack',
        ],
      },
      {
        title: 'Zustand',
        href: 'https://zustand-demo.pmnd.rs/',
        icon: 'simple-icons:react',
        description:
          'Small, fast, and scalable state management solution for React with simplified API and minimal boilerplate.',
        tags: [
          'react',
          'javascript',
          'free',
          'open-source',
          'performance',
          'beginner-friendly',
          'modern',
        ],
      },
      {
        title: 'Jotai',
        href: 'https://jotai.org/',
        icon: 'simple-icons:react',
        description:
          'Primitive and flexible state management for React with atomic approach and excellent TypeScript support.',
        tags: [
          'react',
          'typescript',
          'free',
          'open-source',
          'advanced',
          'modern',
        ],
      },
      {
        title: 'XState',
        href: 'https://stately.ai/docs/xstate',
        icon: 'simple-icons:xstate',
        description:
          'State machines and statecharts for the modern web, enabling robust, visual state management.',
        tags: [
          'javascript',
          'typescript',
          'free',
          'open-source',
          'advanced',
          'modern',
        ],
      },
      {
        title: 'TanStack Query',
        href: 'https://tanstack.com/query/latest',
        icon: 'simple-icons:reactquery',
        description:
          'Powerful data fetching and caching library for React, Vue, and Svelte with automatic cache management.',
        tags: [
          'react',
          'vue',
          'javascript',
          'free',
          'open-source',
          'performance',
          'advanced',
        ],
      },
      {
        title: 'TanStack Router',
        href: 'https://tanstack.com/router/latest',
        icon: 'simple-icons:tanstack',
        description:
          'Type-safe React router with typed search params, loaders, and a full-stack Start framework.',
        tags: [
          'react',
          'typescript',
          'free',
          'open-source',
          'modern',
          'advanced',
        ],
      },
      {
        title: 'Zod',
        href: 'https://zod.dev/',
        icon: 'simple-icons:zod',
        description:
          'TypeScript-first schema validation that infers static types from a single runtime schema definition.',
        tags: [
          'typescript',
          'javascript',
          'free',
          'open-source',
          'modern',
          'trending',
        ],
      },
      {
        title: 'React Hook Form',
        href: 'https://react-hook-form.com/',
        icon: 'simple-icons:reacthookform',
        description:
          'Uncontrolled form library for React that minimizes re-renders and integrates with schema validators.',
        tags: [
          'react',
          'typescript',
          'free',
          'open-source',
          'performance',
          'beginner-friendly',
        ],
      },
      {
        title: 'Drizzle ORM',
        href: 'https://orm.drizzle.team/',
        icon: 'simple-icons:drizzle',
        description:
          'Lightweight TypeScript ORM with SQL-like queries, generated migrations, and serverless driver support.',
        tags: [
          'typescript',
          'database',
          'free',
          'open-source',
          'modern',
          'trending',
        ],
      },
      {
        title: 'Motion',
        href: 'https://motion.dev/',
        icon: 'mdi:motion-play-outline',
        description:
          'Production-grade animation library for React, Vue, and vanilla JavaScript with a hybrid engine and declarative syntax.',
        tags: [
          'react',
          'vue',
          'javascript',
          'free',
          'open-source',
          'design',
          'advanced',
          'trending',
        ],
      },
      {
        title: 'Three.js',
        href: 'https://threejs.org/',
        icon: 'simple-icons:threedotjs',
        description:
          'JavaScript 3D library for creating and displaying animated 3D computer graphics in a web browser.',
        tags: [
          'javascript',
          'free',
          'open-source',
          'design',
          'advanced',
          'interactive',
        ],
      },
      {
        title: 'D3.js',
        href: 'https://d3js.org/',
        icon: 'simple-icons:d3dotjs',
        description:
          'JavaScript library for producing dynamic, interactive data visualizations using SVG, HTML, and CSS.',
        tags: [
          'javascript',
          'free',
          'open-source',
          'design',
          'advanced',
          'interactive',
        ],
      },
      {
        title: 'Chart.js',
        href: 'https://www.chartjs.org/',
        icon: 'simple-icons:chartdotjs',
        description:
          'Canvas-based charting library with sensible defaults and eight built-in chart types.',
        tags: [
          'javascript',
          'free',
          'open-source',
          'design',
          'interactive',
          'beginner-friendly',
        ],
      },
      {
        title: 'GSAP',
        href: 'https://gsap.com/',
        icon: 'simple-icons:greensock',
        description:
          'Timeline-based animation toolkit for any framework, with scroll, SVG, and text plugins now free.',
        tags: [
          'javascript',
          'free',
          'open-source',
          'design',
          'advanced',
          'interactive',
        ],
      },
      {
        title: 'Chakra UI',
        href: 'https://chakra-ui.com/',
        icon: 'simple-icons:chakraui',
        description:
          'Simple, modular, and accessible component library for React applications with excellent developer experience.',
        tags: [
          'react',
          'javascript',
          'free',
          'open-source',
          'design',
          'accessibility',
          'beginner-friendly',
        ],
      },
      {
        title: 'MUI',
        href: 'https://mui.com/',
        icon: 'simple-icons:mui',
        description:
          'Comprehensive suite of UI tools and React components implementing Google Material Design principles.',
        tags: [
          'react',
          'javascript',
          'typescript',
          'free',
          'paid',
          'design',
          'advanced',
        ],
      },
      {
        title: 'AI SDK',
        href: 'https://ai-sdk.dev/',
        icon: 'mdi:robot-outline',
        description:
          'Free open-source TypeScript library from Vercel for building AI-powered applications with unified provider API, streaming responses, and generative UI.',
        tags: [
          'ai',
          'typescript',
          'javascript',
          'free',
          'open-source',
          'modern',
          'trending',
          'library',
        ],
      },
      {
        title: 'Mastra',
        href: 'https://mastra.ai/',
        icon: 'mdi:robot-outline',
        description:
          'TypeScript agent framework with typed workflows, suspend and resume, memory, and evals in one package.',
        tags: [
          'ai',
          'agent',
          'typescript',
          'free',
          'open-source',
          'modern',
          'trending',
        ],
      },
      {
        title: 'LangChain.js',
        href: 'https://docs.langchain.com/oss/javascript/langchain/overview',
        icon: 'simple-icons:langchain',
        description:
          'JavaScript LangChain, wiring models, retrievers, and tools into agents with LangGraph handling control flow.',
        tags: [
          'ai',
          'agent',
          'javascript',
          'typescript',
          'free',
          'open-source',
          'advanced',
        ],
      },
      {
        title: 'MCP TypeScript SDK',
        href: 'https://github.com/modelcontextprotocol/typescript-sdk',
        icon: 'mdi:transit-connection-variant',
        description:
          'Reference client and server implementation of the Model Context Protocol for Node and the browser.',
        tags: [
          'ai',
          'agent',
          'typescript',
          'free',
          'open-source',
          'api',
          'modern',
        ],
      },
      {
        title: 'OpenAI Agents SDK',
        href: 'https://openai.github.io/openai-agents-js/',
        icon: 'simple-icons:openai',
        description:
          "OpenAI's TypeScript agent runtime with handoffs, guardrails, sessions, and tracing built in.",
        tags: [
          'ai',
          'agent',
          'typescript',
          'free',
          'open-source',
          'modern',
        ],
      },
      {
        title: 'LangGraph',
        href: 'https://docs.langchain.com/oss/javascript/langgraph/overview',
        icon: 'simple-icons:langgraph',
        description:
          'Graph runtime for agents that need loops, branches, and human approval, with checkpoints so a run can resume where it stopped.',
        tags: [
          'ai',
          'agent',
          'javascript',
          'typescript',
          'free',
          'open-source',
          'advanced',
        ],
      },
      {
        title: 'Agent Development Kit',
        href: 'https://adk.dev/',
        icon: 'simple-icons:google',
        description:
          "Google's agent framework, with a TypeScript runtime alongside Python, covering multi-agent delegation, tools, sessions, and local evaluation.",
        tags: [
          'ai',
          'agent',
          'typescript',
          'free',
          'open-source',
          'modern',
        ],
      },
      {
        title: 'LlamaIndex.TS',
        href: 'https://developers.llamaindex.ai/typescript/framework/',
        icon: 'mdi:text-box-search-outline',
        description:
          'TypeScript build of LlamaIndex, wiring loaders, indexes, and query engines into retrieval pipelines over your own documents.',
        tags: [
          'ai',
          'agent',
          'typescript',
          'free',
          'open-source',
          'advanced',
        ],
      },
      {
        title: 'Claude Agent SDK',
        href: 'https://code.claude.com/docs/en/agent-sdk/overview',
        icon: 'simple-icons:anthropic',
        description:
          'The loop, tools, and context management behind Claude Code, packaged as a TypeScript and Python library for your own agents.',
        tags: [
          'ai',
          'agent',
          'typescript',
          'free',
          'open-source',
          'advanced',
        ],
      },
      {
        title: 'Codex SDK',
        href: 'https://learn.chatgpt.com/docs/codex-sdk',
        icon: 'simple-icons:openai',
        description:
          'Programmatic control of the Codex agent from TypeScript or Python, for CI pipelines and coding tasks inside your own tools.',
        tags: [
          'ai',
          'agent',
          'typescript',
          'free',
          'advanced',
        ],
      },
      {
        title: 'Deep Agents',
        href: 'https://docs.langchain.com/oss/javascript/deepagents/overview',
        icon: 'simple-icons:langchain',
        description:
          'Agent harness on LangGraph with planning, a virtual filesystem, subagents, and context compression for long-running tasks.',
        tags: [
          'ai',
          'agent',
          'javascript',
          'typescript',
          'free',
          'open-source',
          'advanced',
        ],
      },
      {
        title: 'Transformers.js',
        href: 'https://huggingface.co/docs/transformers.js',
        icon: 'simple-icons:huggingface',
        description:
          'Runs Hugging Face models directly in the browser on WebGPU, with no inference server in the loop.',
        tags: [
          'ai',
          'javascript',
          'free',
          'open-source',
          'performance',
          'modern',
        ],
      },
      {
        title: 'Genkit',
        href: 'https://genkit.dev/',
        icon: 'simple-icons:google',
        description:
          "Google's open framework for AI features in Node, with flows, tracing, and a local developer UI.",
        tags: [
          'ai',
          'agent',
          'javascript',
          'typescript',
          'free',
          'open-source',
        ],
      },
      {
        title: 'CopilotKit',
        href: 'https://www.copilotkit.ai/',
        icon: 'mdi:robot-happy-outline',
        description:
          'React components and hooks for in-app copilots that read application state and call your own functions.',
        tags: [
          'ai',
          'react',
          'free',
          'open-source',
          'ui',
          'modern',
        ],
      },
      {
        title: 'assistant-ui',
        href: 'https://www.assistant-ui.com/',
        icon: 'mdi:chat-processing-outline',
        description:
          'Composable React primitives for chat interfaces — streaming, tool call rendering, attachments, and message branching.',
        tags: [
          'ai',
          'react',
          'typescript',
          'free',
          'open-source',
          'ui',
          'modern',
        ],
      },
      {
        title: 'TanStack Start',
        href: 'https://tanstack.com/start/latest',
        icon: 'simple-icons:tanstack',
        description:
          'Full-stack React framework on Vite with type-safe routing, server functions, and streaming SSR.',
        tags: [
          'react',
          'typescript',
          'free',
          'open-source',
          'full-stack',
          'modern',
          'trending',
        ],
      },
      {
        title: 'Base UI',
        href: 'https://base-ui.com/',
        icon: 'mdi:widgets-outline',
        description:
          'Unstyled, accessible React components from the maintainers of Radix, Material UI, and Floating UI.',
        tags: [
          'react',
          'typescript',
          'free',
          'open-source',
          'accessibility',
          'ui',
          'modern',
        ],
      },
      {
        title: 'React Aria',
        href: 'https://react-aria.adobe.com/',
        icon: 'simple-icons:adobe',
        description:
          "Adobe's hooks and components supplying behaviour, accessibility, and internationalization without imposing styles.",
        tags: [
          'react',
          'typescript',
          'free',
          'open-source',
          'accessibility',
          'advanced',
        ],
      },
      {
        title: 'Effect',
        href: 'https://effect.website/',
        icon: 'mdi:function-variant',
        description:
          'TypeScript library that puts errors, dependencies, and concurrency into the type signature.',
        tags: [
          'typescript',
          'free',
          'open-source',
          'advanced',
          'modern',
          'library',
        ],
      },
      {
        title: 'Valibot',
        href: 'https://valibot.dev/',
        icon: 'mdi:check-decagram-outline',
        description:
          'Schema validation shaped like Zod but modular, so a bundle carries only the validators it uses.',
        tags: [
          'typescript',
          'free',
          'open-source',
          'performance',
          'modern',
          'library',
        ],
      },
      {
        title: 'Nitro',
        href: 'https://nitro.build/',
        icon: 'mdi:engine-outline',
        description:
          'Server toolkit behind Nuxt that builds one codebase for Node, Deno, Bun, and every major edge runtime.',
        tags: [
          'javascript',
          'typescript',
          'free',
          'open-source',
          'deployment',
          'performance',
          'modern',
        ],
      },
      {
        title: 'Elysia',
        href: 'https://elysiajs.com/',
        icon: 'mdi:butterfly-outline',
        description:
          'Bun-first web framework with end-to-end type inference from route handler through to the client.',
        tags: [
          'typescript',
          'free',
          'open-source',
          'performance',
          'api',
          'modern',
        ],
      },
      {
        title: 'Kysely',
        href: 'https://kysely.dev/',
        icon: 'mdi:database-cog-outline',
        description:
          'Type-safe SQL query builder for TypeScript — autocompletion over your schema, without an ORM in between.',
        tags: [
          'typescript',
          'free',
          'open-source',
          'database',
          'library',
          'advanced',
        ],
      },
      {
        title: 'TanStack Form',
        href: 'https://tanstack.com/form/latest',
        icon: 'simple-icons:tanstack',
        description:
          'Headless, type-safe form state with async validation, shared across React, Vue, Solid, and Svelte.',
        tags: [
          'typescript',
          'react',
          'free',
          'open-source',
          'library',
          'modern',
        ],
      },
      {
        title: 'Pinia',
        href: 'https://pinia.vuejs.org/',
        icon: 'simple-icons:pinia',
        description:
          "Vue's official store, typed end to end with devtools support and no mutation boilerplate.",
        tags: [
          'vue',
          'typescript',
          'free',
          'open-source',
          'library',
          'modern',
        ],
      },
      {
        title: 'UnoCSS',
        href: 'https://unocss.dev/',
        icon: 'simple-icons:unocss',
        description:
          'Atomic CSS engine that generates only the utilities used, with presets to mirror Tailwind or define your own.',
        tags: [
          'css',
          'free',
          'open-source',
          'performance',
          'modern',
          'library',
        ],
      },
      {
        title: 'Panda CSS',
        href: 'https://panda-css.com/',
        icon: 'mdi:panda',
        description:
          'Zero-runtime CSS-in-JS from the Chakra team, extracting typed style props to static CSS at build time.',
        tags: [
          'css',
          'typescript',
          'free',
          'open-source',
          'performance',
          'modern',
        ],
      },
      {
        title: 'vanilla-extract',
        href: 'https://vanilla-extract.style/',
        icon: 'mdi:ice-cream',
        description:
          'Styles written in TypeScript and compiled to static CSS, so class names are type-checked and nothing ships at runtime.',
        tags: [
          'css',
          'typescript',
          'free',
          'open-source',
          'performance',
          'library',
        ],
      },
      {
        title: 'Open Props',
        href: 'https://open-props.style/',
        icon: 'mdi:palette-swatch-outline',
        description:
          'A design system as plain CSS custom properties — spacing, colour, easing, shadows — usable without a build step.',
        tags: [
          'css',
          'free',
          'open-source',
          'design',
          'library',
          'modern',
        ],
      },
      {
        title: 'Mock Service Worker',
        href: 'https://mswjs.io/',
        icon: 'mdi:server-network',
        description:
          'Intercepts requests at the network layer so tests and local development exercise the real fetch path.',
        tags: [
          'testing',
          'javascript',
          'typescript',
          'free',
          'open-source',
          'advanced',
        ],
      },
      {
        title: 'Yjs',
        href: 'https://yjs.dev/',
        icon: 'mdi:file-tree-outline',
        description:
          'CRDT implementation behind much of the collaborative editing on the web, with bindings for the major editors.',
        tags: [
          'javascript',
          'free',
          'open-source',
          'library',
          'advanced',
          'collaborative',
        ],
      },
      {
        title: 'Automerge',
        href: 'https://automerge.org/',
        icon: 'mdi:source-merge',
        description:
          'CRDT library for local-first apps, merging concurrent edits without a central server arbitrating order.',
        tags: [
          'javascript',
          'typescript',
          'free',
          'open-source',
          'library',
          'advanced',
        ],
      },
      {
        title: 'TanStack DB',
        href: 'https://tanstack.com/db/latest',
        icon: 'simple-icons:tanstack',
        description:
          'Reactive client store with live queries and optimistic writes, layered over a sync engine or a plain API.',
        tags: [
          'typescript',
          'react',
          'free',
          'open-source',
          'database',
          'modern',
          'trending',
        ],
      },
      {
        title: 'TanStack Table',
        href: 'https://tanstack.com/table/latest',
        icon: 'simple-icons:tanstack',
        description:
          'Headless table logic — sorting, grouping, pagination, virtualization — with the markup left entirely to you.',
        tags: [
          'typescript',
          'react',
          'free',
          'open-source',
          'library',
          'ui',
        ],
      },
      {
        title: 'Ark UI',
        href: 'https://ark-ui.com/',
        icon: 'mdi:toy-brick-outline',
        description:
          'State-machine-driven headless components shared across React, Vue, Solid, and Svelte from one implementation.',
        tags: [
          'typescript',
          'react',
          'vue',
          'free',
          'open-source',
          'accessibility',
          'ui',
        ],
      },
      {
        title: 'React Three Fiber',
        href: 'https://r3f.docs.pmnd.rs/',
        icon: 'simple-icons:threedotjs',
        description:
          'Three.js expressed as React components, so a 3D scene is declarative and reconciles like the rest of the tree.',
        tags: [
          'react',
          'javascript',
          'free',
          'open-source',
          'design',
          'advanced',
        ],
      },
      {
        title: 'PixiJS',
        href: 'https://pixijs.com/',
        icon: 'mdi:gamepad-variant-outline',
        description:
          'WebGL and WebGPU 2D renderer for games and data-heavy canvases where the DOM runs out of headroom.',
        tags: [
          'javascript',
          'free',
          'open-source',
          'performance',
          'advanced',
          'library',
        ],
      },
      {
        title: 'Apache ECharts',
        href: 'https://echarts.apache.org/',
        icon: 'mdi:chart-bar',
        description:
          'Charting library covering the awkward cases — large datasets, geo maps, and dense dashboards — with canvas or SVG output.',
        tags: [
          'javascript',
          'free',
          'open-source',
          'design',
          'library',
          'performance',
        ],
      },
      {
        title: 'Observable Plot',
        href: 'https://observablehq.com/plot/',
        icon: 'mdi:chart-scatter-plot',
        description:
          'Grammar-of-graphics layer over D3 that turns most exploratory charts into a single concise call.',
        tags: [
          'javascript',
          'free',
          'open-source',
          'design',
          'library',
          'modern',
        ],
      },
    ],
  },

  {
    title: 'Communities',
    href: '/communities',
    icon: 'mdi:account-group',
    description:
      'Connect with fellow developers in these vibrant communities',
    links: [
      {
        title: 'Dev.to',
        href: 'https://dev.to/',
        icon: 'simple-icons:devdotto',
        description:
          'Inclusive social network for software developers with articles, discussions, and community-driven content.',
        tags: [
          'community',
          'free',
          'blog',
          'beginner-friendly',
          'career-focused',
          'trending',
        ],
      },
      {
        title: 'r/webdev',
        href: 'https://www.reddit.com/r/webdev/',
        icon: 'simple-icons:reddit',
        description:
          'Largest web development community on Reddit with discussions, resources, and industry insights.',
        tags: [
          'community',
          'free',
          'beginner-friendly',
          'career-focused',
          'trending',
        ],
      },
      {
        title: 'iCodeThis',
        href: 'https://icodethis.com/',
        icon: 'mdi:code-braces',
        description:
          'Daily coding challenges and community for web developers to practice and improve their skills.',
        tags: [
          'coding-challenges',
          'community',
          'free',
          'hands-on',
          'beginner-friendly',
          'interactive',
        ],
      },
      {
        title: 'Stack Overflow',
        href: 'https://stackoverflow.com/',
        icon: 'simple-icons:stackoverflow',
        description:
          "The world's largest Q&A platform for developers to ask questions, share knowledge, and build careers.",
        tags: [
          'community',
          'free',
          'documentation',
          'advanced',
          'career-focused',
        ],
      },
      {
        title: 'GitHub Explore',
        href: 'https://github.com/explore',
        icon: 'simple-icons:github',
        description:
          'The global hub for open-source collaboration, code sharing, and developer networking.',
        tags: [
          'community',
          'free',
          'open-source',
          'trending',
          'advanced',
          'platform',
        ],
      },
      {
        title: 'Hashnode',
        href: 'https://hashnode.com/community',
        icon: 'simple-icons:hashnode',
        description:
          'Developer-focused blogging platform and community for sharing knowledge and connecting with peers.',
        tags: [
          'community',
          'blog',
          'free',
          'beginner-friendly',
          'career-focused',
        ],
      },
      {
        title: 'Indie Hackers',
        href: 'https://www.indiehackers.com/',
        icon: 'mdi:rocket',
        description:
          'Community of developers and entrepreneurs sharing stories, strategies, and support for building online businesses.',
        tags: [
          'community',
          'free',
          'career-focused',
          'trending',
          'full-stack',
        ],
      },
      {
        title: 'HackerRank',
        href: 'https://www.hackerrank.com/',
        icon: 'simple-icons:hackerrank',
        description:
          'Competitive programming platform and community for developers to practice coding and prepare for interviews.',
        tags: [
          'coding-challenges',
          'interview-prep',
          'community',
          'free',
          'paid',
          'hands-on',
          'career-focused',
        ],
      },
      {
        title: 'daily.dev',
        href: 'https://daily.dev/',
        icon: 'simple-icons:dailydotdev',
        description:
          'Professional network and personalized news feed for developers to stay up to date and connect with the community.',
        tags: [
          'community',
          'free',
          'trending',
          'career-focused',
          'modern',
        ],
      },
      {
        title: 'freeCodeCamp Forum',
        href: 'https://forum.freecodecamp.org/',
        icon: 'simple-icons:freecodecamp',
        description:
          'Supportive community forum for learners and professionals to discuss programming and career development.',
        tags: [
          'community',
          'free',
          'beginner-friendly',
          'career-focused',
          'tutorial',
        ],
      },
      {
        title: 'The Coding Den',
        href: 'https://discord.com/invite/code',
        icon: 'simple-icons:discord',
        description:
          'Active Discord community providing programming help, project feedback, and mentorship.',
        tags: [
          'community',
          'free',
          'beginner-friendly',
          'hands-on',
          'career-focused',
        ],
      },
      {
        title: 'Reactiflux',
        href: 'https://www.reactiflux.com/',
        icon: 'simple-icons:react',
        description:
          'The largest React Discord community with channels for React, Next.js, and other related technologies.',
        tags: [
          'react',
          'javascript',
          'community',
          'free',
          'beginner-friendly',
          'advanced',
        ],
      },

      {
        title: 'Hacker News',
        href: 'https://news.ycombinator.com/',
        icon: 'simple-icons:ycombinator',
        description:
          'Social news website focusing on computer science, entrepreneurship, and technology discussion.',
        tags: [
          'community',
          'free',
          'trending',
          'career-focused',
          'advanced',
        ],
      },
      {
        title: 'Lobsters',
        href: 'https://lobste.rs/',
        icon: 'simple-icons:lobsters',
        description:
          'Computing-focused community with high-quality technical discussions and a strong focus on programming.',
        tags: ['community', 'free', 'advanced', 'trending'],
      },
      {
        title: 'Product Hunt',
        href: 'https://www.producthunt.com/',
        icon: 'simple-icons:producthunt',
        description:
          'Platform for discovering and launching new tech products with an engaged community of makers and early adopters.',
        tags: [
          'community',
          'free',
          'trending',
          'career-focused',
          'modern',
        ],
      },
      {
        title: 'CodeNewbie',
        href: 'https://www.codenewbie.org/',
        icon: 'mdi:account-school',
        description:
          'Supportive community of programmers and people learning to code with podcasts, Twitter chats, and resources.',
        tags: [
          'community',
          'free',
          'beginner-friendly',
          'career-focused',
          'tutorial',
        ],
      },
      {
        title: 'Web Accessibility Initiative',
        href: 'https://www.w3.org/WAI/about/participating/',
        icon: 'simple-icons:w3c',
        description:
          'W3C community working to improve web accessibility through guidelines, tools, education, and research.',
        tags: [
          'accessibility',
          'community',
          'free',
          'documentation',
          'advanced',
        ],
      },
      {
        title: 'r/LocalLLaMA',
        href: 'https://www.reddit.com/r/LocalLLaMA/',
        icon: 'simple-icons:reddit',
        description:
          'Where people running open models locally compare quantizations, hardware, and benchmarks in public.',
        tags: [
          'community',
          'free',
          'ai',
          'open-source',
          'advanced',
        ],
      },
      {
        title: 'r/ClaudeAI',
        href: 'https://www.reddit.com/r/ClaudeAI/',
        icon: 'simple-icons:reddit',
        description:
          'Working notes on Claude and Claude Code — prompts, agent setups, and what breaks in practice.',
        tags: [
          'community',
          'free',
          'ai',
          'agent',
          'modern',
        ],
      },
      {
        title: 'r/reactjs',
        href: 'https://www.reddit.com/r/reactjs/',
        icon: 'simple-icons:reddit',
        description:
          'React-specific questions, release discussion, and code review threads.',
        tags: [
          'community',
          'free',
          'react',
          'javascript',
        ],
      },
      {
        title: 'r/ExperiencedDevs',
        href: 'https://www.reddit.com/r/ExperiencedDevs/',
        icon: 'simple-icons:reddit',
        description:
          'Career and engineering-practice discussion for developers past the junior stage.',
        tags: [
          'community',
          'free',
          'career-focused',
          'advanced',
        ],
      },
      {
        title: 'OpenAI Developer Community',
        href: 'https://community.openai.com/',
        icon: 'simple-icons:openai',
        description:
          "OpenAI's official forum, where API changes, rate limits, and model quirks get worked out in public.",
        tags: [
          'community',
          'free',
          'ai',
          'api',
          'modern',
        ],
      },
      {
        title: 'Hugging Face Forums',
        href: 'https://discuss.huggingface.co/',
        icon: 'simple-icons:huggingface',
        description:
          'Model, dataset, and fine-tuning questions answered by the people maintaining the libraries.',
        tags: [
          'community',
          'free',
          'ai',
          'open-source',
          'advanced',
        ],
      },
      {
        title: 'CodePen',
        href: 'https://codepen.io/',
        icon: 'simple-icons:codepen',
        description:
          'Front-end playground where demos are published in public, and the fastest place to find a working CSS technique.',
        tags: [
          'community',
          'free',
          'css',
          'html',
          'javascript',
          'interactive',
        ],
      },
      {
        title: 'AI Engineer',
        href: 'https://www.ai.engineer/',
        icon: 'mdi:presentation',
        description:
          'Conference and community for people shipping AI products, with every talk published free afterwards.',
        tags: [
          'community',
          'free',
          'ai',
          'agent',
          'video-based',
          'modern',
        ],
      },
      {
        title: 'Agentic AI Foundation',
        href: 'https://aaif.io/',
        icon: 'simple-icons:linuxfoundation',
        description:
          'Linux Foundation body stewarding MCP, AGENTS.md, and goose, where the open agent standards are governed in public.',
        tags: [
          'community',
          'free',
          'ai',
          'agent',
          'open-source',
        ],
      },
      {
        title: 'Kaggle',
        href: 'https://www.kaggle.com/',
        icon: 'simple-icons:kaggle',
        description:
          'Competitions, public datasets, and shared notebooks for practising machine learning on real problems.',
        tags: [
          'community',
          'free',
          'ai',
          'python',
          'hands-on',
          'coding-challenges',
        ],
      },
      {
        title: 'Vercel Community',
        href: 'https://community.vercel.com/',
        icon: 'simple-icons:vercel',
        description:
          'Support and discussion for Next.js and Vercel, staffed by the people who build them.',
        tags: [
          'community',
          'free',
          'react',
          'deployment',
          'modern',
        ],
      },
      {
        title: 'Astro Discord',
        href: 'https://astro.build/chat',
        icon: 'simple-icons:astro',
        description:
          "Astro's community chat, where the core team answers questions and integrations get built in the open.",
        tags: [
          'community',
          'free',
          'open-source',
          'modern',
        ],
      },
      {
        title: 'Svelte Discord',
        href: 'https://svelte.dev/chat',
        icon: 'simple-icons:svelte',
        description:
          'Svelte and SvelteKit help in real time, with maintainers regularly in the threads.',
        tags: [
          'community',
          'free',
          'open-source',
          'javascript',
        ],
      },
      {
        title: 'r/nextjs',
        href: 'https://www.reddit.com/r/nextjs/',
        icon: 'simple-icons:reddit',
        description:
          'Next.js release discussion, App Router questions, and deployment troubleshooting in the open.',
        tags: [
          'community',
          'free',
          'react',
          'deployment',
          'modern',
        ],
      },
      {
        title: 'TypeScript Discord',
        href: 'https://discord.com/invite/typescript',
        icon: 'simple-icons:typescript',
        description:
          'Real-time help with types, generics, and compiler configuration from people who read the spec for fun.',
        tags: [
          'community',
          'free',
          'typescript',
          'advanced',
        ],
      },
      {
        title: 'Vue Land',
        href: 'https://chat.vuejs.org/',
        icon: 'simple-icons:vuedotjs',
        description:
          "Vue's official Discord, where core team members answer questions across Vue, Nuxt, Vite, and Pinia.",
        tags: [
          'community',
          'free',
          'vue',
          'javascript',
          'open-source',
        ],
      },
      {
        title: 'Devpost',
        href: 'https://devpost.com/',
        icon: 'simple-icons:devpost',
        description:
          'Hackathon listings and project showcases, and a practical way to ship something small against a deadline.',
        tags: [
          'community',
          'free',
          'hands-on',
          'career-focused',
          'coding-challenges',
        ],
      },
      {
        title: 'AnitaB.org',
        href: 'https://anitab.org/',
        icon: 'mdi:account-group-outline',
        description:
          'Long-running nonprofit for women and non-binary technologists, running Grace Hopper and year-round local communities.',
        tags: [
          'community',
          'free',
          'career-focused',
          'beginner-friendly',
        ],
      },
    ],
  },
  {
    title: 'Blogs and Newsletters',
    href: '/blogs',
    icon: 'mdi:post',
    description:
      'Stay updated with insights from industry experts and thought leaders',
    links: [
      {
        title: 'Josh W Comeau',
        href: 'https://www.joshwcomeau.com/',
        icon: 'mdi:account',
        description:
          'Friendly tutorials focusing on React, CSS animations, and modern web development techniques.',
        tags: [
          'react',
          'css',
          'blog',
          'free',
          'beginner-friendly',
          'design',
          'tutorial',
        ],
      },
      {
        title: 'Lee Robinson',
        href: 'https://leerob.com/',
        icon: 'mdi:account',
        description:
          'Insights on building modern web applications, performance optimization, and developer experience from a former Vercel product lead.',
        tags: [
          'blog',
          'free',
          'performance',
          'advanced',
          'career-focused',
          'modern',
        ],
      },
      {
        title: 'Alex Kondov',
        href: 'https://alexkondov.com/',
        icon: 'mdi:account',
        description:
          'Software engineer and writer sharing insights on JavaScript, React, software design, and architecture with 10+ years of experience.',
        tags: [
          'javascript',
          'react',
          'blog',
          'free',
          'advanced',
          'career-focused',
        ],
      },
      {
        title: 'Rafael Camargo',
        href: 'https://www.cmrg.me/',
        icon: 'mdi:account',
        description:
          'Software engineering insights on building scalable digital products and high-converting user experiences.',
        tags: [
          'blog',
          'free',
          'advanced',
          'career-focused',
          'design',
        ],
      },
      {
        title: 'Nico Prananta',
        href: 'https://www.nico.fyi/',
        icon: 'mdi:account',
        description:
          'Personal blog covering React, Next.js, TypeScript, and modern web development stack experiences.',
        tags: [
          'react',
          'typescript',
          'blog',
          'free',
          'advanced',
          'modern',
        ],
      },
      {
        title: 'Dan Abramov',
        href: 'https://overreacted.io/',
        icon: 'mdi:account',
        description:
          'Personal blog of React core team member sharing deep insights on React, JavaScript, and software development.',
        tags: [
          'react',
          'javascript',
          'blog',
          'free',
          'advanced',
          'trending',
        ],
      },
      {
        title: 'Kent C. Dodds',
        href: 'https://kentcdodds.com/blog',
        icon: 'mdi:account',
        description:
          'Thoughtful articles on React, testing, TypeScript, and modern web development from a testing and React expert.',
        tags: [
          'react',
          'testing',
          'typescript',
          'blog',
          'free',
          'advanced',
          'tutorial',
        ],
      },
      {
        title: 'Sarah Drasner',
        href: 'https://sarah.dev/writing',
        icon: 'mdi:account',
        description:
          'Occasional long-form essays on engineering leadership, career, and the craft of building for the web.',
        tags: [
          'css',
          'vue',
          'design',
          'blog',
          'free',
          'advanced',
          'tutorial',
        ],
      },
      {
        title: 'Addy Osmani',
        href: 'https://addyosmani.com/',
        icon: 'mdi:account',
        description:
          'Performance and web development insights from Google Chrome team member and web performance expert.',
        tags: [
          'performance',
          'blog',
          'free',
          'advanced',
          'trending',
          'career-focused',
        ],
      },
      {
        title: 'Chris Coyier',
        href: 'https://chriscoyier.net/',
        icon: 'mdi:account',
        description:
          'Personal blog of CSS-Tricks founder sharing insights on CSS, web design, and front-end development.',
        tags: [
          'css',
          'design',
          'blog',
          'free',
          'beginner-friendly',
          'advanced',
        ],
      },
      {
        title: 'Wes Bos',
        href: 'https://wesbos.com/blog',
        icon: 'mdi:account',
        description:
          'JavaScript and React tutorials, tips, and insights from a popular web development educator.',
        tags: [
          'javascript',
          'react',
          'blog',
          'free',
          'beginner-friendly',
          'tutorial',
          'trending',
        ],
      },
      {
        title: 'Surma',
        href: 'https://surma.dev/',
        icon: 'mdi:account',
        description:
          'Deep technical articles on web performance, WebAssembly, and modern web technologies.',
        tags: ['performance', 'blog', 'free', 'advanced', 'modern'],
      },
      {
        title: 'Jake Archibald',
        href: 'https://jakearchibald.com/',
        icon: 'mdi:account',
        description:
          'Personal blog covering service workers, web performance, and modern web platform features.',
        tags: ['performance', 'blog', 'free', 'advanced', 'modern'],
      },
      {
        title: 'Una Kravets',
        href: 'https://una.im/',
        icon: 'mdi:account',
        description:
          'CSS, web design, and developer experience insights from a web platform advocate.',
        tags: [
          'css',
          'design',
          'blog',
          'free',
          'advanced',
          'career-focused',
        ],
      },
      {
        title: 'Phil Hawksworth',
        href: 'https://www.hawksworx.com/blog/',
        icon: 'mdi:account',
        description:
          'JAMstack, serverless, and modern web development insights from a developer relations expert.',
        tags: [
          'blog',
          'free',
          'advanced',
          'modern',
          'career-focused',
        ],
      },
      {
        title: 'Svelte Blog',
        href: 'https://svelte.dev/blog',
        icon: 'simple-icons:svelte',
        description:
          'Official Svelte blog where Rich Harris and the core team announce releases and explain framework design decisions.',
        tags: [
          'javascript',
          'blog',
          'free',
          'advanced',
          'trending',
          'career-focused',
        ],
      },
      {
        title: 'Guillermo Rauch',
        href: 'https://rauchg.com/',
        icon: 'mdi:account',
        description:
          'Personal blog of Vercel CEO and Next.js creator sharing thoughts on modern web development.',
        tags: [
          'react',
          'javascript',
          'blog',
          'free',
          'advanced',
          'trending',
          'career-focused',
        ],
      },
      {
        title: 'Mark Erikson',
        href: 'https://blog.isquaredsoftware.com/',
        icon: 'mdi:account',
        description:
          'Redux maintainer sharing insights on state management, React, and modern front-end architecture.',
        tags: [
          'react',
          'javascript',
          'blog',
          'free',
          'advanced',
          'tutorial',
        ],
      },
      {
        title: 'Michelle Barker',
        href: 'https://css-irl.info/',
        icon: 'mdi:account',
        description:
          'CSS expert sharing creative techniques, modern CSS features, and web design insights.',
        tags: [
          'css',
          'design',
          'blog',
          'free',
          'advanced',
          'tutorial',
        ],
      },
      {
        title: 'Max Stoiber',
        href: 'https://mxstbr.com/',
        icon: 'mdi:account',
        description:
          'Personal blog of styled-components creator sharing insights on React, CSS-in-JS, and modern styling.',
        tags: [
          'react',
          'css',
          'javascript',
          'blog',
          'free',
          'advanced',
          'trending',
        ],
      },
      {
        title: 'Lea Verou',
        href: 'https://lea.verou.me/',
        icon: 'mdi:account',
        description:
          'CSS expert and web standards advocate sharing creative CSS techniques and modern web development insights.',
        tags: [
          'css',
          'design',
          'blog',
          'free',
          'advanced',
          'tutorial',
        ],
      },
      {
        title: 'Paul Irish',
        href: 'https://www.paulirish.com/',
        icon: 'mdi:account',
        description:
          'Chrome team member sharing insights on web performance, developer tools, and modern web platform.',
        tags: [
          'performance',
          'blog',
          'free',
          'advanced',
          'career-focused',
        ],
      },
      {
        title: 'David Walsh',
        href: 'https://davidwalsh.name/',
        icon: 'mdi:account',
        description:
          'Mozilla developer sharing JavaScript tips, web development tutorials, and modern browser features.',
        tags: ['javascript', 'blog', 'free', 'tutorial', 'advanced'],
      },
      {
        title: 'Sara Soueidan',
        href: 'https://www.sarasoueidan.com/blog/',
        icon: 'mdi:account',
        description:
          'CSS and SVG expert sharing insights on web graphics, animations, and modern CSS techniques.',
        tags: [
          'css',
          'design',
          'blog',
          'free',
          'advanced',
          'tutorial',
        ],
      },
      {
        title: 'Harry Roberts',
        href: 'https://csswizardry.com/',
        icon: 'mdi:account',
        description:
          'CSS architecture expert sharing insights on scalable CSS, performance, and front-end architecture.',
        tags: [
          'css',
          'performance',
          'blog',
          'free',
          'advanced',
          'tutorial',
        ],
      },
      {
        title: 'Robin Rendle',
        href: 'https://robinrendle.com/',
        icon: 'mdi:account',
        description:
          'CSS and design systems expert sharing thoughts on web design, typography, and modern CSS.',
        tags: [
          'css',
          'design',
          'blog',
          'free',
          'advanced',
          'tutorial',
        ],
      },
      {
        title: 'Ben Frain',
        href: 'https://benfrain.com/',
        icon: 'mdi:account',
        description:
          'Front-end developer sharing insights on responsive design, CSS, and modern web development practices.',
        tags: [
          'css',
          'design',
          'blog',
          'free',
          'advanced',
          'tutorial',
        ],
      },
      {
        title: 'Jeremy Keith',
        href: 'https://adactio.com/journal/',
        icon: 'mdi:account',
        description:
          'Web standards advocate and author sharing insights on progressive enhancement and modern web development.',
        tags: [
          'blog',
          'free',
          'advanced',
          'accessibility',
          'career-focused',
        ],
      },
      {
        title: 'Rachel Andrew',
        href: 'https://rachelandrew.co.uk/archives/',
        icon: 'mdi:account',
        description:
          'CSS Grid expert and web standards advocate sharing insights on modern CSS and web layout.',
        tags: [
          'css',
          'design',
          'blog',
          'free',
          'advanced',
          'tutorial',
        ],
      },
      {
        title: 'Vercel Blog',
        href: 'https://vercel.com/blog',
        icon: 'simple-icons:vercel',
        description:
          'Official Vercel blog covering Next.js, React, deployment strategies, and modern web development platform insights.',
        tags: [
          'react',
          'deployment',
          'blog',
          'free',
          'platform',
          'performance',
        ],
      },
      {
        title: 'Syntax',
        href: 'https://syntax.fm/snackpack',
        icon: 'mdi:podcast',
        description:
          'Developer newsletter featuring hot takes, tips, tricks, and the latest web development news in bite-sized updates.',
        tags: [
          'javascript',
          'blog',
          'free',
          'trending',
          'beginner-friendly',
        ],
      },
      {
        title: 'Codesmith',
        href: 'https://codesmith.io/blog',
        icon: 'mdi:school',
        description:
          'Coding bootcamp insights covering software engineering, AI/ML, career transitions, and tech industry trends.',
        tags: [
          'career-focused',
          'ai',
          'blog',
          'free',
          'beginner-friendly',
          'interview-prep',
        ],
      },
      {
        title: 'unwind ai',
        href: 'https://www.theunwindai.com/',
        icon: 'mdi:email-newsletter',
        description:
          "A 3-minute daily read covering what's new and notable in AI - from frameworks and tools to models and implementation strategies.",
        tags: [
          'ai',
          'newsletter',
          'daily',
          'free',
          'modern',
          'trending',
          'tutorial',
        ],
      },
      {
        title: 'JavaScript Weekly',
        href: 'https://javascriptweekly.com/',
        icon: 'mdi:email-newsletter',
        description:
          'Weekly roundup of JavaScript news, articles, and releases, curated since 2011.',
        tags: [
          'javascript',
          'newsletter',
          'free',
          'weekly',
          'trending',
          'modern',
        ],
      },
      {
        title: 'Frontend Focus',
        href: 'https://frontendfoc.us/',
        icon: 'mdi:email-newsletter',
        description:
          'Weekly newsletter on HTML, CSS, and the browser platform, covering front-end news, tutorials, and specs.',
        tags: [
          'css',
          'html',
          'newsletter',
          'free',
          'weekly',
          'modern',
        ],
      },
      {
        title: 'React Status',
        href: 'https://react.statuscode.com/',
        icon: 'simple-icons:react',
        description:
          'Weekly React and React Native newsletter covering releases, tutorials, and notable ecosystem projects.',
        tags: ['react', 'newsletter', 'free', 'weekly', 'modern'],
      },
      {
        title: 'Node Weekly',
        href: 'https://nodeweekly.com/',
        icon: 'simple-icons:nodedotjs',
        description:
          'Weekly Node.js newsletter covering runtime releases, server-side JavaScript articles, and package news.',
        tags: [
          'nodejs',
          'javascript',
          'newsletter',
          'free',
          'weekly',
          'full-stack',
        ],
      },
      {
        title: 'Bytes',
        href: 'https://bytes.dev/',
        icon: 'simple-icons:javascript',
        description:
          'Irreverent JavaScript newsletter pairing ecosystem news and tooling updates with a sense of humor.',
        tags: [
          'javascript',
          'newsletter',
          'free',
          'trending',
          'beginner-friendly',
        ],
      },
      {
        title: 'CSS Weekly',
        href: 'https://css-weekly.com/',
        icon: 'simple-icons:css3',
        description:
          'Weekly roundup of CSS articles, tutorials, tools, and experiments curated for front-end developers.',
        tags: [
          'css',
          'newsletter',
          'free',
          'weekly',
          'tutorial',
          'design',
        ],
      },
      {
        title: 'Chrome for Developers',
        href: 'https://developer.chrome.com/blog',
        icon: 'simple-icons:googlechrome',
        description:
          'Official Chrome team blog covering new browser features, web platform APIs, DevTools, and performance guidance.',
        tags: [
          'performance',
          'blog',
          'free',
          'platform',
          'modern',
          'documentation',
        ],
      },
      {
        title: 'WebKit Blog',
        href: 'https://webkit.org/blog/',
        icon: 'simple-icons:safari',
        description:
          'Official WebKit blog detailing Safari releases, new web platform features, and browser engine internals.',
        tags: [
          'css',
          'blog',
          'free',
          'platform',
          'modern',
          'documentation',
        ],
      },
      {
        title: 'Mozilla Hacks',
        href: 'https://hacks.mozilla.org/',
        icon: 'simple-icons:firefoxbrowser',
        description:
          'Mozilla developer blog covering web standards, Firefox features, WebAssembly, and open web technology.',
        tags: [
          'blog',
          'free',
          'platform',
          'open-source',
          'modern',
          'advanced',
        ],
      },
      {
        title: 'React Blog',
        href: 'https://react.dev/blog',
        icon: 'simple-icons:react',
        description:
          'Official React blog announcing releases, RFCs, and design guidance straight from the React team.',
        tags: [
          'react',
          'blog',
          'free',
          'platform',
          'documentation',
          'modern',
        ],
      },
      {
        title: 'Ahmad Shadeed',
        href: 'https://ishadeed.com/',
        icon: 'mdi:account',
        description:
          'Heavily illustrated CSS deep dives on layout, container queries, and debugging real-world interfaces.',
        tags: [
          'css',
          'design',
          'blog',
          'free',
          'advanced',
          'tutorial',
        ],
      },
      {
        title: 'Bramus Van Damme',
        href: 'https://www.bram.us/',
        icon: 'mdi:account',
        description:
          'CSS and web platform writing from a Chrome developer relations engineer, covering new specs as they ship.',
        tags: [
          'css',
          'blog',
          'free',
          'platform',
          'modern',
          'advanced',
        ],
      },
      {
        title: 'Jim Nielsen',
        href: 'https://blog.jim-nielsen.com/',
        icon: 'mdi:account',
        description:
          'Frequent short essays on web craft, design, browsers, and the culture of building for the web.',
        tags: [
          'design',
          'blog',
          'free',
          'advanced',
          'career-focused',
        ],
      },
      {
        title: 'Simon Willison',
        href: 'https://simonwillison.net/',
        icon: 'mdi:robot-outline',
        description:
          'Prolific notes on large language models, AI tooling, and web development from the co-creator of Django.',
        tags: [
          'ai',
          'blog',
          'free',
          'advanced',
          'trending',
          'open-source',
        ],
      },
      {
        title: 'Adrian Roselli',
        href: 'https://adrianroselli.com/',
        icon: 'mdi:human-wheelchair',
        description:
          'Accessibility consultant writing tested, detailed guidance on ARIA, semantics, and inclusive interface patterns.',
        tags: [
          'accessibility',
          'html',
          'blog',
          'free',
          'advanced',
          'tutorial',
        ],
      },
      {
        title: 'Piccalilli',
        href: 'https://piccalil.li/blog/',
        icon: 'mdi:book-open-variant',
        description:
          "Front-end education from Andy Bell's studio, covering CSS, accessibility, HTML, and design systems.",
        tags: [
          'css',
          'accessibility',
          'design',
          'blog',
          'free',
          'tutorial',
        ],
      },
      {
        title: 'TkDodo',
        href: 'https://tkdodo.eu/blog',
        icon: 'simple-icons:react',
        description:
          'React and TypeScript deep dives from a TanStack Query maintainer, focused on data fetching and state.',
        tags: [
          'react',
          'typescript',
          'blog',
          'free',
          'advanced',
          'tutorial',
        ],
      },
      {
        title: 'Anthony Fu',
        href: 'https://antfu.me/',
        icon: 'simple-icons:vuedotjs',
        description:
          'Open source tooling notes from a Vue, Vite, and Nuxt core team member and the creator of UnoCSS.',
        tags: [
          'vue',
          'javascript',
          'blog',
          'free',
          'open-source',
          'tool',
          'advanced',
        ],
      },
      {
        title: 'Alex Russell',
        href: 'https://infrequently.org/',
        icon: 'mdi:speedometer',
        description:
          'Long-form critique of browsers, standards, and web performance budgets from a browser engineer.',
        tags: [
          'performance',
          'blog',
          'free',
          'advanced',
          'platform',
        ],
      },
      {
        title: 'Manuel Matuzovic',
        href: 'https://www.matuzo.at/blog/',
        icon: 'mdi:language-html5',
        description:
          'HTML, CSS, and accessibility writing, including deep dives on semantics and everyday markup mistakes.',
        tags: [
          'html',
          'css',
          'accessibility',
          'blog',
          'free',
          'tutorial',
        ],
      },
      {
        title: 'Latent Space',
        href: 'https://www.latent.space/',
        icon: 'mdi:podcast',
        description:
          "swyx's newsletter and podcast on AI engineering — inference economics, agent architecture, and the tooling layer.",
        tags: [
          'blog',
          'newsletter',
          'free',
          'ai',
          'agent',
          'advanced',
          'modern',
        ],
      },
      {
        title: 'Anthropic Engineering',
        href: 'https://www.anthropic.com/engineering',
        icon: 'simple-icons:anthropic',
        description:
          "Anthropic's engineering write-ups on agent design, context management, and running Claude in production.",
        tags: [
          'blog',
          'free',
          'ai',
          'agent',
          'advanced',
          'modern',
        ],
      },
      {
        title: 'OpenAI News',
        href: 'https://openai.com/news/',
        icon: 'simple-icons:openai',
        description:
          'Model launches, API changes, and research notes from OpenAI.',
        tags: [
          'blog',
          'free',
          'ai',
          'modern',
        ],
      },
      {
        title: 'Google DeepMind Blog',
        href: 'https://deepmind.google/blog/',
        icon: 'simple-icons:google',
        description:
          'Model releases and research announcements from DeepMind, usually published alongside the paper and evaluations behind them.',
        tags: [
          'blog',
          'free',
          'ai',
          'advanced',
          'modern',
        ],
      },
      {
        title: 'The Batch',
        href: 'https://www.deeplearning.ai/the-batch',
        icon: 'mdi:newspaper-variant-outline',
        description:
          "Andrew Ng's weekly letter on where the field is heading, followed by the research and product news it draws on.",
        tags: [
          'newsletter',
          'free',
          'ai',
          'weekly',
          'beginner-friendly',
        ],
      },
      {
        title: 'Lilian Weng',
        href: 'https://lilianweng.github.io/',
        icon: 'mdi:book-open-variant',
        description:
          "Lil'Log — long-form explainers on agents, hallucination, reward hacking, and diffusion, each written as a survey with citations.",
        tags: [
          'blog',
          'free',
          'ai',
          'agent',
          'advanced',
        ],
      },
      {
        title: 'Ahead of AI',
        href: 'https://magazine.sebastianraschka.com/',
        icon: 'mdi:brain',
        description:
          "Sebastian Raschka's deep dives into LLM architecture and training, written for people who read the papers.",
        tags: [
          'newsletter',
          'free',
          'paid',
          'ai',
          'advanced',
        ],
      },
      {
        title: 'Import AI',
        href: 'https://importai.substack.com/',
        icon: 'mdi:email-newsletter',
        description:
          "Jack Clark's weekly read on AI research and policy, pairing each paper with what it implies.",
        tags: [
          'newsletter',
          'free',
          'ai',
          'weekly',
          'advanced',
        ],
      },
      {
        title: 'Interconnects',
        href: 'https://www.interconnects.ai/',
        icon: 'mdi:vector-link',
        description:
          'Nathan Lambert on open models, post-training, and RLHF, with detail rarely published outside a lab.',
        tags: [
          'newsletter',
          'blog',
          'free',
          'paid',
          'ai',
          'advanced',
        ],
      },
      {
        title: 'TLDR AI',
        href: 'https://tldr.tech/ai',
        icon: 'mdi:email-fast-outline',
        description:
          'Daily five-minute digest of AI research, product launches, and engineering posts.',
        tags: [
          'newsletter',
          'free',
          'ai',
          'daily',
        ],
      },
      {
        title: 'Hugging Face Blog',
        href: 'https://huggingface.co/blog',
        icon: 'simple-icons:huggingface',
        description:
          'Posts from the open-model ecosystem — releases, fine-tuning recipes, and inference benchmarks.',
        tags: [
          'blog',
          'free',
          'ai',
          'open-source',
          'advanced',
        ],
      },
      {
        title: 'This Week in React',
        href: 'https://thisweekinreact.com/',
        icon: 'simple-icons:react',
        description:
          'Weekly roundup of React, React Native, and the surrounding ecosystem, curated by Sébastien Lorber.',
        tags: [
          'newsletter',
          'free',
          'react',
          'weekly',
          'javascript',
        ],
      },
      {
        title: 'Master.dev Blog',
        href: 'https://blog.master.dev/',
        icon: 'mdi:school-outline',
        description:
          'Writing from the Master.dev instructors on the web platform, framework releases, and AI-assisted development.',
        tags: [
          'blog',
          'free',
          'javascript',
          'ai',
          'tutorial',
        ],
      },
      {
        title: 'Stefan Judis',
        href: 'https://www.stefanjudis.com/',
        icon: 'mdi:account',
        description:
          'Web platform notes and the Web Weekly newsletter, both heavy on small browser details worth knowing.',
        tags: [
          'blog',
          'newsletter',
          'free',
          'css',
          'javascript',
          'weekly',
        ],
      },
      {
        title: 'Nolan Lawson',
        href: 'https://nolanlawson.com/',
        icon: 'mdi:account',
        description:
          'Performance and web component writing grounded in benchmarks the author ran himself.',
        tags: [
          'blog',
          'free',
          'performance',
          'javascript',
          'advanced',
        ],
      },
      {
        title: 'Cassidy Williams',
        href: 'https://cassidoo.co/',
        icon: 'mdi:account',
        description:
          'Rendezvous with Cassidoo — a weekly newsletter pairing an interview question with links and industry commentary.',
        tags: [
          'blog',
          'newsletter',
          'free',
          'weekly',
          'career-focused',
          'javascript',
        ],
      },
      {
        title: 'TypeScript Blog',
        href: 'https://devblogs.microsoft.com/typescript/',
        icon: 'simple-icons:typescript',
        description:
          'Release notes and design rationale for every TypeScript version, straight from the language team.',
        tags: [
          'blog',
          'free',
          'typescript',
          'documentation',
          'advanced',
        ],
      },
      {
        title: 'Next.js Blog',
        href: 'https://nextjs.org/blog',
        icon: 'simple-icons:nextdotjs',
        description:
          'Release posts and migration guides for Next.js, including the reasoning behind each new default.',
        tags: [
          'blog',
          'free',
          'react',
          'documentation',
          'modern',
        ],
      },
      {
        title: 'Astro Blog',
        href: 'https://astro.build/blog/',
        icon: 'simple-icons:astro',
        description:
          'Release notes and case studies for Astro, with detail on content collections and island architecture.',
        tags: [
          'blog',
          'free',
          'documentation',
          'performance',
          'modern',
        ],
      },
      {
        title: 'The Pragmatic Engineer',
        href: 'https://newsletter.pragmaticengineer.com/',
        icon: 'mdi:email-newsletter',
        description:
          'Gergely Orosz on how engineering organisations actually run, reported from inside the companies in question.',
        tags: [
          'newsletter',
          'free',
          'paid',
          'career-focused',
          'weekly',
          'advanced',
        ],
      },
      {
        title: 'ByteByteGo',
        href: 'https://blog.bytebytego.com/',
        icon: 'mdi:sitemap-outline',
        description:
          'System design explained in diagrams, working up from single components to the architectures behind large services.',
        tags: [
          'newsletter',
          'blog',
          'free',
          'paid',
          'system-design',
          'advanced',
        ],
      },
      {
        title: 'Console.dev',
        href: 'https://console.dev/',
        icon: 'mdi:toolbox-outline',
        description:
          'Weekly pick of developer tools worth a look, each with a short note on what it is and who it suits.',
        tags: [
          'newsletter',
          'free',
          'tool',
          'weekly',
          'modern',
        ],
      },
      {
        title: 'The Changelog',
        href: 'https://changelog.com/',
        icon: 'mdi:podcast',
        description:
          'Podcast network covering open source and the people maintaining it, with long-form interviews weekly.',
        tags: [
          'blog',
          'free',
          'open-source',
          'weekly',
          'career-focused',
        ],
      },
      {
        title: 'ShopTalk Show',
        href: 'https://shoptalkshow.com/',
        icon: 'mdi:microphone-outline',
        description:
          'Chris Coyier and Dave Rupert on front-end work, taking listener questions about the messy parts of the job.',
        tags: [
          'blog',
          'free',
          'css',
          'javascript',
          'weekly',
          'career-focused',
        ],
      },
      {
        title: 'Hamel Husain',
        href: 'https://hamel.dev/',
        icon: 'mdi:account',
        description:
          'Writing on LLM evaluation and fine-tuning that argues, with data, for measuring before optimizing.',
        tags: [
          'blog',
          'free',
          'ai',
          'advanced',
          'modern',
        ],
      },
      {
        title: 'Chip Huyen',
        href: 'https://huyenchip.com/',
        icon: 'mdi:account',
        description:
          'Essays on AI engineering and production ML systems, from the author of Designing Machine Learning Systems.',
        tags: [
          'blog',
          'free',
          'ai',
          'system-design',
          'advanced',
        ],
      },
      {
        title: 'Eugene Yan',
        href: 'https://eugeneyan.com/',
        icon: 'mdi:account',
        description:
          'Applied ML and recommender system write-ups grounded in what shipped and what it cost.',
        tags: [
          'blog',
          'free',
          'ai',
          'advanced',
          'system-design',
        ],
      },
      {
        title: 'Node.js Blog',
        href: 'https://nodejs.org/en/blog',
        icon: 'simple-icons:nodedotjs',
        description:
          'Release announcements and security advisories for Node, including what each LTS line changes.',
        tags: [
          'blog',
          'free',
          'nodejs',
          'javascript',
          'documentation',
        ],
      },
      {
        title: 'Deno Blog',
        href: 'https://deno.com/blog',
        icon: 'simple-icons:deno',
        description:
          'Release notes and deep dives from the Deno team on the runtime, JSR, and TypeScript tooling.',
        tags: [
          'blog',
          'free',
          'typescript',
          'javascript',
          'documentation',
          'modern',
        ],
      },
      {
        title: 'Tailwind CSS Blog',
        href: 'https://tailwindcss.com/blog',
        icon: 'simple-icons:tailwindcss',
        description:
          'Release posts and technique write-ups from the Tailwind team, usually with the reasoning behind each change.',
        tags: [
          'blog',
          'free',
          'css',
          'design',
          'documentation',
          'modern',
        ],
      },
      {
        title: 'Vue.js Blog',
        href: 'https://blog.vuejs.org/',
        icon: 'simple-icons:vuedotjs',
        description:
          'Official Vue announcements — releases, RFC outcomes, and ecosystem direction from the core team.',
        tags: [
          'blog',
          'free',
          'vue',
          'javascript',
          'documentation',
        ],
      },
    ],
  },
] satisfies Section[];

// Derived rather than hand-listed: every consumer that needs the canonical
// section order reads this, so adding a section cannot leave a copy behind.
export const SECTION_TITLES = SECTIONS.map((section) => section.title);

// Every resource, each carrying the section it came from. Flattened once at
// module load: SECTIONS is static, and rebuilding this list inside a search
// meant allocating an object per resource on every keystroke.
export const ALL_RESOURCES: Resource[] = SECTIONS.flatMap((section) =>
  section.links.map((link) => ({ ...link, section: section.title }))
);

// The tags a visitor can filter on. Derived, so a tag added to a resource is
// filterable the moment it lands rather than when someone remembers to add it
// to a second list.
export const ALL_TAGS: string[] = [
  ...new Set(ALL_RESOURCES.flatMap((resource) => resource.tags ?? [])),
].sort();

/**
 * The section served at `/<slug>`. Throws rather than returning undefined so a
 * route naming a section that no longer exists fails the build instead of
 * rendering an empty grid.
 */
export function sectionBySlug(slug: string): Section {
  const section = SECTIONS.find((s) => s.href === `/${slug}`);
  if (!section) {
    throw new Error(`No section at "/${slug}" in SECTIONS`);
  }
  return section;
}
