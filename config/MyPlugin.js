function MyPlugin(options) {
  // Configure your plugin with options...
}

MyPlugin.prototype.apply = function (compiler) {
  compiler.plugin('compilation', (compilation) => {
    console.log('The compiler is starting a new compilation...');

    compilation.plugin(
      'html-webpack-plugin-before-html-processing',
      (data, cb) => {
        cb(null, data)
      }
    )
  })
}

module.exports = MyPlugin
