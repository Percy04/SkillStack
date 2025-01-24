import React from "react";
import styles from "../../styles/pages/pricing.module.css";

function Pricing() {
  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Pricing</h1>
      <p className={styles.description}>
        Set a price for your course. Please select the currency and the price tier for your course. If you’d like to offer your course for free, it must have a total video length of less than 2 hours. Also, courses with practice tests cannot be free.
      </p>

      <form className={styles.form}>
        {/* Currency Selector */}
        <div className={styles.fieldGroup}>
          <label htmlFor="currency" className={styles.label}>
            Currency
          </label>
          <select id="currency" className={styles.select}>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="INR">INR</option>
            <option value="GBP">GBP</option>
          </select>
        </div>

        {/* Price Tier Selector */}
        <div className={styles.fieldGroup}>
          <label htmlFor="priceTier" className={styles.label}>
            Price Tier <span className={styles.infoIcon}>ℹ️</span>
          </label>
          <select id="priceTier" className={styles.select}>
            <option value="free">Free</option>
            <option value="tier1">$19.99</option>
            <option value="tier2">$29.99</option>
            <option value="tier3">$49.99</option>
            <option value="tier4">$99.99</option>
          </select>
        </div>

        {/* Save Button */}
        <button type="submit" className={styles.saveButton} disabled>
          Save
        </button>
      </form>
    </div>
  );
};

export default Pricing;
