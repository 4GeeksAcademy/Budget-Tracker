import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import Stack from 'react-bootstrap/Stack';
import ChartExpenses from "./chartExpenses";
import TotalExpensesYTD from "./totalExpenseYtd";
import TotalIncomeYTD from "./totalIncomeYtd";
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
              <h5>General Data YTD</h5>
              <Stack gap={0}>
                <hr />
                <div className="ps-0">Income: <TotalIncomeYTD /></div>
                <hr />
                <div className="ps-0">Expenses: <TotalExpensesYTD /></div>
                <hr />
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
            {store.balances && (
                <>
                    {Object.keys(store.balances).map(key => (
                        <div key={key} className="ps-0">
                            <Row>
                                <Col sm={4}>{key}:</Col>
                                <Col sm={8} className={store.balances[key] >= 0 ? 'category green-numbers' : 'category red-numbers'}>
                                    $ {Math.abs(store.balances[key]).toLocaleString(undefined, {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2
                                    })}
                                </Col>
                            </Row>
                            <hr />
                        </div>
                    ))}
                </>
            )}
            </Stack>
            
          </div>
        </div>
       
 </>
 
  );
}

export default RightContent;