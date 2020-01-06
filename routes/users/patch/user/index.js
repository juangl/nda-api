const debug = require('debug')('patchUser');
const { compose } = require('compose-middleware');
const {
  db,
  shapes,
  general: { respond },
} = require('../../../../utils');
const {
  authorize,
  sanitizer: createSanitizer,
} = require('../../../../middlewares');

const sanitizer = createSanitizer(shapes.user);

const handler = async (req, res) => {
  const userId = req.locals.user.id;
  const patch = req.body;
  const fields = Object.keys(patch);
  if (!fields.length)
    return respond(new Error('Invalid patch'), res, () => {
      debug(
        `User with id ${userId} has failed by patching its profile because didn't respect the allowed shape`,
      );
    });
  respond(await db.utils.patch('users', userId, patch), res, err => {
    if (err) return debug(`Error while pathing the user with id ${userId}`);
    debug(`The user with id ${userId} was patched successfuly`);
  });
};

module.exports = compose([authorize, sanitizer, handler]);
