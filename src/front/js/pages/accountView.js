import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NavbarLeft from "../component/navbarLeft";
import RightContent from "../component/rightContent";
import Transactions from "../component/transactions";
import { useNavigate } from "react-router-dom";
import AccountDetails from "../component/accountDetails";

export const AccountView = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token == null) {
      navigate("/login");
    } else {
      actions.syncToken(token);
    }
    setIsLoading(false);
  }, []);

  return (
    <>
      <Container fluid className="main-wrapper">
        <Row className="row-wrapper">
          <Col xs lg="1" className="left-column">
            <NavbarLeft />
          </Col>
          <Col className="main-column">
            <AccountDetails />
          </Col>
          <Col xs lg="3" className="right-column">
            <RightContent />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AccountView;
