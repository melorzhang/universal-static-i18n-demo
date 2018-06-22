const webpack = require("webpack");
const path = require("path");
const env =  process.env.NODE_ENV === "production" ? "production" : "development";
console.log("env", process.env.NODE_ENV);
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const htmlConfig = require("./src/bundle.config");
// console.log('config',htmlConfig);
const genHtmlPlugin = htmlConfig => {
  const list = htmlConfig.pageList.map(page => {
    return htmlConfig.langList.map(lang => {
      return {
        filename: `${lang}/${page}/index.html`,
        title: page,
        files: [
          `${lang}.js`,
          `${page}.js`,
          `${page}.css`,
          "common.js",
          "common.css"
        ],
        chunks: [lang, page, "common"],
        template: `src/tpl.html`,
        string: `<div class='data'></div>`,
        chunksSortMode: function (a, b) {
          //alphabetical order
          const order = [...htmlConfig.langList, 'common', ...htmlConfig.pageList]
          const order1=order.indexOf(a.names[0]);
          const order2=order.indexOf(b.names[0]);
          return order1-order2;
        }
      };
    });
  });
  return [].concat(...list).map(val => new HtmlWebpackPlugin(val));
};
const htmlPlugins = genHtmlPlugin(htmlConfig);
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [path.resolve(__dirname, "src")],
        loader: "babel-loader",
        options: {
          presets: ["env"],
          plugins: ["syntax-dynamic-import"]
        }
      },
      {
        test: /\.(less|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: loader => [
                require("autoprefixer")(),
                require("cssnano")()
              ]
            }
          },
          "less-loader"
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          // 应用多个 loader 和选项
          {
            loader: "url-loader",
            options: {
              limit: 8192,
              outputPath: "images"
            }
          }
        ]
      }
    ]
  },
  entry: {
    common: "./src/common.js",
    demo1: "./src/pages/demo_1",
    demo2: "./src/pages/demo_2",
    "zh-CN": "./src/lang/zh-CN.js",
    'en-US': "./src/lang/en-US.js"
  },
  output: {
    filename: "[name].[chunkhash:6].js",
    path: path.resolve(__dirname, "dist")
  },
  mode: env,
  optimization: {
    splitChunks: {
      chunks: "async",
      minSize: 30000,
      minChunks: 1,
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        }
      }
    }
  },
  plugins: [
    ...htmlPlugins,
    new MiniCssExtractPlugin({
      filename: "[name].[hash:6].css",
      chunkFilename: "[name].[hash:6].css"
    })
  ]
};
