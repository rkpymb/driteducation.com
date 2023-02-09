import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { TbDiscount2 } from "react-icons/tb";
import IconButton from '@mui/material/IconButton';


import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import styles from '../../styles/Home.module.css'
import TextField from '@mui/material/TextField';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function CourseCheckout({ DataCourse }) {
    console.log('DataCourse')
    console.log(DataCourse)
    const [open, setOpen] = useState(false);
    const [Applybtnshow, setApplybtnshow] = useState(false);
    const [CouponApplied, setCouponApplied] = useState(false);
    const [CouponAppliedText, setCouponAppliedText] = useState('');
    const [CourseRetData, setCourseRetData] = useState(DataCourse);
    const [TotalDiscount, setTotalDiscount] = useState('');
    const [TotalAmt, setTotalAmt] = useState('');
    const [CuponCode, setCuponCode] = useState('');
    const [UserMob, setUserMob] = useState('');
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const CuponChange = () => {
        setApplybtnshow(true)
        const CuponCodex = document.querySelector('#CuponCode').value
        setCuponCode(CuponCodex)
        setCouponApplied(false)
        setTotalDiscount(CourseRetData.MainPrice - CourseRetData.SalePrice)
        setTotalAmt(CourseRetData.SalePrice)
    }

    

    useEffect(() => {
        setTotalDiscount(CourseRetData.MainPrice - CourseRetData.SalePrice);
        setTotalAmt(CourseRetData.SalePrice);

        // check login
        try {
            if (localStorage.getItem('userid')) {
                const usermobile = localStorage.getItem('userid');
                setUserMob(usermobile)
            } else {
                setIsLogin(false)
            }
        } catch (error) {
            console.error(error)
            // localStorage.clear()
        }
        // check login credential end

    }, []);

    const CreateOrderBTN = async () => {
        const sendUM = { UserMob: UserMob, pid: CourseRetData.pid }
        const data = await fetch("../api/Check/CheckCoursePurchage", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(sendUM)
        }).then((a) => {
            return a.json();
        })
            .then((parsedCreateOrder) => {
               console.log(parsedCreateOrder);
            })
        

    }
    const ApplyCodebtn = async () => {
        setApplybtnshow(false)
        const sendUM = { UserMob: UserMob, pid: CourseRetData.pid, CuponCode: CuponCode }
        const data = await fetch("../api/Check/CheckCourseCoupon", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(sendUM)
        }).then((a) => {
            return a.json();
        })
            .then((ApplyCodeRet) => {
                if (ApplyCodeRet.statusdata == true) {
                    setTotalDiscount(ApplyCodeRet.FinalDiscount)
                    setTotalAmt(ApplyCodeRet.FinalPay)
                    alert(ApplyCodeRet.RetData)
                    setCouponAppliedText(ApplyCodeRet.RetData)
                    setCouponApplied(true)
                } else {
                    setTotalDiscount(CourseRetData.MainPrice - CourseRetData.SalePrice)
                    setTotalAmt(CourseRetData.SalePrice)
                    alert(ApplyCodeRet.RetData)
                }
               
            })
        

    }

    return (
        <div>
            <div className={styles.EnrollBtn_Course} style={{ backgroundColor: '#f1582e' }} onClick={handleClickOpen}>
                <span>Buy Course</span>
            </div>

            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}

            >
                <div className={styles.BgimgCourseCheckout}>
                   
                    <div className={styles.BgimgCourseCheckoutWhitefade}>
                        
                        <div className={styles.BoxCheckoutCourse}>
                            <div className={styles.ModalHeaderT}>
                                <div className={styles.ModalHeaderTBox}>
                                    <div>
                                        <div>
                                            <span style={{ fontSize: '15px', fontWeight: 'bold' }}>Checkout</span>
                                        </div>
                                        <div>
                                            <span style={{ fontSize: '10px' }}>{CourseRetData.title}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <IconButton
                                            edge="start"
                                            color="inherit"
                                            onClick={handleClose}
                                            aria-label="close"
                                        >
                                            <CloseIcon />
                                        </IconButton>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.ModalContentBox}>
                                <div className={styles.Chekoutlogo}>
                                    <div className={styles.logomain}>
                                        <img src='/logomain.png' alt='logo' className={styles.NavLogo} />
                                    </div>
                                </div>
                                <div style={{ margin: '20px' }}> </div>

                                <div style={{ margin: '20px' }}> </div>
                                <div className={styles.CourseCheckoutwhitebox}>

                                    <table>
                                        <tbody>
                                            <tr>
                                                <td className={styles.tdtext}>Course Title</td>
                                                <td className={styles.tdtext}>:</td>
                                                <td className={styles.tdtext}> {CourseRetData.title}</td>
                                            </tr>
                                            <tr>
                                                <td className={styles.tdtext}>Validity</td>
                                                <td className={styles.tdtext}>:</td>
                                                <td className={styles.tdtext}>{CourseRetData.Validity} days</td>
                                            </tr>

                                            <tr>
                                                <td className={styles.tdtext}>Price</td>
                                                <td className={styles.tdtext}>:</td>
                                                <td className={styles.tdtext}>₹ {CourseRetData.MainPrice}</td>
                                            </tr>
                                            <tr>
                                                <td className={styles.tdtext}>Discount</td>
                                                <td className={styles.tdtext}>:</td>
                                                <td className={styles.tdtext}> - ₹ {TotalDiscount}</td>
                                            </tr>

                                            <tr>
                                                <td className={styles.tdtext}>Total</td>
                                                <td className={styles.tdtext}>:</td>
                                                <td className={styles.tdtext}>₹ {TotalAmt}</td>
                                            </tr>
                                        </tbody>
                                    </table>

                                </div>

                                <div className={styles.CourseCheckoutwhitebox}>
                                    <div style={{ margin: '20px' }}> </div>
                                    <div >
                                        <TextField fullWidth label="🎁 Apply Coupon Code" id="CuponCode" onChange={CuponChange} value={CuponCode} />
                                    </div>
                                    <div style={{ margin: '10px' }}> </div>
                                    {Applybtnshow &&
                                        <div>
                                            <Button variant="contained" size="small" onClick={ApplyCodebtn}>
                                                APPLY
                                            </Button>
                                        </div>
                                    }
                                    {CouponApplied &&
                                        <div className={styles.SaveTodayBoxCourse}>
                                            <div className={styles.SaveTodayBoxCourseA}>
                                                <span style={{fontSize:'35px'}}><TbDiscount2 /></span>
                                            </div>
                                            <div className={styles.SaveTodayBoxCourseB}>
                                                <div>Coupon Code Applied Successfully</div>
                                                <div style={{fontWeight:500}}>{CouponAppliedText}</div>
                                                
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                            <div className={styles.FooterPaytbn}>
                                <div className={styles.FooterPaytbnBox}>
                                    <div style={{ minWidth: '30%' }}>
                                        <div>
                                            <span style={{ fontSize: '10px' }}>Total to pay</span>
                                        </div>
                                        <div>
                                            <span>₹ {TotalAmt}</span>
                                        </div>
                                    </div>
                                    <div className={styles.CreateOrderBtnfinal} style={{ backgroundColor: '#f1582e', width: '200px' }} onClick={CreateOrderBTN}>
                                        <span>Pay Now</span>
                                    </div>

                                </div>
                            </div>

                        </div>

                    </div>






                </div>

            </Dialog>

        </div>
    );
}
