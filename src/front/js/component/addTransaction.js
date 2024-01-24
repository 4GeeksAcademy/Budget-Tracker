import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const AddTransaction = () => {
  const { store, actions } = useContext(Context);
  const [transactionData, setTransactionData] = useState({
    budgetId: "",
    accountId: "",
    amount: "",
    description: "",
    income_expense: "",
    date: "",
  });
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showIncomeModal, setShowIncomeModal] = useState(false);

  const handleShowIncomeModal = () => setShowIncomeModal(true);
  const handleCloseIncomeModal = () => setShowIncomeModal(false);

  const handleAddExpense = async () => {
    try {
      await actions.addExpense({
        ...transactionData,
        income_expense: "expense", 
      });
      actions.getTransactions();
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddIncome = async () => {
    try {
      await actions.addIncome({
        ...transactionData,
        budgetId: null,
        income_expense: "income",
      });
      actions.getTransactions();
      handleCloseIncomeModal();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (store.token && store.token != "" && store.token != undefined)
      actions.getTransactions();
  }, [store.token]);

  return (
    <div className="add-transaction">
      <ButtonGroup className="mb-2">
        <Button
          style={{ backgroundColor: "#C8423A" }}
          size="sm"
          onClick={handleShow}
        >
          <i className="fa-solid fa-circle-plus"></i> Expense
        </Button>
        <Button
          style={{ backgroundColor: "#85A47C" }}
          size="sm"
          onClick={handleShowIncomeModal}
        >
          <i className="fa-solid fa-circle-plus"></i> Income
        </Button>
      </ButtonGroup>

      <Modal show={showIncomeModal} onHide={handleCloseIncomeModal}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Account</Form.Label>
              <Form.Control
                as="select"
                defaultValue=""
                onChange={(e) => {
                  setTransactionData({
                    ...transactionData,
                    accountId: e.target.value,
                  });
                }}
              >
                <option disabled value="">
                  Select an Account
                </option>
                {store.user_info &&
                  store.user_info.accounts &&
                  store.user_info.accounts.map((account, index) => {
                    if (account.account_type !== "Credit") {
                      return (
                        <option key={index} value={account.id}>
                          {account.account_type}
                        </option>
                      );
                    }
                    return null;
                  })}
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter amount"
                onChange={(e) =>
                  setTransactionData({
                    ...transactionData,
                    amount: Math.abs(e.target.value),
                  })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                onChange={(e) =>
                  setTransactionData({
                    ...transactionData,
                    description: e.target.value,
                  })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                onChange={(e) =>
                  setTransactionData({
                    ...transactionData,
                    date: e.target.value,
                  })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseIncomeModal}>
            Close
          </Button>
          <Button variant="success" onClick={handleAddIncome}>
            Add Income
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Budget</Form.Label>
              <Form.Control
                as="select"
                defaultValue=""
                onChange={(e) => {
                  setTransactionData({
                    ...transactionData,
                    budgetId: e.target.value,
                  });
                }}
              >
                <option disabled value="">
                  Select a Budget
                </option>
                {store.user_info &&
                  store.user_info.budgets &&
                  store.user_info.budgets.map((budget, index) => (
                    <option key={index} value={budget.id}>
                      {budget.category}
                    </option>
                  ))}
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Account</Form.Label>
              <Form.Control
                as="select"
                defaultValue=""
                onChange={(e) => {
                  setTransactionData({
                    ...transactionData,
                    accountId: e.target.value,
                  });
                }}
              >
                <option disabled value="">
                  Select an Account
                </option>
                {store.user_info &&
                  store.user_info.accounts &&
                  store.user_info.accounts.map((account, index) => (
                    <option key={index} value={account.id}>
                      {account.account_type}
                    </option>
                  ))}
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter amount"
                onChange={(e) =>
                  setTransactionData({
                    ...transactionData,
                    amount: -Math.abs(e.target.value),
                  })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                onChange={(e) =>
                  setTransactionData({
                    ...transactionData,
                    description: e.target.value,
                  })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                onChange={(e) =>
                  setTransactionData({
                    ...transactionData,
                    date: e.target.value,
                  })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={handleAddExpense}>
            Add Expense
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddTransaction;
