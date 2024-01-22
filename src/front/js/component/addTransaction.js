import React, { useState, useEffect, useContext } from 'react';
import { Context } from "../store/appContext";
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const AddTransaction = () => {
    const { store, actions } = useContext(Context);
    const [transactionData, setTransactionData] = useState({
        budgetId: '',
        accountId: '',
        amount: '',
        description: '',
        date: ''
    });
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleAddExpense = async () => {
        try {
            await actions.addExpense(transactionData);
            actions.getTransactions();
            handleClose();
        } catch (error) {
            console.error(error);
        }
    };

    const handleAddIncome = () => {
        // Add your logic here to handle adding the income
        console.log('Income added:', transaction);
    };

    useEffect(() => {
		if(store.token && store.token!="" && store.token!=undefined)
			 actions.getTransactions();
	}, [store.token])


    return (
        <div className='add-transaction'>
            <ButtonGroup className="mb-2">
                <Button variant="outline-danger" size="sm" onClick={handleShow}>
                Add Expense
                </Button>
                <Button variant="outline-success" size="sm" onClick={handleAddIncome}>
                Add Income
                </Button>
            </ButtonGroup>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Add Expense</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Budget</Form.Label>
                        <Form.Control as="select" defaultValue="" onChange={(e) => {
                            setTransactionData({ ...transactionData, budgetId: e.target.value });
                        }}>
                            <option disabled value="">Select a Budget</option>
                            {store.user_info && store.user_info.budgets && store.user_info.budgets.map((budget, index) => (
                                <option key={index} value={budget.id}>
                                    {budget.category}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Account</Form.Label>
                        <Form.Control as="select" defaultValue="" onChange={(e) => {
                            setTransactionData({ ...transactionData, accountId: e.target.value });
                        }}>
                            <option disabled value="">Select an Account</option>
                            {store.user_info && store.user_info.accounts && store.user_info.accounts.map((account, index) => (
                                <option key={index} value={account.id}>
                                    {account.account_type}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Amount</Form.Label>
                            <Form.Control type="number" placeholder="Enter amount" onChange={(e) => setTransactionData({ ...transactionData, amount: e.target.value })} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" placeholder="Enter description" onChange={(e) => setTransactionData({ ...transactionData, description: e.target.value })} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Date</Form.Label>
                            <Form.Control type="date" onChange={(e) => setTransactionData({ ...transactionData, date: e.target.value })} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="success" onClick={handleAddExpense}>
                    Add Transaction
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default AddTransaction;
