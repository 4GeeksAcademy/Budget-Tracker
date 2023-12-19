import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export const Login = () => {
	const { store, actions } = useContext(Context);
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const navigate = useNavigate();
 
      const handleLogin = () => {
            actions.login(email, password).then(()=> {
                  navigate("/");
            })
            };

 
	return (
      <Container className="mt-5">
           
            <Row className="justify-content-md-center rounded-3 py-5 bg-dark text-white" style={{width: "380px", margin: "auto"}}>
              <Col md="auto" className="text-center">                  
                  <div>
                  <h1 className="mb-4">Login</h1>                  
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
