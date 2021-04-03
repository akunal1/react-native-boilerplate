module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
  },
  plugins: ['react', 'react-native'],
  extends: [
    'airbnb',
    '@react-native-community',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  settings: {
    'import/resolver': {node: {extensions: ['.ts', '.tsx', '.js', '.jsx']}},
  },
  rules: {
    'no-use-before-define': 1,
    'react/jsx-props-no-spreading': 0,
    'prettier/prettier': 0, // turned-off for now
    'react/no-did-mount-set-state': 2,
    'react/no-direct-mutation-state': 2,
    'react/jsx-filename-extension': [1, {extensions: ['tsx', 'js']}], // shouldnt these extends e.g, airbnb take care of it .. ??anyways
    'no-undef': 2,
    semi: 2,
    'react/prop-types': 2,
    'react/jsx-no-bind': 2,
    'react/jsx-no-duplicate-props': 2,
    'import/prefer-default-export': 0,
    'comma-dangle': 0, // feel free to enable these rules.
    indent: [2, 2, {SwitchCase: 1}],
    'no-alert': 0,
    'linebreak-style': 0,
    'import/extensions': 'off',
    '@typescript-eslint/ban-ts-ignore': 0,
    '@typescript-eslint/camelcase': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/indent': ['error', 2],
    '@typescript-eslint/explicit-member-accessibility': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    'lines-between-class-members': 1,
    'no-bitwise': 0,
    'import/no-unresolved': [2],
    'react/static-property-placement': 0,
    'global-require': 0,
    'no-console': 0,
    'no-param-reassign': [2, {props: false}],
  },
};
