const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
});

function query(query) {
  return new Promise((resolve, reject) =>
    connection.query(query, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    }),
  );
}

function execute(query, data) {
  return new Promise((resolve, reject) =>
    connection.execute(query, data, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    }),
  );
}

module.exports = {
  query,
  execute,
};
