import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/Sidebar";

const ResourceSharingPage = () => {
  const { courseId } = useParams();
  const [resources, setResources] = useState([]);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/resources/${courseId}`
        );
        setResources(response.data);
      } catch (error) {
        console.error("Error fetching resources", error);
      }
    };

    fetchResources();
  }, [courseId]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Share Resources</h1>
        <Link
          to={`/faculty/courses/${courseId}/add-resource`}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Add Resource
        </Link>
        <section style={{ marginTop: "1.5rem" }}>
          <ul className="space-y-4">
            {resources.map((resource) => (
              <li key={resource._id} className="p-4 bg-white shadow rounded">
                <h2 className="text-xl font-semibold">{resource.name}</h2>
                <p className="text-gray-700">{resource.description}</p>
                <a
                  href={resource.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  View Resource
                </a>
                <p className="text-gray-500">
                  Uploaded at: {new Date(resource.uploadedAt).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default ResourceSharingPage;
