import React from "react";
import styles from "../styles/pages/courses.module.css";
import InstructorHeader from "../components/Instructorheader";
import { useState, useEffect } from "react";
import getUser from "../utils/getUser";
import axios from "axios";
import {useNavigate} from "react-router-dom";
// import PublishCourse from "../../../backend/models/PublishCourse.js";

function Courses() {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Tracks loading state
  const [allCourses, setAllCourses] = useState([]);

  const navigate = useNavigate(); // Initialize navigate function

  const handleCourseClick = (courseId) => {
    // Navigate to the course details page with the courseId
    navigate(`/instructor/course/${courseId}/manage/basics`); // Adjust the URL based on your route configuration

  };

  const getCourses = async () => {
    axios
      .get("http://localhost:5000/instructor/courses")
      .then(function (res) {
        console.log(res.data);
        setAllCourses(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getCourses();
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


  const handleNewCourseClick = async () => {
    //First create new course
    try {
      axios.post("http://localhost:5000/instructor/course")
      .then(function (res) {
        // console.log(res.data);
        // console.log("Dawg");
        const id = res.data.courseId;
        navigate(`/instructor/course/${id}/manage/basics`);
      })
    } catch (error) {
      console.log(error);
    }
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
            <button className={styles.newCourseButton} onClick={() => handleNewCourseClick()}>New course</button>
          </div>
        </header>

        <div className={styles.coursesList} >
          {allCourses.map((course) => (
            <div key={course._id} className={styles.courseCard} onClick={() => handleCourseClick(course._id)}>
              <div className={styles.courseInfo}>
                <div className={styles.courseIcon}>📘📄🎥</div>
                <div className={styles.courseDetails}>
                  <h3 className={styles.courseTitle} onClick={() => handleCourseClick(course._id)}>
                    {course.title}
                  </h3>
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
