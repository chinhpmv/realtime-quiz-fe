import React, { useState, useEffect } from 'react';
import axios from 'axios';
import JoinForm from './components/QuizJoinForm';
import Quiz from './components/QuizRoom';
import Leaderboard from './components/Leaderboard';
import useUserID from './hooks/useUserID';

const App = () => {
  const [roomId, setRoomId] = useState('');
  const [quizzes, setQuizzes] = useState([]);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(-1);
  const [leaderboard, setLeaderboard] = useState([]);
  const userId = useUserID();

  const fetchLeaderboard = async (roomId) => {
    try {
      const response = await axios.get(`http://localhost:3001/api/quizzes/${roomId}/leaderboard`)
      setLeaderboard(response.data);
    } catch (error) {
      console.error('Failed to fetch leaderboard:', error);
    }
  }

  // Join the room
  const handleJoin = async (roomId, playerName) => {
    try {
      const response = await axios.post(`http://localhost:3001/api/quizzes/${roomId}/join`, { playerName, userId });
      setQuizzes(response.data);
      setRoomId(roomId);

      fetchLeaderboard(roomId)

      // Establish WebSocket connection
      const socket = new WebSocket(`ws://localhost:8080/${roomId}`);

      socket.onopen = () => {
        console.log('Connected to the server');
        socket.send(JSON.stringify({ type: 'join', userId: userId }));
      }

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === 'LEADERBOARD_UPDATE') {
          setLeaderboard(data.payload);
        }
      };
    } catch (error) {
      console.error('Failed to join room:', error);
    }
  };

  // Submit quiz answer
  const handleSubmitAnswer = async (quizId, answerId) => {
    try {
      await axios.post(`http://localhost:3001/api/quizzes/${roomId}/answer`, { userId, quizId, answerId });
      // Move to the next quiz
      setCurrentQuizIndex((prevIndex) => prevIndex + 1);
    } catch (error) {
      console.error('Failed to submit answer:', error);
    }
  };

  useEffect(() => {
    if (quizzes.length === 0) return;
    console.log('quizzes', quizzes);
    setCurrentQuizIndex(0);
  }, [quizzes])

  return (
    <div className="min-h-screen w-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {currentQuizIndex === -1 && (
          <JoinForm onSubmit={handleJoin} />
        )}

        {currentQuizIndex >= 0 && currentQuizIndex < quizzes.length && (
          <Quiz
            quiz={quizzes[currentQuizIndex]}
            onSubmitAnswer={handleSubmitAnswer}
          />
        )}

        {quizzes && quizzes.length > 0 && (
          <div className="mt-8">
            <Leaderboard leaderboard={leaderboard} />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
