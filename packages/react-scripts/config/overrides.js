const fs = require('fs');
const path = require('path');

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

try {
  const appDirectory = fs.realpathSync(process.cwd());
  const overrideFileName = 'react-scripts.override.js';

  const overrideFilePath = path.resolve(appDirectory, overrideFileName);
  const customOverrides = require(overrideFilePath);

  if (typeof customOverrides !== 'object' || customOverrides === null) {
    console.error('File "react-scripts.override.js" must export object');
  }

  setCustomOverrides(customOverrides);
} catch(error) {
  if (error instanceof Error && error.code === 'MODULE_NOT_FOUND') return;

  throw error;
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
