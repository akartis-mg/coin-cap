import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";
import axios from "axios";
function Exchanges({ data, setSelectedExchange }) {
  return (
    <>
      <TableContainer sx={{ maxHeight: 300 }}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Trading Pairs</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.map((ex ,i ) => (
                <TableRow
                  key={i}
                  hover
                  onClick={() => setSelectedExchange(ex)}
                >
                  <TableCell>{ex.rank}</TableCell>
                  <TableCell>{ex.name}</TableCell>
                  <TableCell>{ex.tradingPairs}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default Exchanges;
