"use client"
import React, { useState } from "react"
import Box from "@mui/material/Box"
import Modal from "@mui/material/Modal"
import CloseIcon from "@mui/icons-material/Close"
import { Typography } from "@mui/material"
import modalcss from "../app/styles/modal.module.css"
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
  FacebookShareButton,
  InstapaperShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  WhatsappIcon,
} from "next-share"
import { EmailShareButton, EmailIcon } from "next-share"
import { PinterestShareButton, PinterestIcon } from "next-share"

import { CopyToClipboard } from "react-copy-to-clipboard"
// import { baseUrl } from "@/app/config"
// import { useRouter, usePathname, useSearchParams } from "next/navigation"
// import Link from "next/link"

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  bgcolor: "background.paper",
  border: "1px solid #fff",
  boxShadow: 24,
  p: 4,
}

export default function ContentModal({ open, setOpen, title, url }) {
  const [copied, setCopied] = useState("")
  // const pathname = usePathname()
  // const searchParams = useSearchParams()
  // const router = useRouter()
  // console.log(pathname, searchParams, router)
  const base = window.location.origin
  const urlTitle = title.replace(/\s/g, "-").toLowerCase()
  const shareUrl = `${base}/${url}/${urlTitle}`
  return (
    <div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography style={{ marginBottom: "20px" }}>
            Share :
            <CloseIcon
              style={{
                clear: "both",
                position: "absolute",
                clear: "both",
                right: "25px",
                cursor: "pointer",
                color: "gray",
              }}
              onClick={() => setOpen(false)}
            />
          </Typography>

          <FacebookShareButton
            url={shareUrl}
            hashtag={"#title"}
            style={{ margin: "0px 8px" }}
            quote={title}
          >
            <FacebookIcon size={32} round />
          </FacebookShareButton>
          <TwitterShareButton
            url={shareUrl}
            style={{ margin: "0px 8px" }}
            title={title}
          >
            <TwitterIcon size={32} round />
          </TwitterShareButton>

          <PinterestShareButton
            url={shareUrl}
            media={title}
            style={{ margin: "0px 8px" }}
          >
            <PinterestIcon size={32} round />
          </PinterestShareButton>

          <LinkedinShareButton url={shareUrl} style={{ margin: "0px 8px" }}>
            <LinkedinIcon size={32} round />
          </LinkedinShareButton>
          <WhatsappShareButton
            url={shareUrl}
            style={{ margin: "0px 8px" }}
            title={title}
            separator=":: "
          >
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>

          {/* <EmailShareButton
            url={`${base} / ${url} / ${title}`}
            subject={"share Liknk"}
            body={title}
            style={{ margin: "0px 8px" }}
          >
            <EmailIcon size={32} round />
          </EmailShareButton> */}
          <div className={modalcss.shareBox}>
            <div>
              <p>Share this link</p>
              <p className={modalcss.link}>{shareUrl}</p>
            </div>
            <CopyToClipboard text={shareUrl} onCopy={() => setCopied(true)}>
              <div>
                <button className={modalcss.button}>
                  {copied ? "copied" : "Copy URL"}
                </button>
              </div>
            </CopyToClipboard>
          </div>
          {/* {copied ? (
            <span
              style={{
                color: "#0e4081",
                position: "absolute",
                bottom: 0,
                right: "6px",
                fontSize: "12px",
                fontWeight: "600",
              }}
            >
              copied.
            </span>
          ) : (
            " "
          )} */}
        </Box>
      </Modal>
    </div>
  )
}
