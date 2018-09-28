require('@babel/register')({
    presets: [
        '@babel/env'
    ]
});

module.exports = require('./build-configs/webpack');
