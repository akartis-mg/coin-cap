import React, { useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { createChart, CrosshairMode } from "lightweight-charts";
import axios from "axios";
import moment from "moment";
export default function Chart() {
  const chartContainerRef = useRef();
  const chart = useRef();
  const resizeObserver = useRef();
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const chartProperties = {
    width: 1000,
    height: 600,
    crosshair: {
      mode: "normal",
    },
    timeScale: {
        timeVisible: true,
    secondsVisible: false,
    },
  };

  const formatPercent = (number) => `${new Number(number).toFixed(2)}%`;

  useEffect(() => {
    chart.current = createChart(chartContainerRef.current, {
      width: 500,
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

    //console.log(chart.current);

    const candleSeries = chart.current.addCandlestickSeries({
      upColor: "#4bffb5",
      downColor: "#ff4976",
      borderDownColor: "#ff4976",
      borderUpColor: "#4bffb5",
      wickDownColor: "#838ca1",
      wickUpColor: "#838ca1",
    });

    async function fetchData() {
      const res = await axios.get(
        "/candles?exchange=binance&interval=h1&baseId=bitcoin&quoteId=tether"
      );

      const cdata = res.data.data
        .sort((a, b) => (a.period > b.period ? 1 : -1))
        .map((d) => {
          //console.log(parseFloat(formatPercent(d.open)))
          return {
            time: d.period/1000,
            open: parseFloat(formatPercent(d.open)),
            high: parseFloat(formatPercent(d.high)),
            low: parseFloat(formatPercent(d.low)),
            close: parseFloat(formatPercent(d.close)),
          };
        });

      candleSeries.setData(cdata);
    }

    fetchData();

    //candleSeries.setData(priceData);

    // const areaSeries = chart.current.addAreaSeries({
    //   topColor: 'rgba(38,198,218, 0.56)',
    //   bottomColor: 'rgba(38,198,218, 0.04)',
    //   lineColor: 'rgba(38,198,218, 1)',
    //   lineWidth: 2
    // });

    // areaSeries.setData(areaData);
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
          <div ref={chartContainerRef} style={{ flex: 1 }}></div>
        </TabPanel>
        <TabPanel value="2">Prices</TabPanel>
      </TabContext>
    </Box>
  );
}
