import Link from 'next/link';
import { Button, Container, Row, Col } from 'reactstrap';
import * as texts from '../text/home-strings';


import Layout from '../components/Layout';
import * as api from '../api/contentful';

const About = (props) => (
  <Layout activePage="we">
    <Container>
      <p>WE ARE WE ARE</p>
    </Container>
  </Layout>
);

export default About;
