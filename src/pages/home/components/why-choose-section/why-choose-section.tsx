import React, {FC} from 'react';
import Row from "../../../../components/row/row";
import Col from "../../../../components/col/col";
import {chooseReasons} from './constants';
import './why-choose-section.scss';
import Reason from "./components/reason/reason";

const WhyChooseSection: FC = () => {
  return (
    <section className="why-choose">
      <Row>
        <Col md={12}>
          <p className="has-text-primary why-choose__paragraph">SECURITY. VARIETY. TRUST.</p>
        </Col>

        <Col md={12}>
          <h2 className="why-choose__main-title">Why choose Coin Mena?</h2>
        </Col>

        <Col md={12}>
          <Row>
            {chooseReasons.map(r => <Reason reason={r}/>)}
          </Row>
        </Col>
      </Row>
    </section>
  );
};

export default WhyChooseSection;
