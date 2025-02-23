import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import styles from "../styles/pages/coursepage.module.css";
import { Star, Users, Book, ChevronDown } from "lucide-react";
function CoursePage() {
  const courseId = window.location.pathname.split("/").pop();
  const [course, setCourse] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openSections, setOpenSections] = useState({});
  const [isInstructorBioExpanded, setIsInstructorBioExpanded] = useState(false);
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
  }, [course]);
  if (isLoading) {
    return <h1>LOADING</h1>;
  }
  const toggleSection = (id) => {
    setOpenSections((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  return (
    <div>
      <Header />
      <div className={styles.container}>
        <div className={styles.leftcontainer}>
          {/* Left Section */}
          <div className={styles.left}>
            <h2>{course.title || "Course Title"}</h2>
            <p>{course.subtitle || "Course description here..."}</p>
            <p id={styles.id} className={styles.createdBy}>
              Created by{" "}
              <a href="" className={styles.bold}>
                {course.instructor_name || "Instructor Name"}
              </a>
            </p>
            <p id={styles.updated}>
              Last updated: {course.lastUpdated || "02/2025"}
            </p>
          </div>
          {/* Learning Section */}
          <div className={styles.learnBox}>
            <h3>What you'll learn</h3>
            <div className={styles.learnGrid}>
              {course.learningObjectives?.map((point, i) => (
                <div key={i} className={styles.learnItem}>
                  {point}
                </div>
              )) || (
                <div className={styles.learnItem}>
                  Placeholder learning point
                </div>
              )}
            </div>
          </div>
          {/* Course Content Section */}
          <div className={styles.courseContentBox}>
            <h3 className={styles.courseContentTitle}>Course Content</h3>
            <p className={styles.courseContentSubtitle}>
              {course.curriculum?.length || 0} sections
            </p>
            {course.curriculum?.map((section) => (
              <div key={section.id} className={styles.section}>
                <button
                  className={styles.sectionButton}
                  onClick={() => toggleSection(section.id)}
                >
                  {/* <div className={styles.sectionText}> */}
                  <span>{section.title}</span>
                  {/* </div> */}
                  <div className={styles.sectionRight}>
                    <span>{section.lectures.length} lectures</span>
                    <span>{openSections[section.id] ? "▲" : "▼"}</span>
                  </div>
                </button>
                {openSections[section.id] && (
                  <div className={styles.lectures}>
                    {section.lectures.map((lecture) => (
                      <div key={lecture.id} className={styles.lecture}>
                        {/* <span>{lecture.title}</span> */}
                        {lecture.type === "video" ? (
                          <div className={styles.lectureLeft}>
                            <img
                              className={styles.imageSizing}
                              src="/youtube.png"
                            ></img>
                            <span>{lecture.title}</span>
                          </div>
                        ) : (
                          <div className={styles.lectureLeft}>
                            <img
                              className={styles.imageSizing}
                              src="/document.png"
                            ></img>
                            <span>{lecture.title}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* {Requirements} */}
          <div className={styles.courseContentBox}>
            <h3 className={styles.courseContentTitle}>Requirements</h3>
            <ul>
              {course.requirements?.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
          </div>

          {/* {Description} */}
          <div className={styles.courseContentBox}>
            <h3 className={styles.courseContentTitle}>Description</h3>
            <p>{course.description}</p>
          </div>

          {/* Instructor Section */}
          <div className={styles.courseContentBox}>
            <h3 className={styles.courseContentTitle}>Instructors</h3>
            <div className={styles.instructorSection}>
              <div className={styles.instructorProfile}>
                <img
                  src={
                    course.instructor_image || "https://via.placeholder.com/128"
                  }
                  alt={course.instructor_name}
                  className={styles.instructorImage}
                />
                <div className={styles.instructorInfo}>
                  <a href="#" className={styles.instructorName}>
                    {course.instructor_name || "Instructor Name"}
                  </a>
                  <p className={styles.instructorTitle}>
                    {course.instructor_title || "Instructor Title"}
                  </p>

                  <div className={styles.instructorStats}>
                    <div className={styles.statItem}>
                      <Star className={styles.icon} />
                      <span>
                        {course.instructor_rating || "4.6"} Instructor Rating
                      </span>
                    </div>
                    <div className={styles.statItem}>
                      <Users className={styles.icon} />
                      <span>
                        {course.instructor_reviews || "166,598"} Reviews
                      </span>
                    </div>
                    <div className={styles.statItem}>
                      <Users className={styles.icon} />
                      <span>
                        {course.instructor_students || "768,842"} Students
                      </span>
                    </div>
                    <div className={styles.statItem}>
                      <Book className={styles.icon} />
                      <span>{course.instructor_courses || "24"} Courses</span>
                    </div>
                  </div>

                  <div className={styles.instructorBio}>
                    <p
                      className={
                        isInstructorBioExpanded ? "" : styles.truncated
                      }
                    >
                      {course.instructor_bio || "Instructor bio..."}
                    </p>
                    <button
                      onClick={() =>
                        setIsInstructorBioExpanded(!isInstructorBioExpanded)
                      }
                      className={styles.showMoreBtn}
                    >
                      Show {isInstructorBioExpanded ? "less" : "more"}
                      <ChevronDown
                        className={`${styles.chevron} ${
                          isInstructorBioExpanded ? styles.chevronRotated : ""
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
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
          <p className={styles.price}>₹{course.price || "4,999"}</p>
          <div className={styles.buttons}>
            <button className={styles.cart}>Add to cart</button>
            <button className={styles.heart}>♥</button>
          </div>
          <button className={styles.buy}>Buy now</button>
          <input
            type="text"
            placeholder="Enter Coupon"
            className={styles.coupon}
          />
          <button className={styles.apply}>Apply</button>
        </div>
      </div>
    </div>
  );
}
export default CoursePage;
