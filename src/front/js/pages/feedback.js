import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NavbarLeft from "../component/navbarLeft";
import '../../styles/feedback.css'; 

export const Feedback = () => {
  const { actions } = useContext(Context);
  const [feedback, setFeedback] = useState('');
  const [category, setCategory] = useState('');
  const [opinion, setOpinion] = useState('');

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleOpinionChange = (event) => {
    setOpinion(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit feedback to the server or perform an action
    console.log('Submitting feedback:', feedback, 'Category:', category, 'Opinion:', opinion);
    // actions.postFeedback({ feedback, category, opinion }); // Example action to send feedback to backend
  };

  return (
    <Container fluid className="main-wrapper">
      <Row className="row-wrapper">
        <Col xs lg="1" className="left-column">
          <NavbarLeft />
        </Col>
        <Col className="main-column">
          <div className="feedback-form-container">
            <h2>Your feedback</h2>
            <p>We would like your feedback to improve our website.</p>
            <form onSubmit={handleSubmit}>
              <div>
                <p>What is your opinion of the overall website?</p>
                <div className="opinion-options">
                  {/* Radio buttons for emoji feedback */}
                  <label>
                    <input
                      type="radio"
                      name="opinion"
                      value="sad"
                      checked={opinion === "sad"}
                      onChange={handleOpinionChange}
                    /> 😔
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="opinion"
                      value="neutral"
                      checked={opinion === "neutral"}
                      onChange={handleOpinionChange}
                    /> 😐
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="opinion"
                      value="happy"
                      checked={opinion === "happy"}
                      onChange={handleOpinionChange}
                    /> 🙂
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="opinion"
                      value="very-happy"
                      checked={opinion === "very-happy"}
                      onChange={handleOpinionChange}
                    /> 😄
                  </label>
                </div>
              </div>
              <div>
                <p>Please select your feedback category below:</p>
                <select value={category} onChange={handleCategoryChange}>
                  <option value="suggestion">Suggestion</option>
                  <option value="issue">Something is not quite right</option>
                  <option value="compliment">Compliment</option>
                </select>
              </div>
              <div>
                <p>Please leave your feedback below:</p>
                <textarea value={feedback} onChange={handleFeedbackChange} />
              </div>
              <button type="submit">Send</button>
            </form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Feedback;