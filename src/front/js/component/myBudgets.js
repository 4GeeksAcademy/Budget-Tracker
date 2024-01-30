import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Modal, Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import ProgressBar from "react-bootstrap/ProgressBar";

export const MyBudgets = () => {
  const { store, actions } = useContext(Context);

  const [showModal, setShowModal] = useState(false);
  const [budgetCategory, setBudgetCategory] = useState("");
  const [amount, setAmount] = useState("");

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handleAddBudget = (event) => {
    event.preventDefault();
    if (budgetCategory === "" || amount === "") {
      alert("Both fields are required!");
      return;
    }
    actions
      .addNewBudget(budgetCategory, amount)
      .then(() => {
        handleCloseModal();
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error adding new budget", error);
      });
  };

  const [editModal, setEditModal] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [newAmount, setNewAmount] = useState("");
  const [newBudgetCategory, setNewBudgetCategory] = useState("");

  const handleShowEditModal = (budget) => {
    setSelectedBudget(budget);
    setNewAmount(budget.amount);
    setNewBudgetCategory(budget.budget_category);
    setEditModal(true);
  };

  const handleCloseEditModal = () => setEditModal(false);

  const handleEditBudget = (event) => {
    event.preventDefault();
    if (newAmount === "" || newBudgetCategory === "") {
      alert("Both amount and budget category fields are required!");
      return;
    }
    actions
      .editBudget(selectedBudget.id, newBudgetCategory, newAmount)
      .then(() => {
        handleCloseEditModal();
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error editing budget", error);
      });
  };

  useEffect(() => {
    if (store.token && store.token != "" && store.token != undefined)
      actions.getBudgets();
  }, [store.token]);

  return (
    <>
      <Container className="center-container">
        <div className="center-item-container">
          <div className="right-items">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h5>My Budgets</h5>
              <h5>{new Date().toLocaleString("default", { month: "long" })}</h5>
              <Button
                style={{ backgroundColor: "#00AA93" }}
                size="sm"
                className="new-budget-btn"
                onClick={handleShowModal}
              >
                <i className="fa-solid fa-circle-plus"></i> New Budget
              </Button>

              <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                  <Modal.Title>Add New Budget</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form onSubmit={handleAddBudget}>
                    <Form.Group controlId="budgetCategory">
                      <Form.Label>Budget Category</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter budget category"
                        value={budgetCategory}
                        onChange={(e) => setBudgetCategory(e.target.value)}
                        required
                      />
                    </Form.Group>

                    <Form.Group controlId="amount">
                      <Form.Label>Amount</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                      />
                    </Form.Group>
                    <Button variant="success" type="submit">
                      Add New Budget
                    </Button>
                  </Form>
                </Modal.Body>
              </Modal>
            </div>
            <hr />
            <div style={{ height: "20px" }}></div>
            {store.budgets.map((budget, index) => {
              // Get the current month and year
              const currentMonth = new Date().getMonth();
              const currentYear = new Date().getFullYear();

              // Filter transactions associated with the current budget and month
              const budgetTransactions = store.transactions.filter(
                (transaction) => {
                  const transactionDate = new Date(transaction.date);
                  return (
                    transaction.budget === budget.budget_category &&
                    transactionDate.getMonth() === currentMonth &&
                    transactionDate.getFullYear() === currentYear
                  );
                }
              );

              // Calculate the total amount spent
              const amountSpent = budgetTransactions.reduce(
                (total, transaction) => total + Math.abs(transaction.amount),
                0
              );

              // Calculate the amount left
              const amountLeft = budget.amount - amountSpent;

              return (
                <div className="mb-3" key={index} style={{ fontSize: "14px" }}>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <h6 className="mb-1">{budget.budget_category}</h6>
                    <span>
                      ${Math.abs(amountLeft).toFixed(2)}{" "}
                      {amountSpent >= budget.amount ? "over" : "left"}
                    </span>
                  </div>
                  <ProgressBar
                    variant={
                      amountSpent >= budget.amount ? "danger redBar" : "danger"
                    }
                    now={(amountSpent / budget.amount) * 100}
                  />
                  <div
                    className="mt-1"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <span>
                      ${amountSpent.toFixed(2)} of ${budget.amount}
                    </span>
                    <span
                      className="green-numbers"
                      style={{ marginLeft: "auto", fontSize: "10px" }}
                      onClick={() => handleShowEditModal(budget)}
                    >
                      <i className="fa-regular fa-pen-to-square"></i> Edit
                    </span>
                  </div>
                </div>
              );
            })}
            <div style={{ height: "20px" }}></div>
          </div>
        </div>
      </Container>

      <Modal show={editModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Budget</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditBudget}>
            <Form.Group controlId="newBudgetCategory">
              <Form.Label>Edit Budget Category Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter new budget category name"
                value={newBudgetCategory}
                onChange={(e) => setNewBudgetCategory(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="newAmount">
              <Form.Label>Edit Amount</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter new amount"
                value={newAmount}
                onChange={(e) => setNewAmount(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="success" type="submit">
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default MyBudgets;
