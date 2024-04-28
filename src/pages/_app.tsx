import Layout from '@components/shared/Layout'
import { Global } from '@emotion/react'
import globalStyles from '@styles/globalStyles'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from 'react-query'

const client = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Global styles={globalStyles} />
      <QueryClientProvider client={client}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </Layout>
  )
}
