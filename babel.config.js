module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./peperonnie'],
        extensions: ['.ios.js', '.android.js', '.js', '.json'],
      }
    ]
  ]
};