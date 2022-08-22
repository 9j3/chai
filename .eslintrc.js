const DOMGlobals = ['window', 'document']
const NodeGlobals = ['module', 'require']

module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        sourceType: 'module'
    },
    rules: {
        'no-debugger': 'error',
        'no-unused-vars': [
            'error',
            { varsIgnorePattern: '.*', args: 'none' }
        ],
        'no-restricted-globals': ['error', ...DOMGlobals, ...NodeGlobals],
        'no-restricted-syntax': [
            'error',
            'ObjectPattern > RestElement',
        ]
    },
    overrides: [
        {
            files: ['packages/app/**'],
            extends: [
                'eslint:recommended',
                'plugin:vue/vue3-recommended',
            ],
            rules: {
                'no-restricted-globals': ['error', ...DOMGlobals]
            }
        },
        {
            files: [
                'packages/api/**'
            ],
            rules: {
                'no-restricted-globals': ['error', ...NodeGlobals],
                'no-restricted-syntax': 'off'
            }
        }
    ]
}
