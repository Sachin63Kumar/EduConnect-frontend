import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import StudentSidebar from "../components/StudentSidebar"; // Adjust the import path as needed

const StudentQuizListPage = () => {
  const { courseId } = useParams();
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/quizzes/course/${courseId}`
        );
        setQuizzes(response.data);
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      }
    };
    fetchQuizzes();
  }, [courseId]);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <StudentSidebar />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Available Quizzes</h1>
        {quizzes.map((quiz) => (
          <div key={quiz._id} className="mb-4 p-4 border rounded bg-gray-50">
            <h2 className="text-lg font-bold mb-2">{quiz.title}</h2>
            <p className="mb-2">{quiz.instructions}</p>
            <p className="mb-2">Duration: {quiz.timeDuration} minutes</p>
            <p className="mb-2">Number of Attempts: {quiz.numberOfAttempts}</p>
            <Link
              to={`/quizzes/${quiz._id}/attempt`}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Attempt Quiz
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentQuizListPage;

// // pages/StudentQuizListPage.js
// import React, { useState, useEffect } from "react";
// import { useParams, Link } from "react-router-dom";
// import axios from "axios";

// const StudentQuizListPage = () => {
//   const { courseId } = useParams();
//   const [quizzes, setQuizzes] = useState([]);

//   useEffect(() => {
//     const fetchQuizzes = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:5000/api/quizzes/course/${courseId}`
//         );
//         setQuizzes(response.data);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchQuizzes();
//   }, [courseId]);

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-6">Quizzes</h1>
//       <ul>
//         {quizzes.map((quiz) => (
//           <li key={quiz._id} className="mb-4 p-4 border rounded bg-gray-50">
//             <h2 className="text-lg font-bold">{quiz.title}</h2>
//             <p>{quiz.instructions}</p>
//             <p>Duration: {quiz.timeDuration} minutes</p>
//             <p>Number of Attempts: {quiz.numberOfAttempts}</p>
//             <Link
//               to={`/quizzes/${quiz._id}/attempt`}
//               className="bg-green-500 text-white px-4 py-2 rounded mt-2 inline-block"
//             >
//               Attempt Quiz
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default StudentQuizListPage;
