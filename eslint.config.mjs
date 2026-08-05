import eslintPluginTs from '@typescript-eslint/eslint-plugin';
import parserTs from '@typescript-eslint/parser';

export default [
    {
        ignores: [
            'node_modules/**',
            'coverage/**',
        ]
    },
    {
        files: ['src/**/*.ts', 'test/**/*.test.ts'],
        languageOptions: {
            parser: parserTs,
            parserOptions: {
                ecmaVersion: 2020,
                sourceType: 'module'
            },
            globals: {
                jest: true
            }
        },
        plugins: {
            '@typescript-eslint': eslintPluginTs
        },
    },
    {
        files: ['test/**/*.test.ts'],
        rules: {
            'no-unused-expressions': 'off'
        }
    }
];
