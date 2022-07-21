import styles from './news.module.sass'

export default function News() {
  return (
    <> 
      <div className={styles.news}>
        <div className={styles.article}>
          <h2>News or possible roadmap</h2>
          <span className={styles.date}>December 18th, 2021</span>
          <p>Lorem ipsum sel ador cit amet consecteur delem.Lorem ipsum sel ador cit amet consecteur delem.</p>
          <p>- Anarchists</p>
        </div>
        <div className={styles.article}>
          <h2>Something else here</h2>
          <span className={styles.date}>December 18th, 2021</span>
          <p>Lorem ipsum sel ador cit amet consecteur delem.Lorem ipsum sel ador cit amet consecteur delem.</p>
          <p>- Anarchists</p>
        </div>
        <div className={styles.article}>
          <h2>Moving and Shaking</h2>
          <span className={styles.date}>December 18th, 2021</span>
          <p>Lorem ipsum sel ador cit amet consecteur delem.Lorem ipsum sel ador cit amet consecteur delem.</p>
        </div>
        <div className={styles.article}>
          <h2>Moving and Shaking</h2>
          <span className={styles.date}>December 18th, 2021</span>
          <p>Lorem ipsum sel ador cit amet consecteur delem.Lorem ipsum sel ador cit amet consecteur delem.</p>
        </div>
      </div>
    </>
  )
}