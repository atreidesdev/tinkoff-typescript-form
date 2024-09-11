import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
    { files: ['**/*.{js,mjs,cjs,ts}'] },
    { languageOptions: { globals: globals.browser } },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    {
        rules: {
            'no-unused-vars': 'error',
            'object-shorthand': ['error', 'always'],
            curly: ['error', 'all'],
            'no-redeclare': 'error',
            quotes: ['error', 'single'],
            'keyword-spacing': ['error', { before: true, after: true }],
            eqeqeq: ['error', 'always'],
            'no-unreachable': 'error',
            'prefer-const': 'error',
        },
    },
    {
        ignores: ['dist/', 'node_modules/'],
    },
];
