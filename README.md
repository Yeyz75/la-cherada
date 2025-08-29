# LaCherada - Base Project

LaCherada is a community web platform where people can lend, borrow, donate, sell objects, or offer services in a simple and secure way. This repository contains the base project with modular architecture, technical configuration, and initial landing page that will serve as the foundation for future development of the complete platform.

## 🚀 Quick Start

### Prerequisites

- Node.js (version 18 or higher)
- npm (comes with Node.js)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd lacherada-base-project
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 📁 Project Structure

```
/
├── src/
│   ├── assets/            # Images, fonts, static files
│   ├── components/        # Reusable components
│   │   ├── common/        # Base components (BaseButton, BaseModal, etc.)
│   │   └── ui/            # Specific UI components
│   ├── composables/       # Vue custom hooks
│   ├── i18n/             # Internationalization configuration
│   ├── layouts/          # Page layouts
│   ├── locales/          # Translation files
│   ├── modules/          # Features organized by domain
│   │   ├── auth/         # Authentication (prepared for future)
│   │   ├── items/        # Item management (prepared for future)
│   │   ├── users/        # User management (prepared for future)
│   │   └── shared/       # Shared logic between modules
│   ├── pages/            # Main pages
│   ├── router/           # Vue Router configuration
│   ├── services/         # External services (Firebase prepared)
│   ├── stores/           # Pinia stores
│   ├── styles/           # Global styles
│   ├── types/            # TypeScript interfaces and types
│   └── utils/            # Helper functions
├── dist/                 # Build output
├── node_modules/         # Dependencies
└── public/               # Public static assets
```

### Module Architecture

Each future module follows this structure:

```
/modules/[module-name]/
├── components/    # Module-specific components
├── composables/   # Module-specific logic
├── services/      # Domain services
├── stores/        # Module-specific store
├── types/         # Module-specific types
└── index.ts       # Module exports
```

## 🛠️ Technology Stack

- **Frontend Framework**: Vue 3 with Composition API and `<script setup>`
- **Language**: TypeScript with strict configuration
- **Build Tool**: Vite
- **Styling**: TailwindCSS with custom theme
- **UI Components**: PrimeVue
- **State Management**: Pinia
- **Routing**: Vue Router
- **Internationalization**: Vue I18n
- **Date Handling**: Day.js
- **Code Quality**: ESLint + Prettier
- **Type Checking**: TypeScript compiler

## 📝 Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run build           # Build for production
npm run preview         # Preview production build

# Code Quality
npm run lint            # Run ESLint and fix issues
npm run lint:check      # Check ESLint without fixing
npm run format          # Format code with Prettier
npm run format:check    # Check Prettier formatting
npm run type-check      # Run TypeScript type checking
npm run quality         # Run all quality checks (lint + format + type-check)
```

## 🎨 Base Components

The project includes a set of reusable base components:

### BaseButton
```vue
<BaseButton 
  variant="primary" 
  size="md" 
  :loading="false" 
  @click="handleClick"
>
  Click me
</BaseButton>
```

**Props:**
- `variant`: 'primary' | 'secondary' | 'outline' | 'ghost'
- `size`: 'sm' | 'md' | 'lg'
- `disabled`: boolean
- `loading`: boolean
- `type`: 'button' | 'submit' | 'reset'

### BaseInput
```vue
<BaseInput 
  v-model="inputValue"
  type="text"
  label="Email"
  placeholder="Enter your email"
  :error="errorMessage"
/>
```

**Props:**
- `modelValue`: string | number
- `type`: 'text' | 'email' | 'password' | 'number'
- `placeholder`: string
- `label`: string
- `error`: string
- `disabled`: boolean
- `required`: boolean

### BaseCard
```vue
<BaseCard 
  title="Card Title"
  subtitle="Card subtitle"
  shadow="md"
  padding="lg"
  hoverable
>
  <p>Card content goes here</p>
</BaseCard>
```

**Props:**
- `title`: string
- `subtitle`: string
- `shadow`: 'none' | 'sm' | 'md' | 'lg'
- `padding`: 'none' | 'sm' | 'md' | 'lg'
- `hoverable`: boolean

### BaseModal
```vue
<BaseModal 
  v-model="showModal"
  title="Modal Title"
  size="md"
  closable
  @close="handleClose"
>
  <p>Modal content</p>
</BaseModal>
```

**Props:**
- `modelValue`: boolean
- `title`: string
- `size`: 'sm' | 'md' | 'lg' | 'xl'
- `closable`: boolean
- `persistent`: boolean

### BaseLoader
```vue
<BaseLoader 
  size="md"
  variant="spinner"
  text="Loading..."
/>
```

**Props:**
- `size`: 'sm' | 'md' | 'lg'
- `variant`: 'spinner' | 'dots' | 'pulse'
- `text`: string

## 🏗️ Architecture Decisions

### Modular Architecture
The project follows a modular architecture where features are organized by domain. This approach provides:
- **Scalability**: Easy to add new features without affecting existing ones
- **Maintainability**: Clear separation of concerns
- **Reusability**: Shared components and utilities across modules
- **Team Collaboration**: Different teams can work on different modules

### TypeScript Configuration
- **Strict Mode**: Enabled for better type safety
- **Path Mapping**: `@/` alias points to `/src` directory
- **No Implicit Any**: Prevents use of `any` type
- **Strict Null Checks**: Ensures proper null/undefined handling

### State Management Strategy
- **Global State**: App-wide state (loading, errors, preferences) in `appStore`
- **Module State**: Feature-specific state in dedicated stores
- **Component State**: Local state using Vue's `ref` and `reactive`

### Error Handling
- **Global Error Store**: Centralized error management
- **Error Boundaries**: Composables for component-level error handling
- **Service Interceptors**: Automatic error handling for API calls
- **User Feedback**: Toast notifications for user-facing errors

## 🎯 Naming Conventions

### Files and Directories
- **Vue Components**: PascalCase (e.g., `BaseButton.vue`, `HomePage.vue`)
- **TypeScript Files**: camelCase (e.g., `userService.ts`, `authHelpers.ts`)
- **Directories**: kebab-case (e.g., `user-profile`, `item-management`)
- **Pages**: PascalCase with "Page" suffix (e.g., `HomePage.vue`, `ProfilePage.vue`)
- **Stores**: camelCase with "Store" suffix (e.g., `appStore.ts`, `authStore.ts`)

### Code Conventions
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_BASE_URL`, `MAX_FILE_SIZE`)
- **Variables**: camelCase (e.g., `userName`, `isLoading`)
- **Functions**: camelCase (e.g., `getUserData`, `handleSubmit`)
- **Interfaces**: PascalCase (e.g., `User`, `ApiResponse`)
- **Types**: PascalCase (e.g., `UserRole`, `LoadingState`)

### Component Conventions
- **Base Components**: Prefix with "Base" (e.g., `BaseButton`, `BaseInput`)
- **Layout Components**: Descriptive names (e.g., `MainLayout`, `Navbar`)
- **Page Components**: Suffix with "Page" (e.g., `HomePage`, `ProfilePage`)
- **Feature Components**: Domain-specific names (e.g., `UserCard`, `ItemList`)

## 🌍 Environment Variables

Create a `.env` file based on `.env.example`:

```env
# Application
VITE_APP_NAME=LaCherada
VITE_API_URL=http://localhost:3000

# Firebase (prepared for future)
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
```

## 🎨 Theming and Styling

### TailwindCSS Configuration
The project uses a custom TailwindCSS theme with LaCherada brand colors:

```javascript
// Brand Colors
colors: {
  lacherada: {
    green: '#10b981',
    blue: '#3b82f6', 
    orange: '#f59e0b'
  }
}
```

### PrimeVue Integration
PrimeVue components are configured and available globally:
- `PButton` - PrimeVue Button
- `PCard` - PrimeVue Card
- `PInputText` - PrimeVue Input Text

## 🔧 Adding New Modules

To add a new module to the project:

1. **Create Module Directory**:
```bash
mkdir src/modules/your-module
```

2. **Create Module Structure**:
```
src/modules/your-module/
├── components/
├── composables/
├── services/
├── stores/
├── types/
└── index.ts
```

3. **Define Module Types**:
```typescript
// src/modules/your-module/types/index.ts
export interface YourModuleData {
  id: string
  name: string
  // ... other properties
}
```

4. **Create Module Store**:
```typescript
// src/modules/your-module/stores/yourModuleStore.ts
import { defineStore } from 'pinia'
import type { YourModuleData } from '../types'

export const useYourModuleStore = defineStore('yourModule', () => {
  // Store implementation
})
```

5. **Export Module**:
```typescript
// src/modules/your-module/index.ts
export * from './components'
export * from './composables'
export * from './services'
export * from './stores'
export * from './types'
```

6. **Add Routes** (if needed):
```typescript
// src/router/modules/yourModule.ts
export const yourModuleRoutes = [
  {
    path: '/your-module',
    name: 'YourModule',
    component: () => import('@/modules/your-module/pages/YourModulePage.vue')
  }
]
```

## 🚀 Future Extensibility

The project is prepared for future features:

### Authentication Module
- Store structure ready in `authStore`
- User types defined in `types/api.ts`
- Protected routes structure prepared

### Item Management Module
- Module directory structure created
- CRUD operations prepared
- API integration ready

### User Profile Module
- User interface defined
- Profile management prepared
- Settings integration ready

### Firebase Integration
- Configuration structure ready
- Environment variables prepared
- Service layer abstraction in place

## 🧪 Testing Strategy

The project is prepared for comprehensive testing:

### Unit Testing
- **Framework**: Vitest
- **Component Testing**: Vue Test Utils
- **Store Testing**: Pinia Testing utilities

### Testing Structure
```
tests/
├── unit/
│   ├── components/
│   ├── composables/
│   └── stores/
├── integration/
└── e2e/
```

### Running Tests (when implemented)
```bash
npm run test              # Run all tests
npm run test:unit         # Run unit tests
npm run test:integration  # Run integration tests
npm run test:e2e          # Run end-to-end tests
```

## 📦 Build and Deployment

### Production Build
```bash
npm run build
```

The build output will be in the `dist/` directory.

### Build Optimization
- **Code Splitting**: Automatic vendor and UI library chunks
- **Tree Shaking**: Unused code elimination
- **Asset Optimization**: Image and CSS optimization
- **TypeScript Compilation**: Type checking during build

### Deployment Preparation
The project is prepared for deployment on:
- **Vercel**: Zero-config deployment
- **Netlify**: Static site hosting
- **Firebase Hosting**: Google Cloud integration
- **Custom Servers**: Standard static file serving

## 🤝 Contributing

### Development Workflow
1. Create a feature branch from `main`
2. Make your changes following the naming conventions
3. Run quality checks: `npm run quality`
4. Commit your changes with descriptive messages
5. Create a pull request

### Code Quality Standards
- All code must pass ESLint checks
- Code must be formatted with Prettier
- TypeScript strict mode compliance required
- No use of `any` type allowed
- Component props and emits must be typed

## 📄 License

This project is private and proprietary to LaCherada.

## 🆘 Support

For questions or issues:
1. Check the project documentation
2. Review the requirements and design documents in `.kiro/specs/`
3. Contact the development team

---

**Built with ❤️ for the LaCherada community**