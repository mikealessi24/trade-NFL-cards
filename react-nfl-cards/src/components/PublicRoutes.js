import React from "react";
import { Router } from "@reach/router";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";

export default function PublicRoutes({ setSignedIn }) {
  return (
    <div>
      <Router>
        <SignIn default setSignedIn={setSignedIn} />
        <SignUp path="/signup" />
      </Router>
    </div>
  );
}
