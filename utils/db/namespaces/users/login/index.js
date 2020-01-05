const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = db => async (email, password) => {
  try {
    const user = (
      await db.query(
        `SELECT id as userId, password FROM users WHERE email="${email}"`,
      )
    )[0][0];
    if (await bcrypt.compare(password, user.password)) {
      return {
        success: true,
        payload: {
          token: jwt.sign({ userId: user.userId }, process.env.JWT_SECRET_KEY, {
            expiresIn: 60 * 60 * 24 * 7,
          }),
        },
      };
    } else {
      return {
        success: false,
        payload: {
          message: 'Wrong password',
        },
      };
    }
  } catch (e) {
    return {
      success: false,
      payload: {
        message: e instanceof Error ? e.message : e,
      },
    };
  }
};
