const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const fs = require('fs');
const DIST_DIR = path.resolve(__dirname, '../dist');

function getHtmlPages() {
    let files = fs.readdirSync(DEMO_DIR);
    let pages = [];
    for (let file of files) {
        if (file.endsWith('.html')) {
            let entryScript = file.replace('.html', '');
            pages.push(
                new HtmlWebpackPlugin({
                    title: file,
                    filename: 'demo/' + file,
                    template: path.resolve(DIST_DIR, file),
                    chunks: [entryScript]
                })
            );
        }
    }
    return pages;
}

function getEntries() {
    let files = fs.readdirSync(DIST_DIR + '/js');
    let entries = {};
    for (let file of files) {
        if (file.endsWith('.js')) {
            let entryScript = file.replace('.js', '');
            entries[entryScript] = './dist/js/' + file;
        }
    }
    return entries;
}

module.exports = {
    entry: getEntries(),
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './'
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'js/[name].js'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        alias: {
        'fonteditor-core': path.resolve(__dirname, '../node_modules/fonteditor-core/src')
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(DIST_DIR, 'index.html')
        })
      ]
};