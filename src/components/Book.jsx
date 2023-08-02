"use client"
import React, { useState } from "react"
import { AdviceData } from "@/app/utils/data/advice"
import { content } from "@/app/utils/data/content"
import Image from "next/image"
import Video from "./Video"
import Link from "next/link"
import styles from "../app/styles/page.module.css"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import ContentModal from "./ContentModal"
import Popper from "@mui/material/Popper"
import ShareIcon from "@mui/icons-material/Share"
import Box from "@mui/material/Box"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Slider from "react-slick"

export const Book = () => {
  const [open, setOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const [shareTitle, setShareTitle] = useState("")
  const [shareUrl, setShareUrl] = useState("")
  const handleClick = (event, value, url) => {
    setAnchorEl(anchorEl ? null : event.currentTarget)
    setShareTitle(value)
    setShareUrl(url)
  }

  const opens = Boolean(anchorEl)
  const id = opens ? "simple-popper" : undefined
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
          <Link href="/books">Books</Link>
        </h2>
      </div>

      <div className={`${styles.videogrid} `} style={{ marginBottom: "100px" }}>
        <Slider {...settings}>
          {AdviceData.map((item, i) => {
            const crdUrl = item.title.replace(/\s/g, "-").toLowerCase()
            return (
              <div
                key={item.id}
                className={styles.card}
                style={{ position: "relative" }}
              >
                <Link href={`/content/books/${crdUrl}`}>
                  <h2>
                    <Image
                      className={`${styles.logo} `}
                      style={{ width: "100%" }}
                      src={item.image}
                      alt="books"
                      width={235}
                      height={150}
                      priority
                    />
                  </h2>
                </Link>
                <p className={styles.title}>
                  <Link href={`/content/books/${crdUrl}`}> {item.title}</Link>
                  <MoreVertIcon
                    className={styles.verticalIcon}
                    onClick={(e) => handleClick(e, item.title, "books")}
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
        {opens && <div className="bg-blur" onClick={handleClick}></div>}
        {open && (
          <ContentModal
            open={open}
            setOpen={setOpen}
            title={shareTitle}
            url={shareUrl}
          />
        )}
      </div>
    </>
  )
}
