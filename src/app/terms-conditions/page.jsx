"use client"
import React from "react"
import contentStyle from "../styles/content.module.css"
import ContentNav from "../../components/ContentNav"
import { usePathname } from "next/navigation"
import BreadcrumbLayout from "@/components/BreadCrumb"
import { Footer } from "@/components/Footer"
const TermsConditions = () => {
  const router = usePathname()

  return (
    <>
      <main className={contentStyle.main}>
        <ContentNav />
        <BreadcrumbLayout title={router} />

        <div className={contentStyle.boxes}>
          <div className={`${contentStyle.heading} `}>
            <h2 className={contentStyle.spacing}>Terms & Conditions</h2>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default TermsConditions
