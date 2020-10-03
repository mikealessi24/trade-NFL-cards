import React from "react";
import { Router } from "@reach/router";
import Home from "../pages/Home";
import Navbar from "./Navbar";

export default function PrivateRoutes({ setSignedIn }) {
  return (
    <div>
      <Navbar setSignedIn={setSignedIn} />
      <Router>
        <Home path="/home" />
      </Router>
    </div>
  );
}
