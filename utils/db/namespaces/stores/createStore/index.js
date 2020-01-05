module.exports = db => async ({ name, category, saying, address, ownerId }) =>
  await db.query(`
    INSERT INTO stores(
      name,
      category,
      saying,
      address,
      ownerId
    )
    VALUES(
      "${name}",
      "${category}",
      "${saying}",
      "${address}",
      ${ownerId}
    );
  `);
