const { compose } = require('compose-middleware');
const namespaces = require('../../../../utils/db/namespaces');
const authorize = require('../../../../middlewares/authorize');
const grantAccess = require('../../../../middlewares/grantAccess');
const createVerifyProperty = require('../../../../middlewares/verifyProperty');
const { convertStringToStatus, canChangeToStatus } = require('./helpers');

const verifyProperty = createVerifyProperty();

const handler = async (req, res) => {
  const { orderStatus, id } = req.params;
  const statusNumber = convertStringToStatus(orderStatus);
  if (!canChangeToStatus(statusNumber, req.locals.user.role)) {
    throw new Error(
      `The current user can't change the order status to ${orderStatus}`,
    );
  }
  res.respond(await namespaces.orders.setOrderStatus(id, statusNumber));
};

module.exports = compose([authorize, grantAccess, verifyProperty, handler]);
