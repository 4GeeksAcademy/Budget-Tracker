import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

export const AccountButtons = () => {
  const { store, actions } = useContext(Context);
  const [updateAmount, setUpdateAmount] = useState("");
  const [showUpdate, setShowUpdate] = useState(false);
  const [showUpdateSavings, setShowUpdateSavings] = useState(false);

  useEffect(() => {
    if (store.token && store.token !== "" && store.token !== undefined)
      actions.getBalances();
  }, [store.token])

  const formatMoney = (amount) => {
    return amount?.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }) || "";
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
      alert('Failed to update cash balance');
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
      alert('Failed to update savings balance');
    }
  };

  return (

    <>
             <Row>
             <Col>
              <div className="right-containers yellow">
                <div className="account-items">
                <div className="icon-container" id="cash" onClick={() => setShowUpdate(prevShowUpdate => !prevShowUpdate)}>
                    <i className="fa-solid fa-ellipsis-vertical"></i>
                  </div>
                  <h3>$ {formatMoney(store.balances?.Cash)}</h3>
                  <span>CASH</span>
                  {showUpdate && (
                      <div className="floating-container yellow">
                        <input
                          className="w-100 mb-2"
                          type="number"
                          value={updateAmount}
                          onChange={(e) => setUpdateAmount(e.target.value)}
                          placeholder="0.00"
                          onKeyDown={(event) => {
                            if (event.key === 'Enter') {
                              handleUpdateCashBalance();
                            }
                          }}
                        />
                        <Button className="me-2 px-3 w-100" variant="outline-success" size="sm" onClick={handleUpdateCashBalance}>
                          Add Cash
                        </Button>
                      </div>
                    )}
                </div>
              </div>
            </Col>
                <Col>
                      <div className="right-containers red">
                        <div className="right-items">
                          <h3>$ {formatMoney(store.balances?.Credit)}</h3>
                          <span>CREDIT CARDS</span>
                        </div>
                    </div>
                </Col>
                <Col>
                  <div className="right-containers green">
                    <div className="account-items">
                      <div className="icon-container" id="savings" onClick={() => setShowUpdateSavings(prevShowUpdateSavings => !prevShowUpdateSavings)}>
                        <i className="fa-solid fa-ellipsis-vertical"></i>
                      </div>
                      <h3>$ {formatMoney(store.balances?.Savings)}</h3>
                      <span>SAVINGS</span>
                      {showUpdateSavings && (
                        <div className="floating-container green">
                          <input
                            className="w-100 mb-2"
                            type="number"
                            value={updateAmount}
                            onChange={(e) => setUpdateAmount(e.target.value)}
                            placeholder="0.00"
                            onKeyDown={(event) => {
                              if (event.key === 'Enter') {
                                handleUpdateSavingsBalance();
                              }
                            }}
                          />
                          <Button className="me-2 px-3 w-100" variant="outline-success" size="sm" onClick={handleUpdateSavingsBalance}>
                            Update Savings
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </Col>
            </Row>
       </>
  );
}

export default AccountButtons;