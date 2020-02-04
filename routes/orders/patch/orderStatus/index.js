const { compose } = require('compose-middleware');
const { db } = require('../../../../utils');
const {
  authorize,
  grantAccess,
  verifyProperty: createVerifyProperty,
} = require('../../../../middlewares');
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
  res.respond(await db.namespaces.orders.setOrderStatus(id, statusNumber));
};

module.exports = compose([authorize, grantAccess, verifyProperty, handler]);
