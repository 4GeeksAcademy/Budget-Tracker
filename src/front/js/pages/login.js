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

export const Login = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    actions.login(email, password).then(() => {
      navigate("/dashboard");
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
            style={{ maxWidth: "380px", margin: "auto" }}
          >
            <h1 className="mb-4 text-center">Login</h1>
            <Form.Group className="mb-3" controlId="email">
              <Form.Control
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
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
              onClick={handleLogin}
            >
              Login
            </Button>
            <p>
              Don't have an account?
              <a href="/signup" className="link-info link-register">
                {" "}
                Register
              </a>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
