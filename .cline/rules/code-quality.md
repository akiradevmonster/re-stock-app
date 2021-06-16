# Code Quality Rules

## Linting and Testing Process

Always follow this process when making code changes:

1. After writing or modifying code, run the following checks in order:
   - `yarn lint:fix` - Run ESLint with automatic fixes
   - `yarn typecheck` - Verify TypeScript types
   - `yarn test` - Run tests to verify functionality
   - Or use the combined command: `yarn check`

2. For ESLint and TypeScript errors:
   - First try automatic fixes: `yarn lint:fix`
   - Only manually edit files for errors that cannot be fixed automatically
   - Avoid disabling ESLint rules unless absolutely necessary and with proper documentation

3. All PRs must pass:
   - Linting (with no warnings or errors)
   - Type checking (with no type errors)
   - Tests (with no failed tests)

## Git Hooks

The project uses husky for Git hooks:

- Pre-commit hook runs:
  - ESLint with fixes on staged files
  - TypeScript checking
  - Jest tests on affected files

These checks cannot be bypassed without explicit `--no-verify` flag, which should be avoided.

## CI/CD Guidelines

1. Never push code that fails linting, type checking, or tests
2. Always run `yarn check` before committing
3. Keep test coverage high, especially for critical business logic
4. Review and address all warnings, not just errors