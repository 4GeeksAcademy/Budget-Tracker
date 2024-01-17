import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import Stack from 'react-bootstrap/Stack';
import ChartExpenses from "./chartExpenses";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export const RightContent = () => {
  const { store, actions } = useContext(Context);

	useEffect(() => {
		if(store.token && store.token!="" && store.token!=undefined)
			 actions.getBalances();
	}, [store.token])

  console.log("Balances: ", store.balances)

  return (

 <>
    
        <div className="right-containers">
            <div className="right-items">
              <h5>General Data</h5>
              <Stack gap={1}>
                <div className="ps-0">Expenses</div>
                <div className="ps-0">Income</div>
                <div className="ps-0">Remaining</div>
              </Stack>
            </div>
        </div>

        <div className="right-containers">
          <div className="right-items">
            <h5>Expenses by Categories</h5>
            <ChartExpenses />
          </div>
        </div>

        <div className="right-containers">
          <div className="right-items">
            <h5 className="mb-3">All Account Balances</h5>
            <Stack gap={0}>
                          
                                  <div className="ps-0">
                                    <Row>
                                      <Col sm={4}>Cash:</Col>
                                      <Col sm={8}>$ 5,658.00</Col>
                                    </Row>
                                  <hr/>
                                  </div>
                          </Stack>
            
          </div>
        </div>
       
 </>
 
  );
}

export default RightContent;