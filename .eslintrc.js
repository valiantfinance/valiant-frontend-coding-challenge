module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/recommended',
    '@vue/standard',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // Enforce style of a single space before curly bracket open & close.
    'object-curly-spacing': ['error', 'always'],
    // Enforce style of no spaces before array open & close.
    'array-bracket-spacing': ['error', 'never'],
    // Require comma-dangle in multi-line arrays and objects.
    'comma-dangle': ['error', 'always-multiline'],

  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ],
}
