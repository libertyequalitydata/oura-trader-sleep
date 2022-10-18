import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { usePrifina, Op } from "@prifina/hooks";
import { Box, Flex, Grid, Stack, Text } from "@chakra-ui/react";

import Oura from "@prifina/oura";

import axios from "axios";

import AvgSleepScore from "./components/AvgSleepScore";
import Header from "./components/Header";
import PeriodOptions from "./components/PeriodOptions";
import CoinOptions from "./components/CoinOptions";
import PricePerformance from "./components/PricePerformance";
import SleepAndPrice from "./components/SleepAndPrice";
import Options from "./components/Options";
import FooterMessage from "./components/FooterMessage";
const Container = styled.div`
  height: 300px;
  width: 300px;
  border-radius: 10px;
  background: #212121;
  padding: 11px 8px 0px 8px;
  color: #ededed;
`;

// unique appID for the widget....
const appID = "qoMDUuVADSHqScVr9qRmbt";

const asyncFalseData = [
  "summary_date,score",
  "2022-09-26,86",
  "2022-09-25,98",
  "2022-09-24,65",
  "2022-09-23,78",
  "2022-09-22,82",
  "2022-09-21,75",
  "2022-09-20,88",
];

const OuraTraderSleep = (props) => {
  const { onUpdate, Prifina, API, registerHooks } = usePrifina();

  const stage = "dev";

  const [processedAsyncData, setProcessedAsyncData] = useState([]);
  const [period, setPeriod] = useState(6);
  const [average, setAverage] = useState(0);
  const [coins, setCoins] = useState([]);
  const [preferredCoin, setPreferredCoin] = useState(() => {
    const savedPreference = localStorage.getItem("preferredCoin");
    const preferenceOnLoad = JSON.parse(savedPreference);
    return preferenceOnLoad || "";
  });

  const processAsyncData = (data) => {
    console.log("ORIGINAL PROCESS ASYNC DATA", data);

    let filterData = data;

    const keys = filterData[0].split(",");

    console.log("keys", keys);
    filterData.shift();

    filterData = filterData.map((dataLine) => dataLine.split(",")).flat();

    const chunkSize = 2;
    const dataChunks = [];
    for (let i = 0; i < filterData.length; i += chunkSize) {
      const chunk = filterData.slice(i, i + chunkSize);
      dataChunks.push(chunk);
    }

    const result = [];
    dataChunks.forEach((dataChunk) => {
      result.push({
        [keys[0]]: dataChunk[0],
        [keys[1]]: Number(dataChunk[1]),
      });
    });
    setProcessedAsyncData(result);

    console.log("process result", result);

    let average = result.reduce((acc, val) => {
      return acc + val.score / result.length;
    }, 0);

    setAverage(Math.ceil(average));
  };

  console.log("Processed async data", processAsyncData);

  const dataUpdate = async (payload) => {
    console.log("UPDATE", payload);
    if (
      payload.hasOwnProperty("data") &&
      payload.data.hasOwnProperty("content")
    ) {
      if (
        payload.data.dataconnector === "Oura/querySleepSummariesAsync" &&
        payload.data.content.length > 1
      ) {
        processAsyncData(payload.data.content);
      }
      console.log("PAYLOAD DATA", payload);
    }
  };

  const getCoinList = () => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false&price_change_percentage=24h"
      )
      .then((res) => {
        setCoins(res.data);
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  };

  const getCoinDetails = (coin) => {
    axios
      .get(`https://api.coingecko.com/api/v3/coins/${coin}?market_data=true`)
      .then((res) => {
        setPreferredCoin(res.data);
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  };
  const connectToPrifina = async () => {
    // getCoinList();
    onUpdate(appID, dataUpdate);
    registerHooks(appID, [Oura]);

    let d = new Date();

    const ddd = d.setDate(d.getDate() - period);

    const asyncDateStr = new Date(ddd).toISOString().split("T")[0];

    const asyncFilter = {
      ["s3::date"]: {
        [Op.gte]: asyncDateStr,
      },
    };
    console.log("ASYNC FILTER", asyncFilter);

    const asyncResult = await API[appID].Oura.querySleepSummariesAsync({
      filter: asyncFilter,
      fields: "summary_date,score",
    });
    console.log("async result", asyncResult);

    if (stage === "dev") {
      processAsyncData(asyncFalseData);
    }
  };
  useEffect(() => {
    connectToPrifina();
    getCoinList();
    getCoinDetails();
  }, [period]);

  useEffect(() => {
    localStorage.setItem("preferredCoin", JSON.stringify(preferredCoin));
  }, [preferredCoin]);

  const handleChange = (e) => {
    setPeriod(e.target.value);
  };

  console.log("TIME PERIOD", period);
  console.log(average);

  return (
    <Container>
      <Header />
      <Box>
        <Options
          handleChange={handleChange}
          coins={coins}
          getCoinDetails={getCoinDetails}
        />
      </Box>

      <Stack direction="row">
        <AvgSleepScore average={average} />
        {preferredCoin !== "" && period == 6 && (
          <PricePerformance
            preferredCoin={preferredCoin.market_data.price_change_percentage_7d}
          />
        )}
        {preferredCoin !== "" && period == 13 && (
          <PricePerformance
            preferredCoin={
              preferredCoin.market_data.price_change_percentage_14d
            }
          />
        )}
        {preferredCoin !== "" && period == 29 && (
          <PricePerformance
            preferredCoin={
              preferredCoin.market_data.price_change_percentage_30d
            }
          />
        )}
      </Stack>
      <FooterMessage />
    </Container>
  );
};

OuraTraderSleep.displayName = "OuraTraderSleep";

export default OuraTraderSleep;
