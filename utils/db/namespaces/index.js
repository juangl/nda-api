const db = require('../db');

module.exports = {
  users: require('./users')(db),
  orders: require('./orders')(db),
  stores: require('./stores')(db),
  products: require('./products')(db),
  likedItems: require('./likedItems')(db),
};
