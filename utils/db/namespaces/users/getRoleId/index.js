module.exports = db => async type =>
  (await db.query(`SELECT id as roleId FROM roles WHERE name="${type}"`))[0]
    .roleId;
