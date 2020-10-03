import React from "react";
import { Router } from "@reach/router";
import Home from "../pages/Home";
import Navbar from "./Navbar";
import MyCards from "../pages/MyCards";
import Trades from "../pages/Trades";
import Gallery from "../pages/Gallery";

export default function PrivateRoutes({ setSignedIn, signedIn }) {
  return (
    <div>
      <Navbar setSignedIn={setSignedIn} signedIn={signedIn} />
      <Router>
        <Home path="/home" setSignedIn={setSignedIn} signedIn={signedIn} />
        <MyCards
          path="/mycards"
          setSignedIn={setSignedIn}
          signedIn={signedIn}
        />
        <Trades path="/trades" />
        <Gallery path="/gallery" />
      </Router>
    </div>
  );
}
