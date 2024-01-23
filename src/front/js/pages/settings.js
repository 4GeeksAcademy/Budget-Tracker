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
import { Privacy } from "../component/settings/privacy";
import { Notifications } from "../component/settings/notifications";
import { Password } from "../component/settings/password";

export const Settings = () => {
  const { store, actions } = useContext(Context);
  const [key, setKey] = useState("profile");

  return (
    <>
      <Container fluid className="main-wrapper">
        <Row className="row-wrapper">
          <Col xs lg="1" className="left-column pr-4">
            <NavbarLeft />
          </Col>
          <Col className="main-column pt-5">
            <h1>Settings</h1>
            <Tabs
              id="controlled-tab-example"
              activeKey={key}
              onSelect={(k) => setKey(k)}
              className="mb-3"
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
              <Tab eventKey="privacy" title="Privacy">
                <Privacy />
              </Tab>
              <Tab eventKey="notifications" title="Notifications">
                <Notifications />
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Settings;
