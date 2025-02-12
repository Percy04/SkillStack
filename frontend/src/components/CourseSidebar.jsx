import React, {useState} from "react";
import { useLocation, Link } from "react-router-dom"; // Using react-router-dom for navigation
import styles from "../styles/components/coursesidebar.module.css";
import publishStyles from "../styles/components/publishbutton.module.css";
import axios from "axios";

const Sidebar = () => {
  const sections = [
    { label: "Intended learners", href: "goals" },
    { label: "Curriculum", href: "curriculum" },
    {
      label: "Course landing page",
      href: "basics",
    },
    {
      label: "Pricing",
      href: "pricing",
    },
    { label: "Course messages", href: "messages" },
  ];

  const location = useLocation(); // To get the current path
  const urlParts = location.pathname.split("/");
  // console.log(location);

  const checkRoute = (sectionUrl) => {
    // console.log("Section href: " + sectionUrl);
    let leftOver = "";

    if (urlParts[urlParts.length - 1] === sectionUrl) {
      return `${styles.active}`;
    } else {
      return "";
    }
  };

  const routing = (sectionUrl) => {
    const currUrl = window.location.href.split("/");
    currUrl.pop();
    currUrl.push(sectionUrl);
    const nextUrl = currUrl.join("/");
    return nextUrl;
  };

  const [showPopup, setShowPopup] = useState(false);
  const courseId = window.location.pathname.split("/")[3];

  const handlePublishClick = () => {
    setShowPopup(true);
  };

  const handleConfirm = () => {
    const formData = {published: true};

    axios.post(`http://localhost:5000/instructor/course/${courseId}/manage/basics`, {
      formData
    })
    .then((res) => {
      // console.log("Response: " , res);
      setShowPopup(false);
    })
    .catch((err) => {
      console.log("Error: " + err);
    })
  };

  const handleCancel = () => {
    setShowPopup(false);
  };

  return (
    <div className={styles.sidebar}>
      <h3 className={styles.heading}>Plan your course</h3>
      {sections.slice(0, 1).map((section, index) => (
        <Link
          key={index}
          to={routing(section.href)}
          className={`${styles.item} ${
            // location.pathname === section.href ? styles.active : ""
            checkRoute(section.href)
          }`}
        >
          {section.label}
        </Link>
      ))}

      <h3 className={styles.heading}>Create your content</h3>
      {sections.slice(1, 2).map((section, index) => (
        <Link
          key={index + 1}
          to={routing(section.href)}
          className={`${styles.item} ${
            // location.pathname === section.href ? styles.active : ""
            checkRoute(section.href)
          }`}
        >
          {section.label}
        </Link>
      ))}

      <h3 className={styles.heading}>Publish your course</h3>
      {sections.slice(2, 5).map((section, index) => (
        <Link
          key={index + 2}
          to={routing(section.href)}
          className={`${styles.item} ${
            // location.pathname === section.href ? styles.active : ""
            checkRoute(section.href)
          }`}
        >
          {section.label}
        </Link>
      ))}

      <div className={publishStyles.container}>
        <button className={publishStyles.publishButton} onClick={handlePublishClick}>
          Publish
        </button>

        {showPopup && (
          <div className={publishStyles.popupOverlay}>
            <div className={publishStyles.popup}>
              <p>Make sure you have updated everything before publishing. Are you sure you want to publish your course? (You can still make changes)</p>
              <div className={publishStyles.buttonGroup}>
                <button
                  className={publishStyles.confirmButton}
                  onClick={handleConfirm}
                >
                  Yes
                </button>
                <button className={publishStyles.cancelButton} onClick={handleCancel}>
                  No
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
