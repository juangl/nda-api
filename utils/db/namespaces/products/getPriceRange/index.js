module.exports = db => async () => {
  let range = await db.query(`
      SELECT
        MAX(price) as max,
        MIN(price) as min
      FROM
        products;
  `);

  if (!range.length) {
    return {
      max: null,
      min: null,
    };
  }

  range = range[0];
  
  return {
    min: Number(range.min),
    max: Number(range.max),
  };
};
