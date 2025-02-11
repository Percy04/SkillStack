import React, { useEffect, useState } from "react";
import styles from "../../styles/pages/curriculum.module.css";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import axios from "axios";
import getUser from "../../utils/getUser";

const Curriculum = () => {
  const [sections, setSections] = useState([]);
  // const [sections, setSections] = useState([
  //   {
  //     id: 1,
  //     title: "Introduction",
  //     lectures: [
  //       {
  //         id: 1,
  //         title: "Introduction",
  //         type: null,
  //         content: "",
  //         visible: false,
  //       },
  //     ],
  //   },
  // ]);

  //GET USER DATA
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      const data = await getUser();
      setUserData(data);
      // console.log(data);
    };

    fetchUser();
  }, []);

  const courseId = window.location.pathname.split("/")[3];
  useEffect(() => {
    if (!userData) return;

    axios
      .get(
        `http://localhost:5000/instructor/course/${courseId}/manage/curriculum`,
        {
          params: {
            userId: userData.userId,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setSections(res.data.createCourse.curriculum);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userData]);

  const [isDisabled, setIsDisabled] = useState(true);
  const [initialSections, setInitialSections] = useState(sections);

  useEffect(() => {
    const isSame = JSON.stringify(sections) === JSON.stringify(initialSections);
    setIsDisabled(isSame);
  }, [sections, initialSections]);

  const handleSave = () => {
    setIsDisabled(true);
    setInitialSections(sections);

    // const formData = {curriculum: sections};

    axios
      .post(
        `http://localhost:5000/instructor/course/${courseId}/manage/curriculum`,
        {
          sections,
          userId: userData.userId,
        }
      )
      .then((res) => {
        console.log("RES: ", res);
      })
      .catch((err) => {
        console.log("error with updating curricululum: ", err);
      });

    console.log("Saved!", sections);
  };

  const handleAddSection = () => {
    const lastSection = sections[sections.length - 1];

    // Prevent adding a new section if the last one has no lectures
    if (!lastSection || lastSection.lectures.length === 0) {
      alert("You must add at least one lecture before creating a new section.");
      return;
    }

    const newSection = {
      id: Date.now(),
      title: "New Section",
      lectures: [],
    };

    setSections([...sections, newSection]);
  };

  const handleUpdateSectionTitle = (id, newTitle) => {
    setSections(
      sections.map((section) =>
        section.id === id ? { ...section, title: newTitle } : section
      )
    );
  };

  const handleDeleteSection = (id) => {
    setSections(sections.filter((section) => section.id !== id));
  };

  const handleAddLecture = (sectionId) => {
    setSections(
      sections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              lectures: [
                ...section.lectures,
                {
                  id: Date.now(),
                  title: "New Lecture",
                  type: null,
                  content: "",
                  visible: false,
                },
              ],
            }
          : section
      )
    );
  };

  const handleUpdateLectureTitle = (sectionId, lectureId, newTitle) => {
    setSections(
      sections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              lectures: section.lectures.map((lecture) =>
                lecture.id === lectureId
                  ? { ...lecture, title: newTitle }
                  : lecture
              ),
            }
          : section
      )
    );
  };

  const handleDeleteLecture = (sectionId, lectureId) => {
    setSections(
      sections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              lectures: section.lectures.filter(
                (lecture) => lecture.id !== lectureId
              ),
            }
          : section
      )
    );
  };

  const handleToggleContentType = (sectionId, lectureId, type) => {
    setSections(
      sections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              lectures: section.lectures.map((lecture) =>
                lecture.id === lectureId
                  ? {
                      ...lecture,
                      type,
                      visible: lecture.type !== type || !lecture.visible,
                      content: lecture.type === null ? "" : lecture.content,
                    }
                  : lecture
              ),
            }
          : section
      )
    );
  };

  const handleUpdateContent = (sectionId, lectureId, content) => {
    setSections(
      sections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              lectures: section.lectures.map((lecture) =>
                lecture.id === lectureId ? { ...lecture, content } : lecture
              ),
            }
          : section
      )
    );
  };

  const handleSaveLectureContent = () => {
    console.log("Lecture content saved!");
  };

  useEffect(() => {
    console.log(sections);
  }, [sections]);

  return (
    <div className={styles.curriculum}>
      <div className={styles.header}>
        <h2 className={styles.heading}>Curriculum</h2>
        <button type="button" disabled={isDisabled} onClick={handleSave}>
          Save
        </button>
      </div>

      {sections.map((section) => (
        <div key={section.id} className={styles.section}>
          <input
            className={styles.sectionTitle}
            value={section.title}
            onChange={(e) =>
              handleUpdateSectionTitle(section.id, e.target.value)
            }
          />
          <button
            className={styles.deleteBtn}
            onClick={() => handleDeleteSection(section.id)}
          >
            🗑️
          </button>

          {section.lectures.map((lecture) => (
            <div key={lecture.id} className={styles.lecture}>
              <input
                className={styles.lectureTitle}
                value={lecture.title}
                onChange={(e) =>
                  handleUpdateLectureTitle(
                    section.id,
                    lecture.id,
                    e.target.value
                  )
                }
              />

              <button
                className={`${styles.contentBtn} ${
                  lecture.type === "video" ? styles.hide : ""
                }`}
                onClick={() =>
                  handleToggleContentType(section.id, lecture.id, "article")
                }
              >
                Article
              </button>

              <button
                className={`${styles.contentBtn} ${
                  lecture.type === "article" ? styles.hide : ""
                }`}
                onClick={() =>
                  handleToggleContentType(section.id, lecture.id, "video")
                }
              >
                Video
              </button>

              <button
                className={styles.deleteBtn}
                onClick={() => handleDeleteLecture(section.id, lecture.id)}
              >
                🗑️
              </button>

              {lecture.visible && lecture.type === "article" && (
                <div>
                  <textarea
                    className={styles.textArea}
                    placeholder="Write your article here..."
                    value={lecture.content}
                    onChange={(e) =>
                      handleUpdateContent(
                        section.id,
                        lecture.id,
                        e.target.value
                      )
                    }
                  />

                  <button
                    className={styles.addLecture}
                    onClick={handleSaveLectureContent}
                  >
                    Save
                  </button>

                  <span
                    onClick={() =>
                      handleToggleContentType(section.id, lecture.id, null)
                    }
                  >
                    {" "}
                    Switch{" "}
                  </span>
                </div>
              )}

              {lecture.visible && lecture.type === "video" && (
                <div>
                  <input
                    className={styles.videoInput}
                    placeholder="Enter video URL..."
                    value={lecture.content}
                    onChange={(e) =>
                      handleUpdateContent(
                        section.id,
                        lecture.id,
                        e.target.value
                      )
                    }
                  />
                  <button
                    className={styles.addLecture}
                    onClick={handleSaveLectureContent}
                  >
                    Save
                  </button>

                  <span
                    onClick={() =>
                      handleToggleContentType(section.id, lecture.id, null)
                    }
                  >
                    {" "}
                    Switch{" "}
                  </span>
                </div>
              )}
            </div>
          ))}

          <button
            className={styles.addLecture}
            onClick={() => handleAddLecture(section.id)}
          >
            + Add Lecture
          </button>
        </div>
      ))}

      <button
        className={styles.addSection}
        onClick={handleAddSection}
        disabled={
          sections.length > 0 &&
          sections[sections.length - 1].lectures.length === 0
        }
      >
        + Add Section
      </button>
    </div>
  );
};

export default Curriculum;
