const sql = require("mysql2/promise");
require("dotenv").config();

const pool = sql.createPool({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
});

(async function testConnection() {
  try {
    // creating a connection
    const conn = await pool.getConnection();
    // do a query...
    console.log("connection is successful", conn);
    // manually release connection otherwise no one else can use the connection
    conn.release();
  } catch (error) {
    console.log(error);
  }
})();
