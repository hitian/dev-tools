# AGENTS.md

This file gives agents clear guidance for working in this repository.

Scope: the entire repository (`/`). If a more specific `AGENTS.md` appears in a subfolder, that file takes precedence for files in its tree.

## Project Overview

- Stack: Nuxt 3 + Vue 3 (Single File Components), Vuestic UI (`Va*` components), npm.
- Structure:
  - `pages/index.vue` hosts a tabbed toolbox UI. Each tab renders a component from `components/`.
  - `components/` contains feature tools (e.g., `Time.vue`, `Base64.vue`, `Json.vue`, `Url.vue`, `PasswordGenerator.vue`).
  - Build artifacts: `.nuxt/`, `.output/` — do not edit.

## Run and Build

- Dev: `npm run dev`
- Build: `npm run build`
- Preview: `npm run preview` (if configured) or serve `.output/` as per Nuxt defaults.

Network access can be restricted in the agent harness; avoid adding dependencies unless approved by the user.

## Coding Conventions

- Use Vue SFCs with the Options API to match the existing code style (i.e., `export default { data(), computed, methods }`). Do not convert to `<script setup>` without explicit instruction.
- Prefer Vuestic UI components: `VaCard`, `VaCardTitle`, `VaCardContent`, `VaInput`, `VaButton`, `VaCheckbox`, `VaSelect`, `VaAlert`, etc.
- Keep UI consistent with existing spacing utility classes such as `my-ml-10`, `my-mt-10`, and inline widths where already used in the repo. Avoid global CSS changes.
- Keep new components self-contained. Avoid global store or plugin changes unless necessary and requested.
- Do not introduce new build tools, linters, or formatters without approval. Follow existing formatting patterns.
- Use descriptive component names in PascalCase (e.g., `PasswordGenerator.vue`).
- Keep changes minimal and focused on the requested task. Do not refactor unrelated files.

## Adding a New Tool (Component) to Tabs

1. Create a new Vue SFC in `components/`.
2. Update `pages/index.vue`:
   - Add a new `<VaTab>` label to the `#tabs` slot.
   - Render your component within the content area with a new `activeTab` index (`v-if="activeTab === N"`).
   - Import the component at the top and, if using `components: {}`, ensure it is registered or rely on Nuxt auto-imports (explicit imports are acceptable and consistent with the current codebase).

## UX and Behavior Guidelines

- Wrap features in `VaCard` with `VaCardTitle` and `VaCardContent` like existing tools.
- Provide clear labels and placeholders for inputs. Prefer `readonly` where appropriate.
- For operations that can fail, show a `VaAlert color="danger"` with a short, actionable message.
- Provide copy-to-clipboard convenience buttons using `navigator.clipboard.writeText` when output is useful to copy.
- Keep components responsive and simple; avoid heavy client-side libraries without approval.

## State, Validation, and Data Flow

- Manage state locally within each component unless a shared state is explicitly required.
- Validate user input before actions. Show validation errors via `VaAlert`.
- Keep reactivity straightforward; computed properties for derived state, methods for actions.

## Security & Privacy

- Do not send data to external services. This app runs fully client-side and offline.
- Avoid introducing new dependencies for crypto/security without explicit approval.
- When generating sensitive outputs (e.g., passwords), do not log values to the console.

## Agent Workflow (Codex CLI)

- Planning: For multi-step or ambiguous tasks, use the plan tool to outline steps and update status as you progress.
- Preambles: Before grouped commands, send a brief preamble describing the next action.
- Editing files: Use the `apply_patch` tool to add/update files. Do not run destructive commands unless explicitly requested by the user.
- Validation: If the project runs locally, you may propose running `npm run dev` or `npm run build` to validate, but only run such commands when appropriate for the current approval mode.
- Do not add or modify licenses/copyright headers unless asked.

## Don’ts

- Don’t refactor unrelated modules or rename files unless required for the task.
- Don’t add large third-party libraries or change the build configuration without user approval.
- Don’t commit or create branches from the agent unless the user asks.

## Troubleshooting Tips

- If a new tab doesn’t render, verify the `activeTab` index and that the `<VaTab>` count matches. Check that the component file name and import path are correct.
- If styles look off, follow existing patterns for spacing classes and inline widths seen in other components.
- If clipboard copy fails, ensure the action is triggered by a user gesture (button click) and that the page is served via a secure context if necessary.

## File Ownership

This `AGENTS.md` governs the repository root. More specific `AGENTS.md` files placed in subdirectories may override guidance for files within their scope.
