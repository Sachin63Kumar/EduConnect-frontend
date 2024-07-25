import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import FacultySidebar from "../components/Sidebar"; // Adjust the import path as needed

const QuizScorePage = () => {
  const { quizId } = useParams();
  const [scores, setScores] = useState([]);
  const [filteredScores, setFilteredScores] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/quizzes/scores/${quizId}`
        );
        setScores(response.data);
        setFilteredScores(response.data);
      } catch (error) {
        console.error("Error fetching scores:", error);
      }
    };
    fetchScores();
  }, [quizId]);

  const handleSearch = () => {
    const filtered = scores.filter(
      (score) =>
        score.studentId.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        score.studentId.email
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        score.score.toString().includes(searchTerm)
    );
    setFilteredScores(filtered);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <FacultySidebar />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Quiz Scores</h1>
        <div className="mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, email, or score"
            className="px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm mr-2"
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Search
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Score</th>
              </tr>
            </thead>
            <tbody>
              {filteredScores.map((score) => (
                <tr key={score._id}>
                  <td className="py-2 px-4 border">{score.studentId.name}</td>
                  <td className="py-2 px-4 border">{score.studentId.email}</td>
                  <td className="py-2 px-4 border">{score.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default QuizScorePage;

// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import FacultySidebar from "../components/Sidebar"; // Adjust the import path as needed

// const QuizScorePage = () => {
//   const { quizId } = useParams();
//   const [scores, setScores] = useState([]);

//   useEffect(() => {
//     const fetchScores = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:5000/api/quizzes/scores/${quizId}`
//         );
//         setScores(response.data);
//       } catch (error) {
//         console.error("Error fetching scores:", error);
//       }
//     };
//     fetchScores();
//   }, [quizId]);

//   return (
//     <div className="flex flex-col lg:flex-row min-h-screen">
//       <FacultySidebar />
//       <div className="flex-1 p-6">
//         <h1 className="text-2xl font-bold mb-6">Quiz Scores</h1>
//         <div className="overflow-x-auto">
//           <table className="min-w-full bg-white border">
//             <thead>
//               <tr>
//                 <th className="py-2 px-4 border-b">Name</th>
//                 <th className="py-2 px-4 border-b">Email</th>
//                 <th className="py-2 px-4 border-b">Score</th>
//               </tr>
//             </thead>
//             <tbody>
//               {scores.map((score) => (
//                 <tr key={score._id}>
//                   <td className="py-2 px-4 border">{score.studentId.name}</td>

//                   <td className="py-2 px-4 border">{score.studentId.email}</td>

//                   <td className="py-2 px-4 border">{score.score}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default QuizScorePage;

// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// const QuizScorePage = () => {
//   const { quizId } = useParams();
//   const [scores, setScores] = useState([]);

//   useEffect(() => {
//     const fetchScores = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:5000/api/quizzes/scores/${quizId}`
//         );
//         setScores(response.data);
//       } catch (error) {
//         console.error("Error fetching scores:", error);
//       }
//     };
//     fetchScores();
//   }, [quizId]);

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-6">Student Scores</h1>
//       <table className="min-w-full bg-white border">
//         <thead>
//           <tr>
//             <th className="py-2 px-4 border">Name</th>
//             <th className="py-2 px-4 border">Email</th>
//             <th className="py-2 px-4 border">Score</th>
//           </tr>
//         </thead>
//         <tbody>
//           {scores.map((score) => (
//             <tr key={score._id}>
//               <td className="py-2 px-4 border">{score.studentId.name}</td>
//               <td className="py-2 px-4 border">{score.studentId.email}</td>
//               <td className="py-2 px-4 border">{score.score}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default QuizScorePage;
