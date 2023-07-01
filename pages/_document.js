import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <Script id="adsbygoogle-init" strategy="beforeInteractive" data-ad-client="pub-8886377477645608" crossOrigin='anonymous' async="true" onError={(e) => console.log('error', e)} src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8886377477645608'/>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
