import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../../styles/login.css';

export const Login = () => {
	const { store, actions } = useContext(Context);
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const navigate = useNavigate();
 
      const handleLogin = () => {
            actions.login(email, password).then(()=> {
                  navigate("/dashboard");
            })
            };

            useEffect(() => {
                  // This code runs after the component mounts
                  document.body.classList.add('dark-page');
              
                  // This function runs when the component unmounts
                  return () => {
                    document.body.classList.remove('dark-page');
                  };
                }, []);

            const imageUrl = "https://static.vecteezy.com/system/resources/previews/017/169/392/non_2x/analyzing-budget-businessman-holding-a-marker-and-standing-next-to-a-planner-with-a-clipboard-vector.jpg";

            return (
                  <Container className="mt-5">
                    <Row className="justify-content-md-center align-items-center">
                      <Col md={7} className="d-none d-md-block">
                        <img src={imageUrl} alt="Budget Planning" className="img-fluid" />
                      </Col>
                      <Col md={5}>
                        <div className="login-box" style={{ maxWidth: "380px", margin: "auto" }}>
                          <h1 className="mb-4 text-center">Login</h1>                 
                          <Form.Group className="mb-3" controlId="email">
                            <Form.Control type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                          </Form.Group>
                          <Form.Group className="mb-3" controlId="password">
                            <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                          </Form.Group>
                          <Button className="me-2 mb-4 w-100" variant="primary" type="submit" onClick={handleLogin}>
                            Login
                          </Button>                    
                          <p>Don't have an account?<a href="/signup" className="link-info link-register"> Register</a></p>
                        </div>
                      </Col>
                    </Row>
                  </Container>
                );
};