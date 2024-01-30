import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Modal, Button, Col, Row } from "react-bootstrap";

export const AccountButtons = () => {
  const { store, actions } = useContext(Context);
  const [updateAmount, setUpdateAmount] = useState("");
  const [showUpdate, setShowUpdate] = useState(false);
  const [showUpdateSavings, setShowUpdateSavings] = useState(false);

  const cashBalance = store.balances.find(
    (b) => b.account_type === "Cash"
  )?.balance;
  const creditBalance = store.balances.find(
    (b) => b.account_type === "Credit"
  )?.balance;
  const savingsBalance = store.balances.find(
    (b) => b.account_type === "Savings"
  )?.balance;

  useEffect(() => {
    if (store.token && store.token !== "" && store.token !== undefined)
      actions.getBalances();
  }, [store.token]);

  const formatMoney = (amount) => {
    return (
      amount?.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }) || ""
    );
  };

  const handleUpdateCashBalance = async () => {
    try {
      await actions.updateCashBalance(updateAmount);
      // Reload the account balance from the store
      actions.getBalances();
      setShowUpdate(false);
      setUpdateAmount(""); // Clear the updateAmount field
    } catch (error) {
      console.error("Error:", error); // Log the error
      alert("Failed to update cash balance");
    }
  };

  const handleUpdateSavingsBalance = async () => {
    try {
      await actions.updateSavingsBalance(updateAmount);
      // Reload the account balance from the store
      actions.getBalances();
      setShowUpdateSavings(false);
      setUpdateAmount(""); // Clear the updateAmount field
    } catch (error) {
      console.error("Error:", error); // Log the error
      alert("Failed to update savings balance");
    }
  };

  return (
    <>
      <Row>
        <Col>
          <div className="right-containers yellow">
            <div className="account-items">
              <div
                className="icon-container"
                style={{ cursor: "pointer" }}
                id="cash"
                onClick={() =>
                  setShowUpdate((prevShowUpdate) => !prevShowUpdate)
                }
              >
                <i className="fa-solid fa-plus"></i>
              </div>
              <h3>$ {formatMoney(cashBalance)}</h3>
              <span>CASH ACCOUNT</span>
              <Modal
                size="sm"
                show={showUpdate}
                onHide={() => setShowUpdate(false)}
              >
                <Modal.Header closeButton>
                  <Modal.Title>Add Cash to Balance</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <input
                    className="w-100 mb-2"
                    type="number"
                    value={updateAmount}
                    onChange={(e) => setUpdateAmount(e.target.value)}
                    placeholder="0.00"
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        handleUpdateCashBalance();
                      }
                    }}
                  />
                  <Button
                    className="me-2 px-3 w-100"
                    variant="outline-success"
                    size="sm"
                    onClick={handleUpdateCashBalance}
                  >
                    Add Cash
                  </Button>
                </Modal.Body>
              </Modal>
            </div>
          </div>
        </Col>
        <Col>
          <div className="right-containers red">
            <div className="right-items">
              <h3>$ {formatMoney(creditBalance)}</h3>
              <span>CREDIT CARDS</span>
            </div>
          </div>
        </Col>
        <Col>
          <div className="right-containers green">
            <div className="account-items">
              <div
                className="icon-container"
                id="savings"
                onClick={() =>
                  setShowUpdateSavings(
                    (prevShowUpdateSavings) => !prevShowUpdateSavings
                  )
                }
                style={{ cursor: "pointer" }}
              >
                <i className="fa-solid fa-plus"></i>
              </div>
              <h3>$ {formatMoney(savingsBalance)}</h3>
              <span>SAVINGS ACCOUNT</span>
              <Modal
                show={showUpdateSavings}
                onHide={() => setShowUpdateSavings(false)}
                size="sm"
              >
                <Modal.Header closeButton>
                  <Modal.Title>Savings Balance</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <input
                    className="w-100 mb-2"
                    type="number"
                    value={updateAmount}
                    onChange={(e) => setUpdateAmount(e.target.value)}
                    placeholder="0.00"
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        handleUpdateSavingsBalance();
                      }
                    }}
                  />
                  <Button
                    className="me-2 px-3 w-100"
                    variant="outline-success"
                    size="sm"
                    onClick={handleUpdateSavingsBalance}
                  >
                    Update Savings Balance
                  </Button>
                </Modal.Body>
              </Modal>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default AccountButtons;
