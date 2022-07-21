import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { loginUser } from '../store/users/action'
import Link from 'next/link'
import parse from 'html-react-parser'

import styles from './directory.module.sass'

export default function Directory() {
  const dispatch = useDispatch();
  const connected = useSelector((state) => state.users.connected);

  function loginUserNow() {
    dispatch(loginUser());
  };

  var folder = parse('<svg class="icon-folder" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 135 135"><g><rect x="15" y="30" width="30" height="15"/><rect y="14.99" width="15" height="105.01"/><rect x="45" y="45" width="75" height="15"/><rect x="120" y="60" width="15" height="60"/><rect x="15" y="120" width="105" height="15"/></g><g><rect x="15" width="30" height="15"/><rect x="45" y="15" width="75" height="15"/><rect x="120" y="30" width="15" height="30"/></g></svg>')
  var arrow = parse('<svg class="icon-arrow" width="10" height="9" viewBox="0 0 10 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.21793 0.969727V2.83831L3.04271 4.12316H9.80615C9.80615 4.11741 9.80615 4.11486 9.80615 4.11486L9.81348 5.75824H3.04597L5.21467 7.04118V8.96973L0.129678 5.76654V4.11295L5.21793 0.969727Z" fill="#C4F26E"/></svg>')
  var lock = parse('<svg class="icon-lock" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 135 135"><rect x="15" y="60" width="15" height="75"/><rect x="15" y="120" width="105" height="15"/><rect x="105" y="60" width="15" height="75"/><rect x="15" y="45.1" width="105" height="14.9"/><rect x="30" y="15" width="15" height="30"/><rect x="90" y="15" width="15" height="30"/><rect x="44.82" width="45.18" height="15"/><rect x="60" y="75" width="15" height="30"/></svg>')

  return (
    <> 
      <ul id="menu" className={styles.menu}>
        <li className={styles.current}>
          <a href="#">{folder}<span>root</span>{arrow}</a>
        </li>
        <li data-hide={connected}><a onClick={loginUserNow}><span>connect_wallet</span></a></li>
        <li><a href="#"><span>purchase_add_on_uniswap</span></a></li>
        <li data-connected={connected}><a href="#">{lock}<span>anarchy_dao</span></a></li>
        <li data-connected={connected}><a href="#">{lock}<span>mint_nft</span></a></li>
        <li><Link className="anchor" href="/manifesto"><a>manifesto</a></Link></li>
        <li data-connected={connected}><a href="#">{lock}<span>fr33d0m.mp4</span></a></li>
      </ul>
    </>
  )
}