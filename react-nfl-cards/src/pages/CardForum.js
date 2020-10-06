import React, { useState, useEffect } from "react";
import CardTable from "../components/CardTable";
import Post from "../components/Post";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import axios from "axios";

export default function CardForum({ signedIn, available }) {
  const [cards, setCards] = useState([]);
  const [posts, setPosts] = useState([]);
  const [textBody, setTextBody] = useState([]);
  useEffect(() => {
    axios
      .post("http://localhost:4000/getallcards", {
        jwt: signedIn,
      })
      .then((response) => {
        setCards(response.data);
      });
  }, []);

  useEffect(() => {
    axios
      .post("http://localhost:4000/getallposts", {
        jwt: signedIn,
      })
      .then((response) => {
        setPosts(response.data);
      });
  }, [posts]);

  function createPost() {
    axios
      .post("http://localhost:4000/post", {
        jwt: signedIn,
        text: textBody,
      })
      .then((response) => console.log(response.data));
  }

  return (
    <div style={style.homePage}>
      <Paper style={style.forum}>
        <div style={style.textContent}>
          {posts.map((post) => {
            return <Post post={post} />;
          })}
        </div>
        <div style={style.textBox}>
          <textarea
            placeholder="Post a message to all owners..."
            style={style.text}
            onChange={(event) => {
              setTextBody(event.target.value);
            }}
          />
        </div>
        <div>
          <Button onClick={() => createPost()}>Create Post</Button>
        </div>
      </Paper>
      <div style={style.table}>
        <CardTable cards={cards} available={available} />
      </div>
    </div>
  );
}

const style = {
  homePage: {
    display: "flex",
    justifyContent: "space-evenly",
    margin: 25,
  },
  forum: {
    width: "47%",
    backgroundColor: "white",
    height: "85vh",
    borderRadius: "3px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  table: {
    width: "47%",
  },
  tableHeader: {
    display: "flex",
    justifyContent: "space-between",
  },
  textBox: {
    width: "90%",
    height: "15%",
  },
  textContent: {
    width: "90%",
    height: "100%",
    margin: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundImage:
      "url('https://www.sohh.com/wp-content/uploads/2020/07/NFL-Symbol-Logo.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    overflow: "scroll",
  },
  text: {
    width: "100%",
    height: "100%",
    resize: "none",
  },
};
