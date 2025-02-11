import React from "react";
import styles from "../styles/pages/courses.module.css";
import InstructorHeader from "../components/Instructorheader";
import { useState, useEffect } from "react";
import getUser from "../utils/getUser";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import PublishCourse from "../../../backend/models/PublishCourse.js";
// import {randomBytes} from "crypto";
import crypto from "crypto";

function Courses() {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Tracks loading state
  const [allCourses, setAllCourses] = useState([]);

  const navigate = useNavigate(); // Initialize navigate function

  const handleCourseClick = (courseId) => {
    // Navigate to the course details page with the courseId
    navigate(`/instructor/course/${courseId}/manage/basics`); // Adjust the URL based on your route configuration
  };

  const getCourses = async (data) => {
    // console.log(data);
    axios
      .get("http://localhost:5000/instructor/courses", {
        params: {
          userId: data.userId,
        },
      })
      .then(function (res) {
        console.log(res.data);
        setAllCourses(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    let data;
    const fetchUser = async () => {
      data = await getUser();
      setUserData(data);
      setIsLoading(false); // Stop loading once data is fetched
    };

    fetchUser();
    // getCourses(data);
  }, []);

  useEffect(() => {
    if (userData) getCourses(userData);
  }, [userData]);

  if (isLoading || !userData) {
    // Render loading or fallback state
    return <div></div>;
  }

  let urls = [
    "http://localhost:5000/instructor/publishcourse",
    "http://localhost:5000/instructor/plancourse",
    "http://localhost:5000/instructor/createcourse",
  ];

  const handleNewCourseClick = async () => {
    // console.log(userData);
    //   try {
    //     axios.post("http://localhost:5000/instructor/course", {
    //       userData
    //     })
    //     .then(function (res) {
    //       const id = res.data.courseId;
    //       navigate(`/instructor/course/${id}/manage/basics`);
    //     })
    //   } catch (error) {
    //     console.log(error);
    //   }

    if (!userData) return;

    //Create a hash to use as index for finding all the different collections belonging to one course
    async function generateShortHash() {
      const timestamp = new TextEncoder().encode(Date.now().toString());
      const hashBuffer = await window.crypto.subtle.digest(
        "SHA-256",
        timestamp
      );
      const hashArray = Array.from(new Uint8Array(hashBuffer));

      return hashArray
        .slice(0, 8) // Take the first 8 bytes (16 hex chars)
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
    }

    var index = await generateShortHash();
    console.log(index);

    const createCourseData = {
      ...userData,
      index
    }

    console.log(createCourseData);

  const requests = urls.map((url) => 
    axios.get(url, { params: createCourseData })
  );

    axios.all(requests)
    .then((responses) => {
      console.log(responses);
      // responses.forEach((res) => {
      //   const id = res.data.courseId;
      //   console.log("Data: " , res.data);
      // })
      navigate(`/instructor/course/${index}/manage/basics`);
    })
    .catch((err) => {
      console.log("Error in creating all courses, " , err);
    })
  };

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
            <button
              className={styles.newCourseButton}
              onClick={() => handleNewCourseClick()}
            >
              New course
            </button>
          </div>
        </header>

        <div className={styles.coursesList}>
          {allCourses.map((course) => (
            <div
              key={course._id}
              className={styles.courseCard}
              onClick={() => handleCourseClick(course.index)}
            >
              <div className={styles.courseInfo}>
                <div className={styles.courseIcon}>📘📄🎥</div>
                <div className={styles.courseDetails}>
                  <h3
                    className={styles.courseTitle}
                    onClick={() => handleCourseClick(course.index)}
                  >
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
