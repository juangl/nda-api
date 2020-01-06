module.exports = db => async userId => {
  const roleId = (
    await db.query(`
    SELECT roleId FROM users WHERE id=${userId}
  `)
  )[0].roleId;
  return (
    await db.query(`
    SELECT * FROM
      (SELECT * FROM rolespermissions WHERE roleId=${roleId}) a
    LEFT JOIN permissions b ON a.permissionId=b.id;
  `)
  ).map(each => each.permission);
};
