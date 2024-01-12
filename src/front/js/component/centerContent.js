import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';

export const CenterContent = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
           actions.getUser();
}, [store.user])

  return (

    <>
 <Container className="center-container">
            <Row>
                <Col>
                      <div className="right-containers yellow">
                        <div className="right-items">
                          <h3>$ 3,525.00</h3>
                          <span>CASH</span>
                        </div>
                    </div>
                </Col>
                <Col>
                      <div className="right-containers red">
                        <div className="right-items">
                          <h3>$ 13,100.00</h3>
                          <span>TOTAL CREDIT</span>
                        </div>
                    </div>
                </Col>
                <Col>
                      <div className="right-containers green">
                        <div className="right-items">
                          <h3>$ 1,705.56</h3>
                          <span>SAVINGS</span>
                        </div>
                    </div>
                </Col>
            </Row>
                   
            <Row>
                     <div className="right-containers green">
                        <div className="right-items">
                          <h5>Recent Transactions</h5>
                          <hr/>
                          <Stack gap={0}>
                            <div className="ps-0">
                                <Row>
                                    <Col sm={2}>Hotel</Col>
                                    <Col sm={4}>The Ritz-Carlton</Col>
                                    <Col sm={2}>10/05/23</Col>
                                    <Col sm={2}>Cash</Col>
                                    <Col sm={2}>$ 12,850.00</Col>
                                </Row>
                              </div>
                            <hr/>

                            <div className="ps-0">
                                <Row>
                                    <Col sm={2}>Groceries</Col>
                                    <Col sm={4}>Whole Foods Market</Col>
                                    <Col sm={2}>09/08/23</Col>
                                    <Col sm={2}>Credit</Col>
                                    <Col sm={2}>$ 128.49</Col>
                                </Row>
                              </div>
                            <hr/>

                            <div className="ps-0">
                                <Row>
                                    <Col sm={2}>Google</Col>
                                    <Col sm={4}>Salary</Col>
                                    <Col sm={2}>09/02/23</Col>
                                    <Col sm={2}>Income</Col>
                                    <Col sm={2}>$ 8,423.29</Col>
                                </Row>
                              </div>
                            <hr/>

                            
                            
                          </Stack>
                        </div>
                    </div>
                  
            </Row>

            <Row>
                     <div className="right-containers green">
                        <div className="right-items">
                          <h5>Charts</h5>
                          <span>SAVINGS</span>
                        </div>
                    </div>
                  
            </Row>
  </Container>

    
       
       
 
   </>
  );
}

export default CenterContent;