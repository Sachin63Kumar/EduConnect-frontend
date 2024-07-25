import React from "react";
import { useNavigate } from "react-router-dom";

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
      /> */}
      <SidebarButton
        name="Time Table Management"
        iconSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/081a4f1ce05aacad55cf56e381164e285fca5f8a0236f7797f2c01ee95a57116?apiKey=aa5f6ae70acc4a3b920c47bc2c987234&"
        routePath="/timetable"
      />
      {/* <SidebarButton
        name="Announcements"
        iconSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/d8304373172589d1d7453db3f022798615bb70c4560b0eeb80dfdb28b8a17e96?apiKey=aa5f6ae70acc4a3b920c47bc2c987234&"
        routePath="/announcements"
      /> */}
      <NewCourseButton />
    </div>
  );
}

export default Sidebar;
