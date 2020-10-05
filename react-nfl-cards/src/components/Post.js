import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    width: "90%",
    height: "12%",
    margin: "10px",
    overflow: "scroll",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function Post({ post }) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root}>
      <CardContent style={style.content}>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          //{post.creator}
        </Typography>
        <Typography style={style.text} variant="body2" component="p">
          {post.text}
        </Typography>
      </CardContent>
    </Card>
  );
}

const style = {
  content: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  text: {
    marginLeft: "25px",
  },
};
