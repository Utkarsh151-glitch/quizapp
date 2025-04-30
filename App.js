import React, { useState, useEffect } from 'react';
import quizData from './apptest'; 
import './index.css';

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [timeLeft, setTimeLeft] = useState(30);
  const [timerActive, setTimerActive] = useState(true);

  useEffect(() => {
    if (timerActive && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
    if (timeLeft === 0) {
      handleNextQuestion(); 
    }
  }, [timeLeft, timerActive]);


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
        setTimeLeft(30);
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
    setTimeLeft(30);
    setTimerActive(true);
  };

  
  const progressPercentage = ((currentQuestion + 1) / quizData.length) * 100;

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

          <div className="timer">Time Left: {timeLeft}s</div>
        </div>
      )}

      {/* Progress Bar */}
      <div className="progress-bar" style={{ width: `${progressPercentage}%` }} />
    </div>
  );
}

export default App;
