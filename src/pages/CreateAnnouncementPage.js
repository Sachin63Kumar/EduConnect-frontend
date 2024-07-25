import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import axios from "axios";

const CreateAnnouncementPage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState("");

  const handleCreateAnnouncement = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/announcements/create`,
        { courseId, content },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      alert("Announcement has been shared successfully");
      navigate(`/faculty/courses/${courseId}/announcements`);
    } catch (error) {
      console.error("Error creating announcement:", error);
      alert("Failed to share the announcement");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Create Announcement</h1>
        <form onSubmit={handleCreateAnnouncement}>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 border rounded mb-4"
            placeholder="Write your announcement here..."
            rows="10"
          ></textarea>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Share Announcement
          </button>
        </form>
      </main>
    </div>
  );
};

export default CreateAnnouncementPage;
