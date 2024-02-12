import React, { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../../styles/login.css";
import logo from "../../img/BudgetAppLogo6.png";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ForgotPassword = () => {
  const { actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const result = await actions.forgotPassword(email);
      if (result) {
        toast.success("Please check your email for the password reset link.");
        navigate("/login");
      } else {
        toast.error("Failed to send password reset email");
      }
    } catch (error) {
      console.error("Failed to send password reset email", error);
      toast.error(
        "An error occurred while trying to send the password reset email"
      );
    }
  };

  return (
    <Container
      className="d-flex align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Row className="box w-100 justify-content-between align-items-center">
        <Col md={6} className="text-center text-light">
          <img src={logo} width={450} alt="Logo" className="fade-in-logo" />

          <div style={{ marginTop: "30px" }}>
            <hr
              style={{ width: "440px", margin: "auto", marginBottom: "20px" }}
            />
            <h2 className="fade-in-text">Smart budgeting made simple</h2>
          </div>
        </Col>
        <Col md={6}>
          <div
            className="login-box"
            style={{ maxWidth: "380px", margin: "auto" }}
          >
            <h1 className="mb-4 text-center">Enter Email</h1>
            <Form.Group className="mb-3" controlId="email">
              <Form.Control
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Button
              className="me-2 mb-4 w-100"
              variant="primary"
              type="submit"
              onClick={handleSubmit}
            >
              Send Password Reset Email
            </Button>
            <p>
              Remembered your password?
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

export default ForgotPassword;
