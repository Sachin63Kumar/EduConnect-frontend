import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const role = new URLSearchParams(location.search).get("role") || "faculty";

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/auth/register`,
        {
          name,
          email,
          password,
          role,
        }
      );
      console.log("Signup successful:", data);
      navigate(`/login?role=${role}`);
    } catch (error) {
      setError("Signup failed");
      console.error("Signup error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">
          Sign Up as {role.charAt(0).toUpperCase() + role.slice(1)}
        </h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700"
          >
            Sign Up
          </button>
        </form>
        <div className="mt-4">
          <p>
            Already have an account?{" "}
            <a href={`/login?role=${role}`} className="text-blue-500 underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;

// import React, { useState } from "react";
// import axios from "axios";
// import { useLocation, useNavigate } from "react-router-dom";

// const SignupPage = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const location = useLocation();
//   const navigate = useNavigate();
//   const role = new URLSearchParams(location.search).get("role");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const { data } = await axios.post(
//         "http://localhost:5000/api/auth/register",
//         {
//           name,
//           email,
//           password,
//           role,
//         }
//       );
//       console.log("Signup successful:", data);
//       navigate("/login?role=" + role);
//     } catch (error) {
//       setError("Signup failed");
//       console.error("Signup error:", error);
//     }
//   };

//   return (
//     <div>
//       <h2>Sign Up as {role}</h2>
//       {error && <p>{error}</p>}
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Name</label>
//           <input
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Email</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             autoComplete="username"
//             required
//           />
//         </div>
//         <div>
//           <label>Password</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             autoComplete="new-password"
//             required
//           />
//         </div>
//         <button type="submit">Sign Up</button>
//       </form>
//       <p>
//         Already have an account? <a href={`/login?role=${role}`}>Login</a>
//       </p>
//     </div>
//   );
// };

// export default SignupPage;

// import React, { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";

// function SignupPage() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [mobile, setMobile] = useState("");
//   const location = useLocation();
//   const navigate = useNavigate();
//   const role = new URLSearchParams(location.search).get("role");

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("/api/auth/register", {
//         name,
//         email,
//         password,
//         role,
//         mobile,
//       });
//       navigate(`/login?role=${role}`);
//     } catch (error) {
//       console.error("Signup failed", error);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//       <h1 className="text-2xl font-bold mb-6">
//         Signup as {role.charAt(0).toUpperCase() + role.slice(1)}
//       </h1>
//       <form onSubmit={handleSignup} className="w-full max-w-sm space-y-4">
//         <input
//           type="text"
//           placeholder="Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           className="w-full px-3 py-2 border rounded"
//         />
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full px-3 py-2 border rounded"
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full px-3 py-2 border rounded"
//         />
//         {role === "student" && (
//           <input
//             type="text"
//             placeholder="Mobile Number"
//             value={mobile}
//             onChange={(e) => setMobile(e.target.value)}
//             className="w-full px-3 py-2 border rounded"
//           />
//         )}
//         <button
//           type="submit"
//           className="w-full px-4 py-2 bg-green-500 text-white rounded"
//         >
//           Signup
//         </button>
//       </form>
//     </div>
//   );
// }

// export default SignupPage;
