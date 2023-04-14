import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import styles from '../../styles/Home.module.css'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import TSCheckout from '../../components/Checkout/TSCheckout'
import TSChekoutFree from '../../components/Checkout/TSChekoutFree'
import CourseData from '../../components/Box/CourseData'
import Marquee from "react-fast-marquee";
import { BASE_URL, AppName } from '../../Data/config'
import Skeleton from '@mui/material/Skeleton';
import { BiCheckCircle } from "react-icons/bi";
import { FiUsers, FiChevronRight, FiClock } from "react-icons/fi";
import { TbDiscount2 } from "react-icons/tb";
import NavbarNew from '../../components/Parts/NavbarNew'
import { blue } from '@mui/material/colors';

const isServerReq = req => !req.url.startsWith('/_next');

export async function getServerSideProps(context) {
    const DataSlug = context.query.pageno[0];
    const KEY = process.env.MYKEY

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ DataSlug: DataSlug, updatekey: KEY })
    };
    const response = await fetch(`${process.env.API_URL}Website/TestSeries/TSData.php`, requestOptions);
    const CourseFullData = await response.json();

    return {

        props: { CourseFullData }, // will be passed to the page component as props
    }

}


const Slug = (CourseFullData) => {
    // console.log(CourseFullData.CourseFullData.RetData)
    const router = useRouter();
    const [CourseRetData, setCourseRetData] = useState(CourseFullData.CourseFullData.RetData);
    const [CourseHtml, setCourseHtml] = useState(CourseFullData.CourseFullData.CourseHtml);

    const [CourseID, setCourseID] = useState(CourseFullData.CourseFullData.RetData.pid);
    const [isLoading, setIsLoading] = useState(true);
 

    useEffect(() => {
        // Check login
        try {
            if (localStorage.getItem('userid')) {
                setIsLoading(false)


            } else {
                router.push('/Login')
            }
        } catch (error) {
            console.error(error)

        }
    }, [router.query]);

   
   
    return <div>
        <NavbarNew />
        <Head>
            <title>{CourseRetData && CourseRetData.title} Enroll Now</title>
            <meta name="description" content={CourseRetData && CourseRetData.title} />
            <meta property="og:image" content={`${BASE_URL}Storage/panel/img/${CourseRetData && CourseRetData.img}`} />
            <link rel="icon" href="../logo/feviimg.svg" />
        </Head>


        {!isLoading &&

            <div>


                {CourseRetData.isfree == 1 &&
                    <div className={styles.SaveTodayBoxCourse}>
                        <div className={styles.SaveTodayBoxCourseA}>
                            <TbDiscount2 />
                        </div>
                        <div className={styles.SaveTodayBoxCourseB}>
                            <b>₹{CourseRetData.MainPrice}</b> Discount, Enroll for Free offer valid for Today only.
                        </div>
                    </div>
                }
                {CourseRetData.isfree == 0 &&
                    <div className={styles.SaveTodayBoxCourse}>
                        <div className={styles.SaveTodayBoxCourseA}>
                            <TbDiscount2 />
                        </div>
                        <div className={styles.SaveTodayBoxCourseB}>
                            <b>₹{CourseRetData.MainPrice - CourseRetData.SalePrice}</b> Discount, Offer valid for Today only.
                        </div>
                    </div>
                }

            </div>


        }

        <div className={styles.CourseBox_container} >
            <div className={styles.CourseBox_container_A} >

                {isLoading &&

                    <div className={styles.CoursePageSkelton}>
                        <div style={{ height: '20px' }}></div>
                        <Skeleton variant="rectangular" height={10} className={styles.CoursePageSkeltonItem} />
                        <Skeleton variant="rectangular" height={10} className={styles.CoursePageSkeltonItem} />
                        <Skeleton variant="rectangular" height={10} width={200} className={styles.CoursePageSkeltonItem} />

                    </div>
                }
                {!isLoading &&

                    <div className={styles.OnlyDesktop}>
                        <div style={{ height: '20px' }}></div>
                        <h1 style={{ margin: 0, }}>{CourseRetData && CourseRetData.title}</h1>
                    </div>
                }

                {isLoading &&

                    <div className={styles.CoursePageSkelton}>
                        <div style={{ height: '20px' }}></div>
                        <Skeleton variant="rectangular" height={20} width={300} className={styles.CoursePageSkeltonItem} />
                        <div style={{ height: '10px' }}></div>
                        <Skeleton variant="rectangular" height={10} className={styles.CoursePageSkeltonItem} />
                        <Skeleton variant="rectangular" height={10} className={styles.CoursePageSkeltonItem} />
                        <Skeleton variant="rectangular" height={10} className={styles.CoursePageSkeltonItem} />
                        <Skeleton variant="rectangular" height={10} className={styles.CoursePageSkeltonItem} />
                        <Skeleton variant="rectangular" height={10} className={styles.CoursePageSkeltonItem} />
                        <Skeleton variant="rectangular" height={10} className={styles.CoursePageSkeltonItem} />
                        <Skeleton variant="rectangular" height={10} className={styles.CoursePageSkeltonItem} />
                        <Skeleton variant="rectangular" height={10} className={styles.CoursePageSkeltonItem} />
                        <Skeleton variant="rectangular" height={10} className={styles.CoursePageSkeltonItem} />
                        <Skeleton variant="rectangular" height={10} className={styles.CoursePageSkeltonItem} />


                    </div>
                }
                {!isLoading &&
                    <div style={{ padding: '5px' }}>
                        <div style={{ height: '10px' }}></div>
                        <div>
                            <span style={{ fontWeight: 'bold' }}>Test Series overview:</span>
                            <div style={{ height: '5px' }}></div>
                        </div>
                        <div>

                            <CourseData CourseHtml={CourseHtml} />
                        </div>

                    </div>
                }
                {isLoading &&

                    <div className={styles.CoursePageSkelton}>
                        <div style={{ height: '20px' }}></div>
                        <Skeleton variant="rectangular" height={20} width={300} className={styles.CoursePageSkeltonItem} />
                        <div style={{ height: '10px' }}></div>
                        <Skeleton variant="rectangular" height={10} className={styles.CoursePageSkeltonItem} />
                        <Skeleton variant="rectangular" height={10} className={styles.CoursePageSkeltonItem} />
                        <Skeleton variant="rectangular" height={10} className={styles.CoursePageSkeltonItem} />
                        <Skeleton variant="rectangular" height={10} className={styles.CoursePageSkeltonItem} />
                        <Skeleton variant="rectangular" height={10} className={styles.CoursePageSkeltonItem} />
                        <Skeleton variant="rectangular" height={10} className={styles.CoursePageSkeltonItem} />
                        <Skeleton variant="rectangular" height={10} className={styles.CoursePageSkeltonItem} />
                        <Skeleton variant="rectangular" height={10} className={styles.CoursePageSkeltonItem} />
                        <Skeleton variant="rectangular" height={10} className={styles.CoursePageSkeltonItem} />
                        <Skeleton variant="rectangular" height={10} className={styles.CoursePageSkeltonItem} />


                    </div>
                }
               
                {!isLoading &&
                    <div style={{ padding: '5px' }}>
                        <div style={{ height: '10px' }}></div>
                        <div>
                            <span style={{ fontWeight: 'bold' }}>Terms & Conditions:</span>
                            <div style={{ height: '10px' }}></div>
                        </div>
                        <div> 1. This Test Series can be purchased both from the official website and the App.</div>
                        <div> 2. for best user experience needs to download and sign up/login into the {AppName} App to access any kind of study material like Live/Recorded lectures, PDF Notes, Test Series, or any other kind of Study Material.</div>
                        <div> 3. Any content related to the Test Series accessible on the App and website.</div>
                        <div style={{ height: '100px' }}></div>
                    </div>
                }
                <div>

                </div>

            </div>
            <div className={styles.CourseBox_container_B} >
                {isLoading &&

                    <div className={styles.CoursePageSkelton}>
                        <div style={{ height: '20px' }}></div>
                        <Skeleton variant="rectangular" height={250} className={styles.CoursePageSkeltonItem} />
                        <div style={{ height: '20px' }}></div>
                        <Skeleton variant="rectangular" height={50} width={100} className={styles.CoursePageSkeltonItem} />
                        <div style={{ height: '15px' }}></div>
                        <Skeleton variant="rectangular" height={10} width={300} className={styles.CoursePageSkeltonItem} />
                        <div style={{ height: '15px' }}></div>
                        <Skeleton variant="rectangular" height={10} width={300} className={styles.CoursePageSkeltonItem} />
                        <div style={{ height: '15px' }}></div>
                        <Skeleton variant="rectangular" height={10} width={300} className={styles.CoursePageSkeltonItem} />
                        <div style={{ height: '15px' }}></div>
                        <Skeleton variant="rectangular" height={10} width={300} className={styles.CoursePageSkeltonItem} />

                        <div style={{ height: '50px' }}></div>
                        <Skeleton variant="rectangular" height={50} className={styles.CoursePageSkeltonItem} />



                    </div>
                }
                {!isLoading &&

                    <div>

                        <div>
                            <img src={`${BASE_URL}Storage/panel/img/${CourseRetData && CourseRetData.img}`} className={styles.CoverBoxPosterIMG} />
                        </div>
                        <div className={styles.OnlyMobile}>
                            <h3 style={{ margin: 0 }}>{CourseRetData && CourseRetData.title}</h3>
                        </div>
                        <div className={styles.CourseBox_container_BDataBox}>
                            <div>

                            </div>

                            <div className={styles.OnlyDesktop}>

                                {CourseRetData.isfree == 1 &&
                                    <div className={styles.OnlyDesktop}>
                                        <span style={{ color: '#ffaf00', fontSize: '30px', fontWeight: 'bold' }}>Free</span>
                                        <del> ₹{CourseRetData.MainPrice}</del>
                                    </div>
                                }
                                {CourseRetData.isfree == 0 &&
                                    <div className={styles.OnlyDesktop}>
                                        <span style={{ color: '#ffaf00', fontSize: '30px', fontWeight: 'bold' }}>₹{CourseRetData.SalePrice}</span>
                                        <del> ₹{CourseRetData.MainPrice}</del>
                                    </div>
                                }

                            </div>
                            <div>
                                <div className={styles.CourseBox_IconTextBox}>
                                    <div className={styles.CourseBox_IconTextBoxA}>
                                        <BiCheckCircle />
                                    </div>
                                    <div className={styles.CourseBox_IconTextBoxB}>
                                        <span>{CourseRetData.tagline}</span>
                                    </div>
                                </div>
                                <div className={styles.CourseBox_IconTextBox}>
                                    <div className={styles.CourseBox_IconTextBoxA}>
                                        <FiUsers />
                                    </div>
                                    <div className={styles.CourseBox_IconTextBoxB}>
                                        <span>{CourseRetData.enrolled} + enrolled</span>
                                    </div>
                                </div>
                                <div className={styles.CourseBox_IconTextBox}>
                                    <div className={styles.CourseBox_IconTextBoxA}>
                                        <BiCheckCircle />
                                    </div>
                                    <div className={styles.CourseBox_IconTextBoxB}>
                                        <span>{CourseRetData.taglinetwo} </span>
                                    </div>
                                </div>
                                <div className={styles.CourseBox_IconTextBox}>
                                    <div className={styles.CourseBox_IconTextBoxA}>
                                        <FiClock />
                                    </div>
                                    <div className={styles.CourseBox_IconTextBoxB}>
                                        <span>{CourseRetData.Validity} days Validity</span>
                                    </div>
                                </div>
                            </div>

                            {CourseRetData.isfree == 1 &&
                                <div className={styles.OnlyDesktop}>
                                    <TSChekoutFree DataCourse={CourseFullData.CourseFullData.RetData} />
                                </div>
                            }
                            {CourseRetData.isfree == 0 &&
                                <div className={styles.OnlyDesktop}>
                                    <TSCheckout DataCourse={CourseFullData.CourseFullData.RetData} />
                                </div>
                            }
                        </div>
                    </div>
                }


            </div>

        </div>

        <div className={styles.FootermobileBtnCourse}>
            {!isLoading &&
                <div className={styles.FootermobileBtnCourseBox}>
                    <div className={styles.FootermobileBtnCourseBoxPrice}>
                        <div>
                            <small>Course Price :</small>
                        </div>
                        <span style={{ color: '#ffaf00', fontSize: '30px', fontWeight: 'bold' }}>₹{CourseRetData.SalePrice}</span>
                        <del> ₹{CourseRetData.MainPrice}</del>
                    </div>
                    <div>
                        {CourseRetData.isfree == 1 &&
                            <TSChekoutFree DataCourse={CourseFullData.CourseFullData.RetData} />
                        }
                        {CourseRetData.isfree == 0 &&
                            <TSCheckout DataCourse={CourseFullData.CourseFullData.RetData} />
                        }

                    </div>


                </div>
            }

        </div>

    </div>
};




export default Slug;