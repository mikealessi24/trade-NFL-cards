const sql = require("mysql2/promise");
require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const { response } = require("express");

const app = express();
app.use(express.json());
app.use(cors());

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

app.post("/getallusers", verifyToken, async (request, response) => {
  try {
    const username = request.decodedToken.username;
    const conn = await pool.getConnection();

    const allUsers = await conn.execute(
      "SELECT * FROM fbcardsdb.users WHERE username!=?",
      [username]
    );

    conn.release();
    response.status(200).send(allUsers[0]);
  } catch (error) {
    response.status(500).send(error);
    console.log(error);
  }
});

app.post("/post", verifyToken, async (request, response) => {
  try {
    const creator = request.decodedToken.username;
    const text = request.body.text;

    const conn = await pool.getConnection();

    const createdPost = await conn.execute(
      "INSERT INTO fbcardsdb.posts (text, creator) VALUES(?,?)",
      [text, creator]
    );

    conn.release();
    response.status(201).send(createdPost);
  } catch (error) {
    response.status(500).send(error);
    console.log(error);
  }
});

app.post("/getallposts", verifyToken, async (request, response) => {
  try {
    const conn = await pool.getConnection();

    allPosts = await conn.query("SELECT * FROM fbcardsdb.posts");

    conn.release();
    response.status(200).send(allPosts[0]);
  } catch (error) {
    response.status(500).send(error);
    console.log(error);
  }
});

app.post("/createcard", verifyToken, async (request, response) => {
  try {
    const owner = request.decodedToken.username;
    const name = request.body.name;
    const position = request.body.position;
    const team = request.body.team;
    const image = request.body.image;

    const conn = await pool.getConnection();

    const createCard = await conn.execute(
      "INSERT INTO fbcardsdb.cards (name,position,team,image,owner) VALUES (?,?,?,?,?)",
      [name, position, team, image, owner]
    );

    conn.release();
    response.status(201).send(createCard);
  } catch (error) {
    response.status(500).send(error);
    console.log(error);
  }
});

app.post("/getallcards", verifyToken, async (request, response) => {
  try {
    const conn = await pool.getConnection();

    const allCards = await conn.execute("SELECT * FROM fbcardsdb.cards");
    // console.log(allCards);
    conn.release();
    response.status(200).send(allCards[0]);
  } catch (error) {
    response.status(500).send(error);
    console.log(error);
  }
});

app.post("/getownedcards", verifyToken, async (request, response) => {
  try {
    const username = request.decodedToken.username;

    const conn = await pool.getConnection();

    const ownedCards = await conn.execute(
      `SELECT * FROM fbcardsdb.cards WHERE owner=?`,
      [username]
    );

    conn.release();
    response.status(200).send(ownedCards[0]);
  } catch (error) {
    response.status(500).send(error);
    console.log(error);
  }
});

app.post("/gettradedcards", verifyToken, async (request, response) => {
  try {
    const conn = await pool.getConnection();

    await conn.query("USE fbcardsdb");
    const tradedCards = await conn.query(`SELECT cards.id, cards.name, cards.team, cards.position, trades.user, trades.recipient 
    FROM cards
    JOIN trades ON cards.id=trades.cardid`);

    conn.release();
    response.status(200).send(tradedCards[0]);
  } catch (error) {
    response.status(500).send(error);
    console.log(error);
  }
});

app.post("/tradecard", verifyToken, async (request, response) => {
  try {
    const username = request.decodedToken.username;
    const recievingUser = request.body.recipient;
    const card = Number(request.body.id);

    const conn = await pool.getConnection();
    const trade = await conn.execute(
      `UPDATE fbcardsdb.cards SET owner=? WHERE id=?`,
      [recievingUser, card]
    );
    conn.release();
    const conn2 = await pool.getConnection();

    const addTrade = await conn2.execute(
      `INSERT INTO fbcardsdb.trades (cardid, user, recipient) VALUES (?,?,?)`,
      [card, username, recievingUser]
    );

    conn2.release();
    response.status(200).send({ message: "trade successful" });
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

function verifyToken(request, response, next) {
  const token = request.body.jwt;
  if (token === null) {
    return response.status(401).send({ message: "token is null" });
  } else {
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, decodedToken) => {
      if (err) {
        return response.stauts(401).send();
      } else {
        request.decodedToken = decodedToken;
        next();
      }
    });
  }
}

app.listen(4000, () => console.log("server is running on 4000"));
