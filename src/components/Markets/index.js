import React, { useEffect, useState } from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import axios from "axios";

// function createData(rank, exchangeId, exchangeUrl, name, percentTotalVolume, volumeUsd) {
//     return { rank, exchangeId, exchangeUrl, name, percentTotalVolume, volumeUsd };
//   }

function Markets() {
  const [exchanges, setExchanges] = useState([]);

  //call
  /*useEffect(() => {
    async function fetchData() {
      const request = await axios.get("/exchanges").then(
        (response) => {
          setExchanges(response.data);
          console.log(response.data);
        },
        (error) => {
          console.log(error);
        }
      );

      return request;
    }

    fetchData();
  }, []);*/

  useEffect(() => {
  
     axios.get("/exchanges").then(
        (response) => {
          setExchanges(response.data);
          console.log(response.data);
        },
        (error) => {
          console.log(error);
        }
      );

    
   
  }, []);



  return (
    exchanges &&  (
      <div>
        <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
          
          </TableRow>
        </TableHead>
        <TableBody>
            {/* {exchanges &&
            exchanges.map(ex => (

              <TableRow key={ex.exchangeId}>
                <TableCell>{ex.exchangeId}</TableCell>
              
            
              </TableRow>
            ))} */}
        </TableBody>
      </Table>
      </div>
    )
  );
}

export default Markets;
