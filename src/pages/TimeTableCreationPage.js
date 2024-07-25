import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TimeTableCreationPage = () => {
  const navigate = useNavigate();
  const [timeTable, setTimeTable] = useState({
    Monday: {},
    Tuesday: {},
    Wednesday: {},
    Thursday: {},
    Friday: {},
    // Saturday: {},
  });

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
      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/timetables/create`,
        { schedule: timeTable },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Time Table Created Successfully");
      navigate("/timetable");
    } catch (error) {
      console.error(error);
      alert("Error creating time table");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create Time Table</h1>
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
          Create Time Table
        </button>
      </form>
    </div>
  );
};

export default TimeTableCreationPage;

// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const TimeTableCreationPage = () => {
//   const navigate = useNavigate();
//   const [timeTable, setTimeTable] = useState({
//     Monday: {},
//     Tuesday: {},
//     Wednesday: {},
//     Thursday: {},
//     Friday: {},
//     Saturday: {},
//   });

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
//       await axios.post(
//         "http://localhost:5000/api/timetables/create",
//         { schedule: timeTable },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       alert("Time Table Created Successfully");
//       navigate("/timetable");
//     } catch (error) {
//       console.error(error);
//       alert("Error creating time table");
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Create Time Table</h1>
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
//           Create Time Table
//         </button>
//       </form>
//     </div>
//   );
// };

// export default TimeTableCreationPage;

// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const TimeTableCreationPage = () => {
//   const navigate = useNavigate();
//   const [timeTable, setTimeTable] = useState({
//     Monday: {},
//     Tuesday: {},
//     Wednesday: {},
//     Thursday: {},
//     Friday: {},
//     Saturday: {},
//   });

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
//       await axios.post(
//         "http://localhost:5000/api/timetables/create",
//         { schedule: timeTable },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       alert("Time Table Created Successfully");
//       navigate("/timetable");
//     } catch (error) {
//       console.error(error);
//       alert("Error creating time table");
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Create Time Table</h1>
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
//           Create Time Table
//         </button>
//       </form>
//     </div>
//   );
// };

// export default TimeTableCreationPage;

// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const TimeTableCreationPage = () => {
//   const navigate = useNavigate();
//   const [timeTable, setTimeTable] = useState({
//     Monday: {},
//     Tuesday: {},
//     Wednesday: {},
//     Thursday: {},
//     Friday: {},
//     Saturday: {},
//   });

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
//       await axios.post(
//         "http://localhost:5000/api/timetables/create",
//         { schedule: timeTable },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       alert("Time Table Created Successfully");
//       navigate("/timetable");
//     } catch (error) {
//       console.error(error);
//       alert("Error creating time table");
//     }
//   };

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
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Create Time Table</h1>
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
//             {[
//               "Monday",
//               "Tuesday",
//               "Wednesday",
//               "Thursday",
//               "Friday",
//               "Saturday",
//             ].map((day) => (
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
//           Create Time Table
//         </button>
//       </form>
//     </div>
//   );
// };

// export default TimeTableCreationPage;

// // pages/TimeTableCreationPage.js

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const initialSchedule = {
//   Monday: [],
//   Tuesday: [],
//   Wednesday: [],
//   Thursday: [],
//   Friday: [],
//   Saturday: [],
// };

// const TimeTableCreationPage = () => {
//   const navigate = useNavigate();
//   const [schedule, setSchedule] = useState(initialSchedule);

//   const handleSubmit = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         throw new Error("No token found");
//       }
//       const userId = JSON.parse(atob(token.split(".")[1])).id;

//       const response = await axios.post(
//         "http://localhost:5000/api/timetables",
//         {
//           facultyId: userId,
//           schedule,
//         },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       if (response.status === 201) {
//         alert("Time Table created successfully!");
//         navigate("/time-table-management");
//       } else {
//         throw new Error("Failed to create Time Table");
//       }
//     } catch (error) {
//       console.error("Error creating Time Table:", error);
//     }
//   };

//   const handleInputChange = (day, timeSlotIndex, courseName) => {
//     const updatedSchedule = { ...schedule };
//     updatedSchedule[day][timeSlotIndex] = {
//       time: `${timeSlotIndex + 9}:00 AM`,
//       courseName,
//     };
//     setSchedule(updatedSchedule);
//   };

//   const handleCancel = () => {
//     navigate("/time-table-management");
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Create Time Table</h1>
//       <div className="grid grid-cols-2 gap-4">
//         {Object.keys(schedule).map((day) => (
//           <div key={day}>
//             <h2 className="text-lg font-semibold mb-2">{day}</h2>
//             <table className="table-auto w-full mb-4">
//               <thead>
//                 <tr>
//                   <th>Time</th>
//                   <th>Course Name</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {[...Array(8)].map((_, index) => (
//                   <tr key={index}>
//                     <td>{`${index + 9}:00 AM`}</td>
//                     <td>
//                       <input
//                         type="text"
//                         value={schedule[day][index]?.courseName || ""}
//                         onChange={(e) =>
//                           handleInputChange(day, index, e.target.value)
//                         }
//                         className="border p-1 w-full"
//                       />
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         ))}
//       </div>
//       <div className="flex justify-between">
//         <button
//           className="bg-blue-500 text-white px-4 py-2 rounded"
//           onClick={handleSubmit}
//         >
//           Submit
//         </button>
//         <button
//           className="bg-gray-500 text-white px-4 py-2 rounded"
//           onClick={handleCancel}
//         >
//           Cancel
//         </button>
//       </div>
//     </div>
//   );
// };

// export default TimeTableCreationPage;

// // pages/TimeTableCreationPage.js

// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const TimeTableCreationPage = () => {
//   const navigate = useNavigate();
//   const initialTimeTable = Array(6)
//     .fill()
//     .map(() => Array(10).fill(""));

//   const [timeTable, setTimeTable] = useState(initialTimeTable);

//   const handleChange = (dayIndex, timeIndex, value) => {
//     const updatedTimeTable = [...timeTable];
//     updatedTimeTable[dayIndex][timeIndex] = value;
//     setTimeTable(updatedTimeTable);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem("token");
//     const userId = JSON.parse(atob(token.split(".")[1])).id;

//     const schedule = timeTable.map((day, dayIndex) => {
//       const timeSlots = day.map((courseName, timeIndex) => ({
//         time: [
//           "9:00 AM",
//           "10:00 AM",
//           "11:00 AM",
//           "12:00 PM",
//           "1:00 PM",
//           "2:00 PM",
//           "3:00 PM",
//           "4:00 PM",
//           "5:00 PM",
//           "6:00 PM",
//         ][timeIndex],
//         courseName: courseName || "",
//       }));
//       return {
//         day: [
//           "Monday",
//           "Tuesday",
//           "Wednesday",
//           "Thursday",
//           "Friday",
//           "Saturday",
//         ][dayIndex],
//         timeSlots,
//       };
//     });

//     try {
//       await axios.post(
//         "http://localhost:5000/api/timetables",
//         { facultyId: userId, schedule },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       alert("Time Table Created Successfully");
//       navigate("/time-table-management");
//     } catch (error) {
//       console.error("Error creating time table:", error);
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Create Time Table</h1>
//       <form onSubmit={handleSubmit}>
//         <table className="table-auto w-full mb-4">
//           <thead>
//             <tr>
//               <th>Day</th>
//               {[
//                 "9:00 AM",
//                 "10:00 AM",
//                 "11:00 AM",
//                 "12:00 PM",
//                 "1:00 PM",
//                 "2:00 PM",
//                 "3:00 PM",
//                 "4:00 PM",
//                 "5:00 PM",
//                 "6:00 PM",
//               ].map((time) => (
//                 <th key={time}>{time}</th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {[
//               "Monday",
//               "Tuesday",
//               "Wednesday",
//               "Thursday",
//               "Friday",
//               "Saturday",
//             ].map((day, dayIndex) => (
//               <tr key={day}>
//                 <td>{day}</td>
//                 {timeTable[dayIndex].map((courseName, timeIndex) => (
//                   <td key={timeIndex}>
//                     <input
//                       type="text"
//                       value={courseName}
//                       onChange={(e) =>
//                         handleChange(dayIndex, timeIndex, e.target.value)
//                       }
//                       className="border px-2 py-1"
//                     />
//                   </td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         <button
//           type="submit"
//           className="bg-blue-500 text-white px-4 py-2 rounded"
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default TimeTableCreationPage;

// // pages/TimeTableCreationPage.js

// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const TimeTableCreationPage = () => {
//   const navigate = useNavigate();
//   const initialTimeTable = Array(6)
//     .fill()
//     .map(() => Array(10).fill(""));

//   const [timeTable, setTimeTable] = useState(initialTimeTable);

//   const handleChange = (dayIndex, timeIndex, value) => {
//     const updatedTimeTable = [...timeTable];
//     updatedTimeTable[dayIndex][timeIndex] = value;
//     setTimeTable(updatedTimeTable);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem("token");
//     const userId = JSON.parse(atob(token.split(".")[1])).id;

//     const schedule = timeTable.map((day, dayIndex) => {
//       const timeSlots = day
//         .map((courseName, timeIndex) => ({
//           time: [
//             "9:00 AM",
//             "10:00 AM",
//             "11:00 AM",
//             "12:00 PM",
//             "1:00 PM",
//             "2:00 PM",
//             "3:00 PM",
//             "4:00 PM",
//             "5:00 PM",
//             "6:00 PM",
//           ][timeIndex],
//           courseName: courseName || "",
//         }))
//         .filter((slot) => slot.courseName); // Only include slots with a course name

//       return {
//         day: [
//           "Monday",
//           "Tuesday",
//           "Wednesday",
//           "Thursday",
//           "Friday",
//           "Saturday",
//         ][dayIndex],
//         timeSlots: timeSlots.length > 0 ? timeSlots : null, // Use null if there are no time slots for that day
//       };
//     });

//     try {
//       await axios.post(
//         "http://localhost:5000/api/timetables",
//         { facultyId: userId, schedule },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       alert("Time Table Created Successfully");
//       navigate("/time-table-management");
//     } catch (error) {
//       console.error("Error creating time table:", error);
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Create Time Table</h1>
//       <form onSubmit={handleSubmit}>
//         <table className="table-auto w-full mb-4">
//           <thead>
//             <tr>
//               <th>Day</th>
//               {[
//                 "9:00 AM",
//                 "10:00 AM",
//                 "11:00 AM",
//                 "12:00 PM",
//                 "1:00 PM",
//                 "2:00 PM",
//                 "3:00 PM",
//                 "4:00 PM",
//                 "5:00 PM",
//                 "6:00 PM",
//               ].map((time) => (
//                 <th key={time}>{time}</th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {[
//               "Monday",
//               "Tuesday",
//               "Wednesday",
//               "Thursday",
//               "Friday",
//               "Saturday",
//             ].map((day, dayIndex) => (
//               <tr key={day}>
//                 <td>{day}</td>
//                 {timeTable[dayIndex].map((courseName, timeIndex) => (
//                   <td key={timeIndex}>
//                     <input
//                       type="text"
//                       value={courseName}
//                       onChange={(e) =>
//                         handleChange(dayIndex, timeIndex, e.target.value)
//                       }
//                       className="border px-2 py-1"
//                     />
//                   </td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         <button
//           type="submit"
//           className="bg-blue-500 text-white px-4 py-2 rounded"
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default TimeTableCreationPage;

// // pages/TimeTableCreationPage.js

// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const TimeTableCreationPage = () => {
//   const navigate = useNavigate();
//   const initialTimeTable = Array(6)
//     .fill()
//     .map(() => Array(10).fill(""));

//   const [timeTable, setTimeTable] = useState(initialTimeTable);

//   const handleChange = (dayIndex, timeIndex, value) => {
//     const updatedTimeTable = [...timeTable];
//     updatedTimeTable[dayIndex][timeIndex] = value;
//     setTimeTable(updatedTimeTable);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem("token");
//     const userId = JSON.parse(atob(token.split(".")[1])).id;

//     const schedule = timeTable.map((day, dayIndex) => ({
//       day: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][
//         dayIndex
//       ],
//       timeSlots: day.map((courseName, timeIndex) => ({
//         time: [
//           "9:00 AM",
//           "10:00 AM",
//           "11:00 AM",
//           "12:00 PM",
//           "1:00 PM",
//           "2:00 PM",
//           "3:00 PM",
//           "4:00 PM",
//           "5:00 PM",
//           "6:00 PM",
//         ][timeIndex],
//         courseName: courseName || "", // Ensure courseName is a string
//       })),
//     }));

//     try {
//       await axios.post(
//         "http://localhost:5000/api/timetables",
//         { facultyId: userId, schedule },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       alert("Time Table Created Successfully");
//       navigate("/time-table-management");
//     } catch (error) {
//       console.error("Error creating time table:", error);
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Create Time Table</h1>
//       <form onSubmit={handleSubmit}>
//         <table className="table-auto w-full mb-4">
//           <thead>
//             <tr>
//               <th>Day</th>
//               {[
//                 "9:00 AM",
//                 "10:00 AM",
//                 "11:00 AM",
//                 "12:00 PM",
//                 "1:00 PM",
//                 "2:00 PM",
//                 "3:00 PM",
//                 "4:00 PM",
//                 "5:00 PM",
//                 "6:00 PM",
//               ].map((time) => (
//                 <th key={time}>{time}</th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {[
//               "Monday",
//               "Tuesday",
//               "Wednesday",
//               "Thursday",
//               "Friday",
//               "Saturday",
//             ].map((day, dayIndex) => (
//               <tr key={day}>
//                 <td>{day}</td>
//                 {timeTable[dayIndex].map((courseName, timeIndex) => (
//                   <td key={timeIndex}>
//                     <input
//                       type="text"
//                       value={courseName}
//                       onChange={(e) =>
//                         handleChange(dayIndex, timeIndex, e.target.value)
//                       }
//                       className="border px-2 py-1"
//                     />
//                   </td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         <button
//           type="submit"
//           className="bg-blue-500 text-white px-4 py-2 rounded"
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default TimeTableCreationPage;

// // pages/TimeTableCreationPage.js

// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const TimeTableCreationPage = () => {
//   const navigate = useNavigate();
//   const initialTimeTable = Array(6)
//     .fill()
//     .map(() => Array(10).fill(""));

//   const [timeTable, setTimeTable] = useState(initialTimeTable);

//   const handleChange = (dayIndex, timeIndex, value) => {
//     const updatedTimeTable = [...timeTable];
//     updatedTimeTable[dayIndex][timeIndex] = value;
//     setTimeTable(updatedTimeTable);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem("token");
//     if (!token) {
//       throw new Error("No token found");
//     }

//     // Extract facultyId from token
//     const decodedToken = JSON.parse(atob(token.split(".")[1]));
//     const facultyId = decodedToken.id;

//     const schedule = timeTable.map((day, dayIndex) => ({
//       day: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][
//         dayIndex
//       ],
//       timeSlots: day.map((courseName, timeIndex) => ({
//         time: [
//           "9:00 AM",
//           "10:00 AM",
//           "11:00 AM",
//           "12:00 PM",
//           "1:00 PM",
//           "2:00 PM",
//           "3:00 PM",
//           "4:00 PM",
//           "5:00 PM",
//           "6:00 PM",
//         ][timeIndex],
//         courseName,
//       })),
//     }));

//     try {
//       await axios.post(
//         "http://localhost:5000/api/timetables",
//         { facultyId, schedule },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       alert("Time Table Created Successfully");
//       navigate("/time-table-management");
//     } catch (error) {
//       console.error("Error creating time table:", error);
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Create Time Table</h1>
//       <form onSubmit={handleSubmit}>
//         <table className="table-auto w-full mb-4">
//           <thead>
//             <tr>
//               <th>Day</th>
//               {[
//                 "9:00 AM",
//                 "10:00 AM",
//                 "11:00 AM",
//                 "12:00 PM",
//                 "1:00 PM",
//                 "2:00 PM",
//                 "3:00 PM",
//                 "4:00 PM",
//                 "5:00 PM",
//                 "6:00 PM",
//               ].map((time) => (
//                 <th key={time}>{time}</th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {[
//               "Monday",
//               "Tuesday",
//               "Wednesday",
//               "Thursday",
//               "Friday",
//               "Saturday",
//             ].map((day, dayIndex) => (
//               <tr key={day}>
//                 <td>{day}</td>
//                 {timeTable[dayIndex].map((courseName, timeIndex) => (
//                   <td key={timeIndex}>
//                     <input
//                       type="text"
//                       value={courseName}
//                       onChange={(e) =>
//                         handleChange(dayIndex, timeIndex, e.target.value)
//                       }
//                       className="border px-2 py-1"
//                     />
//                   </td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         <button
//           type="submit"
//           className="bg-blue-500 text-white px-4 py-2 rounded"
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default TimeTableCreationPage;
