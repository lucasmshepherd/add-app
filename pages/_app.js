import { wrapper } from '../store/store'
import '../styles/globals.sass'
import Layout from '../components/_layout'


function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default wrapper.withRedux(MyApp)