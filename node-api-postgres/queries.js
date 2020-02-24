const axios = require("axios");
const Pool = require("pg").Pool;
const pool = new Pool({
  user: "me",
  host: "localhost",
  database: "happy",
  password: "password",
  port: 5432
});

const getSites = (request, response, next) => {
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
    Promise.all(
      results.rows.map(({ name, urls }) =>
        axios.all(
          urls.map(url =>
            axios.get(url).then(response => [name, url, response.status])
          )
        )
      )
    ).then(results => {
      const flat = results
        .reduce((acc, list) => [...list])
        .reduce((acc, [name, url, status]) => {
          const current = acc[name] || {};
          current[url] = status;
          acc[name] = current;
          return acc;
        }, {});
      response.status(200).json(flat);
    });
  });
};

module.exports = {
  getSites,
  checkSites
};
