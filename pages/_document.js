import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'
import { getLocaleFromQuery } from '../utils/locale'

export default class MyDocument extends Document {
  static getInitialProps({ renderPage, query }) {
    const lang = getLocaleFromQuery(query)

    const sheet = new ServerStyleSheet()
    const page = renderPage(
      (App) => (props) => sheet.collectStyles(<App {...props} />)
    )
    const styleTags = sheet.getStyleElement()
    return { ...page, styleTags, lang }
  }

  render() {
    return (
      <html lang={this.props.lang}>
        <Head>{this.props.styleTags}</Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
