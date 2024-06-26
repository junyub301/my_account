import Layout from '@components/shared/Layout'
import { Global } from '@emotion/react'
import globalStyles from '@styles/globalStyles'
import type { AppProps } from 'next/app'
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'
import { SessionProvider } from 'next-auth/react'
import AuthGuard from '@components/auth/AuthGuard'
import Navbar from '@shared/Navbar'
import { AlertContextProvider } from '@contexts/AlertContext'
import ErrorBoundary from '@shared/ErrorBoundary'
import { useReportWebVitals } from 'next/web-vitals'
const client = new QueryClient()

export default function App({
  Component,
  pageProps: { dehydrateState, session, ...pageProps },
}: AppProps) {
  useReportWebVitals((metric) => {
    console.log(metric)
  })
  return (
    <Layout>
      <Global styles={globalStyles} />
      <SessionProvider session={session}>
        <QueryClientProvider client={client}>
          <Hydrate state={dehydrateState}>
            <ErrorBoundary>
              <AlertContextProvider>
                <Navbar />
                <Component {...pageProps} />
              </AlertContextProvider>
            </ErrorBoundary>
          </Hydrate>
        </QueryClientProvider>
      </SessionProvider>
    </Layout>
  )
}
