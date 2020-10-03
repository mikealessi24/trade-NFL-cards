import React, { useState, useEffect } from "react";
import TradeTable from "../components/TradeTable";
import axios from "axios";

export default function Trades({ signedIn }) {
  const [trades, setTrades] = useState([]);

  useEffect(() => {
    axios
      .post("http://localhost:4000/gettradedcards", {
        jwt: signedIn,
      })
      .then((response) => setTrades(response.data));
  }, []);
  return (
    <div style={style.tradeCont}>
      <TradeTable trades={trades} />
    </div>
  );
}

const style = {
  tradeCont: {
    height: "95vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};
