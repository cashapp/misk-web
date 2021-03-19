const CopyWebpackPlugin = require("copy-webpack-plugin")
module.exports = {
  stories: ["../stories/**/*.tsx"],
  addons: ["@storybook/addon-actions", "@storybook/addon-links"],
  webpackFinal: async (config) => {
    const CopyWebpackPluginConfig = new CopyWebpackPlugin({
      patterns: [
        { from: "../node_modules/@misk/common/lib/web/" },
        { from: "../node_modules/@misk/core/lib/web/" },
        { from: "../node_modules/@misk/simpleredux/lib/web/" }
      ],
    })
    return {
      ...config,
      module: { ...config.module, rules: [
        {
          test: /\.(tsx|ts)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: require.resolve('ts-loader'),
              options: {
              }
            },
          ],
        },
        {
          test: /\.(scss|sass|css)$/,
          use: [
            {
              loader: "style-loader"
            },
            {
              loader: "css-loader?minimize=true"
            },
            {
              loader: "sass-loader"
            }
          ],
        },
      ],
      },
      plugins: config.plugins.concat(CopyWebpackPluginConfig)
    };
  }
}
