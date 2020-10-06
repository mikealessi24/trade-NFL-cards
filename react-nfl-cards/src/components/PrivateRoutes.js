import React, { useState } from "react";
import { Router } from "@reach/router";
import Home from "../pages/Home";
import Navbar from "./Navbar";
import MyCards from "../pages/MyCards";
import Trades from "../pages/Trades";
import CardForum from "../pages/CardForum";
import AddCard from "../pages/AddCard";

export default function PrivateRoutes({ setSignedIn, signedIn }) {
  const [available, setAvailable] = useState([]);

  return (
    <div style={style.background}>
      <Navbar setSignedIn={setSignedIn} signedIn={signedIn} />
      <Router>
        <Home path="/home" signedIn={signedIn} />
        <MyCards
          path="/mycards"
          available={available}
          setAvailable={setAvailable}
          signedIn={signedIn}
        />
        <Trades path="/trades" signedIn={signedIn} />
        <CardForum
          path="/cardforum"
          signedIn={signedIn}
          available={available}
        />
        <AddCard path="/addcard" signedIn={signedIn} />
      </Router>
    </div>
  );
}

const style = {
  background: {
    backgroundImage:
      "url('https://previews.123rf.com/images/sittipong/sittipong1401/sittipong140100059/25235868-green-artificial-turf-pattern-texture-for-background.jpg')",
    backgroundSize: "100vw",
    bagroundPosition: "center",
    backgroundRepeat: "repeat",
  },
};
