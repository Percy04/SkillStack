import React from "react";
import { useLocation, Link } from "react-router-dom"; // Using react-router-dom for navigation
import styles from "../styles/components/coursesidebar.module.css";

const Sidebar = () => {
  const sections = [
    { label: "Intended learners", href: "" },
    { label: "Curriculum", href: "" },
    {
      label: "Course landing page",
      href: "/instructor/course/manage/basics",
    },
    {
      label: "Pricing",
      href: "/instructor/course/manage/pricing",
    },
    { label: "Course messages", href: "" },
  ];

  const location = useLocation(); // To get the current path

  return (
    <div className={styles.sidebar}>
      <h3 className={styles.heading}>Plan your course</h3>
      {sections.slice(0, 1).map((section, index) => (
        <Link
          key={index}
          to={section.href}
          className={`${styles.item} ${
            location.pathname === section.href ? styles.active : ""
          }`}
        >
          {section.label}
        </Link>
      ))}

      <h3 className={styles.heading}>Create your content</h3>
      {sections.slice(1, 2).map((section, index) => (
        <Link
          key={index + 1}
          to={section.href}
          className={`${styles.item} ${
            location.pathname === section.href ? styles.active : ""
          }`}
        >
          {section.label}
        </Link>
      ))}

      <h3 className={styles.heading}>Publish your course</h3>
      {sections.slice(2, 5).map((section, index) => (
        <Link
          key={index + 2}
          to={section.href}
          className={`${styles.item} ${
            location.pathname === section.href ? styles.active : ""
          }`}
        >
          {section.label}
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;
