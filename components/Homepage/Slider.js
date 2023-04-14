import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import styles from '../../styles/Home.module.css'

import Link from 'next/link'
// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";

export default function App() {
    return (
        <>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className={styles.HeroSlider}
            >
                <SwiperSlide>
                    <Link href={`/Category/JEE`} style={{ textDecoration: 'none' }}>
                        <div className={styles.HeroSliderIMg}>
                            <img src={'https://server.supermarks.in/Storage/panel/img/posert11.jpg'} />
                        </div>
                    </Link>
                </SwiperSlide>
                <SwiperSlide>
                    <Link href={`/Category/CTET`}  style={{ textDecoration: 'none' }}>
                    <div className={styles.HeroSliderIMg}>
                            <img src={'https://server.supermarks.in/Storage/panel/img/poster2im.jpg'} />
                        </div>
                    </Link>
                </SwiperSlide>
               
               
               
                
            </Swiper>
        </>
    );
}
