module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true
        }
    },
    plugins: ['react', 'import', 'react-hooks', '@typescript-eslint', 'filenames'],
    ignorePatterns: ['plugins', '__mocks__', 'libs'],
    extends: [
        'eslint:recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:react/recommended'
    ],
    rules: {
        'react/jsx-no-bind': [
            'warn',
            {
                ignoreDOMComponents: false,
                ignoreRefs: false,
                allowArrowFunctions: true,
                allowFunctions: false,
                allowBind: false
            }
        ],
        'react-hooks/exhaustive-deps': 'warn',
        'import/prefer-default-export': 'off',
        'import/no-named-as-default': 'off',
        'class-methods-use-this': 'off',
        'no-use-before-define': 'off',
        'no-duplicate-variable': 0,
        'camelcase': 'off',
        // enable additional rules
        indent: ['error', 4, { SwitchCase: 1 }],

        'linebreak-style': ['error', 'unix'],
        quotes: ['error', 'single'],
        semi: ['error', 'always'],

        'comma-dangle': ['error', 'never'],
        'no-cond-assign': ['error', 'always'],

        'array-bracket-spacing': [2, 'never'],
        'max-len': [0, { code: 120 }],

        'no-bitwise': 0,
        'no-alert': 0,
        eqeqeq: 'error',

        'prefer-destructuring': ['error', { object: false, array: false }],

        'no-empty': ['error', { allowEmptyCatch: true }],
        'no-plusplus': [0, { allowForLoopAfterthoughts: true }],

        'react/prop-types': 0,
        'react/display-name': 0,
        'no-useless-escape': 0,
        'no-underscore-dangle': 0,
        // no-recommended
        'no-param-reassign': [0, { props: false }],
        'no-mixed-operators': 0,
        'no-nested-ternary': 0,

        // set on before release
        'no-console': 'off',

        // should enable on ts project
        'import/no-unresolved': 'off',
        'import/extensions': 'off',
        'no-unused-vars': 0,
        'no-shadow': 'off',
        '@typescript-eslint/no-unused-vars': 1,
        '@typescript-eslint/no-shadow': ['error'],
        'filenames/match-regex': [2, '^[a-z.-]+$', false]
    },
    env: {
        jest: true,
        browser: true,
        node: true
    },
    overrides: [{
        files: ['*.ts', '*.tsx'],
        rules: {
            'no-undef': 'off'
        }
    }]
};
