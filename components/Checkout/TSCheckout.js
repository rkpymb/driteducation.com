import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { TbDiscount2 } from "react-icons/tb";
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress'
import { useRouter, useParams } from 'next/router'
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import styles from '../../styles/Home.module.css'
import TextField from '@mui/material/TextField';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function CourseCheckout({ DataCourse }) {
    const router = useRouter()
    const [open, setOpen] = useState(false);
    const [ShowBtnloader, setShowBtnloader] = useState(false);
    const [Applybtnshow, setApplybtnshow] = useState(false);
    const [CouponApplied, setCouponApplied] = useState(false);
    const [CouponAppliedText, setCouponAppliedText] = useState('');
    const [CourseRetData, setCourseRetData] = useState(DataCourse);
    const [TotalDiscount, setTotalDiscount] = useState('');
    const [TotalAmt, setTotalAmt] = useState('');
    const [CuponCode, setCuponCode] = useState('');
    const [UserMob, setUserMob] = useState('');
    const [ProductType, setProductType] = useState('TS');
    const [OrderID, setOrderID] = useState('0');
    const [QRURL, setQRURL] = useState('0');
    const [CodeDiscount, setCodeDiscount] = useState('0');
    
   
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
        setShowBtnloader(true)
        const sendUM = { UserMob: UserMob, pid: CourseRetData.pid, amt: TotalAmt, mprice: CourseRetData.MainPrice, Discount: TotalDiscount, Coupon: CuponCode, CouponDiscount: CodeDiscount, ProductType: ProductType, OrderTitle: CourseRetData.title, Validity: CourseRetData.Validity }
        const data = await fetch("/api/Check/CheckTSPurchage", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(sendUM)
        }).then((a) => {
            return a.json();
        })
            .then((parsedCreateOrder) => {
                if (parsedCreateOrder.statusdata == true) {
                    console.log(parsedCreateOrder);
                    setOrderID(parsedCreateOrder.RetData)
                    GenrateUPIQR(parsedCreateOrder.RetData)
                   
                } else {
                    alert(parsedCreateOrder.RetData)
                    setShowBtnloader(false)
                }
               
            })
        

    }


    const GenrateUPIQR = async (OIDNEW) => {
        const sendUMData = { OrderID: OIDNEW }
        const data = await fetch("../api/QR/CourseQR", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(sendUMData)
        }).then((a) => {
            return a.json();
        })
            .then((parsedQR) => {
                console.log(parsedQR)
                if (parsedQR.statusdata === true) {
                    window.location.replace(parsedQR.DataRet);
                } else {
                    alert('Something went wrong')
                }

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
                    setCodeDiscount(ApplyCodeRet.CodeDiscount)
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
                <span>Buy Test Series</span>
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

                            <div>
                                <div className={styles.ModalContentBox}>
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
                                                    <span style={{ fontSize: '35px' }}><TbDiscount2 /></span>
                                                </div>
                                                <div className={styles.SaveTodayBoxCourseB}>
                                                    <div>Coupon Code Applied Successfully</div>
                                                    <div style={{ fontWeight: 500 }}>{CouponAppliedText}</div>

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
                                       

                                        {!ShowBtnloader && 
                                            <div className={styles.CreateOrderBtnfinal} style={{ backgroundColor: '#f1582e', width: '200px' }} onClick={CreateOrderBTN}>
                                                <span>Pay Now</span>
                                            </div>
                                        }
                                        {ShowBtnloader && 
                                            <div style={{margin:'10px'}}><CircularProgress color="inherit" /></div>
                                        }
                                       

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
