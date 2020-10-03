import React from "react";
import { Router } from "@reach/router";
import Home from "../pages/Home";
import Navbar from "./Navbar";
import MyCards from "../pages/MyCards";
import Trades from "../pages/Trades";
import Gallery from "../pages/CardCatalog";
import CardCatalog from "../pages/CardCatalog";

export default function PrivateRoutes({ setSignedIn, signedIn }) {
  return (
    <div>
      <Navbar setSignedIn={setSignedIn} signedIn={signedIn} />
      <Router>
        <Home path="/home" setSignedIn={setSignedIn} signedIn={signedIn} />
        <MyCards path="/mycards" signedIn={signedIn} />
        <Trades path="/trades" />
        <CardCatalog path="/cardcatalog" signedIn={signedIn} />
      </Router>
    </div>
  );
}
