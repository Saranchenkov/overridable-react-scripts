const fs = require('fs');
const path = require('path');
const util = require('util');

const identity = arg => arg;

const overrides = {
  overridePaths: identity,
  overrideWebpackConfig: identity,
  overrideWebpackDevServerConfig: identity,
};

function setCustomOverrides(customOverrides) {
  Object.keys(overrides).forEach(functionName => {
    const customFunction = customOverrides[functionName];

    if (customFunction === undefined) return;

    if (typeof customFunction !== 'function') {
      console.error(`Field "${functionName}" must be a function`);
      return;
    }

    overrides[functionName] = customFunction;
  });
}

const appDirectory = fs.realpathSync(process.cwd());
const overrideFileName = 'react-scripts.override.js';
const overrideFilePath = path.resolve(appDirectory, overrideFileName);

try {
  const customOverrides = require(overrideFilePath);

  if (typeof customOverrides !== 'object' || customOverrides === null) {
    console.error(`File "${overrideFileName}" must export object`);
  }

  setCustomOverrides(customOverrides);
} catch(error) {
  const isFileNotFound = error instanceof Error && error.code === 'MODULE_NOT_FOUND';

  console.log(util.inspect(
    `File "${overrideFileName}" is not found at location "${overrideFilePath}"`,
    { colors: true }
  ));

  if (!isFileNotFound) {
    throw error;
  }
}

module.exports = {
  createPathDecorator(options) {
    return paths => overrides.overridePaths(paths, options);
  },
  createWebpackDecorator(options) {
    return webpackConfigCreator => {
      return (...args) => {
        const webpackConfig = webpackConfigCreator(...args);
        return overrides.overrideWebpackConfig(webpackConfig, options);
      }
    }
  },
  createWebpackDevServerDecorator(options) {
    return devServerConfigCreator => {
      return (...args) => {
        const devServerConfig = devServerConfigCreator(...args);
        return overrides.overrideWebpackDevServerConfig(devServerConfig, options);
      }
    }
  }
};
