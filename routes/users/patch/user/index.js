const debug = require('debug')('getUser');
const { compose } = require('compose-middleware');
const { db, shapes } = require('../../../../utils');
const {
  authorize,
  sanitizer: createSanitizer,
} = require('../../../../middlewares');

const sanitizer = createSanitizer(shapes.user);

const handler = async (req, res) => {
  const patch = req.body;
  const fields = Object.keys(patch);
  if (!fields.length)
    return res.status(422).json({
      success: false,
      payload: {
        message: 'invalid patch',
      },
    });
  const patching = await db.patch('users', req.locals.user.id, patch);
  if (!patching) {
    debug('Error while patching the user');
    return res.json({
      success: false,
      payload: {
        message: 'there was an error while trying to update the resource',
      },
    });
  }
  debug('The user was patched successfuly');
  res.json({
    success: true,
  });
};

module.exports = compose([authorize, sanitizer, handler]);
