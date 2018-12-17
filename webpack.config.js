const path = require('path');

module.exports = {
    entry: './build/src/telepub.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),

        libraryTarget: 'umd'
    }
};
