import React, { useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
import InputBase from "@material-ui/core/InputBase";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { navigate } from "@reach/router";

const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

export default function AddCard({ signedIn }) {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [team, setTeam] = useState("");
  const [image, setImage] = useState("");

  function createCard() {
    axios
      .post("http://localhost:4000/createcard", {
        jwt: signedIn,
        name: name,
        position: position,
        team: team,
        image: image,
      })
      .then((response) => {
        if (response.status === 201) {
          alert("Success! Your card was created.");
          navigate("/mycards");
        }
      });
  }

  return (
    <div style={style.page}>
      <Paper style={style.paper}>
        <div>Create your own card</div>
        <FormControl className={classes.margin}>
          <InputLabel htmlFor="demo-customized-textbox">Name</InputLabel>
          <BootstrapInput
            id="demo-customized-textbox"
            onChange={(event) => setName(event.target.value)}
          />
        </FormControl>
        <FormControl className={classes.margin}>
          <InputLabel htmlFor="demo-customized-textbox">Position</InputLabel>
          <BootstrapInput
            id="demo-customized-textbox"
            onChange={(event) => setPosition(event.target.value)}
          />
        </FormControl>
        <FormControl className={classes.margin}>
          <InputLabel htmlFor="demo-customized-textbox">Team</InputLabel>
          <BootstrapInput
            id="demo-customized-textbox"
            onChange={(event) => setTeam(event.target.value)}
          />
        </FormControl>
        <FormControl className={classes.margin}>
          <InputLabel htmlFor="demo-customized-textbox">Image url</InputLabel>
          <BootstrapInput
            id="demo-customized-textbox"
            onChange={(event) => setImage(event.target.value)}
          />
        </FormControl>
        <Button onClick={() => createCard()}>Add</Button>
      </Paper>
    </div>
  );
}

const style = {
  page: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  paper: {
    height: "30%",
    width: "80%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};
