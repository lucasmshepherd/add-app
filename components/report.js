import parse from 'html-react-parser'

import styles from './report.module.sass'

export default function Report() {
  var lock = parse('<svg style="width: 14px;fill: white;" class="icon-lock" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 135 135"><rect x="15" y="60" width="15" height="75"/><rect x="15" y="120" width="105" height="15"/><rect x="105" y="60" width="15" height="75"/><rect x="15" y="45.1" width="105" height="14.9"/><rect x="30" y="15" width="15" height="30"/><rect x="90" y="15" width="15" height="30"/><rect x="44.82" width="45.18" height="15"/><rect x="60" y="75" width="15" height="30"/></svg>')
  return (
    <> 
      <div className={styles.table}>
        <div className={styles.row}>
          <div className={styles.cell}>days since project launch</div>
          <div className={styles.cell}>3152</div>
        </div>
        <div className={styles.row}>
          <div className={styles.cell}>projects fundded in ETH</div>
          <div className={styles.cell}>1234</div>
        </div>
        <div className={styles.row}>
          <div className={styles.cell}>citizen holder wallet count</div>
          <div className={styles.cell}>448</div>
        </div>
        <div className={styles.row}>
          <div className={styles.cell}>ADD price</div>
          <div className={styles.cell}>{lock}</div>
        </div>
        <div className={styles.row}>
          <div className={styles.cell}>marketcap</div>
          <div className={styles.cell}>{lock}</div>
        </div>
        <div className={styles.row}>
          <div className={styles.cell}>total value locked</div>
          <div className={styles.cell}>{lock}</div>
        </div>
        <div className={styles.row}>
          <div className={styles.cell}>total ETH sent</div>
          <div className={styles.cell}>{lock}</div>
        </div>
        <div className={styles.row}>
          <div className={styles.cell}>treasury balance</div>
          <div className={styles.cell}>{lock}</div>
        </div>
        <div className={styles.row}>
          <div className={styles.cell}>ADD burned</div>
          <div className={styles.cell}>{lock}</div>
        </div>
      </div>
    </>
  )
}