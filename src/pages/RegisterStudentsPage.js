import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import FacultySidebar from "../components/Sidebar"; // Adjust the import path as needed

const RegisterStudentsPage = () => {
  const { courseId } = useParams();
  const [students, setStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/users/students`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setStudents(response.data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, []);

  const handleCheckboxChange = (studentId) => {
    setSelectedStudents((prev) =>
      prev.includes(studentId)
        ? prev.filter((id) => id !== studentId)
        : [...prev, studentId]
    );
  };

  const handleRegisterStudents = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/courses/${courseId}/register`,
        {
          studentIds: selectedStudents,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Students registered successfully!");
    } catch (error) {
      console.error("Error registering students:", error);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <FacultySidebar />
      <div className="flex-1 p-6 bg-gray-100">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Register Students
        </h1>
        <div className="bg-white shadow-md rounded-lg p-4 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Register
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Student Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Email
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {students.map((student) => (
                <tr key={student._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-blue-600"
                      onChange={() => handleCheckboxChange(student._id)}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-gray-700">{student.name}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-gray-700">{student.email}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center mt-6">
            <button
              onClick={handleRegisterStudents}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
            >
              Register Students
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterStudentsPage;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import FacultySidebar from "../components/Sidebar"; // Adjust the import path as needed

// const RegisterStudentsPage = () => {
//   const { courseId } = useParams();
//   const [students, setStudents] = useState([]);
//   const [selectedStudents, setSelectedStudents] = useState([]);

//   useEffect(() => {
//     const fetchStudents = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await axios.get(
//           "http://localhost:5000/api/users/students",
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         setStudents(response.data);
//       } catch (error) {
//         console.error("Error fetching students:", error);
//       }
//     };

//     fetchStudents();
//   }, []);

//   const handleCheckboxChange = (studentId) => {
//     setSelectedStudents((prev) =>
//       prev.includes(studentId)
//         ? prev.filter((id) => id !== studentId)
//         : [...prev, studentId]
//     );
//   };

//   const handleRegisterStudents = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       await axios.post(
//         `http://localhost:5000/api/courses/${courseId}/register`,
//         {
//           studentIds: selectedStudents,
//         },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       alert("Students registered successfully!");
//     } catch (error) {
//       console.error("Error registering students:", error);
//     }
//   };

//   return (
//     <div className="flex flex-col lg:flex-row min-h-screen">
//       <FacultySidebar />
//       <div className="flex-1 p-6 bg-gray-100">
//         <h1 className="text-3xl font-bold mb-6 text-center">
//           Register Students
//         </h1>
//         <div className="bg-white shadow-md rounded-lg p-4">
//           <ul className="space-y-4">
//             {students.map((student) => (
//               <li key={student._id} className="flex items-center space-x-4">
//                 <input
//                   type="checkbox"
//                   className="form-checkbox h-5 w-5 text-blue-600"
//                   onChange={() => handleCheckboxChange(student._id)}
//                 />
//                 <span className="text-gray-700">
//                   {student.name} ({student.email})
//                 </span>
//               </li>
//             ))}
//           </ul>
//           <div className="flex justify-center mt-6">
//             <button
//               onClick={handleRegisterStudents}
//               className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
//             >
//               Register Students
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RegisterStudentsPage;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";

// const RegisterStudentsPage = () => {
//   const { courseId } = useParams();
//   const [students, setStudents] = useState([]);
//   const [selectedStudents, setSelectedStudents] = useState([]);

//   useEffect(() => {
//     const fetchStudents = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await axios.get(
//           "http://localhost:5000/api/users/students",
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         setStudents(response.data);
//       } catch (error) {
//         console.error("Error fetching students:", error);
//       }
//     };

//     fetchStudents();
//   }, []);

//   const handleCheckboxChange = (studentId) => {
//     setSelectedStudents((prev) =>
//       prev.includes(studentId)
//         ? prev.filter((id) => id !== studentId)
//         : [...prev, studentId]
//     );
//   };

//   const handleRegisterStudents = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       await axios.post(
//         `http://localhost:5000/api/courses/${courseId}/register`,
//         {
//           studentIds: selectedStudents,
//         },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       alert("Students registered successfully!");
//     } catch (error) {
//       console.error("Error registering students:", error);
//     }
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-6">Register Students</h1>
//       <ul>
//         {students.map((student) => (
//           <li key={student._id} className="mb-4">
//             <label>
//               <input
//                 type="checkbox"
//                 onChange={() => handleCheckboxChange(student._id)}
//               />
//               {student.name} ({student.email})
//             </label>
//           </li>
//         ))}
//       </ul>
//       <button
//         onClick={handleRegisterStudents}
//         className="bg-blue-500 text-white p-2 rounded"
//       >
//         Register Students
//       </button>
//     </div>
//   );
// };

// export default RegisterStudentsPage;

// import React, { useState } from "react";
// import axios from "axios";

// const RegisterStudentsPage = () => {
//   const [studentIds, setStudentIds] = useState("");
//   const [courseId, setCourseId] = useState("");

//   const handleRegister = async (e) => {
//     e.preventDefault();

//     try {
//       const token = localStorage.getItem("token");
//       await axios.post(
//         "/api/students/register",
//         { studentIds: studentIds.split(","), courseId },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       alert("Students registered successfully");
//     } catch (error) {
//       console.error("Error registering students", error);
//       alert("Error registering students");
//     }
//   };

//   return (
//     <div className="register-students-page">
//       <h1>Register Students to a Course</h1>
//       <form onSubmit={handleRegister}>
//         <div>
//           <label>Student IDs (comma separated):</label>
//           <input
//             type="text"
//             value={studentIds}
//             onChange={(e) => setStudentIds(e.target.value)}
//           />
//         </div>
//         <div>
//           <label>Course ID:</label>
//           <input
//             type="text"
//             value={courseId}
//             onChange={(e) => setCourseId(e.target.value)}
//           />
//         </div>
//         <button type="submit">Register</button>
//       </form>
//     </div>
//   );
// };

// export default RegisterStudentsPage;

// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const RegisterStudentsPage = () => {
//   const [students, setStudents] = useState([]);
//   const [courses, setCourses] = useState([]);
//   const [selectedCourse, setSelectedCourse] = useState("");
//   const [selectedStudents, setSelectedStudents] = useState([]);

//   useEffect(() => {
//     const fetchStudents = async () => {
//       const { data } = await axios.get("http://localhost:5000/api/students");
//       setStudents(data);
//     };

//     const fetchCourses = async () => {
//       const { data } = await axios.get("http://localhost:5000/api/courses");
//       setCourses(data);
//     };

//     fetchStudents();
//     fetchCourses();
//   }, []);

//   const handleStudentChange = (e) => {
//     const value = Array.from(
//       e.target.selectedOptions,
//       (option) => option.value
//     );
//     setSelectedStudents(value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const payload = {
//       studentIds: selectedStudents,
//       courseId: selectedCourse,
//     };

//     try {
//       await axios.post("http://localhost:5000/api/students/register", payload);
//       alert("Students registered successfully");
//     } catch (error) {
//       console.error("Error registering students", error);
//       alert("Error registering students");
//     }
//   };

//   return (
//     <div className="register-students-page">
//       <h1>Register Students to Course</h1>
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label htmlFor="course">Course</label>
//           <select
//             id="course"
//             value={selectedCourse}
//             onChange={(e) => setSelectedCourse(e.target.value)}
//             required
//           >
//             <option value="">Select a course</option>
//             {courses.map((course) => (
//               <option key={course._id} value={course._id}>
//                 {course.courseName}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div className="form-group">
//           <label htmlFor="students">Students</label>
//           <select
//             id="students"
//             multiple
//             value={selectedStudents}
//             onChange={handleStudentChange}
//             required
//           >
//             {students.map((student) => (
//               <option key={student._id} value={student._id}>
//                 {student.name} ({student.email})
//               </option>
//             ))}
//           </select>
//         </div>
//         <button type="submit">Register Students</button>
//       </form>
//     </div>
//   );
// };

// export default RegisterStudentsPage;
