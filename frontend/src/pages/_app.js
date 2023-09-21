import '@/styles/globals.css'
import '@/styles/styles.css'
import '../../node_modules/nprogress/nprogress.css'
import '../../static/nprogress_styles.css'

import { baseStyles } from '@nextui-org/react'

import Layout from '@components/layout/layout'
import { NextUIProvider } from '@nextui-org/react'
// import { useEffect } from 'react'
// import Router from 'next/router'
// import NProgress from 'nprogress'

// import nProgress from 'nprogress'
// import { AppProps } from 'next/app'

// import Head from 'next/head'

// const changeStart = (url) => {
//   console.log('Nprogress.start()')
//   return NProgress.start()
// }
// const changeComplete = () => {
//   nProgress.set(0.99)
//   window.setTimeout(() => {
//     NProgress.done()
//   }, 500)
//   return nProgress.done
// }
// const changeError = (url) => {
//   // console.log('NprogressError.start()')
//   return NProgress.done()
// }
// Router.events.on('routeChangeStart', changeStart)
// Router.events.on('routeChangeComplete ', changeComplete)
// Router.events.on('routeChangeError', changeError)

// nProgress.configure({
//   minimum: 0.99,
//   showSpinner: false,
//   trickle: false,
//   trickleRate: 0.8,
//   trickleSpeed: 100,
//   easing: 'ease',
//   speed: 200,
// })
// Router.events.on('routeChangeStart', nProgress.start)
// Router.events.on('routeChangeComplete ', changeComplete)
// Router.events.on('routeChangeError', nProgress.done)

// Router.events.on('routeChangeStart', NProgress.start())
// Router.events.on('routeChangeComplete', NProgress.done())
// Router.events.on('routeChangeError', NProgress.done())
export default function App({ Component, pageProps }) {
  // useEffect(() => {
  //   // router.events.on('routerChangeStart', changeStart)
  //   // router.events.on('routerChangeComplete ', changeComplete)
  //   // router.events.on('routerChangeError', changeError)
  //
  //   return () => {
  //     Router.events.off('routerChangeStart', changeStart)
  //     Router.events.off('routerChangeComplete ', changeComplete)
  //     Router.events.off('routerChangeError', changeError)
  //   }
  // }, [Router])
  return (
    <>
      <NextUIProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </NextUIProvider>
    </>
  )
}

// <Head>
//   <meta
//     name="viewport"
//     content="minimum-scale=1, initial-scale=1, width=device-width"
//   />
// </Head>
