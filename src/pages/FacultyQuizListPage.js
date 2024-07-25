import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/Sidebar";

const FacultyQuizListPage = () => {
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
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Quizzes</h1>
        <Link
          to={`/courses/${courseId}/quizzes/create`}
          className="bg-blue-500 text-white px-4 py-2 rounded mb-6 inline-block"
        >
          Create Quiz
        </Link>
        {quizzes.map((quiz, index) => (
          <div key={quiz._id} className="mb-4 p-4 border rounded bg-gray-50">
            <h2 className="text-lg font-bold mb-2">{quiz.title}</h2>
            <p className="mb-2">{quiz.instructions}</p>
            <p className="mb-2">Duration: {quiz.timeDuration} minutes</p>
            <p className="mb-2">Number of Attempts: {quiz.numberOfAttempts}</p>
            <div className="flex space-x-4">
              <Link
                to={`/quizzes/${quiz._id}`}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                View Quiz
              </Link>
              <Link
                to={`/quizzes/${quiz._id}/scores`}
                className="bg-yellow-500 text-white px-4 py-2 rounded"
              >
                See Score of Students
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FacultyQuizListPage;

// import React, { useState, useEffect } from "react";
// import { Link, useParams } from "react-router-dom";
// import axios from "axios";

// const FacultyQuizListPage = () => {
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
//         console.error("Error fetching quizzes:", error);
//       }
//     };
//     fetchQuizzes();
//   }, [courseId]);

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-6">Quizzes</h1>
//       <Link
//         to={`/courses/${courseId}/quizzes/create`}
//         className="bg-blue-500 text-white px-4 py-2 rounded mb-6 inline-block"
//       >
//         Create Quiz
//       </Link>
//       {quizzes.map((quiz, index) => (
//         <div key={quiz._id} className="mb-4 p-4 border rounded bg-gray-50">
//           <h2 className="text-lg font-bold mb-2">{quiz.title}</h2>
//           <p className="mb-2">{quiz.instructions}</p>
//           <p className="mb-2">Duration: {quiz.timeDuration} minutes</p>
//           <p className="mb-2">Number of Attempts: {quiz.numberOfAttempts}</p>
//           <div className="flex space-x-4">
//             <Link
//               to={`/quizzes/${quiz._id}`}
//               className="bg-green-500 text-white px-4 py-2 rounded"
//             >
//               View Quiz
//             </Link>
//             <Link
//               to={`/quizzes/${quiz._id}/scores`}
//               className="bg-yellow-500 text-white px-4 py-2 rounded"
//             >
//               See Score of Students
//             </Link>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default FacultyQuizListPage;
