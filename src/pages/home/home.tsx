import React, {FC} from 'react';
import CryptoAssetsTable from "./components/crypto-assets-table/crypto-assets-table";
import WhyChooseSection from "./components/why-choose-section/why-choose-section";
import GetStart from "./components/get-start/get-start";

interface IHomeProps {
}

const Home: FC<IHomeProps> = () => {
  return (
    <>
      <CryptoAssetsTable/>
      <WhyChooseSection />
      <GetStart/>
    </>
  );
};

export default Home;
