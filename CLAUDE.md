# Re-Stock App Guidelines

## Project Overview

Re-Stock is a web app that allows users to manage their household daily necessities inventory with a simple UI and easy operation. When stock is running low, users can move to the EC site's product page with one tap.

### Target Users
- People who regularly purchase and manage household items
- Mostly older women in families, but also working women and men who purchase daily necessities
- Users who store various types of daily necessities in multiple storage locations

### Target Items
- Bath items (shampoo, face wash, body soap, etc.)
- Laundry items (detergent, fabric softener, etc.)
- Washroom items (toothpaste, hand soap, contact lens solution, etc.)
- Cleaning supplies (bathroom spray cleaner, mirror cleaner, toilet cleaner, etc.)
- Kitchen items (dishwashing detergent, sponges, garbage bags, kitchen paper, wrap, etc.)
- Necessities (toilet paper, tissue paper, etc.)

### Key Features
1. Item registration (name, category, brand, stock count, threshold, purchase URL)
2. Unopened item stock management (increase/decrease)
3. Opened item stock management (increase/decrease)
4. Low stock alerts
5. Direct links to EC sites

## Commands
- `yarn dev` - Start development server with turbopack
- `yarn build` - Build for production
- `yarn start` - Start production server
- `yarn lint` - Run ESLint
- `yarn lint:fix` - Run ESLint with automatic fixes
- `yarn typecheck` - Type check project files
- `yarn test` - Run tests
- `yarn test --coverage` - Run tests with coverage report
- `yarn check` - Run lint:fix, typecheck, and tests in sequence

### Quality Control Process
1. After making code changes, always run `yarn check` to verify:
   - Code style with automatic fixes (lint:fix)
   - Type correctness (typecheck)
   - Functional correctness (test)
2. For lint/TypeScript errors:
   - First try automatic fixes with `yarn lint:fix`
   - Only manually edit files for errors that cannot be fixed automatically
3. Git commits are protected by husky pre-commit hooks that run:
   - ESLint with fixes
   - TypeScript checking
   - Jest tests on modified files

## Architecture

### Directory Structure
```
src/
├── app/                 # Next.js App Router
├── components/          # UI components
│   ├── ui/              # Basic UI components (shadcn/ui)
│   └── features/        # Feature-specific components
├── domain/              # Domain model
│   ├── models/          # Entities and value objects
│   ├── repositories/    # Data access abstraction
│   └── services/        # Domain services
├── lib/                 # Utility functions
├── stores/              # State management
└── types/               # Type definitions
```

### Layer Structure
1. **Presentation Layer** (components/, app/)
   - User interface components
   - User input handling
   - State display

2. **Application Layer** (stores/)
   - Use case implementation
   - State management
   - Domain service coordination

3. **Domain Layer** (domain/)
   - Business logic
   - Entities and value objects
   - Domain services

4. **Infrastructure Layer** (domain/repositories/ implementation)
   - Data persistence
   - External service integration
   - Technical implementation details

### Dependency Direction
Dependencies flow inward:
```
Presentation → Application → Domain ← Infrastructure
```

- Domain layer does not depend on other layers
- Infrastructure layer depends on the domain layer
- Application layer depends on the domain layer
- Presentation layer depends on application and domain layers

### Tech Stack
- **Framework**: Next.js 15.2.1 (App Router)
- **Language**: TypeScript 5.x
- **UI Library**: React 19.0.0
- **Styling**: Tailwind CSS 3.4.x + shadcn/ui
- **State Management**: Zustand
- **Form Management**: React Hook Form + zod (planned)
- **Data Persistence**: localStorage (initial implementation)
- **Validation**: zod
- **Testing**: Jest + React Testing Library

## Development Workflow

### GitHub Flow
- Create feature branch from `main`: `git checkout -b feature/new-feature-name`
- Make changes and commit with descriptive messages
- Push branch and create PR
- After review and testing, merge to `main`
- Delete the branch after merging:
  - Delete local branch: `git branch -d feature/new-feature-name`
  - Delete remote branch: `git push origin --delete feature/new-feature-name`
- Always remember to delete both local AND remote branches after merging

### Git and GitHub Rules
- **IMPORTANT**: All Git-related text must be written in English
- Write all commit messages in English
- Create all Pull Request titles and descriptions in English
- Write all GitHub Issues, comments, and tags in English
- Use English for all branch names

### Branch Naming
- Features: `feature/feature-name`
- Bug fixes: `fix/bug-description`
- Refactoring: `refactor/description`
- Documentation: `docs/description`

### Commit Messages
Format commit messages with a type prefix:
```
feat: Add user authentication with Result type

- More type-safe error handling
- Enforce explicit handling of error cases
- Improved testing
```

Types: `feat`, `fix`, `update`, `refactor`, `test`, `docs`, `style`

## Code Style

### Formatting
- Indentation: 2 spaces
- Max line length: 100 characters
- Semicolons: Required
- Quotes: Single quotes preferred
- Trailing commas: Use them
- Brackets: Opening bracket on same line

### Naming Conventions
- Files: kebab-case (e.g., `user-profile.tsx`)
- Components: PascalCase (e.g., `UserProfile`)
- Functions: camelCase (e.g., `getUserData`)
- Variables: camelCase (e.g., `userName`)
- Classes: PascalCase (e.g., `UserRepository`)
- Interfaces: PascalCase (e.g., `UserData`)
- Types: PascalCase (e.g., `UserId`)
- Constants: UPPER_SNAKE_CASE (e.g., `MAX_RETRY_COUNT`)

### Component Props
- Define props types explicitly
- Name props types as ComponentName + `Props`
- Mark optional props with `?`

```typescript
type ButtonProps = {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
};
```

### Import Order
1. External libraries
2. Internal modules (using @/ prefix)
3. Relative imports

```typescript
// External libraries
import React, { useState, useEffect } from 'react';
import { z } from 'zod';

// Internal modules
import { Button } from '@/components/ui/button';
import { useItemStore } from '@/stores/user-store';

// Relative imports
import { formatUserName } from '../../utils/format';
import type { UserData } from './types';
```

## Domain-Driven Design (DDD)

### Value Objects
- Immutable
- Identity based on value
- Self-validating
- Contains domain operations

```typescript
type ItemId = Branded<string, 'ItemId'>;

function createItemId(value: string): Result<ItemId, Error> {
  if (!value || value.trim() === '') {
    return err(new Error('ItemId cannot be empty'));
  }
  return ok(value as ItemId);
}
```

### Entities
- Identity based on ID
- Controlled updates
- Consistency rules

```typescript
// Entity example
type Item = {
  id: ItemId;
  name: ItemName;
  category: Category;
  brand: BrandName;
  unopenedCount: number;
  openedCount: number;
  threshold: number;
  purchaseUrl: URL | null;
};
```

### Domain Services
Domain services handle operations that don't belong to a single entity:

```typescript
function isItemLowStock(item: Item): boolean {
  const totalCount = item.unopenedCount + item.openedCount;
  return totalCount <= item.threshold;
}

function getLowStockItems(items: Item[]): Item[] {
  return items.filter(isItemLowStock);
}
```

### Repositories
Repositories abstract data access:

```typescript
interface ItemRepository {
  findAll(): Promise<Result<Item[], Error>>;
  findById(id: ItemId): Promise<Result<Item | null, Error>>;
  save(item: Item): Promise<Result<void, Error>>;
  delete(id: ItemId): Promise<Result<void, Error>>;
}

// Implementation examples
class LocalStorageItemRepository implements ItemRepository {
  // Implementation details
}

class InMemoryItemRepository implements ItemRepository {
  // Implementation for testing
}
```

## Functional Programming Approach

### Core Principles
- Prioritize pure functions
- Use immutable data structures
- Isolate side effects
- Ensure type safety

### Implementation Patterns
- Use branded types for type safety
- Create factory functions with validation
- Separate IO operations to the boundaries
- Use adapter pattern for abstracting external dependencies

```typescript
// Adapter pattern example
interface StorageAdapter {
  getItem(key: string): Promise<Result<string | null, Error>>;
  setItem(key: string, value: string): Promise<Result<void, Error>>;
  removeItem(key: string): Promise<Result<void, Error>>;
}

// localStorage implementation
class LocalStorageAdapter implements StorageAdapter {
  // Implementation details
}

// In-memory implementation (for testing)
class InMemoryStorageAdapter implements StorageAdapter {
  // Implementation details
}
```

## TypeScript Patterns

### Type Safety
- Use branded types for type safety
- Create factory functions for type validation
- Avoid `any`, use `unknown` with type narrowing
- Explicitly type function parameters and returns

```typescript
// Branded type pattern
type Branded<T, B> = T & { _brand: B };
type Money = Branded<number, "Money">;

// Factory function with validation
function createMoney(amount: number): Result<Money, Error> {
  if (amount < 0) return err(new Error("Negative amount not allowed"));
  return ok(amount as Money);
}
```

### Result Type for Error Handling
```typescript
type Result<T, E> = { ok: true; value: T } | { ok: false; error: E };

function ok<T, E>(value: T): Result<T, E> {
  return { ok: true, value };
}

function err<T, E>(error: E): Result<T, E> {
  return { ok: false, error };
}
```

### Error Type Definition
```typescript
type ApiError =
  | { type: "network"; message: string }
  | { type: "notFound"; message: string }
  | { type: "unauthorized"; message: string }
  | { type: "validation"; message: string; fields: Record<string, string> };
```

### Implementation Approaches
- Prefer functions over classes when no internal state is needed
- Use classes when state management is required
- Use adapter pattern to abstract external dependencies

## UI/UX Guidelines

### Mobile-First Approach
- Design for mobile devices first, then scale up
- Use Tailwind's responsive modifiers (sm:, md:, lg:, xl:)
- Ensure touch-friendly interface with appropriate tap areas

### Accessibility Requirements
- Follow WCAG 2.1 AA level compliance
- Support screen readers with appropriate aria attributes
- Support keyboard navigation
- Ensure sufficient color contrast

### Component Design
- Use shadcn/ui for base components
- Customize components as needed while maintaining Tailwind principles
- Use semantic HTML elements
- Apply proper heading hierarchy

### State Management with Zustand
```typescript
// Item store example
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type ItemStore = {
  items: Item[];
  addItem: (item: Item) => void;
  updateItem: (id: string, updates: Partial<Item>) => void;
  removeItem: (id: string) => void;
};

export const useItemStore = create<ItemStore>()(
  persist(
    (set) => ({
      items: [],
      addItem: (item) => set((state) => ({ items: [...state.items, item] })),
      updateItem: (id, updates) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, ...updates } : item
          ),
        })),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
    }),
    {
      name: "item-storage",
    }
  )
);
```

## Testing Strategy

### Test-Driven Development (TDD)
1. **Red**: Write a failing test first
2. **Green**: Implement minimal code to make the test pass
3. **Refactor**: Improve the code while keeping tests passing

### Testing Types
- **Unit Tests**: Test individual functions and components
- **Component Tests**: Test UI components with React Testing Library
- **Integration Tests**: Test multiple modules working together
- **E2E Tests**: Test complete user flows (when necessary)

### Testing Guidelines
- Write tests from the user's perspective
- Test behavior, not implementation details
- Consider edge cases
- Make tests deterministic and independent

### Refactoring Tools
- Static analysis/type checking: `yarn tsc --noEmit <target>`
- Linting: `yarn lint <target>`
- Code coverage: `yarn test --coverage`

## Technical Constraints

### Browser Support
- Latest versions of Chrome, Firefox, Safari, and Edge
- Internet Explorer is not supported
- Mobile browsers (iOS Safari, Android Chrome) are supported

### Performance Goals
- First Contentful Paint (FCP): Under 1.5 seconds
- Time to Interactive (TTI): Under 3 seconds
- Lighthouse performance score: 90+

### Limitations
- localStorage has size limitations (typically 5MB)
- No synchronization between devices using localStorage
- Data loss in private browsing mode

## Current Status

### Completed Features
- Project setup and basic configuration
- Basic UI components (Badge, Button)
- Feature components (Header, Navigation, CategoryCard, ItemCard)
- Main application component (InventoryApp)
- Basic domain model implementation
- Zustand store setup with localStorage persistence
- Category display with derived data
- State update logic
- SwipeableItemCard with left/right swipe gestures
- ItemOperationPanel with prioritized operation buttons
- Compound operation: "consume and open" for quick actions

### In Progress
- Item addition/editing form
- Stock operation UI
- Category filtering implementation
- Repository interface complete implementation
- Enhanced validation logic

### Known Issues
- Tailwind CSS v4 compatibility issues with @apply directive
- Server components and Zustand integration ("use client" directive requirement)
- localStorage limitations (capacity, device synchronization, private browsing)
- Performance concerns with large number of items

### Next Steps
1. Implement item addition/editing form
2. Implement category filtering
3. Complete repository implementation
4. Enhance validation logic
5. Add tests
6. Improve swipeable card UX with visual cues and haptic feedback