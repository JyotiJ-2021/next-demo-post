import styles from "../app/styles/page.module.css"
import { Navbar } from "@/components/Navbar"
import { Heading } from "@/components/Heading"
import { Content } from "@/components/Content"
import { Courses } from "@/components/Courses"
import Video from "@/components/Video"
import { Book } from "@/components/Book"
import { Footer } from "@/components/Footer"

export default function Home() {
  return (
    <>
      <main className={styles.main}>
        <Navbar />
        <Heading />

        <Content />
        <Video />
        <Courses />
        <Book />
      </main>
      <Footer />
    </>
  )
}
