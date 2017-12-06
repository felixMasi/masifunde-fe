import React from 'react'
import { Container } from 'reactstrap'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import LayoutWrapper from '../../components/LayoutWrapper'
import Banner from '../../components/Banner'
import Head from '../../components/Head'
import { getLocaleFromQuery } from '../../utils/locale'
import { fetchBecomeAPartnerPage } from '../../api/howToSupport'
import Markdown from '../../components/Markdown'
import TeamMember from '../../components/TeamMember'
import Partner, { propTypes as partnerPropTypes } from '../../components/PartnersList/Partner'

const CenteredMarkdown = styled(Markdown)`
  text-align: center;
`

const Section1Title = styled.h2`
  margin-top: 7rem;
  margin-bottom: 7rem;
`

const Section1Container = styled.div`
  margin-bottom: 5rem;
`

const H3 = styled.h3`
  margin-bottom: 2rem;
`

const StyledPartner = styled(Partner)`
  margin-top: 1rem;
  margin-bottom: 1rem;
`

const BecomePartner = ({
  metaTitle,
  metaDescription,
  introTitle,
  introMarkdown,
  partners,
  section1Title,
  section1Subtitle,
  section1Markdown,
  teamMember,
  bannerTitle,
  bannerButtonText,
}) => (
  <div>
    <Head title={metaTitle} description={metaDescription} />
    <Container>
      <h1>{introTitle}</h1>
      <CenteredMarkdown className="col-md-8 offset-md-2" source={introMarkdown} />
      <div className="row">
        {partners.map(partner => (<StyledPartner key={partner.name} {...partner} />))}
      </div>
      <Section1Title>{section1Title}</Section1Title>
      <Section1Container className="row">
        <div className="col-md-5 offset-md-2">
          <H3>{section1Subtitle}</H3>
          <Markdown source={section1Markdown} />
        </div>
        <TeamMember
          className="col-md-2 offset-md-1"
          imageUrl={teamMember.image.url}
          title={teamMember.region}
          subtitle={teamMember.name}
        />
      </Section1Container>
    </Container>
    <Banner
      headline={bannerTitle}
      buttonText={bannerButtonText}
      buttonLink="a"
    />
  </div>
)

BecomePartner.propTypes = {
  metaTitle: PropTypes.string.isRequired,
  metaDescription: PropTypes.string,
  introTitle: PropTypes.string.isRequired,
  introMarkdown: PropTypes.string.isRequired,
  section1Title: PropTypes.string.isRequired,
  section1Subtitle: PropTypes.string.isRequired,
  section1Markdown: PropTypes.string.isRequired,
  bannerTitle: PropTypes.string.isRequired,
  bannerButtonText: PropTypes.string.isRequired,
  partners: PropTypes.arrayOf(PropTypes.shape(partnerPropTypes)).isRequired,
  teamMember: PropTypes.shape(TeamMember.propTypes).isRequired,
}

BecomePartner.defaultProps = {
  metaDescription: undefined,
}

BecomePartner.getInitialProps = async function getInitialProps({ query }) {
  return fetchBecomeAPartnerPage(getLocaleFromQuery(query))
}

export default LayoutWrapper(BecomePartner)

