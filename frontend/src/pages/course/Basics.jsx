import React from "react";
import styles from "../../styles/pages/basics.module.css";

function Basics() {
  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Course landing page</h1>
      <p className={styles.description}>
        Your course landing page is crucial to your success on Udemy. If it’s done right, it can also help you gain visibility in search engines like Google. As you complete this section, think about creating a compelling Course Landing Page that demonstrates why someone would want to enroll in your course.
      </p>

      {/* Course Title */}
      <div className={styles.inputGroup}>
        <label htmlFor="courseTitle">Course title</label>
        <input type="text" id="courseTitle" placeholder="Insert your course title" maxLength="60" />
        <small className={styles.helperText}>
          Your title should be a mix of attention-grabbing, informative, and optimized for search.
        </small>
      </div>

      {/* Course Subtitle */}
      <div className={styles.inputGroup}>
        <label htmlFor="courseSubtitle">Course subtitle</label>
        <input type="text" id="courseSubtitle" placeholder="Insert your course subtitle" maxLength="120" />
        <small className={styles.helperText}>
          Use 1 or 2 related keywords, and mention 3-4 of the most important areas that you've covered during your course.
        </small>
      </div>

      {/* Course Description */}
      <div className={styles.inputGroup}>
        <label htmlFor="courseDescription">Course description</label>
        <textarea
          id="courseDescription"
          rows="5"
          placeholder="Insert your course description"
        ></textarea>
        <small className={styles.helperText}>
          Description should have a minimum of 200 words.
        </small>
      </div>

      {/* Basic Info */}
      <div className={styles.selectGroup}>
        <label htmlFor="language">Basic Info</label>
        <div className={styles.selectInputs}>
          <select id="language">
            <option value="en">English (US)</option>
            <option value="es">Español</option>
          </select>
          <select id="level">
            <option value="all">All Levels</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
          <select id="category">
            <option value="teaching">Teaching & Academics</option>
            <option value="development">Development</option>
          </select>
        </div>
      </div>

      {/* Course Image */}
      <div className={styles.fileUpload}>
        <label>Course Image</label>
        <button>Upload File</button>
      </div>

      {/* Promotional Video */}
      <div className={styles.fileUpload}>
        <label>Promotional Video</label>
        <button>Upload File</button>
      </div>

      {/* Instructor Profile */}
      <div className={styles.instructorWarning}>
        <p>
          <strong>All visible instructors of this course must complete their profile before the course can be published.</strong>
        </p>
        <p>
          This includes name, image, and a short summary of your background (50 words minimum).
        </p>
        <button>Update Profile</button>
      </div>
    </div>
  );
};

export default Basics;
