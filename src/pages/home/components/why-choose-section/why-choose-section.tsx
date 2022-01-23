import React, {FC} from "react";
import {chooseReasons} from "./constants";
import Reason from "./components/reason/reason";
import Container from "../../../../components/container/container";
import {Col, Row} from "../../../../components";

import "./why-choose-section.scss";

const WhyChooseSection: FC = () => {
  return (
    <section className="why-choose">
      <Container>
        <Row>
          <Col md={12}>
            <p className="has-text-primary why-choose__paragraph">
              SECURITY. VARIETY. TRUST.
            </p>
          </Col>

          <Col md={12}>
            <h1 className="why-choose__main-title">Why Choose Coin Sorla?</h1>
          </Col>

          <Col md={12}>
            <Row>
              {chooseReasons.map((r, i) => (
                <Reason key={i} reason={r}/>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default WhyChooseSection;
