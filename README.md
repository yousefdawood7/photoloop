<p align="center">
  <img src="./apps/web/public/photoloop-brand.png" alt="Photoloop Logo" style="border-radius: 12px;"  width="100" height="100"  />
</p>

<h1 align="center">Photoloop</h1>

<p align="center">
  A modern, full-stack photo sharing platform built with a Turborepo monorepo architecture.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/NestJS-11-E0234E?logo=nestjs" alt="NestJS" />
  <img src="https://img.shields.io/badge/TypeScript-6.0-3178C6?logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/PostgreSQL-DB-4169E1?logo=postgresql" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Turborepo-Monorepo-EF4444?logo=turborepo" alt="Turborepo" />
  <img src="https://img.shields.io/badge/pnpm-11-F69220?logo=pnpm" alt="pnpm" />
</p>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Architecture](#-architecture)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Available Scripts](#-available-scripts)
- [Authentication](#-authentication)
- [Database](#-database)
- [Shared Packages](#-shared-packages)

---

## 🔭 Overview

**Photoloop** is a full-stack photo sharing platform featuring a modern authentication system with multiple sign-in methods, email verification, and two-factor authentication. The project is organized as a **Turborepo monorepo**, separating the frontend, backend, and shared packages for scalability and code reuse.

---

## 🏛️ Architecture

Photoloop follows a **decoupled frontend/backend architecture** with a shared component library:

```
┌─────────────────────────────────────────────────────────┐
│                      Turborepo                          │
│                                                         │
│  ┌──────────────┐   ┌──────────────┐                    │
│  │   apps/web   │   │   apps/api   │                    │
│  │  (Next.js)   │──▶│  (NestJS)    │                   │
│  │  Port: 3000  │   │  Port: 3001  │                    │
│  └──────┬───────┘   └──────┬───────┘                    │
│         │                  │                            │
│         ▼                  ▼                            │
│  ┌──────────────────────────────────┐                   │
│  │        packages/ui              │                    │
│  │  (Shared Component Library)     │                    │
│  └─────────────────────────────────┘                    │
│                                                         │
│  ┌────────────────┐  ┌─────────────────────┐            │
│  │ eslint-config  │  │ typescript-config   │            │
│  └────────────────┘  └─────────────────────┘            │
│                                                         │
│                    ┌──────────────┐                      │
│                    │  PostgreSQL  │                      │
│                    └──────────────┘                      │
└─────────────────────────────────────────────────────────┘
```

The **Next.js frontend** proxies authentication requests to the **NestJS backend** via URL rewrites (`/api/auth/*` → `localhost:3001/api/auth/*`), keeping the API decoupled while providing a seamless experience.

---

## 🛠️ Tech Stack

### Frontend (`apps/web`)

| Technology                                          | Purpose                                                          |
| --------------------------------------------------- | ---------------------------------------------------------------- |
| **[Next.js](https://nextjs.org/)**               | React framework with App Router, typed routes & view transitions |
| **[React](https://react.dev/)**                  | UI library                                                       |
| **[Tailwind V4](https://tailwindcss.com/)**      | Utility-first CSS framework                                      |
| **[Better Auth](https://www.better-auth.com/)**     | Client-side auth (React hooks, magic link, Google One Tap, 2FA)  |
| **[React Hook Form](https://react-hook-form.com/)** | Performant form management                                       |
| **[Zod](https://zod.dev/)**                       | Schema validation & form resolver                                |
| **[@t3-oss/env-nextjs](https://env.t3.gg/)**        | Type-safe environment variables                                  |
| **[Geist & Inter](https://vercel.com/font)**        | Typography (Google Fonts)                                        |

### Backend (`apps/api`)

| Technology                                      | Purpose                                     |
| ----------------------------------------------- | ------------------------------------------- |
| **[NestJS 11](https://nestjs.com/)**            | Scalable Node.js server framework           |
| **[Better Auth](https://www.better-auth.com/)** | Server-side authentication engine           |
| **[Drizzle ORM](https://orm.drizzle.team/)**    | Type-safe SQL ORM                           |
| **[PostgreSQL](https://www.postgresql.org/)**   | Relational database                         |
| **[Resend](https://resend.com/)**               | Transactional email service                 |
| **[React Email](https://react.email/)**         | Email templates built with React components |
| **[@t3-oss/env-core](https://env.t3.gg/)**      | Type-safe environment variables             |
| **[Zod](https://zod.dev/)**                   | Runtime schema validation                   |

### Shared Packages

| Package                       | Purpose                                                                               |
| ----------------------------- | ------------------------------------------------------------------------------------- |
| **`@repo/ui`**                | Shared component library (shadcn/ui, Radix UI, Lucide icons, Three.js, Sonner toasts) |
| **`@repo/eslint-config`**     | Shared ESLint configuration                                                           |
| **`@repo/typescript-config`** | Shared TypeScript configuration                                                       |

### DevOps & Tooling

| Tool                                                          | Purpose                                |
| ------------------------------------------------------------- | -------------------------------------- |
| **[Turborepo](https://turbo.build/)**                         | Monorepo build orchestration & caching |
| **[pnpm](https://pnpm.io/)**                               | Fast, disk-efficient package manager   |
| **[TypeScript 6](https://www.typescriptlang.org/)**           | Type safety across the entire codebase |
| **[ESLint](https://eslint.org/)**                          | Linting with shared config             |
| **[Prettier](https://prettier.io/)**                          | Code formatting                        |
| **[Drizzle Kit](https://orm.drizzle.team/kit-docs/overview)** | Database migration tooling             |
| **[Jest](https://jestjs.io/)**                                | Testing framework (API)                |

---

## 📁 Project Structure

```
photoloop/
├── apps/
│   ├── web/                          # Next.js 16 frontend
│   │   ├── public/                   # Static assets
│   │   └── src/
│   │       ├── app/                  # App Router pages
│   │       │   ├── (auth)/           # Auth route group
│   │       │   │   ├── login/        # Login page
│   │       │   │   └── register/     # Registration page
│   │       │   ├── layout.tsx        # Root layout (ThemeProvider, Toaster)
│   │       │   └── page.tsx          # Home page
│   │       ├── features/
│   │       │   └── auth/             # Auth feature module
│   │       │       ├── components/   # Auth UI components
│   │       │       ├── hooks/        # Auth custom hooks
│   │       │       └── types.ts      # Auth type definitions
│   │       └── lib/
│   │           ├── auth-client.ts    # Better Auth client config
│   │           ├── env.ts            # Type-safe env variables
│   │           └── schemas.ts        # Zod validation schemas
│   │
│   └── api/                          # NestJS 11 backend
│       ├── drizzle/                  # Database migrations
│       ├── docs/                     # API documentation
│       └── src/
│           ├── common/
│           │   ├── db/schemas/       # Drizzle ORM schemas
│           │   ├── emails/           # React Email templates
│           │   └── utils/            # Shared utilities (env, keys)
│           ├── config/               # NestJS config module
│           ├── app.module.ts         # Root module (auth, email, DB)
│           └── main.ts              # Application entry point
│
├── packages/
│   ├── ui/                           # Shared component library
│   │   └── src/
│   │       ├── components/
│   │       │   ├── ui/               # UI primitives (Button, Input, Field, etc.)
│   │       │   ├── icons/            # Icon components
│   │       │   └── themes/           # Theme provider
│   │       ├── lib/                  # Utility functions
│   │       └── styles/               # Global CSS
│   ├── eslint-config/                # Shared ESLint rules
│   └── typescript-config/            # Shared TS config
│
├── turbo.json                        # Turborepo pipeline config
├── pnpm-workspace.yaml               # pnpm workspace definition
└── package.json                      # Root scripts & dev dependencies
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **pnpm** 11.1.3+ (`corepack enable && corepack prepare pnpm@11.1.3 --activate`)
- **PostgreSQL** instance (local or hosted)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yousefdawood7/photoloop.git
   cd photoloop
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   Copy the example environment files and fill in your credentials (see [Environment Variables](#-environment-variables) below):

   ```bash
   # Backend
   cp apps/api/.env.example apps/api/.env

   # Frontend
   cp apps/web/.env.example apps/web/.env
   ```

4. **Set up the database**

   ```bash
   cd apps/api
   pnpm drizzle-kit push
   ```

5. **Start the development servers**

   From the root of the monorepo:

   ```bash
   pnpm dev
   ```

   This starts both apps concurrently:
   - **Web** → [http://localhost:3000](http://localhost:3000)
   - **API** → [http://localhost:3001](http://localhost:3001)

---

## 🔐 Environment Variables

### Backend (`apps/api/.env`)

| Variable                 | Description                    | Example                                           |
| ------------------------ | ------------------------------ | ------------------------------------------------- |
| `DATABASE_URL`           | PostgreSQL connection string   | `postgresql://user:pass@localhost:5432/photoloop` |
| `PORT`                   | API server port                | `3001`                                            |
| `APP_STAGE`              | Application stage              | `dev` or `prod`                                   |
| `FRONTEND_URL`           | Frontend origin URL            | `http://localhost:3000`                           |
| `BETTER_AUTH_URL`        | Better Auth base URL           | `http://localhost:3001`                           |
| `BETTER_AUTH_SECRET`     | Auth secret key (32–128 chars) | `your-secret-key-here`                            |
| `RESEND_API_KEY`         | Resend email API key           | `re_xxxxxxxxxx`                                   |
| `GOOGLE_CLIENT_ID`       | Google OAuth client ID         | `xxxx.apps.googleusercontent.com`                 |
| `GOOGLE_CLIENT_SECRET`   | Google OAuth client secret     | `GOCSPX-xxxxxxxxxx`                               |
| `GITHUB_CLIENT_ID`       | GitHub OAuth client ID         | `Iv1.xxxxxxxxxx`                                  |
| `GITHUB_CLIENT_SECRET`   | GitHub OAuth client secret     | `xxxxxxxxxx`                                      |
| `FACEBOOK_CLIENT_ID`     | Facebook OAuth app ID          | `xxxxxxxxxx`                                      |
| `FACEBOOK_CLIENT_SECRET` | Facebook OAuth app secret      | `xxxxxxxxxx`                                      |

### Frontend (`apps/web/.env`)

| Variable                       | Description                          | Example                           |
| ------------------------------ | ------------------------------------ | --------------------------------- |
| `NEXT_PUBLIC_APP_URL`          | Public app URL                       | `http://localhost:3000`           |
| `NEXT_PUBLIC_BETTER_AUTH_URL`  | Public Better Auth URL               | `http://localhost:3000`           |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | Google OAuth client ID (for One Tap) | `xxxx.apps.googleusercontent.com` |

---

## 📜 Available Scripts

### Root (Monorepo)

| Command            | Description                                            |
| ------------------ | ------------------------------------------------------ |
| `pnpm dev`         | Start all apps in development mode                     |
| `pnpm build`       | Build all apps and packages                            |
| `pnpm lint`        | Lint all apps and packages                             |
| `pnpm format`      | Format all TypeScript and Markdown files with Prettier |
| `pnpm check-types` | Run type checking across the monorepo                  |

### Web (`apps/web`)

| Command      | Description                           |
| ------------ | ------------------------------------- |
| `pnpm dev`   | Start Next.js dev server on port 3000 |
| `pnpm build` | Create production build               |
| `pnpm start` | Start production server               |
| `pnpm lint`  | Lint with zero warnings threshold     |

### API (`apps/api`)

| Command            | Description                    |
| ------------------ | ------------------------------ |
| `pnpm dev`         | Start NestJS in watch mode     |
| `pnpm build`       | Compile the NestJS application |
| `pnpm start:prod`  | Run compiled production build  |
| `pnpm start:debug` | Start with debugger attached   |
| `pnpm test`        | Run unit tests with Jest       |
| `pnpm test:cov`    | Run tests with coverage report |
| `pnpm test:e2e`    | Run end-to-end tests           |

---

## 🔑 Authentication

Photoloop uses **[Better Auth](https://www.better-auth.com/)** for a comprehensive authentication system:

### Supported Methods

- ✉️ **Email & Password** — with email verification (OTP via Resend)
- 🔗 **Magic Link** — passwordless email login
- 🟢 **Google** — OAuth + One Tap sign-in
- 🐙 **GitHub** — OAuth sign-in
- 📘 **Facebook** — OAuth sign-in
- 🔒 **Two-Factor Authentication (2FA)** — additional security layer

### Auth Flow

1. Frontend sends requests to `/api/auth/*` routes
2. Next.js rewrites proxy these to the NestJS backend (`localhost:3001/api/auth/*`)
3. NestJS processes auth via Better Auth with Drizzle adapter
4. Email verification is handled via Resend with React Email templates

---

## 🗄️ Database

- **ORM**: [Drizzle ORM](https://orm.drizzle.team/) with PostgreSQL dialect
- **Migrations**: Managed via Drizzle Kit (`apps/api/drizzle/`)
- **Schema**: Defined in `apps/api/src/common/db/schemas/`

### Common Commands

```bash
cd apps/api

# Generate a migration from schema changes
pnpm drizzle-kit generate

# Push schema directly to the database
pnpm drizzle-kit push

# Open Drizzle Studio (database GUI)
pnpm drizzle-kit studio
```

---

## 📦 Shared Packages

### `@repo/ui`

A shared component library consumed by both `apps/web` and `apps/api` (for email templates). Built with:

- **[shadcn/ui](https://ui.shadcn.com/)** — Accessible UI primitives
- **[Tailwind CSS 4](https://tailwindcss.com/)** — Styling
- **[Lucide React](https://lucide.dev/)** — Icon library
- **[Sonner](https://sonner.emilkowal.dev/)** — Toast notifications

### `@repo/eslint-config`

Shared ESLint configuration for consistent code style across all packages.

### `@repo/typescript-config`

Shared TypeScript `tsconfig` base configurations for apps and packages.

---

<p align="center">
  Built with ❤️ by <a href="https://yousefdawood.me" target="_blank">Yousef Dawood</a>
</p>
