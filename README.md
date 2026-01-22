# Frontend Technical Assessment – Workflows

This project is a frontend technical assessment built with **React**, **TypeScript**, **Vite**, and **Tailwind CSS**, following the provided Figma design and integrating mock data via an **AirOps workflow**.

The goal of this exercise is to demonstrate code quality, UI accuracy, and clear architectural decisions within a limited time frame (~3 hours).

---

## 🧰 Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- TanStack Query (server state management)
- Radix UI (accessible primitives)
- shadcn/ui (composed UI components)
- date-fns (date formatting utilities)
- AirOps Client SDK (mock data source)

No global state management libraries were introduced intentionally.

---

## 📐 Design

The UI was implemented based on the provided Figma design, focusing on:
- visual accuracy,
- responsive layout behavior,
- reusable and composable UI components.

Minor deviations may exist where design details were ambiguous or where trade-offs were made due to time constraints.

---

## 📊 Data Source (AirOps)

Workflow data is fetched from an AirOps workflow that returns mock workflow records.

- Data fetching is encapsulated in a dedicated hook.
- Create / edit / delete actions are handled **locally in React state**, as persistence was not required by the exercise.

---

## 🧠 State Management Approach

The solution intentionally separates **server state** from **UI state**.

### Server State
- Remote workflows fetched from AirOps.
- Managed inside a dedicated hook.
- Handles loading, error, and refetch logic.

### UI State
- Search query
- Sorting option
- Edit / delete modal state
- Draft workflow data

UI state is managed via `useReducer` at the feature level in order to:
- centralize UI logic,
- make user actions explicit,
- avoid scattered `useState` calls and state duplication.

This approach keeps the solution lightweight while remaining scalable and easy to reason about.

---

## 🗂 Project Structure

```txt
src/
  api/                    # AirOps API client
  features/
    workflows/            # Workflows feature
      components/         # Workflow-specific UI components
      hooks/              # Workflow-specific hooks
      state/              # UI state (reducers/selectors)
      types/              # Workflow domain types
      utils/              # Workflow utilities
      WorkflowsPage.tsx   # Feature entry point
  shared/
    components/           # Reusable, domain-agnostic UI components
    hooks/                # Shared hooks
    utils/                # Shared utilities
  App.tsx
```

## 🚀 Getting Started

```bash
npm install
npm run dev
```
The application will be available at http://localhost:5173
