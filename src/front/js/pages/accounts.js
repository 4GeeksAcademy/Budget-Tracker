import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NavbarLeft from "../component/navbarLeft";
import RightContent from "../component/rightContent"
import Transactions from "../component/transactions";
import { useNavigate } from 'react-router-dom';

export const Accounts = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    if (store.token == null) {
      navigate('/login');
    }
  }, [store.token]);


  return (
   
            <>
            <Container fluid className="main-wrapper">
            <Row className="row-wrapper">
                <Col xs lg="1" className="left-column">
                  <NavbarLeft />
                </Col>
                <Col className="main-column">
                  <Transactions />
                </Col>
                <Col xs lg="3" className="right-column">
                  <RightContent />
                </Col>
            </Row>
          </Container>
            
            </>
 
  );
}

export default Accounts;