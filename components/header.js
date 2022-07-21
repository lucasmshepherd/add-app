import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { loginUser } from '../store/users/action'
import Image from 'next/image'
import Link from 'next/link'
import Container from './container.js'
import Balance from './balance.js'
import Logo from '../public/assets/images/logo.svg'
import LogoIcon from '../public/assets/images/logo-icon.svg'
import LogoIconHighlight from '../public/assets/images/logo-icon-highlight-01.svg'

import styles from './header.module.sass'

export default function Header() {

  const dispatch = useDispatch();
  const connected = useSelector((state) => state.users.connected);

  function loginUserNow() {
    dispatch(loginUser());
  };


  return (
    <> 
      <header className={styles.header} data-connected={connected}>
        <div className={styles.bar}>
          <div className={styles.tab}>
            <svg className={styles.tabg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 255.17 50.89"><g id="Layer_1-2"><path d="M255.17,0c-4.01,0-9.62,2.35-12.44,5.21l-40,40.47c-2.84,2.87-8.44,5.21-12.44,5.21H64.88c-4.01,0-9.61-2.35-12.44-5.21L12.44,5.21C9.61,2.34,4,0,0,0H255.17Z"/></g></svg>
            <a onClick={loginUserNow} className={styles.icon}>
              <Image layout="fixed" src={LogoIcon} priority="true" alt="ADD" width="48" />
              <Image layout="fixed" src={LogoIconHighlight} priority="true" alt="ADD" width="48" />
            </a>
          </div>
        </div>
        <Container>
          <div className={styles.addbar}>
            <h1 className={styles.logo}>
            <Link href="./"><a>
              <Image layout="fixed" src={Logo} priority="true" alt="Anarchist Development DAO" width="160" />
            </a></Link>
            </h1>
            <Balance />
          </div>
        </Container>
      </header>
    </>
  )
}