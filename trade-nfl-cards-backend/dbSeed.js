const sql = require("mysql2/promise");
require("dotenv").config();
const players = require("./fbCardsDb");

const pool = sql.createPool({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
});

// (async function testConnection() {
//   try {
//     // creating a connection
//     const conn = await pool.getConnection();
//     // do a query...
//     console.log("connection is successful", conn);
//     // manually release connection otherwise no one else can use the connection
//     conn.release();
//   } catch (error) {
//     console.log(error);
//   }
// })();

// async function populateDb() {
//   try {
//     const conn = await pool.getConnection();
//     conn.query("USE fbcardsdb");
//     players.map((player) => {
//       conn.execute(
//         `INSERT INTO cards (name,position,team,image,owner) VALUES ("${player.name}", "${player.position}", "${player.team}", "${player.image}", "${player.owner}")`
//       );
//     });
//     conn.release();
//   } catch (error) {
//     console.log(error);
//   }
// }

// populateDb();
