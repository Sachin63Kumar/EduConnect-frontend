import React from "react";
import { useNavigate } from "react-router-dom";

const Button = ({ label, onClick, className }) => (
  <button
    className={`${className} px-2 py-1.5 rounded-xl`}
    onClick={onClick}
    style={{
      minWidth: "180px",
      alignItems: "center",
      paddingTop: "10px",
      paddingBottom: "10px",
    }}
  >
    {label}
  </button>
);

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col pb-20 w-full bg-slate-50 max-md:max-w-full">
      <header className="flex gap-5 px-12 py-5 text-xl font-bold leading-8 whitespace-nowrap shadow-sm bg-slate-50 text-zinc-900 max-md:flex-wrap max-md:px-5">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/e3d9d9082e84bb3d3434172e9b6580ce8017038ce19775c7240f8fad7b4be502?apiKey=aa5f6ae70acc4a3b920c47bc2c987234&"
          alt=""
          loading="lazy"
          className="shrink-0 self-start w-5 aspect-square"
        />
        <div className="flex-auto max-md:max-w-full">EduConnect</div>
      </header>
      <main className="flex overflow-hidden relative flex-col justify-center self-center p-4 mt-10 w-full rounded-xl max-w-[1020px] min-h-[480px] max-md:mt-10 max-md:max-w-full">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/c7439c9bad880fe2c51101e6a67f95c2e326d5a9cb5d8bbb11deb8198406e4d2?apiKey=aa5f6ae70acc4a3b920c47bc2c987234&"
          alt=""
          loading="lazy"
          className="object-cover absolute inset-0 w-full h-full m-4"
        />
        <section className="flex relative flex-col justify-center py-4 pl-4 max-md:max-w-full">
          <div className="flex flex-col px-9 mt-4 text-center text-white max-md:px-5 max-md:max-w-full">
            <h1 className="self-center text-5xl font-black tracking-tighter max-md:max-w-full max-md:text-4xl">
              Welcome to EduConnect
            </h1>
            <p className="mt-16 text-base leading-6 max-md:mt-10 max-md:max-w-full">
              EduConnect is your gateway to advanced learning, connecting
              students and faculty with innovative educational tools and
              resources for a transformative academic experience.
            </p>
          </div>
          <div className="flex justify-center items-center px-8 mt-8 mb-4 text-base font-bold tracking-wide leading-6 max-md:px-2 max-md:max-w-full">
            <div className="flex gap-3">
              <Button
                label="I am a student"
                className="flex flex-col flex-1 justify-center bg-blue-600 text-slate-50"
                onClick={() => navigate("/login?role=student")}
              />
              <Button
                label="I am a faculty"
                className="flex flex-col flex-1 justify-center bg-slate-200 text-neutral-900"
                onClick={() => navigate("/login?role=faculty")}
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;

// import React from "react";
// import { Link } from "react-router-dom";

// function LandingPage() {
//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//       <h1 className="text-4xl font-bold mb-6">Welcome to EduPlatform</h1>
//       <div className="space-x-4">
//         <Link
//           to="/login?role=student"
//           className="px-4 py-2 bg-blue-500 text-white rounded"
//         >
//           Login as Student
//         </Link>
//         <Link
//           to="/login?role=faculty"
//           className="px-4 py-2 bg-green-500 text-white rounded"
//         >
//           Login as Faculty
//         </Link>
//       </div>
//     </div>
//   );
// }

// export default LandingPage;
