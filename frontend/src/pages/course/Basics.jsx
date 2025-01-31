import React, { useState, useEffect, useRef } from "react";
import styles from "../../styles/pages/basics.module.css";
import axios from "axios";
import getUser from "../../utils/getUser.js";

function Basics() {
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
    language: "en",
    level: "all",
    category: "teaching",
    course_image_url: "",
    promo_video_url: "",
    createdBy: "",
  });

  const courseId = window.location.pathname.split("/")[3];
  const hasFetchedData = useRef(false);
  let data;
  let isData = false;

  useEffect(() => {
    const fetchUser = async () => {
      data = await getUser();
      isData = true;
      // setUserData(data);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/instructor/course/${courseId}/manage/basics`)
      .then(function (res) {
        console.log("Response: ", res.data);
        setFormData(res.data);
        console.log("userData", data);
        // setFormData((prevData) => ({...res.data, createdBy: userData.userId}));
      })
      .catch(function (err) {
        console.log("OHNO can't get publish course form data: " + err);
      });
  }, [data]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("Form submitted:", formData);

    await axios
      .post(
        `http://localhost:5000/instructor/course/${courseId}/manage/basics`,
        {
          formData,
        }
      )
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Course Landing Page</h1>
      <form onSubmit={handleSubmit}>
        {/* Course Title */}
        <div className={styles.inputGroup}>
          <label htmlFor="title">Course title</label>
          <input
            type="text"
            id="title"
            placeholder="Insert your course title"
            maxLength="60"
            value={formData.title}
            onChange={handleInputChange}
          />
          <small className={styles.helperText}>
            Your title should be a mix of attention-grabbing, informative, and
            optimized for search.
          </small>
        </div>

        {/* Course Subtitle */}
        <div className={styles.inputGroup}>
          <label htmlFor="subtitle">Course subtitle</label>
          <input
            type="text"
            id="subtitle"
            placeholder="Insert your course subtitle"
            maxLength="120"
            value={formData.subtitle}
            onChange={handleInputChange}
          />
          <small className={styles.helperText}>
            Use 1 or 2 related keywords, and mention 3-4 of the most important
            areas that you've covered during your course.
          </small>
        </div>

        {/* Course Description */}
        <div className={styles.inputGroup}>
          <label htmlFor="description">Course description</label>
          <textarea
            id="description"
            rows="5"
            placeholder="Insert your course description"
            value={formData.description}
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
          <label htmlFor="course_image_url">Course Image Link</label>
          <input
            type="text"
            id="course_image_url"
            placeholder="Insert the link for your course image"
            value={formData.course_image_url}
            onChange={handleInputChange}
          />
        </div>

        {/* Promotional Video Link */}
        <div className={styles.inputGroup}>
          <label htmlFor="promo_video_url">Promotional Video Link</label>
          <input
            type="text"
            id="promo_video_url"
            placeholder="Insert the link for your promotional video"
            value={formData.promo_video_url}
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
