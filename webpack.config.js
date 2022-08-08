"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
/* eslint-disable @typescript-eslint/no-unsafe-call */
require("@nivinjoseph/n-ext");
var Path = require("path");
var autoprefixer = require("autoprefixer");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var HtmlWebpackTagsPlugin = require("html-webpack-tags-plugin");
var CleanWebpackPlugin = require("clean-webpack-plugin").CleanWebpackPlugin;
var TerserPlugin = require("terser-webpack-plugin");
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
var CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
var CompressionPlugin = require("compression-webpack-plugin");
var n_config_1 = require("@nivinjoseph/n-config");
var webpack = require("webpack");
var ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
var env = n_config_1.ConfigurationManager.getConfig("env");
console.log("WEBPACK ENV", env);
var isDev = env === "dev";
var tsLoader = {
    loader: "ts-loader",
    options: {
        configFile: "tsconfig.client.json",
        transpileOnly: true
    }
};
// const tsLintLoader = {
//     loader: "tslint-loader",
//     options: {
//         configFile: "tslint.json",
//         tsConfigFile: "tsconfig.client.json",
//         // typeCheck: true, // this is a performance hog
//         typeCheck: !isDev,
//         emitErrors: true
//     }
// };
var moduleRules = [
    {
        test: /\.(scss|sass)$/,
        use: [
            {
                loader: MiniCssExtractPlugin.loader,
                options: {
                    esModule: false
                }
            },
            {
                loader: "css-loader",
                options: {
                    esModule: false
                }
            },
            {
                loader: "postcss-loader",
                options: {
                    postcssOptions: {
                        plugins: [
                            "postcss-flexbugs-fixes",
                            autoprefixer({
                                // browsers: [
                                //     ">1%",
                                //     "not ie < 9"
                                // ],
                                flexbox: "no-2009"
                            })
                        ]
                    }
                }
            },
            {
                loader: "sass-loader" // compiles Sass to CSS -> depends on node-sass
            }
        ]
    },
    {
        test: /\.css$/,
        use: [
            {
                loader: MiniCssExtractPlugin.loader,
                options: {
                    esModule: false
                }
            },
            {
                loader: "css-loader",
                options: {
                    esModule: false
                }
            }
        ]
    },
    {
        test: /\.(png|jpg|jpeg|gif)$/i,
        use: [
            {
                loader: "url-loader",
                options: {
                    limit: 9000,
                    fallback: "file-loader",
                    esModule: false,
                    name: function (_resourcePath, _resourceQuery) {
                        // `resourcePath` - `/absolute/path/to/file.js`
                        // `resourceQuery` - `?foo=bar`
                        if (process.env.NODE_ENV === "development") {
                            return "[path][name].[ext]";
                        }
                        return "[contenthash]-[name].[ext]";
                        // return "[path][name].[ext]";
                    }
                }
            },
            {
                loader: "@nivinjoseph/n-app/dist/loaders/raster-image-loader.js",
                options: {
                    // urlEncodeLimit: isDev ? 0 : 10000,
                    jpegQuality: 80,
                    pngQuality: 60
                }
            }
        ]
    },
    {
        test: /\.svg$/,
        use: [
            {
                loader: "file-loader",
                options: {
                    esModule: false
                }
            }
        ]
    },
    {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
            isDev ? "file-loader" : {
                loader: "url-loader",
                options: {
                    limit: 9000,
                    fallback: "file-loader"
                }
            }
        ]
    },
    {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [tsLoader]
    },
    // {
    //     test: /\.ts$/,
    //     exclude: /node_modules/,
    //     enforce: "pre",
    //     use: [tsLintLoader]
    // },
    {
        test: /-resolver\.ts$/,
        use: [
            { loader: "@nivinjoseph/n-app/dist/loaders/resolver-loader.js" },
            tsLoader
        ]
    },
    {
        test: /-view-model\.ts$/,
        use: [
            {
                loader: "@nivinjoseph/n-app/dist/loaders/view-model-loader.js",
                options: {
                    hmrView: "renderFuncs" // templates | renderFuncs
                }
            },
            tsLoader
        ]
    },
    {
        test: /-view-model\.js$/,
        use: [
            {
                loader: "@nivinjoseph/n-app/dist/loaders/view-model-loader.js",
                options: {
                    hmrView: "renderFuncs" // templates | renderFuncs
                }
            }
        ]
    },
    {
        test: /\.taskworker\.ts$/,
        use: [
            {
                loader: "worker-loader",
                options: {
                    esModule: false,
                    filename: "[name].[contenthash].worker.js",
                    chunkFilename: "[id].[contenthash].worker.js"
                }
            },
            tsLoader
        ]
    },
    {
        test: /-view\.html$/,
        exclude: [Path.resolve(__dirname, "src/server")],
        use: [
            {
                loader: "@nivinjoseph/n-app/dist/loaders/view-ts-check-loader.js"
                // options: {
                //     debug: true,
                //     debugFiles: [
                //         // Path.resolve("src/client/pages/core/pages/projects/projects-view-model.ts")
                //         // Path.resolve("src/client/pages/settings/manage-org-users/manage-org-users-view-model.ts")
                //         Path.resolve("src/client/pages/core/pages/project/components/project-instagram-user-posts/project-instagram-user-posts-view-model.ts"),
                //         Path.resolve("src/client/pages/core/pages/asset/asset-view-model.ts"),
                //         Path.resolve("src/client/pages/core/pages/facebook-sandbox/components/facebook-sandbox-story-profiles/facebook-sandbox-story-profiles-view-model.ts")
                //     ]
                // }
            },
            {
                loader: "vue-loader/lib/loaders/templateLoader.js"
            },
            {
                loader: "@nivinjoseph/n-app/dist/loaders/view-loader.js"
            },
            {
                loader: "html-loader",
                options: {
                    esModule: false
                }
            }
        ]
    },
    {
        test: /-view\.html$/,
        include: [Path.resolve(__dirname, "src/server")],
        use: [
            {
                loader: "html-loader",
                options: {
                    esModule: false
                }
            }
        ]
    }
];
var plugins = [
    new ForkTsCheckerWebpackPlugin({
        async: isDev,
        typescript: {
            configFile: "tsconfig.client.json",
            configOverwrite: {
                compilerOptions: { skipLibCheck: true, sourceMap: true, inlineSourceMap: false, declarationMap: false }
            }
        }
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
        template: "src/server/controllers/index-view.html",
        filename: "index-view.html",
        // favicon: "src/client/images/wrise-squirrel-colored.png",
        hash: true
    }),
    new HtmlWebpackTagsPlugin({
        append: false,
        usePublicPath: false,
        tags: [
            "/jquery/jquery.min.js"
        ]
    }),
    new MiniCssExtractPlugin({}),
    new webpack.DefinePlugin({
        APP_CONFIG: JSON.stringify({})
    }),
    new webpack.NormalModuleReplacementPlugin(/element-ui[/\\]lib[/\\]locale[/\\]lang[/\\]zh-CN/, "element-ui/lib/locale/lang/en"),
    new webpack.ProvidePlugin(__assign({ $: "jquery" }, Object.keys(require("tslib"))
        .reduce(function (acc, key) {
        acc[key] = ["tslib", key];
        return acc;
    }, {})))
];
if (isDev) {
    // moduleRules.push({
    //     test: /\.js$/,
    //     loader: "source-map-loader",
    //     enforce: "pre"
    // });
    plugins.push(new webpack.WatchIgnorePlugin({
        paths: [/\.js$/, /\.d\.ts$/]
    }));
    plugins.push(new webpack.HotModuleReplacementPlugin());
}
else {
    moduleRules.push({
        test: /\.js$/,
        include: [
            Path.resolve(__dirname, "src/client"),
            Path.resolve(__dirname, "src/sdk")
        ],
        use: {
            loader: "babel-loader",
            options: {
                // presets: [["@babel/preset-env", {
                //     debug: false,
                //     targets: {
                //         // browsers: ["> 1%", "Chrome >= 41"],
                //         chrome: "41" // this is what googles web crawler uses
                //     },
                //     useBuiltIns: "entry",
                //     forceAllTransforms: true,
                //     modules: "commonjs"
                // }]]
                presets: ["@babel/preset-env"]
            }
        }
    });
    plugins.push.apply(plugins, [
        new CompressionPlugin({
            test: /\.(js|css|svg)$/
        })
    ]);
}
module.exports = {
    context: process.cwd(),
    mode: isDev ? "development" : "production",
    target: "web",
    entry: {
        main: ["./src/client/client.ts", isDev ? "webpack-hot-middleware/client" : null].where(function (t) { return t != null; })
    },
    output: {
        filename: "[name].bundle.js",
        chunkFilename: "[name].bundle.js",
        path: Path.resolve(__dirname, "src/client/dist"),
        publicPath: "/"
    },
    devtool: isDev ? "source-map" : false,
    optimization: {
        runtimeChunk: "single",
        splitChunks: {
            chunks: "all"
        },
        minimizer: [
            new TerserPlugin({
                exclude: /(vendors|\.worker)/,
                terserOptions: {
                    keep_classnames: false,
                    keep_fnames: false,
                    safari10: true,
                    mangle: true,
                    output: {
                        comments: false
                    }
                },
                extractComments: false
            }),
            new CssMinimizerPlugin()
        ]
    },
    module: {
        rules: moduleRules
    },
    plugins: plugins,
    resolve: {
        fallback: {
            "stream": require.resolve("stream-browserify")
        },
        extensions: [".ts", ".js"],
        symlinks: false,
        alias: {
            // https://feathericons.com/
            // feather: path.resolve(__dirname, "node_modules/feather-icons/dist/feather-sprite.svg"),
            vue: isDev ? "@nivinjoseph/vue/dist/vue.js" : "@nivinjoseph/vue/dist/vue.runtime.common.prod.js",
            "tslib$": "tslib/tslib.es6.js"
        }
    }
};
