const debug = require('debug')('deleteItem');
const { compose } = require('compose-middleware');
const { authorize, grantAccess } = require('../../../../middlewares');

const handler = async (req, res) => {};

module.exports = compose([authorize, grantAccess, handler]);
