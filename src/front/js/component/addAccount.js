import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Row, Col, Modal, Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

export const AddAccount = () => {
  const { store, actions } = useContext(Context);
  const [show, setShow] = useState(false);
  const [accountType, setAccountType] = useState("");
  const [balance, setBalance] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleAddAccount = async (event) => {
    event.preventDefault();
    try {
      // Call the addNewAccount action with the accountType and balance
      await actions.addNewAccount(accountType, balance);
      // Fetch the updated list of accounts
      await actions.getBalances();
      // Close the modal
      handleClose();
    } catch (error) {
      // Handle any errors here
      console.error("Error adding new account", error);
    }
  };

  useEffect(() => {
    if (store.token && store.token != "" && store.token != undefined)
      actions.getBalances();
  }, [store.token]);

  const colors = ["#DFEF6A", "#a1db8f", "#c77593", "#CD554F"];

  return (
    <>
      <div className="center-item-container">
        <div className="right-items">
          <h5 className="mb-3">My Accounts</h5>
          <Button
            style={{ backgroundColor: "#00AA93" }}
            size="sm"
            className="new-account-btn"
            onClick={handleShow}
          >
            <i className="fa-solid fa-circle-plus"></i> New Account
          </Button>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>New Account</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleAddAccount}>
                <Form.Group className="mb-3">
                  <Form.Label>Account Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter account name"
                    value={accountType}
                    onChange={(e) => setAccountType(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Balance</Form.Label>
                  <Form.Control
                    type="text"
                    pattern="^\d*(\.\d{0,2})?$"
                    placeholder="Enter balance"
                    value={balance}
                    onChange={(e) => setBalance(e.target.value)}
                    required
                  />
                </Form.Group>

                <Button variant="success" type="submit">
                  Add New Account
                </Button>
              </Form>
            </Modal.Body>
          </Modal>

          <hr />
          <div style={{ height: "20px" }}></div>
          {store.balances && (
            <>
              {store.balances
                .reduce((rows, account, index) => {
                  if (index % 3 === 0) {
                    rows.push([]);
                  }
                  rows[rows.length - 1].push(
                    <Col sm={4} key={account.id} className="text-center">
                      <Link to={`/accounts/${account.id}`}>
                        <div
                          className="acctBadges hoverEffect"
                          style={{
                            backgroundColor: colors[index % colors.length],
                          }}
                        >
                          <span>
                            <i className="fa-solid fa-wallet"></i>{" "}
                            {account.account_type}
                          </span>
                        </div>
                      </Link>
                    </Col>
                  );
                  return rows;
                }, [])
                .map((cols, index) => (
                  <Row key={index}>{cols}</Row>
                ))}
            </>
          )}
        </div>
        <div style={{ height: "20px" }}></div>
      </div>
    </>
  );
};

export default AddAccount;
