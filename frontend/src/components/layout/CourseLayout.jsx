import React from "react";
import CourseHeader from "../CourseHeader.jsx";
import CourseSidebar from "../CourseSidebar.jsx";
import { Outlet } from "react-router-dom";
import "./courselayout.css";

function CourseLayout() {
  return (
    <>
      <CourseHeader />
      <div className="courseRow">
        <CourseSidebar />
        <Outlet />
      </div>
    </>
  );
}

export default CourseLayout;
