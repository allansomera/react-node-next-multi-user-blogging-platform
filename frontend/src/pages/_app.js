import '@/styles/globals.css'
import '@/styles/styles.css'

import { baseStyles } from '@nextui-org/react'

import Layout from '@components/layout/layout'
import { NextUIProvider } from '@nextui-org/react'
// import { AppProps } from 'next/app'
// import Head from 'next/head'

export default function App({ Component, pageProps }) {
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
