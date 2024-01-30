import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import Container from "react-bootstrap/Container";
import {
  Button,
  Stack,
  Row,
  Col,
  Form,
  Popover,
  OverlayTrigger,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const AccountDetails = () => {
  const { store, actions } = useContext(Context);
  const { accountId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const [account, setAccount] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [accounts, setAccounts] = useState([]);

  const handleAccountSelect = (accountId) => {
    navigate(`/accounts/${accountId}`);
    setShowModal(false);
  };

  useEffect(() => {
    if (store.token && store.token != "" && store.token != undefined) {
      actions.getBalances().then((data) => {
        setAccounts(data);
      });
    }
  }, [store.token]);

  useEffect(() => {
    setIsLoading(true);
    if (store.token && store.token !== "" && store.token !== undefined) {
      actions.getAccountDetails(accountId).then(() => {
        if (store.account_details) {
          // Sort transactions by date in descending order
          store.account_details.transactions.sort(
            (a, b) => new Date(b.date) - new Date(a.date)
          );
          setAccount(store.account_details);
        }
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  }, [store.token, accountId]);

  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 5;
  // Calculate the index of the last transaction for the current page
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = account?.transactions?.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );

  const totalPages = Math.ceil(
    (account?.transactions?.length || 0) / transactionsPerPage
  );

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
  //PopOver
  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Select an account</Popover.Header>
      <Popover.Body>
        <Form.Select
          aria-label="Select Account"
          onChange={(e) => handleAccountSelect(e.target.value)}
        >
          <option value="">Select an account</option>
          {store.balances.map((account, index) => (
            <option key={index} value={account.id}>
              {account.account_type}
            </option>
          ))}
        </Form.Select>
      </Popover.Body>
    </Popover>
  );

  console.log("Account balances:", store.balances);

  return (
    <>
      <Container className="center-container">
        <Row>
          <div className="center-item-container accountBalance d-flex justify-content-between align-items-center">
            {isLoading ? (
              <p className="h6">Loading...</p>
            ) : (
              <>
                <span className="d-flex align-items-center">
                  {account?.account_type}
                  <OverlayTrigger
                    trigger="click"
                    placement="right"
                    overlay={popover}
                  >
                    <i className="fa-solid fa-caret-down ms-3 mt-2"></i>
                  </OverlayTrigger>
                </span>
                <span
                  className="d-flex align-items-center"
                  style={{ fontSize: "16px" }}
                >
                  {account?.total_transactions === undefined
                    ? ""
                    : account?.total_transactions === 0
                    ? "No transactions"
                    : `Transactions: ${account?.total_transactions}`}
                </span>
                <div
                  className={
                    account?.balance > 0
                      ? "accountBalance green-numbers d-flex align-items-center"
                      : "accountBalance red-numbers d-flex align-items-center"
                  }
                >
                  {account?.balance !== undefined &&
                    `$ ${formatMoney(account?.balance)}`}
                </div>
              </>
            )}
          </div>
        </Row>

        <Row>
          <div className="center-item-container transactions">
            <div className="right-items">
              <h5>Transactions</h5>
              <hr />
              {isLoading ? (
                <span>Getting your transactions...</span>
              ) : (
                <Stack gap={0}>
                  {currentTransactions?.length > 0 ? (
                    currentTransactions.map((transaction) => (
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
                    ))
                  ) : (
                    <div>No transactions available</div>
                  )}
                </Stack>
              )}
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

export default AccountDetails;
