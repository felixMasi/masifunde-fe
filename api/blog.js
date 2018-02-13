import { fetchEntriesForContentType, fetchSingleEntry } from './contentfulService'
import { unwrapTeamMember, unwrapImage } from './common'
import { jpegQuality } from '../utils/constants'
import formatDate from '../utils/date'

function blogPostFromEntry(entry) {
  return {
    ...entry.fields,
    teaserImage: unwrapImage(entry.fields.teaserImage),
    heroImage: unwrapImage(entry.fields.heroImage),
    authorTeamMember: unwrapTeamMember(entry.fields.authorTeamMember),
  }
}

export async function fetchNewestBlogPosts(locale, limit) {
  const entries = await fetchEntriesForContentType('blogPost', {
    locale,
    limit,
    order: '-fields.date',
    'fields.slug[exists]': true,
    'fields.preventFeatured[ne]': true,
  })
  return entries.map(blogPostFromEntry)
}

export async function fetchBlogPost(locale, slug) {
  const entries = await fetchEntriesForContentType('blogPost', {
    locale,
    'fields.slug': slug,
  })
  if (entries.length === 0) {
    const e = new Error(`Could not find blog post with slug: ${slug}`)
    e.name = 'PostNotFoundError'
    throw e
  }
  const entry = entries[0]
  return blogPostFromEntry(entry)
}

function fetchBlogPostPageTemplate(locale) {
  return fetchSingleEntry('pageBlogPost', locale)
}

export async function fetchBlogPostPage(locale, slug) {
  try {
    const [page, post] = await Promise.all([
      fetchBlogPostPageTemplate(locale),
      fetchBlogPost(locale, slug),
    ])
    return {
      ...page,
      ...post,
    }
  } catch (error) {
    if (error.name === 'PostNotFoundError') {
      return { error: error.toString() }
    }
    throw error
  }
}

const fetchBlogPostLimit = 10

export function fetchBlogPostsList(locale, page) {
  const skip = fetchBlogPostLimit * (page - 1)
  return fetchEntriesForContentType(
    'blogPost',
    {
      locale,
      skip,
      limit: fetchBlogPostLimit,
      order: '-fields.date',
    },
  )
    .then(entries => (
      entries.map(({ sys, fields }) => {
        const author = fields.authorTeamMember
          ? unwrapTeamMember(fields.authorTeamMember).name
          : fields.authorExternal
        const teaserImage = unwrapImage(fields.teaserImage, { q: jpegQuality, w: 1000 })
        const date = formatDate(fields.date)
        return ({
          id: sys.id,
          title: fields.title,
          date,
          author,
          teaserText: fields.metaDescription,
          teaserImage,
          slug: fields.slug,
        })
      })))
}

export function fetchBlogLandingPage(locale, page = 1) {
  return Promise.all([
    fetchSingleEntry('pageBlogHome', locale),
    fetchBlogPostsList(locale, page),
  ])
    .then((results) => {
      const pageContent = results[0]
      const blogPosts = results[1]
      const isLastPage = blogPosts.length < fetchBlogPostLimit
      return {
        ...pageContent,
        blogPosts,
        page: Number(page),
        isLastPage,
      }
    })
}
