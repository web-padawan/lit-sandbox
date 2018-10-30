const path = require('path');
const { rules } = require('../utils/webpack.common.js');

module.exports = (storybookBaseConfig, configType, defaultConfig) => {
  defaultConfig.module.rules.push({
    test: [/\.stories\.js$/, /index\.js$/],
    loaders: [require.resolve('@storybook/addon-storysource/loader')],
    include: [path.resolve(__dirname, '../stories')],
    enforce: 'pre'
  });

  // tweak babel-loader to transpile dependencies
  defaultConfig.module.rules.push(...rules);

  return defaultConfig;
};
