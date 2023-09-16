import { Fragment } from 'react'
// import Header from '@components/header/header'
import dynamic from 'next/dynamic'

const Header = dynamic(() => import('../header/header'), { ssr: false })
function Layout(props) {
  return (
    <Fragment>
      <Header />
      <main>{props.children}</main>
    </Fragment>
  )
}

export default Layout
