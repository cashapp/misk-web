const path = require("path")
const MiskDev = require("@misk/dev")
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const bundleAnalyzer = false

const CopyWebpackPluginConfig = new CopyWebpackPlugin(
  [{ from: "./src/static/" }],
  { copyUnmodified: true }
)

module.exports = {
  mode: "production",
  entry: {
    core: path.resolve(__dirname, "src/index.ts")
  },
  devtool: "source-map",
  output: {
    path: path.resolve(__dirname, "./lib/web/@misk/core"),
    filename: "[name].js",
    library: ["Misk", "Core"],
    libraryTarget: "umd",
    /**
     * library will try to bind to browser `window` variable
     * without below globalObject: library binding to browser `window`
     *    fails when run in Node or other non-browser
     */
    globalObject: "typeof self !== 'undefined' ? self : this"
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader"
      },
      {
        test: /\.(scss|sass|css)$/,
        use: ["style-loader", "css-loader?minimize=true", "sass-loader"]
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
    alias: {
      src: path.resolve(__dirname, "./src/"),
      tests: path.resolve(__dirname, "./tests/")
    }
  },
  plugins: [CopyWebpackPluginConfig].concat(
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
  ),
  externals: MiskDev.vendorExternals
}
