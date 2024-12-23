import React, { useState } from "react";

const QuizJoinForm = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [roomId, setRoomId] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!name || !roomId) {
      setError("Both fields are required.");
      return;
    }
    setError(""); // Clear any previous error
    onSubmit(roomId, name);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border border-gray-300 rounded-lg shadow-lg bg-white text-center">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Join a Quiz</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter Quiz ID"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          className="w-full p-3 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      <button
        type="submit"
        onClick={handleSubmit}
        className="w-full py-3 text-lg text-white bg-blue-500 rounded-md hover:bg-blue-600 transition duration-300"
      >
        Join Quiz
      </button>
    </div>
  );
};

export default QuizJoinForm;
