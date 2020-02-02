const { compose } = require('compose-middleware');
const resExtensions = require('./res');

// NOTE: I might add reqExtensions in the future

module.exports = compose([resExtensions]);
