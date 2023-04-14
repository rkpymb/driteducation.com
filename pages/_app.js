import Login from '../components/Login'
import { useState, useEffect } from 'react'
import { useRouter, Router } from 'next/router'
import '../styles/globals.css'
import Script from 'next/script'

import styles from '../styles/Home.module.css'
import CheckloginStates from '../context/auth/CheckloginStates'

import LoadingBar from 'react-top-loading-bar'
import Head from 'next/head'
import Backdropitem from '../components/Backdropitem'
function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const [progress, setProgress] = useState(0);
  const [openModal, setOpenmodal] = useState(false);
  const [BackDropData, setBackDrop] = useState(false);

  const BackDropOpen = () => {
    setBackDrop(true)
  }

  const BackDropClose = () => {
    setBackDrop(false)
  }

  useEffect(() => {
    Router.events.on("routeChangeStart", BackDropOpen);
    Router.events.on("routeChangeComplete", BackDropClose);
    Router.events.on("routeChangeError", BackDropClose);
    setProgress(progress + 100)

  }, [router.query]);



  return <>
    <CheckloginStates>
      <Head>
        <meta name="description" content="Best Courses Website" />
        <link rel="icon" href="./logo/logomain.png" />
      </Head>
      <LoadingBar
        color='red'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />

      
      <Component {...pageProps} BackDropOpen={BackDropOpen} BackDropClose={BackDropClose} />
      <Login openModal={openModal} BackDropOpen={BackDropOpen} BackDropClose={BackDropClose} />

      <Backdropitem BackDropData={BackDropData} />
    </CheckloginStates>
  </>
}

export default MyApp
