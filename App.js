import React, { useState } from 'react';
import quizData from './apptest'; // Correct the file name here
import './index.css';

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [feedback, setFeedback] = useState('');

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    if (selectedOption === '') return;

    if (selectedOption === quizData[currentQuestion].answer) {
      setScore(score + 1);
      setFeedback('Correct!');
    } else {
      setFeedback(`Wrong! Correct answer: ${quizData[currentQuestion].answer}`);
    }

    setTimeout(() => {
      setFeedback('');
      setSelectedOption('');
      if (currentQuestion + 1 < quizData.length) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setShowScore(true);
      }
    }, 1000);
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedOption('');
    setScore(0);
    setShowScore(false);
    setFeedback('');
  };

  return (
    <div className="app">
      <h1>Quiz App</h1>
      {showScore ? (
        <div className="score-section">
          <h2>Your Score: {score} / {quizData.length}</h2>
          <button className="next-btn" onClick={handleRestart}>Restart Quiz</button>
        </div>
      ) : (
        <div className="question-section">
          <div className="question-count">
            Question {currentQuestion + 1} / {quizData.length}
          </div>
          <div className="question-text">
            {quizData[currentQuestion].question}
          </div>
          <div className="options">
            {quizData[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionClick(option)}
                className={selectedOption === option ? 'selected' : ''}
              >
                {option}
              </button>
            ))}
          </div>
          <button className="next-btn" onClick={handleNextQuestion}>Next</button>
          {feedback && <div className="feedback">{feedback}</div>}
        </div>
      )}
    </div>
  );
}

export default App;
