import React from 'react'
import styles from '../../styles/Home.module.css'
import Image from 'next/image'
import { TbDiscount2 } from "react-icons/tb";
import { useRef, useState, useEffect } from "react";
import { useRouter } from 'next/router'
import { BASE_URL } from '../../Data/config'
import { FiCoffee, FiAward, FiAlertCircle } from "react-icons/fi";

import Skeleton from '@mui/material/Skeleton';
import Link from 'next/link'
const CoursesHomelist = () => {
    const router = useRouter()
    const [Retdata, setRetdata] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [OpenSnakbar, setOpenSnakbar] = useState(true);

    useEffect(() => {

        const handleSubmit = async () => {
            const dataid = '08c5th4rh86ht57h6g';
            const sendUM = { dataid }
            const data = await fetch("/api/List/AllTSlist", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(sendUM)
            }).then((a) => {
                return a.json();
            })
                .then((parsed) => {
                    // console.log(parsed)
                    setRetdata(parsed)
                    setIsLoading(false)
                })
        }
        handleSubmit()


    }, [router.query])
    return (
        <>
            {isLoading &&
                <div>
                    <div style={{ height: '20px' }}> </div>
                    <div className={styles.CourseListBox}>
                        <div className={styles.CourseGrid}>
                            <div className={styles.CourseItems}>
                                <div>
                                    <Skeleton variant="rectangular" height={150} />
                                </div>
                                <div className={styles.CourseItemsData}>
                                    <div className={styles.CourseItemstitlebox}>
                                        <span><Skeleton variant="rectangular" height={10} /></span>
                                        <div style={{ height: '10px' }}> </div>
                                        <Skeleton variant="rectangular" height={10} />
                                    </div>
                                    <div>
                                        <span><Skeleton variant="rectangular" height={30} width={100} /></span>
                                        <div style={{ height: '20px' }}> </div>

                                    </div>

                                    <div className={styles.coursestickerBoxFooter}>
                                        <Skeleton variant="rectangular" height={10} width={300} />
                                    </div>
                                </div>

                            </div>
                            <div className={styles.CourseItems}>
                                <div>
                                    <Skeleton variant="rectangular" height={150} />
                                </div>
                                <div className={styles.CourseItemsData}>
                                    <div className={styles.CourseItemstitlebox}>
                                        <span><Skeleton variant="rectangular" height={10} /></span>
                                        <div style={{ height: '10px' }}> </div>
                                        <Skeleton variant="rectangular" height={10} />
                                    </div>
                                    <div>
                                        <span><Skeleton variant="rectangular" height={30} width={100} /></span>
                                        <div style={{ height: '20px' }}> </div>

                                    </div>

                                    <div className={styles.coursestickerBoxFooter}>
                                        <Skeleton variant="rectangular" height={10} width={300} />
                                    </div>
                                </div>

                            </div>
                            <div className={styles.CourseItems}>
                                <div>
                                    <Skeleton variant="rectangular" height={150} />
                                </div>
                                <div className={styles.CourseItemsData}>
                                    <div className={styles.CourseItemstitlebox}>
                                        <span><Skeleton variant="rectangular" height={10} /></span>
                                        <div style={{ height: '10px' }}> </div>
                                        <Skeleton variant="rectangular" height={10} />
                                    </div>
                                    <div>
                                        <span><Skeleton variant="rectangular" height={30} width={100} /></span>
                                        <div style={{ height: '20px' }}> </div>

                                    </div>

                                    <div className={styles.coursestickerBoxFooter}>
                                        <Skeleton variant="rectangular" height={10} width={300} />
                                    </div>
                                </div>

                            </div>
                            <div className={styles.CourseItems}>
                                <div>
                                    <Skeleton variant="rectangular" height={150} />
                                </div>
                                <div className={styles.CourseItemsData}>
                                    <div className={styles.CourseItemstitlebox}>
                                        <span><Skeleton variant="rectangular" height={10} /></span>
                                        <div style={{ height: '10px' }}> </div>
                                        <Skeleton variant="rectangular" height={10} />
                                    </div>
                                    <div>
                                        <span><Skeleton variant="rectangular" height={30} width={100} /></span>
                                        <div style={{ height: '20px' }}> </div>

                                    </div>

                                    <div className={styles.coursestickerBoxFooter}>
                                        <Skeleton variant="rectangular" height={10} width={300} />
                                    </div>
                                </div>

                            </div>

                        </div>


                    </div>
                    <div style={{ height: '20px' }}> </div>
                </div>
            }
            {!isLoading &&
                <div>

                    <div style={{ height: '30px' }}> </div>
                    <div className={styles.CourseListBox}>
                        <div className={styles.CourseGrid}>
                            {Retdata.map((item) => {
                                return <Link href={`/TestSeries/${item.pid}`} key={item.id} style={{ textDecoration: 'none' }}>
                                    <div className={styles.CourseItems}>
                                        <div
                                            style={{
                                                position: "relative",
                                                width: "100%",
                                                height: "150px",
                                                backgroundColor: '#c5d6e3',
                                            }}
                                        >
                                            <Image src={`${BASE_URL}Storage/panel/img/${item.img}`} alt="Vercel Logo" layout='fill' />
                                        </div>

                                        <div className={styles.CourseItemsData}>
                                            <div className={styles.CourseItemstitlebox}>
                                                <span><b>{item.title}</b></span>
                                            </div>
                                            <div>
                                                {(item.isfree == 0)
                                                    ?
                                                    <span style={{ color: '#ffaf00', fontSize: '30px', fontWeight: 'bold' }}>₹{item.SalePrice}</span>
                                                    : <span style={{ color: '#ffaf00', fontSize: '30px', fontWeight: 'bold' }}>Free</span>
                                                }

                                                <del> ₹{item.MainPrice}</del>

                                            </div>
                                            <div className={styles.coursestickerBox}>
                                                <div className={styles.coursestickerItem}>
                                                    <div>
                                                        <FiAlertCircle />
                                                    </div>
                                                    <div className={styles.coursestickerItemtext}>
                                                        <span>{item.lang}</span>
                                                    </div>
                                                </div>
                                                <div className={styles.coursestickerItem}>
                                                    <div>
                                                        <FiAward />
                                                    </div>
                                                    <div className={styles.coursestickerItemtext}>
                                                        <span>{item.enrolled}+ Enrolled</span>
                                                    </div>
                                                </div>


                                            </div>
                                            <div className={styles.coursestickerBoxFooter}>
                                                <div className={styles.coursestickerBoxDiscountTag}>
                                                    <span><TbDiscount2 /></span>
                                                    {(item.isfree == 0)
                                                        ?
                                                        <small>Save Today ₹{item.MainPrice - item.SalePrice}</small>
                                                        : <small>Save Today ₹{item.MainPrice}</small>
                                                    }
                                                </div>
                                                <div className={styles.EnrollBtn}>
                                                    <span>Start</span>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </Link>
                            }

                            )}


                        </div>

                        {/* <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '15px' }}>
                            <div className={styles.LoadMoreBtn}>
                                <span>View More Courses</span>
                            </div>
                        </div> */}
                    </div>
                </div>

            }


        </>



    )
}

export default CoursesHomelist
