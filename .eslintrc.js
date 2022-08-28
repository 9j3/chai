const DOMGlobals = ['window', 'document'];
const NodeGlobals = ['module', 'require'];

// eslint-disable-next-line no-restricted-globals
module.exports = {
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'no-debugger': 'error',
    'no-unused-vars': ['error', { varsIgnorePattern: '.*', args: 'none' }],
    'no-restricted-globals': ['error', ...DOMGlobals, ...NodeGlobals],
    'no-restricted-syntax': ['error', 'ObjectPattern > RestElement'],
  },
  overrides: [
    {
      files: ['packages/app/**'],
      extends: ['plugin:vue/vue3-recommended'],
      rules: {
        'no-restricted-globals': ['error', ...DOMGlobals],
        'no-multiple-empty-lines': ['error', { max: 2, maxEOF: 0 }],
      },
    },
    {
      parser: '@typescript-eslint/parser',
      files: ['packages/api/**'],
      rules: {
        'no-restricted-globals': ['error', ...NodeGlobals],
        'no-restricted-syntax': 'off',
      },
    },
  ],
};
