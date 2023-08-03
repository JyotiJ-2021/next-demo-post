"use client"
import React, { useState } from "react"
import Image from "next/image"
import styles from "../app/styles/page.module.css"
import Link from "next/link"
import navStyle from "../app/styles/nav.module.css"
import MenuIcon from "@mui/icons-material/Menu"
import { Divider, Drawer } from "@mui/material"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemText from "@mui/material/ListItemText"
import CloseIcon from "@mui/icons-material/Close"
import Popover from "@mui/material/Popover"
import Typography from "@mui/material/Typography"
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"

export const Navbar = () => {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  })

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return
    }

    setState({ ...state, [anchor]: open })
  }
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? "simple-popover" : undefined

  return (
    <>
      <div className={styles.description}>
        <nav className={navStyle.navbar}>
          <ul className={navStyle.navbars__item}>
            <li className={navStyle.navbar__item}>
              <Link href="/videos">Videos</Link>
            </li>
            <li className={navStyle.navbar__item}>
              <Link href="/courses"> Courses</Link>
            </li>
            <li className={navStyle.navbar__item}>
              <Link href="/books">Books</Link>
            </li>
            <li className={navStyle.navbar__item} onClick={handleClick}>
              <Link href="/creators">
                Creators <ArrowDropDownIcon />
              </Link>
            </li>
          </ul>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            className={navStyle.poppers}
          >
            <Typography className={navStyle.inner_item}>
              <Link href="/creators"> Creator 1</Link>
            </Typography>
            <Divider />
            <Typography className={navStyle.inner_item}>
              <Link href="/creators"> Creator 2</Link>
            </Typography>
            <Divider />
            <Typography className={navStyle.inner_item}>
              <Link href="/creators"> Creator 3</Link>
            </Typography>
            <Divider />
          </Popover>
        </nav>

        <div>
          <Link href="/">
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className={styles.vercelLogo}
              width={100}
              height={24}
              priority
            />
          </Link>
        </div>
      </div>
      {/**mobile view */}
      <div className={navStyle.mb__navbar}>
        <Link href="/">
          <Image
            src="/vercel.svg"
            alt="Vercel Logo"
            className={styles.vercelLogo}
            width={100}
            height={24}
            priority
          />
        </Link>

        {["top"].map((anchor) => (
          <React.Fragment key={anchor}>
            <MenuIcon
              onClick={toggleDrawer(anchor, true)}
              className={navStyle.mb__navbarmenu}
            />

            <Drawer
              anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
            >
              <div style={{ marginTop: "20px", textAlign: "center" }}>
                <Link href="/">
                  <Image
                    src="/vercel.svg"
                    alt="Vercel Logo"
                    className={styles.vercelLogo}
                    width={100}
                    height={24}
                    priority
                  />
                </Link>
              </div>
              <CloseIcon
                onClick={toggleDrawer(anchor, false)}
                className={navStyle.closeIcon}
              />
              <List>
                <ListItem disablePadding>
                  <Link href="/videos">
                    <ListItemButton>
                      <ListItemText primary={"Videos"} />
                    </ListItemButton>
                  </Link>
                </ListItem>
                <ListItem disablePadding>
                  <Link href="/courses">
                    <ListItemButton>
                      <ListItemText primary={"Courses"} />
                    </ListItemButton>
                  </Link>
                </ListItem>
                <ListItem disablePadding>
                  <Link href="/books">
                    <ListItemButton>
                      <ListItemText primary={"Books"} />
                    </ListItemButton>
                  </Link>
                </ListItem>
                <ListItem
                  disablePadding
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                  }}
                >
                  <Link href="/creators">
                    <ListItemButton>
                      <ListItemText primary={"Creators"} />
                    </ListItemButton>
                  </Link>
                  <Typography className={navStyle.inner_item}>
                    <Link href="/creators"> Creator 1</Link>
                  </Typography>

                  <Typography className={navStyle.inner_item}>
                    <Link href="/creators"> Creator 2</Link>
                  </Typography>

                  <Typography className={navStyle.inner_item}>
                    <Link href="/creators"> Creator 3</Link>
                  </Typography>
                </ListItem>
              </List>
            </Drawer>
          </React.Fragment>
        ))}
      </div>
    </>
  )
}
