const debug = require('debug')('deleteItem');
const { compose } = require('compose-middleware');

const handler = async (req, res) => {
  // const
  // debug(``);
};

module.exports = compose([authorize, grantAccess, handler]);
