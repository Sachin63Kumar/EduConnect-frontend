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
