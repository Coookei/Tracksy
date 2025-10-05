# Tracksy ☑

![MIT License](https://img.shields.io/badge/license-MIT-green)
![Next.js](https://img.shields.io/badge/Next.js-15.3.2-000000?logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-19.0.0-61DAFB?logo=react&logoColor=white)
![Live](https://img.shields.io/badge/demo-online-brightgreen)

A modern, authenticated issue tracker built with Next.js, featuring a secure API, pre-commit hooks, Markdown editing, and a clean UI with filtering, sorting, and graphs.

### 🔗 [Live Demo](https://tracksy.tomfox.tech)
> Note: Google OAuth login is disabled in the demo.
## Table of Contents 📑

- [Features](#features-)
- [Screenshots](#screenshots-)
- [Built With](#built-with-)
- [Setup](#setup-%EF%B8%8F)
- [Configure Theme](#configure-theme-)
- [Available Scripts](#available-scripts-)
- [Pre-commit Hooks](#pre-commit-hooks-)
- [API Endpoints](#api-endpoints-)
- [Deployment](#deployment-%E2%80%8D)
- [Contributing](#contributing-)
- [License](#license-)

## Features ✨

- 📊 Dashboard featuring all issue statuses, presented visually and graphically, and a list of latest issues at a glance.
- ⏳ Dynamic skeleton loading for an improved user experience.
- 📝 Markdown editor makes it easy to create detailed issue descriptions.
- 🔐 Google authentication keeps create/edit/delete actions behind a login.
- 🔍 Filter issues by status, sort by name/status/creation date, and paginate the issue list without losing context.
- 🗒️ Detailed view for each issue to display additional information, and hides authenticated-only actions.
- 🤝 Assign issues to teammates and get instant feedback via toast notifications.
- 🔌 REST API powers create, update, delete, and listing operations.

## Screenshots 📸

![Dashboard Screenshot](public/screenshots/dashboard.png)
_View issue statuses visually and graphically on the dashboard, and see latest issues._

![Issue List Screenshot](public/screenshots/issue-list.png)
_Filter issues by status, sort by name/status/creation date, and paginate the issue list without losing context._

![Issue Details Screenshot](public/screenshots/issue-details.png)
_An issues details page with a description and authenticated controls to edit, update assignee, or delete._

![New Issue Screenshot](public/screenshots/new-issue.png)
_Create a new issue with a markdown editor on a protected page._

## Built With 📦

- [**Next.js**](https://nextjs.org/): React framework for building full-stack web apps with the App Router.
- [**React**](https://react.dev/): A JavaScript library for building user interfaces.
- [**TypeScript**](https://www.typescriptlang.org/): Typed superset of JavaScript for safer code.
- [**Prisma**](https://www.prisma.io/): ORM that manages the MySQL schema and queries.
- [**MySQL**](https://www.mysql.com/): Relational database storing issues and users.
- [**NextAuth.js**](https://authjs.dev/): Authentication toolkit that handles Google OAuth.
- [**Radix Themes**](https://www.radix-ui.com/themes): Accessible component primitives powering the layout.
- [**Tailwind CSS**](https://tailwindcss.com/): Utility-first styling layered over Radix components.
- [**React Query**](https://tanstack.com/query/latest): Client-side data fetching and caching.
- [**React Hot Toast**](https://react-hot-toast.com/): Inline feedback for updates and assignments.
- [**React MD Editor**](https://github.com/uiwjs/react-md-editor): Markdown editor used in the issue form.
- [**React Markdown**](https://github.com/remarkjs/react-markdown): Renderer for issue descriptions.
- [**Recharts**](https://recharts.org/): Charts used on the dashboard.
- [**React Icons**](https://react-icons.github.io/react-icons/): A library of popular icons for React applications.
- [**React Loading Skeleton**](https://github.com/dvtng/react-loading-skeleton): Lightweight skeleton placeholders to improve perceived loading performance.
- [**Zod**](https://zod.dev/): Type-safe schema validation for forms and APIs.
- [**React Hook Form**](https://react-hook-form.com/): Performant form state management with minimal re-renders.
- [**Axios**](https://axios-http.com/): A promise-based HTTP client for making API requests.
- [**Husky**](https://typicode.github.io/husky/#/): Git hooks manager for automated pre-commit checks.

## Setup 🛠️

Follow these steps to set up the project locally:

### Prerequisites

- Node.js 20+ (LTS recommended)
- [pnpm](https://pnpm.io/) 10+
- Access to a MySQL 8 database
- Google OAuth credentials (Client ID & Secret)

### 1. Clone the repository

```bash
git clone https://github.com/Coookei/Tracksy.git
cd Tracksy
```

### 2. Install dependencies

If you do not have pnpm installed yet, follow the [pnpm installation guide](https://pnpm.io/installation).

```bash
pnpm install
```

> `pnpm` runs `prisma generate` automatically after install via the `postinstall` hook.

### 3. Configure secrets and environment

- Create OAuth credentials in the [Google Cloud Console](https://console.cloud.google.com/apis/dashboard) and copy the Client ID and Client Secret.
- Generate a NextAuth secret:

  ```bash
  openssl rand -base64 32
  ```

- Create a `.env` file in the project root:

  ```env
  DATABASE_URL="mysql://USER:PASSWORD@localhost:3306/tracksy"
  NEXTAUTH_URL="http://localhost:3000"
  NEXTAUTH_SECRET="long_random_secret"
  GOOGLE_CLIENT_ID="your_google_oauth_client_id"
  GOOGLE_CLIENT_SECRET="your_google_oauth_client_secret"
  ```

### 4. Apply database migrations

For local development (creates the database and tables if needed):

```bash
pnpm dlx prisma migrate dev
```

For production deployments, apply existing migrations without creating new ones:

```bash
pnpm dlx prisma migrate deploy
```

### 5. Start the development server

```bash
pnpm dev
```

Visit `http://localhost:3000` and sign in with a Google account to begin tracking issues.

## Configure Theme 🎨
You can change the theme accent color in `app/layout.tsx`:
```tsx
<Theme accentColor="cyan">
  ...
</Theme>
```
This theme will then be respected in the UI throughout the app.

## Available Scripts 📋

#### Development

- `pnpm dev` - start the Next.js development server with Turbopack.
- `pnpm build` - create an optimized production build.
- `pnpm start` - serve the production build locally.

#### Quality

- `pnpm lint` - run ESLint across the repo.
- `pnpm lint:fix` - attempt to automatically fix lint issues.
- `pnpm format` - check Prettier formatting without writing changes.
- `pnpm format:fix` - apply Prettier formatting across the codebase.
- `pnpm check` - convenience script that runs linting and formatting checks together.

## Pre-commit Hooks 🔁

- Husky installs Git hooks automatically after `pnpm install`.
- The `pre-commit` hook runs `pnpm lint-staged` so only staged files are linted and formatted.
- Files are formatted with Prettier first and then JavaScript and TypeScript files go through ESLint formatting.
- If the hook fails, the commit is aborted. Click view command output to see which file caused the issue, then manually apply the required formatting changes before committing again.

## API Endpoints 🔌

- `POST /api/issues` – create an issue.
- `PATCH /api/issues/:id` – update an existing issue.
- `DELETE /api/issues/:id` – delete an issue.
- `GET /api/users` – list users for the assignment picker.

## Deployment 🧑‍💻

- You can deploy on [Vercel](https://vercel.com/) and connect your GitHub repository.
- In the Vercel UI, set the build command to `prisma generate && prisma migrate deploy && next build` so Prisma runs before the Next.js build.
- Add all required environment variables in the Vercel dashboard, including `NEXTAUTH_URL` set to your production domain.
- Update the [Google Cloud Console](https://console.cloud.google.com/apis/dashboard) OAuth redirect URIs to match the Vercel domain.

## Contributing 🤝

Contributions, suggestions, and feedback are welcome!  
Feel free to fork the repo and submit a pull request.

1. Fork the project
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

## License 📜

This project is licensed under the MIT License.

<sub>With credit to <a href="https://www.youtube.com/c/programmingwithmosh">Mosh</a>.</sub>
