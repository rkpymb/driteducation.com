import Head from 'next/head'

import styles from '../styles/Home.module.css'
import HeroboxNew from '../components/Homepage/HeroboxNew'
import Footer from '../components/Footer'
import HeroBox2 from '../components/Homepage/HeroBox2'
import NavbarNew from '../components/Parts/NavbarNew'

import CoursesHomelist from '../components/Homepage/CoursesHomelist'
import TestHomelist from '../components/Homepage/TestHomelist'
import Footermenu from '../components/Parts/Footermenu'
import { BASE_URL, AppName } from '../Data/config'
import WhyChoose from '../components/Homepage/WhyChoose'
import AppHeroBox from '../components/Homepage/AppHeroBox'
import ReviewBox from '../components/Homepage/ReviewBox'
import { useState, useEffect } from 'react';
export default function Home() {

  return (
    <><NavbarNew />
      <Head>
        <title>{AppName} : Online Courses - Best Classes and Test Series For CBSE, ICSE, JEE &amp; NEET</title>
        <meta name="description" content="Online Courses - Best Classes and Test Series For CBSE, ICSE, JEE &amp; NEET" />
      </Head>

      <HeroboxNew />
      <div className={styles.dataspacer}> </div>
      <div className={styles.container_full} style={{ backgroundColor: '#efecff' }}>
        <HeroBox2 />
      </div>

      <div className={styles.dataspacer}> </div>
      <div className={styles.container} >
        <CoursesHomelist />
      </div>

      <div style={{ height: '50px' }}> </div>
      <div className={styles.container_full} style={{ backgroundColor: '#1d75bd' }}>
        <div className={styles.container} >
          <WhyChoose />
        </div>
      </div>
      <div style={{ height: '50px' }}> </div>
      <div className={styles.container_full} style={{ backgroundColor: 'white'}}>
        <div className={styles.container} >
          <ReviewBox />
        </div>
      </div>
      <div style={{ height: '50px' }}> </div>
     
      <div className={styles.container_full} style={{ backgroundColor: '#f1f3f5' }}>
        <div className={styles.container} >
          <TestHomelist />
          <div style={{ height: '50px' }}> </div>
        </div>
      </div>

      <div style={{ height: '30px' }}> </div>
      <div className={styles.container_full} style={{ backgroundColor: 'white' }}>
        <div className={styles.container} >
          <AppHeroBox />
        </div>
      </div>
      
      
      <div style={{ height: '100px' }}> </div>
      <div className={styles.container_full} style={{ backgroundColor: '#232323' }} >
        <Footer />
      </div>
      <Footermenu />
    </>

  )
}
