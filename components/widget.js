import Image from 'next/image'
import Icon1 from '../public/assets/images/t_icon.svg'
import Icon2 from '../public/assets/images/t_icon2.svg'
import Icon3 from '../public/assets/images/t_icon3.svg'

import styles from './widget.module.sass'

export default function Widget(props) {
  const type = props.type
  const label = props.title
  const icon = props.icon
  const size = props.size
  let noticeText = ""

  if (type == "source") {
    noticeText = "please connect valid wallet"
  }

  return (
    <>
      <article className={styles.widget} data-widget={type}>
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
      </article>
    </>
  )
}