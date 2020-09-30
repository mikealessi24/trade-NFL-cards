const sql = require("mysql2/promise");
require("dotenv").config();
const express = require("express");

const app = express();
app.use(express.json());

const pool = sql.createPool({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
});

app.listen(4000, () => console.log("server is running on 4000"));
