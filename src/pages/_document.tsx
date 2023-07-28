import { getCssText } from '@/styles'
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel='preconnect' href='https://font.googleapis.com' />
        <link rel='preconnect' href='https://font.gstatic.com' crossOrigin="anonymous"/>
        <link rel='stylesheet' href='https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap' />

        <style id="stitches" dangerouslySetInnerHTML={ {__html: getCssText()} } />

      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
