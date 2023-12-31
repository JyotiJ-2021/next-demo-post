import * as React from "react"
import Link from "@mui/material/Link"
import contentStyle from "../app/styles/content.module.css"
import { usePathname } from "next/navigation"

export default function BreadcrumbLayout({ title }) {
  const router = usePathname()

  var currentLink = ""

  const crumbs =
    router &&
    router
      .split("/")
      .filter((crumb) => crumb !== "")
      .map((crumb) => {
        currentLink += `/${crumb}`

        return (
          <div
            className="crumb"
            key={crumb}
            style={{ textTransform: "capitalize" }}
          >
            <Link href={currentLink}>
              &nbsp; / &nbsp;
              {crumb.replace(/%20/g, " ").replace(/-/g, " ")}{" "}
            </Link>
          </div>
        )
      })

  return (
    <div className={contentStyle.breadCrumbs}>
      <Link href={"/"}>Home</Link>&nbsp; {crumbs}
    </div>
  )
}
