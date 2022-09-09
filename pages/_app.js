import '../styles/globals.css'
import { Provider } from 'react-redux'
import { store } from '../redux/store'
import { SessionProvider } from 'next-auth/react'
import { getTotal } from './../redux/slices/cartSlice'
store.dispatch(getTotal())

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </SessionProvider>
  )
}

export default MyApp
