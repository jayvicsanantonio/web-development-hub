// The curated resource dataset: five sections, each holding the links the site
// renders. `satisfies` checks every entry's shape without widening the array.
import type { Resource, Section } from '@/lib/types';

export const SECTIONS = [
  {
    title: 'Learning Resources',
    href: '/learning-resources',
    description:
      'Start or advance your web development journey with these educational resources',
    links: [
      {
        title: 'Master.dev',
        href: 'https://master.dev/',
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
        href: 'https://docs.claude.com/',
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
        href: 'https://developers.openai.com/codex/cli',
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
    description:
      'Essential tools to streamline your development workflow',
    links: [
      {
        title: 'Visual Studio Code',
        href: 'https://code.visualstudio.com/',
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
        description:
          'High-quality stock photography platform with free images for commercial and personal web projects.',
        tags: ['design', 'free', 'platform', 'beginner-friendly'],
      },
      {
        title: 'Turso',
        href: 'https://turso.tech/',
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
        description:
          'Visual Studio Code extension for managing static site content with support for Hugo, Jekyll, and modern frameworks.',
        tags: ['cms', 'free', 'tool', 'open-source'],
      },
      {
        title: 'Adobe Express',
        href: 'https://www.adobe.com/express/',
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
        description:
          'AI pair programmer that helps write code faster with less effort, available in popular IDEs and editors.',
        tags: ['ai', 'paid', 'tool', 'trending', 'modern'],
      },
      {
        title: 'Cursor',
        href: 'https://cursor.com/',
        description:
          'AI-first code editor built on VS Code with advanced AI capabilities for code generation and editing.',
        tags: ['ai', 'free', 'paid', 'tool', 'trending', 'modern'],
      },
      {
        title: 'Figma AI',
        href: 'https://www.figma.com/ai',
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
        description:
          'Fully managed service for building and scaling generative AI applications with foundation models.',
        tags: ['ai', 'paid', 'platform', 'advanced', 'modern'],
      },
      {
        title: 'Google AI Studio',
        href: 'https://aistudio.google.com/',
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
        description:
          'Git repository management solution with built-in CI/CD and Jira integration for software teams.',
        tags: ['platform', 'free', 'paid', 'deployment', 'community'],
      },
      {
        title: 'CodeSandbox',
        href: 'https://codesandbox.io/',
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
        description:
          'Payment processing platform for internet businesses with APIs for online payments and subscriptions.',
        tags: ['platform', 'paid', 'api', 'advanced', 'trending'],
      },
      {
        title: 'Datadog',
        href: 'https://www.datadoghq.com/',
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
    description:
      'Powerful frameworks and libraries to build modern web applications',
    links: [
      {
        title: 'React',
        href: 'https://react.dev/',
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
        href: 'https://developers.openai.com/codex/sdk',
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
    description:
      'Connect with fellow developers in these vibrant communities',
    links: [
      {
        title: 'Dev.to',
        href: 'https://dev.to/',
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
        description:
          'Computing-focused community with high-quality technical discussions and a strong focus on programming.',
        tags: ['community', 'free', 'advanced', 'trending'],
      },
      {
        title: 'Product Hunt',
        href: 'https://www.producthunt.com/',
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
    description:
      'Stay updated with insights from industry experts and thought leaders',
    links: [
      {
        title: 'Josh W Comeau',
        href: 'https://www.joshwcomeau.com/',
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
        description:
          'Mozilla developer sharing JavaScript tips, web development tutorials, and modern browser features.',
        tags: ['javascript', 'blog', 'free', 'tutorial', 'advanced'],
      },
      {
        title: 'Sara Soueidan',
        href: 'https://www.sarasoueidan.com/blog/',
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
        description:
          'Weekly React and React Native newsletter covering releases, tutorials, and notable ecosystem projects.',
        tags: ['react', 'newsletter', 'free', 'weekly', 'modern'],
      },
      {
        title: 'Node Weekly',
        href: 'https://nodeweekly.com/',
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
 * The section a page renders. Throws rather than returning undefined so a page
 * naming a section that no longer exists fails the build instead of rendering
 * an empty grid.
 */
export function sectionByTitle(title: string): Section {
  const section = SECTIONS.find((s) => s.title === title);
  if (!section) {
    throw new Error(`No section titled "${title}" in SECTIONS`);
  }
  return section;
}
