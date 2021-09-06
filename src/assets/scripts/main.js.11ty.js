// This file handles the JS build.
// It will run webpack with babel over all JS defined in the main entry file.

// main entry point name
const ENTRY_FILE_NAME = 'main.js'
const path = require('path')

const WebpackCompiler = require('./webpack-compiler');

module.exports = class extends WebpackCompiler {
    async data() {
        const entryPath = path.join(__dirname, `/${ENTRY_FILE_NAME}`)
        const outputPath = path.resolve(__dirname, '../../memory-fs/js/')
        const entryName = 'main';

        return {
            permalink: `/assets/scripts/${ENTRY_FILE_NAME}`,
            eleventyExcludeFromCollections: true,
            webpackConfig: this.webpackConfig({entryPath, outputPath, entryName}),
            entryFile: ENTRY_FILE_NAME
        }
    }

}
