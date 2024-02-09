import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import NavbarLeft from "../component/navbarLeft";
import { PersonalInfo } from "../component/settings/personal";
import { Activity } from "../component/settings/activity";
import { Password } from "../component/settings/password";
import { useNavigate } from "react-router-dom";

export const Settings = () => {
  const { store, actions } = useContext(Context);
  const [key, setKey] = useState("profile");
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
      <Container fluid className="main-wrapper ">
        <Row className="row-wrapper">
          <Col xs lg="1" className="left-column pr-4">
            <NavbarLeft />
          </Col>

          <Col className="main-column pt-5 mt-5 settings">
            <Tabs
              id="controlled-tab-example"
              activeKey={key}
              onSelect={(k) => setKey(k)}
            >
              <Tab eventKey="profile" title="Personal Info">
                <PersonalInfo />
              </Tab>
              <Tab eventKey="password" title="Password">
                <Password />
              </Tab>
              <Tab eventKey="activity" title="Activity">
                <Activity />
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Settings;
