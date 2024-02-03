import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";
import NavbarLeft from "../component/navbarLeft";
import "../../styles/feedback.css";

export const Feedback = () => {
  const { actions } = useContext(Context);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [feedbackMessage, setFeedbackMessage] = useState(""); // Renamed for clarity
  const [feedbackCategory, setFeedbackCategory] = useState(""); // Renamed for clarity
  const [feedbackOpinion, setFeedbackOpinion] = useState(""); // Renamed for clarity
  const [isSubmitted, setIsSubmitted] = useState(false); //state variable to check if the form is submitted
  const [opinionError, setOpinionError] = useState("");

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token == null) {
      navigate("/login");
    } else {
      actions.syncToken(token);
    }
    setIsLoading(false);
  }, []);

  const handleFeedbackMessageChange = (e) => {
    setFeedbackMessage(e.target.value);
  };

  const handleFeedbackCategoryChange = (e) => {
    setFeedbackCategory(e.target.value);
  };

  function handleFeedbackOpinionChange(e) {
    const labels = document.querySelectorAll(".opinion-options label");
    labels.forEach((label) => label.classList.remove("selected"));

    const checkedRadioButton = e.target;
    const checkedLabel = checkedRadioButton.parentNode;
    checkedLabel.classList.add("selected");

    setFeedbackOpinion(e.target.value);
    setOpinionError("");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if a radio button is selected
    if (!feedbackOpinion) {
      // Update the opinionError state variable
      setOpinionError("Please select an emoji.");
      return;
    }

    try {
      const feedbackData = {
        opinion: feedbackOpinion,
        category: feedbackCategory,
        message: feedbackMessage,
      };

      const response = await actions.postFeedback(feedbackData);

      if (response.ok) {
        setIsSubmitted(true); // Set isSubmitted to true on successful submission
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Failed to submit feedback: " + error.message);
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
            {isSubmitted ? (
              <h5>Thanks for helping us improve!</h5> // Render this if isSubmitted is true
            ) : (
              <>
                <h5 className="mb-4">Your feedback</h5>
                <form onSubmit={handleSubmit}>
                  <div>
                    <span>What is your opinion of the overall website?</span>
                    <div className="opinion-options">
                      <label>
                        <input
                          type="radio"
                          name="opinion"
                          value="sad"
                          checked={feedbackOpinion === "sad"}
                          onChange={handleFeedbackOpinionChange}
                        />
                        😔
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="opinion"
                          value="neutral"
                          checked={feedbackOpinion === "neutral"}
                          onChange={handleFeedbackOpinionChange}
                        />
                        😐
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="opinion"
                          value="happy"
                          checked={feedbackOpinion === "happy"}
                          onChange={handleFeedbackOpinionChange}
                        />
                        🙂
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="opinion"
                          value="very-happy"
                          checked={feedbackOpinion === "very-happy"}
                          onChange={handleFeedbackOpinionChange}
                        />
                        😄
                      </label>
                    </div>
                  </div>
                  <div className="mt-1">
                    <select
                      value={feedbackCategory}
                      onChange={handleFeedbackCategoryChange}
                      required
                    >
                      <option value="" disabled hidden>
                        Select your feedback
                      </option>
                      <option value="suggestion">Suggestion</option>
                      <option value="issue">
                        Something is not quite right
                      </option>
                      <option value="compliment">Compliment</option>
                    </select>
                  </div>
                  <div className="mt-1">
                    <textarea
                      value={feedbackMessage}
                      onChange={handleFeedbackMessageChange}
                      placeholder="Drop your comments here..."
                      required
                    />
                  </div>
                  <button type="submit" style={{ backgroundColor: "#00aa93" }}>
                    Submit
                  </button>
                  {opinionError && <span className="error">{opinionError}</span>}
                </form>
              </>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Feedback;
