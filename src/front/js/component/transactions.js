import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import AccountButtons from "./accountButtons";
import AddTransaction from "./addTransaction";
import AddAccount from "./addAccount";

export const Transactions = () => {
  const { store, actions } = useContext(Context);

  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 5;
  // Calculate the index of the last transaction for the current page
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = store.transactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );

  const totalPages = Math.ceil(store.transactions.length / transactionsPerPage);

  // Function to handle page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Display pagination buttons
  const renderPaginationButtons = () => {
    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <Button
          className="me-2 px-3"
          variant="outline-dark"
          size="sm"
          key={i}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </Button>
      );
    }
    return buttons;
  };

  useEffect(() => {
    if (store.token && store.token != "" && store.token != undefined)
      actions.getTransactions();
  }, [store.token]);

  useEffect(() => {
    if (store.token && store.token != "" && store.token != undefined)
      actions.getUser();
  }, [store.token]);

  const formatMoney = (amount) => {
    return (
      amount?.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }) || ""
    );
  };

  return (
    <>
      <Container className="center-container">
        <Row>
          <AddAccount />
        </Row>
        <Row>
          <div className="center-item-container transactions">
            <AddTransaction />
            <div className="right-items">
              <h5>All Transactions</h5>
              <hr />
              <Stack gap={0}>
                {currentTransactions.map((transaction) => (
                  <div key={transaction.id} className="ps-0">
                    <Row>
                      <Col sm={2} className="category">
                        {transaction.budget ? transaction.budget : "Income"}
                      </Col>
                      <Col sm={4} className="description">
                        {transaction.description}
                      </Col>
                      <Col sm={2} className="description">
                        {new Date(transaction.date).toLocaleDateString(
                          undefined,
                          { day: "numeric", month: "long" }
                        )}
                      </Col>
                      <Col sm={2} className="description">
                        {transaction.account_type}
                      </Col>
                      <Col
                        sm={2}
                        className={
                          transaction.amount > 0
                            ? "category green-numbers"
                            : "category red-numbers"
                        }
                      >
                        $ {formatMoney(transaction.amount)}
                      </Col>
                    </Row>
                    <hr />
                  </div>
                ))}
              </Stack>
            </div>
            <div className="pagination-buttons">
              {renderPaginationButtons()}
            </div>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Transactions;
