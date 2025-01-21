# Page Builder

A Vue.js-based drag-and-drop page builder that allows users to create and customize web pages with text and image blocks.

## Features

- 🖼️ Image Block with gallery layout options
  - Multiple gallery layouts (default, spaceless)
  - Image selection from predefined gallery
  - Customizable spacing and background

- 📝 Rich Text Block with TipTap editor
  - Rich text formatting options
  - Support for lists and text styling
  - Real-time content updates

- 🎨 Style Customization
  - Adjustable top and bottom padding
  - Background color picker
  - Layout configuration for image blocks

- 🔄 Block Management
  - Drag-and-drop interface
  - Move blocks up/down
  - Duplicate blocks
  - Remove blocks

## Tech Stack

### Core
- [Vue 3](https://vuejs.org/) - Progressive JavaScript Framework
- [TypeScript](https://www.typescriptlang.org/) - JavaScript with syntax for types
- [Pinia](https://pinia.vuejs.org/) - State Management
- [TipTap](https://tiptap.dev/) - Headless Rich Text Editor

### UI & Styling
- [UnoCSS](https://github.com/unocss/unocss) - Instant On-demand Atomic CSS
- [Vue Draggable Plus](https://github.com/Alfred-Skyblue/vue-draggable-plus) - Drag & Drop library

### Development Tools
- [Vite](https://vitejs.dev/) - Next Generation Frontend Tooling
- [Vitest](https://vitest.dev/) - Unit Testing Framework
- [ESLint](https://eslint.org/) - Code Linting
- [@antfu/eslint-config](https://github.com/antfu/eslint-config) - Anthony's ESLint config

## Project Structure

```
page-builder/
├── src/
│   ├── assets/
│   │   ├── base.css
│   │   └── main.css
│   ├── components/
│   │   ├── blocks/
│   │   │   ├── ImageBlock.vue
│   │   │   └── TextBlock.vue
│   │   ├── __tests__/
│   │   │   ├── BlockWrapper.test.ts
│   │   │   ├── Canvas.test.ts
│   │   │   ├── Config.test.ts
│   │   │   ├── ImageBlock.test.ts
│   │   │   ├── ImageSelectModal.test.ts
│   │   │   ├── Sidebar.test.ts
│   │   │   └── TextBlock.test.ts
│   │   ├── BlockWrapper.vue
│   │   ├── Canvas.vue
│   │   ├── Config.vue
│   │   ├── ImageSelectModal.vue
│   │   ├── Sidebar.vue
│   │   └── Tiptap.vue
│   ├── composables/
│   │   └── useArrayManager.ts
│   ├── store/
│   │   └── blocks.ts
│   ├── App.vue
│   └── main.ts
├── public/
│   ├── favicon.ico
│   └── mailerlite-family-photos/
├── index.html
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
├── uno.config.ts
├── vite.config.js
├── vitest.config.ts
└── eslint.config.js
```

### Code Style

The project follows strict coding standards:

- ESLint with @antfu/eslint-config
- TypeScript for type safety
- Vue 3 Composition API with `<script setup>`
- Unit tests for components

### Testing with Vitest

1. **Running Tests in WebStorm**
- Use the built-in Vitest runner
- Right-click on `__tests__` folder → Run
- Or use the test navigator in the sidebar

2. **Test Commands**
   ```bash
   # Run all tests
   pnpm test

   # Run tests in watch mode
   pnpm test --watch

   # Run tests with coverage
   pnpm test --coverage

   # Run specific test file
   pnpm test src/components/__tests__/ImageBlock.test.ts
   ```

3. **Test Configuration**
- Tests are configured in `vitest.config.ts`
- Uses jsdom for DOM environment
- Includes path aliases (@/ points to src/)

### Prerequisites

1. **Development Environment**
  - WebStorm 2023.1 or later
  - Node.js v20 or higher
   ```bash
   node -v  # Check Node.js version
   ```
  - pnpm package manager
   ```bash
   npm install -g pnpm  # Install pnpm globally
   ```

2. **WebStorm Configuration**
  - Enable Vue.js support in WebStorm
  - Install recommended plugins:
    - Vue.js
    - TypeScript
    - ESLint
    - Vitest Runner

### Project Setup

1. **Clone and Install**
   ```bash
   # Clone the repository
   git clone [your-repository-url]
   cd [project-directory]

   # Install dependencies
   pnpm install
   ```

2. **WebStorm Configuration Steps**
  - Open the project in WebStorm
  - Allow WebStorm to configure TypeScript (automatic prompt)
  - Enable ESLint integration:
    - Settings → Languages & Frameworks → JavaScript → Code Quality Tools → ESLint
    - Select "Automatic ESLint configuration"

3. **Run Development Server**
   ```bash
   pnpm dev
   # Application will run at http://localhost:5173
   ```

## Acknowledgments

- [Vue.js](https://vuejs.org/) - The Progressive JavaScript Framework
- [TipTap](https://tiptap.dev/) - The headless editor framework for web artisans
- [UnoCSS](https://github.com/unocss/unocss) - The instant on-demand atomic CSS engine
- All other open-source contributors

---

Made with ❤️ by Gazoon007
