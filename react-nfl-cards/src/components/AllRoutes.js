import React, { useState } from "react";
import PublicRoutes from "./PublicRoutes";
import PrivateRoutes from "./PrivateRoutes";

export default function AllRoutes() {
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
