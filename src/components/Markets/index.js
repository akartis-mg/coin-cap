import React, { useEffect, useState } from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";
import axios from "axios";

function Markets({ data, setSelectedMarket }) {
  const formatPercent = (number) => `${new Number(number).toFixed(2)}%`;

  return (
    <>
      <TableContainer sx={{ maxHeight: 300 }}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              <TableCell>Symbol</TableCell>
              <TableCell>Price Quote</TableCell>
              <TableCell>24Hr Volume %</TableCell>
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
