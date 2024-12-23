import React, { useState } from 'react';

const Quiz = ({ quiz, onSubmitAnswer }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleAnswerSelect = (answerId) => {
    setSelectedAnswer(answerId);
  };

  const handleSubmit = () => {
    if (selectedAnswer) {
      onSubmitAnswer(quiz.id, selectedAnswer);
      setSelectedAnswer(null);
    } else {
      alert('Please select an answer!');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">{quiz.text}</h2>

      <div className="space-y-4 mb-6">
        {quiz.answers.map((answer) => (
          <div
            key={answer.id}
            className="flex items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
            onClick={() => handleAnswerSelect(answer.id)}
          >
            <input
              type="radio"
              id={answer.id}
              name="answer"
              value={answer.id}
              checked={selectedAnswer === answer.id}
              onChange={() => handleAnswerSelect(answer.id)}
              className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <label
              htmlFor={answer.id}
              className="ml-3 block text-sm font-medium text-gray-700 cursor-pointer"
            >
              {answer.text}
            </label>
          </div>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg
                 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500
                 focus:ring-offset-2 transition-colors disabled:opacity-50"
        disabled={!selectedAnswer}
      >
        Submit
      </button>
    </div>
  );
};

export default Quiz;
