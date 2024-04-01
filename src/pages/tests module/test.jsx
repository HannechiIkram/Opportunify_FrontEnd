import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Countdown from 'react-countdown';
import { useNavigate } from 'react-router-dom';

const Quiz = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [score, setScore] = useState(null);
  const [showLastQuestion, setShowLastQuestion] = useState(true);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/evaluations/quiz/${quizId}`);
        setQuiz(response.data);
        setAnswers(new Array(response.data.questions.length).fill(''));
      } catch (error) {
        console.error('Error fetching quiz:', error);
      }
    };

    fetchQuiz();
  }, [quizId]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (timeLeft > 0 && showLastQuestion) {
        setTimeLeft(timeLeft - 1);
      } else {
        handleQuestionChange();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, showLastQuestion]);

  const handleAnswerChange = (index, optionIndex) => {
    const newAnswers = [...answers];
    newAnswers[index] = optionIndex;
    setAnswers(newAnswers);
    handleQuestionChange(); // Passer automatiquement à la question suivante après avoir répondu
  };

  const handleQuestionChange = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimeLeft(15); // Réinitialiser le temps pour chaque nouvelle question
    } else {
      setShowLastQuestion(false); // Masquer la dernière question lorsque le score s'affiche
      calculateScore();
    }
  };

  const calculateScore = () => {
    let totalScore = 0;
    answers.forEach((answer, index) => {
      if (answer === quiz.questions[index].correctOptionIndex) {
        totalScore++;
      }
    });
    setScore(totalScore); // Mettre à jour le score
  };

  if (!quiz) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-300 min-h-screen flex justify-center items-center pt-32">
      <div className="max-w-lg bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-8">
          <h2 className="text-3xl font-bold mb-8">{quiz.title}</h2>
          {score !== null ? (
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-2">Your Score:</h3>
              <p className="text-3xl font-bold">{score}/{quiz.questions.length}</p>
            </div>
          ) : (
            <div className="mb-8">
                  {showLastQuestion && (
                <>
                  <div className="h-2 bg-gray-600 rounded-full mb-4" style={{ width: `${(timeLeft / 15) * 100}%` }}></div>
                  <Countdown date={Date.now() + timeLeft * 1000} onComplete={handleQuestionChange} renderer={({ seconds }) => null} />
                </>
              )}
              <h3 className="text-xl font-semibold mb-4">{quiz.questions[currentQuestionIndex].text}</h3>
              <ul>
                {quiz.questions[currentQuestionIndex].options.map((option, optionIndex) => (
                  <li key={optionIndex} className="mb-4">
                    <label className="flex items-center text-lg">
                      <input
                        type="radio"
                        name={`question-${currentQuestionIndex}`}
                        value={optionIndex}
                        checked={answers[currentQuestionIndex] === optionIndex}
                        onChange={() => handleAnswerChange(currentQuestionIndex, optionIndex)}
                        className="mr-2"
                      />
                      {option}
                    </label>
                  </li>
                ))}
              </ul>
            
            </div>
          )}
          <ol className="flex items-center">
            {quiz.questions.map((question, index) => (
              <li key={index} className={`relative w-full mb-6 ${index <= currentQuestionIndex ? 'text-gray-900' : 'text-gray-300'}`}>
                <div className="flex items-center">
                  <div className={`z-10 flex items-center justify-center w-6 h-6 ${index <= currentQuestionIndex ? 'bg-gray-600' : 'bg-gray-200'} rounded-full ring-0 ring-white dark:bg-gray-900 sm:ring-8 dark:ring-gray-900 shrink-0`}>
                    {index < currentQuestionIndex ? (
                      <svg className="w-2.5 h-2.5 text-blue-100 dark:text-gray-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5"/>
                      </svg>
                    ) : (
                      <span className="flex w-3 h-3 bg-gray-600 rounded-full"></span>
                    )}
                  </div>
                  {index < quiz.questions.length - 1 && (
                    <div className="flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
                  )}
                </div>
                <div className="mt-3">
                  <h3 className="font-medium">{`Step ${index + 1}`}</h3>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
