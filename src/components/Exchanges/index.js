import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";
import Title from "../Title"
import './style.css'
function Exchanges({ data, setSelectedExchange }) {
  const formatPercent = (number) => `${new Number(number).toFixed(2)}%`;

  return (
    <>
      <Title data={data}>Exchanges</Title>
      <TableContainer sx={{ maxHeight: 300 }}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: "bold" }}>#</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Name</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Trading Pairs</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>24Hr Volume %</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data
                .map((ex, i) => (
                  <TableRow
                    key={i}
                    hover
                    onClick={() => setSelectedExchange(ex)}
                  >
                    <TableCell>{ex.rank}</TableCell>
                    <TableCell>{ex.name}</TableCell>
                    <TableCell>{ex.tradingPairs}</TableCell>
                    <TableCell>{parseFloat(formatPercent(ex.percentTotalVolume))}</TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default Exchanges;
