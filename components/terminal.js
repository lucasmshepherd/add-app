//import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router'
//import $ from 'jquery';

//import styles from './widget.module.sass'

export default function Terminal() {


  return (
    <> 
      {/*<div id="container">*/}
        <div id="message" className="terminal-feed">
          &gt; cd ./defi/r3v0lt<br/>
          &gt; start fundanarchy.dao<br/>
          run bgchckr.exe completed<br/>
          line secure ... booting sequence 4/4<br/>
          loading ... 100%<br/>
          +++++ access granted +++++<br/>
          +++++ connect valid wallet to unlock fund +++++
          <br/><br/>
          1 Connect Wallet<br/>
          2 Purchase ADD on Uniswap<br/>
          3 The Manifesto
        </div>
      {/*</div>*/}
    </>
  )
}