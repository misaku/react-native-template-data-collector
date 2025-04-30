module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'babel-plugin-styled-components',
      {
        ssr: false,
        displayName: true,
        minify: false,
      },
    ],
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
        blocklist: null,
        allowlist: null,
        safe: false,
        allowUndefined: true,
      },
    ],
    '@babel/plugin-transform-runtime',
    [
      'module-resolver',
      {
        root: ['./'], // Base do projeto
        alias: {
          '@config': './src/config',
          '@hook': './src/hook',
          '@assets': './src/assets',
          '@components': './src/components',
          '@pages': './src/pages',
        },
      },
    ],
  ],
  env: {
    production: {
      plugins: ['react-native-paper/babel', 'transform-remove-console'],
    },
  },
};
