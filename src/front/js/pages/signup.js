import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../../styles/login.css";
import logo from "../../img/BudgetAppLogo6.png";

export const Signup = () => {
  const { store, actions } = useContext(Context);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    actions.signup(firstName, lastName, email, password).then(() => {
      navigate("/login");
    });
  };

  useEffect(() => {
    // This code runs after the component mounts
    document.body.classList.add("dark-page");

    // This function runs when the component unmounts
    return () => {
      document.body.classList.remove("dark-page");
    };
  }, []);

  return (
    <Container
      className="d-flex align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Row className="box w-100 justify-content-between align-items-center">
        <Col md={6} className="text-center text-light">
          <img src={logo} width={450} alt="Logo" />

          <div style={{ marginTop: "30px" }}>
            <hr
              style={{ width: "440px", margin: "auto", marginBottom: "20px" }}
            />
            <h2>Smart budgeting made simple</h2>
          </div>
        </Col>
        <Col md={6}>
          <div
            className="login-box"
            style={{ maxWidth: "400px", margin: "auto" }}
          >
            <h1 className="mb-4 text-center">Register</h1>

            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="name">
                  <Form.Control
                    type="name"
                    placeholder="Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <Form.Text className="text-muted"></Form.Text>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="lastName">
                  <Form.Control
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  <Form.Text className="text-muted"></Form.Text>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3" controlId="email">
              <Form.Control
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button
              className="me-2 mb-4 w-100"
              variant="primary"
              type="submit"
              onClick={handleSubmit}
            >
              Signup
            </Button>

            <p>
              Already registered?
              <a href="/login" className="link-info link-register">
                {" "}
                Login
              </a>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
