const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer")
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const path = require("path")

const bundleAnalyzer = false

module.exports = {
  name: "static",
  mode: "production",
  entry: {
    styles: path.resolve(__dirname, "src/styles.js")
  },
  output: {
    path: path.resolve(__dirname, "./lib/web/@misk/common")
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      }
    ]
  },
  optimization: {
    minimizer: [new CssMinimizerPlugin()]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css"
    })
  ].concat(
    bundleAnalyzer
      ? [
          new BundleAnalyzerPlugin({
            analyzerMode: "static",
            reportFilename: "bundle-analyzer-report-common.html",
            statsFilename: "bundle-analyzer-report-common.json",
            generateStatsFile: true,
            openAnalyzer: false
          })
        ]
      : []
  )
}
