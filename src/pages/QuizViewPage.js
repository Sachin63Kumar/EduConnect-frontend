import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import FacultySidebar from "../components/Sidebar"; // Adjust the import path as needed

const QuizViewPage = () => {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/quizzes/${quizId}`
        );
        setQuiz(response.data);
      } catch (error) {
        console.error("Error fetching quiz:", error);
      }
    };
    fetchQuiz();
  }, [quizId]);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <FacultySidebar />
      <div className="flex-1 p-6">
        {quiz ? (
          <>
            <h1 className="text-2xl font-bold mb-6">{quiz.title}</h1>
            <p className="mb-4">{quiz.instructions}</p>
            <p className="mb-4">Duration: {quiz.timeDuration} minutes</p>
            <p className="mb-4">Number of Attempts: {quiz.numberOfAttempts}</p>
            {quiz.questions.map((question, index) => (
              <div key={index} className="mb-4 p-4 border rounded bg-gray-50">
                <h2 className="text-lg font-bold mb-2">Question {index + 1}</h2>
                <p className="mb-2">{question.questionText}</p>
                <p className="mb-2">Points: {question.points}</p>
                {question.options && question.options.length > 0 && (
                  <ul className="mb-2">
                    {question.options.map((option, oIndex) => (
                      <li key={oIndex}>{option}</li>
                    ))}
                  </ul>
                )}
                <p className="mb-2">Correct Answer: {question.correctAnswer}</p>
              </div>
            ))}
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default QuizViewPage;

// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// const QuizViewPage = () => {
//   const { quizId } = useParams();
//   const [quiz, setQuiz] = useState(null);

//   useEffect(() => {
//     const fetchQuiz = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:5000/api/quizzes/${quizId}`
//         );
//         setQuiz(response.data);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchQuiz();
//   }, [quizId]);

//   if (!quiz) return <div>Loading...</div>;

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-6">{quiz.title}</h1>
//       <p className="mb-6">{quiz.instructions}</p>
//       <p className="mb-6">Duration: {quiz.timeDuration} minutes</p>
//       {quiz.questions.map((q, qIndex) => (
//         <div key={qIndex} className="mb-4 p-4 border rounded bg-gray-50">
//           <h2 className="text-lg font-bold mb-2">Question {qIndex + 1}</h2>
//           <p className="mb-2">{q.questionText}</p>
//           {q.questionType === "MCQ" && (
//             <div>
//               {q.options.map((option, oIndex) => (
//                 <p key={oIndex}>{option}</p>
//               ))}
//             </div>
//           )}
//           <p>Points: {q.points}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default QuizViewPage;
