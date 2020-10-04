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

const style = {
  background: {
    backgroundImage:
      "url('https://www.fccnn.com/news/article805616.ece/alternates/BASE_LANDSCAPE/3945147%2Bnfl.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
};

export default App;
