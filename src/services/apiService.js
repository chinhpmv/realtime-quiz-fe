export const joinQuiz = async (quizId) => {
  const response = await fetch(`http://localhost:3001/api/quizzes/${quizId}`);
  if (!response.ok) throw new Error('Quiz not found');
  return response.json();
};
