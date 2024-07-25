import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StudentSidebar from "../components/StudentSidebar";

const StudentCoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/courses/student`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`, // Make sure the token is correct
            },
          }
        );
        setCourses(response.data);
      } catch (error) {
        setError("Error fetching courses: " + error.message);
        console.error(error);
      }
    };

    fetchCourses();
  }, []);

  const handleCourseClick = (courseId) => {
    navigate(`/courses/${courseId}`);
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex flex-col lg:flex-row">
      <StudentSidebar />
      <div className="flex flex-col w-full lg:w-9/12 p-4">
        <h1 className="text-3xl font-bold mb-4">Courses</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map((course) => (
            <div
              key={course._id}
              className="border border-gray-300 p-4 rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow duration-300"
            >
              <div
                onClick={() => handleCourseClick(course._id)}
                className="cursor-pointer"
              >
                <h2 className="text-xl font-semibold">{course.courseName}</h2>
                <p>{course.facultyName}</p>
                <p>{course.numOfStudentEnrolled} students</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentCoursesPage;

// import axios from "axios";
// import { useState, useEffect } from "react";

// const StudentCoursesPage = () => {
//   const [courses, setCourses] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:5000/api/courses/student",
//           {
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${localStorage.getItem("token")}`, // Make sure the token is correct
//             },
//           }
//         );
//         setCourses(response.data);
//       } catch (error) {
//         setError("Error fetching courses: " + error.message);
//         console.error(error);
//       }
//     };

//     fetchCourses();
//   }, []);

//   return (
//     <div>
//       <h1>Student Courses</h1>
//       {error && <p>{error}</p>}
//       <ul>
//         {courses.map((course) => (
//           <li key={course._id}>
//             {course.courseName} - {course.facultyName}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default StudentCoursesPage;

// import axios from "axios";
// import { useState, useEffect } from "react";

// const StudentCoursesPage = () => {
//   const [courses, setCourses] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:5000/api/courses/student",
//           {
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${localStorage.getItem("token")}`,
//             },
//           }
//         );
//         setCourses(response.data);
//       } catch (error) {
//         setError("Error fetching courses: " + error.message);
//         console.error(error);
//       }
//     };

//     fetchCourses();
//   }, []);

//   return (
//     <div>
//       <h1>Student Courses</h1>
//       {error && <p>{error}</p>}
//       <ul>
//         {courses.map((course) => (
//           <li key={course._id}>{course.courseName}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default StudentCoursesPage;

// import axios from "axios";
// import { useState, useEffect } from "react";

// const StudentCoursesPage = () => {
//   const [courses, setCourses] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:5000/api/courses/student",
//           {
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${localStorage.getItem("token")}`,
//             },
//           }
//         );
//         setCourses(response.data);
//       } catch (error) {
//         setError("Error fetching courses: " + error.message);
//         console.error(error);
//       }
//     };

//     fetchCourses();
//   }, []);

//   return (
//     <div>
//       <h1>Student Courses</h1>
//       {error && <p>{error}</p>}
//       <ul>
//         {courses.map((course) => (
//           <li key={course._id}>{course.courseName}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default StudentCoursesPage;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";

// const StudentCoursesPage = () => {
//   const [courses, setCourses] = useState([]);

//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await axios.get(
//           "http://localhost:5000/api/courses/student",
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         setCourses(response.data);
//       } catch (error) {
//         console.error("Error fetching courses:", error);
//       }
//     };

//     fetchCourses();
//   }, []);

//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-6">Your Courses</h1>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         {courses.map((course) => (
//           <Link to={`/courses/${course._id}`} key={course._id}>
//             <div className="bg-white p-4 rounded-lg shadow-md hover:bg-gray-100 transition">
//               <h2 className="text-xl font-semibold">{course.courseName}</h2>
//               <p>Instructor: {course.facultyName}</p>
//               <p>Students Enrolled: {course.numOfStudentEnrolled}</p>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default StudentCoursesPage;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";

// const StudentCoursesPage = () => {
//   const [courses, setCourses] = useState([]);

//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await axios.get("http://localhost:5000/api/courses", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setCourses(response.data);
//       } catch (error) {
//         console.error("Error fetching courses:", error);
//       }
//     };

//     fetchCourses();
//   }, []);

//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-6">Your Courses</h1>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         {courses.map((course) => (
//           <Link to={`/courses/${course._id}`} key={course._id}>
//             <div className="bg-white p-4 rounded-lg shadow-md hover:bg-gray-100 transition">
//               <h2 className="text-xl font-semibold">{course.courseName}</h2>
//               <p>Instructor: {course.facultyName}</p>
//               <p>Students Enrolled: {course.numOfStudentEnrolled}</p>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default StudentCoursesPage;

// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const StudentCoursesPage = () => {
//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const { data } = await axios.get("/api/students/courses", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setCourses(data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching courses", error);
//         setLoading(false);
//       }
//     };

//     fetchCourses();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="student-courses-page">
//       <h1>My Courses</h1>
//       <div className="courses-list">
//         {courses.map((course) => (
//           <div key={course._id} className="course-card">
//             <h2>{course.courseName}</h2>
//             <p>Instructor: {course.facultyName}</p>
//             <p>Enrolled Students: {course.numOfStudentEnrolled}</p>
//             <a href={`/courses/${course._id}`}>View Course</a>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default StudentCoursesPage;

// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";

// const StudentCoursesPage = () => {
//   const [courses, setCourses] = useState([]);

//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/courses");
//         setCourses(response.data);
//       } catch (error) {
//         console.error("Error fetching courses:", error);
//       }
//     };

//     fetchCourses();
//   }, []);

//   return (
//     <div>
//       <h1>Student Courses</h1>
//       {courses.map((course) => (
//         <div key={course._id}>
//           <Link to={`/courses/${course._id}`}>
//             <h3>{course.courseName}</h3> {/* Corrected to courseName */}
//           </Link>
//           <p>Faculty: {course.facultyName}</p> {/* Corrected to facultyName */}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default StudentCoursesPage;

// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";

// const StudentCoursesPage = () => {
//   const [courses, setCourses] = useState([]);

//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/courses");
//         setCourses(response.data);
//       } catch (error) {
//         console.error("Error fetching courses:", error);
//       }
//     };

//     fetchCourses();
//   }, []);

//   return (
//     <div>
//       <h1>Student Courses</h1>
//       {courses.map((course) => (
//         <div key={course._id}>
//           <Link to={`/courses/${course._id}`}>
//             <h3>{course.name}</h3>
//           </Link>
//           <p>Faculty: {course.faculty.name}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default StudentCoursesPage;
