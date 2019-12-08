const webpack = require("webpack");

const HtmlWebpackPlugin = require("html-webpack-plugin");

const CopyPlugin = require("copy-webpack-plugin");

const { execSync } = require("child_process");

const PUBLIC_PATH = "/";

const devServer = {
  contentBase: "./public",
  port: 3000,
  hot: true,
  // hotOnly: true,
  historyApiFallback: { index: PUBLIC_PATH },
  watchOptions: {
    aggregateTimeout: 1000, // 300 is default
    ignored: /node_modules/,
  },
  proxy: {
    //
  },
  disableHostCheck: true,
};

/**
 * Loads git hash commit from .git folder.
 *  If you know the better way - then feel free to change
 */
const gitHash = execSync("git rev-parse HEAD")
  .toString()
  .replace(/\r|\n/g, "");
const gitBranch = execSync("git rev-parse --abbrev-ref HEAD")
  .toString()
  .replace(/\r|\n/g, "");

const config = (env, argv) => {
  const MODE_DEVELOPMENT = argv.mode === "development";
  console.info(
    `Development mode is ${MODE_DEVELOPMENT}, gitHash=${gitHash}, gitBranch=${gitBranch}`,
  );

  const plugins = [
    new webpack.DefinePlugin({
      __BUILT_AT_DATE__: JSON.stringify(new Date().toISOString()),
      __DEVELOPMENT__: JSON.stringify(MODE_DEVELOPMENT),
      __GIT_HASH__: JSON.stringify(gitHash),
      __GIT_BRANCH__: JSON.stringify(gitBranch),
      __PUBLIC_PATH__: JSON.stringify(PUBLIC_PATH),
    }),
    new CopyPlugin(["static"]),
  ];
  if (MODE_DEVELOPMENT) {
    plugins.unshift(new webpack.HotModuleReplacementPlugin());
    const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
    plugins.unshift(
      new ForkTsCheckerWebpackPlugin({
        tslint: true,
        memoryLimit: 4096, // 2048 is default and this is not enough?
      }),
    );
  } else {
    //
  }
  plugins.push(
    new HtmlWebpackPlugin({
      filename: `index.html`,
      chunks: ["index"],
      meta: {
        viewport:
          "width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=no, minimum-scale=1, maximum-scale=1",
      },
    }),
  );
  return {
    entry: {
      index: "./src/index.tsx",
    },

    output: {
      filename: MODE_DEVELOPMENT ? "[name].js" : `[name].${gitHash}.js`,
      chunkFilename: "[contenthash].js",
      path: __dirname + "/public",
      publicPath: PUBLIC_PATH,
      globalObject: /* This is small workaround for workers scope and HotModuleReplacementPlugin */ MODE_DEVELOPMENT
        ? "this"
        : undefined,
    },

    // TODO: Read and use https://webpack.js.org/plugins/split-chunks-plugin/#optimization-splitchunks
    // optimization: {
    //   splitChunks: {
    //     chunks: "all",
    //   },
    // },

    plugins,

    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: [
            ...(MODE_DEVELOPMENT
              ? [
                  // Do not use Babel during development
                ]
              : [
                  // Uncomment this to enable Babel
                  /*
                  {
                    loader: "babel-loader",
                    options: {
                      babelrc: false,                   
                    },
                  },
                  */
                ]),
            {
              loader: "ts-loader",
              options: {
                // IMPORTANT! use transpileOnly mode to speed-up compilation
                // During development fork-ts-checker-webpack-plugin performs typechecking
                transpileOnly: MODE_DEVELOPMENT ? true : false,
                compilerOptions: MODE_DEVELOPMENT
                  ? {
                      // Do not downgrade so much to speedup development builds
                      target: "ES2018",
                      downlevelIteration: false,
                    }
                  : {
                      // No special options for production build
                    },
              },
            },
          ],
        },
        {
          test: /\.svg$/,
          use: [
            {
              loader: "@svgr/webpack",
              options: {
                // prettier: false,
                svgo: true, // actionHand.svg was optimized incorrectly
              },
            },
          ],
        },
        /*
        // Uncomment this lines if you really need file-loader
        {
          test: /\.(png|jpg|gif)$/,
          use: ["file-loader?name=img/[hash].[ext]"],
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: ["file-loader?name=fonts/[hash].[ext]"],
        },
        */
      ],
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".json"],
    },

    devServer,
  };
};

module.exports = config;
