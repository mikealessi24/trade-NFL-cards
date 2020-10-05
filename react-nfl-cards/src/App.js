import React, { useState } from "react";
import SignIn from "./pages/SignIn";
import PrivateRoutes from "./components/PrivateRoutes";
import PublicRoutes from "./components/PublicRoutes";

function App() {
  const [signedIn, setSignedIn] = useState(undefined);
  return (
    <div>
      {!signedIn ? (
        <PublicRoutes setSignedIn={setSignedIn} />
      ) : (
        <PrivateRoutes setSignedIn={setSignedIn} signedIn={signedIn} />
      )}
    </div>
  );
}

export default App;
