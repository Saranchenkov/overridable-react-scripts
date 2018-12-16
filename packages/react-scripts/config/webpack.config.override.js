const webpack = require('webpack');
const paths = require('./paths');

let overrideFunction;

try {
  overrideFunction = require(paths.appPath + '/webpack.config.override.js');
} catch(error) {
  if (error instanceof Error && error.code === 'MODULE_NOT_FOUND') {
    overrideFunction = webpackConfig => webpackConfig;
  } else {
    throw error;
  }
}

module.exports = function createWebpackConfig(webpackConfig) {
  const options = {
    webpack,
    paths,
  };

  return overrideFunction(webpackConfig, options);
};
