import React from "react"
import Head from "next/head"
import { Heading } from "@/components/Heading"
import { Footer } from "@/components/Footer"
const Error = () => {
  let HeadView = (
    <Head>
      <title>404 - Demo </title>
      <meta name="description" content="Demo" />
      <meta name="keywords" content="Demo" />
    </Head>
  )

  return (
    <>
      {HeadView}
      <Heading />
      <div className="pgnf">Page not found</div>
      <Footer />
    </>
  )
}
export default Error
