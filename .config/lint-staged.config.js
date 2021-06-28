module.exports = {
  "**/*.{ts,tsx}": [
    "yarn lint:fix",
    "yarn typecheck",
    'yarn test --findRelatedTests --bail',
  ],
  "**/*.{js,jsx}": ["eslint --fix"],
};
