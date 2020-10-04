import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TradeMenu from "./TradeMenu";

const useStyles = makeStyles({
  root: {
    width: 270,
    margin: 20,
  },
  media: {
    height: 250,
  },
});

export default function FbCard({
  signedIn,
  card,
  users,
  available,
  setAvailable,
}) {
  const classes = useStyles();

  function toggleAvailable() {
    setAvailable(card);
    alert("This card was made available");
  }

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={card.image}
          title="NFL card"
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="h2">
            {card.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {card.position}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {card.team}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <TradeMenu signedIn={signedIn} cardId={card.id} users={users} />
        {/* <Button
          onClick={() => {
            toggleAvailable();
          }}
        >
          Make Available
        </Button> */}
      </CardActions>
    </Card>
  );
}
