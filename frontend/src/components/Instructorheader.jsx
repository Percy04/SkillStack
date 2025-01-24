import styles from "../styles/components/instructorheader.module.css";

function InstructorHeader(props) {
  return (
    <div className={styles.header}>
      <ul className={styles.list}>
        <li className={styles.listItem}>Student</li>
        <li>
          <img
            className={styles.notificationIcon}
            src="../../public/notification.png"
            alt="notification-icon"
          />
        </li>
        <li className={`${styles.listItem} ${styles.userIcon}`}>{(props.name) ? props.name[0] : ""}</li>
      </ul>
    </div>
  );
}

export default InstructorHeader;
