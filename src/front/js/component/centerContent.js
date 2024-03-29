import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import Container from 'react-bootstrap/Container';
import { Button, Row, Col, Stack } from "react-bootstrap";
import ChartCashFlow from "./chartCashFlow";
import AccountButtons from "./accountButtons";
import AddTransaction from "./addTransaction";
import { NavLink } from "react-router-dom";

export const CenterContent = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
		if(store.token && store.token!="" && store.token!=undefined)
			 actions.getTransactions();
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
            <div className="text-center welcome">
              <span>
                Welcome to your dashboard {store.user_info ? store.user_info.firstName : 'Loading...'}
              </span>
            </div>
            <AccountButtons />
            <Row>
                <div className="center-item-container transactions">
                  <AddTransaction />
                  <div className="right-items">
                    <h5>Recent Transactions</h5>
                    <hr/>
                    <Stack gap={0}>
                      {store.transactions
                        .sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort transactions by date
                        .slice(0, 5) // Take the first 5 transactions
                        .map(transaction => (
                          <div key={transaction.id} className="ps-0">
                            <Row>
                              <Col sm={2} className="category">{transaction.budget ? transaction.budget : "Income"}</Col>
                              <Col sm={4} className="description">{transaction.description}</Col>
                              <Col sm={2} className="description">{new Date(transaction.date).toLocaleDateString(undefined, { day: 'numeric', month: 'long' })}</Col>
                              <Col sm={2} className="description">{transaction.account_type}</Col>
                              <Col sm={2} className={transaction.amount > 0 ? 'category green-numbers' : 'category red-numbers'}>
                                $ {formatMoney(transaction.amount)}</Col>
                            </Row>
                            <hr />
                          </div>
                      ))}
                      
                    </Stack>
                  </div>
                  <NavLink to="/accounts">
                    <Button variant="outline-secondary" size="sm" style={{float: 'right'}}>See all</Button>
                  </NavLink>
              </div>
            </Row>

            <Row>
                     <div className="center-item-container">
                        <div className="right-items">
                          <h5>Cash Flow</h5>
                          <ChartCashFlow />
                        </div>
                    </div>
                  
            </Row>
  </Container>

    
       
       
 
   </>
  );
}

export default CenterContent;