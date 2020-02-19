module.exports = db => async userId => {
  const user = (
    await db.query(`
    SELECT
      a.id,
      a.email,
      a.firstName,
      a.lastName,
      a.phoneNumber,
      b.name as role
    FROM
      (SELECT *
      FROM
        users
      WHERE
        id=${userId}) a
    LEFT JOIN roles b
    ON a.roleId=b.id
  `)
  )[0];

  if (!user) return new Error(`User with id ${userId} does not exist`);

  return user;
};
