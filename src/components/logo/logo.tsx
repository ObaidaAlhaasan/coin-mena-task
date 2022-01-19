import React, {FC} from 'react';
import "./logo.scss"

const Logo: FC = () => (
  <>
    <img src="/assets/svgs/bitcoin.svg" alt="logo" className="logo"/>
    <strong className="has-text-primary">Coin Sorla</strong>
  </>
);

export default Logo;
