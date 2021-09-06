const fs = require('fs')
const webpack = require('webpack')
const html = require('htm')
const { fs: mfs } = require('memfs')
const isProd = process.env.ELEVENTY_ENV === 'production'

class WebpackCompiler {
    // Configure Webpack in Here
    webpackConfig({ entryPath, outputPath, entryName, exportAslib }= {exportAslib: false}) {
        
        // Transform .js files, run through Babel
        const rules = [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env',
                        ["@babel/preset-typescript", { jsxPragma: "h" }], // Add jsxPragma here
                    ],
                        plugins: [
                            '@babel/plugin-transform-runtime',
                            ["@babel/plugin-transform-react-jsx", {
                                "runtime": "automatic",
                                "importSource": "preact"
                            }]

                        ]
                    }
                }
            }
        ]

        // pass environment down to scripts
        const envPlugin = new webpack.EnvironmentPlugin({
            ELEVENTY_ENV: process.env.ELEVENTY_ENV
        })

        const providePlugin = new webpack.ProvidePlugin({
            h: 'htm'
        })

        // Main Config
        const webpackConfig = {
            mode: isProd ? 'production' : 'development',
            entry: {
              [entryName]:  entryPath
            },
            output: { 
                path: outputPath,
            },
            module: { rules },
            plugins: [
                // providePlugin, 
                envPlugin
            ]
        }

        if(exportAslib) {
            webpackConfig.output.library = entryName
        }

        return webpackConfig;
    }



    // Compile JS with Webpack, write the result to Memory Filesystem.
    // this brilliant idea is taken from Mike Riethmuller / Supermaya
    // @see https://github.com/MadeByMike/supermaya/blob/master/site/utils/compile-webpack.js
    compile({ webpackConfig, entryFile }) {
        const compiler = webpack(webpackConfig)
        compiler.outputFileSystem = mfs
        compiler.inputFileSystem = fs
        compiler.intermediateFileSystem = mfs

        console.log({webpackConfig, entryFile});

        return new Promise((resolve, reject) => {
            compiler.run((err, stats) => {
                if (err || stats.hasErrors()) {
                    const errors =
                        err ||
                        (stats.compilation ? stats.compilation.errors : null)

                    reject(errors)
                    return
                }

                mfs.readFile(
                    webpackConfig.output.path + '/' + entryFile,
                    'utf8',
                    (err, data) => {
                        if (err) reject(err)
                        else resolve(data)
                    }
                )
            })
        })
    }

    // render the JS file
    async render({ webpackConfig, entryFile }) {
        try {
            const result = await this.compile({ webpackConfig, entryFile })
            return result
        } catch (err) {
            console.log(err)
            return null
        }
    }
}
module.exports = WebpackCompiler;