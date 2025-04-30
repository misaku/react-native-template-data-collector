module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020, // Suporta ES2020.
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true, // Habilita o suporte para JSX.
    },
  },
  extends: [
    'airbnb', // Regras do Airbnb.
    'airbnb/hooks', // Suporte para React Hooks.
    'plugin:@typescript-eslint/recommended', // Regras TypeScript.
    'plugin:react/recommended', // Regras padrão para React.
    'plugin:react-native/all', // Regras específicas para React Native.
    'prettier', // Garante que as regras do Prettier sejam aplicadas.
  ],
  plugins: [
    '@typescript-eslint', // Plugin para TypeScript.
    'react', // Plugin para React.
    'react-hooks', // Validação de Hooks do React.
    'react-native', // Plugin para regras React Native.
    'prettier', // Integração com Prettier.
  ],
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'all',
        bracketSpacing: false,
        jsxBracketSameLine: true,
        endOfLine: 'auto', // Previne erros de fim de linha em diferentes sistemas operacionais.
      },
    ],
    'react/jsx-filename-extension': [
      1,
      {extensions: ['.jsx', '.tsx']}, // Permitir JSX em arquivos .jsx e .tsx.
    ],
    '@typescript-eslint/no-unused-vars': [
      'error',
      {argsIgnorePattern: '^_'}, // Ignora variáveis começando com "_".
    ],
    'react/react-in-jsx-scope': 'off', // Não necessário com versões atuais do React.
    'react-native/no-inline-styles': 'off', // Opcional para projetos que usam estilos inline.
    'import/no-extraneous-dependencies': 'off', // Desativa a verificação de dependências consideradas "extraneous"
    'import/no-unresolved': 'off', // Desativa o erro para itens importados que não podem ser resolvidos
    'import/prefer-default-export': 'off',
    'react/no-unused-prop-types': 'off',
    'react/require-default-props': 'off',
    'react-native/no-raw-text': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/no-unstable-nested-components': 'off',
    'import/extensions': 'off',
    'react/function-component-definition': 'off',
    'react/display-name': 'off',
    'react/prop-types': 'off',
  },
  settings: {
    react: {
      version: 'detect', // Detecta automaticamente a versão do React.
    },
  },
};
