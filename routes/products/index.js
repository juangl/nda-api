const get = require('./get');
let router = require('../../utils/router');

router = router(['products']);

// Get products by search
router.get('/', get.productsBySearch);

router.get('/filters', get.productFilters);

router.addErrorHandlerMiddleware();

module.exports = router;
