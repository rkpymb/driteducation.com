import React from 'react'
import { useState, useEffect,useContext } from 'react';
import { useRouter, useParams } from 'next/router'
import Head from 'next/head'
import CheckloginContext from '../context/auth/CheckloginContext'
import styles from '../styles/Home.module.css'
import Lottie from 'react-lottie'
import TextField from '@mui/material/TextField';
import { FiChevronRight } from 'react-icons/fi';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { BASE_URL, AppName } from '../Data/config'
import * as animationData from '../Data/Lottie/87666-female-character-walking.json'
import * as animationData2 from '../Data/Lottie/105173-verification-code-otp.json'
import * as animationData3 from '../Data/Lottie/110817-account-created'
const Login = ({ BackDropOpen, BackDropClose }) => {
    const Contextdata = useContext(CheckloginContext)
    const router = useRouter()
    const [usermobile, setMob] = useState('');
    const [sot, setSot] = useState('');
    const [isalert, setIsalert] = useState(false);
    const [mobilebox, setMobilebox] = useState(true);
    const [regbox, setRegbox] = useState(false);
    const [regdone, setRegdone] = useState(false);
    const [Otpbox, setOtpbox] = useState();
    const [vmData, setVmdata] = useState();
    const [postdata, setPostdata] = useState({});
    const [username, setUsername] = useState('');
    const [useremail, setEmail] = useState('');

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
        loop: false,
        autoplay: true,
        animationData: animationData3,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    }
    useEffect(() => {
        if (Contextdata.IsLogin == true) {
            router.push('/Dashboard')
        } else {
            console.log('Not Login')
        }
    });
 
    const handleChangeMob = () => {
        setIsalert(false);
        const mobA = document.querySelector('#userm').value
        if (mobA.length <= 10) {
            setMob(mobA)
        }
      
    }
    // On submit mobile
    const handleSubmit = async () => {
        if (usermobile.length == 10) {
            BackDropOpen()
            const sendUM = { usermobile }
            const data = await fetch("/api/mobile_process", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(sendUM)
            }).then((a) => {
                return a.json();
            })
                .then((parsed) => {
                    if (parsed.status == true) {
                        BackDropClose()
                        // console.log(parsed)
                        setVmdata(parsed.data)
                        setPostdata(parsed)
                        BackDropClose()
                        setMobilebox(false);
                        setOtpbox(true);
                    }
                })
            BackDropClose();
        } else {
            BackDropClose()
            setIsalert(true);
            // alert('Invalid Mobile Number')
        }


    }
    // On submit mobile //
    // Submit OTP button
    const handleChangeOTP = () => {
        setIsalert(false);
        const otpin = document.querySelector('#otpinput').value
        if (otpin.length <= 4) {
            setSot(otpin)
        }
    }
    const verifyOTPBTN = async () => {
        BackDropOpen()
        if (sot == vmData) {
            const u_type = postdata.user_type;
            if (u_type == 0) {
                BackDropClose();
                setOtpbox(false);
                setRegbox(true);
            } else if (u_type == 1) {
                localStorage.setItem('userid', usermobile);
                window.location.reload()
            }
        } else {
            BackDropClose()
            setIsalert(true);

        }
    }
    // Submit OTP button //


    // Craete account
    const handluserName = () => {
        setIsalert(false);
        const username = document.querySelector('#username').value
        setUsername(username);
    }
    const handluserEmail = () => {
        setIsalert(false);
        const email = document.querySelector('#email').value
        setEmail(email);
    }
    const createAcc = async () => {
        if (usermobile.length == 10 && username !== '' && useremail !== '') {
            BackDropOpen()
            const sendReg = { usermobile: usermobile, name: username, email: useremail }
            const data = await fetch("/api/createaccount", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(sendReg)
            }).then((b) => {
                return b.json();
            })
                .then((parsedReg) => {
                    // console.log(parsedReg)
                    if (parsedReg.status == true) {
                        SendWelcomeMsg()
                        localStorage.setItem('userid', usermobile);
                        setRegbox(false);
                        setRegdone(true)
                        BackDropClose()
                        setTimeout(function () {
                            router.push('/')
                        }, 5000);
                       
                    }
                })
        } else {
            BackDropClose()
            setIsalert(true);
        }
    }

    const SendWelcomeMsg = async () => {
        const sendUM = { mobile:usermobile }
        const data = await fetch(`${BASE_URL}api/Send/Email/Send_Student/Welcome/emailsend.php`, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(sendUM)
        }).then((a) => {
            return a.json();
        })
            .then((parsed) => {
               console.log('Welcome')
            })
    }
    return (
        <>
            <Head>
                <title>Login / Sign up : {AppName}</title>
               
            </Head>

            <div className={styles.LoginFull}>
                <div className={styles.LoginBox}>
                    {mobilebox && (
                        <div className={styles.LoginBoxItem}>
                            <div>
                                <Lottie options={defaultOptions}
                                    width='100%'
                                    height={400}
                                    isStopped={false}
                                    isPaused={false} />
                            </div>
                            <div className={styles.logomainBox}>
                                <div className={styles.logomain}>
                                    <img src='/logo/logomain.png' alt='logo' />
                                </div>
                                <div><h3>Log in to your Account </h3>
                                    <small>Enter your Phone number to continue OTP will be sent on this number for verfification</small>
                                </div>
                               
                                <div className={styles.LoginBox_input}>
                                    <TextField fullWidth label="Enter Mobile Number" id="userm" type="number" onChange={handleChangeMob} value={usermobile} />
                                </div>
                                <div style={{ height: '20px' }}> </div>
                                {isalert && (
                                    <Stack sx={{ width: '100%' }} spacing={2}>
                                       
                                        <Alert severity="warning">Please enter correct Mobile Number</Alert>
                                       
                                    </Stack>
                                )}
                                <div style={{ height: '0px' }}> </div>
                                <div className={styles.Btn_icon} onClick={handleSubmit}>
                                    <small>Get OTP</small>
                                    <span><FiChevronRight /></span>
                                </div>


                                <div style={{ height: '5px' }}> </div>
                                <small>By signing up, you agree to our <span className={styles.url}>Terms of use</span> and <span className={styles.url}>Privacy Policy</span></small>
                            </div>
                        </div>
                    )}
                    {/* Otp box */}
                    {Otpbox && (
                        <div className={styles.LoginBoxItem}>
                            <div>
                                <Lottie options={defaultOptions2}
                                    width='100%'
                                    height={400}
                                    isStopped={false}
                                    isPaused={false} />
                            </div>
                            <div className={styles.logomainBox}>
                                <div><h3>Enter OTP</h3>
                                    <span>OTP Succesfully Sent on +91{usermobile}</span>
                                </div>
                                <div className={styles.LoginBox_input}>
                                    <TextField fullWidth label="Enter OTP" id="otpinput" type="number" onChange={handleChangeOTP} autoFocus />
                                </div>
                                <div style={{ height: '20px' }}> </div>
                                {isalert && (
                                    <Stack sx={{ width: '100%' }} spacing={2}>

                                        <Alert severity="warning">Invalid OTP</Alert>

                                    </Stack>
                                )}
                                <div style={{ height: '20px' }}> </div>
                                <div className={styles.Btn_icon} onClick={verifyOTPBTN} >
                                    <small>Verify OTP</small>
                                    <span><FiChevronRight /></span>
                                </div>

                                
                                <div style={{ height: '5px' }}> </div>

                            </div>
                        </div>
                    )}
                    {/* Reg box */}
                    {regbox && (
                        <div className={styles.LoginBoxItem}>
                          
                            <div className={styles.regBox}>
                                <div><h3>Setup a new Account</h3>
                                    <span>Please Enter All required fields</span>
                                </div>
                                <div className={styles.LoginBox_input}>
                                    <TextField fullWidth label="Full Name" id="username" onChange={handluserName} autoFocus />
                                </div>
                                <div className={styles.LoginBox_input}>
                                    <TextField fullWidth label="Email" id="email" onChange={handluserEmail} autoFocus />
                                </div>
                                <div style={{ height: '20px' }}> </div>
                                {isalert && (
                                    <Stack sx={{ width: '100%' }} spacing={2}>

                                        <Alert severity="warning">Please Enter all required fields</Alert>

                                    </Stack>
                                )}
                                <div style={{ height: '20px' }}> </div>
                                <div className={styles.Btn_icon} onClick={createAcc} >
                                    <small>Create Account</small>
                                    <span><FiChevronRight /></span>
                                </div>
                                <div style={{ height: '5px' }}> </div>
                                <small>By signing up, you agree to our <span className={styles.url}>Terms of use</span> and <span className={styles.url}>Privacy Policy</span></small>
                            </div>
                        </div>
                    )}
                    {regdone && (
                        <div className={styles.LoginBoxItem}>
                            <div className={styles.regdoneimg}>
                                <Lottie options={defaultOptions3}
                                    width='100%'
                                    height={400}
                                    isStopped={false}
                                    isPaused={false} />
                            </div>
                            
                        </div>
                    )}
                   
                  
                    
                </div>
            </div>
        </>
    )
}

export default Login