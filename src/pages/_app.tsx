import Layout from '@components/shared/Layout'
import { Global } from '@emotion/react'
import globalStyles from '@styles/globalStyles'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Global styles={globalStyles} />
      <Component {...pageProps} />
    </Layout>
  )
}
