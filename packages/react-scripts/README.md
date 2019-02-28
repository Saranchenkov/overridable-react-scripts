# overridable-react-scripts

This package includes scripts and configuration used by [Create React App](https://github.com/Saranchenkov/create-react-app).<br>
Please refer to its documentation:

- [Getting Started](https://facebook.github.io/create-react-app/docs/getting-started) – How to create a new app.
- [User Guide](https://facebook.github.io/create-react-app/) – How to develop apps bootstrapped with Create React App.

## Quick Start

To create a project called `my-app`, run this command:

`npx create-react-app my-app --scripts-version overridable-react-scripts`

## How to override configs ?

In your project's root you'll find `webpack.config.override.js` and `webpackDevServer.config.override.js`  which contains a simple function that could mutate the webpack/webpackDevServer configuration that is provided by create-react-app.

If you started project with official `react-scripts`, you should insert those files into the project's root folder:

#### `webpack.config.override.js`
```javascript
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
 ```
 

#### `webpackDevServer.config.override.js`
```javascript
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
```
## Multiple env configs for production build
[Create React App](https://github.com/Saranchenkov/create-react-app) allow only one `.env.production` config for `NODE_ENV="production"`. But this fork lets to create multiple `.env` files for production builds.

`Create React App` uses variable `NODE_ENV` to find env file, but this fork uses env `ENV_FILE` for these purposes. For example, if you set `ENV_FILE=stage`, webpack will use `.env.stage` env file.
If you don't set `ENV_FILE` variable, `NODE_ENV` will be used by default.
You can install `cross-env` package to set and use environment variables across platforms.

#### Example of npm scripts in `package.json`
```
"scripts": {
  "start": "react-scripts start",
  "build:stage": "cross-env ENV_FILE=stage react-scripts build",    // <-- .env.stage
  "build:production": "cross-env ENV_FILE=production react-scripts build",    // <-- .env.production
  "test": "react-scripts test",
  "eject": "react-scripts eject"
},
```


## Which version of `react-scripts` does this fork use ?
You can find config version at the field `react-scripts-version` of `package.json`.

### Note: 
Main branch of this fork is `overridable-react-scripts` !