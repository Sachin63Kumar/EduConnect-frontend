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
        options: ["", ""], // Start with two empty options
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

// import React, { useState } from "react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";

// const QuizCreationPage = () => {
//   const { courseId } = useParams();
//   const navigate = useNavigate();
//   const [title, setTitle] = useState("");
//   const [instructions, setInstructions] = useState("");
//   const [timeDuration, setTimeDuration] = useState("");
//   const [numberOfAttempts, setNumberOfAttempts] = useState(1);
//   const [questions, setQuestions] = useState([]);

//   const handleAddQuestion = () => {
//     setQuestions([
//       ...questions,
//       {
//         questionText: "",
//         questionType: "MCQ",
//         options: ["", ""], // Start with two empty options
//         correctAnswer: "",
//         points: 1,
//       },
//     ]);
//   };

//   const handleQuestionChange = (index, field, value) => {
//     const updatedQuestions = [...questions];
//     updatedQuestions[index][field] = value;
//     setQuestions(updatedQuestions);
//   };

//   const handleOptionChange = (qIndex, oIndex, value) => {
//     const updatedQuestions = [...questions];
//     updatedQuestions[qIndex].options[oIndex] = value;
//     setQuestions(updatedQuestions);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         `http://localhost:5000/api/quizzes/create`,
//         {
//           title,
//           instructions,
//           timeDuration,
//           numberOfAttempts,
//           courseId,
//           questions,
//         }
//       );
//       navigate(`/courses/${courseId}/quizzes`);
//     } catch (error) {
//       console.error("Error creating quiz:", error);
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-6">Create Quiz</h1>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label className="block text-sm font-medium mb-2">Title</label>
//           <input
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             className="border rounded p-2 w-full"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-sm font-medium mb-2">Instructions</label>
//           <textarea
//             value={instructions}
//             onChange={(e) => setInstructions(e.target.value)}
//             className="border rounded p-2 w-full"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-sm font-medium mb-2">
//             Time Duration (minutes)
//           </label>
//           <input
//             type="number"
//             value={timeDuration}
//             onChange={(e) => setTimeDuration(e.target.value)}
//             className="border rounded p-2 w-full"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-sm font-medium mb-2">
//             Number of Attempts
//           </label>
//           <input
//             type="number"
//             value={numberOfAttempts}
//             onChange={(e) => setNumberOfAttempts(e.target.value)}
//             className="border rounded p-2 w-full"
//             required
//           />
//         </div>
//         {questions.map((q, index) => (
//           <div key={index} className="mb-4 p-4 border rounded bg-gray-50">
//             <div className="mb-2">
//               <label className="block text-sm font-medium mb-2">
//                 Question Text
//               </label>
//               <input
//                 type="text"
//                 value={q.questionText}
//                 onChange={(e) =>
//                   handleQuestionChange(index, "questionText", e.target.value)
//                 }
//                 className="border rounded p-2 w-full"
//                 required
//               />
//             </div>
//             <div className="mb-2">
//               <label className="block text-sm font-medium mb-2">
//                 Question Type
//               </label>
//               <select
//                 value={q.questionType}
//                 onChange={(e) =>
//                   handleQuestionChange(index, "questionType", e.target.value)
//                 }
//                 className="border rounded p-2 w-full"
//                 required
//               >
//                 <option value="MCQ">MCQ</option>
//                 <option value="Fill in the Blank">Fill in the Blank</option>
//                 <option value="True/False">True/False</option>
//               </select>
//             </div>
//             <div className="mb-2">
//               <label className="block text-sm font-medium mb-2">Points</label>
//               <input
//                 type="number"
//                 value={q.points}
//                 onChange={(e) =>
//                   handleQuestionChange(index, "points", e.target.value)
//                 }
//                 className="border rounded p-2 w-full"
//                 required
//               />
//             </div>
//             {q.questionType === "MCQ" && (
//               <div className="mb-2">
//                 <label className="block text-sm font-medium mb-2">
//                   Options
//                 </label>
//                 {q.options.map((option, oIndex) => (
//                   <div key={oIndex} className="flex items-center mb-2">
//                     <input
//                       type="text"
//                       value={option}
//                       onChange={(e) =>
//                         handleOptionChange(index, oIndex, e.target.value)
//                       }
//                       className="border rounded p-2 w-full mr-2"
//                     />
//                     <button
//                       type="button"
//                       onClick={() =>
//                         handleQuestionChange(
//                           index,
//                           "options",
//                           q.options.filter((_, idx) => idx !== oIndex)
//                         )
//                       }
//                       className="bg-red-500 text-white px-2 py-1 rounded"
//                     >
//                       Remove
//                     </button>
//                   </div>
//                 ))}
//                 <button
//                   type="button"
//                   onClick={() =>
//                     handleQuestionChange(index, "options", [...q.options, ""])
//                   }
//                   className="bg-blue-500 text-white px-2 py-1 rounded"
//                 >
//                   Add Option
//                 </button>
//               </div>
//             )}
//             <div className="mb-2">
//               <label className="block text-sm font-medium mb-2">
//                 Correct Answer
//               </label>
//               <input
//                 type="text"
//                 value={q.correctAnswer}
//                 onChange={(e) =>
//                   handleQuestionChange(index, "correctAnswer", e.target.value)
//                 }
//                 className="border rounded p-2 w-full"
//                 required
//               />
//             </div>
//           </div>
//         ))}
//         <button
//           type="button"
//           onClick={handleAddQuestion}
//           className="bg-green-500 text-white px-4 py-2 rounded"
//         >
//           Add Question
//         </button>
//         <button
//           type="submit"
//           className="bg-blue-500 text-white px-4 py-2 rounded ml-4"
//         >
//           Create Quiz
//         </button>
//       </form>
//     </div>
//   );
// };

// export default QuizCreationPage;

// import React, { useState } from "react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";

// const QuizCreationPage = () => {
//   const { courseId } = useParams();
//   const navigate = useNavigate();
//   const [title, setTitle] = useState("");
//   const [instructions, setInstructions] = useState("");
//   const [timeDuration, setTimeDuration] = useState("");
//   const [numberOfAttempts, setNumberOfAttempts] = useState(1);
//   const [questions, setQuestions] = useState([]);

//   const handleAddQuestion = () => {
//     setQuestions([
//       ...questions,
//       {
//         questionText: "",
//         questionType: "MCQ",
//         options: [],
//         correctAnswer: "",
//         points: 1,
//       },
//     ]);
//   };

//   const handleQuestionChange = (index, field, value) => {
//     const updatedQuestions = questions.map((q, i) =>
//       i === index ? { ...q, [field]: value } : q
//     );
//     setQuestions(updatedQuestions);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         `http://localhost:5000/api/quizzes/create`,
//         {
//           title,
//           instructions,
//           timeDuration,
//           numberOfAttempts,
//           courseId,
//           questions,
//         }
//       );
//       navigate(`/courses/${courseId}/quizzes`);
//     } catch (error) {
//       console.error("Error creating quiz:", error);
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-6">Create Quiz</h1>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label className="block text-sm font-medium mb-2">Title</label>
//           <input
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             className="border rounded p-2 w-full"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-sm font-medium mb-2">Instructions</label>
//           <textarea
//             value={instructions}
//             onChange={(e) => setInstructions(e.target.value)}
//             className="border rounded p-2 w-full"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-sm font-medium mb-2">
//             Time Duration (minutes)
//           </label>
//           <input
//             type="number"
//             value={timeDuration}
//             onChange={(e) => setTimeDuration(e.target.value)}
//             className="border rounded p-2 w-full"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-sm font-medium mb-2">
//             Number of Attempts
//           </label>
//           <input
//             type="number"
//             value={numberOfAttempts}
//             onChange={(e) => setNumberOfAttempts(e.target.value)}
//             className="border rounded p-2 w-full"
//             required
//           />
//         </div>
//         {questions.map((q, index) => (
//           <div key={index} className="mb-4 p-4 border rounded bg-gray-50">
//             <div className="mb-2">
//               <label className="block text-sm font-medium mb-2">
//                 Question Text
//               </label>
//               <input
//                 type="text"
//                 value={q.questionText}
//                 onChange={(e) =>
//                   handleQuestionChange(index, "questionText", e.target.value)
//                 }
//                 className="border rounded p-2 w-full"
//                 required
//               />
//             </div>
//             <div className="mb-2">
//               <label className="block text-sm font-medium mb-2">
//                 Question Type
//               </label>
//               <select
//                 value={q.questionType}
//                 onChange={(e) =>
//                   handleQuestionChange(index, "questionType", e.target.value)
//                 }
//                 className="border rounded p-2 w-full"
//                 required
//               >
//                 <option value="MCQ">MCQ</option>
//                 <option value="Fill in the Blank">Fill in the Blank</option>
//                 <option value="True/False">True/False</option>
//               </select>
//             </div>
//             <div className="mb-2">
//               <label className="block text-sm font-medium mb-2">Points</label>
//               <input
//                 type="number"
//                 value={q.points}
//                 onChange={(e) =>
//                   handleQuestionChange(index, "points", e.target.value)
//                 }
//                 className="border rounded p-2 w-full"
//                 required
//               />
//             </div>
//             {q.questionType === "MCQ" && (
//               <div className="mb-2">
//                 <label className="block text-sm font-medium mb-2">
//                   Options
//                 </label>
//                 {q.options.map((option, oIndex) => (
//                   <div key={oIndex} className="flex items-center mb-2">
//                     <input
//                       type="text"
//                       value={option}
//                       onChange={(e) =>
//                         handleQuestionChange(
//                           index,
//                           `options.${oIndex}`,
//                           e.target.value
//                         )
//                       }
//                       className="border rounded p-2 w-full mr-2"
//                     />
//                     <button
//                       type="button"
//                       onClick={() =>
//                         handleQuestionChange(
//                           index,
//                           "options",
//                           q.options.filter((_, idx) => idx !== oIndex)
//                         )
//                       }
//                       className="bg-red-500 text-white px-2 py-1 rounded"
//                     >
//                       Remove
//                     </button>
//                   </div>
//                 ))}
//                 <button
//                   type="button"
//                   onClick={() =>
//                     handleQuestionChange(index, "options", [...q.options, ""])
//                   }
//                   className="bg-blue-500 text-white px-2 py-1 rounded"
//                 >
//                   Add Option
//                 </button>
//               </div>
//             )}
//             <div className="mb-2">
//               <label className="block text-sm font-medium mb-2">
//                 Correct Answer
//               </label>
//               <input
//                 type="text"
//                 value={q.correctAnswer}
//                 onChange={(e) =>
//                   handleQuestionChange(index, "correctAnswer", e.target.value)
//                 }
//                 className="border rounded p-2 w-full"
//                 required
//               />
//             </div>
//           </div>
//         ))}
//         <button
//           type="button"
//           onClick={handleAddQuestion}
//           className="bg-green-500 text-white px-4 py-2 rounded"
//         >
//           Add Question
//         </button>
//         <button
//           type="submit"
//           className="bg-blue-500 text-white px-4 py-2 rounded ml-4"
//         >
//           Create Quiz
//         </button>
//       </form>
//     </div>
//   );
// };

// export default QuizCreationPage;

// import React, { useState } from "react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";

// const QuizCreationPage = () => {
//   const { courseId } = useParams();
//   const [title, setTitle] = useState("");
//   const [instructions, setInstructions] = useState("");
//   const [timeDuration, setTimeDuration] = useState("");
//   const [questions, setQuestions] = useState([]);
//   const [questionType, setQuestionType] = useState("MCQ");
//   const [questionText, setQuestionText] = useState("");
//   const [options, setOptions] = useState(["", "", "", ""]);
//   const [correctAnswer, setCorrectAnswer] = useState("");
//   const [points, setPoints] = useState("");
//   const navigate = useNavigate();

//   const addQuestion = () => {
//     const newQuestion = {
//       questionType,
//       questionText,
//       options,
//       correctAnswer,
//       points,
//     };
//     setQuestions([...questions, newQuestion]);
//     setQuestionText("");
//     setOptions(["", "", "", ""]);
//     setCorrectAnswer("");
//     setPoints("");
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/quizzes/create",
//         {
//           courseId,
//           title,
//           instructions,
//           timeDuration,
//           questions,
//         }
//       );
//       navigate(`/courses/${courseId}/quizzes`);
//     } catch (error) {
//       console.error("Error creating quiz:", error);
//     }
//   };

//   return (
//     <div className="quiz-creation-container">
//       <h1>Create Quiz</h1>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Title</label>
//           <input
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Instructions</label>
//           <textarea
//             value={instructions}
//             onChange={(e) => setInstructions(e.target.value)}
//             required
//           ></textarea>
//         </div>
//         <div>
//           <label>Time Duration (minutes)</label>
//           <input
//             type="number"
//             value={timeDuration}
//             onChange={(e) => setTimeDuration(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Question Type</label>
//           <select
//             value={questionType}
//             onChange={(e) => setQuestionType(e.target.value)}
//           >
//             <option value="MCQ">Multiple Choice</option>
//             <option value="Fill in the Blank">Fill in the Blank</option>
//             <option value="True/False">True/False</option>
//           </select>
//         </div>
//         <div>
//           <label>Question Text</label>
//           <textarea
//             value={questionText}
//             onChange={(e) => setQuestionText(e.target.value)}
//             required
//           ></textarea>
//         </div>
//         {questionType === "MCQ" && (
//           <div>
//             <label>Options</label>
//             {options.map((option, index) => (
//               <input
//                 key={index}
//                 type="text"
//                 value={option}
//                 onChange={(e) => {
//                   const newOptions = [...options];
//                   newOptions[index] = e.target.value;
//                   setOptions(newOptions);
//                 }}
//                 required
//               />
//             ))}
//           </div>
//         )}
//         <div>
//           <label>Correct Answer</label>
//           <input
//             type="text"
//             value={correctAnswer}
//             onChange={(e) => setCorrectAnswer(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Points</label>
//           <input
//             type="number"
//             value={points}
//             onChange={(e) => setPoints(e.target.value)}
//             required
//           />
//         </div>
//         <button type="button" onClick={addQuestion}>
//           Add Question
//         </button>
//         <button type="submit">Create Quiz</button>
//       </form>
//       <ul>
//         {questions.map((question, index) => (
//           <li key={index}>
//             <p>Type: {question.questionType}</p>
//             <p>Text: {question.questionText}</p>
//             {question.questionType === "MCQ" && (
//               <ul>
//                 {question.options.map((option, idx) => (
//                   <li key={idx}>{option}</li>
//                 ))}
//               </ul>
//             )}
//             <p>Correct Answer: {question.correctAnswer}</p>
//             <p>Points: {question.points}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default QuizCreationPage;

// // pages/QuizCreationPage.js
// import React, { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";

// const QuizCreationPage = () => {
//   const { courseId } = useParams();
//   const navigate = useNavigate();
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [instructions, setInstructions] = useState("");
//   const [duration, setDuration] = useState("");
//   const [questions, setQuestions] = useState([]);

//   const addQuestion = () => {
//     setQuestions([
//       ...questions,
//       { type: "multiple-choice", prompt: "", options: [], points: 1 },
//     ]);
//   };

//   const handleQuestionChange = (index, field, value) => {
//     const updatedQuestions = questions.map((q, i) =>
//       i === index ? { ...q, [field]: value } : q
//     );
//     setQuestions(updatedQuestions);
//   };

//   const handleOptionChange = (qIndex, oIndex, field, value) => {
//     const updatedQuestions = questions.map((q, i) =>
//       i === qIndex
//         ? {
//             ...q,
//             options: q.options.map((o, j) =>
//               j === oIndex ? { ...o, [field]: value } : o
//             ),
//           }
//         : q
//     );
//     setQuestions(updatedQuestions);
//   };

//   const addOption = (index) => {
//     const updatedQuestions = questions.map((q, i) =>
//       i === index
//         ? { ...q, options: [...q.options, { text: "", correct: false }] }
//         : q
//     );
//     setQuestions(updatedQuestions);
//   };

//   const removeQuestion = (index) => {
//     setQuestions(questions.filter((_, i) => i !== index));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const quizData = {
//       courseId,
//       title,
//       description,
//       instructions,
//       duration: Number(duration),
//       questions,
//     };
//     try {
//       await axios.post("/api/quizzes/create", quizData);
//       navigate(`/courses/${courseId}/quizzes`);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-6">Create Quiz</h1>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2">
//             Quiz Title
//           </label>
//           <input
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             className="w-full px-3 py-2 border rounded"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2">
//             Description
//           </label>
//           <textarea
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             className="w-full px-3 py-2 border rounded"
//             required
//           ></textarea>
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2">
//             Instructions
//           </label>
//           <textarea
//             value={instructions}
//             onChange={(e) => setInstructions(e.target.value)}
//             className="w-full px-3 py-2 border rounded"
//             required
//           ></textarea>
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2">
//             Duration (minutes)
//           </label>
//           <input
//             type="number"
//             value={duration}
//             onChange={(e) => setDuration(e.target.value)}
//             className="w-full px-3 py-2 border rounded"
//             required
//           />
//         </div>
//         {questions.map((q, qIndex) => (
//           <div key={qIndex} className="mb-4 p-4 border rounded bg-gray-50">
//             <div className="flex justify-between items-center mb-2">
//               <h2 className="text-lg font-bold">Question {qIndex + 1}</h2>
//               <button
//                 type="button"
//                 onClick={() => removeQuestion(qIndex)}
//                 className="text-red-600 font-bold"
//               >
//                 Remove
//               </button>
//             </div>
//             <div className="mb-2">
//               <label className="block text-gray-700 text-sm font-bold mb-2">
//                 Question Prompt
//               </label>
//               <textarea
//                 value={q.prompt}
//                 onChange={(e) =>
//                   handleQuestionChange(qIndex, "prompt", e.target.value)
//                 }
//                 className="w-full px-3 py-2 border rounded"
//                 required
//               ></textarea>
//             </div>
//             {q.type === "multiple-choice" && (
//               <div className="mb-2">
//                 <label className="block text-gray-700 text-sm font-bold mb-2">
//                   Options
//                 </label>
//                 {q.options.map((o, oIndex) => (
//                   <div key={oIndex} className="flex items-center mb-2">
//                     <input
//                       type="text"
//                       value={o.text}
//                       onChange={(e) =>
//                         handleOptionChange(
//                           qIndex,
//                           oIndex,
//                           "text",
//                           e.target.value
//                         )
//                       }
//                       className="w-full px-3 py-2 border rounded mr-2"
//                       required
//                     />
//                     <label className="flex items-center">
//                       <input
//                         type="checkbox"
//                         checked={o.correct}
//                         onChange={(e) =>
//                           handleOptionChange(
//                             qIndex,
//                             oIndex,
//                             "correct",
//                             e.target.checked
//                           )
//                         }
//                         className="mr-2"
//                       />
//                       Correct
//                     </label>
//                   </div>
//                 ))}
//                 <button
//                   type="button"
//                   onClick={() => addOption(qIndex)}
//                   className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
//                 >
//                   Add Option
//                 </button>
//               </div>
//             )}
//             <div className="mb-2">
//               <label className="block text-gray-700 text-sm font-bold mb-2">
//                 Points
//               </label>
//               <input
//                 type="number"
//                 value={q.points}
//                 onChange={(e) =>
//                   handleQuestionChange(qIndex, "points", e.target.value)
//                 }
//                 className="w-full px-3 py-2 border rounded"
//                 required
//               />
//             </div>
//           </div>
//         ))}
//         <button
//           type="button"
//           onClick={addQuestion}
//           className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
//         >
//           Add Question
//         </button>
//         <button
//           type="submit"
//           className="bg-green-500 text-white px-4 py-2 rounded"
//         >
//           Create Quiz
//         </button>
//       </form>
//     </div>
//   );
// };

// export default QuizCreationPage;
