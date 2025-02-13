import styles from "../styles/components/instructorheader.module.css";

function InstructorHeader(props) {
  return (
    <div>
      <div className={styles.header}>
        <a href="http://localhost:5173/" className={styles.stack}>
          SkillStack
        </a>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            <a href="http://localhost:5173/">Student</a>
          </li>
          <li>
            <img
              className={styles.notificationIcon}
              src="../../public/notification.png"
              alt="notification-icon"
            />
          </li>
          <li className={`${styles.listItem} ${styles.userIcon}`}>
            {props.name ? props.name[0] : ""}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default InstructorHeader;
