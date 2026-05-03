```
skillpath-api/                          ← repositorio backend (independiente del frontend)
├── apps/
│   ├── skillpath-api/                  ← proceso HTTP (NestJS REST API)
│   │   ├── src/
│   │   │   ├── modules/
│   │   │   │   ├── auth/               ← JWT, refresh tokens, JwtAuthGuard
│   │   │   │   ├── tenant/             ← OrganizationModule, TenantGuard
│   │   │   │   ├── content/            ← upload a S3, SourceDocumentModule
│   │   │   │   ├── courses/            ← CourseModule, ModuleModule, QuizModule
│   │   │   │   ├── enrollment/         ← EnrollmentModule, QuizAttemptModule
│   │   │   │   ├── analytics/          ← queries de progreso para dashboard
│   │   │   │   └── billing/            ← Stripe webhooks, SubscriptionModule
│   │   │   ├── app.module.ts
│   │   │   └── main.ts
│   │   └── tsconfig.app.json
│   │
│   └── worker/                         ← proceso de jobs (BullMQ consumers)
│       ├── src/
│       │   ├── processors/
│       │   │   ├── document.processor.ts   ← extracción texto, chunking, embeddings
│       │   │   ├── course.processor.ts     ← generación de módulos y quizzes con OpenAI
│       │   │   └── email.processor.ts      ← notificaciones (curso listo, invitaciones)
│       │   ├── worker.module.ts
│       │   └── main.ts                     ← NestJS standalone app (sin HTTP)
│       └── tsconfig.app.json
│
├── libs/
│   ├── shared/                         ← contratos de dominio: lo que ambas apps conocen
│   │   └── src/
│   │       ├── entities/               ← TypeORM entities (fuente de verdad única)
│   │       ├── queues/                 ← nombres de queues y tipos de payload de jobs
│   │       ├── events/                 ← interfaces de eventos internos (EventEmitter2)
│   │       └── dtos/                   ← DTOs y tipos de respuesta del API
│   │
│   └── core/                           ← infraestructura técnica reutilizable
│       └── src/
│           ├── database/               ← TypeORM config, DataSource, BaseRepository
│           ├── redis/                  ← RedisModule compartido (BullMQ + cache)
│           ├── config/                 ← ConfigModule con validación Zod de env vars
│           └── interceptors/           ← TenantInterceptor, LoggingInterceptor
│
├── migrations/                         ← migraciones TypeORM (proceso independiente)
│
├── Dockerfile.api                      ← imagen del proceso API
├── Dockerfile.worker                   ← imagen del proceso worker
├── docker-compose.yml                  ← stack local completo
├── docker-compose.prod.yml
├── pnpm-workspace.yaml                 ← configuración de workspaces pnpm
├── nest-cli.json
├── package.json                        ← dependencias raíz del workspace
└── tsconfig.json
```
