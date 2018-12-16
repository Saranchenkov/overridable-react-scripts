/**
 * If you don't want to override webpack dev server config you can remove this file
 */

/**
 * Function to override webpack config
 *
 * @param {Object} webpackDevServerConfig - webpack dev server config
 * @param {Object} options
 * @param {Object|Function} options.proxy - proxy config ( https://webpack.js.org/configuration/dev-server/#devserver-proxy )
 * @param {Object} options.allowedHost - public url of dev server ( https://webpack.js.org/configuration/dev-server/#devserver-public )
 */
module.exports = function (webpackDevServerConfig, options) {
  return webpackDevServerConfig;
};