import React from 'react'
import PropTypes from 'prop-types'

const TeamMember = ({
  imageUrl, title, subtitle, email,
}) => (
  <div className="col-6 col-md-3 col-lg-2">
    <img className="img-fluid" src={imageUrl} alt={`${title} - ${subtitle}`} />
    <div>{title}</div>
    <div>{subtitle}</div>
    <div>{email}</div>
  </div>
)

TeamMember.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  email: PropTypes.string,
}

TeamMember.defaultProps = {
  email: '',
}

export default TeamMember
