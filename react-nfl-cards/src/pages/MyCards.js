import React, { useState, useEffect } from "react";
import axios from "axios";
import FbCard from "../components/FbCard";

export default function MyCards({ signedIn, available, setAvailable }) {
  const [cards, setCards] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .post("http://localhost:4000/getownedcards", {
        jwt: signedIn,
      })
      .then((response) => {
        setCards(response.data);
      });
  }, [cards]);

  useEffect(() => {
    axios
      .post("http://localhost:4000/getallusers", {
        jwt: signedIn,
      })
      .then((response) => setUsers(response.data));
  }, []);

  return (
    <div style={style.page}>
      <div style={style.cardCont}>
        {cards.map((card) => {
          return (
            <FbCard
              key={card.id}
              signedIn={signedIn}
              card={card}
              users={users}
              available={available}
              setAvailable={setAvailable}
            />
          );
        })}
      </div>
    </div>
  );
}

const style = {
  cardCont: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },
  page: {
    minHeight: "100vh",
  },
};
