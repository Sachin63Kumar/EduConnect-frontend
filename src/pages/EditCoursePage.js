import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function SidebarButton({ name, iconSrc, routePath }) {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(routePath)}
      className="flex gap-3 mt-1 mb-1 px-3 py-2 whitespace-nowrap rounded-xl bg-slate-200 hover:bg-slate-300 transition"
    >
      <img
        alt="nav-links"
        loading="lazy"
        src={iconSrc}
        className="shrink-0 w-6 aspect-square"
      />
      <div>{name}</div>
    </button>
  );
}

function NewCourseButton() {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate("/create-course")}
      className="flex justify-center items-center px-4 py-2.5 mt-10 font-bold tracking-wide bg-blue-600 rounded-xl text-slate-50 hover:bg-blue-700 transition"
    >
      New Course
    </button>
  );
}

function Sidebar() {
  return (
    <div className="flex flex-col lg:w-3/12 p-4 bg-slate-50">
      <SidebarButton
        name="Home"
        iconSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/dfea735581d9617d18f4628af8bb0a5158fe02770950ed59162b2ccd98d5cc10?apiKey=aa5f6ae70acc4a3b920c47bc2c987234&"
        routePath="/faculty-dashboard"
      />
      <SidebarButton
        name="Courses"
        iconSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/8da3c77c20ca8edb379ac77c90f43500cb9c0bd4f5bfb3317306543c8f812a6a?apiKey=aa5f6ae70acc4a3b920c47bc2c987234&"
        routePath="/faculty-courses"
      />
      <SidebarButton
        name="Time Table Management"
        iconSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/081a4f1ce05aacad55cf56e381164e285fca5f8a0236f7797f2c01ee95a57116?apiKey=aa5f6ae70acc4a3b920c47bc2c987234&"
        routePath="/timetable"
      />
      <NewCourseButton />
    </div>
  );
}

const EditCoursePage = () => {
  const { courseId } = useParams();
  const [courseName, setCourseName] = useState("");
  const [facultyName, setFacultyName] = useState("");
  const [numOfStudentEnrolled, setNumOfStudentEnrolled] = useState(0);
  const [status, setStatus] = useState("in progress");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/courses/${courseId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const course = response.data;
        setCourseName(course.courseName);
        setFacultyName(course.facultyName);
        setNumOfStudentEnrolled(course.numOfStudentEnrolled);
        setStatus(course.status);
      } catch (error) {
        console.error("Error fetching course:", error);
      }
    };

    fetchCourse();
  }, [courseId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/courses/${courseId}`,
        { courseName, facultyName, numOfStudentEnrolled, status },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      navigate("/faculty-courses");
    } catch (error) {
      console.error("Error updating course:", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-6">
        <h2 className="text-2xl font-bold mb-6">Edit Course</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2">Course Name</label>
            <input
              type="text"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              required
              className="w-full p-3 border rounded"
            />
          </div>
          <div>
            <label className="block mb-2">Faculty Name</label>
            <input
              type="text"
              value={facultyName}
              onChange={(e) => setFacultyName(e.target.value)}
              required
              className="w-full p-3 border rounded"
            />
          </div>
          <div>
            <label className="block mb-2">Number of Students Enrolled</label>
            <input
              type="number"
              value={numOfStudentEnrolled}
              onChange={(e) => setNumOfStudentEnrolled(e.target.value)}
              required
              className="w-full p-3 border rounded"
            />
          </div>
          <div>
            <label className="block mb-2">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full p-3 border rounded"
            >
              <option value="in progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-blue-500 text-white rounded"
          >
            Update
          </button>
        </form>
      </main>
    </div>
  );
};

export default EditCoursePage;
