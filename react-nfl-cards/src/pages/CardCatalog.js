import React, { useState, useEffect } from "react";
import axios from "axios";
import CatalogCard from "../components/CatalogCard";

export default function CardCatalog({ signedIn }) {
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
    <div style={style.catalogCont}>
      {cards.map((card) => {
        return <CatalogCard card={card} />;
      })}
    </div>
  );
}

const style = {
  catalogCont: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
};
