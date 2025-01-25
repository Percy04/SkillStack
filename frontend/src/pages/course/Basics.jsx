import React, { useState } from "react";
import styles from "../../styles/pages/basics.module.css";

function Basics() {
  const [formData, setFormData] = useState({
    courseTitle: "",
    courseSubtitle: "",
    courseDescription: "",
    language: "en",
    level: "all",
    category: "teaching",
    courseImageLink: "",
    promotionalVideoLink: "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add your submission logic here, e.g., API call
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Course Landing Page</h1>
      <form onSubmit={handleSubmit}>
        {/* Course Title */}
        <div className={styles.inputGroup}>
          <label htmlFor="courseTitle">Course title</label>
          <input
            type="text"
            id="courseTitle"
            placeholder="Insert your course title"
            maxLength="60"
            value={formData.courseTitle}
            onChange={handleInputChange}
          />
          <small className={styles.helperText}>
            Your title should be a mix of attention-grabbing, informative, and
            optimized for search.
          </small>
        </div>

        {/* Course Subtitle */}
        <div className={styles.inputGroup}>
          <label htmlFor="courseSubtitle">Course subtitle</label>
          <input
            type="text"
            id="courseSubtitle"
            placeholder="Insert your course subtitle"
            maxLength="120"
            value={formData.courseSubtitle}
            onChange={handleInputChange}
          />
          <small className={styles.helperText}>
            Use 1 or 2 related keywords, and mention 3-4 of the most important
            areas that you've covered during your course.
          </small>
        </div>

        {/* Course Description */}
        <div className={styles.inputGroup}>
          <label htmlFor="courseDescription">Course description</label>
          <textarea
            id="courseDescription"
            rows="5"
            placeholder="Insert your course description"
            value={formData.courseDescription}
            onChange={handleInputChange}
          ></textarea>
          <small className={styles.helperText}>
            Description should have a minimum of 200 words.
          </small>
        </div>

        {/* Basic Info */}
        <div className={styles.selectGroup}>
          <label htmlFor="language">Basic Info</label>
          <div className={styles.selectInputs}>
            <select
              id="language"
              value={formData.language}
              onChange={handleInputChange}
            >
              <option value="en">English (US)</option>
              <option value="es">Español</option>
            </select>
            <select
              id="level"
              value={formData.level}
              onChange={handleInputChange}
            >
              <option value="all">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
            <select
              id="category"
              value={formData.category}
              onChange={handleInputChange}
            >
              <option value="teaching">Teaching & Academics</option>
              <option value="development">Development</option>
            </select>
          </div>
        </div>

        {/* Course Image Link */}
        <div className={styles.inputGroup}>
          <label htmlFor="courseImageLink">Course Image Link</label>
          <input
            type="text"
            id="courseImageLink"
            placeholder="Insert the link for your course image"
            value={formData.courseImageLink}
            onChange={handleInputChange}
          />
        </div>

        {/* Promotional Video Link */}
        <div className={styles.inputGroup}>
          <label htmlFor="promotionalVideoLink">Promotional Video Link</label>
          <input
            type="text"
            id="promotionalVideoLink"
            placeholder="Insert the link for your promotional video"
            value={formData.promotionalVideoLink}
            onChange={handleInputChange}
          />
        </div>

        <button type="submit" className={styles.submitButton}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default Basics;

