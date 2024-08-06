import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import StudentSidebar from "../components/StudentSidebar";

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token not found");
        }
        const userId = JSON.parse(atob(token.split(".")[1])).id;
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/notifications/${userId}`
        );
        setNotifications(response.data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  const markAsRead = async (notificationId) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/notifications/${notificationId}/read`
      );
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification._id === notificationId
            ? { ...notification, read: true }
            : notification
        )
      );
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const handleNotificationClick = (notification) => {
    // Redirect based on notification type
    switch (notification.type) {
      case "Announcement":
        return `/student/courses/${notification.courseId}/announcements`;
      case "Assignment":
        return `/student/courses/${notification.courseId}/assignments`;
      case "Quiz":
        return `/student/courses/${notification.courseId}/quizzes`;
      case "Resource":
        return `/student/courses/${notification.courseId}/resources`;
      default:
        return "/";
    }
  };

  return (
    <div className="flex flex-col lg:flex-row">
      <StudentSidebar />
      <div className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Notifications</h1>
        {notifications.length === 0 ? (
          <p>No notifications</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {notifications.map((notification) => (
              <li key={notification._id} className="py-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-6 w-6 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                  <div className="flex-grow">
                    <div className="font-medium">
                      {notification.message.replace(
                        notification.courseId,
                        notification.courseName
                      )}
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(notification.createdAt).toLocaleString()}
                    </div>
                    {!notification.read && (
                      <button
                        onClick={() => markAsRead(notification._id)}
                        className="text-sm text-blue-500 hover:underline focus:outline-none"
                      >
                        Mark as read
                      </button>
                    )}
                    <Link
                      to={handleNotificationClick(notification)}
                      className="text-sm text-gray-500 ml-2 hover:underline focus:outline-none"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default NotificationPage;
