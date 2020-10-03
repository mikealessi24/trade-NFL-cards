import React, { useState, useEffect } from "react";
import axios from "axios";
import GalleryCard from "../components/GalleryCard";

export default function Gallery({ signedIn }) {
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
    <div style={style.galleryCont}>
      {cards.map((card) => {
        return <GalleryCard card={card} />;
      })}
    </div>
  );
}

const style = {
  galleryCont: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
};
