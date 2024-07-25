// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import StudentSidebar from "../components/StudentSidebar";
// import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { firebaseApp } from "../firebase"; // Make sure to properly initialize Firebase in this file

// const StudentAssignmentDetailPage = () => {
//   const { assignmentId } = useParams();
//   const [assignment, setAssignment] = useState(null);
//   const [file, setFile] = useState(null);
//   const token = localStorage.getItem("token");
//   const userId = JSON.parse(atob(token.split(".")[1])).id;

//   useEffect(() => {
//     const fetchAssignment = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:5000/api/assignments/assignment/${assignmentId}`
//         );
//         setAssignment(response.data);
//       } catch (error) {
//         console.error("Error fetching assignment", error);
//       }
//     };

//     fetchAssignment();
//   }, [assignmentId]);

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleSubmit = async () => {
//     try {
//       const storage = getStorage(firebaseApp);
//       const fileRef = ref(storage, `submissions/${file.name}`);
//       await uploadBytes(fileRef, file);
//       const fileUrl = await getDownloadURL(fileRef);

//       const submissionData = {
//         assignmentId,
//         studentId: userId,
//         fileUrl,
//       };

//       await axios.post(
//         "http://localhost:5000/api/assignments/submit",
//         submissionData
//       );
//       alert("Assignment submitted successfully");
//     } catch (error) {
//       console.error("Error submitting assignment", error);
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       <StudentSidebar />
//       <main className="flex-1 p-6">
//         <h1 className="text-2xl font-bold mb-6">Assignment Details</h1>
//         {assignment ? (
//           <div className="space-y-4">
//             <div>
//               <h2 className="text-xl font-semibold">{assignment.title}</h2>
//               <p>{assignment.instructions}</p>
//               <a
//                 href={assignment.fileUrl}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-blue-500 hover:underline"
//               >
//                 View Assignment Description
//               </a>
//             </div>
//             <div>
//               <label className="block text-sm font-medium">
//                 Upload Your Submission
//               </label>
//               <input
//                 type="file"
//                 onChange={handleFileChange}
//                 className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm"
//               />
//             </div>
//             <button
//               onClick={handleSubmit}
//               className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//             >
//               Submit
//             </button>
//           </div>
//         ) : (
//           <p>Loading assignment details...</p>
//         )}
//       </main>
//     </div>
//   );
// };

// export default StudentAssignmentDetailPage;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import StudentSidebar from "../components/StudentSidebar";

const StudentAssignmentDetailPage = () => {
  const { assignmentId } = useParams();
  const [assignment, setAssignment] = useState(null);
  const [file, setFile] = useState(null);
  const token = localStorage.getItem("token");
  const userId = JSON.parse(atob(token.split(".")[1])).id;

  useEffect(() => {
    const fetchAssignment = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/assignments/assignment/${assignmentId}`
        );
        setAssignment(response.data);
      } catch (error) {
        console.error("Error fetching assignment", error);
      }
    };

    fetchAssignment();
  }, [assignmentId]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("assignmentId", assignmentId);
    formData.append("studentId", userId);
    formData.append("file", file);

    try {
      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/assignments/submit`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Assignment submitted successfully");
    } catch (error) {
      console.error("Error submitting assignment", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <StudentSidebar />
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Assignment Details</h1>
        {assignment ? (
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold">{assignment.title}</h2>
              <p>{assignment.instructions}</p>
              <a
                // href={`http://localhost:5000/${assignment.descriptionFile}`}
                href={assignment.descriptionFile}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Description
              </a>
              <p>
                Deadline: {new Date(assignment.deadline).toLocaleDateString()}
              </p>
              <p>Marks: {assignment.marks}</p>
            </div>
            <div>
              <label className="block text-sm font-medium">
                Upload Assignment
              </label>
              <input
                type="file"
                onChange={handleFileChange}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <button
              onClick={handleSubmit}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        ) : (
          <p>Loading assignment details...</p>
        )}
      </main>
    </div>
  );
};

export default StudentAssignmentDetailPage;

// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import StudentSidebar from "../components/StudentSidebar";
// import { jwtDecode } from "jwt-decode";

// const StudentAssignmentDetailPage = () => {
//   const { assignmentId } = useParams();
//   const [assignment, setAssignment] = useState(null);
//   const [file, setFile] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchAssignment = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:5000/api/assignments/${assignmentId}`
//         );
//         setAssignment(response.data);
//       } catch (error) {
//         console.error("Error fetching assignment", error);
//       }
//     };

//     fetchAssignment();
//   }, [assignmentId]);

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleSubmit = async () => {
//     const token = localStorage.getItem("token");
//     const decodedToken = jwtDecode(token);
//     const studentId = decodedToken.id; // Assuming the token contains the user ID as 'id'

//     const formData = new FormData();
//     formData.append("assignmentId", assignmentId);
//     formData.append("studentId", studentId);
//     formData.append("file", file);

//     try {
//       await axios.post(
//         "http://localhost:5000/api/assignments/submit",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${token}`, // Adding the token to headers for authorization
//           },
//         }
//       );
//       alert("Assignment submitted successfully");
//       navigate(`/course/${assignment.courseId}`);
//     } catch (error) {
//       console.error("Error submitting assignment", error);
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       <StudentSidebar />
//       <main className="flex-1 p-6">
//         <h1 className="text-2xl font-bold mb-6">Assignment Details</h1>
//         {assignment && (
//           <div className="space-y-4">
//             <div>
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
//             </div>
//             <div>
//               <label className="block text-sm font-medium">
//                 Upload Assignment
//               </label>
//               <input
//                 type="file"
//                 onChange={handleFileChange}
//                 className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm"
//               />
//             </div>
//             <button
//               onClick={handleSubmit}
//               className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//             >
//               Submit
//             </button>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default StudentAssignmentDetailPage;
