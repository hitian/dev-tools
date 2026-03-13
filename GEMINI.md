# GEMINI.md - Dev Tools Project

## Project Overview
This is a Nuxt 4 (Vue 3) application providing a suite of web-based developer utilities (Time conversion, Base64, JSON formatting, Password generation, QR code generation).

## Technology Stack
- **Framework:** Nuxt 4 (`ssr: false`)
- **UI Library:** [Vuestic UI](https://vuestic.dev/)
- **State Management:** Simple reactive properties (Vue Options API)
- **Utilities:** `moment-timezone`, `js-base64`, `vue-json-pretty`
- **Styling:** CSS + Tailwind CSS (available but sparingly used)

## Key Files & Directories
- `pages/index.vue`: Main layout with tab-based navigation for tools.
- `components/`: Contains individual tool implementations.
- `plugins/vuestic.ts`: Vuestic UI initialization.
- `nuxt.config.ts`: Nuxt configuration (SSR disabled).

## Development Mandates
- **UI Consistency:** Use **Vuestic UI** components (`VaCard`, `VaButton`, `VaInput`, etc.) for all new features to maintain visual consistency.
- **Modularity:** Each new tool should be implemented as a separate Vue component in the `components/` directory and integrated into `pages/index.vue` via the tab system.
- **Client-Side Only:** Since `ssr: false` is set, rely on browser APIs (like `localStorage`, `navigator.clipboard`) where necessary, but always ensure safety checks are in place.
- **Styling:** Prefer Vuestic's built-in utility classes and grid system. Use Tailwind CSS for minor adjustments if needed.
- **Component Pattern:** Existing components use the **Options API**. When creating new components, you may use the **Composition API** (`<script setup>`) as it is the Nuxt 4/Vue 3 standard, but ensure consistency if modifying existing components.

## Common Tasks
- **Adding a new tool:**
    1. Create `components/NewTool.vue`.
    2. Add the new tool to the `activeTab` list and `tabKeys` in `pages/index.vue`.
    3. Update the template in `pages/index.vue` to include the new component.
- **Updating Vuestic configuration:** Modify `plugins/vuestic.ts`.
