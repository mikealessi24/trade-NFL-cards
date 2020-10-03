import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    width: 650,
  },
});

export default function CardTable({ cards }) {
  const classes = useStyles();

  return (
    <TableContainer style={style.tableCont} component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>All Player Cards</TableCell>
            <TableCell align="right">Position</TableCell>
            <TableCell align="right">Team</TableCell>
            <TableCell align="right">Card Owner</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cards.map((card) => (
            <TableRow key={card.id}>
              <TableCell component="th" scope="row">
                {card.name}
              </TableCell>
              <TableCell align="right">{card.position}</TableCell>
              <TableCell align="right">{card.team}</TableCell>
              <TableCell align="right">{card.owner}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const style = {
  tableCont: {
    height: "85vh",
    overflow: "scroll",
  },
};
