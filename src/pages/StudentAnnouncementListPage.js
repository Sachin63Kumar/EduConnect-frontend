import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StudentSidebar from "../components/StudentSidebar";
import axios from "axios";

const StudentAnnouncementListPage = () => {
  const { courseId } = useParams();
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/announcements/${courseId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setAnnouncements(response.data);
      } catch (error) {
        console.error("Error fetching announcements:", error);
      }
    };

    fetchAnnouncements();
  }, [courseId]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <StudentSidebar />
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Announcements</h1>
        <ul>
          {announcements.map((announcement) => (
            <li
              key={announcement._id}
              className="mb-4 p-4 bg-white shadow-md rounded"
            >
              <p>{announcement.content}</p>
              <p className="text-gray-600 text-sm">
                {new Date(announcement.createdAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default StudentAnnouncementListPage;
