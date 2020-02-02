const debug = require('debug')('patchUser');
const { compose } = require('compose-middleware');
const { db, shapes } = require('../../../../utils');
const {
  authorize,
  sanitizer: createSanitizer,
} = require('../../../../middlewares');

const sanitizer = createSanitizer(shapes.user);

const handler = async (req, res) => {
  try {
    const userId = req.locals.user.id;
    const patch = req.body;
    const fields = Object.keys(patch);
    if (!fields.length)
      return res.respond(new Error('Invalid patch'), () => {
        debug(
          `User with id ${userId} has failed by patching its profile because didn't respect the allowed shape`,
        );
      });
    res.respond(await db.utils.patch('users', userId, patch), err => {
      if (err) return debug(`Error while pathing the user with id ${userId}`);
      debug(`The user with id ${userId} was patched successfuly`);
    });
  } catch (e) {
    res.respond(e);
  }
};

module.exports = compose([authorize, sanitizer, handler]);
