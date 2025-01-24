import React from "react";
import styles from "../styles/components/courseheader.module.css";

const CourseHeader = () => {
  return (
    <header className={styles.header}>
      <div className={styles.backToCourses}>
        <a href="http://localhost:5173/instructor/courses" className={styles.backLink}> &lt; Back to courses</a>
      </div>
      <div className={styles.courseTitle}>
        <span className={styles.title}>sdf</span>
        <span className={styles.status}>DRAFT</span>
      </div>
      <div className={styles.uploadInfo}>
        {/* <span>0min of video content uploaded</span> */}
        <button className={styles.settingsButton}>
          <span className={styles.settingsIcon}>&#9881;</span>
        </button>
      </div>
    </header>
  );
};

export default CourseHeader;
