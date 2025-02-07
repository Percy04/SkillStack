import React, { useState, useEffect } from "react";
import styles from "../../styles/pages/messages.module.css";
import axios from "axios";
import getUser from "../../utils/getUser";

const Messages = () => {
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const [congratsMessage, setCongratsMessage] = useState("");
  const [userData, setUserData] = useState(null);

  const charLimit = 1000;
  const courseId = window.location.pathname.split("/")[3];

  useEffect(() => {
    const fetchUser = async () => {
      const data = await getUser();
      // isData = true;
      setUserData(data);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/instructor/course/${courseId}/manage/basics`)
      .then((res) => {
        console.log("data: " , res.data);
        setWelcomeMessage(res.data.welcome_message);
        setCongratsMessage(res.data.congratulations_message);
      })
      .catch((err) => {
        console.error("Error fetching course data:", err);
      });
  }, []);


  const handleSaveButton = async (e) => {
    e.preventDefault();

     const messages = {
      welcomeMessage,
      congratsMessage,
      userId: userData.userId
     }
    // console.log("Submitting price:", price);

    try {
      const response = await axios.patch(
        `http://localhost:5000/instructor/course/${courseId}/manage/messages`,
        { messages }
      );
      console.log("userData" , userData);

      console.log("Message response: " , response.data);
      // console.log("Price updated successfully:", response.data);
    } catch (error) {
      console.error("Error updating price:", error);
    }
  }



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

      <button onClick={(e) => handleSaveButton(e)}>
        Save
      </button>
    </div>
  );
};

export default Messages;
