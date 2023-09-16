import { AcmeLogo } from './acme'
import { APP_NAME } from 'config'
import { isAuth, signout } from 'actions/auth'
import Link from 'next/link'

import React from 'react'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
} from '@nextui-org/react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'

const Header = () => {
  let router = useRouter()
  return (
    <Navbar>
      <Link href="/">
        <NavbarBrand>
          <AcmeLogo />
          <p className="font-bold text-inherit">{APP_NAME}</p>
        </NavbarBrand>
      </Link>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {
          // <NavbarItem isActive>
          //   <Link href="/" aria-current="page">
          //   Home
          //   </Link>
          // </NavbarItem>
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
              <Button
                className="bg-blue-500 text-white-500"
                onClick={() => signout(() => router.replace(`/signin`))}
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
  )
}

export default Header
