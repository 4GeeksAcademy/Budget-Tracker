import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from 'react-router-dom';
import NavbarLeft from "../component/navbarLeft";
import '../../styles/feedback.css'; 

export const Feedback = () => {
  const { actions } = useContext(Context);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [feedbackMessage, setFeedbackMessage] = useState(''); // Renamed for clarity
  const [feedbackCategory, setFeedbackCategory] = useState(''); // Renamed for clarity
  const [feedbackOpinion, setFeedbackOpinion] = useState(''); // Renamed for clarity

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token == null) {
      navigate("/login");
    } else {
      actions.syncToken(token);
    }
    setIsLoading(false);
  }, []);

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleFeedbackCategoryChange = (e) => {
    setFeedbackCategory(e.target.value);
  };

  const handleFeedbackOpinionChange = (event) => {
    setFeedbackOpinion(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Construct the feedback object to match your backend expectations
      const feedbackData = {
        opinion: opinion, // make sure these match the state variables you've declared and are using
        category: category,
        message: feedback,
      };
  
      // Send the feedback data to the backend using the postFeedback action
      const response = await actions.postFeedback(feedbackData);
  
      // If the response is okay and feedback is submitted
      if (response.ok) {
        // Here you might want to clear the form
        setFeedback('');
        setCategory('');
        setOpinion('');
        
        // And possibly give some user feedback, like a success message
        alert('Thank you for your feedback!');
  
        // If you have a redirect or further logic, place it here
      } else {
        // If the server response is not ok, throw an error
        const errorData = await response.json(); // assuming the server sends JSON with error details
        throw new Error(errorData.message || 'Something went wrong');
      }
    } catch (error) {
      // Handle any errors that occurred during submission
      console.error('Submission error:', error);
      alert('Failed to submit feedback: ' + error.message);
    }
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
                      checked={feedbackOpinion === "sad"}
                      onChange={handleFeedbackOpinionChange}
                    /> 😔
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="opinion"
                      value="neutral"
                      checked={feedbackOpinion === "neutral"}
                      onChange={handleFeedbackOpinionChange}
                    /> 😐
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="opinion"
                      value="happy"
                      checked={feedbackOpinion === "happy"}
                      onChange={handleFeedbackOpinionChange}
                    /> 🙂
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="opinion"
                      value="very-happy"
                      checked={feedbackOpinion === "very-happy"}
                      onChange={handleFeedbackOpinionChange}
                    /> 😄
                  </label>
                </div>
              </div>
              <div>
                <p>Please select your feedback category below:</p>
                <select value={feedbackCategory} onChange={handleFeedbackCategoryChange}>
                  <option value="suggestion">Suggestion</option>
                  <option value="issue">Something is not quite right</option>
                  <option value="compliment">Compliment</option>
                </select>
              </div>
              <div>
                <p>Please leave your feedback below:</p>
                <textarea value={feedbackMessage} onChange={handleFeedbackMessageChange} />
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