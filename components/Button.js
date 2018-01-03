import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

import { defaultFont, rem } from '../styling/typography'

const ButtonContainer = styled.div`
  display: flex;
  justify-content: ${({ center }) => (center ? 'center' : 'flex-start')};
`

const CustomButton = ({
  center,
  children,
  className,
  href,
}) => (
  <ButtonContainer center={center}>
    <a href={href} className={`btn ${className}`}>
      {children}
    </a>
  </ButtonContainer>
)

CustomButton.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  center: PropTypes.bool,
  href: PropTypes.string,
}

CustomButton.defaultProps = {
  center: false,
  className: '',
  href: undefined,
}

const StyledButton = styled(CustomButton)`
  font-size: ${rem('18px')};
  font-family: ${defaultFont};
  font-weight: bold;
  background-color: transparent;
  outline: none;
  box-shadow: none !important;
  padding: 0.5rem 1.5rem;
  border-radius: 47px;
  border-width: 3px;
  cursor: pointer;
  white-space: normal;

  &:hover {
    color: white;
  }

  ${props => props.type === 'primary' && css`
    font-weight: 900;
    color: ${props.theme.darkGreen};
    border-color: ${props.theme.green};
    padding-top: 0.35rem;
    padding-bottom: 0.35rem;

    &:hover {
      background-color: ${props.theme.green};
    }

    ${props.isActive && `
      background-color: ${props.theme.green};
      color: white;
    `}
  `}

  ${props => props.type === 'secondary' && css`
    color: ${props.theme.orangeRed};
    border-color: ${props.theme.orangeRed};

    &:hover {
      background-color: ${props.theme.orangeRed};
    }

    ${props.isActive && `
      background-color: ${props.theme.orangeRed};
      color: white;
    `}
  `}

  ${props => props.type === 'banner' && css`
    color: white;
    border-color: white;

    &:hover {
      color: ${props.theme.orange};
      background-color: white;
    }
  `}
`

StyledButton.propTypes = {
  ...CustomButton.propTypes,
  type: PropTypes.oneOf(['primary', 'secondary', 'banner']),
}

StyledButton.defaultProps = {
  ...CustomButton.defaultProps,
  type: 'secondary',
}

export default StyledButton
