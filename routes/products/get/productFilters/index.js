const { compose } = require('compose-middleware');
const debug = require('debug')('getProductsFilters');
const namespaces = require('../../../../utils/db/namespaces');
const authorize = require('../../../../middlewares/authorize');
const grantAccess = require('../../../../middlewares/grantAccess');

const handler = async (req, res, next) => {
  try {
    res.respond([
      {
        type: 'option',
        filterName: 'category',
        options: await namespaces.products.getProductsCategories(),
      },
      {
        type: 'range',
        filterName: 'priceRange',
        ...(await namespaces.products.getPriceRange()),
      },
    ]);
  } catch (err) {
    next(err);
  }
};

module.exports = compose([authorize, grantAccess, handler]);
