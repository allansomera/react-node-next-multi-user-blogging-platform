import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  // const getInitialProps = createGetInitialProps()
  return (
    <Html lang="en">
      <Head />

      {
        // <Head>
        // <link
        //   rel="stylesheet"
        //   href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css"
        // />
        // </Head>
      }
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
