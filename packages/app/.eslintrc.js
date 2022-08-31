const DOMGlobals = ['window', 'document'];

// eslint-disable-next-line no-restricted-globals
module.exports = {
  extends: ['plugin:vue/vue3-recommended'],
  env: {
    browser: true,
  },
  rules: {
    'no-restricted-globals': ['error', ...DOMGlobals],
    'no-multiple-empty-lines': ['error', { max: 2, maxEOF: 0 }],
  },
};
