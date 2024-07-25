import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TimeTablePage = () => {
  const navigate = useNavigate();
  const [timeTable, setTimeTable] = useState({
    Monday: {},
    Tuesday: {},
    Wednesday: {},
    Thursday: {},
    Friday: {},
    // Saturday: {},
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTimeTable = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/timetables`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setTimeTable(data.schedule);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchTimeTable();
  }, []);

  const handleInputChange = (day, time, value) => {
    setTimeTable((prevTimeTable) => ({
      ...prevTimeTable,
      [day]: {
        ...prevTimeTable[day],
        [time]: value,
      },
    }));
  };

  const handleAddTimeSlot = (day) => {
    const newTimeSlot = prompt("Enter the new time slot (e.g., 10:00 AM):");
    if (newTimeSlot) {
      setTimeTable((prevTimeTable) => ({
        ...prevTimeTable,
        [day]: {
          ...prevTimeTable[day],
          [newTimeSlot]: "",
        },
      }));
    }
  };

  const handleDeleteTimeSlot = (day, time) => {
    setTimeTable((prevTimeTable) => {
      const newDaySchedule = { ...prevTimeTable[day] };
      delete newDaySchedule[time];
      return {
        ...prevTimeTable,
        [day]: newDaySchedule,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/timetables/update`,
        { schedule: timeTable },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Time Table Updated Successfully");
    } catch (error) {
      console.error(error);
      alert("Error updating time table");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-semibold mb-6">Time Table Management</h2>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        onClick={() => navigate("/timetable/create")}
      >
        Create Time Table
      </button>
      <form onSubmit={handleSubmit}>
        <table className="table-auto w-full mb-4 border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Day</th>
              <th className="border border-gray-300 p-2">Time</th>
              <th className="border border-gray-300 p-2">Course</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(timeTable).map((day) => (
              <React.Fragment key={day}>
                <tr>
                  <td
                    rowSpan={Object.keys(timeTable[day]).length + 1}
                    className="font-semibold border border-gray-300 p-2"
                  >
                    {day}
                  </td>
                  <td colSpan="3" className="border border-gray-300 p-2">
                    <button
                      type="button"
                      onClick={() => handleAddTimeSlot(day)}
                      className="bg-blue-500 text-white py-1 px-2 rounded"
                    >
                      Add Time Slot
                    </button>
                  </td>
                </tr>
                {Object.keys(timeTable[day]).map((time) => (
                  <tr key={time}>
                    <td className="border border-gray-300 p-2">{time}</td>
                    <td className="border border-gray-300 p-2">
                      <input
                        type="text"
                        className="border px-2 py-1 w-full"
                        value={timeTable[day][time] || ""}
                        onChange={(e) =>
                          handleInputChange(day, time, e.target.value)
                        }
                      />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <button
                        type="button"
                        onClick={() => handleDeleteTimeSlot(day, time)}
                        className="bg-red-500 text-white py-1 px-2 rounded"
                      >
                        Delete Time Slot
                      </button>
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Update Time Table
        </button>
      </form>
      <button
        className="bg-green-500 text-white px-12 py-2 rounded mb-4 mt-4"
        onClick={() => navigate("/faculty-dashboard")}
      >
        Go Back
      </button>
    </div>
  );
};

export default TimeTablePage;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const TimeTablePage = () => {
//   const navigate = useNavigate();
//   const [timeTable, setTimeTable] = useState({
//     Monday: {},
//     Tuesday: {},
//     Wednesday: {},
//     Thursday: {},
//     Friday: {},
//     Saturday: {},
//   });
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchTimeTable = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const { data } = await axios.get(
//           "http://localhost:5000/api/timetables",
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         setTimeTable(data.schedule);
//         setLoading(false);
//       } catch (error) {
//         console.error(error);
//         setLoading(false);
//       }
//     };

//     fetchTimeTable();
//   }, []);

//   const handleInputChange = (day, time, value) => {
//     setTimeTable((prevTimeTable) => ({
//       ...prevTimeTable,
//       [day]: {
//         ...prevTimeTable[day],
//         [time]: value,
//       },
//     }));
//   };

//   const handleAddTimeSlot = (day) => {
//     const newTimeSlot = prompt("Enter the new time slot (e.g., 10:00 AM):");
//     if (newTimeSlot) {
//       setTimeTable((prevTimeTable) => ({
//         ...prevTimeTable,
//         [day]: {
//           ...prevTimeTable[day],
//           [newTimeSlot]: "",
//         },
//       }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const token = localStorage.getItem("token");
//       await axios.put(
//         "http://localhost:5000/api/timetables/update",
//         { schedule: timeTable },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       alert("Time Table Updated Successfully");
//     } catch (error) {
//       console.error(error);
//       alert("Error updating time table");
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="container mx-auto py-8">
//       <h2 className="text-2xl font-semibold mb-6">Time Table Management</h2>
//       <button
//         className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
//         onClick={() => navigate("/timetable/create")}
//       >
//         Create Time Table
//       </button>
//       <form onSubmit={handleSubmit}>
//         <table className="table-auto w-full mb-4 border-collapse border border-gray-300">
//           <thead>
//             <tr>
//               <th className="border border-gray-300 p-2">Day</th>
//               <th className="border border-gray-300 p-2">Time</th>
//               <th className="border border-gray-300 p-2">Course</th>
//             </tr>
//           </thead>
//           <tbody>
//             {Object.keys(timeTable).map((day) => (
//               <React.Fragment key={day}>
//                 <tr>
//                   <td
//                     rowSpan={Object.keys(timeTable[day]).length + 1}
//                     className="font-semibold border border-gray-300 p-2"
//                   >
//                     {day}
//                   </td>
//                   <td colSpan="2" className="border border-gray-300 p-2">
//                     <button
//                       type="button"
//                       onClick={() => handleAddTimeSlot(day)}
//                       className="bg-blue-500 text-white py-1 px-2 rounded"
//                     >
//                       Add Time Slot
//                     </button>
//                   </td>
//                 </tr>
//                 {Object.keys(timeTable[day]).map((time) => (
//                   <tr key={time}>
//                     <td className="border border-gray-300 p-2">{time}</td>
//                     <td className="border border-gray-300 p-2">
//                       <input
//                         type="text"
//                         className="border px-2 py-1 w-full"
//                         value={timeTable[day][time] || ""}
//                         onChange={(e) =>
//                           handleInputChange(day, time, e.target.value)
//                         }
//                       />
//                     </td>
//                   </tr>
//                 ))}
//               </React.Fragment>
//             ))}
//           </tbody>
//         </table>
//         <button
//           type="submit"
//           className="bg-blue-500 text-white py-2 px-4 rounded"
//         >
//           Update Time Table
//         </button>
//       </form>
//       <button
//         className="bg-green-500 text-white px-12 py-2 rounded mb-4 mt-4"
//         onClick={() => navigate("/faculty-dashboard")}
//       >
//         Go Back
//       </button>
//     </div>
//   );
// };

// export default TimeTablePage;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const TimeTablePage = () => {
//   const navigate = useNavigate();
//   const [timeTable, setTimeTable] = useState({
//     Monday: {},
//     Tuesday: {},
//     Wednesday: {},
//     Thursday: {},
//     Friday: {},
//     Saturday: {},
//   });
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchTimeTable = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const { data } = await axios.get(
//           "http://localhost:5000/api/timetables",
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         setTimeTable(data.schedule);
//         setLoading(false);
//       } catch (error) {
//         console.error(error);
//         setLoading(false);
//       }
//     };

//     fetchTimeTable();
//   }, []);

//   const handleInputChange = (day, time, value) => {
//     setTimeTable((prevTimeTable) => ({
//       ...prevTimeTable,
//       [day]: {
//         ...prevTimeTable[day],
//         [time]: value,
//       },
//     }));
//   };

//   const handleAddTimeSlot = (day) => {
//     const newTimeSlot = prompt("Enter the new time slot (e.g., 10:00 AM):");
//     if (newTimeSlot) {
//       setTimeTable((prevTimeTable) => ({
//         ...prevTimeTable,
//         [day]: {
//           ...prevTimeTable[day],
//           [newTimeSlot]: "",
//         },
//       }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const token = localStorage.getItem("token");
//       await axios.put(
//         "http://localhost:5000/api/timetables/update",
//         { schedule: timeTable },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       alert("Time Table Updated Successfully");
//     } catch (error) {
//       console.error(error);
//       alert("Error updating time table");
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="container mx-auto py-8">
//       <h2 className="text-2xl font-semibold mb-6">Time Table Management</h2>
//       <button
//         className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
//         onClick={() => navigate("/timetable/create")}
//       >
//         Create Time Table
//       </button>
//       <form onSubmit={handleSubmit}>
//         <table className="table-auto w-full mb-4">
//           <thead>
//             <tr>
//               <th>Day</th>
//               <th>Time</th>
//               <th>Course</th>
//             </tr>
//           </thead>
//           <tbody>
//             {Object.keys(timeTable).map((day) => (
//               <React.Fragment key={day}>
//                 <tr>
//                   <td
//                     rowSpan={Object.keys(timeTable[day]).length + 1}
//                     className="font-semibold"
//                   >
//                     {day}
//                   </td>
//                   <td colSpan="2">
//                     <button
//                       type="button"
//                       onClick={() => handleAddTimeSlot(day)}
//                       className="bg-blue-500 text-white py-1 px-2 rounded"
//                     >
//                       Add Time Slot
//                     </button>
//                   </td>
//                 </tr>
//                 {Object.keys(timeTable[day]).map((time) => (
//                   <tr key={time}>
//                     <td>{time}</td>
//                     <td>
//                       <input
//                         type="text"
//                         className="border px-2 py-1 w-full"
//                         value={timeTable[day][time] || ""}
//                         onChange={(e) =>
//                           handleInputChange(day, time, e.target.value)
//                         }
//                       />
//                     </td>
//                   </tr>
//                 ))}
//               </React.Fragment>
//             ))}
//           </tbody>
//         </table>
//         <button
//           type="submit"
//           className="bg-blue-500 text-white py-2 px-4 rounded"
//         >
//           Update Time Table
//         </button>
//       </form>
//       <button
//         className="bg-green-500 text-white px-12 py-2 rounded mb-4 mt-4"
//         onClick={() => navigate("/faculty-dashboard")}
//       >
//         Go Back
//       </button>
//     </div>
//   );
// };

// export default TimeTablePage;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const TimeTablePage = () => {
//   const navigate = useNavigate();
//   const [timeTable, setTimeTable] = useState({
//     Monday: {},
//     Tuesday: {},
//     Wednesday: {},
//     Thursday: {},
//     Friday: {},
//     Saturday: {},
//   });
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchTimeTable = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const { data } = await axios.get(
//           "http://localhost:5000/api/timetables",
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         setTimeTable(data.schedule);
//         setLoading(false);
//       } catch (error) {
//         console.error(error);
//         setLoading(false);
//       }
//     };

//     fetchTimeTable();
//   }, []);

//   const handleInputChange = (day, time, value) => {
//     setTimeTable((prevTimeTable) => ({
//       ...prevTimeTable,
//       [day]: {
//         ...prevTimeTable[day],
//         [time]: value,
//       },
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const token = localStorage.getItem("token");
//       await axios.put(
//         "http://localhost:5000/api/timetables/update",
//         { schedule: timeTable },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       alert("Time Table Updated Successfully");
//     } catch (error) {
//       console.error(error);
//       alert("Error updating time table");
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   const times = [
//     "9:00 AM",
//     "10:00 AM",
//     "11:00 AM",
//     "12:00 PM",
//     "1:00 PM",
//     "2:00 PM",
//     "3:00 PM",
//     "4:00 PM",
//     "5:00 PM",
//     "6:00 PM",
//   ];

//   return (
//     <div className="container mx-auto py-8">
//       <h2 className="text-2xl font-semibold mb-6">Time Table Management</h2>
//       <button
//         className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
//         onClick={() => navigate("/timetable/create")}
//       >
//         Create Time Table
//       </button>
//       <form onSubmit={handleSubmit}>
//         <table className="table-auto w-full mb-4">
//           <thead>
//             <tr>
//               <th>Day</th>
//               {times.map((time) => (
//                 <th key={time}>{time}</th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {Object.keys(timeTable).map((day) => (
//               <tr key={day}>
//                 <td className="font-semibold">{day}</td>
//                 {times.map((time) => (
//                   <td key={time}>
//                     <input
//                       type="text"
//                       className="border px-2 py-1 w-full"
//                       value={timeTable[day][time] || ""}
//                       onChange={(e) =>
//                         handleInputChange(day, time, e.target.value)
//                       }
//                     />
//                   </td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         <button
//           type="submit"
//           className="bg-blue-500 text-white py-2 px-4 rounded"
//         >
//           Update Time Table
//         </button>
//       </form>
//       <button
//         className="bg-green-500 text-white px-12 py-2 rounded mb-4 mt-4"
//         onClick={() => navigate("/faculty-dashboard")}
//       >
//         Go Back
//       </button>
//     </div>
//   );
// };

// export default TimeTablePage;

// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const TimeTablePage = () => {
//   const [timeTable, setTimeTable] = useState({
//     Monday: {},
//     Tuesday: {},
//     Wednesday: {},
//     Thursday: {},
//     Friday: {},
//     // Saturday: {},
//   });
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchTimeTable = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const { data } = await axios.get(
//           "http://localhost:5000/api/timetables",
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         setTimeTable(data.schedule);
//         setLoading(false);
//       } catch (error) {
//         console.error(error);
//         setLoading(false);
//       }
//     };

//     fetchTimeTable();
//   }, []);

//   const handleInputChange = (day, time, value) => {
//     setTimeTable((prevTimeTable) => ({
//       ...prevTimeTable,
//       [day]: {
//         ...prevTimeTable[day],
//         [time]: value,
//       },
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const token = localStorage.getItem("token");
//       await axios.put(
//         "http://localhost:5000/api/timetables/update",
//         { schedule: timeTable },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       alert("Time Table Updated Successfully");
//     } catch (error) {
//       console.error(error);
//       alert("Error updating time table");
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="container mx-auto py-8">
//       <h2 className="text-2xl font-semibold mb-6">Time Table Management</h2>
//       <form onSubmit={handleSubmit}>
//         {Object.keys(timeTable).map((day) => (
//           <div key={day} className="mb-4">
//             <h3 className="text-xl font-semibold mb-2">{day}</h3>
//             {Object.keys(timeTable[day]).map((time) => (
//               <div key={time} className="mb-2">
//                 <label className="block text-sm font-medium mb-1">{time}</label>
//                 <input
//                   type="text"
//                   className="w-full border border-gray-300 rounded p-2"
//                   value={timeTable[day][time]}
//                   onChange={(e) => handleInputChange(day, time, e.target.value)}
//                 />
//               </div>
//             ))}
//           </div>
//         ))}
//         <button
//           type="submit"
//           className="bg-blue-500 text-white py-2 px-4 rounded"
//         >
//           Update Time Table
//         </button>
//       </form>
//     </div>
//   );
// };

// export default TimeTablePage;
