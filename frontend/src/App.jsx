import Error from "./pages/Error.jsx";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import Signup from "./pages/Signup.jsx";
import {
  Routes,
  Route,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import Courses from "./pages/Courses.jsx";
// import CourseLandingPage from "./pages/course/CourseLandingPage.jsx";
import CourseLayout from "./components/layout/CourseLayout.jsx";
import Basics from "./pages/course/Basics.jsx";
import Pricing from "./pages/course/Pricing.jsx";
import Goals from "./pages/course/Goals.jsx";
import Messages from "./pages/course/Messages.jsx";
import Curriculum from "./pages/course/Curriculum.jsx";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/instructor/courses",
      element: <Courses />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
    {
      path: "/instructor/course/",
      element: <CourseLayout />,
      children: [
        {
          path: "/instructor/course/:courseId/manage/basics",
          element: <Basics />,
        },
        {
          path: "/instructor/course/:courseId/manage/pricing",
          element: <Pricing />,
        },
        {
          path: "/instructor/course/:courseId/manage/goals",
          element: <Goals />,
        },
        {
          path: "/instructor/course/:courseId/manage/pricing",
          element: <Pricing />,
        },
        {
          path: "/instructor/course/:courseId/manage/messages",
          element: <Messages />
        },
        {
          path: "/instructor/course/:courseId/manage/curriculum",
          element: <Curriculum />
        }
      ],
    },
  ]);

  // return (
  //   <div>
  //     <Routes>
  //       <Route path="/" element={<Home />}></Route>
  //       <Route path="/login" element={<Login />}></Route>
  //       <Route path="/dashboard" element={<Dashboard />}></Route>
  //       <Route path="/signup" element={<Signup></Signup>}></Route>
  //       <Route path="/instructor/courses" element={<Courses></Courses>}></Route>
  //       <Route path="/instructor/course/manage/basic" element={<CourseLandingPage/>}></Route>

  //       <Route path="*" element={<Error />}></Route>

  //     </Routes>
  //   </div>
  // );

  return <RouterProvider router={router} />;
}

export default App;
