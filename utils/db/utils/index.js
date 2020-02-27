const db = require('../db');

module.exports = {
  patch: require('./patch')(db),
  queries: require('./queries'),
  delete: require('./delete')(db),
  insert: require('./insert')(db),
  ensureInsertion: require('./ensureInsertion'),
  ensureExistance: require('./ensureExistance')(db),
};
