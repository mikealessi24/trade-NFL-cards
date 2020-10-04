import React, { useState } from "react";
import { Router } from "@reach/router";
import Home from "../pages/Home";
import Navbar from "./Navbar";
import MyCards from "../pages/MyCards";
import Trades from "../pages/Trades";
import CardForum from "../pages/CardForum";

export default function PrivateRoutes({ setSignedIn, signedIn }) {
  const [available, setAvailable] = useState([]);

  return (
    <div>
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
      </Router>
    </div>
  );
}
