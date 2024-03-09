import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ConfigProvider } from '@/components/config'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider>
      <Component {...pageProps} />
    </ConfigProvider>
  )
}
