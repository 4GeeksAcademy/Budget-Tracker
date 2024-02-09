import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import Stack from "react-bootstrap/Stack";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export const Markets = () => {
  const { store, actions } = useContext(Context);

  const [prices, setPrices] = useState({});

  useEffect(() => {
    const fetchBitcoinPrice = () => {
      fetch("https://api.coindesk.com/v1/bpi/currentprice.json")
        .then((response) => response.json())
        .then((data) =>
          setPrices((prevPrices) => ({
            ...prevPrices,
            bitcoin: data.bpi.USD.rate_float,
          }))
        );
    };

    const fetchEthPrice = () => {
      fetch("https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD")
        .then((response) => response.json())
        .then((data) => {
          setPrices((prevPrices) => ({
            ...prevPrices,
            eth: parseFloat(data["USD"]),
          }));
        });
    };

    const fetchBnbPrice = () => {
      fetch("https://min-api.cryptocompare.com/data/price?fsym=BNB&tsyms=USD")
        .then((response) => response.json())
        .then((data) => {
          setPrices((prevPrices) => ({
            ...prevPrices,
            bnb: parseFloat(data["USD"]),
          }));
        });
    };

    fetchBitcoinPrice();
    fetchEthPrice();
    fetchBnbPrice();
    // Then fetch the Bitcoin price every 30 seconds
    const bitcoinIntervalId = setInterval(fetchBitcoinPrice, 60000);
    const ethIntervalId = setInterval(fetchEthPrice, 60000);
    const bnbIntervalId = setInterval(fetchBnbPrice, 60000);

    // Clear the interval when the component unmounts
    return () => {
      clearInterval(bitcoinIntervalId);
      clearInterval(ethIntervalId);
      clearInterval(bnbIntervalId);
    };
  }, []);

  return (
    <>
      <h5 className="mb-3">Crypto Markets</h5>
      <Stack gap={0}>
        <Row>
          <Col sm={4}>Bitcoin:</Col>
          <Col sm={8} className="category green-numbers">
            ${" "}
            {prices.bitcoin
              ? prices.bitcoin.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })
              : ""}
          </Col>
        </Row>
        <hr />
        <Row>
          <Col sm={4}>Ethereum:</Col>
          <Col sm={8} className="category green-numbers">
            ${" "}
            {prices.eth
              ? prices.eth.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })
              : ""}
          </Col>
        </Row>
        <hr />
        <Row>
          <Col sm={4}>BNB:</Col>
          <Col sm={8} className="category green-numbers">
            ${" "}
            {prices.bnb
              ? prices.bnb.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })
              : ""}
          </Col>
        </Row>
        <hr />
      </Stack>
    </>
  );
};

export default Markets;
