import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../../styles/pages/pricing.module.css";

function Pricing() {
  const [price, setPrice] = useState(0);
  const courseId = window.location.pathname.split("/")[3];

  useEffect(() => {
    axios
      .get(`http://localhost:5000/instructor/course/${courseId}/manage/basics`)
      .then((res) => {
        console.log(res.data);
        const oldPrice = res.data.price || 0;
        setPrice(oldPrice);
      })
      .catch((err) => {
        console.error("Error fetching course data:", err);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting price:", price);

    try {
      const response = await axios.patch(
        `http://localhost:5000/instructor/course/${courseId}/manage/pricing`,
        { price }
      );
      console.log("Price updated successfully:", response.data);
    } catch (error) {
      console.error("Error updating price:", error);
    }
  };

  const handleChange = (e) => {
    console.log("Selected price:", e.target.value);
    setPrice(e.target.value);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Pricing</h1>
      <p className={styles.description}>
        Set a price for your course. Please select the currency and the price
        tier for your course. If you’d like to offer your course for free, it
        must have a total video length of less than 2 hours. Also, courses with
        practice tests cannot be free.
      </p>

      <form className={styles.form} onSubmit={handleSubmit}>
        {/* Price Tier Selector */}
        <div className={styles.fieldGroup}>
          <label htmlFor="priceTier" className={styles.label}>
            Price Tier <span className={styles.infoIcon}>ℹ️</span>
          </label>
          <select
            id="priceTier"
            className={styles.select}
            value={price} // Bind value to price state
            onChange={handleChange} // Update state on change
          >
            {/* <option value="">Select a price</option> */}
            <option value="0">Free</option>
            <option value="499">₹499.00</option>
            <option value="999">₹999.00</option>
            <option value="1999">₹1999.00</option>
            <option value="4999">₹4999.00</option>
          </select>
        </div>

        {/* Save Button */}
        <button type="submit" className={styles.saveButton}>
          Save
        </button>
      </form>
    </div>
  );
}

export default Pricing;
