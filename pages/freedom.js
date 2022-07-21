import { loginUser } from '../store/users/action'
import { wrapper } from '../store/store'
import Interface from '../components/interface.js'

const Index = (props) => {
  return <Interface layout="default" widgets="freedom" />
}

export const getStaticProps = wrapper.getStaticProps((store) => () => {
  store.dispatch(loginUser())
})

export default Index