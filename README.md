# ponsRALPH

**The Autonomous Multi-Channel AI Development Agent**

ponsRALPH combines the powerful multi-channel messaging infrastructure of **Pons** with the autonomous iterative development loop of **Ralph** to create a unified platform for AI-driven software development accessible from anywhere.

[![CI](https://github.com/ponsralph/ponsralph/actions/workflows/ci.yml/badge.svg)](https://github.com/ponsralph/ponsralph/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-22+-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue.svg)](https://www.typescriptlang.org/)

## Overview

ponsRALPH is a local-first, multi-channel AI development assistant that:

- **Receives development requests** from multiple messaging platforms (Telegram, Discord, Signal, and more)
- **Executes autonomous coding loops** using the Ralph pattern - fresh context per iteration, persistent memory through git and progress logs
- **Maintains quality gates** with automatic testing, type checking, and browser verification
- **Tracks progress** across iterations with structured PRDs, user stories, and learnings
- **Supports multiple AI models** (Claude, GPT-4, Ollama) with configurable providers
- **Provides a web dashboard** for real-time monitoring and control

## Key Features

### Multi-Channel Infrastructure

- **Messaging Channels**: Telegram (grammY), Discord (discord.js), Signal (signal-cli)
- **WebSocket Gateway**: Central control plane managing all connections, sessions, and events
- **Browser Automation**: Chrome/Chromium control via Playwright/CDP for web interactions
- **Vector Memory**: Semantic search with sqlite-vec for intelligent context retrieval
- **35+ Skill Tools**: Extensible ecosystem covering filesystem, git, shell, HTTP, and GitHub

### Autonomous Development Loop

- **Fresh Context Windows**: Each iteration spawns a new AI instance - no context carryover
- **PRD-Driven Development**: Structured Product Requirements Documents converted to actionable user stories
- **Quality Gating**: Tests and type checks must pass before commits
- **Progress Tracking**: Append-only learnings log and structured JSON task tracking
- **Pattern Consolidation**: AGENTS.md files preserve discovered conventions
- **Browser Verification**: UI changes verified visually via Playwright
- **Automatic Git Integration**: Commits, branches, and PR preparation

### Web Dashboard

- **Real-time Monitoring**: Live stats, connections, and message counts
- **Session Management**: View and manage active sessions
- **Loop Progress**: Visual progress tracking with story status
- **Configuration Editor**: Modify settings through the UI

### Production Ready

- **Docker Support**: Multi-stage Dockerfile and docker-compose configuration
- **CI/CD Pipeline**: GitHub Actions for testing, building, and releases
- **Monitoring**: Metrics collection, health checks, and alerting
- **377+ Tests**: Comprehensive test coverage with Vitest

## Architecture

```
┌────────────────────────────────────────────────────────────────────┐
│                     MESSAGING CHANNELS                              │
│          Telegram │ Discord │ Signal │ (more coming)               │
└─────────────────────────────┬──────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────┐
│                        ponsRALPH GATEWAY                           │
│                                                                     │
│  • WebSocket Server (Hono + ws)    • Session Management             │
│  • Event Bus & Routing             • Token Auth & RBAC              │
│  • Health Checks & Metrics         • Rate Limiting                  │
└───────────────────────────────┬─────────────────────────────────────┘
                                │
          ┌─────────────────────┼─────────────────────┐
          │                     │                     │
          ▼                     ▼                     ▼
   ┌─────────────┐       ┌─────────────┐       ┌─────────────┐
   │ RALPH LOOP  │       │  BROWSER    │       │   MEMORY    │
   │   ENGINE    │       │   SYSTEM    │       │   SYSTEM    │
   │             │       │             │       │             │
   │ • PRD Parse │       │ • Playwright│       │ • sqlite-vec│
   │ • Stories   │       │ • CDP       │       │ • Embeddings│
   │ • QA Gates  │       │ • Verify UI │       │ • FTS5      │
   │ • Git Ops   │       │ • Screenshots│      │ • Indexing  │
   └─────────────┘       └─────────────┘       └─────────────┘
          │                     │                     │
          └─────────────────────┼─────────────────────┘
                                │
                                ▼
                 ┌────────────────────────┐
                 │     AI PROVIDERS       │
                 │                        │
                 │  Anthropic (Claude)    │
                 │  OpenAI (GPT-4)        │
                 │  Ollama (Local)        │
                 └────────────────────────┘
```

## Quick Start

### Installation

```bash
# Clone the repository
git clone https://github.com/ponsralph/ponsralph.git
cd ponsRALPH

# Install dependencies
npm install

# Build
npm run build

# Run CLI
npm start -- --help
```

### Start the Gateway

```bash
# Start the gateway server
npm start -- gateway

# In another terminal, check status
npm start -- status
```

### Start the Web Dashboard

```bash
# Install dashboard dependencies
cd web && npm install && cd ..

# Start dashboard dev server
npm start -- dashboard dev

# Open http://localhost:3000
```

### Docker Deployment

```bash
# Build and start with Docker Compose
docker-compose up -d

# View logs
docker-compose logs -f gateway
```

## CLI Commands

```bash
# Gateway Commands
ponsralph gateway              # Start the gateway server
ponsralph gateway status       # Check gateway status
ponsralph gateway token        # Generate auth token

# Session Commands
ponsralph sessions list        # List active sessions
ponsralph sessions delete <id> # Delete a session

# Channel Commands
ponsralph channels list        # Show all channels
ponsralph channels status      # Show channel status
ponsralph channels setup       # Interactive setup wizard
ponsralph channels connect <c> # Connect a channel
ponsralph channels disconnect  # Disconnect a channel
ponsralph channels test <c>    # Test channel connection

# Agent Commands
ponsralph agent chat           # Interactive chat session
ponsralph agent complete <p>   # One-shot completion
ponsralph agent providers      # List provider status
ponsralph agent models         # List available models
ponsralph agent tools          # List available tools

# Loop Commands
ponsralph loop start <prd>     # Start a development loop
ponsralph loop status          # Show loop status
ponsralph loop stop            # Stop the current loop
ponsralph loop pause           # Pause the loop
ponsralph loop resume          # Resume a paused loop

# PRD Commands
ponsralph prd create           # Create a new PRD interactively
ponsralph prd convert <file>   # Convert markdown to PRD JSON
ponsralph prd show <file>      # Display PRD contents
ponsralph prd validate <file>  # Validate PRD structure
ponsralph prd list             # List PRDs in workspace

# Browser Commands
ponsralph browser open <url>   # Open URL in browser
ponsralph browser screenshot   # Capture screenshot
ponsralph browser verify       # Run UI verification
ponsralph browser status       # Browser manager status
ponsralph browser devserver    # Dev server management

# Memory Commands
ponsralph memory status        # Show memory system status
ponsralph memory search <q>    # Search indexed content
ponsralph memory index <path>  # Index files or directories
ponsralph memory clear         # Clear memory database

# Skills Commands
ponsralph skills list          # List available skills
ponsralph skills enable <id>   # Enable a skill
ponsralph skills disable <id>  # Disable a skill
ponsralph skills tools         # List all skill tools
ponsralph skills run <tool>    # Execute a skill tool

# Dashboard Commands
ponsralph dashboard dev        # Start dashboard dev server
ponsralph dashboard build      # Build for production
ponsralph dashboard status     # Check dashboard status

# Configuration Commands
ponsralph config show          # Show current config
ponsralph config edit          # Open config in editor
ponsralph config reset         # Reset to defaults

# Other Commands
ponsralph status               # Show system status
ponsralph version              # Show version info
ponsralph --help               # Show help
```

## Directory Structure

```
ponsRALPH/
├── src/
│   ├── entry.ts              # CLI entry point
│   ├── index.ts              # Main exports
│   │
│   ├── ai/                   # AI Provider & Agent System
│   │   ├── types.ts          # AI type definitions & Zod schemas
│   │   ├── anthropic.ts      # Claude API provider
│   │   ├── openai.ts         # OpenAI/GPT provider
│   │   ├── ollama.ts         # Local model provider
│   │   ├── tools.ts          # Tool registry & default tools
│   │   └── agent.ts          # Agent runtime & conversation
│   │
│   ├── gateway/              # WebSocket Gateway Server
│   │   ├── server.ts         # Hono + ws WebSocket server
│   │   ├── session.ts        # Session management & persistence
│   │   ├── events.ts         # EventBus for internal routing
│   │   ├── auth.ts           # Token auth & RBAC
│   │   ├── protocol.ts       # Protocol helpers
│   │   └── types.ts          # Gateway type definitions
│   │
│   ├── channels/             # Messaging Channels
│   │   ├── types.ts          # Channel abstractions
│   │   ├── telegram.ts       # Telegram via grammY
│   │   ├── discord.ts        # Discord via discord.js
│   │   ├── signal.ts         # Signal via signal-cli
│   │   └── manager.ts        # Channel orchestration
│   │
│   ├── ralph/                # Ralph Loop Engine
│   │   ├── types.ts          # PRD, UserStory, LoopState schemas
│   │   ├── prd.ts            # PRD parsing & validation
│   │   ├── stories.ts        # Story selection & dependencies
│   │   ├── progress.ts       # Progress tracking & AGENTS.md
│   │   ├── quality.ts        # Quality gates (tests, typecheck)
│   │   ├── git.ts            # Git integration & commits
│   │   └── loop.ts           # LoopEngine orchestration
│   │
│   ├── browser/              # Browser Automation
│   │   ├── types.ts          # Browser config & action schemas
│   │   ├── manager.ts        # Playwright lifecycle management
│   │   ├── cdp.ts            # Chrome DevTools Protocol
│   │   ├── page.ts           # PageController for interactions
│   │   ├── verify.ts         # UIVerifier & assertions
│   │   ├── tools.ts          # 11 browser tools for agent
│   │   └── devserver.ts      # Dev server auto-detection
│   │
│   ├── memory/               # Memory System
│   │   ├── types.ts          # MemoryStore, EmbeddingProvider schemas
│   │   ├── database.ts       # SQLiteMemoryStore with sqlite-vec
│   │   ├── embeddings.ts     # OpenAI, Ollama, Local providers
│   │   ├── search.ts         # Hybrid search (FTS5 + vector)
│   │   └── indexer.ts        # Batch indexer & file watcher
│   │
│   ├── skills/               # Skill Ecosystem
│   │   ├── types.ts          # Skill, SkillManifest, BaseSkill
│   │   ├── registry.ts       # SkillRegistry & sandboxing
│   │   ├── core/             # Core skills (fs, git, shell, http)
│   │   └── integrations/     # Integration skills (github)
│   │
│   ├── monitoring/           # Production Monitoring
│   │   ├── types.ts          # Metric & health check types
│   │   ├── metrics.ts        # MetricsRegistry (counters, gauges)
│   │   └── health.ts         # HealthCheckManager & alerts
│   │
│   ├── cli/                  # CLI Commands
│   │   ├── program.ts        # Commander.js program builder
│   │   ├── shutdown.ts       # Graceful shutdown handling
│   │   └── commands/         # All CLI command implementations
│   │
│   ├── config/               # Configuration System
│   ├── logging/              # Logging System
│   ├── types/                # Shared Type Definitions
│   ├── utils/                # Utility Functions
│   └── test/                 # Test Utilities
│
├── web/                      # Web Dashboard (React + Vite)
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── pages/            # Dashboard, Sessions, Loops, Settings
│   │   ├── hooks/            # useGateway WebSocket hook
│   │   └── types.ts          # Frontend type definitions
│   ├── package.json
│   └── vite.config.ts
│
├── .github/
│   └── workflows/
│       ├── ci.yml            # CI pipeline (test, build, docker)
│       └── release.yml       # Release automation
│
├── Dockerfile                # Multi-stage production build
├── docker-compose.yml        # Full stack deployment
├── package.json
├── tsconfig.json
├── vitest.config.ts
└── tasks.md                  # Implementation plan
```

## Implementation Status

| Module | Status | Description |
|--------|--------|-------------|
| `src/ai/` | ✅ Complete | AI providers (Anthropic, OpenAI, Ollama), agent runtime, tools |
| `src/gateway/` | ✅ Complete | WebSocket server, sessions, events, auth, rate limiting |
| `src/channels/` | ✅ Complete | Telegram, Discord, Signal channels with routing |
| `src/cli/` | ✅ Complete | All CLI commands (15+ command groups) |
| `src/config/` | ✅ Complete | JSON5 config, validation, file watcher |
| `src/logging/` | ✅ Complete | Structured logging with console & file transports |
| `src/ralph/` | ✅ Complete | Loop engine, PRD support, quality gates, git integration |
| `src/browser/` | ✅ Complete | Playwright automation, CDP, UI verification, 11 tools |
| `src/memory/` | ✅ Complete | sqlite-vec + FTS5 hybrid search, embeddings, indexing |
| `src/skills/` | ✅ Complete | 5 core skills with 35+ tools, registry, sandboxing |
| `src/monitoring/` | ✅ Complete | Metrics collection, health checks, alerting |
| `web/` | ✅ Complete | React dashboard with real-time WebSocket updates |

## Configuration

Configuration is stored in `~/.ponsralph/config.json` (JSON5 format):

```json5
{
  // Gateway settings
  gateway: {
    port: 18789,
    bind: "127.0.0.1",
    enableAuth: true
  },

  // AI Model configuration
  anthropic: {
    apiKey: "${ANTHROPIC_API_KEY}",
    defaultModel: "claude-sonnet-4-20250514"
  },
  openai: {
    apiKey: "${OPENAI_API_KEY}",
    defaultModel: "gpt-4-turbo"
  },
  ollama: {
    baseUrl: "http://localhost:11434",
    defaultModel: "llama3.2"
  },

  // Messaging channels
  telegram: {
    token: "${TELEGRAM_BOT_TOKEN}",
    allowlist: ["@username"]
  },
  discord: {
    token: "${DISCORD_BOT_TOKEN}",
    clientId: "your-client-id"
  },

  // Ralph loop settings
  ralph: {
    maxIterations: 10,
    autoCommit: true,
    autoPush: false,
    pauseOnFailure: true
  },

  // Logging
  logging: {
    level: "info",
    file: "~/.ponsralph/logs/ponsralph.log"
  }
}
```

## Environment Variables

```bash
# Required for AI providers
ANTHROPIC_API_KEY=sk-ant-...
OPENAI_API_KEY=sk-...

# Optional for messaging channels
TELEGRAM_BOT_TOKEN=123456:ABC...
DISCORD_BOT_TOKEN=...

# Optional for GitHub integration
GITHUB_TOKEN=ghp_...
```

## Technology Stack

### Core Runtime
- **TypeScript 5.7** with strict mode
- **Node.js 22+** (ESM modules)
- **npm** for package management

### Gateway & Communication
- **Hono** - HTTP server framework
- **ws** - WebSocket server
- **Commander.js** - CLI framework
- **Zod** - Schema validation

### Messaging
- **grammY** - Telegram Bot API
- **discord.js** - Discord Bot API
- **signal-cli** - Signal messenger

### AI & ML
- **@anthropic-ai/sdk** - Claude models
- **openai** - GPT models
- **Ollama REST API** - Local models
- **sqlite-vec** - Vector embeddings

### Browser Automation
- **Playwright** - Browser control
- **Chrome DevTools Protocol** - Direct CDP

### Web Dashboard
- **React 19** - UI framework
- **Vite** - Build tool
- **TailwindCSS** - Styling
- **Lucide React** - Icons

### Testing & DevOps
- **Vitest** - Testing framework (377+ tests)
- **Docker** - Containerization
- **GitHub Actions** - CI/CD

## Development

```bash
# Install dependencies
npm install

# Development mode (watch)
npm run dev

# Build
npm run build

# Run tests
npm test

# Type check
npm run typecheck

# Lint
npm run lint
```

## Docker

```bash
# Build image
docker build -t ponsralph .

# Run with docker-compose
docker-compose up -d

# Run with local Ollama
docker-compose --profile local-ai up -d

# View logs
docker-compose logs -f
```

## Security Considerations

- **Local-First**: All data stays on your devices by default
- **Sandbox Isolation**: Optional Docker sandbox for code execution
- **Allowlists**: Explicit control over who can trigger development
- **Token Auth**: Gateway authentication with role-based access
- **Rate Limiting**: Built-in rate limiting per client
- **Quality Gates**: Prevents committing broken code

## Comparison

| Feature | Pons | Ralph | ponsRALPH |
|---------|----------|-------|------------|
| Multi-channel messaging | ✅ | ❌ | ✅ |
| Autonomous coding loop | ❌ | ✅ | ✅ |
| Fresh context per iteration | ❌ | ✅ | ✅ |
| PRD-driven development | ❌ | ✅ | ✅ |
| Quality gates | Partial | ✅ | ✅ |
| Browser verification | ✅ | ✅ | ✅ |
| Vector memory | ✅ | ❌ | ✅ |
| Web dashboard | ❌ | ❌ | ✅ |
| Docker support | ❌ | ❌ | ✅ |
| CI/CD pipeline | ❌ | ❌ | ✅ |

## License

MIT License - See [LICENSE](LICENSE) for details.

## Credits

ponsRALPH builds upon:
- **Pons** - Multi-channel AI assistant infrastructure
- **Ralph** - Autonomous AI coding loop pattern by Geoffrey Huntley
- **Pi Agent** - Agent runtime concepts

## Contributing

Contributions are welcome! Please read the contributing guidelines before submitting PRs.

1. Fork the repository
2. Create a feature branch
3. Make your changes with tests
4. Run `npm test` and `npm run typecheck`
5. Submit a pull request

## Support

- Issues: [GitHub Issues](https://github.com/ponsralph/ponsralph/issues)
- Discussions: [GitHub Discussions](https://github.com/ponsralph/ponsralph/discussions)
