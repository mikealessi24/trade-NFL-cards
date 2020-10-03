import React, { useState, useEffect } from "react";
import axios from "axios";
import FbCard from "../components/FbCard";

export default function MyCards({ signedIn }) {
  const [cards, setCards] = useState([]);
  useEffect(() => {
    axios
      .post("http://localhost:4000/getownedcards", {
        jwt: signedIn,
      })
      .then((response) => {
        setCards(response.data);
      });
  }, []);

  return (
    <div style={style.cardCont}>
      {cards.map((card) => {
        return <FbCard key={card.id} card={card} />;
      })}
    </div>
  );
}

const style = {
  cardCont: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
};
