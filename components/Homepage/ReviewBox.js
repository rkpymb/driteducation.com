// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image'
// Import Swiper styles
import 'swiper/css';
import styles from '../../styles/Home.module.css'
import React, { useRef, useState, useEffect } from "react";
import { useRouter } from 'next/router'
import { BASE_URL } from '../../Data/config'
import Skeleton from '@mui/material/Skeleton';
import { ImQuotesLeft } from "react-icons/im";
import Link from 'next/link';
import { Autoplay, Pagination, Navigation } from "swiper";
export default () => {

    const router = useRouter()
    const [Retdata, setRetdata] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [OpenSnakbar, setOpenSnakbar] = useState(true);

    useEffect(() => {
        setIsLoading(true)
        const handleSubmit = async () => {
            const dataid = '08c5th4rh86ht57h6g';
            const sendUM = { dataid }
            const data = await fetch("/api/List/AllReviews", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(sendUM)
            }).then((a) => {
                return a.json();
            })
                .then((parsed) => {

                    setRetdata(parsed)
                    setIsLoading(false)
                })
        }
        handleSubmit()


    }, [router.query])

    return (
        <div>
            {isLoading &&
                <div>
                    <div style={{ height: '20px' }}> </div>
                    <div className={styles.CourseListBox}>
                        <div className={styles.CourseGrid}>
                            <div style={{padding:'10px'}}>
                                <div>
                                    <Skeleton variant="rectangular" height={250} />
                                </div>
                                <div style={{ height: '20px' }}> </div>
                                <div>
                                    <Skeleton variant="rectangular" height={20} />
                                </div>
                                

                            </div>
                            <div style={{padding:'10px'}}>
                                <div>
                                    <Skeleton variant="rectangular" height={250} />
                                </div>
                                <div style={{ height: '20px' }}> </div>
                                <div>
                                    <Skeleton variant="rectangular" height={20} />
                                </div>
                                

                            </div>
                            <div style={{padding:'10px'}}>
                                <div>
                                    <Skeleton variant="rectangular" height={250} />
                                </div>
                                <div style={{ height: '20px' }}> </div>
                                <div>
                                    <Skeleton variant="rectangular" height={20} />
                                </div>
                                

                            </div>
                            <div style={{padding:'10px'}}>
                                <div>
                                    <Skeleton variant="rectangular" height={250} />
                                </div>
                                <div style={{ height: '20px' }}> </div>
                                <div>
                                    <Skeleton variant="rectangular" height={20} />
                                </div>
                                

                            </div>
                            

                        </div>


                    </div>
                    <div style={{ height: '20px' }}> </div>
                </div>
            }
            {!isLoading &&
                <div>
                    <div className={styles.TitleBoxBtn}>
                        <div className={styles.TitleBoxBtn_TEXT}>
                            <span>Testimonials 🤩</span>
                        </div>
                        {/* <div className={styles.TitleBoxBtn_BTN}>
                            <Link href='Categories' style={{ textDecoration: 'none' }}>
                                <span>view all</span>
                            </Link>
                        </div> */}
                    </div>
                    <div style={{ padding: '10px' }}>
                        <Swiper
                            spaceBetween={10}
                            slidesPerView={2}
                            onSlideChange={() => console.log('slide change')}
                            onSwiper={(swiper) => console.log(swiper)}

                            autoplay={{
                                delay: 2500,
                                disableOnInteraction: false,
                            }}
                            pagination={{
                                clickable: true,
                            }}
                            navigation={true}
                            modules={[Autoplay, Navigation]}

                            breakpoints={{
                                576: {
                                    // width: 576,
                                    slidesPerView: 2,
                                },
                                768: {
                                    // width: 768,
                                    slidesPerView: 5,
                                },
                            }}

                        >
                            {Retdata.map((item) => {
                                return <SwiperSlide>
                                    <div className={styles.ReviewItem}>
                                        <div className={styles.ReviewItemBox}>
                                            <div className={styles.ReviewItemBoxA}>
                                                <ImQuotesLeft />
                                            </div>
                                            <div className={styles.ReviewItemBoxB}>
                                                <div className={styles.ReviewText}>
                                                    <small>
                                                        {item.textdata}
                                                    </small>
                                                </div>
                                                <div>
                                                    <small style={{ color: 'red' }}>
                                                        ... read more
                                                    </small>
                                                </div>
                                                <div style={{ minHeight: '10px' }}></div>
                                                <div className={styles.Namebox}>
                                                    <span>{item.name}</span>
                                                </div>
                                                <div className={styles.StartBox}>
                                                    <span>{item.stars}</span> <small>Stars</small>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>

                            }

                            )}

                        </Swiper>
                    </div>
                </div>

            }

        </div>
    );
};