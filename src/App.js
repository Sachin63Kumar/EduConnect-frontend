import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import FacultyDashboard from "./pages/FacultyDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import StudentCoursesPage from "./pages/StudentCoursesPage";
import FacultyCoursesPage from "./pages/FacultyCoursesPage";
import CourseDetailPage from "./pages/CourseDetailPage";
import AssignmentCreationPage from "./pages/AssignmentCreationPage";
import CreateCoursePage from "./pages/CreateCoursePage";
import EditCoursePage from "./pages/EditCoursePage";
import AssignmentListPage from "./pages/AssignmentListPage";
import RegisterStudentsPage from "./pages/RegisterStudentsPage";
import SubmissionsPage from "./pages/SubmissionsPage";
import FacultyQuizListPage from "./pages/FacultyQuizListPage";
import QuizCreationPage from "./pages/QuizCreationPage";
import QuizViewPage from "./pages/QuizViewPage";
import StudentQuizListPage from "./pages/StudentQuizListPage";
import QuizAttemptPage from "./pages/QuizAttemptPage";
import QuizScorePage from "./pages/QuizScorePage";
import ResourceSharingPage from "./pages/ResourceSharingPage";
import ResourceAccessPage from "./pages/ResourceAccessPage";
import StudentAssignmentListPage from "./pages/StudentAssignmentListPage";
import StudentAssignmentDetailPage from "./pages/StudentAssignmentDetailPage";
import FacultyAnnouncementListPage from "./pages/FacultyAnnouncementListPage";
import CreateAnnouncementPage from "./pages/CreateAnnouncementPage";
import StudentAnnouncementListPage from "./pages/StudentAnnouncementListPage";
import TimeTablePage from "./pages/TimeTablePage";
import TimeTableCreationPage from "./pages/TimeTableCreationPage";
import AddResourcePage from "./pages/AddResourcePage";
import NotificationPage from "./pages/NotificationPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/faculty-dashboard" element={<FacultyDashboard />} />
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/student/courses" element={<StudentCoursesPage />} />
        <Route path="/faculty-courses" element={<FacultyCoursesPage />} />
        <Route path="/courses/:courseId" element={<CourseDetailPage />} />
        <Route
          path="/courses/:courseId/register"
          element={<RegisterStudentsPage />}
        />
        <Route path="/create-course" element={<CreateCoursePage />} />
        <Route path="/edit-course/:courseId" element={<EditCoursePage />} />
        <Route
          path="/faculty/courses/:courseId/assignments"
          element={<AssignmentListPage />}
        />
        <Route
          path="/student/courses/:courseId/assignments"
          element={<StudentAssignmentListPage />}
        />
        <Route
          path="/faculty/courses/:courseId/create-assignment"
          element={<AssignmentCreationPage />}
        />
        <Route
          path="/student/courses/:courseId/assignments/:assignmentId/details"
          element={<StudentAssignmentDetailPage />}
        />
        <Route
          path="/faculty/courses/:courseId/assignments/:assignmentId/submissions"
          element={<SubmissionsPage />}
        />
        <Route
          path="/courses/:courseId/quizzes"
          element={<FacultyQuizListPage />}
        />
        <Route
          path="/courses/:courseId/quizzes/create"
          element={<QuizCreationPage />}
        />
        <Route path="/quizzes/:quizId" element={<QuizViewPage />} />
        <Route
          path="/student/courses/:courseId/quizzes"
          element={<StudentQuizListPage />}
        />
        <Route path="/quizzes/:quizId/attempt" element={<QuizAttemptPage />} />
        <Route path="/quizzes/:quizId/scores" element={<QuizScorePage />} />
        <Route
          path="/faculty/courses/:courseId/resources"
          element={<ResourceSharingPage />}
        />
        <Route
          path="/faculty/courses/:courseId/add-resource"
          element={<AddResourcePage />}
        />
        <Route
          path="/student/courses/:courseId/resources"
          element={<ResourceAccessPage />}
        />
        <Route
          path="/faculty/courses/:courseId/announcements"
          element={<FacultyAnnouncementListPage />}
        />
        <Route
          path="/faculty/courses/:courseId/announcements/create-announcement"
          element={<CreateAnnouncementPage />}
        />
        <Route
          path="/student/courses/:courseId/announcements"
          element={<StudentAnnouncementListPage />}
        />
        <Route path="/timetable" element={<TimeTablePage />} />
        <Route path="/timetable/create" element={<TimeTableCreationPage />} />
        <Route path="/notifications" element={<NotificationPage />} />
      </Routes>
    </Router>
  );
};

export default App;
