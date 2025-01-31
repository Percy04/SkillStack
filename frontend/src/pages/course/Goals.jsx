import React, { useEffect, useState } from "react";
import styles from "../../styles/pages/goals.module.css";
import axios from "axios";
import getUser from "../../utils/getUser.js";

const Goals = () => {
  const courseId = window.location.pathname.split("/")[3];
  const [learningObjectives, setLearningObjectives] = useState([
    "",
    "",
    "",
    "",
  ]);
  const [requirements, setRequirements] = useState([""]);
  const [targetAudience, setTargetAudience] = useState([""]);

  const handleInputChange = (index, value, setter, formRow) => {
    const updatedValues = [...formRow];
    updatedValues[index] = value;
    setter(updatedValues);
    // console.log(formRow);
  };

  const addMoreFields = (setter) => {
    setter((prev) => [...prev, ""]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      learningObjectives,
      requirements,
      targetAudience,
      createdBy: userData.userId,
      publishCourseId: courseId,
    };
    // console.log("Submitted Data:", formData);
    console.log(userData.userId);

    axios
      .post(
        `http://localhost:5000/instructor/course/${courseId}/manage/goals`,
        {
          formData,
        }
      )
      .catch(function (err) {
        console.log("Goals submission to db error: " + err);
      });
  };

  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      const data = await getUser();
      setUserData(data);
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (!userData) return;
    console.log(userData.userId);

    axios
      .get(`http://localhost:5000/instructor/course/${courseId}/manage/goals`, {
        params: userData,
      })
      .then(function (res) {
        console.log("RES: " , res.data);
        setLearningObjectives(res.data.learningObjectives);
        setRequirements(res.data.requirements);
        setTargetAudience(res.data.targetAudience);
      })
      .catch(function (err) {
        console.log("Data not created");
        console.log(err)
      })
  }, [userData]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Intended learners</h2>
      <p className={styles.description}>
        The following descriptions will be publicly visible on your Course
        Landing Page and will have a direct impact on your course performance.
      </p>

      <form onSubmit={handleSubmit}>
        {/* Learning Objectives */}
        <div className={styles.section}>
          <label className={styles.label}>
            What will students learn in your course?
          </label>
          <p className={styles.helperText}>
            You must enter at least <b>4 learning objectives</b> or outcomes.
          </p>
          {learningObjectives.map((objective, index) => (
            <input
              key={index}
              type="text"
              placeholder="Example: Define the roles and responsibilities of a project manager"
              className={styles.input}
              maxLength="160"
              value={learningObjectives[index]}
              onChange={(e) =>
                handleInputChange(
                  index,
                  e.target.value,
                  setLearningObjectives,
                  learningObjectives
                )
              }
              //   required
            />
          ))}
          <button
            type="button"
            className={styles.addMore}
            onClick={() => addMoreFields(setLearningObjectives)}
          >
            + Add more to your response
          </button>
        </div>

        {/* Requirements */}
        <div className={styles.section}>
          <label className={styles.label}>
            What are the requirements or prerequisites for taking your course?
          </label>
          <p className={styles.helperText}>
            List any skills, experience, or tools required before taking this
            course.
          </p>
          {requirements.map((requirement, index) => (
            <input
              key={index}
              type="text"
              placeholder="Example: No programming experience needed. You will learn everything you need to know"
              className={styles.input}
              maxLength="160"
              value={requirement}
              onChange={(e) =>
                handleInputChange(
                  index,
                  e.target.value,
                  setRequirements,
                  requirements
                )
              }
              required
            />
          ))}
          <button
            type="button"
            className={styles.addMore}
            onClick={() => addMoreFields(setRequirements)}
          >
            + Add more to your response
          </button>
        </div>

        {/* Target Audience */}
        <div className={styles.section}>
          <label className={styles.label}>Who is this course for?</label>
          <p className={styles.helperText}>
            Describe the{" "}
            <a href="#" className={styles.link}>
              intended learners
            </a>{" "}
            who will find your course valuable.
          </p>
          {targetAudience.map((audience, index) => (
            <input
              key={index}
              type="text"
              placeholder="Example: Beginner Python developers curious about data science"
              className={styles.input}
              maxLength="160"
              value={audience}
              onChange={(e) =>
                handleInputChange(
                  index,
                  e.target.value,
                  setTargetAudience,
                  targetAudience
                )
              }
              required
            />
          ))}
          <button
            type="button"
            className={styles.addMore}
            onClick={() => addMoreFields(setTargetAudience)}
          >
            + Add more to your response
          </button>
        </div>

        <button type="submit" className={styles.submitButton}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Goals;
