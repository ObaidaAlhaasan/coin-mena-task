import React, {FC} from 'react';
import CryptoAssetsTable from "./components/crypto-assets-table/crypto-assets-table";
import WhyChooseSection from "./components/why-choose-section/why-choose-section";

interface IHomeProps {
}

const Home: FC<IHomeProps> = () => {
  return (
    <div>
      <CryptoAssetsTable/>
      <WhyChooseSection />
    </div>
  );
};

export default Home;
