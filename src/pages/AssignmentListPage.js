import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/Sidebar";

const AssignmentListPage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/assignments/${courseId}`
        );
        setAssignments(response.data);
      } catch (error) {
        console.error("Error fetching assignments", error);
      }
    };

    fetchAssignments();
  }, [courseId]);

  const handleCreateAssignment = () => {
    navigate(`/faculty/courses/${courseId}/create-assignment`);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Assignments</h1>
        <button
          onClick={handleCreateAssignment}
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Create Assignment
        </button>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow rounded">
            <thead>
              <tr>
                <th className="px-4 py-2 border text-center">
                  Assignment Title
                </th>
                <th className="px-4 py-2 border text-center">Deadline</th>
                <th className="px-4 py-2 border text-center">Assigned Marks</th>
                <th className="px-4 py-2 border text-center">Submissions</th>
              </tr>
            </thead>
            <tbody>
              {assignments.map((assignment) => (
                <tr key={assignment._id} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border text-center">
                    {assignment.title}
                  </td>
                  <td className="px-4 py-2 border text-center">
                    {new Date(assignment.deadline).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 border text-center">
                    {assignment.marks}
                  </td>
                  <td className="px-4 py-2 border text-center">
                    <button
                      onClick={() =>
                        navigate(
                          `/faculty/courses/${courseId}/assignments/${assignment._id}/submissions`
                        )
                      }
                      className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      View Submissions
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default AssignmentListPage;

// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import Sidebar from "../components/Sidebar";

// const AssignmentListPage = () => {
//   const { courseId } = useParams();
//   const navigate = useNavigate();
//   const [assignments, setAssignments] = useState([]);

//   useEffect(() => {
//     const fetchAssignments = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:5000/api/assignments/${courseId}`
//         );
//         setAssignments(response.data);
//       } catch (error) {
//         console.error("Error fetching assignments", error);
//       }
//     };

//     fetchAssignments();
//   }, [courseId]);

//   const handleCreateAssignment = () => {
//     navigate(`/faculty/courses/${courseId}/create-assignment`); // Use navigate here
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       <Sidebar />
//       <main className="flex-1 p-6">
//         <h1 className="text-2xl font-bold mb-6">Assignments</h1>
//         <button
//           onClick={handleCreateAssignment}
//           className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//         >
//           Create Assignment
//         </button>
//         <ul className="space-y-4">
//           {assignments.map((assignment) => (
//             <li key={assignment._id} className="p-4 bg-white shadow rounded">
//               <h2 className="text-xl font-semibold">{assignment.title}</h2>
//               <p>{assignment.instructions}</p>
//               <a
//                 href={`http://localhost:5000/${assignment.descriptionFile}`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 View Description
//               </a>
//               <p>
//                 Deadline: {new Date(assignment.deadline).toLocaleDateString()}
//               </p>
//               <p>Marks: {assignment.marks}</p>
//               <button
//                 onClick={() =>
//                   navigate(
//                     `/faculty/courses/${courseId}/assignments/${assignment._id}/submissions`
//                   )
//                 } // Use navigate here
//                 className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
//               >
//                 View Submissions
//               </button>
//             </li>
//           ))}
//         </ul>
//       </main>
//     </div>
//   );
// };

// export default AssignmentListPage;

// import React, { useEffect, useState } from "react";
// import { useParams, Link, useNavigate } from "react-router-dom";
// import axios from "axios";

// const AssignmentListPage = () => {
//   const { courseId } = useParams();
//   const [assignments, setAssignments] = useState([]);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [selectedAssignmentId, setSelectedAssignmentId] = useState(null);
//   const role = localStorage.getItem("role");
//   const token = localStorage.getItem("token");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchAssignments = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:5000/api/assignments/${courseId}`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         setAssignments(response.data);
//       } catch (error) {
//         console.error("Error fetching assignments:", error);
//       }
//     };

//     fetchAssignments();
//   }, [courseId, token]);

//   const downloadFile = async (filename) => {
//     try {
//       const res = await axios.get(
//         `http://localhost:5000/api/assignments/download/${filename}`,
//         {
//           responseType: "blob",
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       const blob = new Blob([res.data], { type: res.data.type });
//       const link = document.createElement("a");
//       link.href = window.URL.createObjectURL(blob);
//       link.download = filename.split("/").pop();
//       link.click();
//     } catch (error) {
//       console.error("Error downloading file:", error);
//     }
//   };

//   const handleFileChange = (event) => {
//     setSelectedFile(event.target.files[0]);
//   };

//   const handleSubmitAssignment = async (assignmentId) => {
//     if (
//       selectedFile &&
//       [
//         "application/pdf",
//         "application/msword",
//         "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//         "text/plain",
//       ].includes(selectedFile.type)
//     ) {
//       const formData = new FormData();
//       formData.append("submissionFile", selectedFile);

//       try {
//         await axios.post(
//           `http://localhost:5000/api/assignments/${courseId}/${assignmentId}/upload`,
//           formData,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "Content-Type": "multipart/form-data",
//             },
//           }
//         );
//         alert("File uploaded successfully!");
//         navigate(`/courses/${courseId}/assignments`);
//       } catch (error) {
//         console.error("Error uploading file:", error);
//       }
//     } else {
//       alert(
//         "Invalid file type. Only PDF, DOC, DOCX, and TXT files are allowed."
//       );
//     }
//   };

//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-4">Assignments</h1>
//       {role === "faculty" && (
//         <Link
//           to={`/courses/${courseId}/assignments/create`}
//           className="bg-blue-500 text-white px-4 py-2 rounded"
//         >
//           Create Assignment
//         </Link>
//       )}
//       <div className="mt-4">
//         {assignments.map((assignment) => (
//           <div key={assignment._id} className="border p-4 mb-4 rounded">
//             <h2 className="text-xl font-semibold">{assignment.title}</h2>
//             <p>{assignment.instructions}</p>
//             <button
//               onClick={() => downloadFile(assignment.descriptionFile)}
//               className="mt-2 bg-green-500 text-white px-4 py-2 rounded"
//             >
//               Download Assignment Description
//             </button>
//             {role === "faculty" && (
//               <Link
//                 to={`/courses/${courseId}/assignments/${assignment._id}/submissions`}
//                 className="mt-2 bg-purple-500 text-white px-4 py-2 rounded"
//               >
//                 View Submissions
//               </Link>
//             )}
//             {role === "student" && (
//               <>
//                 <input
//                   type="file"
//                   onChange={handleFileChange}
//                   accept=".pdf,.doc,.docx,.txt"
//                   className="mt-2"
//                 />
//                 <button
//                   onClick={() => handleSubmitAssignment(assignment._id)}
//                   className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
//                 >
//                   Submit Assignment
//                 </button>
//               </>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AssignmentListPage;

// import React, { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import axios from "axios";

// const AssignmentListPage = () => {
//   const { courseId } = useParams();
//   const [assignments, setAssignments] = useState([]);
//   const role = localStorage.getItem("role");
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     const fetchAssignments = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/api/assignments/${courseId}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setAssignments(response.data);
//       } catch (error) {
//         console.error("Error fetching assignments:", error);
//       }
//     };

//     fetchAssignments();
//   }, [courseId, token]);

//   const downloadFile = async (filename) => {
//     try {
//       const res = await axios.get(`http://localhost:5000/api/assignments/download/${filename}`, {
//         responseType: "blob",
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const blob = new Blob([res.data], { type: res.data.type });
//       const link = document.createElement("a");
//       link.href = window.URL.createObjectURL(blob);
//       link.download = filename.split('/').pop();
//       link.click();
//     } catch (error) {
//       console.error("Error downloading file:", error);
//     }
//   };

//   const handleFileUpload = async (event, assignmentId) => {
//     const file = event.target.files[0];
//     if (file && ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "text/plain"].includes(file.type)) {
//       const formData = new FormData();
//       formData.append("submissionFile", file);

//       try {
//         await axios.post(
//           `http://localhost:5000/api/assignments/${courseId}/${assignmentId}/upload`,
//           formData,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "Content-Type": "multipart/form-data",
//             },
//           }
//         );
//         alert("File uploaded successfully!");
//       } catch (error) {
//         console.error("Error uploading file:", error);
//       }
//     } else {
//       alert("Invalid file type. Only PDF, DOC, DOCX, and TXT files are allowed.");
//     }
//   };

//   const handleSubmitAssignment = (assignmentId) => {
//     // Redirect to the submission page or handle the submission as needed
//     window.location.href = `/courses/${courseId}/assignments/${assignmentId}/submit`;
//   };

//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-4">Assignments</h1>
//       {role === "faculty" && (
//         <Link
//           to={`/courses/${courseId}/assignments/create`}
//           className="bg-blue-500 text-white px-4 py-2 rounded"
//         >
//           Create Assignment
//         </Link>
//       )}
//       <div className="mt-4">
//         {assignments.map((assignment) => (
//           <div key={assignment._id} className="border p-4 mb-4 rounded">
//             <h2 className="text-xl font-semibold">{assignment.title}</h2>
//             <p>{assignment.instructions}</p>
//             <button
//               onClick={() => downloadFile(assignment.descriptionFile)}
//               className="mt-2 bg-green-500 text-white px-4 py-2 rounded"
//             >
//               Download Assignment Description
//             </button>
//             {role === "faculty" && (
//               <Link
//                 to={`/courses/${courseId}/assignments/${assignment._id}/submissions`}
//                 className="mt-2 bg-purple-500 text-white px-4 py-2 rounded"
//               >
//                 View Submissions
//               </Link>
//             )}
//             {role === "student" && (
//               <>
//                 <input
//                   type="file"
//                   onChange={(e) => handleFileUpload(e, assignment._id)}
//                   accept=".pdf,.doc,.docx,.txt"
//                   className="mt-2"
//                 />
//                 <button
//                   onClick={() => handleSubmitAssignment(assignment._id)}
//                   className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
//                 >
//                   Submit Assignment
//                 </button>
//               </>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AssignmentListPage;

// import React, { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import axios from "axios";

// const AssignmentListPage = () => {
//   const { courseId } = useParams();
//   const [assignments, setAssignments] = useState([]);
//   const role = localStorage.getItem("role");
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     const fetchAssignments = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:5000/api/assignments/${courseId}`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         setAssignments(response.data);
//       } catch (error) {
//         console.error("Error fetching assignments:", error);
//       }
//     };

//     fetchAssignments();
//   }, [courseId, token]);

//   const downloadFile = async (filename) => {
//     try {
//       const res = await axios.get(
//         `http://localhost:5000/api/assignments/download/${filename}`,
//         {
//           responseType: "blob",
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       const blob = new Blob([res.data], { type: res.data.type });
//       const link = document.createElement("a");
//       link.href = window.URL.createObjectURL(blob);
//       link.download = filename;
//       link.click();
//     } catch (error) {
//       console.error("Error downloading file:", error);
//     }
//   };

//   const handleFileUpload = async (event, assignmentId) => {
//     const file = event.target.files[0];
//     if (
//       file &&
//       ["application/pdf", "application/msword", "text/plain"].includes(
//         file.type
//       )
//     ) {
//       const formData = new FormData();
//       formData.append("submissionFile", file);

//       try {
//         await axios.post(
//           `http://localhost:5000/api/assignments/${courseId}/${assignmentId}`,
//           formData,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "Content-Type": "multipart/form-data",
//             },
//           }
//         );
//         alert("File uploaded successfully!");
//       } catch (error) {
//         console.error("Error uploading file:", error);
//       }
//     } else {
//       alert("Invalid file type. Only PDF, DOC, and TXT files are allowed.");
//     }
//   };

//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-4">Assignments</h1>
//       {role === "faculty" && (
//         <Link
//           to={`/courses/${courseId}/assignments/create`}
//           className="mb-4 inline-block bg-blue-500 text-white px-4 py-2 rounded"
//         >
//           Create Assignment
//         </Link>
//       )}
//       {assignments.map((assignment) => (
//         <div key={assignment._id} className="mb-4 p-4 border rounded">
//           <h2 className="text-xl font-semibold">{assignment.title}</h2>
//           <p>{assignment.instructions}</p>
//           <button
//             onClick={() =>
//               downloadFile(assignment.descriptionFile.split("/").pop())
//             }
//             className="mt-2 bg-green-500 text-white px-4 py-2 rounded"
//           >
//             Download Assignment Description
//           </button>
//           {role === "student" && (
//             <>
//               <input
//                 type="file"
//                 onChange={(e) => handleFileUpload(e, assignment._id)}
//                 accept=".pdf,.doc,.docx,.txt"
//                 className="mt-2"
//               />
//               <Link
//                 to={`/courses/${courseId}/assignments/${assignment._id}/submit`}
//                 className="ml-4 bg-blue-500 text-white px-4 py-2 rounded"
//               >
//                 Submit Assignment
//               </Link>
//             </>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default AssignmentListPage;

// import React, { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import axios from "axios";

// const AssignmentListPage = () => {
//   const { courseId } = useParams();
//   const [assignments, setAssignments] = useState([]);
//   const role = localStorage.getItem("role");
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     const fetchAssignments = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:5000/api/assignments/${courseId}`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         setAssignments(response.data);
//       } catch (error) {
//         console.error("Error fetching assignments:", error);
//       }
//     };

//     fetchAssignments();
//   }, [courseId, token]);

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Assignments</h1>
//       {role === "faculty" && (
//         <Link
//           to={`/courses/${courseId}/assignments/create`}
//           className="block p-2 mb-4 bg-blue-500 text-white rounded"
//         >
//           Create Assignment
//         </Link>
//       )}
//       <div className="grid grid-cols-1 gap-4">
//         {assignments.map((assignment) => (
//           <div key={assignment._id} className="p-4 bg-white rounded shadow">
//             <h2 className="text-xl font-semibold">{assignment.title}</h2>
//             <p>{assignment.instructions}</p>
//             <Link
//               to={
//                 role === "faculty"
//                   ? `/assignments/${assignment._id}`
//                   : `/courses/${courseId}/assignments/${assignment._id}`
//               }
//               className="block mt-2 p-2 bg-green-500 text-white rounded"
//             >
//               {role === "faculty"
//                 ? "View Submissions"
//                 : "View & Submit Assignment"}
//             </Link>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AssignmentListPage;

// import React, { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import axios from "axios";

// const AssignmentListPage = () => {
//   const { courseId } = useParams();
//   const [assignments, setAssignments] = useState([]);
//   const role = localStorage.getItem("role");

//   useEffect(() => {
//     const fetchAssignments = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:5000/api/assignments/${courseId}`
//         );
//         setAssignments(response.data);
//       } catch (error) {
//         console.error("Error fetching assignments:", error);
//       }
//     };

//     fetchAssignments();
//   }, [courseId]);

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Assignments</h1>
//       {role === "faculty" && (
//         <Link
//           to={`/courses/${courseId}/assignments/create`}
//           className="block p-2 mb-4 bg-blue-500 text-white rounded"
//         >
//           Create Assignment
//         </Link>
//       )}
//       <div className="grid grid-cols-1 gap-4">
//         {assignments.map((assignment) => (
//           <div key={assignment._id} className="p-4 bg-white rounded shadow">
//             <h2 className="text-xl font-semibold">{assignment.title}</h2>
//             <p>{assignment.instructions}</p>
//             <Link
//               to={
//                 role === "faculty"
//                   ? `/assignments/${assignment._id}`
//                   : `/courses/${courseId}/assignments/${assignment._id}`
//               }
//               className="block mt-2 p-2 bg-green-500 text-white rounded"
//             >
//               {role === "faculty"
//                 ? "View Submissions"
//                 : "View & Submit Assignment"}
//             </Link>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AssignmentListPage;

// import React, { useState, useEffect } from "react";
// import { useParams, Link } from "react-router-dom";
// import axios from "axios";

// function AssignmentListPage() {
//   const { courseId } = useParams();
//   const [assignments, setAssignments] = useState([]);

//   useEffect(() => {
//     const fetchAssignments = async () => {
//       try {
//         const response = await axios.get(
//           `/api/assignments?courseId=${courseId}`
//         ); // Update API endpoint
//         setAssignments(response.data);
//       } catch (error) {
//         console.error("Error fetching assignments", error);
//       }
//     };

//     fetchAssignments();
//   }, [courseId]);

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//       <h1 className="text-2xl font-bold mb-6">Assignments</h1>
//       <div className="w-full max-w-4xl">
//         {assignments.map((assignment) => (
//           <AssignmentCard key={assignment._id} assignment={assignment} />
//         ))}
//       </div>
//     </div>
//   );
// }

// function AssignmentCard({ assignment }) {
//   return (
//     <div className="p-4 mb-4 bg-white rounded-md shadow-md">
//       <h2 className="text-xl font-bold">{assignment.title}</h2>
//       <p>{assignment.instructions}</p>
//       <a href={assignment.descriptionFile} download className="block mb-2">
//         Download Description
//       </a>
//       <Link
//         to={`/assignments/${assignment._id}`}
//         className="block mt-2 text-blue-500"
//       >
//         {assignment.submissions.length > 0 ? "View Submission" : "Submit"}
//       </Link>
//     </div>
//   );
// }

// export default AssignmentListPage;

// import React, { useState, useEffect } from "react";
// import { useParams, Link } from "react-router-dom";
// import axios from "axios";

// function AssignmentListPage() {
//   const { courseId } = useParams();
//   const [assignments, setAssignments] = useState([]);
//   const role = localStorage.getItem("role");

//   useEffect(() => {
//     const fetchAssignments = async () => {
//       try {
//         const response = await axios.get(
//           `/api/courses/${courseId}/assignments`
//         );
//         setAssignments(response.data);
//       } catch (error) {
//         console.error("Error fetching assignments", error);
//       }
//     };

//     fetchAssignments();
//   }, [courseId]);

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//       <h1 className="text-2xl font-bold mb-6">Assignments</h1>
//       {role === "faculty" && (
//         <Link to={`/courses/${courseId}/assignments/create`} className="mb-4">
//           <button className="px-4 py-2 bg-blue-500 text-white rounded">
//             Create Assignment
//           </button>
//         </Link>
//       )}
//       <ul className="w-full max-w-lg">
//         {assignments.map((assignment) => (
//           <li key={assignment.id} className="mb-4 p-4 bg-white shadow rounded">
//             <h2 className="text-xl font-bold">{assignment.title}</h2>
//             <p>{assignment.instructions}</p>
//             <Link
//               to={`/assignments/${assignment.id}`}
//               className="mt-2 inline-block"
//             >
//               <button className="px-4 py-2 bg-blue-500 text-white rounded">
//                 {role === "faculty"
//                   ? "View Submissions"
//                   : assignment.status === "submitted"
//                   ? "Submitted"
//                   : "Pending"}
//               </button>
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default AssignmentListPage;
