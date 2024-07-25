import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/Sidebar";

const FacultyAnnouncementListPage = () => {
  const { courseId } = useParams();
  const [announcements, setAnnouncements] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editContent, setEditContent] = useState("");
  const navigate = useNavigate();

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

  const handleCreateAnnouncement = () => {
    navigate(`/faculty/courses/${courseId}/announcements/create-announcement`);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}/announcements/${id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setAnnouncements((prev) =>
        prev.filter((announcement) => announcement._id !== id)
      );
    } catch (error) {
      console.error("Error deleting announcement:", error);
    }
  };

  const handleEdit = (announcement) => {
    setEditingId(announcement._id);
    setEditContent(announcement.content);
  };

  const handleUpdate = async (id) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/announcements/${id}`,
        { content: editContent },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setAnnouncements((prev) =>
        prev.map((announcement) =>
          announcement._id === id ? response.data : announcement
        )
      );
      setEditingId(null);
      setEditContent("");
    } catch (error) {
      console.error("Error updating announcement:", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Announcements</h1>
        <button
          onClick={handleCreateAnnouncement}
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        >
          Create Announcement
        </button>
        <ul>
          {announcements.map((announcement) => (
            <li
              key={announcement._id}
              className="mb-4 p-4 border rounded bg-white"
            >
              {editingId === announcement._id ? (
                <div>
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="w-full p-2 border rounded mb-4"
                    rows="5"
                  ></textarea>
                  <button
                    onClick={() => handleUpdate(announcement._id)}
                    className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setEditingId(null);
                      setEditContent("");
                    }}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div>
                  <p className="text-lg">{announcement.content}</p>
                  <p
                    className="text-sm text-gray-500"
                    style={{ marginBottom: "1rem" }}
                  >
                    {new Date(announcement.createdAt).toLocaleString()}
                  </p>
                  <button
                    onClick={() => handleEdit(announcement)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(announcement._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Delete
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default FacultyAnnouncementListPage;

// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import Sidebar from "../components/Sidebar";
// import axios from "axios";

// const FacultyAnnouncementListPage = () => {
//   const { courseId } = useParams();
//   const navigate = useNavigate();
//   const [announcements, setAnnouncements] = useState([]);

//   useEffect(() => {
//     const fetchAnnouncements = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:5000/api/announcements/${courseId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("token")}`,
//             },
//           }
//         );
//         setAnnouncements(response.data);
//       } catch (error) {
//         console.error("Error fetching announcements:", error);
//       }
//     };

//     fetchAnnouncements();
//   }, [courseId]);

//   const handleCreateAnnouncement = () => {
//     navigate(`/faculty/courses/${courseId}/announcements/create-announcement`);
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       <Sidebar />
//       <main className="flex-1 p-6">
//         <h1 className="text-2xl font-bold mb-6">Announcements</h1>
//         <button
//           onClick={handleCreateAnnouncement}
//           className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
//         >
//           Create Announcement
//         </button>
//         <ul>
//           {announcements.map((announcement) => (
//             <li
//               key={announcement._id}
//               className="mb-4 p-4 bg-white shadow-md rounded"
//             >
//               <p>{announcement.content}</p>
//               <p className="text-gray-600 text-sm">
//                 {new Date(announcement.createdAt).toLocaleString()}
//               </p>
//             </li>
//           ))}
//         </ul>
//       </main>
//     </div>
//   );
// };

// export default FacultyAnnouncementListPage;
