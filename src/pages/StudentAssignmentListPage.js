import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import StudentSidebar from "../components/StudentSidebar";

const StudentAssignmentListPage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState([]);
  const token = localStorage.getItem("token");
  const userId = JSON.parse(atob(token.split(".")[1])).id;

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

  return (
    <div className="flex min-h-screen bg-gray-100">
      <StudentSidebar />
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Assignments</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow rounded">
            <thead>
              <tr>
                <th className="px-4 py-2 border text-center">
                  Assignment Title
                </th>
                <th className="px-4 py-2 border text-center">Deadline</th>
                <th className="px-4 py-2 border text-center">Assigned Marks</th>
                <th className="px-4 py-2 border text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {assignments.map((assignment) => (
                <tr key={assignment._id} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border text-center">
                    <button
                      onClick={() =>
                        navigate(
                          `/student/courses/${courseId}/assignments/${assignment._id}/details`
                        )
                      }
                      className="text-blue-500 hover:underline"
                    >
                      {assignment.title}
                    </button>
                  </td>
                  <td className="px-4 py-2 border text-center">
                    {new Date(assignment.deadline).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 border text-center">
                    {assignment.marks}
                  </td>
                  <td className="px-4 py-2 border text-center">
                    {assignment.submissions.some(
                      (sub) => sub.studentId === userId
                    )
                      ? "Submitted"
                      : "Pending"}
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

export default StudentAssignmentListPage;
