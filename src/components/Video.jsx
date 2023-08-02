"use client"
import React, { useState, useRef } from "react"
import { video } from "@/app/utils/video/video"
import styles from "../app/styles/page.module.css"
import Image from "next/image"
import Box from "@mui/material/Box"
import Modal from "@mui/material/Modal"
import CloseIcon from "@mui/icons-material/Close"
import { Typography } from "@mui/material"
import Link from "next/link"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import ContentModal from "./ContentModal"
import Popper from "@mui/material/Popper"
import ShareIcon from "@mui/icons-material/Share"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Slider from "react-slick"

const Video = () => {
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

  const settings = {
    dots: false,
    infinite: false,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          dots: true,

          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          nextArrow: false,
          prevArrow: false,
        },
      },
      {
        breakpoint: 480,
        settings: { dots: true, slidesToShow: 1, slidesToScroll: 1 },
      },
    ],
  }
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = (event, value, url) => {
    setShareTitle(value)
    setShareUrl(url)
    setAnchorEl(anchorEl ? null : event.currentTarget)
  }

  const opens = Boolean(anchorEl)
  const ids = opens ? "simple-popper" : undefined
  return (
    <>
      <div className={`${styles.heading} `}>
        <h2 className={styles.spacing}>
          {" "}
          <Link href="/videos">Videos </Link>
        </h2>
      </div>
      <div className={`${styles.videogrid} `}>
        <Slider {...settings}>
          {video.map((item, i) => {
            const crdUrl = item.title.replace(/\s/g, "-").toLowerCase()
            return (
              <div key={item.id} className={styles.card}>
                <h2 onClick={() => handleOpen(item.id, item.videoUrl)}>
                  <Image
                    className={styles.logo}
                    src={item.image}
                    alt={item.image}
                    width={235}
                    height={350}
                    priority
                    style={{ width: "100%" }}
                  />
                </h2>
                <p className={styles.title}>
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
        </Slider>
      </div>

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
          <Typography className={styles.modalHeader} onClick={handleClose}>
            <CloseIcon style={{ background: "#fff" }} />
          </Typography>
          <video width="100%" height="100%" controls>
            <source src={url} type="video/mp4" />
          </video>
        </Box>
      </Modal>
      {opens && <div className="bg-blur" onClick={handleClick}></div>}
      {open && (
        <ContentModal
          open={open}
          setOpen={setOpen}
          title={shareTitle}
          url={shareUrl}
        />
      )}
    </>
  )
}

export default Video
