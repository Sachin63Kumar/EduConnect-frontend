import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const QuizCreationPage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [instructions, setInstructions] = useState("");
  const [timeDuration, setTimeDuration] = useState("");
  const [numberOfAttempts, setNumberOfAttempts] = useState(1);
  const [questions, setQuestions] = useState([]);

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      {
        questionText: "",
        questionType: "MCQ",
        options: ["", ""],
        correctAnswer: "",
        points: 1,
      },
    ]);
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options[oIndex] = value;
    setQuestions(updatedQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/quizzes/create`,
        {
          title,
          instructions,
          timeDuration,
          numberOfAttempts,
          courseId,
          questions,
        }
      );
      navigate(`/courses/${courseId}/quizzes`);
    } catch (error) {
      console.error("Error creating quiz:", error);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Create Quiz</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border rounded p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Instructions
            </label>
            <textarea
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              className="border rounded p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Time Duration (minutes)
            </label>
            <input
              type="number"
              value={timeDuration}
              onChange={(e) => setTimeDuration(e.target.value)}
              className="border rounded p-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Number of Attempts
            </label>
            <input
              type="number"
              value={numberOfAttempts}
              onChange={(e) => setNumberOfAttempts(e.target.value)}
              className="border rounded p-2 w-full"
              required
            />
          </div>
          {questions.map((q, index) => (
            <div key={index} className="mb-4 p-4 border rounded bg-gray-50">
              <div className="mb-2">
                <label className="block text-sm font-medium mb-2">
                  Question Text
                </label>
                <input
                  type="text"
                  value={q.questionText}
                  onChange={(e) =>
                    handleQuestionChange(index, "questionText", e.target.value)
                  }
                  className="border rounded p-2 w-full"
                  required
                />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium mb-2">
                  Question Type
                </label>
                <select
                  value={q.questionType}
                  onChange={(e) =>
                    handleQuestionChange(index, "questionType", e.target.value)
                  }
                  className="border rounded p-2 w-full"
                  required
                >
                  <option value="MCQ">MCQ</option>
                  <option value="Fill in the Blank">Fill in the Blank</option>
                  <option value="True/False">True/False</option>
                </select>
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium mb-2">Points</label>
                <input
                  type="number"
                  value={q.points}
                  onChange={(e) =>
                    handleQuestionChange(index, "points", e.target.value)
                  }
                  className="border rounded p-2 w-full"
                  required
                />
              </div>
              {q.questionType === "MCQ" && (
                <div className="mb-2">
                  <label className="block text-sm font-medium mb-2">
                    Options
                  </label>
                  {q.options.map((option, oIndex) => (
                    <div key={oIndex} className="flex items-center mb-2">
                      <input
                        type="text"
                        value={option}
                        onChange={(e) =>
                          handleOptionChange(index, oIndex, e.target.value)
                        }
                        className="border rounded p-2 w-full mr-2"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          handleQuestionChange(
                            index,
                            "options",
                            q.options.filter((_, idx) => idx !== oIndex)
                          )
                        }
                        className="bg-red-500 text-white px-2 py-1 rounded"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() =>
                      handleQuestionChange(index, "options", [...q.options, ""])
                    }
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    Add Option
                  </button>
                </div>
              )}
              <div className="mb-2">
                <label className="block text-sm font-medium mb-2">
                  Correct Answer
                </label>
                <input
                  type="text"
                  value={q.correctAnswer}
                  onChange={(e) =>
                    handleQuestionChange(index, "correctAnswer", e.target.value)
                  }
                  className="border rounded p-2 w-full"
                  required
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddQuestion}
            className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
          >
            Add Question
          </button>
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Create Quiz
          </button>
        </form>
      </div>
    </div>
  );
};

export default QuizCreationPage;
