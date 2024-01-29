import React from "react";
import { Row, Col, Button } from 'react-bootstrap';
import { LinkContainer } from "react-router-bootstrap";
import "./Home.css";

function Home() {
  return (
    <Row>
        <Col md={12} className="d-flex flex-direction-column align-items-center justify-content-center">
        <div>
            <h1 className="g1">Generate Your Official Letter</h1>
            <LinkContainer to='/login'>
            <div className="mb-2">
                <Button variant="primary" size="lg" >
                    Get Started
                </Button>
            </div>
            </LinkContainer>
        </div>
        </Col>
        {/* <Col md={6} className="home_bg"></Col> */}
    </Row>
  );
}

export default Home;
