import React from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import StudentSidebar from "../components/StudentSidebar";
// import Sidebar from "../components/Sidebar";

function SidebarButton({ name, iconSrc, routePath }) {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(routePath)}
      className="flex gap-3 mt-1 mb-1 px-3 py-2 whitespace-nowrap rounded-xl bg-slate-200 hover:bg-slate-300 transition"
    >
      <img
        alt="nav-links"
        loading="lazy"
        src={iconSrc}
        className="shrink-0 w-6 aspect-square"
      />
      <div>{name}</div>
    </button>
  );
}

function NewCourseButton() {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate("/create-course")}
      className="flex justify-center items-center px-4 py-2.5 mt-10 font-bold tracking-wide bg-blue-600 rounded-xl text-slate-50 hover:bg-blue-700 transition"
    >
      New Course
    </button>
  );
}

function Sidebar() {
  return (
    <div className="flex flex-col lg:w-3/12 p-4 bg-slate-50">
      <SidebarButton
        name="Home"
        iconSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/dfea735581d9617d18f4628af8bb0a5158fe02770950ed59162b2ccd98d5cc10?apiKey=aa5f6ae70acc4a3b920c47bc2c987234&"
        routePath="/faculty-dashboard"
      />
      <SidebarButton
        name="Courses"
        iconSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/8da3c77c20ca8edb379ac77c90f43500cb9c0bd4f5bfb3317306543c8f812a6a?apiKey=aa5f6ae70acc4a3b920c47bc2c987234&"
        routePath="/faculty-courses"
      />
      {/* <SidebarButton
        name="Students"
        iconSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/c4a1f3291bece5ebfc6474faa3dc4ca7e06561cf02e15a98a512e73414db59c2?apiKey=aa5f6ae70acc4a3b920c47bc2c987234&"
        routePath="/faculty-dashboard"
      />
      <SidebarButton
        name="Grades"
        iconSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/10d517d6cc349e6cd35e42035dd2255f717ed6c928e6b273743758bed150e984?apiKey=aa5f6ae70acc4a3b920c47bc2c987234&"
        routePath="/faculty-dashboard"
      />
      <SidebarButton
        name="Attendance"
        iconSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/081a4f1ce05aacad55cf56e381164e285fca5f8a0236f7797f2c01ee95a57116?apiKey=aa5f6ae70acc4a3b920c47bc2c987234&"
        routePath="/faculty-dashboard"
      /> */}
      <SidebarButton
        name="Time Table Management"
        iconSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/081a4f1ce05aacad55cf56e381164e285fca5f8a0236f7797f2c01ee95a57116?apiKey=aa5f6ae70acc4a3b920c47bc2c987234&"
        routePath="/timetable"
      />
      <NewCourseButton />
    </div>
  );
}

function CourseDetailPage() {
  const { courseId } = useParams();
  const role = localStorage.getItem("role");

  return (
    <div className="flex min-h-screen bg-gray-100">
      {role === "faculty" ? <Sidebar /> : <StudentSidebar />}
      {/* <Sidebar /> */}
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Course Details</h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {role === "faculty" ? (
            <>
              <Card
                link={`/faculty/courses/${courseId}/assignments`}
                text="Create and See Assignments"
                color="bg-blue-100"
              />
              <Card
                link={`/faculty/courses/${courseId}/resources`}
                text="Share Resources"
                color="bg-green-100"
              />
              <Card
                link={`/courses/${courseId}/quizzes`}
                text="Quiz Creation and Assessment"
                color="bg-purple-100"
              />
              <Card
                link={`/courses/${courseId}/register`}
                text="Register Students"
                color="bg-yellow-100"
              />
              <Card
                link={`/faculty/courses/${courseId}/announcements`}
                text="Share Announcements"
                color="bg-orange-100"
              />
            </>
          ) : (
            <>
              <Card
                link={`/student/courses/${courseId}/assignments`}
                text="See and Submit Assignments"
                color="bg-blue-100"
              />
              <Card
                link={`/student/courses/${courseId}/resources`}
                text="See Shared Resources"
                color="bg-green-100"
              />
              <Card
                link={`/student/courses/${courseId}/quizzes`}
                text="Attempt Quiz"
                color="bg-purple-100"
              />
              <Card
                link={`/student/courses/${courseId}/announcements`}
                text="See Announcements"
                color="bg-orange-100"
              />
            </>
          )}
        </div>
      </main>
    </div>
  );
}

function Card({ link, text, color }) {
  return (
    <Link
      to={link}
      className={`block p-6 rounded-lg shadow-md hover:bg-gray-200 transition ${color}`}
    >
      {text}
    </Link>
  );
}

export default CourseDetailPage;

// // pages/CourseDetailPage.js
// import React from "react";
// import { useNavigate, useParams, Link } from "react-router-dom";
// // import Sidebar from "../components/Sidebar";

// function SidebarButton({ name, iconSrc, routePath }) {
//   const navigate = useNavigate();
//   return (
//     <button
//       onClick={() => navigate(routePath)}
//       className="flex gap-3 mt-1 mb-1 px-3 py-2 whitespace-nowrap rounded-xl bg-slate-200 hover:bg-slate-300 transition"
//     >
//       <img
//         alt="nav-links"
//         loading="lazy"
//         src={iconSrc}
//         className="shrink-0 w-6 aspect-square"
//       />
//       <div>{name}</div>
//     </button>
//   );
// }

// function NewCourseButton() {
//   const navigate = useNavigate();
//   return (
//     <button
//       onClick={() => navigate("/create-course")}
//       className="flex justify-center items-center px-4 py-2.5 mt-10 font-bold tracking-wide bg-blue-600 rounded-xl text-slate-50 hover:bg-blue-700 transition"
//     >
//       New Course
//     </button>
//   );
// }

// function Sidebar() {
//   return (
//     <div className="flex flex-col lg:w-3/12 p-4 bg-slate-50">
//       <SidebarButton
//         name="Home"
//         iconSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/dfea735581d9617d18f4628af8bb0a5158fe02770950ed59162b2ccd98d5cc10?apiKey=aa5f6ae70acc4a3b920c47bc2c987234&"
//         routePath="/faculty-dashboard"
//       />
//       <SidebarButton
//         name="Courses"
//         iconSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/8da3c77c20ca8edb379ac77c90f43500cb9c0bd4f5bfb3317306543c8f812a6a?apiKey=aa5f6ae70acc4a3b920c47bc2c987234&"
//         routePath="/faculty-courses"
//       />
//       <SidebarButton
//         name="Students"
//         iconSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/c4a1f3291bece5ebfc6474faa3dc4ca7e06561cf02e15a98a512e73414db59c2?apiKey=aa5f6ae70acc4a3b920c47bc2c987234&"
//         routePath="/faculty-dashboard"
//       />
//       <SidebarButton
//         name="Grades"
//         iconSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/10d517d6cc349e6cd35e42035dd2255f717ed6c928e6b273743758bed150e984?apiKey=aa5f6ae70acc4a3b920c47bc2c987234&"
//         routePath="/faculty-dashboard"
//       />
//       <SidebarButton
//         name="Attendance"
//         iconSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/081a4f1ce05aacad55cf56e381164e285fca5f8a0236f7797f2c01ee95a57116?apiKey=aa5f6ae70acc4a3b920c47bc2c987234&"
//         routePath="/faculty-dashboard"
//       />
//       <SidebarButton
//         name="Announcements"
//         iconSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/d8304373172589d1d7453db3f022798615bb70c4560b0eeb80dfdb28b8a17e96?apiKey=aa5f6ae70acc4a3b920c47bc2c987234&"
//         routePath="/announcements"
//       />
//       <NewCourseButton />
//     </div>
//   );
// }

// function CourseDetailPage() {
//   const { courseId } = useParams();
//   const role = localStorage.getItem("role");

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       <Sidebar />
//       <main className="flex-1 p-6">
//         <h1 className="text-2xl font-bold mb-6">Course Details</h1>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           {role === "faculty" ? (
//             <>
//               <Card
//                 link={`/courses/${courseId}/assignments`}
//                 text="Create and See Assignments"
//                 color="bg-blue-100"
//               />
//               <Card
//                 link={`/courses/${courseId}/resources`}
//                 text="Share Resources"
//                 color="bg-green-100"
//               />
//               <Card
//                 link={`/courses/${courseId}/quiz`}
//                 text="Quiz Creation and Assessment"
//                 color="bg-purple-100"
//               />
//               <Card
//                 link={`/courses/${courseId}/register-students`}
//                 text="Register Students"
//                 color="bg-yellow-100"
//               />
//             </>
//           ) : (
//             <>
//               <Card
//                 link={`/courses/${courseId}/assignments`}
//                 text="See and Submit Assignments"
//                 color="bg-blue-100"
//               />
//               <Card
//                 link={`/courses/${courseId}/resources`}
//                 text="See Shared Resources"
//                 color="bg-green-100"
//               />
//               <Card
//                 link={`/courses/${courseId}/quiz`}
//                 text="Attempt Quiz"
//                 color="bg-purple-100"
//               />
//             </>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// }

// function Card({ link, text, color }) {
//   return (
//     <Link
//       to={link}
//       className={`block p-6 rounded-lg shadow-md hover:bg-gray-200 transition ${color}`}
//     >
//       {text}
//     </Link>
//   );
// }

// export default CourseDetailPage;

// // CourseDetailPage.js
// import React from "react";
// import { useNavigate, useParams, Link } from "react-router-dom";
// // import Sidebar from "../components/Sidebar";

// function SidebarButton({ name, iconSrc, routePath }) {
//   const navigate = useNavigate();
//   return (
//     <button
//       onClick={() => navigate(routePath)}
//       className="flex gap-3 mt-1 mb-1 px-3 py-2 whitespace-nowrap rounded-xl bg-slate-200 hover:bg-slate-300 transition"
//     >
//       <img
//         alt="nav-links"
//         loading="lazy"
//         src={iconSrc}
//         className="shrink-0 w-6 aspect-square"
//       />
//       <div>{name}</div>
//     </button>
//   );
// }

// function NewCourseButton() {
//   const navigate = useNavigate();
//   return (
//     <button
//       onClick={() => navigate("/create-course")}
//       className="flex justify-center items-center px-4 py-2.5 mt-10 font-bold tracking-wide bg-blue-600 rounded-xl text-slate-50 hover:bg-blue-700 transition"
//     >
//       New Course
//     </button>
//   );
// }

// function Sidebar() {
//   return (
//     <div className="flex flex-col lg:w-3/12 p-4 bg-slate-50">
//       <SidebarButton
//         name="Home"
//         iconSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/dfea735581d9617d18f4628af8bb0a5158fe02770950ed59162b2ccd98d5cc10?apiKey=aa5f6ae70acc4a3b920c47bc2c987234&"
//         routePath="/faculty-dashboard"
//       />
//       <SidebarButton
//         name="Courses"
//         iconSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/8da3c77c20ca8edb379ac77c90f43500cb9c0bd4f5bfb3317306543c8f812a6a?apiKey=aa5f6ae70acc4a3b920c47bc2c987234&"
//         routePath="/faculty-courses"
//       />
//       <SidebarButton
//         name="Students"
//         iconSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/c4a1f3291bece5ebfc6474faa3dc4ca7e06561cf02e15a98a512e73414db59c2?apiKey=aa5f6ae70acc4a3b920c47bc2c987234&"
//         routePath="/faculty-dashboard"
//       />
//       <SidebarButton
//         name="Grades"
//         iconSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/10d517d6cc349e6cd35e42035dd2255f717ed6c928e6b273743758bed150e984?apiKey=aa5f6ae70acc4a3b920c47bc2c987234&"
//         routePath="/faculty-dashboard"
//       />
//       <SidebarButton
//         name="Attendance"
//         iconSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/081a4f1ce05aacad55cf56e381164e285fca5f8a0236f7797f2c01ee95a57116?apiKey=aa5f6ae70acc4a3b920c47bc2c987234&"
//         routePath="/faculty-dashboard"
//       />
//       <SidebarButton
//         name="Announcements"
//         iconSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/d8304373172589d1d7453db3f022798615bb70c4560b0eeb80dfdb28b8a17e96?apiKey=aa5f6ae70acc4a3b920c47bc2c987234&"
//         routePath="/announcements"
//       />
//       <NewCourseButton />
//     </div>
//   );
// }

// function CourseDetailPage() {
//   const { courseId } = useParams(); // Updated to use courseId instead of id
//   const role = localStorage.getItem("role"); // Assuming role is stored in localStorage

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       <Sidebar />
//       <main className="flex-1 p-6">
//         <h1 className="text-2xl font-bold mb-6">Course Details</h1>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           {role === "faculty" ? (
//             <>
//               <Card
//                 link={`/courses/${courseId}/assignments`} // Updated link to use courseId
//                 text="Create and See Assignments"
//                 color="bg-blue-100"
//               />
//               <Card
//                 link={`/courses/${courseId}/resources`} // Updated link to use courseId
//                 text="Share Resources"
//                 color="bg-green-100"
//               />
//               <Card
//                 link={`/courses/${courseId}/quiz`} // Updated link to use courseId
//                 text="Quiz Creation and Assessment"
//                 color="bg-purple-100"
//               />
//             </>
//           ) : (
//             <>
//               <Card
//                 link={`/courses/${courseId}/assignments`} // Updated link to use courseId
//                 text="See and Submit Assignments"
//                 color="bg-blue-100"
//               />
//               <Card
//                 link={`/courses/${courseId}/resources`} // Updated link to use courseId
//                 text="See Shared Resources"
//                 color="bg-green-100"
//               />
//               <Card
//                 link={`/courses/${courseId}/quiz`} // Updated link to use courseId
//                 text="Attempt Quiz"
//                 color="bg-purple-100"
//               />
//             </>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// }

// function Card({ link, text, color }) {
//   return (
//     <Link
//       to={link}
//       className={`block p-6 rounded-lg shadow-md hover:bg-gray-200 transition ${color}`}
//     >
//       {text}
//     </Link>
//   );
// }

// export default CourseDetailPage;

// // CourseDetailPage.js
// import React from "react";
// import { useParams, Link } from "react-router-dom";
// import Sidebar from "../components/Sidebar";

// function CourseDetailPage() {
//   const { id } = useParams();
//   const role = localStorage.getItem("role"); // Assuming role is stored in localStorage

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       <Sidebar />
//       <main className="flex-1 p-6">
//         <h1 className="text-2xl font-bold mb-6">Course Details</h1>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           {role === "faculty" ? (
//             <>
//               <Card
//                 link={`/courses/${id}/assignments`}
//                 text="Create and See Assignments"
//                 color="bg-blue-100"
//               />
//               <Card
//                 link={`/courses/${id}/resources`}
//                 text="Share Resources"
//                 color="bg-green-100"
//               />
//               <Card
//                 link={`/courses/${id}/quiz`}
//                 text="Quiz Creation and Assessment"
//                 color="bg-purple-100"
//               />
//             </>
//           ) : (
//             <>
//               <Card
//                 link={`/courses/${id}/assignments`}
//                 text="See and Submit Assignments"
//                 color="bg-blue-100"
//               />
//               <Card
//                 link={`/courses/${id}/resources`}
//                 text="See Shared Resources"
//                 color="bg-green-100"
//               />
//               <Card
//                 link={`/courses/${id}/quiz`}
//                 text="Attempt Quiz"
//                 color="bg-purple-100"
//               />
//             </>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// }

// function Card({ link, text, color }) {
//   return (
//     <Link
//       to={link}
//       className={`block p-6 rounded-lg shadow-md hover:bg-gray-200 transition ${color}`}
//     >
//       {text}
//     </Link>
//   );
// }

// export default CourseDetailPage;

// import React from "react";
// import { useNavigate, useParams, Link } from "react-router-dom";

// function CourseDetailPage() {
//   const { id } = useParams();
//   const role = localStorage.getItem("role"); // Assuming role is stored in localStorage

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       <Sidebar />
//       <main className="flex-1 p-6">
//         <h1 className="text-2xl font-bold mb-6">Course Details</h1>
//         <div className="grid grid-cols-3 gap-4">
//           {role === "faculty" ? (
//             <>
//               <Card
//                 link={`/courses/${id}/assignments`}
//                 text="Create and See Assignments"
//                 color="bg-blue-100"
//               />
//               <Card
//                 link={`/courses/${id}/resources`}
//                 text="Share Resources"
//                 color="bg-green-100"
//               />
//               <Card
//                 link={`/courses/${id}/quiz`}
//                 text="Quiz Creation and Assessment"
//                 color="bg-purple-100"
//               />
//             </>
//           ) : (
//             <>
//               <Card
//                 link={`/courses/${id}/assignments`}
//                 text="See and Submit Assignments"
//                 color="bg-blue-100"
//               />
//               <Card
//                 link={`/courses/${id}/resources`}
//                 text="See Shared Resources"
//                 color="bg-green-100"
//               />
//               <Card
//                 link={`/courses/${id}/quiz`}
//                 text="Attempt Quiz"
//                 color="bg-purple-100"
//               />
//             </>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// }

// function Card({ link, text, color }) {
//   return (
//     <Link
//       to={link}
//       className={`block p-6 rounded-lg shadow-md hover:bg-gray-100 ${color}`}
//     >
//       {text}
//     </Link>
//   );
// }

// export default CourseDetailPage;

// import React from "react";
// import { useParams, Link } from "react-router-dom";

// function CourseDetailPage() {
//   const { id } = useParams();
//   const role = localStorage.getItem("role"); // Assuming role is stored in localStorage

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       <Sidebar />
//       <main className="flex-1 p-6">
//         <h1 className="text-2xl font-bold mb-6">Course Details</h1>
//         <div className="grid grid-cols-3 gap-4">
//           {role === "faculty" ? (
//             <>
//               <Card
//                 link={`/courses/${id}/assignments`}
//                 text="Create and See Assignments"
//               />
//               <Card link={`/courses/${id}/resources`} text="Share Resources" />
//               <Card
//                 link={`/courses/${id}/quiz`}
//                 text="Quiz Creation and Assessment"
//               />
//             </>
//           ) : (
//             <>
//               <Card
//                 link={`/courses/${id}/assignments`}
//                 text="See and Submit Assignments"
//               />
//               <Card
//                 link={`/courses/${id}/resources`}
//                 text="See Shared Resources"
//               />
//               <Card link={`/courses/${id}/quiz`} text="Attempt Quiz" />
//             </>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// }

// function Card({ link, text }) {
//   return (
//     <Link
//       to={link}
//       className="block p-6 bg-white rounded-lg shadow-md hover:bg-gray-100"
//     >
//       {text}
//     </Link>
//   );
// }

// function Sidebar() {
//   return (
//     <div className="w-64 bg-white shadow-lg">
//       <nav className="p-6">
//         <Link to="/" className="block mb-4">
//           Home
//         </Link>
//         <Link to="/student-courses" className="block mb-4">
//           Courses
//         </Link>
//         <Link to="/announcements" className="block mb-4">
//           Announcements
//         </Link>
//       </nav>
//     </div>
//   );
// }

// export default CourseDetailPage;

// import React from "react";
// import { useParams, Link } from "react-router-dom";

// function CourseDetailPage() {
//   const { courseId } = useParams();
//   const role = localStorage.getItem("role");

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       <Sidebar />
//       <main className="flex-1 p-6">
//         <h1 className="text-2xl font-bold mb-6">Course Details</h1>
//         <div className="grid grid-cols-3 gap-4">
//           {role === "faculty" ? (
//             <>
//               <Card
//                 link={`/course/${courseId}/assignments`}
//                 text="Create and See Assignments"
//               />
//               <Card
//                 link={`/course/${courseId}/resources`}
//                 text="Share Resources"
//               />
//               <Card
//                 link={`/course/${courseId}/quiz`}
//                 text="Quiz Creation and Assessment"
//               />
//             </>
//           ) : (
//             <>
//               <Card
//                 link={`/course/${courseId}/assignments`}
//                 text="See and Submit Assignments"
//               />
//               <Card
//                 link={`/course/${courseId}/resources`}
//                 text="See Shared Resources"
//               />
//               <Card link={`/course/${courseId}/quiz`} text="Attempt Quiz" />
//             </>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// }

// function Card({ link, text }) {
//   return (
//     <Link
//       to={link}
//       className="block p-6 bg-white rounded-lg shadow-md hover:bg-gray-100"
//     >
//       {text}
//     </Link>
//   );
// }

// function Sidebar() {
//   return (
//     <div className="w-64 bg-white shadow-lg">
//       <nav className="p-6">
//         <Link to="/" className="block mb-4">
//           Home
//         </Link>
//         <Link to="/courses" className="block mb-4">
//           Courses
//         </Link>
//         <Link to="/announcements" className="block mb-4">
//           Announcements
//         </Link>
//       </nav>
//     </div>
//   );
// }

// export default CourseDetailPage;
