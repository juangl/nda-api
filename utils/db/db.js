const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
});

function query(query) {
  return new Promise((resolve, reject) =>
    connection.query(query, (err, results, fields) => {
      if (err) return reject(err);
      resolve({
        results,
        fields,
      });
    }),
  );
}

function execute(query, data) {
  return new Promise((resolve, reject) =>
    connection.execute(query, data, (err, results, fields) => {
      if (err) return reject(err);
      resolve({
        results,
        fields,
      });
    }),
  );
}

module.exports = {
  query,
  execute,
};
