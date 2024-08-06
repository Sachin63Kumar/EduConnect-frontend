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
              Authorization: `Bearer ${localStorage.getItem("token")}`,
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
