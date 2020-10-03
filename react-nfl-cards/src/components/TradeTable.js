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
    width: "100%",
  },
});

export default function CardTable() {
  const classes = useStyles();

  return (
    <TableContainer style={style.tableCont} component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="right">Position</TableCell>
            <TableCell align="right">Team</TableCell>
            <TableCell align="right">Card Owner</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* {cards.map((card) => ( */}
          <TableRow>
            <TableCell component="th" scope="row">
              trade
            </TableCell>
            <TableCell align="right">trade</TableCell>
            <TableCell align="right">trade</TableCell>
            <TableCell align="right">trade</TableCell>
          </TableRow>
          {/* ))} */}
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
