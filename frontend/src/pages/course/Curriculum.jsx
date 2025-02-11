import React, { useEffect, useState } from "react";
import styles from "../../styles/pages/curriculum.module.css";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

const Curriculum = () => {
  const [sections, setSections] = useState([
    {
      id: 1,
      title: "Introduction",
      lectures: [
        {
          id: 1,
          title: "Introduction",
          type: null,
          content: "",
          visible: false,
        },
        {
          id: 2,
          title: "Make an Apple",
          type: null,
          content: "",
          visible: false,
        },
      ],
    },
  ]);

  const handleAddSection = () => {
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

  const handleToggleContentType = (sectionId, lectureId, type, event) => {
    // console.log(event.target.nextSibling)
    // console.log(event.target.prevSibling)
    // console.log(event.target);

    // setSections(
    //   sections.map((section) => {
    //     section.id === sectionId
    //       ? {
    //           ...section,
    //           lectures: section.lectures.map((lecture) => {
    //             lecture.id === lectureId
    //               ? {
    //                   ...lecture,
    //                   type: lecture.type,
    //                 }
    //               : lecture;
    //           }),
    //         }
    //       : section;
    //   })
    // );

    console.log(type);
    setSections(
      sections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              lectures: section.lectures.map((lecture) =>
                lecture.id === lectureId
                  ? {
                      ...lecture,
                      // type: lecture.type === type ? null : type,
                      type,
                      visible: lecture.type !== type || !lecture.visible,
                      // content: lecture.type === type ? "" : lecture.content,
                    }
                  : lecture
              ),
            }
          : section
      )
    );
  };

  const handleUpdateContent = (sectionId, lectureId, content) => {
    // console.log("Content: " + content);
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
    // console.log(sections);
  };

  const handleSaveLectureContent = () => {};

  const [isDisabled, setIsDisabled] = useState(true);
  const [initialSections, setInitialSections] = useState(sections);

  useEffect(() => {
    const isSame = JSON.stringify(sections) === JSON.stringify(initialSections);
    setIsDisabled(isSame);
  }, [sections, initialSections]);

  const handleSave = () => {
    setIsDisabled(true);
    setInitialSections(sections);
    console.log("Saved!", sections);
  };

  useEffect(() => {
    console.log(sections);
  }, [sections]);

  return (
    <div className={styles.curriculum}>
      <div className={styles.header}>
        <h2 className={styles.heading}>Curriculum</h2>
        <button
          type="button"
          disabled={isDisabled}
          onClick={() => handleSave()}
        >
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
                className={`${styles.contentBtn} 
                ${lecture.type === "video" ? styles.hide : ""}`}
                onClick={(e) =>
                  handleToggleContentType(section.id, lecture.id, "article", e)
                }
              >
                Article
              </button>

              <button
                className={`${styles.contentBtn} 
                ${lecture.type === "article" ? styles.hide : ""}`}
                onClick={(e) =>
                  handleToggleContentType(section.id, lecture.id, "video", e)
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

              {/* 
              {lecture.visible && lecture.type === "article" && (
                // I don't simply get text here, I get HTML.
                <ReactQuill
                  theme="snow"
                  value={lecture.content}
                  onChange={(e) =>
                    handleUpdateContent(section.id, lecture.id, e)
                  }
                />
              )} */}

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
                    onClick={() => handleSaveLectureContent()}
                  >
                    Save
                  </button>
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
                    onClick={() => handleSaveLectureContent()}
                  >
                    Save
                  </button>
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

      <button className={styles.addSection} onClick={handleAddSection}>
        + Add Section
      </button>
    </div>
  );
};

export default Curriculum;
