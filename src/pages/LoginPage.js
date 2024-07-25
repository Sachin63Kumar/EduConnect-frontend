import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const role = new URLSearchParams(location.search).get("role") || "faculty";

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/auth/login`,
        {
          email,
          password,
          role,
        }
      );
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", role); // Store role in localStorage
      navigate(role === "faculty" ? "/faculty-dashboard" : "/student");
    } catch (error) {
      // alert(`There is no ${role} account with these credentials`);
      // navigate(`/signup/${role}`);
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">
          Login as {role.charAt(0).toUpperCase() + role.slice(1)}
        </h1>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="w-full p-2 mb-4 border rounded"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full p-2 mb-4 border rounded"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700"
          >
            Login
          </button>
        </form>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        <div className="mt-4">
          <p>
            Don't have an account?{" "}
            <a
              href={`/signup?role=${role}`}
              className="text-blue-500 underline"
            >
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const LoginPage = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/auth/login",
//         {
//           email,
//           password,
//         }
//       );
//       localStorage.setItem("token", response.data.token);
//       navigate("/faculty-dashboard");
//     } catch (error) {
//       setError("Invalid email or password");
//     }
//   };

//   return (
//     <div>
//       <h1>Login</h1>
//       <form onSubmit={handleLogin}>
//         <input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="Email"
//           required
//         />
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="Password"
//           required
//         />
//         <button type="submit">Login</button>
//       </form>
//       {error && <p>{error}</p>}
//     </div>
//   );
// };

// export default LoginPage;

// import React, { useState } from "react";
// import axios from "axios";
// import { useLocation, useNavigate } from "react-router-dom";

// const LoginPage = () => {
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
//         "http://localhost:5000/api/auth/login",
//         { email, password }
//       );
//       console.log("Login successful:", data);
//       if (role === "faculty") {
//         navigate("/faculty-dashboard");
//       } else {
//         navigate("/student-dashboard");
//       }
//     } catch (error) {
//       setError("Login failed");
//       console.error("Login error:", error);
//     }
//   };

//   return (
//     <div>
//       <h2>Login as {role}</h2>
//       {error && <p>{error}</p>}
//       <form onSubmit={handleSubmit}>
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
//             autoComplete="current-password"
//             required
//           />
//         </div>
//         <button type="submit">Login</button>
//       </form>
//       <p>
//         Don't have an account? <a href={`/signup?role=${role}`}>Sign up</a>
//       </p>
//     </div>
//   );
// };

// export default LoginPage;

// import React, { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";

// function LoginPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const location = useLocation();
//   const navigate = useNavigate();
//   const role = new URLSearchParams(location.search).get("role");

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("/api/auth/login", { email, password });
//       localStorage.setItem("token", response.data.token);
//       navigate(`/${role}-dashboard`);
//     } catch (error) {
//       console.error("Login failed", error);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//       <h1 className="text-2xl font-bold mb-6">
//         Login as {role.charAt(0).toUpperCase() + role.slice(1)}
//       </h1>
//       <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4">
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
//         <button
//           type="submit"
//           className="w-full px-4 py-2 bg-blue-500 text-white rounded"
//         >
//           Login
//         </button>
//       </form>
//     </div>
//   );
// }

// export default LoginPage;
