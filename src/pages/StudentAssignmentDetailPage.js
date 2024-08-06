import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import StudentSidebar from "../components/StudentSidebar";

const StudentAssignmentDetailPage = () => {
  const { assignmentId } = useParams();
  const [assignment, setAssignment] = useState(null);
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
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
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.size > 1 * 1024 * 1024) {
      // 1 MB size limit
      setErrorMessage("File size should not exceed 1 MB");
      setFile(null);
    } else {
      setErrorMessage("");
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setErrorMessage("File is required and should be less than 1 MB");
      return;
    }
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
      setErrorMessage("");
    } catch (error) {
      console.error("Error submitting assignment", error);
      setErrorMessage("Error submitting assignment. Please try again.");
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
                required
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm"
              />
              {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
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
