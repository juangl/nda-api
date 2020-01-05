const db = require('./db');

module.exports = {
  utils: require('./utils')(db),
  namespaces: require('./namespaces')(db),
};
