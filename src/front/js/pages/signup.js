import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export const Signup = () => {
      const { store, actions } = useContext(Context);
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const navigate = useNavigate();

      const handleSubmit = () => {
            actions.signup(email, password).then(() => {
                  navigate("/login");
            })
            
      };


	return (
      <Container className="mt-5">
           
            <Row className="justify-content-md-center rounded-3 py-5 bg-dark text-white" style={{width: "380px", margin: "auto"}}>
              <Col md="auto" className="text-center">
                     <div>
                        <h1 className="mb-4">Register</h1>
                       
                              <Form.Group className="mb-3" controlId="email">
                                    <Form.Control type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    <Form.Text className="text-muted">
                                    </Form.Text>
                              </Form.Group>

                              <Form.Group className="mb-3" controlId="password">
                                    <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                              </Form.Group>

                              <Button className="me-2 mb-4 w-100" variant="outline-light" type="submit" onClick={handleSubmit}>
                                    Signup
                              </Button>

                        
                        <p>Already registered?<a href="/login" className="link-info link-register"> Login</a></p>
                     </div>
                 </Col>
           </Row>
      </Container>
	);
};
