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
    // for all sites, for all queries return status
    // axios.all is returning promise collecting all responses
    // Promise.all is creating promise fulfilled when all "child" promises are fulfilled
    Promise.all(results.rows.map(
        ({name, urls}) => axios.all(
            urls.map(url => axios.get(url).then(response => [name, url, response.status])))
        )
    ).then(results => {
      // when all queries to external servers are finished

      // build response like: {name: {url: status}}
      const flat = results.reduce((acc, list) => [...list]).reduce(
          (acc, [name, url, status]) => {
            const current = acc[name] || {};
            current[url] = status;
            acc[name] = current;
            return acc;
          }, {}
      );
      response.status(200).json(flat);
    });
  });
};

module.exports = {
  getSites,
  checkSites
};
