# Copilot Instructions for Carbon Credit Trading Platform

## Architecture Overview
This is a React-based single-page application for trading carbon credits on the blockchain. It uses Vite for building, TypeScript for type safety, and Supabase for backend services (currently unused in code).

- **Routing**: Client-side routing with React Router DOM. All routes defined in `App.tsx`.
- **Styling**: Tailwind CSS for utility classes, Radix UI Themes for component theming.
- **Forms**: React Hook Form with Zod validation schemas (e.g., `ProjectForm.tsx`).
- **Data Visualization**: Recharts for charts (e.g., bar/pie charts in `Dashboard.tsx`).
- **State Management**: Local component state; no global state library yet.
- **Icons**: Lucide React icons throughout components.
- **Notifications**: React Toastify for user feedback.

## Key Components
- `src/pages/`: Page components with Header/Footer included.
- `src/components/`: Reusable UI components (e.g., `WalletStats.tsx` for displaying MATIC balance and credit stats).
- Forms use Zod schemas for validation (e.g., `projectSchema` in `ProjectForm.tsx`).

## Developer Workflows
- **Development**: `npm run dev` starts Vite dev server with hot reload.
- **Build**: `npm run build` compiles TypeScript and bundles with Vite.
- **Linting**: `npm run lint` runs ESLint on TypeScript/TSX files.
- **Preview**: `npm run preview` serves the built app locally.
- No automated tests configured; manual testing via dev server.

## Conventions
- **TypeScript**: Strict mode enabled, but `noImplicitAny`, `noUnusedLocals`, `noUnusedParameters` disabled for flexibility.
- **ESLint**: `@typescript-eslint/no-explicit-any` turned off to allow `any` types.
- **Component Structure**: Functional components with hooks; props typed with interfaces.
- **File Naming**: PascalCase for components (e.g., `ProjectForm.tsx`), camelCase for utilities.
- **Imports**: Absolute imports from `src/` (e.g., `import Header from '../components/Header'`).
- **Data Mocking**: Hardcoded data in components (e.g., `portfolioData` in `Dashboard.tsx`); prepare for Supabase integration.
- **Blockchain Integration**: References MATIC (Polygon) in `WalletStats.tsx`; future wallet connections expected.

## Integration Points
- **Supabase**: Dependency added but not yet implemented; expect database queries for projects/credits.
- **Blockchain**: MATIC balance display; potential future Web3 integrations.
- **External APIs**: None currently; add fetch calls for real data.

Focus on adding Supabase client initialization and API calls when implementing backend features. Use Zod for API response validation.</content>
<filePath">c:\Users\Lenovo\Desktop\project\.github\copilot-instructions.md