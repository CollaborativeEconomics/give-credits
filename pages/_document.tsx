import Document, { Html, Head, Main, NextScript } from 'next/document'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { ThemeProvider } from 'next-themes'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100..900&display=swap" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        </Head>
        <body>
          <ThemeProvider defaultTheme="light" forcedTheme="light">
            <Header />
            <Main />
            <Footer />
          </ThemeProvider>
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
