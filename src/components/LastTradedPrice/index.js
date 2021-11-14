import React, { useRef, useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";
import { io } from "socket.io-client";
import { w3cwebsocket as W3CWebSocket } from "websocket";

function LastTradedPrice({ tab, selectedExchange }) {
  const [price, setprice] = useState([]);
  const [priceNew, setpriceNew] = useState([]);
  let myArr;
  // const endPoint = `wss://ws.coincap.io/trades/${selectedExchange.exchangeId}`;
  const endPoint = `wss://ws.coincap.io/trades/binance`;
  const client = useRef(null);
  console.log("segfe", endPoint);
  useEffect(() => {
    client.current = new W3CWebSocket(endPoint);

    // socket.current.on("onmessage")
    if (tab == "2") {
      client.current.onmessage = function (msg) {
        // console.log(JSON.parse(msg.data));
        myArr = JSON.parse(msg.data);
        //console.log("my arr", myArr.base);
        setpriceNew(JSON.parse(msg.data));
        /*const objIndex = market.findIndex(
              (obj) => obj.baseId == myArr.base && obj.quoteId == myArr.quote
            );*/
        //market[objIndex].priceQuote = myArr.price;
        //console.log("my market", market);
      };
    }
  }, []);

  useEffect(() => {
    //console.log(price);
    if (tab == "2") {
      const objIndex = price.findIndex(
        (obj) => obj.base == priceNew.base && obj.quote == priceNew.quote
      );
      if (objIndex != -1) {
        price[objIndex].price = priceNew.price;
      } else {
        priceNew && setprice((prev) => [...prev, priceNew]);
      }
    }
  }, [priceNew, client, tab, selectedExchange]);

  return (
    <div>
      <TableContainer sx={{ maxHeight: 300 }}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
           
              <TableCell>Base</TableCell>
              <TableCell>Quote</TableCell>
              <TableCell>Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {price &&
              price.map((m, i) => (
                <TableRow key={i} hover>
                
                  <TableCell>{m.base}</TableCell>
                  <TableCell>{m.quote}</TableCell>
                  <TableCell>{m.price}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default LastTradedPrice;
