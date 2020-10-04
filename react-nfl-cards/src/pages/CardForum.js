import React, { useState, useEffect } from "react";
import CardTable from "../components/CardTable";
import axios from "axios";

export default function CardForum({ signedIn }) {
  const [cards, setCards] = useState([]);
  useEffect(() => {
    axios
      .post("http://localhost:4000/getallcards", {
        jwt: signedIn,
      })
      .then((response) => {
        setCards(response.data);
      });
  }, []);

  return (
    <div style={style.homePage}>
      <div style={style.forum}>forum maybe</div>
      <div style={style.table}>
        <div style={style.tableHeader}>
          <div style={style.head1}>Player</div>
          <div style={style.head2}>Position</div>
          <div style={style.head3}>Team</div>
          <div style={style.head4}>Owner</div>
        </div>
        <CardTable cards={cards} />
      </div>
    </div>
  );
}

const style = {
  homePage: {
    display: "flex",
    justifyContent: "space-evenly",
    height: "95vh",
    margin: 25,
  },
  forum: {
    width: "47%",
  },
  table: {
    width: "47%",
  },
  tableHeader: {
    display: "flex",
    justifyContent: "space-between",
  },
  head1: {
    marginLeft: "40px",
  },
  head2: {
    marginLeft: "120px",
  },
  head3: {
    marginLeft: "70px",
  },
  head4: {
    marginRight: "10px",
  },
};
