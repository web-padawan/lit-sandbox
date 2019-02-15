module.exports = {
  rules: [
    {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules\/(?!(@webcomponents\/shadycss|lit-element|lit-html|@polymer|@vaadin|@lit)\/).*/,
      options: {
        cacheDirectory: true
      }
    },
    {
      test: /\.ts?$/,
      use: ['babel-loader', 'ts-loader'],
      exclude: /node_modules/
    }
  ]
};
