module.exports = db => async userId => {
  const mainUser = (
    await db.query(`
  SELECT a.id, a.email, a.firstName, a.lastName, a.phoneNumber, b.name as role FROM
    (SELECT * FROM users
    WHERE id=${userId}) a
  LEFT JOIN roles b ON
  a.roleId=b.id
`)
  )[0][0];
  return mainUser;
};
