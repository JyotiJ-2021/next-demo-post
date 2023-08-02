import React from "react"

import styles from "../app/styles/page.module.css"
import { content } from "@/app/utils/data/content"
import Link from "next/link"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
export const Content = () => {
  return (
    <div className={`${styles.grid} `}>
      {content.map((item, i) => {
        return (
          <Link key={item.id} href={item.url} className={styles.card}>
            <h2>
              {item.title}{" "}
              <span>
                <ArrowForwardIcon />
              </span>
            </h2>
            <p>{item.description}</p>
          </Link>
        )
      })}
    </div>
  )
}
