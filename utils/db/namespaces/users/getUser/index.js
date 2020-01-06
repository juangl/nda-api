module.exports = db => async userId => {
  const results = await db.query(`
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
  `);

  if (!results.length)
    return new Error(`User with id ${userId} does not exist`);

  return results[0];
};
