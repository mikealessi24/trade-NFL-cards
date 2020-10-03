import React, { useState, useEffect } from "react";
import CardTable from "../components/CardTable";
import axios from "axios";
import HomeDrawer from "../components/HomeDrawer";

export default function Home({ setSignedIn, signedIn }) {
  const [cards, setcards] = useState([]);
  useEffect(() => {
    axios
      .post("http://localhost:4000/getallcards", {
        jwt: signedIn,
      })
      .then((response) => {
        setcards(response.data);
      });
  }, []);
  return (
    <div style={style.homePage}>
      <div style={style.forum}></div>
      <div>
        <CardTable cards={cards} />
      </div>
    </div>
  );
}

const style = {
  homePage: {
    display: "flex",
    margin: 25,
  },
  forum: {
    width: "50%",
  },
};
