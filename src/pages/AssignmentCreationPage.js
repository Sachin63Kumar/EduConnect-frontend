// import React, { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import Sidebar from "../components/Sidebar";
// import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { firebaseApp } from "../firebase"; // Make sure to properly initialize Firebase in this file

// const AssignmentCreationPage = () => {
//   const { courseId } = useParams();
//   const navigate = useNavigate();
//   const [title, setTitle] = useState("");
//   const [instructions, setInstructions] = useState("");
//   const [file, setFile] = useState(null);
//   const [deadline, setDeadline] = useState("");
//   const [marks, setMarks] = useState("");

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleSubmit = async () => {
//     try {
//       const storage = getStorage(firebaseApp);
//       const fileRef = ref(storage, `assignments/${file.name}`);
//       await uploadBytes(fileRef, file);
//       const fileUrl = await getDownloadURL(fileRef);

//       const assignmentData = {
//         courseId,
//         title,
//         instructions,
//         fileUrl,
//         deadline,
//         marks,
//       };

//       await axios.post(
//         "http://localhost:5000/api/assignments/add",
//         assignmentData
//       );
//       navigate(`/faculty/courses/${courseId}/assignments`);
//     } catch (error) {
//       console.error("Error creating assignment", error);
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       <Sidebar />
//       <main className="flex-1 p-6">
//         <h1 className="text-2xl font-bold mb-6">Create Assignment</h1>
//         <div className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium">
//               Assignment Title
//             </label>
//             <input
//               type="text"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium">Instructions</label>
//             <textarea
//               value={instructions}
//               onChange={(e) => setInstructions(e.target.value)}
//               className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium">
//               Upload Assignment Description File
//             </label>
//             <input
//               type="file"
//               onChange={handleFileChange}
//               className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium">Deadline Date</label>
//             <input
//               type="date"
//               value={deadline}
//               onChange={(e) => setDeadline(e.target.value)}
//               className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium">Assigned Marks</label>
//             <input
//               type="number"
//               value={marks}
//               onChange={(e) => setMarks(e.target.value)}
//               className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm"
//             />
//           </div>
//           <button
//             onClick={handleSubmit}
//             className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//           >
//             Submit
//           </button>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default AssignmentCreationPage;

import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/Sidebar";

const AssignmentCreationPage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [instructions, setInstructions] = useState("");
  const [file, setFile] = useState(null);
  const [deadline, setDeadline] = useState("");
  const [marks, setMarks] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileChange = (e) => {
    // setFile(e.target.files[0]);
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
    formData.append("courseId", courseId);
    formData.append("title", title);
    formData.append("instructions", instructions);
    formData.append("file", file);
    formData.append("deadline", deadline);
    formData.append("marks", marks);

    try {
      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/assignments/add`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      navigate(`/faculty/courses/${courseId}/assignments`);
      setErrorMessage("");
    } catch (error) {
      console.error("Error creating assignment", error);
      setErrorMessage("Error creating assignment. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Create Assignment</h1>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">
              Assignment Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Instructions</label>
            <textarea
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">
              Upload Assignment Description File
            </label>
            <input
              type="file"
              onChange={handleFileChange}
              required
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm"
            />
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium">Deadline Date</label>
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Assigned Marks</label>
            <input
              type="number"
              value={marks}
              onChange={(e) => setMarks(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <button
            onClick={handleSubmit}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </main>
    </div>
  );
};

export default AssignmentCreationPage;

// import React, { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";

// const AssignmentCreationPage = () => {
//   const { courseId } = useParams();
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     title: "",
//     instructions: "",
//     descriptionFile: "",
//     deadline: "",
//   });
//   const token = localStorage.getItem("token");

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleFileChange = (e) => {
//     setFormData({ ...formData, descriptionFile: e.target.files[0] });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const form = new FormData();
//     form.append("title", formData.title);
//     form.append("instructions", formData.instructions);
//     form.append("descriptionFile", formData.descriptionFile);
//     form.append("deadline", formData.deadline);
//     form.append("course", courseId);

//     try {
//       await axios.post(
//         `http://localhost:5000/api/assignments/${courseId}`,
//         form,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       navigate(`/courses/${courseId}/assignments`);
//     } catch (error) {
//       console.error("Error creating assignment:", error);
//     }
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Create Assignment</h1>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block mb-1 font-semibold">Title</label>
//           <input
//             type="text"
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//             required
//           />
//         </div>
//         <div>
//           <label className="block mb-1 font-semibold">Instructions</label>
//           <textarea
//             name="instructions"
//             value={formData.instructions}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//             required
//           />
//         </div>
//         <div>
//           <label className="block mb-1 font-semibold">
//             Upload Description File
//           </label>
//           <input
//             type="file"
//             name="descriptionFile"
//             onChange={handleFileChange}
//             className="w-full p-2 border rounded"
//             required
//           />
//         </div>
//         <div>
//           <label className="block mb-1 font-semibold">Deadline</label>
//           <input
//             type="date"
//             name="deadline"
//             value={formData.deadline}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//             required
//           />
//         </div>
//         <button
//           type="submit"
//           className="block p-2 bg-blue-500 text-white rounded"
//         >
//           Create Assignment
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AssignmentCreationPage;

// // src/pages/AssignmentCreationPage.js
// import React, { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";

// const AssignmentCreationPage = () => {
//   const { courseId } = useParams();
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     title: "",
//     instructions: "",
//     descriptionFile: "",
//     deadline: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleFileChange = (e) => {
//     setFormData({ ...formData, descriptionFile: e.target.files[0] });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const form = new FormData();
//     form.append("title", formData.title);
//     form.append("instructions", formData.instructions);
//     form.append("descriptionFile", formData.descriptionFile);
//     form.append("deadline", formData.deadline);
//     form.append("course", courseId);

//     try {
//       await axios.post(
//         `http://localhost:5000/api/assignments/${courseId}`,
//         form
//       );
//       navigate(`/courses/${courseId}/assignments`);
//     } catch (error) {
//       console.error("Error creating assignment:", error);
//     }
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Create Assignment</h1>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block mb-1 font-semibold">Title</label>
//           <input
//             type="text"
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//             required
//           />
//         </div>
//         <div>
//           <label className="block mb-1 font-semibold">Instructions</label>
//           <textarea
//             name="instructions"
//             value={formData.instructions}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//             required
//           />
//         </div>
//         <div>
//           <label className="block mb-1 font-semibold">
//             Upload Description File
//           </label>
//           <input
//             type="file"
//             name="descriptionFile"
//             onChange={handleFileChange}
//             className="w-full p-2 border rounded"
//             required
//           />
//         </div>
//         <div>
//           <label className="block mb-1 font-semibold">Deadline</label>
//           <input
//             type="date"
//             name="deadline"
//             value={formData.deadline}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//             required
//           />
//         </div>
//         <button
//           type="submit"
//           className="block p-2 bg-blue-500 text-white rounded"
//         >
//           Create Assignment
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AssignmentCreationPage;

// import React, { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";

// function AssignmentCreationPage() {
//   const { courseId } = useParams();
//   const [title, setTitle] = useState("");
//   const [instructions, setInstructions] = useState("");
//   const [descriptionFile, setDescriptionFile] = useState(null);
//   const [deadline, setDeadline] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("title", title);
//     formData.append("instructions", instructions);
//     formData.append("descriptionFile", descriptionFile);
//     formData.append("deadline", deadline);

//     try {
//       await axios.post(`/api/courses/${courseId}/assignments`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       alert("Assignment created successfully");
//       navigate(`/courses/${courseId}/assignments`);
//     } catch (error) {
//       console.error("Error creating assignment", error);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//       <h1 className="text-2xl font-bold mb-6">Create Assignment</h1>
//       <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-4">
//         <input
//           type="text"
//           placeholder="Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           className="w-full px-3 py-2 border rounded"
//         />
//         <textarea
//           placeholder="Instructions"
//           value={instructions}
//           onChange={(e) => setInstructions(e.target.value)}
//           className="w-full px-3 py-2 border rounded"
//         />
//         <input
//           type="file"
//           onChange={(e) => setDescriptionFile(e.target.files[0])}
//           className="w-full px-3 py-2 border rounded"
//         />
//         <input
//           type="date"
//           value={deadline}
//           onChange={(e) => setDeadline(e.target.value)}
//           className="w-full px-3 py-2 border rounded"
//         />
//         <button
//           type="submit"
//           className="w-full px-4 py-2 bg-blue-500 text-white rounded"
//         >
//           Create Assignment
//         </button>
//       </form>
//     </div>
//   );
// }

// export default AssignmentCreationPage;

// import React, { useState } from "react";
// import axios from "axios";

// function AssignmentCreationPage() {
//   const [title, setTitle] = useState("");
//   const [instructions, setInstructions] = useState("");
//   const [descriptionFile, setDescriptionFile] = useState(null);
//   const [deadline, setDeadline] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("title", title);
//     formData.append("instructions", instructions);
//     formData.append("descriptionFile", descriptionFile);
//     formData.append("deadline", deadline);

//     try {
//       await axios.post("/api/assignments", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       alert("Assignment created successfully");
//     } catch (error) {
//       console.error("Error creating assignment", error);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//       <h1 className="text-2xl font-bold mb-6">Create Assignment</h1>
//       <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-4">
//         <input
//           type="text"
//           placeholder="Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           className="w-full px-3 py-2 border rounded"
//         />
//         <textarea
//           placeholder="Instructions"
//           value={instructions}
//           onChange={(e) => setInstructions(e.target.value)}
//           className="w-full px-3 py-2 border rounded"
//         />
//         <input
//           type="file"
//           onChange={(e) => setDescriptionFile(e.target.files[0])}
//           className="w-full px-3 py-2 border rounded"
//         />
//         <input
//           type="date"
//           value={deadline}
//           onChange={(e) => setDeadline(e.target.value)}
//           className="w-full px-3 py-2 border rounded"
//         />
//         <button
//           type="submit"
//           className="w-full px-4 py-2 bg-blue-500 text-white rounded"
//         >
//           Create Assignment
//         </button>
//       </form>
//     </div>
//   );
// }

// export default AssignmentCreationPage;
