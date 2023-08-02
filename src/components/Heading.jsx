import React from "react"

import styles from "../app/styles/page.module.css"
export const Heading = () => {
  return (
    <div className={`${styles.center} ${styles.mb_padding}`}>
      <h2 className={styles.logo}>World History</h2>
      <p className={styles.logoText}>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illum,
        laboriosam!
      </p>
    </div>
  )
}
