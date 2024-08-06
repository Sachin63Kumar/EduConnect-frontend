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

function StudentSidebar() {
  return (
    <div className="flex flex-col w-full lg:w-1/4 p-4 bg-slate-50 lg:bg-white">
      <SidebarButton
        name="Courses"
        iconSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/8da3c77c20ca8edb379ac77c90f43500cb9c0bd4f5bfb3317306543c8f812a6a?apiKey=aa5f6ae70acc4a3b920c47bc2c987234&"
        routePath="/student"
      />
      <SidebarButton
        name="Notifications"
        iconSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/d8304373172589d1d7453db3f022798615bb70c4560b0eeb80dfdb28b8a17e96?apiKey=aa5f6ae70acc4a3b920c47bc2c987234&"
        routePath="/notifications"
      />
    </div>
  );
}

export default StudentSidebar;
