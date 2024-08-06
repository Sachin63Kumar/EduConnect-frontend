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
