import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/Sidebar";

const AddResourcePage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !name || !description) {
      alert("Please fill out all fields and select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("courseId", courseId);
    formData.append("name", name);
    formData.append("description", description);

    try {
      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/resources/add`,
        formData
      );
      alert("Resource uploaded successfully");
      navigate(`/faculty/courses/${courseId}/resources`);
    } catch (error) {
      console.error("Error uploading resource", error);
      alert("Failed to upload resource");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Add Resource</h1>
        <form onSubmit={handleUpload} className="space-y-4">
          <input
            type="text"
            placeholder="Resource Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="block w-full px-3 py-2 border rounded"
          />
          <textarea
            placeholder="Resource Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="block w-full px-3 py-2 border rounded"
          />
          <input
            type="file"
            onChange={handleFileChange}
            className="block w-full px-3 py-2 border rounded"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Upload Resource
          </button>
        </form>
      </main>
    </div>
  );
};

export default AddResourcePage;