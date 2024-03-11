module.exports = {
  extends: [
    'standard',
    'plugin:vue/vue3-recommended',
  ],
  rules: {
    'array-bracket-spacing': ['error', 'never'],
    'comma-dangle': ['error', {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      imports: 'always-multiline',
      exports: 'always-multiline',
      functions: 'never',
    }],
    'object-curly-spacing': ['error', 'always'],
    'no-console': 'warn',
    'no-debugger': 'warn',
    'vue/array-bracket-spacing': ['error', 'never'],
    'vue/comma-dangle': ['error', {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      functions: 'never',
    }],
    'vue/object-curly-spacing': ['error', 'always'],
  },
}
