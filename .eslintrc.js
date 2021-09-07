module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'preact'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
  },
  overrides: [
    {
      "files": ["*.js"],
      rules: {
        "brace-style": ["error", "1tbs"],
        "arrow-body-style": ["error", "always"],
        "react/jsx-filename-extension": 'off',
        'jsx-a11y/click-events-have-key-events': 'off',
        'jsx-a11y/no-noninteractive-element-interactions': 'off'
      }
    }
  ]
};
