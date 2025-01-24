import React from "react";
import styles from "../styles/pages/courses.module.css";
import InstructorHeader from "../components/Instructorheader";
import { useState, useEffect } from "react";
import getUser from "../utils/getUser";

const courses = [
  {
    id: 1,
    title: "sdf",
    status: "DRAFT",
    visibility: "Public",
    progress: 10,
  },
  {
    id: 2,
    title: "Apple development",
    status: "DRAFT",
    visibility: "Public",
    progress: 30,
  },
  {
    id: 3,
    title: "Learn to cook apple",
    status: "DRAFT",
    visibility: "Public",
    progress: 5,
  },
  {
    id: 4,
    title: "Learn how to solve a Rubik's Cube",
    status: "DRAFT",
    visibility: "Public",
    progress: 0,
  },
];


function Courses() {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Tracks loading state

  useEffect(() => {
    const fetchUser = async () => {
      const data = await getUser();
      setUserData(data);
      setIsLoading(false); // Stop loading once data is fetched
    };

    fetchUser();
  }, []);

  if (isLoading || !userData) {
    // Render loading or fallback state
    return <div></div>;
  }

  return (
    <>
      <InstructorHeader name={userData.name}></InstructorHeader>
      <div className={styles.coursesContainer}>
        <header className={styles.coursesHeader}>
          <h1>Courses</h1>
          <div className={styles.coursesControls}>
            <input
              type="text"
              placeholder="Search your courses"
              className={styles.searchInput}
            />
            <button className={styles.searchButton}>
              <span role="img" aria-label="search">
                🔍
              </span>
            </button>
            <select className={styles.sortDropdown}>
              <option>Newest</option>
              <option>Oldest</option>
            </select>
            <button className={styles.newCourseButton}>New course</button>
          </div>
        </header>

        <div className={styles.coursesList}>
          {courses.map((course) => (
            <div key={course.id} className={styles.courseCard}>
              <div className={styles.courseInfo}>
                <div className={styles.courseIcon}>📘📄🎥</div>
                <div className={styles.courseDetails}>
                  <h3 className={styles.courseTitle}>{course.title}</h3>
                  <p className={styles.courseMeta}>
                    {course.status} <span className={styles.divider}>|</span>{" "}
                    {course.visibility}
                  </p>
                </div>
              </div>
              <div className={styles.courseProgress}>
                <p>Finish your course</p>
                <div className={styles.progressBar}>
                  <div
                    className={styles.progressBarFill}
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Courses;
