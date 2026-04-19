# SkillPath API

NestJS monorepo with two applications: **API** (HTTP server) and **Worker** (background jobs).

## Project structure

```
apps/
  skillpath-api/   # HTTP API
  worker/          # Background job processor
libs/
  core/            # Shared database, config, entities
  shared/          # Shared utilities and types
```

## Installation

```bash
pnpm install
```

## Development

```bash
# Run API
pnpm start:dev:api

# Run Worker
pnpm start:dev:worker

# Run both (default app)
pnpm start:dev
```

## Build

```bash
# Build API
pnpm build:api

# Build Worker
pnpm build:worker

# Build all
pnpm build
```

## Production

```bash
# Start API
node dist/apps/api/main

# Start Worker
node dist/apps/worker/main
```

Alternatively using the npm scripts:

```bash
pnpm start:prod:api
pnpm start:prod:worker
```

## Tests

```bash
# Unit tests
pnpm test

# Watch mode
pnpm test:watch

# Coverage
pnpm test:cov

# E2E tests
pnpm test:e2e

# Debug
pnpm test:debug
```

## Database migrations

```bash
# Run pending migrations
pnpm migration:run

# Generate a new migration
pnpm migration:generate

# Revert last migration
pnpm migration:revert
```

## Lint & format

```bash
pnpm lint
pnpm format
```
