import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

export const AddAccount = () => {
  const { store, actions } = useContext(Context);

	useEffect(() => {
		if(store.token && store.token!="" && store.token!=undefined)
			 actions.getBalances();
	}, [store.token])

  const colors = ['#DFEF6A', '#B8DBAD', '#c77593', '#CD554F'];

  return (

    <>
    <div className="center-item-container">
      <div className="right-items">
        <h5 className="mb-3">My Accounts</h5>
        <Button variant="outline-success" size="sm" className="new-account-btn">
          Create Account
        </Button>
        <hr/>
        {store.balances && (
          <>
            {Object.keys(store.balances).reduce((rows, acctName, index) => {
              if (index % 3 === 0) {
                rows.push([]);
              }
              rows[rows.length - 1].push(
                <Col sm={4} key={acctName} className="text-center">
                  <div className="acctBadges" style={{backgroundColor: colors[index % colors.length]}}>
                    <span><i className="fa-solid fa-wallet"></i> {acctName}</span>
                  </div>
                </Col>
              );
              return rows;
            }, []).map((cols, index) => (
              <Row key={index}>{cols}</Row>
            ))}
          </>
        )}
      </div>
    </div>
  </>
);
}

export default AddAccount;