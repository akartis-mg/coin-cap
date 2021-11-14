import React, { useEffect, useState } from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";
import axios from "axios";

// function createData(rank, exchangeId, exchangeUrl, name, percentTotalVolume, volumeUsd) {
//     return { rank, exchangeId, exchangeUrl, name, percentTotalVolume, volumeUsd };
//   }

function Markets({data}) {
  const [market, setMarket] = useState([]);


  return (
    <>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              <TableCell>Symbol</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.map((m) => (
                <TableRow key={m.exchangeId}>
                  <TableCell>
                    {m.baseSymbol}/{m.quoteSymbol}
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
