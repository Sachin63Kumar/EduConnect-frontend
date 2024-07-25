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
        // Handle error, such as showing an error message
      }
    };

    fetchNotifications();
  }, []);

  const markAsRead = async (notificationId) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/notifications/${notificationId}/read`
      );
      // Update state to mark the notification as read
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification._id === notificationId
            ? { ...notification, read: true }
            : notification
        )
      );
    } catch (error) {
      console.error("Error marking notification as read:", error);
      // Handle error, such as showing an error message
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

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import StudentSidebar from "../components/StudentSidebar";

// const NotificationPage = () => {
//   const [notifications, setNotifications] = useState([]);

//   useEffect(() => {
//     const fetchNotifications = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) {
//           throw new Error("Token not found");
//         }
//         const userId = JSON.parse(atob(token.split(".")[1])).id;
//         const response = await axios.get(
//           `http://localhost:5000/api/notifications/${userId}`
//         );
//         setNotifications(response.data);
//       } catch (error) {
//         console.error("Error fetching notifications:", error);
//         // Handle error, such as showing an error message
//       }
//     };

//     fetchNotifications();
//   }, []);

//   const markAsRead = async (notificationId) => {
//     try {
//       await axios.put(
//         `http://localhost:5000/api/notifications/${notificationId}/read`
//       );
//       // Update state to mark the notification as read
//       setNotifications((prevNotifications) =>
//         prevNotifications.map((notification) =>
//           notification._id === notificationId
//             ? { ...notification, read: true }
//             : notification
//         )
//       );
//     } catch (error) {
//       console.error("Error marking notification as read:", error);
//       // Handle error, such as showing an error message
//     }
//   };

//   const handleNotificationClick = (notification) => {
//     // Redirect based on notification type
//     switch (notification.type) {
//       case "Announcement":
//         return `/student/courses/${notification.courseId}/announcements`;
//       case "Assignment":
//         return `/student/courses/${notification.courseId}/assignments`;
//       case "Quiz":
//         return `/student/courses/${notification.courseId}/quizzes`;
//       default:
//         return "/";
//     }
//   };

//   return (
//     <div className="flex flex-col lg:flex-row">
//       <StudentSidebar />
//       <div className="flex-grow container mx-auto px-4 py-8">
//         <h1 className="text-2xl font-bold mb-4">Notifications</h1>
//         {notifications.length === 0 ? (
//           <p>No notifications</p>
//         ) : (
//           <ul className="divide-y divide-gray-200">
//             {notifications.map((notification) => (
//               <li key={notification._id} className="py-4">
//                 <div className="flex items-start space-x-4">
//                   <div className="flex-shrink-0">
//                     <svg
//                       className="h-6 w-6 text-gray-400"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M9 5l7 7-7 7"
//                       />
//                     </svg>
//                   </div>
//                   <div className="flex-grow">
//                     <div className="font-medium">
//                       {notification.message.replace(
//                         notification.courseId,
//                         notification.courseName
//                       )}
//                     </div>
//                     <div className="text-sm text-gray-500">
//                       {new Date(notification.createdAt).toLocaleString()}
//                     </div>
//                     {!notification.read && (
//                       <button
//                         onClick={() => markAsRead(notification._id)}
//                         className="text-sm text-blue-500 hover:underline focus:outline-none"
//                       >
//                         Mark as read
//                       </button>
//                     )}
//                     <Link
//                       to={handleNotificationClick(notification)}
//                       className="text-sm text-gray-500 ml-2 hover:underline focus:outline-none"
//                     >
//                       View Details
//                     </Link>
//                   </div>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// };

// export default NotificationPage;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";

// const NotificationPage = () => {
//   const [notifications, setNotifications] = useState([]);

//   useEffect(() => {
//     const fetchNotifications = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) {
//           throw new Error("Token not found");
//         }
//         const userId = JSON.parse(atob(token.split(".")[1])).id;
//         const response = await axios.get(
//           `http://localhost:5000/api/notifications/${userId}`
//         );
//         setNotifications(response.data);
//       } catch (error) {
//         console.error("Error fetching notifications:", error);
//         // Handle error, such as showing an error message
//       }
//     };

//     fetchNotifications();
//   }, []);

//   const markAsRead = async (notificationId) => {
//     try {
//       await axios.put(
//         `http://localhost:5000/api/notifications/${notificationId}/read`
//       );
//       // Update state to mark the notification as read
//       setNotifications((prevNotifications) =>
//         prevNotifications.map((notification) =>
//           notification._id === notificationId
//             ? { ...notification, read: true }
//             : notification
//         )
//       );
//     } catch (error) {
//       console.error("Error marking notification as read:", error);
//       // Handle error, such as showing an error message
//     }
//   };

//   const handleNotificationClick = (notification) => {
//     // Redirect based on notification type
//     switch (notification.type) {
//       case "Announcement":
//         return `/student/courses/${notification.courseId}/announcements`;
//       case "Assignment":
//         return `/student/courses/${notification.courseId}/assignments`;
//       case "Quiz":
//         return `/student/courses/${notification.courseId}/quizzes`;
//       default:
//         return "/";
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-2xl font-bold mb-4">Notifications</h1>
//       {notifications.length === 0 ? (
//         <p>No notifications</p>
//       ) : (
//         <ul className="divide-y divide-gray-200">
//           {notifications.map((notification) => (
//             <li key={notification._id} className="py-4">
//               <div className="flex items-start space-x-4">
//                 <div className="flex-shrink-0">
//                   <svg
//                     className="h-6 w-6 text-gray-400"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M9 5l7 7-7 7"
//                     />
//                   </svg>
//                 </div>
//                 <div className="flex-grow">
//                   {/* <div className="font-medium">{notification.message}</div> */}
//                   <div className="font-medium">
//                     {notification.message.replace(
//                       notification.courseId,

//                       notification.courseName
//                     )}
//                   </div>

//                   <div className="text-sm text-gray-500">
//                     {new Date(notification.createdAt).toLocaleString()}
//                   </div>
//                   {!notification.read && (
//                     <button
//                       onClick={() => markAsRead(notification._id)}
//                       className="text-sm text-blue-500 hover:underline focus:outline-none"
//                     >
//                       Mark as read
//                     </button>
//                   )}
//                   <Link
//                     to={handleNotificationClick(notification)}
//                     className="text-sm text-gray-500 ml-2 hover:underline focus:outline-none"
//                   >
//                     View Details
//                   </Link>
//                 </div>
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default NotificationPage;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";

// const NotificationPage = () => {
//   const [notifications, setNotifications] = useState([]);

//   useEffect(() => {
//     const fetchNotifications = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:5000/api/notifications"
//         );
//         setNotifications(response.data);
//       } catch (error) {
//         console.error("Error fetching notifications:", error);
//         // Handle error, such as showing an error message
//       }
//     };

//     fetchNotifications();
//   }, []);

//   const markAsRead = async (notificationId) => {
//     try {
//       await axios.put(
//         `http://localhost:5000/api/notifications/${notificationId}/read`
//       );
//       // Update state to mark the notification as read
//       setNotifications((prevNotifications) =>
//         prevNotifications.map((notification) =>
//           notification._id === notificationId
//             ? { ...notification, read: true }
//             : notification
//         )
//       );
//     } catch (error) {
//       console.error("Error marking notification as read:", error);
//       // Handle error, such as showing an error message
//     }
//   };

//   const handleNotificationClick = async (notification) => {
//     try {
//       await markAsRead(notification._id);

//       // Redirect based on notification type
//       switch (notification.type) {
//         case "Announcement":
//           return `/faculty/courses/${notification.courseId}/announcements`;
//         case "Assignment":
//           return `/faculty/courses/${notification.courseId}/assignments`;
//         case "Quiz":
//           return `/courses/${notification.courseId}/quizzes`;
//         default:
//           return "/";
//       }
//     } catch (error) {
//       console.error("Error handling notification click:", error);
//       // Handle error, such as showing an error message
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-2xl font-bold mb-4">Notifications</h1>
//       {notifications.length === 0 ? (
//         <p>No notifications</p>
//       ) : (
//         <ul className="divide-y divide-gray-200">
//           {notifications.map((notification) => (
//             <li key={notification._id} className="py-4">
//               <div className="flex items-start space-x-4">
//                 <div className="flex-shrink-0">
//                   <svg
//                     className="h-6 w-6 text-gray-400"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M9 5l7 7-7 7"
//                     />
//                   </svg>
//                 </div>
//                 <div className="flex-grow">
//                   <div className="font-medium">{notification.message}</div>
//                   <div className="text-sm text-gray-500">
//                     {new Date(notification.createdAt).toLocaleString()}
//                   </div>
//                   {!notification.read && (
//                     <button
//                       onClick={() => markAsRead(notification._id)}
//                       className="text-sm text-blue-500 hover:underline focus:outline-none"
//                     >
//                       Mark as read
//                     </button>
//                   )}
//                   <Link
//                     to={() => handleNotificationClick(notification)}
//                     className="text-sm text-gray-500 ml-2 hover:underline focus:outline-none"
//                   >
//                     View Details
//                   </Link>
//                 </div>
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default NotificationPage;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const NotificationPage = () => {
//   const [notifications, setNotifications] = useState([]);
//   //   const history = useHistory();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchNotifications = async () => {
//       try {
//         const response = await axios.get("/api/notifications");
//         setNotifications(response.data);
//       } catch (error) {
//         console.error("Error fetching notifications:", error);
//         // Handle error, such as showing an error message
//       }
//     };

//     fetchNotifications();
//   }, []);

//   const markAsRead = async (notificationId) => {
//     try {
//       await axios.put(`/api/notifications/${notificationId}/read`);
//       // Update state to mark the notification as read
//       setNotifications((prevNotifications) =>
//         prevNotifications.map((notification) =>
//           notification._id === notificationId
//             ? { ...notification, read: true }
//             : notification
//         )
//       );
//     } catch (error) {
//       console.error("Error marking notification as read:", error);
//       // Handle error, such as showing an error message
//     }
//   };

//   const handleNotificationClick = (notification) => {
//     // Redirect to appropriate page based on notification type
//     switch (notification.type) {
//       case "Announcement":
//         // Example: Redirect to announcement detail page
//         navigate(`/announcement/${notification.courseId}`);
//         break;
//       case "Assignment":
//         // Example: Redirect to assignment detail page
//         navigate(`/assignment/${notification.courseId}`);
//         break;
//       case "Quiz":
//         // Example: Redirect to quiz detail page
//         navigate(`/quiz/${notification.courseId}`);
//         break;
//       default:
//         break;
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-2xl font-bold mb-4">Notifications</h1>
//       {notifications.length === 0 ? (
//         <p>No notifications</p>
//       ) : (
//         <ul className="divide-y divide-gray-200">
//           {notifications.map((notification) => (
//             <li key={notification._id} className="py-4">
//               <div className="flex items-start space-x-4">
//                 <div className="flex-shrink-0">
//                   <svg
//                     className="h-6 w-6 text-gray-400"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M9 5l7 7-7 7"
//                     />
//                   </svg>
//                 </div>
//                 <div className="flex-grow">
//                   <div className="font-medium">{notification.message}</div>
//                   <div className="text-sm text-gray-500">
//                     {new Date(notification.createdAt).toLocaleString()}
//                   </div>
//                   {!notification.read && (
//                     <button
//                       onClick={() => markAsRead(notification._id)}
//                       className="text-sm text-blue-500 hover:underline focus:outline-none"
//                     >
//                       Mark as read
//                     </button>
//                   )}
//                   <button
//                     onClick={() => handleNotificationClick(notification)}
//                     className="text-sm text-gray-500 ml-2 hover:underline focus:outline-none"
//                   >
//                     View Details
//                   </button>
//                 </div>
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default NotificationPage;
