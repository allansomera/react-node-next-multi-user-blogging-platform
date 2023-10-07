import { AcmeLogo } from './acme'
import { APP_NAME } from 'config'
import { isAuth, signout } from 'actions/auth'
// import NProgress from 'nprogress'
import Link from 'next/link'

import nProgress from 'nprogress'
import React, { useEffect } from 'react'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
} from '@nextui-org/react'
import Router, { useRouter } from 'next/router'
import Search from '@components/blog/search'

const changeComplete = () => {
  nProgress.set(0.99)
  window.setTimeout(() => {
    nProgress.done(true)
  }, 500)
  // return nProgress.done(true)
}

nProgress.configure({
  minimum: 0.1,
  showSpinner: false,
  trickle: true,
  // trickleRate: 0.7,
  // trickleSpeed: 200,
  // easing: 'ease',
  speed: 500,
})

// Router.events.on('routeChangeStart', nProgress.start)
// // Router.events.on('routeChangeComplete ', changeComplete)
// Router.events.on('routeChangeComplete ', nProgress.done)
// Router.events.on('routeChangeError', nProgress.done)
Router.onRouteChangeStart = () => nProgress.start()
Router.onRouteChangeComplete = () => nProgress.done()
Router.onRouteChangeError = () => nProgress.done()

const Header = () => {
  // const router = useRouter()
  // useEffect(() => {
  //   router.events.on('routeChangeStart', () => setTimeout(nProgress.start, 100))
  //   router.events.on('routeChangeComplete ', () => changeComplete())
  //   // Router.events.on('routeChangeComplete ', nProgress.done)
  //   router.events.on('routeChangeError', nProgress.done)
  //   return () => {
  //     router.events.off('routeChangeStart', nProgress.start)
  //     // Router.events.on('routeChangeComplete ', changeComplete)
  //     router.events.off('routeChangeComplete ', nProgress.done)
  //     router.events.off('routeChangeError', nProgress.done)
  //   }
  // }, [router.asPath])
  return (
    <>
      <Navbar className="bg-black">
        <Link href="/">
          <NavbarBrand>
            <AcmeLogo />
            <p className="font-bold text-inherit">{APP_NAME}</p>
          </NavbarBrand>
        </Link>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          {
            <NavbarItem>
              <Link href="/blogs">Blog</Link>
            </NavbarItem>
          }
          {!isAuth() && (
            <>
              <NavbarItem>
                <Link color="foreground" href="/signup">
                  Sign Up
                </Link>
              </NavbarItem>
              <NavbarItem>
                <Link color="foreground" href="/signin">
                  Sign In
                </Link>
              </NavbarItem>
            </>
          )}
          {isAuth() && (
            <>
              <NavbarItem>
                {isAuth().role === 0 ? (
                  <Link color="foreground" href="/user">
                    Dashboard
                  </Link>
                ) : (
                  <Link color="foreground" href="/admin">
                    Dashboard
                  </Link>
                )}
              </NavbarItem>
              <NavbarItem>
                <Button
                  className="bg-blue-500 text-white-500"
                  onClick={() => signout(() => Router.replace(`/signin`))}
                >
                  Sign out
                </Button>
              </NavbarItem>
            </>
          )}
        </NavbarContent>

        {
          // <NavbarContent justify="end">
          //   <NavbarItem className="hidden lg:flex">
          //   <Link href="#">Login</Link>
          //   </NavbarItem>
          //   <NavbarItem>
          //     <Button as={Link} color="primary" href="#" variant="flat">
          //     Sign Up
          //     </Button>
          //   </NavbarItem>
          // </NavbarContent>
        }
      </Navbar>
      <Search />
    </>
  )
}

export default Header
