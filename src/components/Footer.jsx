import React from "react"
import modalcss from "../app/styles/modal.module.css"
import Link from "next/link"

export const Footer = () => {
  return (
    <div className={modalcss.footer}>
      <Link href="/privacy-policy">Privacy Policy</Link> |
      <Link href="/terms-conditions"> Terms & Conditions</Link>
    </div>
  )
}
