const CopyWebpackPlugin = require("copy-webpack-plugin")
const StyledComponentsTransformerPlugin = require("typescript-plugin-styled-components")
const createStyledComponentsTransformer =
  StyledComponentsTransformerPlugin.default
module.exports = {
  stories: ["../stories/**/*.tsx"],
  addons: ["@storybook/addon-actions", "@storybook/addon-links"],
  webpackFinal: (config) => {
    const CopyWebpackPluginConfig = new CopyWebpackPlugin(
      [
        { from: "./node_modules/@misk/common/lib/web/" },
        { from: "./node_modules/@misk/core/lib/web/" },
        { from: "./node_modules/@misk/simpleredux/lib/web/" }
      ],
      { copyUnmodified: true }
    )
    const StyledComponentsTransformer = createStyledComponentsTransformer()
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
                getCustomTransformers: () => ({
                  before: [StyledComponentsTransformer]
                })
              }
            },
          ],
        },
        {
          test: /\.(scss|css)$/,
          loader: "style-loader!css-loader!sass-loader"
        },
      ],
      },
      plugins: config.plugins.concat(CopyWebpackPluginConfig)
    };
  }
}
