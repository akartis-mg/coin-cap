import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { createChart, CrosshairMode } from "lightweight-charts";
import axios from "axios";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid";

export default function Chart({
  market,
  selectedMarket,
  setSelectedMarket,
  exchanges,
  selectedExchange,
  setSelectedExchange,
}) {
  const chartContainerRef = useRef();
  const chart = useRef();
  const resizeObserver = useRef();
  const [value, setValue] = React.useState("1");
  const candleSeries = useRef();

  const [test, setTest] = useState();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const formatPercent = (number) => `${new Number(number).toFixed(2)}%`;

  async function fetchData() {
    const res = await axios.get(
      "/candles?exchange=binance&interval=h1&baseId=ethereum&quoteId=tether"
    );

    const cdata = res.data.data
      .sort((a, b) => (a.period > b.period ? 1 : -1))
      .map((d) => {
        return {
          time: d.period / 1000,
          open: parseFloat(formatPercent(d.open)),
          high: parseFloat(formatPercent(d.high)),
          low: parseFloat(formatPercent(d.low)),
          close: parseFloat(formatPercent(d.close)),
        };
      });

    setTest(cdata);

    handleDataChart(cdata);
  }

  const handleDataChart = (cdata) => {
    candleSeries.current.setData(cdata);
  }

  async function fetchDataBase(baseId, quoteId) {
    let eId;

    if (selectedMarket) {
      eId = selectedExchange.exchangeId;
    } else {
      eId = "binance"
    }

    const res = await axios.get(
      `/candles?exchange=${eId}&interval=h1&baseId=${baseId}&quoteId=${quoteId}`
    );

    const cdata = res.data.data
      .sort((a, b) => (a.period > b.period ? 1 : -1))
      .map((d) => {
        //console.log(parseFloat(formatPercent(d.open)))
        return {
          time: d.period / 1000,
          open: parseFloat(formatPercent(d.open)),
          high: parseFloat(formatPercent(d.high)),
          low: parseFloat(formatPercent(d.low)),
          close: parseFloat(formatPercent(d.close)),
        };
      });

    setTest(cdata);

    handleDataChart(cdata);
  }

  async function fetchDataExchange(exchangeId) {
    let bId;
    let qId;

    if (selectedMarket) {
      bId = selectedMarket.baseId;
      qId = selectedMarket.quoteId;
    } else {
      bId = "bitcoin"
      qId = "tether"
    }

    const res = await axios.get(
      `/candles?exchange=${exchangeId}&interval=h1&baseId=${bId}&quoteId=${qId}`
    );

    const cdata = res.data.data
      .sort((a, b) => (a.period > b.period ? 1 : -1))
      .map((d) => {
        //console.log(parseFloat(formatPercent(d.open)))
        return {
          time: d.period / 1000,
          open: parseFloat(formatPercent(d.open)),
          high: parseFloat(formatPercent(d.high)),
          low: parseFloat(formatPercent(d.low)),
          close: parseFloat(formatPercent(d.close)),
        };
      });

    setTest(cdata);

    handleDataChart(cdata);
  }

  useEffect(() => {
    if (value == "1") {
      chart.current = createChart(chartContainerRef.current, {
        width: chartContainerRef.current.clientWidth,
        height: 300,
        layout: {
          backgroundColor: "#253248",
          textColor: "rgba(255, 255, 255, 0.9)",
        },
        grid: {
          vertLines: {
            color: "#334158",
          },
          horzLines: {
            color: "#334158",
          },
        },
        crosshair: {
          mode: CrosshairMode.Normal,
        },
        priceScale: {
          borderColor: "#485c7b",
        },
        timeScale: {
          borderColor: "#485c7b",
          timeVisible: true,
          secondsVisible: false,
        },
      });

      candleSeries.current = chart.current.addCandlestickSeries({
        upColor: "#4bffb5",
        downColor: "#ff4976",
        borderDownColor: "#ff4976",
        borderUpColor: "#4bffb5",
        wickDownColor: "#838ca1",
        wickUpColor: "#838ca1",
      });

      fetchData();
    }
  }, []);

  // Resize chart on container resizes.
  useEffect(() => {
    resizeObserver.current = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      chart.current.applyOptions({ width, height });
      setTimeout(() => {
        chart.current.timeScale().fitContent();
      }, 0);
    });

    resizeObserver.current.observe(chartContainerRef.current);

    return () => resizeObserver.current.disconnect();
  }, []);

  const handleChangeMarket = (event) => {
    setSelectedMarket(event.target.value);

    fetchDataBase(event.target.value.baseId, event.target.value.quoteId);
  };

  const handleChangeExchange = (event) => {
    setSelectedExchange(event.target.value);

    fetchDataExchange(event.target.value.exchangeId);
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Chart" value="1" />
            <Tab label="Prices" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            <Grid item xs={12}>
              <FormControl style={{ margin: 10 }} sx={{ m: 1, minWidth: 150 }}>
                <InputLabel id="demo-simple-select-label">Market</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedMarket}
                  label="Market"
                  onChange={handleChangeMarket}
                >
                  {market &&
                    market.map((m) => (
                      <MenuItem value={m}>
                        {m.baseSymbol}/{m.quoteSymbol}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
              <FormControl style={{ margin: 10 }} sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-label">Exchange</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedExchange}
                  label="Exchange"
                  onChange={handleChangeExchange}
                >
                  {exchanges &&
                    exchanges.map((ex) => (
                      <MenuItem value={ex}>{ex.name}</MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <div ref={chartContainerRef} style={{ flex: 1 }}></div>
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value="2">Prices</TabPanel>
      </TabContext>
    </Box>
  );
}
