import React from 'react'
import { useSelector } from 'react-redux'
import Image from 'next/image'
import Icon1 from '../public/assets/images/t_icon.svg'
import Icon2 from '../public/assets/images/t_icon2.svg'
import Icon3 from '../public/assets/images/t_icon3.svg'

import styles from './widget.module.sass'

export default function Widget(props) {
  const connected = useSelector((state) => state.users.connected);
  const type = props.type
  const label = props.title
  //const icon = props.icon
  let noticeText = ""

  if (type == "source") {
    if (connected == "true") {
      noticeText = "site unlocked"
    } else {
      noticeText = "please connect valid wallet"
    }
  }

  return (
    <>
      <article className={styles.widget} data-widget={type} data-valid={connected}>
        <span className={styles.noticet}>{noticeText}</span>
        <header className={styles.title}>
          <span className={styles.icon}>
            <Image layout="fixed" src={Icon1} priority="true" alt="ADD" width="22" height="22" />
          </span>
          <span className={styles.label}>
            {label}
          </span>
          <div className={styles.indicator} data-state="off"></div>
        </header>
        <div className={styles.content} data-feed={type}>
          <div className={styles.scroll}>
            {props.children}
          </div>
        </div>
        <footer className={styles.foot}>
          <svg className="footer-accent" width="33" height="5" viewBox="0 0 33 5" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.38656 0.15332H3.24902V1.00699H8.38656V0.15332Z" fill="white"/>
            <path d="M21.2402 0.15332H9.67578V1.00699H21.2402V0.15332Z" fill="white"/>
            <path d="M21.2602 1.86084H3.24902V2.71451H21.2602V1.86084Z" fill="white"/>
            <path d="M13.5439 3.56787H3.24902V4.42154H13.5439V3.56787Z" fill="white"/>
            <path d="M16.1028 3.56787H14.8135V4.42154H16.1028V3.56787Z" fill="white"/>
            <path d="M1.96025 3.56787H0.670898V4.42154H1.96025V3.56787Z" fill="white"/>
            <path d="M1.96025 1.86084H0.670898V2.71451H1.96025V1.86084Z" fill="white"/>
            <path d="M1.96025 0.15332H0.670898V1.00699H1.96025V0.15332Z" fill="white"/>
            <path d="M18.6819 3.56787H17.3926V4.42154H18.6819V3.56787Z" fill="white"/>
            <path d="M21.2405 3.56787H19.9512V4.42154H21.2405V3.56787Z" fill="white"/>
            <path d="M23.8196 3.56787H22.5303V4.42154H23.8196V3.56787Z" fill="white"/>
            <path d="M26.3977 3.56787H25.1084V4.42154H26.3977V3.56787Z" fill="white"/>
            <path d="M26.3977 1.86084H25.1084V2.71451H26.3977V1.86084Z" fill="white"/>
            <path d="M30.2467 1.86084H27.668V2.71451H30.2467V1.86084Z" fill="white"/>
            <path d="M32.8248 3.56787H30.2461V4.42154H32.8248V3.56787Z" fill="white"/>
            <path d="M25.109 0.15332H22.5303V1.00699H25.109V0.15332Z" fill="white"/>
          </svg>
          <span className="numbers">
            42659897
          </span>
        </footer>
      </article>
    </>
  )
}