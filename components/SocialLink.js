import styled from 'styled-components'
import { socialLinkGrey } from '../styling/theme'

const SocialLink = styled.a`
  color: ${socialLinkGrey};
  opacity: 0.6;
  margin-left: 10px;
  margin-right: 10px;
  cursor: pointer;

  &:hover {
    color: ${socialLinkGrey} !important;
    opacity: 1;
  }
`

export default SocialLink
