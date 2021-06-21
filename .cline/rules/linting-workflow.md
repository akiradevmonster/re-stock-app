# Linting and Code Quality Workflow

## Process for Handling Code Errors

When working with code that has linting or type errors, follow this specific workflow:

1. **First attempt automatic fixes**
   - Always run `yarn lint:fix` before manually editing files
   - For most linting issues, automatic fixes are preferred over manual edits
   - Only manually edit files for errors that cannot be automatically fixed

2. **Handle TypeScript errors**
   - Run `yarn typecheck` to identify type issues
   - First try resolving errors by using correct types rather than type assertions
   - Use proper type narrowing instead of type casting when possible

3. **Verify changes with tests**
   - After fixing lint/type errors, always run tests with `yarn test`
   - Ensure new fixes don't break existing functionality

4. **Complete verification cycle**
   - Use `yarn check` to run all verification steps in sequence
   - This combined command ensures all quality checks pass

## When to Try Each Approach

- **ESLint errors**: Always try `yarn lint:fix` first
- **TypeScript errors**: Check if they can be resolved with correct typing
- **Test failures**: Review the test output carefully before making changes

## Responding to User Questions

When a user asks you to fix code issues:

1. First recommend running the automatic fix: "Let me try running `yarn lint:fix` first."
2. If automatic fixes don't resolve all issues, explain: "Some issues require manual fixes. Let me address those now."
3. After making changes, always suggest verification: "Let's verify these changes with `yarn check`."

## Documentation

Always maintain documentation of quality processes:
- Update CLAUDE.md when quality processes change
- Run `yarn build-prompt` after adding or modifying .cline/rules/ files
- Inform the user of updated quality procedures