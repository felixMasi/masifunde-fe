import Link from 'next/link'
import { Container, Row, Col, Button } from 'reactstrap'

const linkStyle = {
  marginRight: 20,
  color: 'black',
}

const activeLinkStyle = {
  marginRight: 20,
  // marginBottom: 2,
  color: 'black',
  textDecoration: 'underline',
  // borderBottomWidth: 2,
  // borderBottomColor: 'black',

}

const linkContainerStyle = {
  float: "right,"
}

const blueStyle = {
  backgroundColor: 'blue',
}

const redStyle = {
  backgroundColor: 'red',
}

const containerStyle = {
  marginTop: "auto",
  marginBottom: "auto",
  marginTop: 20,
  marginBottom: 20,
}

const buttonStyle = {
  color: 'white',
  backgroundColor: 'black',
  border: 'none',
}

export default function Navigation(props) {
  return (
    <Container style={containerStyle}>
      <Row >
        <Col xs="4" sm="4" md="4" lg="4" xl="4">
          <img src="../static/Masifunde-Logo.png" />
        </Col>
        <Col xs="8" sm="8" md="8" lg="8" xl="8">
          <div style={linkContainerStyle}>
            <Link href="/"><a style={(props.activePage === "home") ? activeLinkStyle : linkStyle}>Was wir machen</a></Link>
            <Link href="/"><a style={(props.activePage === "we") ? activeLinkStyle : linkStyle}>Wer wir sind</a></Link>
            <Link href="/"><a style={(props.activePage === "you") ? activeLinkStyle : linkStyle}>Wie Sie helfen</a></Link>
            <Link href="/"><a><Button color='primary' style={buttonStyle}>Spenden</Button></a></Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
}