module.exports = db => async ({
  email,
  password,
  firstName,
  lastName,
  phoneNumber,
  roleId,
}) =>
  await db.query(`
    INSERT INTO users(
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
      roleId
    )
    VALUES(
      "${email}",
      "${password}",
      "${firstName}",
      "${lastName}",
      "${phoneNumber}",
      ${roleId});
  `);
