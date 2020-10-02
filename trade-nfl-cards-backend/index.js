const sql = require("mysql2/promise");
require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

const pool = sql.createPool({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
});

//create a user
app.post("/user", async (request, response) => {
  try {
    if (!request.body.username || !request.body.password) {
      return response.status(401).send({ message: "No username or password" });
    }
    const username = request.body.username;
    const password = request.body.password;
    const salt = await bcrypt.genSalt();
    const hashedpw = await bcrypt.hash(password, salt);

    const conn = await pool.getConnection();

    const queryResponse = conn.execute(
      `INSERT INTO fbcardsdb.users (username, password) VALUES (?,?)`,
      [username, hashedpw]
    );

    conn.release();
    response.status(201).send(queryResponse);
  } catch (error) {
    response.status(500).send(error);
    console.log(error);
  }
});

app.post("/login", async (request, response) => {
  try {
    if (!request.body.username || !request.body.password) {
      return response.status(401).send({ message: "No username or password" });
    }
    const username = request.body.username;
    const password = request.body.password;

    const conn = await pool.getConnection();

    const queryResponse = await conn.query(
      `SELECT * FROM fbcardsdb.users WHERE username =?`,
      [username]
    );

    const userFound = queryResponse[0][0];

    if (!userFound) {
      return response.status(401).send({ message: "No user found" });
    } else {
      if (await bcrypt.compare(password, userFound.password)) {
        const token = jwt.sign(
          { username: userFound.username },
          process.env.ACCESS_TOKEN
        );

        response.status(200).send({ message: "login successful", jwt: token });
      } else {
        response.status(401).send({ message: "incorrect password" });
      }
    }
    conn.release();
  } catch (error) {
    response.status(500).send(error);
    console.log(error);
  }
});

app.listen(4000, () => console.log("server is running on 4000"));
