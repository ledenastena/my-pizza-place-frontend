module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: ['airbnb', 'prettier', 'prettier/react'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  parser: 'babel-eslint',
  plugins: ['react', 'prettier'],
  overrides: [
    {
      files: ['**/*.test.js', '**/*.test.jsx'],
      env: {
        jest: true,
      },
    },
  ],
  rules: {
    'react/forbid-prop-types': ['error', { forbid: ['any', 'array'] }],
    'react/destructuring-assignment': [
      'error',
      'always',
      { ignoreClassFields: true },
    ],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'no-shadow': 'off',
    'react/state-in-constructor': 'off',
    'no-underscore-dangle': 'off',
    'no-nested-ternary': 'off',
    'no-alert': 'off',
    'no-bitwise': 'off',
    'prefer-promise-reject-errors': 'off',
  },
}
