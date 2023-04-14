import React from 'react'
import AllCourselist from '../components/Lists/AllCourselist'
import styles from '../styles/Home.module.css'
import NavbarNew from '../components/Parts/NavbarNew'
import Head from 'next/head'
import { BASE_URL, AppName } from '../Data/config'
import Footermenu from '../components/Parts/Footermenu'
import CatList from '../components/Homepage/CatList'
const AllCourses = () => {
    return (
        <>
            <Head>
                <title>Courses : {AppName} Best Courses For CBSE, ICSE, JEE, NEET, CTET , STET</title>
                <meta name="description" content="Best Courses For CBSE, ICSE, JEE, NEET, CTET , STET" />
            </Head>
            <NavbarNew />
           
            <div className={styles.container} >
                <CatList />
            </div>
            <div className={styles.container} style={{ minHeight: '100vh' }}>
                <AllCourselist />
            </div>

            <Footermenu />
        </>
    )
}

export default AllCourses
