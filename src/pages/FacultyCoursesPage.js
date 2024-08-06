import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const FacultyCoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Unauthorized");
        return;
      }

      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/courses`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setCourses(response.data);
      } catch (error) {
        setError("Error fetching courses");
      }
    };

    fetchCourses();
  }, []);

  const handleEdit = (courseId) => {
    navigate(`/edit-course/${courseId}`);
  };

  const handleDelete = async (courseId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Unauthorized");
      return;
    }

    try {
      console.log(`Attempting to delete course with ID: ${courseId}`);
      await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}/courses/${courseId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCourses(courses.filter((course) => course._id !== courseId));
    } catch (error) {
      console.error("Error deleting course", error);
      setError("Error deleting course");
    }
  };

  const handleCourseClick = (courseId) => {
    navigate(`/courses/${courseId}`);
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex flex-col lg:flex-row">
      <Sidebar />
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
                <p>status: {course.status}</p>
              </div>
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => handleEdit(course._id)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(course._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FacultyCoursesPage;
