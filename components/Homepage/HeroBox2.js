import React from 'react'
import styles from '../../styles/Home.module.css'
import { BASE_URL, AppName } from '../../Data/config'
import Link from 'next/link';
import Image from 'next/image'
import * as animationData from '../../Data/Lottie/87666-female-character-walking.json'
import * as animationData2 from '../../Data/Lottie/48726-student.json'
import * as animationData3 from '../../Data/Lottie/41240-student.json'
const HeroBox2 = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    }
    const defaultOptions2 = {
        loop: true,
        autoplay: true,
        animationData: animationData2,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    }
    const defaultOptions3 = {
        loop: true,
        autoplay: true,
        animationData: animationData3,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    }
    return (
        <div className={styles.container}>
            <div className={styles.dataspacer}> </div>
            <div className={styles.centeritem} >
                <div><h1 style={{ margin: '10px' }}>Prepare to Crack Your Exams with <span style={{color:'blue'}}>100% Guarantee*</span> </h1></div>
                <div> <span>We can assure you 100% about our programme and our ability to get you succeeded 👍</span></div>
                <div> <span>{AppName} is the best of the best edu portal for aspirant those who dreams for IIT, NIT, NEET, SSC, Banking, Railways, Class 9, Class 10 and Intermediate.</span></div>
            </div>
            <div className={styles.dataspacer}> </div>

            <div className={styles.HeroBox2}>
                <div className={styles.HeroBox2A}>
                    <div>
                        <div className={styles.FeaturesItem}>
                            <div className={styles.FeaturesItemImg}>
                                <Image
                                    src={`${BASE_URL}Storage/img/yes.png`}
                                    alt="Picture of the author"
                                    width={20}
                                    height={20}
                                />
                            </div>
                            <div className={styles.FeaturesItemText}>
                                <span>Topic-wise Live and Recorded Classes</span>
                            </div>
                        </div>
                        <div className={styles.FeaturesItem}>
                            <div className={styles.FeaturesItemImg}>
                                <Image
                                    src={`${BASE_URL}Storage/img/yes.png`}
                                    alt="Picture of the author"
                                    width={20}
                                    height={20}
                                />
                            </div>
                            <div className={styles.FeaturesItemText}>
                                <span>Live Doubt Solving Sessions</span>
                            </div>
                        </div>
                        <div className={styles.FeaturesItem}>
                            <div className={styles.FeaturesItemImg}>
                                <Image
                                    src={`${BASE_URL}Storage/img/yes.png`}
                                    alt="Picture of the author"
                                    width={20}
                                    height={20}
                                />
                            </div>
                            <div className={styles.FeaturesItemText}>
                                <span>Exam-wise Unlimited Test Series</span>
                            </div>
                        </div>
                        <div className={styles.FeaturesItem}>
                            <div className={styles.FeaturesItemImg}>
                                <Image
                                    src={`${BASE_URL}Storage/img/yes.png`}
                                    alt="Picture of the author"
                                    width={20}
                                    height={20}
                                />
                            </div>
                            <div className={styles.FeaturesItemText}>
                                <span>Structured And Targeted Study Material</span>
                            </div>
                        </div>
                        <div className={styles.FeaturesItem}>
                            <div className={styles.FeaturesItemImg}>
                                <Image
                                    src={`${BASE_URL}Storage/img/yes.png`}
                                    alt="Picture of the author"
                                    width={20}
                                    height={20}
                                />
                            </div>
                            <div className={styles.FeaturesItemText}>
                                <span>Tests On Regular Basis For Progress Tracking</span>
                            </div>
                        </div>
                       
                        <div className={styles.FeaturesItem}>
                            <div className={styles.FeaturesItemImg}>
                                <Image
                                    src={`${BASE_URL}Storage/img/yes.png`}
                                    alt="Picture of the author"
                                    width={20}
                                    height={20}
                                />
                            </div>
                            <div className={styles.FeaturesItemText}>
                                <span>Previous Year Practice Set With Solution</span>
                            </div>
                        </div>
                        <div className={styles.FeaturesItem}>
                            <div className={styles.FeaturesItemImg}>
                                <Image
                                    src={`${BASE_URL}Storage/img/yes.png`}
                                    alt="Picture of the author"
                                    width={20}
                                    height={20}
                                />
                            </div>
                            <div className={styles.FeaturesItemText}>
                                <span>Dedicated Educator for Doubts Clear</span>
                            </div>
                        </div>
                        <div className={styles.FeaturesItem}>
                            <div className={styles.FeaturesItemImg}>
                                <Image
                                    src={`${BASE_URL}Storage/img/yes.png`}
                                    alt="Picture of the author"
                                    width={20}
                                    height={20}
                                />
                            </div>
                            <div className={styles.FeaturesItemText}>
                                <span>ASK Doubt with SM AI and get Solutions instantly</span>
                            </div>
                        </div>
                        <div className={styles.FeaturesItem}>
                            <div className={styles.FeaturesItemImg}>
                                <Image
                                    src={`${BASE_URL}Storage/img/yes.png`}
                                    alt="Picture of the author"
                                    width={20}
                                    height={20}
                                />
                            </div>
                            <div className={styles.FeaturesItemText}>
                                <span>24*7 Help & Support </span>
                            </div>
                        </div>
                        <div style={{ height: '20px' }}> </div>
                        <Link href='/AllCourses' style={{ textDecoration: 'none' }}>
                            <div className={styles.GetStartedBTN}>
                                <span>Get Started Today</span>
                            </div>
                        </Link>
                        <div style={{ height: '20px' }}> </div>
                    </div>
                  
                </div>
                <div className={styles.HeroBox2B}>
                    <img src='https://server.supermarks.in/Storage/img/imgss.png' />
                </div>
            </div>
           
            <div className={styles.dataspacer}> </div>
        </div>


    )
}

export default HeroBox2
