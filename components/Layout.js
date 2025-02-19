import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import styled, { injectGlobal, ThemeProvider } from 'styled-components'
import _flow from 'lodash/flow'
import { withRouter } from 'next/router'
import T from 'i18n-react'

import {
  bodyText,
  pageTitleText,
  sectionTitleText,
  subsectionTitleText,
  componentTitleText,
  rootFontSize,
} from '../styling/typography'
import theme from '../styling/theme'
import { extraSmallSpacing, smallSpacing } from '../styling/sizes'
import { mdBreakpoint } from '../styling/breakpoints'
import { getLocaleFromQuery } from '../utils/locale'
import deLocale from '../i18n/de.json'
import enLocale from '../i18n/en.json'
import Footer, { propTypes as footerPropTypes } from './Footer'
import Header, { propTypes as headerPropTypes } from './Header'
import CookieNotice from './CookieNotice'
import withLoadingIndicator from './withLoadingIndicator'
import withAnalytics from './withAnalytics'

const locales = {
  de: deLocale,
  en: enLocale,
}

// eslint-disable-next-line no-unused-expressions
injectGlobal`
  html {
    font-size: ${rootFontSize};
 }

  body {
    background-color: ${theme.orangeBackgroundLight};
    ${bodyText}
  }

  @font-face {
    font-family: 'banaueregular';
    src: url('/static/fonts/banaue-regular-webfont.woff2') format('woff2'),
         url('/static/fonts/banaue-regular-webfont.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }

  a {
    color: ${theme.linkBlue};
  }

  h1 {
    ${pageTitleText}
  }

  h2 {
    ${sectionTitleText}
  }

  h3 {
    ${subsectionTitleText}
  }

  h4 {
    ${componentTitleText}
  }

  p + p {
    margin-top: ${smallSpacing};
  }

  .is-invalid {
    border-color: ${theme.error} !important
  }

  //Bootstrap overrides
  button.navbar-toggler {
    border: 0;
  }

  .nav-item {
    @media screen and (max-width: ${mdBreakpoint}) {
      padding: ${extraSmallSpacing} 0;
    }
  }

  .form-control {
    background-color: #FFFDFB !important;
  }
`

const Content = styled.main.attrs({ role: 'main' })`
  padding-top: ${(props) => props.theme.headerHeight};
`
const Layout = ({ headerData, children, footerData, router }) => {
  const locale = getLocaleFromQuery(router.query)
  T.setTexts(locales[locale])
  return (
    <ThemeProvider theme={theme}>
      <Fragment>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, viewport-fit=cover"
          />
          <link
            rel="shortcut icon"
            type="image/x-icon"
            href="/static/favicon/favicon.ico"
          />
          <link
            rel="icon"
            type="image/png"
            href="/static/favicon/favicon-32x32.png"
            sizes="32x32"
          />
          <link
            rel="icon"
            type="image/png"
            href="/static/favicon/favicon-16x16.png"
            sizes="16x16"
          />
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/bootstrap@4.0/dist/css/bootstrap.min.css"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Lato:400,700,900"
          />
          <link
            href="https://fonts.googleapis.com/css?family=Raleway:500,700,800"
            rel="stylesheet"
          />
          <script src="https://cdn.jsdelivr.net/npm/core-js@2/client/shim.min.js" />
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=UA-141682105-2"
          />
          <script
            dangerouslySetInnerHTML={{
              // Google Analytics
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments); }
                gtag('js', new Date());
                gtag('config', 'UA-141682105-2');
              `,
            }}
          />
        </Head>
        <Header height={theme.headerHeight} {...headerData} />
        <Content>
          <CookieNotice />
          {React.cloneElement(children, { locale })}
        </Content>
        <Footer {...footerData} />
      </Fragment>
    </ThemeProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  headerData: PropTypes.shape(headerPropTypes).isRequired,
  footerData: PropTypes.shape(footerPropTypes).isRequired,
  router: PropTypes.shape({
    query: PropTypes.shape(),
  }).isRequired,
}

export default _flow(withLoadingIndicator, withAnalytics, withRouter)(Layout)
