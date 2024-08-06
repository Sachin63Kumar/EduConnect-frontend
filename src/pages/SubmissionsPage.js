import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/Sidebar";

const SubmissionsPage = () => {
  const { assignmentId } = useParams();
  const [submissions, setSubmissions] = useState([]);
  const [filteredSubmissions, setFilteredSubmissions] = useState([]);
  const [marksInput, setMarksInput] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/assignments/submissions/${assignmentId}`
        );
        const initialMarks = {};
        response.data.forEach((submission) => {
          initialMarks[submission.studentId._id] =
            submission.marksObtained || "";
        });
        setSubmissions(response.data);
        setFilteredSubmissions(response.data);
        setMarksInput(initialMarks);
      } catch (error) {
        console.error("Error fetching submissions", error);
      }
    };

    fetchSubmissions();
  }, [assignmentId]);

  const handleMarksChange = (submissionId, marks) => {
    setMarksInput({
      ...marksInput,
      [submissionId]: marks,
    });
  };

  const handleAssignMarks = async (submissionId) => {
    const marks = marksInput[submissionId];

    try {
      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/assignments/assign-marks`,
        {
          assignmentId,
          studentId: submissionId,
          marksObtained: marks,
        }
      );

      const updatedSubmissions = submissions.map((submission) =>
        submission.studentId._id === submissionId
          ? { ...submission, marksObtained: marks }
          : submission
      );
      setSubmissions(updatedSubmissions);
      setFilteredSubmissions(updatedSubmissions);

      // Show success message
      alert("Marks assigned successfully!");
    } catch (error) {
      console.error("Error assigning marks", error);
    }
  };

  const handleSearch = () => {
    const filtered = submissions.filter(
      (submission) =>
        submission.studentId.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        submission.studentId.email
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    );
    setFilteredSubmissions(filtered);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Submissions</h1>
        <div className="mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name or email"
            className="px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm mr-2"
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Search
          </button>
        </div>
        <table className="min-w-full bg-white shadow rounded">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-300">
                Student Name
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300">
                Student Email
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300">
                Submission File
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300">
                Assigned Marks
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredSubmissions.map((submission) => (
              <tr key={submission._id}>
                <td className="px-6 py-4 border-b">
                  {submission.studentId.name}
                </td>
                <td className="px-6 py-4 border-b">
                  {submission.studentId.email}
                </td>
                <td className="px-6 py-4 border-b">
                  <a
                    href={submission.submissionFile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    View Submission
                  </a>
                </td>
                <td className="px-6 py-4 border-b">
                  <div className="flex items-center">
                    <input
                      type="number"
                      value={marksInput[submission.studentId._id] || ""}
                      onChange={(e) =>
                        handleMarksChange(
                          submission.studentId._id,
                          e.target.value
                        )
                      }
                      className="px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm"
                    />
                    <button
                      onClick={() =>
                        handleAssignMarks(submission.studentId._id)
                      }
                      className="ml-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      Assign Marks
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default SubmissionsPage;
