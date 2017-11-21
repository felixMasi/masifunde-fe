/* eslint-disable function-paren-newline */
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import _chunk from 'lodash/chunk'
import ReactMarkdown from 'react-markdown'
import { Container } from 'reactstrap'

import TeamMember from '../../components/TeamMember'
import { fetchContactPage } from '../../api/contact'

import Head from '../../components/Head'
import LayoutWrapper from '../../components/LayoutWrapper'

const MainHeading = styled.h1`
  text-align: center;
  margin-bottom: 70px;
`

const SecondaryHeading = styled.h2`
  text-align: center;
`

const PictureContainer = styled.div`
  margin-bottom: 40px;
`

const AdressContainer = styled.div`
  text-align: center;
`

const Contact = ({
  metaTitle,
  metaDescription,
  mainHeading,
  regionalContactsHeading,
  contactsHeading,
  contacts,
  regionalContacts,
  address,
  email,
  telephone,
}) => (
  <div>
    <Head title={metaTitle} description={metaDescription} />
    <Container>
      <MainHeading>{mainHeading}</MainHeading>

      <SecondaryHeading>{contactsHeading}</SecondaryHeading>
      <PictureContainer className="row justify-content-center">
        {contacts.map(contact => (
          <TeamMember
            key={`${contact.imageUrl} ${contact.title} ${contact.name}`}
            imageUrl={contact.imageUrl}
            title={contact.title}
            subtitle={contact.name}
            email={contact.email}
          />
        ))}
      </PictureContainer>

      <SecondaryHeading>{regionalContactsHeading}</SecondaryHeading>
      {_chunk(regionalContacts, 4).map(contactsChunk => (
        <PictureContainer className="row justify-content-sm-center">
          {contactsChunk.map(contact => (
            <TeamMember
              key={`${contact.imageUrl} ${contact.title} ${contact.name}`}
              imageUrl={contact.imageUrl}
              title={contact.title}
              subtitle={contact.name}
              email={contact.email}
            />
          ))}
        </PictureContainer>
      ))}

      <AdressContainer className="row">
        <div className="col-sm-4 d-flex flex-column align-items-center">
          <img src="http://via.placeholder.com/50x50" alt="" />
          <p>{telephone}</p>
        </div>
        <div className="col-sm-4 d-flex flex-column align-items-center">
          <img src="http://via.placeholder.com/50x50" alt="" />
          <ReactMarkdown source={address} softBreak="br" />
        </div>
        <div className="col-sm-4 d-flex flex-column align-items-center">
          <img src="http://via.placeholder.com/50x50" alt="" />
          <p>{email}</p>
        </div>
      </AdressContainer>
    </Container>
  </div>
)

Contact.propTypes = {
  metaTitle: PropTypes.string.isRequired,
  metaDescription: PropTypes.string.isRequired,
  mainHeading: PropTypes.string.isRequired,
  contactsHeading: PropTypes.string.isRequired,
  regionalContactsHeading: PropTypes.string.isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      imageUrl: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  regionalContacts: PropTypes.arrayOf(
    PropTypes.shape({
      imageUrl: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  address: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  telephone: PropTypes.string.isRequired,
}

Contact.getInitialProps = async function initialProps() {
  return fetchContactPage()
}

export default LayoutWrapper(Contact)
