"use client"
import React, { useState } from "react"
import Image from "next/image"
import contentStyle from "../../styles/content.module.css"
import ContentNav from "../../../components/ContentNav"
import { usePathname } from "next/navigation"
import VideoModal from "@/components/ContentModal"
import BreadcrumbLayout from "@/components/BreadCrumb"
import { AdviceData } from "../../utils/data/advice"
import ShareIcon from "@mui/icons-material/Share"
import { DetailData } from "../../utils/data/detailData"
import { Footer } from "@/components/Footer"
import ContentModal from "@/components/ContentModal"
const DetailLayout = () => {
  const router = usePathname()
  const pathParts = router.split("/")
  const value = pathParts[3] || pathParts[2]
  const [open, setOpen] = useState(false)
  const [shareTitle, setShareTitle] = useState("")
  const [shareUrl, setShareUrl] = useState("")
  const [anchorEl, setAnchorEl] = useState(null)

  const title = value.replace(/\s/g, "-").toLowerCase()

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget)
  }

  const opens = Boolean(anchorEl)
  const id = opens ? "simple-popper" : undefined

  return (
    <>
      <main className={contentStyle.main}>
        <ContentNav />
        <BreadcrumbLayout title={router} />
        <div className={`${contentStyle.boxes} ${contentStyle.box}`}>
          {DetailData.map((data, i) => {
            return (
              data.title.replace(/\s/g, "-").toLowerCase() == title && (
                <div key={i} style={{ paddingBottom: "80px" }}>
                  <div className={`${contentStyle.heading} `}>
                    <h2
                      className={`${contentStyle.spacing} ${contentStyle.icons}`}
                    >
                      {data.title}
                      <ShareIcon
                        fontSize="15"
                        style={{ marginRight: "5px", color: "gray" }}
                        onClick={(e) => {
                          setOpen(true)
                          setShareTitle(data.title)
                          setShareUrl(pathParts[2])
                        }}
                      />
                      {/* <MoreVertIcon onClick={(e) => setOpen(true)} /> */}
                    </h2>

                    {/* <Popper id={id} open={opens} anchorEl={anchorEl}>
                    <Box
                      sx={{
                        border: 1,
                        p: 1,
                        bgcolor: "background.paper",
                      }}
                      onClick={() => {
                        setOpen(true)
                        setAnchorEl(null)
                      }}
                    >
                      <ShareIcon
                        fontSize="15"
                        color="disabled"
                        style={{ marginRight: "5px" }}
                      />
                      Share
                    </Box>
                  </Popper> */}
                  </div>
                  <h2>
                    {data.videoUrl !== "" ? (
                      <video width="100%" height="400px" controls>
                        <source src={data.videoUrl} type="video/mp4" />
                      </video>
                    ) : (
                      <Image
                        className={contentStyle.detailsImage}
                        src={data.image}
                        alt="img"
                        width={235}
                        height={350}
                        priority
                      />
                    )}
                  </h2>
                  <p className={contentStyle.innerDescription}>
                    {data.description}
                  </p>
                </div>
              )
            )
          })}
          {open && <div className="bg-blur" onClick={handleClick}></div>}

          {open && (
            <ContentModal
              open={open}
              setOpen={setOpen}
              title={shareTitle}
              url={shareUrl}
            />
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}

export default DetailLayout
