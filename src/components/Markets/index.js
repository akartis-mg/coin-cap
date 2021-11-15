import React, { useEffect, useState } from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";
import Title from "../Title"
import './style.css'


function Markets({ data, setSelectedMarket }) {
  const formatPercent = (number) => `${new Number(number).toFixed(2)}%`;

  return (
    <>
      <Title data={data}>Markets</Title>
      <TableContainer sx={{ maxHeight: 300 }}>
        <Table stickyHeader size="small">
          <TableHead className="cell__table">
            <TableRow >
              <TableCell style={{ fontWeight: "bold" }}>Symbol</TableCell>
              <TableCell style={{ fontWeight: "bold" }} >Price Quote</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>24Hr Volume %</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data
                .sort((a, b) => parseFloat(formatPercent(a.percentExchangeVolume)) > parseFloat(formatPercent(b.percentExchangeVolume)) ? -1 : 1)
                .map((m, i) => (
                  <TableRow hover key={i} onClick={() => setSelectedMarket(m)}>
                    <TableCell>
                      <span>{m.baseSymbol}/{m.quoteSymbol} <br />{m.exchangeId}</span>
                    </TableCell>
                    <TableCell>
                      {parseFloat(formatPercent(m.priceQuote))}
                    </TableCell>
                    <TableCell>
                      {parseFloat(formatPercent(m.percentExchangeVolume))}
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default Markets;
