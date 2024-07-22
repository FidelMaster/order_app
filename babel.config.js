module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-paper/babel',
    'react-native-reanimated/plugin',
    'babel-plugin-react-native-nodeify-hack',
    [
      'module-resolver',
      {
        alias: {
          components: './src/components',
          types: './src/types',
          services: './src/services',
          screens: './src/screens',
          utils: './src/utils',
          hooks: './src/hooks',
        },
      },
    ],
  ],
  env: {
    production: {
      plugins: ['react-native-paper/babel', 'react-native-reanimated/plugin', 'babel-plugin-react-native-nodeify-hack'],
    },
    development: {
      plugins: ['react-native-paper/babel', 'react-native-reanimated/plugin', 'babel-plugin-react-native-nodeify-hack'],
    },
  },
};
