const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = db => async (email, password) => {
  const results = await db.query(
    `SELECT id as userId, password FROM users WHERE email="${email}"`,
  );
  if (!results.length) {
    return new Error(`User does not exist with email ${email}`);
  }
  const user = results[0];
  if (await bcrypt.compare(password, user.password)) {
    return {
      token: jwt.sign({ userId: user.userId }, process.env.JWT_SECRET_KEY, {
        expiresIn: 60 * 60 * 24 * 7,
      }),
    };
  } else {
    return new Error('Wrong password');
  }
};
