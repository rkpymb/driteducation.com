import Link from 'next/link'
import styles from '../../styles/Home.module.css'

import { CgFeed } from "react-icons/cg";
import { TbSchool } from "react-icons/tb";
import { TbNotes } from "react-icons/tb";
import { GrCircleQuestion } from "react-icons/gr";
const Footermenu = () => {
    return (
        <>
            {/* mobile nav bar */}
            <div className={styles.mob_footer_menu}>

                <div className={styles.mob_footer_menu_items}>
                    <Link href="/AllCourses" style={{ textDecoration: 'none' }}>
                        <div className={styles.footer_menu_btn}>
                            <div className={styles.mobmenu_icon}>
                                <TbSchool />
                            </div>
                            <div className={styles.mobmenu_txt}>
                                Courses
                            </div>
                        </div>
                    </Link>
                    <Link href="/AllTestSeries" style={{ textDecoration: 'none' }}>
                        <div className={styles.footer_menu_btn}>
                            <div className={styles.mobmenu_icon}>
                                <CgFeed />
                            </div>
                            <div className={styles.mobmenu_txt}>
                                Test Series
                            </div>
                        </div>
                    </Link>
                    <Link href="https://ai-chatgpt-1.vercel.app/" style={{ textDecoration: 'none' }}>
                        <div className={styles.footer_menu_btn}>
                            <div className={styles.mobmenu_icon}>
                                <GrCircleQuestion />
                            </div>
                            <div className={styles.mobmenu_txt}>
                                Ask Doubts
                            </div>
                        </div>
                    </Link>
                   
                    <Link href="/" style={{ textDecoration: 'none' }}>
                        <div className={styles.footer_menu_btn}>
                            <div className={styles.mobmenu_icon}>
                                <TbNotes />
                            </div>
                            <div className={styles.mobmenu_txt}>
                                Materials
                            </div>
                        </div>
                    </Link>
                </div>

            </div>
            {/* mobile nav bar end*/}
        </>
    )
}

export default Footermenu