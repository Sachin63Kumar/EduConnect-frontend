import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StudentSidebar from "../components/StudentSidebar";

const StudentDashboardPage = () => {
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

export default StudentDashboardPage;

// import React from "react";
// import { Outlet } from "react-router-dom";
// import Sidebar from "../components/StudentSidebar";

// const StudentDashboardPage = () => {
//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       <Sidebar />
//       <main className="flex-1 p-6">
//         <Outlet />
//       </main>
//     </div>
//   );
// };

// export default StudentDashboardPage;

// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const StudentDashboardPage = () => {
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
//     <div className="student-dashboard">
//       <h1>Your Courses</h1>
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

// export default StudentDashboardPage;

// import React from "react";
// import { Link } from "react-router-dom";

// function StudentDashboard() {
//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       <Sidebar />
//       <main className="flex-1 p-6">
//         <h1 className="text-2xl font-bold mb-6">Student Dashboard</h1>
//         <Link to="/student-courses" className="block mb-4">
//           Courses
//         </Link>
//         {/* Add more links and content as needed */}
//       </main>
//     </div>
//   );
// }

// function Sidebar() {
//   return (
//     <div className="w-64 bg-white shadow-lg">
//       <nav className="p-6">
//         <Link to="/student-dashboard" className="block mb-4">
//           Home
//         </Link>
//         <Link to="/student-courses" className="block mb-4">
//           Courses
//         </Link>
//         <Link to="/announcements" className="block mb-4">
//           Announcements
//         </Link>
//         {/* Add more links as needed */}
//       </nav>
//     </div>
//   );
// }

// export default StudentDashboard;
