import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Container, Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Fade from 'react-reveal';
import Header from './Header';
import endpoints from '../constants/endpoints';
import FallbackSpinner from './FallbackSpinner';
import '../css/about.css';

const styles = {
  introTextContainer: {
    margin: 10,
    whiteSpace: 'pre-wrap',
    textAlign: 'left',
    fontSize: '1.2em',
    fontWeight: 500,
  },
  introImageContainer: {
    margin: '10px auto 0',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    height: '50vh',
    order: 2, /* moves the column to the bottom */
  },
  introImage: {
    maxWidth: '100%',
    height: 'auto',
  },
  /* Media queries for smaller screens */
  '@media (max-width: 576px)': {
    introTextContainer: {
      fontSize: '1em',
      margin: '10px 0',
    },
    introImageContainer: {
      margin: '0 auto',
      height: '30vh',
      order: 1, /* moves the column to the top */
    },
    introImage: {
      maxWidth: '100%',
      height: 'auto',
    },
  },
  sectionContentContainer: {
    paddingTop: '5rem',
  },
};

function About(props) {
  const { header } = props;
  const [data, setData] = useState(null);

  const parseIntro = (text) => (
    <ReactMarkdown
      children={text}
    />
  );

  useEffect(() => {
    fetch(endpoints.about, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  return (
    <>
      <Header title={header} />
      <div className="section-content-container">
        <Container>
          {data
            ? (
              <Fade>
                <Row style={{ flexDirection: 'column' }}>
                  <Col style={{ ...styles.introTextContainer, width: '100%', textIndent: '20px' }}>
                    {parseIntro(data.about)}
                  </Col>
                  <Col style={styles.introImageContainer}>
                    <img
                      src={data?.imageSource}
                      alt="profile"
                      style={{ maxWidth: '100%' }}
                    />
                  </Col>
                </Row>
              </Fade>
            )
            : <FallbackSpinner />}
        </Container>
      </div>
    </>
  );
}

About.propTypes = {
  header: PropTypes.string.isRequired,
};

export default About;
