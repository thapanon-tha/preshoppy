require("dotenv").config({
    silent: process.env.NODE_ENV === "production" 
});

const mariadb = require("mariadb");

const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

pool.on(
    "connection", 
    (conn) => 
        console.log(`connection ${conn.threadId} has been created in pool`)
);

const mod = {};
mod.rawExec = async (command, values) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const result = await conn.query(command, values);
        conn.release();
        return result;
    } catch (err) {
        throw err;
    } finally {
        if (conn) conn.end();
    }
};
mod.exec = (parts, ...keys) => mod.rawExec(parts.join("?"), keys);

module.exports = mod;
