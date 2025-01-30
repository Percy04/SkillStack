import React, { useState } from "react";
import styles from "../../styles/pages/messages.module.css";

const Messages = () => {
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const [congratsMessage, setCongratsMessage] = useState("");

  const charLimit = 1000;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Course messages</h2>
      <p className={styles.description}>
        Write messages to your students (optional) that will be sent automatically when they join or complete your course to encourage students to engage with course content. If you do not wish to send a welcome or congratulations message, leave the text box blank.
      </p>

      {/* Welcome Message */}
      <div className={styles.section}>
        <label className={styles.label}>Welcome Message</label>
        <textarea
          value={welcomeMessage}
          onChange={(e) => setWelcomeMessage(e.target.value)}
          className={styles.textarea}
          maxLength={charLimit}
          placeholder="Write a welcome message..."
        />
        <div className={styles.charCounter}>
          {welcomeMessage.length > charLimit ? (
            <span className={styles.error}>{welcomeMessage.length} / {charLimit}</span>
          ) : (
            <span>{welcomeMessage.length} / {charLimit}</span>
          )}
        </div>
      </div>

      {/* Congratulations Message */}
      <div className={styles.section}>
        <label className={styles.label}>Congratulations Message</label>
        <textarea
          value={congratsMessage}
          onChange={(e) => setCongratsMessage(e.target.value)}
          className={styles.textarea}
          maxLength={charLimit}
          placeholder="Write a congratulations message..."
        />
        <div className={styles.charCounter}>
          {congratsMessage.length > charLimit ? (
            <span className={styles.error}>{congratsMessage.length} / {charLimit}</span>
          ) : (
            <span>{congratsMessage.length} / {charLimit}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;
