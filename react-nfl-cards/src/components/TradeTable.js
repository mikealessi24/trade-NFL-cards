import React, { useEffect, useState } from "react";
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

export default function TradeTable({ trades }) {
  const classes = useStyles();
  console.log(trades);

  return (
    <TableContainer style={style.tableCont} component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableBody style={style.tableBody}>
          {trades.map((trade) => (
            <TableRow key={trade.cardid}>
              <TableCell component="th" scope="row">
                {trade.user}
              </TableCell>
              <TableCell component="th" scope="row">
                TRADED
              </TableCell>
              <TableCell component="th" scope="row">
                {trade.team}
              </TableCell>
              <TableCell component="th" scope="row">
                {trade.position}
              </TableCell>
              <TableCell component="th" scope="row">
                {trade.name}
              </TableCell>
              <TableCell component="th" scope="row">
                TO
              </TableCell>
              <TableCell align="right">{trade.recipient}</TableCell>
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
    width: "85vw",
  },
  tableBody: {},
};
