"use client"
import React, { useState } from "react"
import { AdviceData } from "@/app/utils/data/advice"
import styles from "../app/styles/page.module.css"
import Image from "next/image"
import Link from "next/link"
import Box from "@mui/material/Box"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import Popper from "@mui/material/Popper"
import ShareIcon from "@mui/icons-material/Share"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Slider from "react-slick"
import ContentModal from "./ContentModal"

export const Courses = () => {
  const [open, setOpen] = useState(false)
  const [ids, setIds] = useState()
  const [anchorEl, setAnchorEl] = useState(null)
  const [shareTitle, setShareTitle] = useState("")
  const [shareUrl, setShareUrl] = useState("")

  const handleClick = (event, id, value, url) => {
    setIds(id)
    setShareTitle(value)
    setShareUrl(url)
    setAnchorEl(anchorEl ? null : event.currentTarget)
  }

  const opens = Boolean(anchorEl)
  const id = opens && ids ? "simple-popper" : undefined
  const settings = {
    dots: false,
    infinite: false,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 2,
    autoplay: false,
    autoplaySpeed: 2000,
    // nextArrow: <ChevronRightIcon style={{ color: "red" }} />,
    // prevArrow: <ChevronLeftIcon style={{ color: "red" }} />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          dots: true,
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          dots: true,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }
  return (
    <>
      <div className={`${styles.heading} `} style={{ marginTop: "20px" }}>
        <h2 className={styles.spacing}>
          {" "}
          <Link href="/courses">Courses </Link>
        </h2>
      </div>

      <div className={`${styles.videogrid} `}>
        <Slider {...settings}>
          {AdviceData.map((item, i) => {
            const crdUrl = item.title.replace(/\s/g, "-").toLowerCase()
            return (
              <div
                key={item.id}
                className={styles.card}
                style={{ position: "relative" }}
              >
                <Link href={`/courses/${crdUrl}`}>
                  <h2>
                    <Image
                      className={`${styles.logo} `}
                      style={{ width: "100%" }}
                      src={item.image}
                      alt={item.image}
                      width={235}
                      height={150}
                      priority
                    />
                  </h2>
                </Link>
                <p className={styles.title}>
                  <Link href={`/courses/${crdUrl}`}> {item.title}</Link>
                  <MoreVertIcon
                    className={styles.verticalIcon}
                    onClick={(e) =>
                      handleClick(e, item.id, item.title, "courses")
                    }
                  />
                </p>
              </div>
            )
          })}
        </Slider>
        <Popper id={id} open={opens} anchorEl={anchorEl}>
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
        {open && (
          <ContentModal
            open={open}
            setOpen={setOpen}
            title={shareTitle}
            url={shareUrl}
          />
        )}
        {opens && <div className="bg-blur" onClick={handleClick}></div>}
      </div>
    </>
  )
}
