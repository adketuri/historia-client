import NextDocument, { Html, Head, Main, NextScript } from 'next/document'
import { ColorModeScript, theme } from '@chakra-ui/react'

export default class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head />
        <body>
          {/* Make Color mode to persists when you refresh the page. */}
          <ColorModeScript initialColorMode={theme.config.initialColorMode}/>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
