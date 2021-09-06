// This file handles the CSS build.
// It will run Sass and compile all styles defined in the main entry file.

// main entry point name
const ENTRY_FILE_NAME = 'main.scss'

const path = require('path')
const cssesc = require('cssesc')
const BaseRender = require('./base-render');

class MainRender extends BaseRender {
        async data() {
            const entryPath = path.join(__dirname, `/${ENTRY_FILE_NAME}`)
            return {
                permalink: `/assets/styles/main.css`,
                eleventyExcludeFromCollections: true,
                entryPath
            }
        }
}

module.exports = MainRender