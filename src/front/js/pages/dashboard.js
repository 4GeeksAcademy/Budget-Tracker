import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NavbarLeft from "../component/navbarLeft";
import CenterContent from "../component/centerContent";
import RightContent from "../component/rightContent"
import { Navigate } from "react-router-dom";

export const Dashboard = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
           actions.getUser();
}, [store.user])

  return (
   
            <>
            <Container fluid className="main-wrapper">
            <Row className="row-wrapper">
                <Col xs lg="1" className="left-column">
                  <NavbarLeft />
                </Col>
                <Col className="main-column">
                  <CenterContent />
                </Col>
                <Col xs lg="3" className="right-column">
                  <RightContent />
                </Col>
            </Row>
          </Container>
            
            </>
 
  );
}

export default Dashboard;