module.exports = db => async type => {
  return (
    await db.query(`SELECT id as roleId FROM roles WHERE name="${type}"`)
  )[0][0].roleId;
};
