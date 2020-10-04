import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { navigate } from "@reach/router";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function randomBackground() {
  const arr = [
    "https://images.techhive.com/images/article/2016/12/levis-stadium-san-francisco-49ers-100696976-large.jpg",
    "https://media.bizj.us/view/img/11400443/panthers-fan-fest-2019-mk040*1200xx5505-3097-0-287.jpg",
    "https://sportsnaut.com/wp-content/uploads/2020/05/USATSI_9535680_168386999_lowres-scaled.jpg",
    "https://static.clubs.nfl.com/image/private/t_editorial_landscape_8_desktop_mobile/f_auto/steelers/xvospr8y550o2ghpssym.jpg",
    "https://www.omnihotels.com/-/media/images/hotels/daldtn/destinations/dallas-att-cowboys-stadium.jpg?h=660&la=en&w=1170",
    "https://www.stadiumsofprofootball.com/wp-content/uploads/2016/07/lambeau17_top.jpg",
    "https://www.enjoyillinois.com/assets/Tourism-Operators/images/ChicagoBearsSoldierField.jpg",
    "https://www.stanza.co/api/proxyImage?image=images/nfl-backgrounds/nfl-chiefs.jpg",
    "https://www.stadiumsofprofootball.com/wp-content/uploads/2016/07/century18950.jpg",
    "https://www.gannett-cdn.com/-mm-/b6821c4a0d69dcfbd87f16677c34f13e73f62bf2/c=0-552-5381-3592/local/-/media/2017/09/11/USATODAY/USATODAY/636407374581611188-USP-NFL-KANSAS-CITY-CHIEFS-AT-NEW-ENGLAND-PATRIOT-93589992.JPG?width=660&height=373&fit=crop&format=pjpg&auto=webp",
  ];
  return arr[Math.floor(Math.random() * 10)];
}
console.log(randomBackground());
const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: `url(${randomBackground()})`,
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn({ setSignedIn }) {
  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form
            className={classes.form}
            noValidate
            onSubmit={(event) => {
              event.preventDefault();

              axios
                .post("http://localhost:4000/login", {
                  username: event.target.elements.username.value,
                  password: event.target.elements.password.value,
                })
                .then((response) => {
                  if (response.data.message === "login successful") {
                    setSignedIn(response.data.jwt);
                    navigate("/home");
                  }
                })
                .catch(() => alert("Incorrect username or password"));
            }}
          >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs></Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
