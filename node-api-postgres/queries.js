const Pool = require("pg").Pool;
const pool = new Pool({
  user: "me",
  host: "localhost",
  database: "happy",
  password: "password",
  port: 5432
});

const getSites = (request, response, next) => {
  console.log(pool);
  pool.query("SELECT * FROM apps ORDER BY id DESC", (error, results) => {
    if (error) {
      throw error;
    }
    console.log("it wasn't an error");
    console.log(results);
    response.status(200).json(results.rows);
  });
};

const checkSites = (request, response) => {
  pool.query("SELECT * FROM apps ORDER BY id DESC", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};
module.exports = {
  getSites,
  checkSites
};
