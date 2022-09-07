const DOMGlobals = ['window', 'document'];

module.exports = {
  extends: ['plugin:vue/vue3-recommended', 'plugin:prettier/recommended'],
  env: {
    browser: true,
  },
  rules: {
    'no-restricted-globals': ['error', ...DOMGlobals],
    'no-multiple-empty-lines': ['error', { max: 2, maxEOF: 0 }],
  },
};
