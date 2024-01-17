import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';

export const Transactions = () => {
  const { store, actions } = useContext(Context);

	useEffect(() => {
		if(store.token && store.token!="" && store.token!=undefined)
			 actions.getBalances();
	}, [store.token])

  useEffect(() => {
		if(store.token && store.token!="" && store.token!=undefined)
			 actions.getTransactions();
	}, [store.token])

  useEffect(() => {
		if(store.token && store.token!="" && store.token!=undefined)
			 actions.getUser();
	}, [store.token])

  const formatMoney = (amount) => {
    return amount?.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }) || "";
  };

  return (

    <>
 <Container className="center-container">
              <Row>
                <Col>
                      <div className="right-containers yellow">
                        <div className="right-items">
                          <h3>$ {formatMoney(store.balances?.Cash)}</h3>
                          <span>CASH</span>
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
                        <div className="right-items">
                          <h3>$ {formatMoney(store.balances?.Savings)}</h3>
                          <span>SAVINGS</span>
                        </div>
                    </div>
                </Col>
            </Row>
                   
            <Row>
                     <div className="center-item-container">
                        <div className="right-items">
                          <h5>Transactions</h5>
                          <hr/>
                          <Stack gap={0}>
                          {store.transactions.map(transaction => (
                  <div key={transaction.id} className="ps-0">
                    <Row>
                      <Col sm={2} className="category">{transaction.budget ? transaction.budget : "Income"}</Col>
                      <Col sm={4} className="description">{transaction.description}</Col>
                      <Col sm={2} className="description">{new Date(transaction.date).toLocaleDateString(undefined, { day: 'numeric', month: 'long' })}</Col>
                      <Col sm={2} className="description">{transaction.account_type}</Col>
                      <Col sm={2} className={transaction.amount > 0 ? 'category green-numbers' : 'category red-numbers'}>
                        $ {formatMoney(transaction.amount)}</Col>
                    </Row>
                   <hr/>
                  </div>
                 
                ))}
                            
                          </Stack>
                        </div>
                    </div>
                  
            </Row>

            <Row>
                     <div className="center-item-container">
                        <div className="right-items">
                          <h5>Private</h5>
                          <hr/>
                          {store.message || "Login to reveal the secret message!"}
                        </div>
                    </div>
                  
            </Row>

           
  </Container>

    
       
       
 
   </>
  );
}

export default Transactions;