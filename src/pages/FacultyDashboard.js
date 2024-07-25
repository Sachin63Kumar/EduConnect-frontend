import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import axios from "axios";

function JoinButton() {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate("/join")}
      className="flex flex-col justify-center px-4 py-1.5 my-auto text-sm font-medium leading-5 whitespace-nowrap rounded-xl bg-slate-200 text-neutral-900 max-md:px-5"
    >
      <div className="justify-center bg-slate-200">Join</div>
    </button>
  );
}

function FacultyDashboard() {
  const [facultyName, setFacultyName] = useState("");
  const [todayClasses, setTodayClasses] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = JSON.parse(atob(token.split(".")[1])).id;

    const fetchTimetable = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/faculty-dashboard/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setFacultyName(response.data.facultyName);

        const today = new Date().toLocaleDateString("en-US", {
          weekday: "long",
        });
        const classes = response.data.schedule[today];
        setTodayClasses(classes ? Object.entries(classes) : []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTimetable();
  }, []);

  return (
    <div
      className="flex flex-col justify-center w-full bg-slate-50 max-md:max-w-full"
      style={{ background: "white" }}
    >
      <div className="justify-center px-6 py-5 w-full max-md:px-5 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <Sidebar />
          <div className="flex flex-col ml-5 w-9/12 max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow justify-center pt-4 pb-20 max-md:mt-6 max-md:max-w-full">
              <div className="mx-4 text-3xl font-bold tracking-tighter text-neutral-900 max-md:mr-2.5 max-md:max-w-full">
                Welcome {facultyName}
              </div>
              <div className="mx-4 mt-8 text-lg font-bold tracking-tight text-neutral-900 max-md:mr-2.5 max-md:max-w-full">
                Today's Classes
              </div>
              {todayClasses.length > 0 ? (
                todayClasses.map(([time, courseName], index) => (
                  <div
                    key={index}
                    className="flex gap-0 justify-between px-4 py-3 mt-2.5 bg-slate-50 max-md:flex-wrap"
                  >
                    <div className="flex flex-1 gap-4 max-md:flex-wrap">
                      <div className="flex justify-center items-center px-3 w-12 h-12 rounded-lg bg-slate-200">
                        <img
                          alt="course-card"
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/e0ddd15e60383c93495467867f77fbe28a1e44d5122ef5d53167d59f1912c6b1?apiKey=aa5f6ae70acc4a3b920c47bc2c987234&"
                          className="w-6 aspect-square"
                        />
                      </div>
                      <div className="flex flex-col flex-1 justify-center self-start leading-[150%] max-md:max-w-full">
                        <div className="text-base font-medium text-neutral-900 max-md:max-w-full">
                          {courseName}
                        </div>
                        <div className="text-sm text-slate-500 max-md:max-w-full">
                          {time}
                        </div>
                      </div>
                    </div>
                    <JoinButton />
                  </div>
                ))
              ) : (
                <div className="mx-4 mt-8 text-sm text-neutral-500">
                  No classes scheduled for today.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FacultyDashboard;

// import React from "react";
// import { useNavigate } from "react-router-dom";
// import Sidebar from "../components/Sidebar";

// function JoinButton() {
//   const navigate = useNavigate();
//   return (
//     <button
//       onClick={() => navigate("/join")}
//       className="flex flex-col justify-center px-4 py-1.5 my-auto text-sm font-medium leading-5 whitespace-nowrap rounded-xl bg-slate-200 text-neutral-900 max-md:px-5"
//     >
//       <div className="justify-center bg-slate-200">Join</div>
//     </button>
//   );
// }

// function FacultyDashboard() {
//   return (
//     <div className="flex flex-col justify-center w-full bg-slate-50 max-md:max-w-full">
//       <div className="justify-center px-6 py-5 w-full max-md:px-5 max-md:max-w-full">
//         <div className="flex gap-5 max-md:flex-col max-md:gap-0">
//           <Sidebar />
//           <div className="flex flex-col ml-5 w-9/12 max-md:ml-0 max-md:w-full">
//             <div className="flex flex-col grow justify-center pt-4 pb-20 max-md:mt-6 max-md:max-w-full">
//               <div className="mx-4 text-3xl font-bold tracking-tighter text-neutral-900 max-md:mr-2.5 max-md:max-w-full">
//                 Welcome Dr. Naveen Kumar
//               </div>
//               <div className="mx-4 mt-8 text-lg font-bold tracking-tight text-neutral-900 max-md:mr-2.5 max-md:max-w-full">
//                 Today's Classes
//               </div>
//               <div className="flex gap-0 justify-between px-4 py-3 mt-2.5 bg-slate-50 max-md:flex-wrap">
//                 <div className="flex flex-1 gap-4 max-md:flex-wrap">
//                   <div className="flex justify-center items-center px-3 w-12 h-12 rounded-lg bg-slate-200">
//                     <img
//                       alt="course-card"
//                       loading="lazy"
//                       src="https://cdn.builder.io/api/v1/image/assets/TEMP/e0ddd15e60383c93495467867f77fbe28a1e44d5122ef5d53167d59f1912c6b1?apiKey=aa5f6ae70acc4a3b920c47bc2c987234&"
//                       className="w-6 aspect-square"
//                     />
//                   </div>
//                   <div className="flex flex-col flex-1 justify-center self-start leading-[150%] max-md:max-w-full">
//                     <div className="text-base font-medium text-neutral-900 max-md:max-w-full">
//                       Data Structure 101
//                     </div>
//                     <div className="text-sm text-slate-500 max-md:max-w-full">
//                       10:00am - 11:30am
//                     </div>
//                   </div>
//                 </div>
//                 <JoinButton />
//               </div>
//               <div className="flex gap-0 justify-between px-4 py-3 bg-slate-50 max-md:flex-wrap">
//                 <div className="flex flex-1 gap-4 max-md:flex-wrap">
//                   <div className="flex justify-center items-center px-3 w-12 h-12 rounded-lg bg-slate-200">
//                     <img
//                       alt="course-card"
//                       loading="lazy"
//                       src="https://cdn.builder.io/api/v1/image/assets/TEMP/50492066cc8206dbaf790badbe11c258f54ec04d106f49709ff70398beff5b3d?apiKey=aa5f6ae70acc4a3b920c47bc2c987234&"
//                       className="w-6 aspect-square"
//                     />
//                   </div>
//                   <div className="flex flex-col flex-1 justify-center self-start leading-[150%] max-md:max-w-full">
//                     <div className="text-base font-medium text-neutral-900 max-md:max-w-full">
//                       DBMS 201
//                     </div>
//                     <div className="text-sm text-slate-500 max-md:max-w-full">
//                       1:00pm - 2:30pm
//                     </div>
//                   </div>
//                 </div>
//                 <JoinButton />
//               </div>
//               <div className="flex gap-0 justify-between px-4 py-3 bg-slate-50 max-md:flex-wrap">
//                 <div className="flex flex-1 gap-4 max-md:flex-wrap">
//                   <div className="flex justify-center items-center px-3 w-12 h-12 rounded-lg bg-slate-200">
//                     <img
//                       alt="course-card"
//                       loading="lazy"
//                       src="https://cdn.builder.io/api/v1/image/assets/TEMP/a6fc5fafedc6df81f404ceb6b1bc30f0878a3ffa24dd0042f35b4d7adb744163?apiKey=aa5f6ae70acc4a3b920c47bc2c987234&"
//                       className="w-6 aspect-square"
//                     />
//                   </div>
//                   <div className="flex flex-col flex-1 justify-center self-start leading-[150%] max-md:max-w-full">
//                     <div className="text-base font-medium text-neutral-900 max-md:max-w-full">
//                       Information Security 301
//                     </div>
//                     <div className="text-sm text-slate-500 max-md:max-w-full">
//                       3:00pm - 4:30pm
//                     </div>
//                   </div>
//                 </div>
//                 <JoinButton />
//               </div>
//               <div className="self-start mt-4 ml-4 text-lg font-bold tracking-tight text-neutral-900 max-md:ml-2.5">
//                 Upcoming Assignments
//               </div>
//               <div className="justify-center p-4 mt-2 text-base leading-6 bg-slate-50 text-neutral-900 max-md:max-w-full">
//                 Assignment 1 - Due August 18th
//               </div>
//               <div className="justify-center items-start p-4 text-base leading-6 bg-slate-50 text-neutral-900 max-md:pr-5 max-md:max-w-full">
//                 Assignment 2 - Due August 25th
//               </div>
//               <div className="justify-center items-start p-4 text-base leading-6 bg-slate-50 text-neutral-900 max-md:pr-5 max-md:max-w-full">
//                 Assignment 3 - Due September 1st
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default FacultyDashboard;

// import React from "react";
// import { Link } from "react-router-dom";

// function FacultyDashboard() {
//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       <Sidebar role={"faculty"} />
//       <main className="flex-1 p-6">
//         <h1 className="text-2xl font-bold mb-6">Faculty Dashboard</h1>
//         <Link to="/faculty-courses" className="block mb-4">
//           Courses
//         </Link>
//         {/* Add more links and content as needed */}
//       </main>
//     </div>
//   );
// }

// function Sidebar({ role }) {
//   return (
//     <div className="w-64 bg-white shadow-lg">
//       <nav className="p-6">
//         <Link to="/faculty-dashboard" className="block mb-4">
//           Home
//         </Link>
//         <Link to="/faculty-courses" className="block mb-4">
//           Courses
//         </Link>
//         {role === "faculty" && (
//           <Link to="/create-course" className="block mb-4">
//             Create Course
//           </Link>
//         )}
//         <Link to="/announcements" className="block mb-4">
//           Announcements
//         </Link>
//       </nav>
//     </div>
//   );
// }

// export default FacultyDashboard;
