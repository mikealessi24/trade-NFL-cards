import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Button from "@material-ui/core/Button";
import { CardMedia } from "@material-ui/core";
import axios from "axios";

const options = [
  "None",
  "Atria",
  "Callisto",
  "Dione",
  "Ganymede",
  "Hangouts Call",
  "Luna",
  "Oberon",
  "Phobos",
  "Pyxis",
  "Sedna",
  "Titania",
  "Triton",
  "Umbriel",
];

const ITEM_HEIGHT = 48;

export default function TradeMenu({ signedIn, cardId, users }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function tradeCard(user) {
    setAnchorEl(null);
    axios
      .post("http://localhost:4000/tradecard", {
        jwt: signedIn,
        recipient: user,
        id: cardId,
      })
      .then((response) => {
        if (response.data.message === "trade successful") {
          alert("Trade Successful");
        }
      });
  }

  return (
    <div>
      <Button
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        Trade
      </Button>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
      >
        {users.map((user) => (
          <MenuItem
            key={user.username}
            onClick={() => tradeCard(user.username)}
          >
            {user.username}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
