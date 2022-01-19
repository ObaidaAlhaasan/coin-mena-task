import './why-choose-section.scss';

import React, {FC} from 'react';
import Row from "../../../../components/row/row";
import Col from "../../../../components/col/col";
import {chooseReasons} from './constants';
import Reason from "./components/reason/reason";
import Container from "../../../../components/container/container";

const WhyChooseSection: FC = () => {
  return (
    <Container>
      <section className="why-choose">
        <Row>
          <Col md={12}>
            <p className="has-text-primary why-choose__paragraph">SECURITY. VARIETY. TRUST.</p>
          </Col>

          <Col md={12}>
            <h1 className="why-choose__main-title">Why choose Coin Sorla?</h1>
          </Col>

          <Col md={12}>
            <Row>
              {chooseReasons.map((r, i) => <Reason key={i} reason={r}/>)}
            </Row>
          </Col>
        </Row>
      </section>
    </Container>
  );
};

export default WhyChooseSection;
