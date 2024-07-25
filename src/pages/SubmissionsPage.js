import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/Sidebar";

const SubmissionsPage = () => {
  const { assignmentId } = useParams();
  const [submissions, setSubmissions] = useState([]);
  const [filteredSubmissions, setFilteredSubmissions] = useState([]);
  const [marksInput, setMarksInput] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/assignments/submissions/${assignmentId}`
        );
        const initialMarks = {};
        response.data.forEach((submission) => {
          initialMarks[submission.studentId._id] =
            submission.marksObtained || "";
        });
        setSubmissions(response.data);
        setFilteredSubmissions(response.data);
        setMarksInput(initialMarks);
      } catch (error) {
        console.error("Error fetching submissions", error);
      }
    };

    fetchSubmissions();
  }, [assignmentId]);

  const handleMarksChange = (submissionId, marks) => {
    setMarksInput({
      ...marksInput,
      [submissionId]: marks,
    });
  };

  const handleAssignMarks = async (submissionId) => {
    const marks = marksInput[submissionId];

    try {
      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/assignments/assign-marks`,
        {
          assignmentId,
          studentId: submissionId,
          marksObtained: marks,
        }
      );

      const updatedSubmissions = submissions.map((submission) =>
        submission.studentId._id === submissionId
          ? { ...submission, marksObtained: marks }
          : submission
      );
      setSubmissions(updatedSubmissions);
      setFilteredSubmissions(updatedSubmissions);

      // Show success message
      alert("Marks assigned successfully!");
    } catch (error) {
      console.error("Error assigning marks", error);
    }
  };

  const handleSearch = () => {
    const filtered = submissions.filter(
      (submission) =>
        submission.studentId.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        submission.studentId.email
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    );
    setFilteredSubmissions(filtered);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Submissions</h1>
        <div className="mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name or email"
            className="px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm mr-2"
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Search
          </button>
        </div>
        <table className="min-w-full bg-white shadow rounded">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-300">
                Student Name
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300">
                Student Email
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300">
                Submission File
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300">
                Assigned Marks
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredSubmissions.map((submission) => (
              <tr key={submission._id}>
                <td className="px-6 py-4 border-b">
                  {submission.studentId.name}
                </td>
                <td className="px-6 py-4 border-b">
                  {submission.studentId.email}
                </td>
                <td className="px-6 py-4 border-b">
                  <a
                    // href={`http://localhost:5000/${submission.submissionFile}`}
                    href={submission.submissionFile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    View Submission
                  </a>
                </td>
                <td className="px-6 py-4 border-b">
                  <div className="flex items-center">
                    <input
                      type="number"
                      value={marksInput[submission.studentId._id] || ""}
                      onChange={(e) =>
                        handleMarksChange(
                          submission.studentId._id,
                          e.target.value
                        )
                      }
                      className="px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm"
                    />
                    <button
                      onClick={() =>
                        handleAssignMarks(submission.studentId._id)
                      }
                      className="ml-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      Assign Marks
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default SubmissionsPage;

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import Sidebar from "../components/Sidebar";

// const SubmissionsPage = () => {
//   const { assignmentId } = useParams();
//   const [submissions, setSubmissions] = useState([]);
//   const [marksInput, setMarksInput] = useState({});

//   useEffect(() => {
//     const fetchSubmissions = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:5000/api/assignments/submissions/${assignmentId}`
//         );
//         const initialMarks = {};
//         response.data.forEach((submission) => {
//           initialMarks[submission.studentId._id] =
//             submission.marksObtained || "";
//         });
//         setSubmissions(response.data);
//         setMarksInput(initialMarks);
//       } catch (error) {
//         console.error("Error fetching submissions", error);
//       }
//     };

//     fetchSubmissions();
//   }, [assignmentId]);

//   const handleMarksChange = (submissionId, marks) => {
//     setMarksInput({
//       ...marksInput,
//       [submissionId]: marks,
//     });
//   };

//   const handleAssignMarks = async (submissionId) => {
//     const marks = marksInput[submissionId];

//     try {
//       await axios.post("http://localhost:5000/api/assignments/assign-marks", {
//         assignmentId,
//         studentId: submissionId,
//         marksObtained: marks,
//       });

//       const updatedSubmissions = submissions.map((submission) =>
//         submission.studentId._id === submissionId
//           ? { ...submission, marksObtained: marks }
//           : submission
//       );
//       setSubmissions(updatedSubmissions);

//       // Show success message
//       alert("Marks assigned successfully!");
//     } catch (error) {
//       console.error("Error assigning marks", error);
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       <Sidebar />
//       <main className="flex-1 p-6">
//         <h1 className="text-2xl font-bold mb-6">Submissions</h1>
//         <table className="min-w-full bg-white shadow rounded">
//           <thead>
//             <tr>
//               <th className="px-6 py-3 border-b-2 border-gray-300">
//                 Student Name
//               </th>
//               <th className="px-6 py-3 border-b-2 border-gray-300">
//                 Student Email
//               </th>
//               <th className="px-6 py-3 border-b-2 border-gray-300">
//                 Submission File
//               </th>
//               <th className="px-6 py-3 border-b-2 border-gray-300">
//                 Assigned Marks
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {submissions.map((submission) => (
//               <tr key={submission._id}>
//                 <td className="px-6 py-4 border-b">
//                   {submission.studentId.name}
//                 </td>
//                 <td className="px-6 py-4 border-b">
//                   {submission.studentId.email}
//                 </td>
//                 <td className="px-6 py-4 border-b">
//                   <a
//                     href={`http://localhost:5000/${submission.submissionFile}`}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-blue-500 hover:underline"
//                   >
//                     View Submission
//                   </a>
//                 </td>
//                 <td className="px-6 py-4 border-b">
//                   <div className="flex items-center">
//                     <input
//                       type="number"
//                       value={marksInput[submission.studentId._id] || ""}
//                       onChange={(e) =>
//                         handleMarksChange(
//                           submission.studentId._id,
//                           e.target.value
//                         )
//                       }
//                       className="px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm"
//                     />
//                     <button
//                       onClick={() =>
//                         handleAssignMarks(submission.studentId._id)
//                       }
//                       className="ml-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
//                     >
//                       Assign Marks
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </main>
//     </div>
//   );
// };

// export default SubmissionsPage;

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import Sidebar from "../components/Sidebar";

// const SubmissionsPage = () => {
//   const { assignmentId } = useParams();
//   const [submissions, setSubmissions] = useState([]);
//   const [marksInput, setMarksInput] = useState({});

//   useEffect(() => {
//     const fetchSubmissions = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:5000/api/assignments/submissions/${assignmentId}`
//         );
//         const initialMarks = {};
//         response.data.forEach((submission) => {
//           initialMarks[submission.studentId._id] =
//             submission.marksObtained || "";
//         });
//         setSubmissions(response.data);
//         setMarksInput(initialMarks);
//       } catch (error) {
//         console.error("Error fetching submissions", error);
//       }
//     };

//     fetchSubmissions();
//   }, [assignmentId]);

//   const handleMarksChange = (submissionId, marks) => {
//     setMarksInput({
//       ...marksInput,
//       [submissionId]: marks,
//     });
//   };

//   const handleAssignMarks = async (submissionId) => {
//     const marks = marksInput[submissionId];

//     try {
//       await axios.post("http://localhost:5000/api/assignments/assign-marks", {
//         assignmentId,
//         studentId: submissionId,
//         marksObtained: marks,
//       });

//       const updatedSubmissions = submissions.map((submission) =>
//         submission.studentId._id === submissionId
//           ? { ...submission, marksObtained: marks }
//           : submission
//       );
//       setSubmissions(updatedSubmissions);

//       // Show success message
//       alert("Marks assigned successfully!");
//     } catch (error) {
//       console.error("Error assigning marks", error);
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       <Sidebar />
//       <main className="flex-1 p-6">
//         <h1 className="text-2xl font-bold mb-6">Submissions</h1>
//         <ul className="space-y-4">
//           {submissions.map((submission) => (
//             <li key={submission._id} className="p-4 bg-white shadow rounded">
//               <h2 className="text-xl font-semibold">
//                 {submission.studentId.name}
//               </h2>
//               <p>Email: {submission.studentId.email}</p>
//               <a
//                 href={`http://localhost:5000/${submission.submissionFile}`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 View Submission
//               </a>
//               <div className="mt-2">
//                 <input
//                   type="number"
//                   value={marksInput[submission.studentId._id] || ""}
//                   onChange={(e) =>
//                     handleMarksChange(submission.studentId._id, e.target.value)
//                   }
//                   className="px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm"
//                 />
//                 <button
//                   onClick={() => handleAssignMarks(submission.studentId._id)}
//                   className="ml-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
//                 >
//                   Assign Marks
//                 </button>
//               </div>
//             </li>
//           ))}
//         </ul>
//       </main>
//     </div>
//   );
// };

// export default SubmissionsPage;

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import Sidebar from "../components/Sidebar";

// const SubmissionsPage = () => {
//   const { assignmentId } = useParams();
//   const [submissions, setSubmissions] = useState([]);
//   const [marksInput, setMarksInput] = useState({}); // State to manage marks input

//   useEffect(() => {
//     const fetchSubmissions = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:5000/api/assignments/submissions/${assignmentId}`
//         );
//         setSubmissions(response.data);
//       } catch (error) {
//         console.error("Error fetching submissions", error);
//       }
//     };

//     fetchSubmissions();
//   }, [assignmentId]);

//   // Update marks input state when user types in the input field
//   const handleMarksChange = (submissionId, marks) => {
//     setMarksInput({
//       ...marksInput,
//       [submissionId]: marks,
//     });
//   };

//   // Handle assigning marks
//   const handleAssignMarks = async (submissionId) => {
//     const marks = marksInput[submissionId];

//     try {
//       await axios.post("http://localhost:5000/api/assignments/assign-marks", {
//         assignmentId,
//         studentId: submissionId,
//         marksObtained: marks,
//       });

//       // Update local state with the assigned marks
//       const updatedSubmissions = submissions.map((submission) =>
//         submission._id === submissionId
//           ? { ...submission, marksObtained: marks }
//           : submission
//       );
//       setSubmissions(updatedSubmissions);

//       // Clear the marks input after assigning
//       setMarksInput({
//         ...marksInput,
//         [submissionId]: "",
//       });
//     } catch (error) {
//       console.error("Error assigning marks", error);
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       <Sidebar />
//       <main className="flex-1 p-6">
//         <h1 className="text-2xl font-bold mb-6">Submissions</h1>
//         <ul className="space-y-4">
//           {submissions.map((submission) => (
//             <li key={submission._id} className="p-4 bg-white shadow rounded">
//               <h2 className="text-xl font-semibold">
//                 {submission.studentId.name}
//               </h2>
//               <p>Email: {submission.studentId.email}</p>
//               <a
//                 href={`http://localhost:5000/${submission.submissionFile}`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 View Submission
//               </a>
//               <div className="mt-2">
//                 <input
//                   type="number"
//                   value={marksInput[submission.studentId._id] || ""}
//                   onChange={(e) =>
//                     handleMarksChange(submission.studentId._id, e.target.value)
//                   }
//                   className="px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm"
//                 />
//                 <button
//                   onClick={() => handleAssignMarks(submission.studentId._id)}
//                   className="ml-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
//                 >
//                   Assign Marks
//                 </button>
//               </div>
//             </li>
//           ))}
//         </ul>
//       </main>
//     </div>
//   );
// };

// export default SubmissionsPage;

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import Sidebar from "../components/Sidebar";

// const SubmissionsPage = () => {
//   const { assignmentId } = useParams();
//   const [submissions, setSubmissions] = useState([]);
//   const [marks, setMarks] = useState({}); // State to manage marks input

//   useEffect(() => {
//     const fetchSubmissions = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:5000/api/assignments/submissions/${assignmentId}`
//         );
//         setSubmissions(response.data);
//         // Initialize marks state with current marks
//         const initialMarks = {};
//         response.data.forEach((submission) => {
//           initialMarks[submission._id] = submission.marksObtained || "";
//         });
//         setMarks(initialMarks);
//       } catch (error) {
//         console.error("Error fetching submissions", error);
//       }
//     };

//     fetchSubmissions();
//   }, [assignmentId]);

//   const handleInputChange = (submissionId, value) => {
//     setMarks({
//       ...marks,
//       [submissionId]: value,
//     });
//   };

//   const handleAssignMarks = async (submissionId) => {
//     try {
//       const marksObtained = marks[submissionId];
//       await axios.post("http://localhost:5000/api/assignments/assign-marks", {
//         assignmentId,
//         studentId: submissionId,
//         marksObtained,
//       });
//       const updatedSubmissions = submissions.map((submission) =>
//         submission._id === submissionId
//           ? { ...submission, marksObtained }
//           : submission
//       );
//       setSubmissions(updatedSubmissions);
//     } catch (error) {
//       console.error("Error assigning marks", error);
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       <Sidebar />
//       <main className="flex-1 p-6">
//         <h1 className="text-2xl font-bold mb-6">Submissions</h1>
//         <ul className="space-y-4">
//           {submissions.map((submission) => (
//             <li key={submission._id} className="p-4 bg-white shadow rounded">
//               <h2 className="text-xl font-semibold">
//                 {submission.studentId.name}
//               </h2>
//               <p>Email: {submission.studentId.email}</p>
//               <a
//                 href={`http://localhost:5000/${submission.submissionFile}`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 View Submission
//               </a>
//               <div className="mt-2">
//                 <input
//                   type="number"
//                   value={marks[submission._id]}
//                   onChange={(e) =>
//                     handleInputChange(submission._id, e.target.value)
//                   }
//                   className="px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm"
//                 />
//                 <button
//                   onClick={() => handleAssignMarks(submission._id)}
//                   className="ml-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
//                 >
//                   Assign Marks
//                 </button>
//               </div>
//             </li>
//           ))}
//         </ul>
//       </main>
//     </div>
//   );
// };

// export default SubmissionsPage;

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import Sidebar from "../components/Sidebar";

// const SubmissionsPage = () => {
//   const { assignmentId } = useParams();
//   const [submissions, setSubmissions] = useState([]);

//   useEffect(() => {
//     const fetchSubmissions = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:5000/api/assignments/submissions/${assignmentId}`
//         );
//         setSubmissions(response.data);
//       } catch (error) {
//         console.error("Error fetching submissions", error);
//       }
//     };

//     fetchSubmissions();
//   }, [assignmentId]);

//   const handleAssignMarks = async (submissionId, marks) => {
//     try {
//       await axios.post("http://localhost:5000/api/assignments/assign-marks", {
//         assignmentId,
//         studentId: submissionId,
//         marksObtained: marks,
//       });
//       const updatedSubmissions = submissions.map((submission) =>
//         submission._id === submissionId
//           ? { ...submission, marksObtained: marks }
//           : submission
//       );
//       setSubmissions(updatedSubmissions);
//     } catch (error) {
//       console.error("Error assigning marks", error);
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       <Sidebar />
//       <main className="flex-1 p-6">
//         <h1 className="text-2xl font-bold mb-6">Submissions</h1>
//         <ul className="space-y-4">
//           {submissions.map((submission) => (
//             <li key={submission._id} className="p-4 bg-white shadow rounded">
//               <h2 className="text-xl font-semibold">
//                 {submission.studentId.name}
//               </h2>
//               <p>Email: {submission.studentId.email}</p>
//               <a
//                 href={`http://localhost:5000/${submission.submissionFile}`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 View Submission
//               </a>
//               <div className="mt-2">
//                 <input
//                   type="number"
//                   value={submission.marksObtained || ""}
//                   onChange={(e) =>
//                     handleAssignMarks(submission.studentId._id, e.target.value)
//                   }
//                   className="px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm"
//                 />
//                 <button
//                   onClick={() =>
//                     handleAssignMarks(
//                       submission.studentId._id,
//                       submission.marksObtained
//                     )
//                   }
//                   className="ml-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
//                 >
//                   Assign Marks
//                 </button>
//               </div>
//             </li>
//           ))}
//         </ul>
//       </main>
//     </div>
//   );
// };

// export default SubmissionsPage;

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// const SubmissionsPage = () => {
//   const { courseId, assignmentId } = useParams();
//   const [submissions, setSubmissions] = useState([]);
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     const fetchSubmissions = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:5000/api/assignments/${assignmentId}/submissions`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         setSubmissions(response.data);
//       } catch (error) {
//         console.error("Error fetching submissions:", error);
//       }
//     };

//     fetchSubmissions();
//   }, [assignmentId, token]);

//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-4">Submissions</h1>
//       {submissions.map((submission) => (
//         <div key={submission._id} className="border p-4 mb-4 rounded">
//           <p>Student: {submission.student.name}</p>
//           <p>Email: {submission.student.email}</p>
//           <a
//             href={`http://localhost:5000/uploads/${submission.submissionFile
//               .split("/")
//               .pop()}`}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="mt-2 bg-green-500 text-white px-4 py-2 rounded"
//           >
//             Download Submission
//           </a>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default SubmissionsPage;
