/* eslint-disable no-param-reassign */
const fs = require('fs')
// eslint-disable-next-line import/no-extraneous-dependencies
const webpack = require('webpack')
const createSitemap = require('./utils/sitemap')
const Routes = require('./routes')

function patternWithLocaleFactory(pattern, locale) {
  const localePrefix = locale ? `/${locale}` : ''

  const patternSplit = pattern.split('?')
  const path = patternSplit[1]
  const patternWithLocaleList = [localePrefix, path]

  return patternWithLocaleList.join('')
}
// It can't handle all complex patterns (e.g. /blog/:id/)
// It CAN handle locales (e.g. /:locale(en)?/wie-sie-helfen)
function createRoutesFromNextRoutes() {
  return Routes.routes.reduce((map, { pattern, page }) => {
    const LOCALE_EN = 'en'
    const germanPattern = patternWithLocaleFactory(pattern, '')
    const englishPattern = patternWithLocaleFactory(pattern, LOCALE_EN)

    map[germanPattern] = { page }
    map[englishPattern] = { page, query: { locale: LOCALE_EN } }
    return map
  }, {})
}

const routes = createRoutesFromNextRoutes()

// Save created sitemap
fs.writeFileSync('public/sitemap.xml', createSitemap(routes))

module.exports = {
  useFileSystemPublicRoutes: false,

  exportPathMap() {
    return routes
  },

  webpack(config) {
    config.plugins.push(new webpack.DefinePlugin({
      ENABLED_FEATURES: null,
    }))
    return config
  },
}
