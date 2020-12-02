require("dotenv").config({ silent: process.env.NODE_ENV === "production" });
const mariadb = require("mariadb");

const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

module.exports = {
  sql: async function (strings, ...keys) {
    let conn, result;
    try {
      conn = await pool.getConnection();
      result = await conn.query(strings.join("?"), keys);
      conn.release();
      return result;
    } catch (err) {
      throw err;
    } finally {
      if (conn) conn.end();
    }
  },
};
