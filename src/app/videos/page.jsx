"use client"
import React, { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import contentStyle from "../styles/content.module.css"
import ContentNav from "../../components/ContentNav"
import { video } from "../utils/video/video.js"
import styles from "../styles/page.module.css"
import Box from "@mui/material/Box"
import Modal from "@mui/material/Modal"
import CloseIcon from "@mui/icons-material/Close"
import { Typography } from "@mui/material"
import BreadcrumbLayout from "@/components/BreadCrumb"
import { usePathname } from "next/navigation"
import Popper from "@mui/material/Popper"
import ShareIcon from "@mui/icons-material/Share"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import { Footer } from "@/components/Footer"
import ContentModal from "@/components/ContentModal"

const VideoLayout = () => {
  const router = usePathname()
  const [open, setOpen] = React.useState(false)
  const [openVideo, setOpenVideo] = React.useState(false)
  const [id, setId] = useState()
  const [url, setUrl] = useState()
  const [shareTitle, setShareTitle] = useState("")
  const [shareUrl, setShareUrl] = useState("")
  const handleOpen = (Id, url) => {
    setId(id)
    setUrl(url)
    setOpenVideo(true)
  }
  const handleClose = () => setOpenVideo(false)

  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = (event, value, url) => {
    setAnchorEl(anchorEl ? null : event.currentTarget)
    setShareTitle(value)
    setShareUrl(url)
  }

  const opens = Boolean(anchorEl)
  const ids = opens ? "simple-popper" : undefined
  return (
    <>
      <main className={contentStyle.main}>
        <ContentNav />
        <BreadcrumbLayout title={router} />
        <div className={contentStyle.boxes} style={{ height: "auto" }}>
          <div className={`${styles.heading} `} style={{ maxWidth: " 100%" }}>
            <h2 className={styles.spacing}>Videos</h2>
          </div>
          <div
            className={`${contentStyle.grid} `}
            style={{ maxWidth: " 100%" }}
          >
            {video.map((item, i) => {
              const crdUrl = item.title.replace(/\s/g, "-").toLowerCase()
              return (
                <div
                  key={item.id}
                  className={styles.card}
                  style={{ position: "relative" }}
                >
                  <h2
                    style={{ textAlign: "center" }}
                    onClick={() => handleOpen(item.id, item.videoUrl)}
                  >
                    <Image
                      className={styles.logo}
                      src={item.image}
                      alt="thumbnail"
                      width={235}
                      height={300}
                      priority
                    />
                  </h2>

                  <p
                    style={{ maxWidth: " 100%" }}
                    className={contentStyle.title}
                  >
                    <Link href={`/content${item.url}/${crdUrl}`}>
                      {" "}
                      {item.title}
                    </Link>
                    <MoreVertIcon
                      className={styles.verticalIcon}
                      onClick={(e) => handleClick(e, item.title, "videos")}
                    />
                  </p>
                </div>
              )
            })}
            <Popper id={ids} open={opens} anchorEl={anchorEl}>
              <Box
                sx={{ border: 1, p: 1, bgcolor: "background.paper" }}
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
            </Popper>
            <Modal
              open={openVideo}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box className={styles.modalBox}>
                <Typography
                  className={styles.modalHeader}
                  onClick={handleClose}
                >
                  <CloseIcon style={{ background: "#fff" }} />
                </Typography>
                <video width="100%" height="100%" controls>
                  <source src={url} type="video/mp4" />
                </video>
              </Box>
            </Modal>
          </div>
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

export default VideoLayout
