import React from "react";
import { Router } from "@reach/router";
import Home from "../pages/Home";
import Navbar from "./Navbar";

export default function PrivateRoutes({ setSignedIn, signedIn }) {
  return (
    <div>
      <Navbar setSignedIn={setSignedIn} signedIn={signedIn} />
      <Router>
        <Home path="/home" setSignedIn={setSignedIn} signedIn={signedIn} />
      </Router>
    </div>
  );
}
