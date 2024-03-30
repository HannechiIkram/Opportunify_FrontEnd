import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { MdOutlineQuiz } from "react-icons/md"; 

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const response = await axios.get('http://localhost:3000/evaluations'); // Endpoint pour récupérer les quizzes
      setQuizzes(response.data);
    } catch (error) {
      console.error('Error fetching quizzes:', error);
    }
  };

  return (
    <div className="container mx-auto mt-8 pt-32">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Quiz List </h1>
      <div className="grid grid-cols-3 gap-4">
        {quizzes.map((quiz) => (
          <div key={quiz._id} className="bg-gray-200 p-4 rounded-md">
            <h2 className="text-lg font-semibold text-black">{quiz.title}</h2>
            <p className="text-gray-700">{quiz.description}</p>
            <Link to={`/quiz/${quiz._id}`} className="bg-red-800 text-white px-3 py-1 rounded-md mt-2 inline-block">
            Take the quiz
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizList;
