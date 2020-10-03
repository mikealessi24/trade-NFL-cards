import React from "react";
import { Router } from "@reach/router";
import Home from "../pages/Home";
import Navbar from "./Navbar";
import MyCards from "../pages/MyCards";
import Trades from "../pages/Trades";
import CardForum from "../pages/CardForum";

export default function PrivateRoutes({ setSignedIn, signedIn }) {
  return (
    <div>
      <Navbar setSignedIn={setSignedIn} signedIn={signedIn} />
      <Router>
        <Home path="/home" signedIn={signedIn} />
        <MyCards path="/mycards" signedIn={signedIn} />
        <Trades path="/trades" signedIn={signedIn} />
        <CardForum path="/cardforum" signedIn={signedIn} />
      </Router>
    </div>
  );
}
