import "./footer.scss";
import React from 'react';
import Container from "../container/container";
import Row from "../row/row";
import Col from "../col/col";
import Logo from "../logo/logo";
import {FooterItems, SocialLinks} from "./constant";
import FooterPrivacy from "./components/footer-privacy/footer-privacy";

const Footer = () => {
  return (
    <div className="footer bg-light pt-5 pb-2 text-center text-md-start">
      <Container>
        <Row>
          <Col md={3}>
            <Logo/>
            <div className="footer__logo--title mt-4">
              Your frictionless digital currency platform
            </div>
            <div>
              <form onSubmit={e => e.preventDefault()}>
                <input placeholder="Enter your email address"/>
                <button><i className="fas fa-chevron-right has-hover-text-primary"/></button>
              </form>
            </div>
          </Col>
          {FooterItems.map((footerItem, i) => (
            <Col key={i} md={3}>
              <ul className="list-group list-unstyled my-3">
                <h4>{footerItem.label}</h4>
                {footerItem.items.map((item, ind) => (
                  <li className="list-item has-hover-affect has-hover w-fit-content text-sm-center m-auto m-md-0" key={ind}><span>{item}</span></li>))}
              </ul>
            </Col>
          ))}
          <Col md={3}>
            <ul className="list-group list-unstyled my-3">
              <li><h4>LET'S TALK</h4></li>
              <li className="list-item-social  m-auto m-md-0">
                {SocialLinks.map((s, i) => <i key={i} className={`fab fa-${s.name} mx-2 has-hover has-hover-affect`}/>)}
              </li>
            </ul>
          </Col>
        </Row>
        <Row>
          <FooterPrivacy/>
        </Row>
      </Container>
    </div>
  );
};

export default Footer;
