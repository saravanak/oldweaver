// This file handles the JS build.
// It will run webpack with babel over all JS defined in the main entry file.

// main entry point name
const ENTRY_FILE_NAME = 'multiplication.js'
const path = require('path')

const WebpackCompiler = require('../assets/scripts/webpack-compiler');

module.exports = class extends WebpackCompiler {
    async data() {
        const entryPath = path.join(__dirname, `/${ENTRY_FILE_NAME}`)
        const outputPath = path.resolve(__dirname, '../../memory-fs/js/')
        const entryName = path.basename(ENTRY_FILE_NAME, path.extname(ENTRY_FILE_NAME));
        
        return {
            permalink: `/assets/scripts/${ENTRY_FILE_NAME}`,
            eleventyExcludeFromCollections: true,
            webpackConfig: this.webpackConfig({entryPath, outputPath, entryName, exportAslib: true}),
            entryFile: ENTRY_FILE_NAME
        }
    }

}
