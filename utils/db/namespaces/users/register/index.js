module.exports = db => async ({
  email,
  password,
  firstName,
  lastName,
  phoneNumber,
  roleId,
}) => {
  return await db.query(`
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
};
