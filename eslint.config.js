// eslint.config.js

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable jsdoc/require-jsdoc */
/* eslint-disable @typescript-eslint/naming-convention */

import globals from 'globals';
import tseslint from 'typescript-eslint';
import tsParser from '@typescript-eslint/parser';
import jsdoc from 'eslint-plugin-jsdoc';
import eslint from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
    // Plugins
    eslint.configs.recommended,
    tseslint.configs.eslintRecommended,
    ...tseslint.configs.recommendedTypeChecked,
    jsdoc.configs['flat/recommended'],
    eslintConfigPrettier,
    // /Plugins
    {
        languageOptions: {
            globals: {
                ...globals.es2021,
                ...globals.node,
            },
            parser: tsParser,
            parserOptions: {
                sourceType: 'module',
                project: ['tsconfig.json'],
            },
        },
        plugins: {
            '@typescript-eslint/eslint-plugin': tseslint,
            'eslint-plugin-jsdoc': jsdoc,
        },
        rules: {
            'unicode-bom': ['error', 'never'],
            '@typescript-eslint/explicit-function-return-type': 'warn',
            'no-var': 'off',
            'no-restricted-syntax': [
                'error',
                {
                    selector: 'VariableDeclaration[kind=\'var\'][declare!=true]',
                    message: 'Unexpected var, use let or const instead.',
                },
            ],
            eqeqeq: 'warn',
            'no-unused-vars': 'off',
            '@typescript-eslint/no-unused-vars': [
                'warn',
                {
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                    caughtErrorsIgnorePattern: '^_',
                },
            ],
            'spaced-comment': ['warn', 'always'],
            '@typescript-eslint/naming-convention': [
                'error',
                {
                    selector: 'default',
                    format: ['camelCase'],
                },
                {
                    selector: 'variable',
                    format: ['camelCase', 'UPPER_CASE'],
                    leadingUnderscore: 'allow',
                },
                {
                    selector: 'parameter',
                    format: ['camelCase'],
                    leadingUnderscore: 'allow',
                },
                {
                    selector: 'memberLike',
                    modifiers: ['private'],
                    format: ['camelCase'],
                    leadingUnderscore: 'require',
                },
                {
                    selector: 'typeLike',
                    format: ['PascalCase'],
                },
                {
                    selector: [
                        'classProperty',
                        'objectLiteralProperty',
                        'typeProperty',
                        'classMethod',
                        'objectLiteralMethod',
                        'typeMethod',
                        'accessor',
                        'enumMember',
                    ],
                    format: null,
                    modifiers: ['requiresQuotes'],
                },
            ],
            'jsdoc/check-param-names': [
                'error',
                {
                    checkDestructured: false,
                },
            ],
            'jsdoc/require-param': [
                'error',
                {
                    checkDestructured: false,
                },
            ],
            'jsdoc/require-param-description': 'error',
            'jsdoc/require-returns': 'error',
            'jsdoc/require-param-type': 'off',
            'jsdoc/require-returns-type': 'off',
            'jsdoc/require-jsdoc': [
                'error',
                {
                    publicOnly: true,
                    require: {
                        ArrowFunctionExpression: true,
                        ClassDeclaration: true,
                        ClassExpression: true,
                        FunctionDeclaration: true,
                        FunctionExpression: true,
                        MethodDefinition: true,
                    },
                    contexts: [
                        'ArrowFunctionExpression',
                        'FunctionDeclaration',
                        'FunctionExpression',
                        'MethodDefinition',
                        'Property',
                        'TSDeclareFunction',
                        'TSEnumDeclaration',
                        'TSInterfaceDeclaration',
                        'TSMethodSignature',
                        'TSPropertySignature',
                        'TSTypeAliasDeclaration',
                        'VariableDeclaration',
                    ],
                },
            ],
        },
    }
];
