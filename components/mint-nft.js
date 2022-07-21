import styles from './mint-nft.module.sass'
import Image from 'next/image'
import nftTier1 from '../public/assets/images/coin-placeholder.png'

export default function MintNft(props) {
  return (
    <> 
      <div className={styles.mint}>
        <style jsx>{`
          [data-tier="1"],
          [data-tier="2"],
          [data-tier="3"] {
            background: url(${nftTier1.src}) no-repeat 50% 50%;
            background-size: 100% auto;
          }
        `}</style>
        <div data-tier={props.tier} className={styles.nft}></div>
        <span className={styles.fill}></span>
        <h3 className={styles.title}>Tier {props.tier}</h3>
        <p className={styles.text}>Maecenas sed erat id interdum vestibulum bibendum.</p>
        <div className={styles.price}>
          .15 ETH
        </div>
        <div className={styles.usd}>
          $1879.00
        </div>
        <a href="#">BUTTON GOES HERE</a>
      </div>
    </>
  )
}