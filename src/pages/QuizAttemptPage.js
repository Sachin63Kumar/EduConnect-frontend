import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const QuizAttemptPage = () => {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/quizzes/${quizId}`
        );
        setQuiz(response.data);
        setAnswers(new Array(response.data.questions.length).fill(""));
      } catch (error) {
        console.error(error);
      }
    };
    fetchQuiz();
  }, [quizId]);

  const handleAnswerChange = (index, value) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = value;
    setAnswers(updatedAnswers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/quizzes/submit/${quizId}`,
        {
          userId: JSON.parse(atob(token.split(".")[1])).id,
          answers,
        }
      );
      setScore(response.data.score);
    } catch (error) {
      console.error(error);
    }
  };

  if (!quiz) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">{quiz.title}</h1>
      <p className="mb-6">{quiz.instructions}</p>
      {score !== null ? (
        <div>
          <h2 className="text-xl font-bold">Your Score: {score}</h2>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {quiz.questions.map((q, qIndex) => (
            <div key={qIndex} className="mb-4 p-4 border rounded bg-gray-50">
              <h2 className="text-lg font-bold mb-2">Question {qIndex + 1}</h2>
              <p className="mb-2">{q.questionText}</p>
              {q.questionType === "MCQ" && (
                <div>
                  {q.options.map((o, oIndex) => (
                    <div key={oIndex} className="mb-2">
                      <label>
                        <input
                          type="radio"
                          name={`question-${qIndex}`}
                          value={o}
                          onChange={(e) =>
                            handleAnswerChange(qIndex, e.target.value)
                          }
                          className="mr-2"
                        />
                        {o}
                      </label>
                    </div>
                  ))}
                </div>
              )}
              {q.questionType === "Fill in the Blank" && (
                <div>
                  <label>
                    <input
                      type="text"
                      name={`question-${qIndex}`}
                      onChange={(e) =>
                        handleAnswerChange(qIndex, e.target.value)
                      }
                      className="border rounded p-2 w-full"
                    />
                  </label>
                </div>
              )}
              {q.questionType === "True/False" && (
                <div>
                  <label>
                    <input
                      type="radio"
                      name={`question-${qIndex}`}
                      value="True"
                      onChange={(e) =>
                        handleAnswerChange(qIndex, e.target.value)
                      }
                      className="mr-2"
                    />
                    True
                  </label>
                  <label className="ml-4">
                    <input
                      type="radio"
                      name={`question-${qIndex}`}
                      value="False"
                      onChange={(e) =>
                        handleAnswerChange(qIndex, e.target.value)
                      }
                      className="mr-2"
                    />
                    False
                  </label>
                </div>
              )}
            </div>
          ))}
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Submit Quiz
          </button>
        </form>
      )}
    </div>
  );
};

export default QuizAttemptPage;
