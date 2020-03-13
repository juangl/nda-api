module.exports = db => async () => {
  const categories = await db.query(`
      SELECT
        *
      FROM
        categories;
  `);
  
  return categories;
};
