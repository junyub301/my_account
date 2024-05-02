import Layout from '@components/shared/Layout'
import { Global } from '@emotion/react'
import globalStyles from '@styles/globalStyles'
import type { AppProps } from 'next/app'
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'
import { SessionProvider } from 'next-auth/react'
import AuthGuard from '@components/auth/AuthGuard'
import Navbar from '@shared/Navbar'
import { AlertContextProvider } from '@contexts/AlertContext'

const client = new QueryClient()

export default function App({
  Component,
  pageProps: { dehydrateState, session, ...pageProps },
}: AppProps) {
  return (
    <Layout>
      <Global styles={globalStyles} />
      <SessionProvider session={session}>
        <QueryClientProvider client={client}>
          <Hydrate state={dehydrateState}>
            <AlertContextProvider>
              <AuthGuard>
                <Navbar />
                <Component {...pageProps} />
              </AuthGuard>
            </AlertContextProvider>
          </Hydrate>
        </QueryClientProvider>
      </SessionProvider>
    </Layout>
  )
}
