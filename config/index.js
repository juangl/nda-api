const { NODE_ENV } = process.env;
module.exports = require(`./config.${NODE_ENV || 'development'}.js`);