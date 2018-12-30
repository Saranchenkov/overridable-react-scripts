/**
 * If you don't want to override webpack config you can remove this file
 */

/**
 * Function to override webpack config
 *
 * @param {Object} webpackConfig - webpack config
 * @param {Object} options
 * @param {Object} options.webpack - webpack instance
 * @param {Object} options.paths - object of paths
 * @param {String} options.webpackEnv - "development" or "production"
 */
module.exports = function (webpackConfig, options) {
  return webpackConfig;
};