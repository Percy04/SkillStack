import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import styles from "../styles/pages/coursepage.module.css";

function CoursePage() {
  const courseId = window.location.pathname.split("/").pop();
  const [course, setCourse] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const urls = [
      `http://localhost:5000/instructor/course/${courseId}/manage/goals`,
      `http://localhost:5000/instructor/course/${courseId}/manage/basics`,
      `http://localhost:5000/instructor/course/${courseId}/manage/curriculum`,
    ];

    axios
      .all(urls.map((link) => axios.get(link)))
      .then(
        axios.spread((...responses) => {
          const mergedData = responses.reduce(
            (acc, res) => ({ ...acc, ...res.data }),
            {}
          );
          setCourse(mergedData);
          setIsLoading(false);
        })
      )
      .catch(console.log);
  }, []);
  
  useEffect(() => {
    console.log(course);
  }, [course])

  if (isLoading) {
    return <h1>LOADING</h1>;
  }

  return (
    <>
    <Header />
      <div className={styles.backgroundbanner}></div>
      <div className={styles.container}>
        <div className={styles.leftcontainer}>
          {/* Left Section */}
          <div className={styles.left}>
            <h2>{course.title || "Course Title"}</h2>
            <p>{course.description || "Course description here..."}</p>
            <p id={styles.id} className={styles.createdBy}>Created by <a href="" className={styles.bold}>{course.instructor_name || "Instructor Name"}</a></p>
            <p id={styles.updated}>Last updated: {course.lastUpdated || "02/2025"}</p>
          </div>

          {/* Learning Section */}
          <div className={styles.learnBox}>
            <h3>What you'll learn</h3>
            <div className={styles.learnGrid}>
              {course.learningObjectives?.map((point, i) => (
                <div key={i} className={styles.learnItem}>
                  {point}
                </div>
              )) || <div className={styles.learnItem}>Placeholder learning point</div>}
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className={styles.right}>
          <img
            src={course.course_image_url || "https://via.placeholder.com/300"}
            alt="Preview"
            className={styles.preview}
          />
          <p className={styles.price}>₹{course.price || "3,999"}</p>
          <div className={styles.buttons}>
            <button className={styles.cart}>Add to cart</button>
            <button className={styles.heart}>♥</button>
          </div>
          <button className={styles.buy}>Buy now</button>
          <input type="text" placeholder="Enter Coupon" className={styles.coupon} />
          <button className={styles.apply}>Apply</button>
        </div>
      </div>
    </>
  );
}

export default CoursePage;

