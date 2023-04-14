import { useState, useEffect, useContext } from 'react';

import CheckloginContext from '../../context/auth/CheckloginContext'
import styles from '../../styles/Home.module.css'
import { AiOutlineLogin } from 'react-icons/ai';

import { IoIosCall } from "react-icons/io";
import { GrPowerShutdown } from "react-icons/gr";
import Link from 'next/link';
import { ShortAbout, AppName, SocialHandles, Contactinfo, DomainURL } from '../../Data/config'
const Navbar = (props) => {
  const Contextdata = useContext(CheckloginContext)
  return (
    <div className={styles.navbarBox}>
      <div className={styles.Navbar}>
        <div className={styles.NavA}>
          <div className={styles.logo}>
            <Link href='/'>
              <div className={styles.logomain}>
                <img src='/logo/logomain.png' alt='logo' className={styles.NavLogo} />
              </div>
            </Link>
          </div>
          {/* <div style={{marginLeft:'10px'}}>
                        <HeaderMenuLeft/>
                    </div> */}
          
        </div>
        <div className={styles.NavLeft}>

          <div className={styles.ContactTop}>
            <div className={styles.Contact_icon}>
              <span><IoIosCall /></span>
            </div>
            <div className={styles.Contact_number}>
              <div className={styles.Contact_number_Text}>
                <span>Talk to an expert</span>
              </div>
              <span>{Contactinfo.MainMobile}</span>
            </div>
          </div>
          <div className={styles.loginbtnTopBtns}>
            {!Contextdata.IsLogin && (
              <Link href='Login'>
                <div className={styles.loginbtnTop}>
                  <span><AiOutlineLogin /></span>
                  <small>Login</small>
                </div>
              </Link>

            )}
            {Contextdata.IsLogin && (
              <div className={styles.loginbtnTop} onClick={props.LogutNow}>
                <span><GrPowerShutdown /></span>
                <small>Logout</small>
              </div>

            )}
          </div>


        </div>
      </div>
    </div >
  )
}

export default Navbar