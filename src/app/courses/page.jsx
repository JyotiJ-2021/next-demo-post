"use client"
import React, { useState } from "react"
import Image from "next/image"
import contentStyle from "../styles/content.module.css"
import styles from "../styles/page.module.css"
import { Details } from "../utils/data/details"
import ContentNav from "../../components/ContentNav"
import { usePathname } from "next/navigation"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import BreadcrumbLayout from "@/components/BreadCrumb"
import Popper from "@mui/material/Popper"
import ShareIcon from "@mui/icons-material/Share"
import Box from "@mui/material/Box"
import Link from "next/link"
import { Footer } from "@/components/Footer"
import ContentModal from "@/components/ContentModal"

import Modal from "@mui/material/Modal"
import CloseIcon from "@mui/icons-material/Close"
import { Typography } from "@mui/material"
const page = () => {
  const router = usePathname()
  const [open, setOpen] = useState(false)
  const [openVideo, setOpenVideo] = React.useState(false)
  const [id, setId] = useState()
  const [url, setUrl] = useState()
  const [anchorEl, setAnchorEl] = useState(null)
  const [shareTitle, setShareTitle] = useState("")
  const [shareUrl, setShareUrl] = useState("")
  const handleClick = (event, value, url) => {
    setAnchorEl(anchorEl ? null : event.currentTarget)
    setShareTitle(value)
    setShareUrl(url)
  }
  const handleClose = () => setOpenVideo(false)

  const handleOpen = (Id, url) => {
    setId(id)
    setUrl(url)
    setOpenVideo(true)
  }

  const opens = Boolean(anchorEl)
  const ids = opens ? "simple-popper" : undefined

  return (
    <>
      <main className={contentStyle.main}>
        <ContentNav />
        <BreadcrumbLayout title={router} />
        <div className={contentStyle.boxes}>
          {Details.map((data, i) => {
            return (
              data.url === router && (
                <div key={i}>
                  <div className={`${contentStyle.heading} `}>
                    <h2 className={contentStyle.spacing}>{data.heading}</h2>
                  </div>
                  <div className={`${contentStyle.grid} `}>
                    {data.content.map((item, i) => {
                      const crdUrl = item.title
                        .replace(/\s/g, "-")
                        .toLowerCase()
                      return (
                        <div
                          key={item.id}
                          className={`${contentStyle.card} ${contentStyle.crd}`}
                        >
                          <h2
                            onClick={() => handleOpen(item.id, item.videoUrl)}
                          >
                            <Image
                              className={styles.logo}
                              src={item.image}
                              alt="img"
                              width={235}
                              height={300}
                              priority
                            />
                          </h2>
                          <p className={contentStyle.title}>
                            <Link href={`${item.url}/${crdUrl}`}>
                              {" "}
                              {item.title}
                            </Link>
                            <MoreVertIcon
                              className={contentStyle.verticalIcon}
                              onClick={(e) =>
                                handleClick(e, item.title, "courses")
                              }
                            />
                          </p>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            )
          })}
          {opens && <div className="bg-blur" onClick={handleClick}></div>}
          <Popper id={ids} open={opens} anchorEl={anchorEl}>
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
          </Popper>
          <Modal
            open={openVideo}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box className={styles.modalBox}>
              <Typography className={styles.modalHeader} onClick={handleClose}>
                <CloseIcon style={{ background: "#fff" }} />
              </Typography>
              <video width="100%" height="100%" controls>
                <source src={url} type="video/mp4" />
              </video>
            </Box>
          </Modal>
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

export default page
