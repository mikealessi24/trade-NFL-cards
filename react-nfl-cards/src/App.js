import React, { useState } from "react";
import SignIn from "./pages/SignIn";
import PrivateRoutes from "./components/PrivateRoutes";

function App() {
  const [signedIn, setSignedIn] = useState(undefined);
  return (
    <div style={style.background}>
      {!signedIn ? (
        <SignIn setSignedIn={setSignedIn} />
      ) : (
        <PrivateRoutes setSignedIn={setSignedIn} signedIn={signedIn} />
      )}
    </div>
  );
}

const style = {};

export default App;
