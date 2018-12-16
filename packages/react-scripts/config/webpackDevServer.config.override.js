const createDevServerConfig = require('./webpackDevServer.config');
const paths = require('./paths');

let overrideFunction;

try {
  overrideFunction = require(paths.appPath + '/webpackDevServer.config.override.js');
} catch(error) {
  if (error instanceof Error && error.code === 'MODULE_NOT_FOUND') {
    overrideFunction = devServerConfig => devServerConfig;
  } else {
    throw error;
  }
}

module.exports = function (proxy, allowedHost) {
  const config = createDevServerConfig(proxy, allowedHost);

  const options = {
    proxy,
    allowedHost,
  };

  return overrideFunction(config, options);
};
