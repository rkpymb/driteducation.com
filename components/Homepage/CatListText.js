
import styles from '../../styles/Home.module.css'
import Image from 'next/image'
import React, { useRef, useState, useEffect } from "react";
import { useRouter } from 'next/router'
import { BASE_URL } from '../../Data/config'
import Skeleton from '@mui/material/Skeleton';
import Link from 'next/link';
const CategoriesList = () => {
    const router = useRouter()
    const [Retdata, setRetdata] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [OpenSnakbar, setOpenSnakbar] = useState(true);

    useEffect(() => {
        setIsLoading(true)
        const handleSubmit = async () => {
            const dataid = '08c5th4rh86ht57h6g';
            const sendUM = { dataid }
            const data = await fetch("/api/CategoriesListAll", {
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

        <>
            


            {!isLoading &&

                <div style={{padding:'0px'}}>

                    <div style={{ height: '20px' }}> </div>
                    <div className={styles.CatGridText}>
                        {Retdata.map((item) => {
                            return <Link href={`/category/${item.catid}`} style={{ textDecoration: 'none' }}>
                                <div className={styles.CatBoxItemCenterText}>
                                   
                                    <div>
                                        <span>{item.cattitle}</span>

                                    </div>
                                </div>
                            </Link>
                        }

                        )}

                       
                    </div>
                  
                </div>
            }

        </>
    )
}

export default CategoriesList